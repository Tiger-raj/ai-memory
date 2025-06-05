import express from "express";
import jwt from "jsonwebtoken";
import { User } from "./db";
import dotenv from "dotenv";
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
app.post("/api/v1/content", (req, res) => {});
app.get("/api/v1/content", (req, res) => {});
app.delete("/api/v1/content", (req, res) => {});

app.post("/api/v1/brain/share", (req, res) => {});
app.get("/api/v1/brain/:shareLink", (req, res) => {});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
