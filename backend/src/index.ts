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

// Basic middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Configure CORS
const allowedOrigins = [
  "https://ai-memory-five.vercel.app",
  "http://localhost:3000",
  "http://localhost:5173", // Add Vite dev server default port
];

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

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "AI Memory Backend is running!", status: "healthy" });
});

app.get("/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// API Routes
app.use("/api/v1", authRoutes);
app.use("/api/v1/content", contentRoutes);
app.use("/api/v1/query", queryRoutes);
app.use("/api/v1/brain", brainRoutes);

// 404 handler for API routes - FIX: Use a proper middleware pattern instead of "*" wildcard
// This was likely causing the error - "*" with URLs is problematic in Express 4+
app.use("/api", (req, res, next) => {
  if (req.path === "/" || req.path === "") {
    return next();
  }
  res.status(404).json({ error: "API endpoint not found" });
});

// Global error handler
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Global error handler:", error);
  res.status(500).json({
    error: "Internal server error",
    message: process.env.NODE_ENV === "development" ? error.message : "Something went wrong",
  });
});

// Utility to print all registered routes for debugging
function printRoutes(app: express.Express) {
  try {
    const routes: string[] = [];

    // Check if router exists before accessing its properties
    if (!app._router) {
      console.log("Router not initialized yet. No routes to print.");
      return;
    }

    app._router.stack.forEach((middleware: any) => {
      if (middleware.route) {
        // routes registered directly on the app
        const methods = Object.keys(middleware.route.methods).join(",").toUpperCase();
        routes.push(`${methods} ${middleware.route.path}`);
      } else if (middleware.name === "router") {
        // router middleware
        middleware.handle.stack.forEach((handler: any) => {
          const route = handler.route;
          if (route) {
            const methods = Object.keys(route.methods).join(",").toUpperCase();
            routes.push(`${methods} ${route.path}`);
          }
        });
      }
    });

    console.log("Registered routes:");
    routes.forEach((r) => console.log(r));
  } catch (error) {
    console.log("Could not print routes:", error);
  }
}

// Initialize database connection and start server
const startServer = async () => {
  try {
    await connectDatabase();

    // Add routes here to ensure they're registered before calling printRoutes
    app.get("/debug-routes", (req, res) => {
      const routes: string[] = [];
      try {
        // Similar logic to printRoutes but returns as JSON
        // ...
      } catch (e) {
        console.error("Error getting routes:", e);
      }
      res.json({ routes });
    });

    const server = app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);

      // Give Express a moment to fully initialize before printing routes
      setTimeout(() => {
        printRoutes(app);
      }, 100);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
