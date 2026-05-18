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

const allowedOrigins = [
  'http://localhost:5173',     
  'http://localhost:3000',      
  'https://atp-24-eg-105-k62-k3o31f469-madhurimaam12s-projects.vercel.app',  
  'https://atp-24-eg-105-k62.vercel.app',  
];

app.use(
  cors({
    origin: function(origin, callback) {
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) === -1) {
        console.warn(`Blocked CORS request from: ${origin}`);
        const msg = 'CORS policy does not allow access from this origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token', 'Cookie'],
    exposedHeaders: ['Set-Cookie'],
  })
);

// Cookie parser
app.use(cookieParser());

// Body parser - increase limit for images
app.use(exp.json({ limit: '10mb' }));
app.use(exp.urlencoded({ extended: true, limit: '10mb' }));

// routes 
app.use("/user-api", userApp);  
app.use("/author-api", authorApp);
app.use("/admin-api", adminApp);
app.use("/api/common", commonApp);

app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    message: "Server is running",
    timestamp: new Date().toISOString()
  });
});

// DB 
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connected successfully");

    const port = process.env.PORT || 5000;

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });

  } catch (err) {
    console.log("Database connection error:", err);
    process.exit(1);
  }
};

connectDB();

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Path ${req.method} ${req.url} is invalid`,
  });
});

app.use((err, req, res, next) => {
  console.error(" Error:", err);

  // Validation Error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      error: err.message,
    });
  }

  // Cast Error
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
      error: err.message,
    });
  }

  // CORS Error
  if (err.message && err.message.includes('CORS')) {
    return res.status(403).json({
      success: false,
      message: "CORS error: Origin not allowed",
    });
  }

  // Duplicate Key Error (MongoDB)
  const errCode = err.code ?? err.cause?.code ?? err.errorResponse?.code;
  const keyValue = err.keyValue ?? err.cause?.keyValue ?? err.errorResponse?.keyValue;

  if (errCode === 11000) {
    const field = Object.keys(keyValue)[0];
    const value = keyValue[field];

    return res.status(409).json({
      success: false,
      message: `${field} "${value}" already exists`,
    });
  }

  // Default Server Error
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});
