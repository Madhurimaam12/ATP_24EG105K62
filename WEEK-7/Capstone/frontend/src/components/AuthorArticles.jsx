import { useEffect, useState } from "react";
import { authorApi } from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/authStore";

function AuthorArticles() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUser) return;
    fetchArticles();
  }, [currentUser]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await authorApi.get("/articles");
      if (response.status === 200) {
        setArticles(response.data.payload);
      }
    } catch (err) {
      console.error("Error fetching articles:", err);
      setError(err.response?.data?.message || "Failed to fetch articles");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-gray-500">Loading your articles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        {error}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500 mb-4">You haven't written any articles yet.</p>
        <button
          onClick={() => navigate("/author-profile/write-article")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Write Your First Article
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <div
          key={article._id}
          className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          {article.featuredImage && (
            <img
              src={article.featuredImage}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4">
            <span className="text-xs text-blue-600 font-medium">
              {article.category}
            </span>
            <h3 className="text-lg font-semibold text-gray-800 mt-1 mb-2">
              {article.title}
            </h3>
            <p className="text-gray-600 text-sm mb-3">
              {article.content?.slice(0, 100)}...
            </p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">
                {new Date(article.createdAt).toLocaleDateString()}
              </span>
              <button
                onClick={() => navigate(`/article/${article._id}`)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Read More →
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AuthorArticles;
