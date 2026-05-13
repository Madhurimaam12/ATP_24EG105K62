import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axiosClient";

function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const res = await api.get("/user-api/articles");
        setArticles(res.data.payload || []);
      } catch (err) {
        setError(err.response?.data?.error || "Unable to load articles.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 py-24 md:py-32">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm text-indigo-600 uppercase tracking-[0.2em] mb-6">
            BLOGVERSE
          </p>
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 leading-tight">
            Write. Share. Inspire.
          </h1>
          <p className="text-gray-500 text-lg font-light leading-relaxed mt-6">
            A minimalist platform for thoughtful writers and curious readers.
          </p>
          <div className="flex gap-4 justify-center mt-10">
            <Link 
              to="/register" 
              className="bg-indigo-600 text-white px-8 py-3 text-sm hover:bg-indigo-700 transition duration-300 rounded-full"
            >
              Get started
            </Link>
            <Link 
              to="/login" 
              className="text-gray-600 text-sm hover:text-indigo-600 transition duration-300 px-8 py-3"
            >
              Sign in →
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-4xl mx-auto px-6 py-16 border-t border-gray-100">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center group">
            <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-100 transition">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
              Write
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Create and publish your stories with a clean, distraction-free editor.
            </p>
          </div>
          <div className="text-center group">
            <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-100 transition">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
              Read
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Discover thoughtful articles from writers around the world.
            </p>
          </div>
          <div className="text-center group">
            <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-100 transition">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
              Connect
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Engage with authors and build your reading community.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="max-w-4xl mx-auto px-6 py-16 border-t border-gray-100">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-xs text-indigo-600 uppercase tracking-[0.2em] mb-2">
              Latest stories
            </p>
            <h2 className="text-2xl font-light text-gray-900">
              Recently published
            </h2>
          </div>
          <Link 
            to="/register" 
            className="text-xs text-gray-400 hover:text-indigo-600 transition uppercase tracking-wide"
          >
            Join → 
          </Link>
        </div>

        {loading ? (
          <div className="space-y-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="animate-pulse">
                <div className="h-4 bg-gray-100 rounded w-1/4 mb-4"></div>
                <div className="h-6 bg-gray-100 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-100 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-100 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <p className="text-red-500 text-sm">{error}</p>
        ) : articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-sm">No articles yet.</p>
            <p className="text-gray-400 text-sm mt-2">Be the first to write something.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {articles.map((article) => (
              <article key={article._id} className="group border-b border-gray-50 pb-8 last:border-0">
                <div className="flex gap-2 mb-3">
                  <span className="text-xs text-indigo-600 uppercase tracking-wide">
                    {article.category || "Uncategorized"}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-xs text-gray-400">
                    {new Date(article.createdAt).toLocaleDateString("en-US", {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <Link to={`/article/${article._id}`}>
                  <h3 className="text-xl font-light text-gray-900 group-hover:text-indigo-600 transition mb-3">
                    {article.title}
                  </h3>
                </Link>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                  {article.content.slice(0, 200)}...
                </p>
                <Link 
                  to={`/article/${article._id}`} 
                  className="inline-block mt-4 text-xs text-gray-400 hover:text-indigo-600 transition"
                >
                  Read story →
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 mt-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div>
              <p className="text-xs text-indigo-600 uppercase tracking-wide mb-2">
                Blogverse
              </p>
              <p className="text-xs text-gray-400">
                A space for thoughtful writing.
              </p>
            </div>
            <div className="flex gap-8">
              <div>
                <h4 className="text-xs font-medium text-gray-900 uppercase tracking-wide mb-3">
                  Explore
                </h4>
                <ul className="space-y-2">
                  <li><Link to="/" className="text-xs text-gray-500 hover:text-indigo-600 transition">Home</Link></li>
                  <li><Link to="/register" className="text-xs text-gray-500 hover:text-indigo-600 transition">Create account</Link></li>
                  <li><Link to="/login" className="text-xs text-gray-500 hover:text-indigo-600 transition">Login</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-medium text-gray-900 uppercase tracking-wide mb-3">
                  Legal
                </h4>
                <ul className="space-y-2">
                  <li><Link to="/privacy" className="text-xs text-gray-500 hover:text-indigo-600 transition">Privacy</Link></li>
                  <li><Link to="/terms" className="text-xs text-gray-500 hover:text-indigo-600 transition">Terms</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="text-center mt-12 pt-8 border-t border-gray-200">
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} Blogverse. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;