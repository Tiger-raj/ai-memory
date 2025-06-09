import { Request, Response } from "express";
import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { User } from "../models/User";
import { querySchema } from "../utils/validationSchemas";

// Initialize Pinecone
const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const handleQuery = async (req: Request, res: Response) => {
  try {
    // Validate input using Zod
    const validatedData = querySchema.parse(req.body);
    const { query } = validatedData;

    // Get user to extract username for namespace
    const user = await User.findById(req.userId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // Search in Pinecone
    const namespace = pc.index(process.env.PINECONE_INDEX_NAME!, process.env.PINECONE_HOST!).namespace(user.username);

    let searchResults;
    try {
      const searchResponse = await namespace.searchRecords({
        query: {
          topK: 3,
          inputs: { text: query },
        },
        fields: ["text", "category"],
      });

      searchResults = searchResponse.result.hits;

      // If no results found in Pinecone
      if (!searchResults || searchResults.length === 0) {
        res.status(404).json({
          error: "No relevant content found",
          message: "No matching documents found for your query. Please try a different search term.",
        });
        return;
      }
    } catch (pineconeError) {
      console.error("❌ Pinecone search operation failed:", pineconeError);
      res.status(500).json({
        error: "Search failed",
        message: "Unable to search your content at the moment. Please try again later.",
      });
      return;
    }

    // Create context from search results
    const context = searchResults.map((hit) => (hit.fields as any).text).join("\n\n");

    // Generate response using Gemini AI
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

      const prompt = `You are a teaching assistant. You need to answer query followed by the word "QUERY :" using the context provided after the word "CONTEXT :". Please don't include any star in the response, don't bold any text and give a decent length response and don't include headings and all, just give proper paragraph response. CONTEXT : ${context}  QUERY : ${query}`;

      const result = await model.generateContent(prompt);
      const aiResponse = result.response.text();

      res.status(200).json({
        message: "Query processed successfully",
        response: aiResponse,
        query: query,
        sourceCount: searchResults.length,
      });
    } catch (geminiError) {
      console.error("❌ Gemini AI operation failed:", geminiError);
      res.status(500).json({
        error: "AI processing failed",
        message: "Unable to process your query with AI at the moment. Please try again later.",
      });
      return;
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

    console.error("Query handling error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
