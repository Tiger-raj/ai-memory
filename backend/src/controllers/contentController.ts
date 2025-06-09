import { Request, Response } from "express";
import { Content } from "../models/Content";
import { User } from "../models/User"; // Add this import
import { contentSchema, editContentSchema } from "../utils/validationSchemas";
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
  try {
    const contentId = req.body.contentId;

    if (!contentId) {
      res.status(400).json({ error: "Content ID is required" });
      return;
    }

    // Find the existing content to get its details before deletion
    const existingContent = await Content.findOne({
      _id: contentId,
      userId: req.userId,
    });

    if (!existingContent) {
      res.status(404).json({ error: "Content not found or unauthorized" });
      return;
    }

    // Get user to extract username for namespace
    const user = await User.findById(req.userId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // Delete from MongoDB
    const deletedContent = await Content.deleteOne({
      _id: contentId,
      userId: req.userId,
    });

    if (deletedContent.deletedCount === 0) {
      res.status(404).json({ error: "Content not found or unauthorized" });
      return;
    }

    // Delete from Pinecone if it was a document type
    if (existingContent.type === "document") {
      try {
        const namespace = pc.index(process.env.PINECONE_INDEX_NAME!, process.env.PINECONE_HOST!).namespace(user.username);

        await namespace.deleteMany([contentId]);
        console.log(`✅ Document deleted from Pinecone: ${contentId}`);
      } catch (pineconeError) {
        console.error("❌ Pinecone delete operation failed:", pineconeError);
        // Don't fail the entire operation if Pinecone fails
        console.log("Content deleted from MongoDB but Pinecone deletion failed");
      }
    }

    res.status(200).json({
      message: "Content deleted successfully",
    });
  } catch (error: any) {
    console.error("Delete content error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Failed to delete content. Please try again.",
    });
  }
};

export const editContent = async (req: Request, res: Response) => {
  try {
    // Validate input using Zod
    const validatedData = editContentSchema.parse(req.body);
    const { contentId, title, link, type, description } = validatedData;

    // Find the existing content
    const existingContent = await Content.findOne({
      _id: contentId,
      userId: req.userId,
    });

    if (!existingContent) {
      res.status(404).json({ error: "Content not found or unauthorized" });
      return;
    }

    // Get user to extract username for namespace
    const user = await User.findById(req.userId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // Update content in MongoDB
    const updatedContent = await Content.findByIdAndUpdate(
      contentId,
      {
        title,
        link: link || "",
        type,
        description: description || "",
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updatedContent) {
      res.status(500).json({ error: "Failed to update content" });
      return;
    }

    // Update in Pinecone (only for document type)
    if (type === "document" && description && description.trim() !== "") {
      try {
        const namespace = pc.index(process.env.PINECONE_INDEX_NAME!, process.env.PINECONE_HOST!).namespace(user.username);

        // Prepare the text content for embedding
        const textContent = description;

        // Update the record in Pinecone (same ID will overwrite existing)
        await namespace.upsertRecords([
          {
            _id: contentId,
            text: textContent,
            category: type,
          },
        ]);

        console.log(`✅ Document updated in Pinecone: ${contentId}`);
      } catch (pineconeError) {
        console.error("❌ Pinecone update operation failed:", pineconeError);
        // Don't fail the entire operation if Pinecone fails
        console.log("Content updated in MongoDB but Pinecone update failed");
      }
    }

    res.status(200).json({
      message: "Content updated successfully",
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

    console.error("Edit content error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
