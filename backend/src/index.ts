declare global {
  namespace Express {
    export interface Request {
      userId?: string; // This will be set by the userMiddleware
    }
  }
}

import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Content, Link, User } from "./db";
import dotenv from "dotenv";
import { userMiddleware } from "./middleware";
import { random } from "./utils";
import { signupSchema, signinSchema, contentSchema, shareSchema } from "./validation";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const SALT_ROUNDS = 12;

app.post("/api/v1/signup", async (req: Request, res: Response) => {
  try {
    // Validate input using Zod
    const validatedData = signupSchema.parse(req.body);
    const { username, password } = validatedData;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(409).json({ error: "User already exists" });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create user with hashed password
    await User.create({
      username,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User created successfully",
      username: username,
    });
  } catch (error: any) {
    // Handle Zod validation errors
    if (error.name === "ZodError") {
      const firstError = error.errors[0];
      res.status(400).json({
        error: "Validation failed",
        message: firstError.message,
        field: firstError.path[0],
      });
      return;
    }

    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/v1/signin", async (req: Request, res: Response) => {
  try {
    // Validate input using Zod
    const validatedData = signinSchema.parse(req.body);
    const { username, password } = validatedData;

    // Find user by username
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      res.status(401).json({ error: "Invalid username or password" });
      return;
    }

    // Compare password with hashed password
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid username or password" });
      return;
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" } // Token expires in 7 days
    );

    res.status(200).json({
      token,
      message: "Signin successful",
      username: existingUser.username,
    });
  } catch (error: any) {
    // Handle Zod validation errors
    if (error.name === "ZodError") {
      const firstError = error.errors[0];
      res.status(400).json({
        error: "Validation failed",
        message: firstError.message,
        field: firstError.path[0],
      });
      return;
    }

    console.error("Signin error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/v1/content", userMiddleware, async (req: Request, res: Response) => {
  try {
    // Validate input using Zod
    const validatedData = contentSchema.parse(req.body);
    const { link, title, type, description } = validatedData;

    await Content.create({
      link: link || "", // Handle empty link for document type
      type: type || "document", // Default to document if not specified
      title,
      description: description || "",
      userId: req.userId,
      tags: [],
    });

    res.status(201).json({
      message: "Content created successfully",
    });
  } catch (error: any) {
    // Handle Zod validation errors
    if (error.name === "ZodError") {
      const firstError = error.errors[0];
      res.status(400).json({
        error: "Validation failed",
        message: firstError.message,
        field: firstError.path[0],
      });
      return;
    }

    console.error("Content creation error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/v1/content", userMiddleware, async (req: Request, res: Response) => {
  const userId = req.userId;
  const contentType = req.query.type as string;

  // Build filter object - if contentType is provided, filter by it
  const filter: any = { userId: userId };
  if (contentType && contentType !== "home") {
    filter.type = contentType;
  }

  const content = await Content.find(filter).populate("userId", "username");
  // populate is used to get the username from the User collection as mongodb relations are used in the Content schema and the second parameter specifies which fields to populate from user model (we don't want to expose the password)
  res.json(content);
});

app.delete("/api/v1/content", userMiddleware, async (req: Request, res: Response) => {
  const contentId = req.body.contentId;
  await Content.deleteOne({ _id: contentId, userId: req.userId });
  res.json({ message: "Content deleted successfully" });
});

app.post("/api/v1/brain/share", userMiddleware, async (req: Request, res: Response) => {
  try {
    // Validate input using Zod
    const validatedData = shareSchema.parse(req.body);
    const { share } = validatedData;

    if (share) {
      const existingLink = await Link.findOne({ userId: req.userId });
      if (existingLink) {
        res.json({
          message: "Share link already exists",
          hash: existingLink.hash,
        });
        return;
      }
      let hash = random(10);
      await Link.create({
        hash: hash,
        userId: req.userId,
      });
      res.json({
        message: "Share link created successfully",
        hash: hash,
      });
    } else {
      await Link.deleteOne({ userId: req.userId });
      res.json({
        message: "Share link deleted successfully",
      });
    }
  } catch (error: any) {
    // Handle Zod validation errors
    if (error.name === "ZodError") {
      const firstError = error.errors[0];
      res.status(400).json({
        error: "Validation failed",
        message: firstError.message,
        field: firstError.path[0],
      });
      return;
    }

    console.error("Share toggle error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/v1/brain/share", userMiddleware, async (req: Request, res: Response) => {
  try {
    const existingLink = await Link.findOne({ userId: req.userId });
    if (existingLink) {
      res.json({
        hash: existingLink.hash,
      });
    } else {
      res.json({
        hash: null,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to check sharing status" });
  }
});

app.get("/api/v1/brain/:shareLink", async (req: Request, res: Response) => {
  const shareLink = req.params.shareLink;
  const link = await Link.findOne({ hash: shareLink });
  const userId = link?.userId?.toString();
  if (!userId) {
    res.status(404).json({ error: "Share link not found" });
    return;
  }
  const user = await User.findById(userId);
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  const content = await Content.find({ userId: userId });
  if (!content) {
    res.status(404).json({ error: "No content found for this share link" });
    return;
  }
  res.json({
    username: user.username,
    content: content,
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
