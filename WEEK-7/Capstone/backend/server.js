import exp from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import { userApp } from "./APIs/UserAPI.js";
import { authorApp } from "./APIs/AuthorAPI.js";
import { adminApp } from "./APIs/AdminAPI.js";
import { commonApp } from "./APIs/CommonAPI.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env variables
config({ path: path.resolve(__dirname, "../.env") });

// Create express app
const app = exp();

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://atp-24-eg-105-k62.vercel.app',
  'https://atp-24-eg-105-k62-eight.vercel.app',
  'https://atp-24-eg-105-k62-k3o31f469-madhurimaam12s-projects.vercel.app'
];

app.use(
  cors({
    origin: function(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        console.warn(`Blocked CORS request from: ${origin}`);
        return callback(null, false);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token', 'Cookie'],
    exposedHeaders: ['Set-Cookie'],
  })
);

// Middleware
app.use(cookieParser());
app.use(exp.json({ limit: '10mb' }));
app.use(exp.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/user-api", userApp);
app.use("/author-api", authorApp);
app.use("/admin-api", adminApp);
app.use("/api/common", commonApp);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ 
    success: true,
    status: "OK", 
    message: "Server is running",
    timestamp: new Date().toISOString()
  });
});

// Test endpoint
app.get("/test", (req, res) => {
  res.status(200).json({ 
    success: true,
    message: "Test endpoint working!" 
  });
});

// Database connection 
const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.DB_URL);
    console.log("Database connected successfully");

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });

  } catch (err) {
    console.error("Database connection error:", err.message);
    process.exit(1);
  }
};

connectDB();

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Path ${req.method} ${req.url} is invalid`,
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);

  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      error: err.message,
    });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(409).json({
      success: false,
      message: `${field} already exists`,
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});
