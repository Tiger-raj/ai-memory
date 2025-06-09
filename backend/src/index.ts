import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDatabase } from "./config/database";
import authRoutes from "./routes/authRoutes";
import contentRoutes from "./routes/contentRoutes";
import brainRoutes from "./routes/brainRoutes";
import queryRoutes from "./routes/queryRoutes";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

// Configure CORS to allow only specific origins
const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:3000"].filter((origin): origin is string => Boolean(origin)); // Remove any undefined values

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Routes
app.use("/api/v1", authRoutes);
app.use("/api/v1/content", contentRoutes);
app.use("/api/v1/brain", brainRoutes);
app.use("/api/v1/query", queryRoutes);

// Initialize database connection and start server
const startServer = async () => {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
