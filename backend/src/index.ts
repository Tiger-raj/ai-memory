declare global {
  namespace Express {
    export interface Request {
      userId?: string; // This will be set by the userMiddleware
    }
  }
}

import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Content, Link, User } from "./db";
import dotenv from "dotenv";
import { userMiddleware } from "./middleware";
import { random } from "./utils";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/v1/signup", async (req: Request, res: Response) => {
  // do zod validation and hash the password

  const { username, password } = req.body;
  try {
    await User.create({ username, password });
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(411).json({ error: "User already exists." });
  }
});

app.post("/api/v1/signin", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username, password });
  if (existingUser) {
    const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET as string);
    res.status(200).json({ token });
  } else {
    res.status(401).json({ error: "Invalid username or password" });
  }
});

app.post("/api/v1/content", userMiddleware, async (req: Request, res: Response) => {
  const link = req.body.link;
  const title = req.body.title;
  const type = req.body.type;
  await Content.create({
    link,
    type,
    title,
    userId: req.userId,
    tags: [],
  });
  res.json({
    message: "Content created successfully",
  });
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
  const share = req.body.share;
  if (share) {
    const existingLink = await Link.findOne({ userId: req.userId });
    if (existingLink) {
      res.json({
        message: "Share link already exists",
        shareLink: existingLink.hash,
      });
      return;
    }
    let link = random(10);
    await Link.create({
      hash: link,
      userId: req.userId,
    });
    res.json({
      message: "Share link created successfully",
      shareLink: link,
    });
  } else {
    await Link.deleteOne({ userId: req.userId });
    res.json({
      message: "Share link deleted successfully",
    });
  }
  return;
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
