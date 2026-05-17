import exp from "express";
import { UserModel } from "../models/UserModel.js";
import { ArticleModel } from "../models/ArticleModel.js";
import { hash, compare } from "bcryptjs";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middlewares/VerifyToken.js";
const { sign } = jwt;
export const commonApp = exp.Router();
import { upload } from "../config/multer.js";
import { uploadToCloudinary } from "../config/cloudinaryUpload.js";
import cloudinary from "../config/cloudinary.js";
config();

// Route for register
commonApp.post("/users", upload.single("profileImage"), async (req, res, next) => {
  let cloudinaryResult;
  try {
    console.log("=== REGISTRATION START ===");
    console.log("Request body:", req.body);
    console.log("Request file:", req.file);
    console.log("Cloudinary configured:", !!process.env.CLOUDINARY_API_KEY);
    
    let allowedRoles = ["USER", "AUTHOR", "ADMIN"];
    const newUser = req.body;

    if (!allowedRoles.includes(newUser.role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (req.file) {
      if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_CLOUD_NAME) {
        console.error("Cloudinary is not configured! Check your .env file");
        return res.status(500).json({ 
          message: "Image upload service not configured.",
          error: "Cloudinary missing configuration"
        });
      }
      
      try {
        console.log("Attempting to upload to Cloudinary...");
        cloudinaryResult = await uploadToCloudinary(req.file.buffer, "profile_pictures");
        console.log("Cloudinary upload success:", cloudinaryResult.secure_url);
        newUser.profileImageUrl = cloudinaryResult.secure_url;
      } catch (cloudinaryError) {
        console.error("Cloudinary upload failed:", cloudinaryError);
        return res.status(500).json({ 
          message: "Failed to upload profile image",
          error: cloudinaryError.message 
        });
      }
    } else {
      console.log("No profile image provided");
      newUser.profileImageUrl = null;
    }

    newUser.password = await hash(newUser.password, 12);
    const newUserDoc = new UserModel(newUser);
    await newUserDoc.save();
    console.log("User saved successfully with ID:", newUserDoc._id);
    
    res.status(201).json({ 
      message: "User created successfully",
      user: {
        id: newUserDoc._id,
        email: newUserDoc.email,
        role: newUserDoc.role,
        profileImageUrl: newUserDoc.profileImageUrl
      }
    });
  } catch (err) {
    console.log("Error in registration:", err);
    if (cloudinaryResult?.public_id) {
      console.log("Cleaning up Cloudinary image...");
      await cloudinary.uploader.destroy(cloudinaryResult.public_id);
    }
    next(err);
  }
});

// Get all published articles for users to read (PUBLIC)
commonApp.get("/public-articles", async (req, res) => {
  try {
    const articles = await ArticleModel.find({ isArticleActive: true })
      .populate("author", "firstName lastName email profileImageUrl")
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      message: "Articles fetched successfully",
      payload: articles
    });
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ error: "Failed to fetch articles" });
  }
});

// Get single article by ID (PUBLIC)
commonApp.get("/article/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const article = await ArticleModel.findOne({ _id: id, isArticleActive: true })
      .populate("author", "firstName lastName email profileImageUrl")
      .populate("comments.user", "firstName lastName profileImageUrl");
    
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }
    
    res.status(200).json({
      message: "Article fetched successfully",
      payload: article
    });
  } catch (error) {
    console.error("Error fetching article:", error);
    res.status(500).json({ error: "Failed to fetch article" });
  }
});

// Test Cloudinary endpoint
commonApp.get("/test-cloudinary", (req, res) => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  
  res.json({
    cloudinary_configured: !!(cloudName && apiKey && apiSecret),
    cloud_name: cloudName || "NOT SET",
    api_key_exists: !!apiKey,
    api_secret_exists: !!apiSecret,
    message: cloudName && apiKey && apiSecret ? 
      "Cloudinary is properly configured" : 
      "Cloudinary is missing configuration. Check your .env file"
  });
});

// Login route
commonApp.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt for:", email);
    
    const user = await UserModel.findOne({ email: email });
    
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }
    
    const isMatched = await compare(password, user.password);
    
    if (!isMatched) {
      return res.status(400).json({ message: "Invalid password" });
    }
    
    const signedToken = sign(
      {
        id: user._id,
        email: email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        profileImageUrl: user.profileImageUrl,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("token", signedToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    
    let userObj = user.toObject();
    delete userObj.password;

    res.status(200).json({ 
      message: "Login success", 
      payload: userObj,
      profileImageUrl: userObj.profileImageUrl
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

// Logout route
commonApp.get("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.status(200).json({ message: "Logout success" });
});

// Check auth route
commonApp.get("/check-auth", verifyToken("USER", "AUTHOR", "ADMIN"), (req, res) => {
  res.status(200).json({
    message: "authenticated",
    payload: req.user,
  });
});

// Change password route
commonApp.put("/password", verifyToken("USER", "AUTHOR", "ADMIN"), async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await UserModel.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const isMatch = await compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }
    
    const hashedPassword = await hash(newPassword, 12);
    user.password = hashedPassword;
    await user.save();
    
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Password change error:", error);
    res.status(500).json({ message: "Failed to change password" });
  }
});
