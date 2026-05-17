import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/authStore";
import { authorApi } from "../api/axiosClient";
import { toast } from "react-hot-toast";

import {
  pageBackground,
  formCard,
  formTitle,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
  errorClass,
} from "../styles/common";

function WriteArticles() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    author: currentUser?.id,
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      setError("Title is required");
      return;
    }
    if (!formData.content.trim()) {
      setError("Content is required");
      return;
    }
    if (!formData.category) {
      setError("Category is required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await authorApi.post("/article", formData);

      if (response.status === 201) {
        toast.success("Article published successfully!");
        navigate("/author-profile/articles");
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.response?.data?.message || "Failed to create article");
      toast.error("Failed to publish article");
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "Technology",
    "Programming",
    "Web Development",
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "Data Science",
    "AI & Machine Learning",
    "Startup",
    "Business",
    "Marketing",
    "Design",
    "Travel",
    "Food",
    "Lifestyle",
  ];

  return (
    <div className={`${pageBackground} py-8 px-4 min-h-screen`}>
      <div className={`${formCard} max-w-4xl mx-auto`}>
        <h2 className={formTitle}>Write a New Article</h2>
        
        {error && <p className={errorClass}>{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className={formGroup}>
            <label className={labelClass}>Article Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter a compelling title..."
              className={inputClass}
              disabled={loading}
              required
            />
          </div>

          {/* Category */}
          <div className={formGroup}>
            <label className={labelClass}>Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={inputClass}
              disabled={loading}
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Content */}
          <div className={formGroup}>
            <label className={labelClass}>Article Content *</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your article content here..."
              rows={15}
              className={`${inputClass} resize-y`}
              disabled={loading}
              required
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className={submitBtn}
              disabled={loading}
            >
              {loading ? "Publishing..." : "Publish Article"}
            </button>
            
            <button
              type="button"
              onClick={() => navigate("/author-profile/articles")}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WriteArticles;
