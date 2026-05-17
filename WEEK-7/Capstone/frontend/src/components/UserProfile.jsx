import { useEffect, useState } from "react";
import { useAuth } from "../store/authStore";
import { commonApi } from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const res = await commonApi.get("/public-articles");
      if (res.status === 200) {
        setArticles(res.data.payload);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const onLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            {currentUser?.profileImageUrl ? (
              <img
                src={currentUser.profileImageUrl}
                className="w-16 h-16 rounded-full object-cover"
                alt="profile"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold">
                {currentUser?.firstName?.charAt(0)}
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold">
                {currentUser?.firstName} {currentUser?.lastName}
              </h1>
              <p className="text-gray-600">{currentUser?.email}</p>
              <p className="text-sm text-blue-600 mt-1">Role: {currentUser?.role}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Articles Section */}
      <h2 className="text-xl font-semibold mb-4">Latest Articles</h2>
      
      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Loading articles...</p>
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg shadow-md">
          <p className="text-gray-500">No articles available yet.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {articles.map((article) => (
            <div key={article._id} className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{article.title}</h3>
              <div className="flex gap-4 text-sm text-gray-500 mb-3">
                <span>Category: {article.category}</span>
                <span>Author: {article.author?.firstName || "Unknown"} {article.author?.lastName || ""}</span>
                <span>Date: {new Date(article.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="text-gray-700 mt-2">{article.content?.slice(0, 200)}...</p>
              <button 
                onClick={() => navigate(`/article/${article._id}`)}
                className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Read More →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserProfile;
