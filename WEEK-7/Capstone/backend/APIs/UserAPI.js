import exp from "express";
import bcrypt from "bcryptjs";
import multer from "multer";
import { verifyToken } from "../middlewares/VerifyToken.js";
import { ArticleModel } from "../models/ArticleModel.js";
import { UserModel } from "../models/UserModel.js";

export const userApp = exp.Router();

// ================== MULTER CONFIG ==================
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ================== REGISTER ==================
userApp.post("/register", upload.single("profileImage"), async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // check existing user
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 6);

    // create user
    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      profileImageUrl: "",
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.log("Register error:", err);
    res.status(500).json({ message: "Registration failed" });
  }
});

// ================== READ ARTICLES ==================
userApp.get("/articles", verifyToken("USER"), async (req, res) => {
  try {
    const articlesList = await ArticleModel.find({ isArticleActive: true });
    res.status(200).json({ message: "articles", payload: articlesList });
  } catch (err) {
    res.status(500).json({ message: "Error fetching articles" });
  }
});

userApp.get("/article/:id", verifyToken("USER", "AUTHOR", "ADMIN"), async (req, res) => {
  try {
    const articleId = req.params.id;
    const articleDocument = await ArticleModel.findById(articleId).populate("comments.user", "email firstName lastName");

    if (!articleDocument) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json({ message: "article", payload: articleDocument });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching article" });
  }
});

// ================== ADD COMMENT ==================
userApp.put("/articles", verifyToken("USER"), async (req, res) => {
  try {
    const { articleId, comment } = req.body;

    const articleDocument = await ArticleModel.findOne({
      _id: articleId,
      isArticleActive: true,
    }).populate("comments.user");

    if (!articleDocument) {
      return res.status(404).json({ message: "Article not found" });
    }

    const userId = req.user?.id;

    articleDocument.comments.push({
      user: userId,
      comment,
    });

    await articleDocument.save();

    res.status(200).json({
      message: "Comment added successfully",
      payload: articleDocument,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error adding comment" });
  }
});