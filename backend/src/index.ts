import express from "express";
import jwt from "jsonwebtoken";
import { Content, User } from "./db";
import dotenv from "dotenv";
import { userMiddleware } from "./middleware";
dotenv.config();

const app = express();
app.use(express.json());

app.post("/api/v1/signup", async (req, res) => {
  // do zod validation and hash the password

  const { username, password } = req.body;
  try {
    await User.create({ username, password });
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(411).json({ error: "User already exists." });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username, password });
  if (existingUser) {
    const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET as string);
    res.status(200).json({ token });
  } else {
    res.status(401).json({ error: "Invalid username or password" });
  }
});
//@ts-ignore
app.post("/api/v1/content", userMiddleware, async (req, res) => {
  const link = req.body.link;
  const title = req.body.title;
  await Content.create({
    link,
    title,
    //@ts-ignore
    userId: req.userId, // assuming req.userId is set by the middleware
    tags: [], // assuming tags are passed in the request body
  });
  return res.json({
    message: "Content created successfully",
  });
});

//@ts-ignore
app.get("/api/v1/content", userMiddleware, async (req, res) => {
  //@ts-ignore
  const userId = req.userId;
  const content = await Content.find({ userId: userId }).populate("userId", "username");
  // populate is used to get the username from the User collection as mongodb relations are used in the Content schema
  return res.json(content);
});

//@ts-ignore
app.delete("/api/v1/content", userMiddleware, async (req, res) => {
  //@ts-ignore
  const userId = req.userId;
  const contentId = req.body.contentId;
  await Content.deleteOne({ _id: contentId, userId: userId });
  return res.json({ message: "Content deleted successfully" });
});

app.post("/api/v1/brain/share", (req, res) => {});
app.get("/api/v1/brain/:shareLink", (req, res) => {});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
