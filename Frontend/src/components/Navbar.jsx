import { Link2, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { logout } from "../services/authApi";

function Navbar() {
  const navigate = useNavigate();
  const { logoutUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      logoutUser();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <Link
          to="/"
          className="group flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 transition duration-150 group-hover:bg-blue-700">
            <Link2 className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-sm font-semibold tracking-tight text-slate-800">
            Snip<span className="text-blue-500">.</span>ly
          </span>
        </Link>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="group flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 shadow-sm transition duration-150 hover:border-red-200 hover:bg-red-50 hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 active:scale-[0.98]"
        >
          <LogOut className="h-3.5 w-3.5 transition-transform duration-150 group-hover:-translate-x-0.5" />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
