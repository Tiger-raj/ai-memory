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
const allowedOrigins = ["https://ai-memory-five.vercel.app", "http://localhost:3000"];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight requests
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);
});

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
