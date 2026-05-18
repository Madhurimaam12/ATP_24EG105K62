import exp from "express";
import { UserModel } from "../models/UserModel.js";
import { ArticleModel } from "../models/ArticleModel.js";
import { verifyToken } from "../middlewares/VerifyToken.js";

export const authorApp = exp.Router();

//Write Article
authorApp.post("/article", verifyToken("AUTHOR"), async (req, res) => {
  try {
    console.log("Creating new article...");
    console.log("Request body:", req.body);
    console.log("User from token:", req.user);
    
    // Get article data from client
    const { title, category, content, imageUrl, tags } = req.body;
    
    // Validate required fields
    if (!title || !category || !content) {
      return res.status(400).json({ 
        success: false,
        message: "Missing required fields: title, category, and content are required" 
      });
    }
    
    // Get user from decoded token
    const user = req.user;
    const authorId = user.id;
    
    // Verify author exists in database
    let author = await UserModel.findById(authorId);
    if (!author) {
      return res.status(404).json({ 
        success: false,
        message: "Author not found" 
      });
    }
    
    // Check if author role is correct
    if (author.role !== "AUTHOR" && author.role !== "ADMIN") {
      return res.status(403).json({ 
        success: false,
        message: "User is not authorized as an author" 
      });
    }
    
    // Create article document
    const articleDoc = new ArticleModel({
      author: authorId,
      title: title.trim(),
      category: category.trim(),
      content: content,
      imageUrl: imageUrl || null,
      tags: tags || [],
      comments: [],
      isArticleActive: true
    });
    
    // Save to database
    await articleDoc.save();
    
    // Populate author info for response
    const populatedArticle = await ArticleModel.findById(articleDoc._id)
      .populate("author", "firstName lastName email profileImageUrl");
    
    console.log(`Article published successfully! ID: ${articleDoc._id}`);
    
    // Send success response
    res.status(201).json({ 
      success: true,
      message: "Article published successfully",
      payload: populatedArticle
    });
    
  } catch (error) {
    console.error("Error creating article:", error);
    res.status(500).json({ 
      success: false,
      message: "Failed to create article",
      error: process.env.NODE_ENV === 'development' ? error.message : "Internal server error"
    });
  }
});

// read own articles
authorApp.get("/articles", verifyToken("AUTHOR"), async (req, res) => {
  try {
    console.log("Fetching author's articles...");
    
    // Get author id from decoded token
    const authorIdOfToken = req.user?.id;
    
    if (!authorIdOfToken) {
      return res.status(401).json({ 
        success: false,
        message: "User not authenticated" 
      });
    }
    
    // Get articles by author id
    const articlesList = await ArticleModel.find({ 
      author: authorIdOfToken 
    }).sort({ createdAt: -1 });
    
    console.log(`Found ${articlesList.length} articles for author`);
    
    // Send response
    res.status(200).json({ 
      success: true,
      message: "Articles fetched successfully",
      payload: articlesList,
      count: articlesList.length
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

//Edit Article
authorApp.put("/articles", verifyToken("AUTHOR"), async (req, res) => {
  try {
    console.log("Editing article...");
    
    // Get author id from decoded token
    const authorIdOfToken = req.user?.id;
    
    // Get modified article from client
    const { articleId, title, category, content, imageUrl } = req.body;
    
    // Validate required fields
    if (!articleId) {
      return res.status(400).json({ 
        success: false,
        message: "Article ID is required" 
      });
    }
    
    // Build update object 
    const updateData = {};
    if (title) updateData.title = title.trim();
    if (category) updateData.category = category.trim();
    if (content) updateData.content = content;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
    
    // Find and update article
    const modifiedArticle = await ArticleModel.findOneAndUpdate(
      { _id: articleId, author: authorIdOfToken },
      { $set: updateData },
      { new: true, runValidators: true }
    );
    
    // If either article id or author not correct
    if (!modifiedArticle) {
      return res.status(403).json({ 
        success: false,
        message: "Not authorized to edit article or article not found" 
      });
    }
    
    console.log(`Article modified successfully! ID: ${articleId}`);
    
    // Send response
    res.status(200).json({ 
      success: true,
      message: "Article modified successfully",
      payload: modifiedArticle 
    });
    
  } catch (error) {
    console.error("Error editing article:", error);
    res.status(500).json({ 
      success: false,
      message: "Failed to edit article",
      error: process.env.NODE_ENV === 'development' ? error.message : "Internal server error"
    });
  }
});

// Delete Article
authorApp.patch("/articles", verifyToken("AUTHOR"), async (req, res) => {
  try {
    console.log("Soft deleting article...");
    
    // Get author id from decoded token
    const authorIdOfToken = req.user?.id;
    
    // Get data from client
    const { articleId, isArticleActive } = req.body;
    
    // Validate input
    if (!articleId) {
      return res.status(400).json({ 
        success: false,
        message: "Article ID is required" 
      });
    }
    
    if (typeof isArticleActive !== 'boolean') {
      return res.status(400).json({ 
        success: false,
        message: "isArticleActive must be a boolean" 
      });
    }
    
    // Get article by id and author
    const articleOfDB = await ArticleModel.findOne({ 
      _id: articleId, 
      author: authorIdOfToken 
    });
    
    if (!articleOfDB) {
      return res.status(404).json({ 
        success: false,
        message: "Article not found" 
      });
    }
    
    // Check if already in the same state
    if (isArticleActive === articleOfDB.isArticleActive) {
      return res.status(200).json({ 
        success: true,
        message: `Article is already ${isArticleActive ? 'active' : 'inactive'}`,
        payload: articleOfDB 
      });
    }
    
    // Update status
    articleOfDB.isArticleActive = isArticleActive;
    await articleOfDB.save();
    
    console.log(`Article ${isArticleActive ? 'activated' : 'deactivated'} successfully! ID: ${articleId}`);
    
    // Send Response
    res.status(200).json({ 
      success: true,
      message: `Article ${isArticleActive ? 'activated' : 'deactivated'} successfully`,
      payload: articleOfDB 
    });
    
  } catch (error) {
    console.error("Error updating article status:", error);
    res.status(500).json({ 
      success: false,
      message: "Failed to update article status",
      error: process.env.NODE_ENV === 'development' ? error.message : "Internal server error"
    });
  }
});

// get single article
authorApp.get("/article/:id", verifyToken("AUTHOR"), async (req, res) => {
  try {
    const { id } = req.params;
    const authorId = req.user?.id;
    
    const article = await ArticleModel.findOne({ 
      _id: id, 
      author: authorId 
    }).populate("author", "firstName lastName email profileImageUrl");
    
    if (!article) {
      return res.status(404).json({ 
        success: false,
        message: "Article not found or you don't have permission to view it" 
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
