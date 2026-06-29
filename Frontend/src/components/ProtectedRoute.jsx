import { Link2, Loader2 } from "lucide-react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#f8fafc]">
        <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-500/20">
          <Link2 className="h-5 w-5 text-white" strokeWidth={2.5} />
          <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white shadow">
            <Loader2 className="h-2.5 w-2.5 animate-spin text-blue-600" />
          </span>
        </div>

        <div className="text-center">
          <p className="text-sm font-semibold text-slate-700">
            Snip<span className="text-blue-500">.</span>ly
          </p>
          <p className="mt-0.5 text-xs text-slate-400">
            Verifying your session…
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
