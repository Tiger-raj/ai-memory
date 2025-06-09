import { Request, Response } from "express";
import { Content } from "../models/Content";
import { User } from "../models/User"; // Add this import
import { contentSchema } from "../utils/validationSchemas";
import { Pinecone } from "@pinecone-database/pinecone";

// Initialize Pinecone
const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

export const createContent = async (req: Request, res: Response) => {
  try {
    const validatedData = contentSchema.parse(req.body);
    const { link, title, type, description } = validatedData;

    // Fetch user data to get username for namespace
    const user = await User.findById(req.userId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const createdContent = await Content.create({
      link: link || "",
      type: type || "document",
      title,
      description: description || "",
      userId: req.userId,
      tags: [],
    });

    // Insert into Pinecone only if type is "document" and description is not null/empty
    if (type === "document" && description && description.trim() !== "") {
      try {
        const namespace = pc.index(process.env.PINECONE_INDEX_NAME!, process.env.PINECONE_HOST!).namespace(user.username);

        await namespace.upsertRecords([
          {
            _id: createdContent._id.toString(),
            text: description,
            category: title,
          },
        ]);
        console.log(`Content successfully upserted to Pinecone namespace: ${user.username}`);
      } catch (pineconeError) {
        console.error("❌ Pinecone upsert operation failed:", pineconeError);
      }
    }

    res.status(201).json({
      message: "Content created successfully",
      contentId: createdContent._id,
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
