import exp from "express";
import { UserModel } from "../models/UserModel.js";
import { ArticleModel } from "../models/ArticleModel.js";
import { hash, compare } from "bcryptjs";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middlewares/VerifyToken.js";
import { upload } from "../config/multer.js";
import { uploadToCloudinary } from "../config/cloudinaryUpload.js";
import cloudinary from "../config/cloudinary.js";

const { sign } = jwt;
export const commonApp = exp.Router();
config();

// Register User
commonApp.post("/users", upload.single("profileImage"), async (req, res, next) => {
  let cloudinaryResult;
  
  try {
    console.log("=== REGISTRATION START ===");
    console.log("Request body:", req.body);
    console.log("File uploaded:", req.file ? "Yes" : "No");
    
    let allowedRoles = ["USER", "AUTHOR", "ADMIN"];
    const newUser = req.body;

    // Validate role
    if (!allowedRoles.includes(newUser.role)) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid role. Allowed roles: USER, AUTHOR, ADMIN" 
      });
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email: newUser.email });
    if (existingUser) {
      return res.status(409).json({ 
        success: false,
        message: "User with this email already exists" 
      });
    }

    // Upload profile image if provided
    if (req.file) {
      // Check Cloudinary configuration
      if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_CLOUD_NAME) {
        console.error("Cloudinary is not configured!");
        return res.status(500).json({ 
          success: false,
          message: "Image upload service not configured.",
          error: "Cloudinary missing configuration"
        });
      }
      
      try {
        console.log("Uploading to Cloudinary...");
        cloudinaryResult = await uploadToCloudinary(req.file.buffer, "profile_pictures");
        console.log("Cloudinary upload success:", cloudinaryResult.secure_url);
        newUser.profileImageUrl = cloudinaryResult.secure_url;
      } catch (cloudinaryError) {
        console.error("Cloudinary upload failed:", cloudinaryError);
        return res.status(500).json({ 
          success: false,
          message: "Failed to upload profile image",
          error: cloudinaryError.message 
        });
      }
    } else {
      console.log("No profile image provided");
      newUser.profileImageUrl = "";
    }

    // Hash password
    newUser.password = await hash(newUser.password, 10);
    
    // Create user document
    const newUserDoc = new UserModel(newUser);
    await newUserDoc.save();
    
    console.log("User saved successfully with ID:", newUserDoc._id);
    
    // Remove password from response
    const userResponse = newUserDoc.toObject();
    delete userResponse.password;
    
    res.status(201).json({ 
      success: true,
      message: "User created successfully",
      payload: userResponse
    });
    
  } catch (err) {
    console.log("Error in registration:", err);
    
    // Clean up Cloudinary image if upload succeeded but user creation failed
    if (cloudinaryResult?.public_id) {
      console.log("Cleaning up Cloudinary image...");
      await cloudinary.uploader.destroy(cloudinaryResult.public_id);
    }
    
    next(err);
  }
});

//Login User
commonApp.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: "Email and password are required" 
      });
    }
    
    console.log("Login attempt for:", email);
    
    // Find user
    const user = await UserModel.findOne({ email: email.toLowerCase().trim() });
    
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: "Invalid email or password" 
      });
    }
    
    // Check if user is active
    if (!user.isUserActive) {
      return res.status(403).json({ 
        success: false,
        message: "Your account has been deactivated. Please contact admin." 
      });
    }
    
    // Verify password
    const isMatched = await compare(password, user.password);
    
    if (!isMatched) {
      return res.status(401).json({ 
        success: false,
        message: "Invalid email or password" 
      });
    }
    
    // Create JWT token
    const signedToken = sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        profileImageUrl: user.profileImageUrl,
      },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );

    // Set cookie
    res.cookie("token", signedToken, {
      httpOnly: true,
      secure: true,      
      sameSite: "none",  
      maxAge: 24 * 60 * 60 * 1000, 
      path: "/"
    });
    
    // Prepare user object for response
    let userObj = user.toObject();
    delete userObj.password;
    
    console.log("Login successful for:", email);
    
    res.status(200).json({ 
      success: true,
      message: "Login successful",
      payload: userObj,
      profileImageUrl: userObj.profileImageUrl
    });
    
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      success: false,
      message: "Login failed", 
      error: process.env.NODE_ENV === 'development' ? error.message : "Internal server error"
    });
  }
});

// Logout User
commonApp.get("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/"
  });
  
  res.status(200).json({ 
    success: true,
    message: "Logout successful" 
  });
});

//Check authentication
commonApp.get("/check-auth", verifyToken("USER", "AUTHOR", "ADMIN"), (req, res) => {
  res.status(200).json({
    success: true,
    message: "Authenticated",
    payload: req.user,
  });
});

//Change Password
commonApp.put("/password", verifyToken("USER", "AUTHOR", "ADMIN"), async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ 
        success: false,
        message: "Current password and new password are required" 
      });
    }
    
    if (newPassword.length < 6) {
      return res.status(400).json({ 
        success: false,
        message: "New password must be at least 6 characters long" 
      });
    }
    
    // Find user
    const user = await UserModel.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }
    
    // Verify current password
    const isMatch = await compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        success: false,
        message: "Current password is incorrect" 
      });
    }
    
    // Hash and save new password
    const hashedPassword = await hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    
    console.log("Password changed successfully for:", user.email);
    
    res.status(200).json({ 
      success: true,
      message: "Password changed successfully" 
    });
    
  } catch (error) {
    console.error("Password change error:", error);
    res.status(500).json({ 
      success: false,
      message: "Failed to change password",
      error: process.env.NODE_ENV === 'development' ? error.message : "Internal server error"
    });
  }
});

//Get All public articles
commonApp.get("/public-articles", async (req, res) => {
  try {
    const { page = 1, limit = 10, category } = req.query;
    
    // Build query
    let query = { isArticleActive: true };
    if (category && category !== 'all') {
      query.category = category;
    }
    
    // Get articles with pagination
    const articles = await ArticleModel.find(query)
      .populate("author", "firstName lastName email profileImageUrl")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    // Get total count
    const total = await ArticleModel.countDocuments(query);
    
    res.status(200).json({
      success: true,
      message: "Articles fetched successfully",
      payload: articles,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalArticles: total
    });
    
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ 
      success: false,
      message: "Failed to fetch articles",
      error: process.env.NODE_ENV === 'development' ? error.message : "Internal server error"
    });
  }
});

//Get Single Public Article
commonApp.get("/article/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    const article = await ArticleModel.findOne({ 
      _id: id, 
      isArticleActive: true 
    })
      .populate("author", "firstName lastName email profileImageUrl")
      .populate("comments.user", "firstName lastName profileImageUrl");
    
    if (!article) {
      return res.status(404).json({ 
        success: false,
        message: "Article not found" 
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Article fetched successfully",
      payload: article
    });
    
  } catch (error) {
    console.error("Error fetching article:", error);
    res.status(500).json({ 
      success: false,
      message: "Failed to fetch article",
      error: process.env.NODE_ENV === 'development' ? error.message : "Internal server error"
    });
  }
});

//Test Cloudinary Configuration
commonApp.get("/test-cloudinary", (req, res) => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  
  res.json({
    success: true,
    cloudinary_configured: !!(cloudName && apiKey && apiSecret),
    cloud_name: cloudName || "NOT SET",
    api_key_exists: !!apiKey,
    api_secret_exists: !!apiSecret,
    message: cloudName && apiKey && apiSecret ? 
      "Cloudinary is properly configured" : 
      "Cloudinary is missing configuration. Check your .env file"
  });
});
