import { Request, Response } from "express";
import { Content } from "../models/Content";
import { Link } from "../models/Link";
import { User } from "../models/User";
import { shareSchema } from "../utils/validationSchemas";
import { random } from "../utils/stringUtils";

export const toggleShare = async (req: Request, res: Response) => {
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
};

export const getShareStatus = async (req: Request, res: Response) => {
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
};

export const getSharedBrain = async (req: Request, res: Response) => {
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
};
