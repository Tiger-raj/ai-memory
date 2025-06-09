import { Request, Response } from "express";
import { Content } from "../models/Content";
import { contentSchema } from "../utils/validationSchemas";

export const createContent = async (req: Request, res: Response) => {
  try {
    const validatedData = contentSchema.parse(req.body);
    const { link, title, type, description } = validatedData;

    await Content.create({
      link: link || "",
      type: type || "document",
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
};

export const getContent = async (req: Request, res: Response) => {
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
};

export const deleteContent = async (req: Request, res: Response) => {
  const contentId = req.body.contentId;
  await Content.deleteOne({ _id: contentId, userId: req.userId });
  res.json({ message: "Content deleted successfully" });
};
