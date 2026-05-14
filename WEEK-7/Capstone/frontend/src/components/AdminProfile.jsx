import { useAuth } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import {
  loadingClass,
  errorClass,
} from "../styles/common.js";

function AdminProfile() {
  const logout = useAuth((state) => state.logout);
  const currentUser = useAuth((state) => state.currentUser);
  const navigate = useNavigate();

  const onLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* PROFILE HEADER */}
      <div className="bg-white border border-[#e8e8ed] rounded-3xl p-6 mb-8 shadow-sm flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          {currentUser?.profileImageUrl ? (
            <img
              src={currentUser.profileImageUrl}
              className="w-16 h-16 rounded-full object-cover border"
              alt="profile"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-red-600/10 text-red-600 flex items-center justify-center text-xl font-semibold">
              {currentUser?.firstName?.charAt(0).toUpperCase()}
            </div>
          )}

          {/* Name */}
          <div>
            <p className="text-sm text-[#6e6e73]">Administrator Dashboard</p>
            <h2 className="text-xl font-semibold text-[#1d1d1f]">{currentUser?.firstName} {currentUser?.lastName}</h2>
            <p className="text-xs text-red-600 font-medium uppercase tracking-wider mt-1">Admin Access Granted</p>
          </div>
        </div>

        {/* LOGOUT */}
        <button
          className="bg-[#ff3b30] text-white text-sm px-5 py-2 rounded-full hover:bg-[#d62c23] transition"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>

      {/* ADMIN CONTROLS SECTION */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-[#1d1d1f] mb-4">Admin Controls</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-[#e8e8ed] p-6 rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer">
            <h4 className="font-semibold text-[#1d1d1f]">Manage Users</h4>
            <p className="text-sm text-[#6e6e73] mt-2">View and manage all registered users.</p>
          </div>
          <div className="bg-white border border-[#e8e8ed] p-6 rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer">
            <h4 className="font-semibold text-[#1d1d1f]">Manage Articles</h4>
            <p className="text-sm text-[#6e6e73] mt-2">Oversee and moderate all blog posts.</p>
          </div>
          <div className="bg-white border border-[#e8e8ed] p-6 rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer">
            <h4 className="font-semibold text-[#1d1d1f]">System Settings</h4>
            <p className="text-sm text-[#6e6e73] mt-2">Configure application-wide parameters.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;