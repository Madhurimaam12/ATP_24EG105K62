import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { commonApi } from "../api/axiosClient";

function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [featuredArticle, setFeaturedArticle] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const res = await commonApi.get("/public-articles");
        const allArticles = res.data.payload || [];
        setArticles(allArticles.slice(1));
        setFeaturedArticle(allArticles[0]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-gray-100 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading stories...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-gray-50">
      
      {/* Hero Section - Bold & Beautiful */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-linear-to-r from-indigo-500/5 to-purple-500/5"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-full mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span className="text-xs font-medium text-indigo-600 tracking-wide">Welcome to Blogverse</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-linear-to-r from-gray-900 via-indigo-800 to-gray-900 bg-clip-text text-transparent leading-tight">
            Stories that<br />inspire the world
          </h1>
          
          <p className="text-gray-500 text-lg max-w-2xl mx-auto mt-6">
            Join thousands of writers sharing their ideas, experiences, and creativity with a global audience.
          </p>
          
          <div className="flex gap-4 justify-center mt-10">
            <Link 
              to="/register" 
              className="bg-linear-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Start writing
            </Link>
            <Link 
              to="/login" 
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-full font-medium hover:border-indigo-600 hover:text-indigo-600 transition-all duration-300"
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="bg-linear-to-r from-indigo-50 to-purple-50 rounded-3xl overflow-hidden shadow-sm">
            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
                  Featured Story
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                  {featuredArticle.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {featuredArticle.content?.slice(0, 200)}...
                </p>
                <div className="flex items-center gap-4 pt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-linear-to-r from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                      {featuredArticle.author?.firstName?.[0] || featuredArticle.author?.name?.[0] || 'A'}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {featuredArticle.author?.firstName || featuredArticle.author?.name || 'Anonymous'}
                      </p>
                      <p className="text-xs text-gray-400">{new Date(featuredArticle.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <Link 
                    to={`/article/${featuredArticle._id}`}
                    className="ml-auto text-indigo-600 font-medium hover:text-indigo-700 transition"
                  >
                    Read full story →
                  </Link>
                </div>
              </div>
              <div className="bg-linear-to-br from-indigo-200 to-purple-200 rounded-2xl min-h-62.5 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-20 h-20 text-indigo-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  <p className="text-indigo-500 text-sm mt-2">Illustration</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Recent Articles Grid */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-indigo-600 text-sm font-semibold uppercase tracking-wide">Latest stories</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">Recently published</h2>
          </div>
          <Link to="/articles" className="text-indigo-600 hover:text-indigo-700 font-medium">
            View all →
          </Link>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl">
            <div className="text-6xl mb-4">📖</div>
            <p className="text-gray-400">No articles yet. Be the first to write!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link 
                key={article._id} 
                to={`/article/${article._id}`}
                className="group bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-100"
              >
                <div className="h-48 bg-linear-to-br from-indigo-100 to-purple-100 group-hover:scale-105 transition-transform duration-500"></div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                    <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span className="text-indigo-600">{article.category || "Article"}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                    {article.content?.slice(0, 100)}...
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-indigo-600 font-medium">
                    Read article 
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to share your story?
          </h2>
          <p className="text-indigo-100 text-lg mb-8">
            Join our community of writers and start publishing today.
          </p>
          <Link 
            to="/register"
            className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Get started for free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 mt-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Blogverse</h3>
              <p className="text-gray-400 text-sm mt-2">Where stories come alive.</p>
            </div>
            <div className="grid grid-cols-3 gap-8 text-sm">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Explore</h4>
                <ul className="space-y-2 text-gray-500">
                  <li><Link to="/" className="hover:text-indigo-600 transition">Home</Link></li>
                  <li><Link to="/articles" className="hover:text-indigo-600 transition">Articles</Link></li>
                  <li><Link to="/about" className="hover:text-indigo-600 transition">About</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Join</h4>
                <ul className="space-y-2 text-gray-500">
                  <li><Link to="/register" className="hover:text-indigo-600 transition">Sign up</Link></li>
                  <li><Link to="/login" className="hover:text-indigo-600 transition">Login</Link></li>
                  <li><Link to="/become-author" className="hover:text-indigo-600 transition">Become an author</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Legal</h4>
                <ul className="space-y-2 text-gray-500">
                  <li><Link to="/privacy" className="hover:text-indigo-600 transition">Privacy</Link></li>
                  <li><Link to="/terms" className="hover:text-indigo-600 transition">Terms</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="text-center pt-8 mt-8 border-t border-gray-100">
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Blogverse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
