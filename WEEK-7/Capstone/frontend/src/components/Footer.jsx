import { Link } from "react-router-dom";
import { pageWrapper, mutedText } from "../styles/common";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#f8f8fa] border-t border-[#e8e8ed] text-[#1d1d1f]">
      <div className={`${pageWrapper} grid gap-10 lg:grid-cols-3 py-12`}>
        <div className="space-y-4">
          <p className="text-xl font-semibold">MyBlog</p>
          <p className="max-w-md text-sm text-[#6e6e73] leading-relaxed">
            MyBlog helps readers discover thoughtful articles and authors share stories in a clean,
            distraction-free environment.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-[#1d1d1f] uppercase tracking-[0.18em] mb-4">Explore</p>
            <ul className="space-y-3 text-sm text-[#6e6e73]">
              <li>
                <Link to="/" className="hover:text-[#0066cc] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-[#0066cc] transition-colors">
                  Create account
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-[#0066cc] transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-[#1d1d1f] uppercase tracking-[0.18em] mb-4">Support</p>
            <ul className="space-y-3 text-sm text-[#6e6e73]">
              <li>
                <a href="mailto:support@myblog.com" className="hover:text-[#0066cc] transition-colors">
                  support@myblog.com
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-[#0066cc] transition-colors">
                  Privacy policy
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-[#0066cc] transition-colors">
                  Terms of service
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-[#e8e8ed]">
        <div className={`${pageWrapper} flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between py-5`}>
          <p className={mutedText}>© {currentYear} MyBlog. All rights reserved.</p>
          <p className={mutedText}>Crafted for readers, writers, and storytellers.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;