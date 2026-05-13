import { NavLink } from "react-router-dom";
import { useAuth } from "../store/authStore";
import {
  navbarClass,
  navContainerClass,
  navBrandClass,
  navLinksClass,
  navLinkClass,
  navLinkActiveClass,
} from "../styles/common";

function Header() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.currentUser);

  const getProfilePath = () => {
    if (!user) return "/";
    if (user.role === "AUTHOR") return "/author-profile";
    if (user.role === "ADMIN") return "/admin-profile";
    return "/user-profile";
  };

  return (
    <nav className={navbarClass}>
      <div className={navContainerClass}>
        <NavLink to="/" className={navBrandClass}>
          MyBlog
        </NavLink>

        <ul className={navLinksClass}>
          <li>
            <NavLink to="/" end className={({ isActive }) => (isActive ? navLinkActiveClass : navLinkClass)}>
              Home
            </NavLink>
          </li>

          {!isAuthenticated ? (
            <>
              <li>
                <NavLink to="/register" className={({ isActive }) => (isActive ? navLinkActiveClass : navLinkClass)}>
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" className={({ isActive }) => (isActive ? navLinkActiveClass : navLinkClass)}>
                  Login
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <NavLink to={getProfilePath()} className={({ isActive }) => (isActive ? navLinkActiveClass : navLinkClass)}>
                Dashboard
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
