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

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174", 
      "http://localhost:5175",
      "https://atp-24-eg-105-k62-eight.vercel.app", 
    ],
    credentials: true,
  })
);

// Cookie parser
app.use(cookieParser());

// Body parser
app.use(exp.json());

// Routes
app.use("/user-api", userApp);
app.use("/author-api", authorApp);
app.use("/admin-api", adminApp);
app.use("/api/common", commonApp);

// Connect DB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);

    console.log("DB server connected");

    const port = process.env.PORT || 5000;

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });

  } catch (err) {
    console.log("Error in DB connect:", err);
    process.exit(1);
  }
};

connectDB();

// Invalid path handler
app.use((req, res) => {
  res.status(404).json({
    message: `Path ${req.url} is invalid`,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.log("Error:", err);

  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation Error",
      error: err.message,
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Cast Error",
      error: err.message,
    });
  }

  const errCode =
    err.code ?? err.cause?.code ?? err.errorResponse?.code;

  const keyValue =
    err.keyValue ??
    err.cause?.keyValue ??
    err.errorResponse?.keyValue;

  if (errCode === 11000) {
    const field = Object.keys(keyValue)[0];
    const value = keyValue[field];

    return res.status(409).json({
      message: `${field} "${value}" already exists`,
    });
  }

  res.status(500).json({
    message: "Server side error",
  });
});
