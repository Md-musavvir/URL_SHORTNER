import { useState } from "react";

import { ArrowRight, Link2, Loader2, Lock, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { login } from "../services/authApi";

function Login() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await login(formData);

      loginUser(response.data.data.user);

      navigate("/dashboard");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* Left decorative panel — hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] flex-col justify-between bg-[#0f172a] px-14 py-12 relative overflow-hidden">
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-blue-600 opacity-[0.12] blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-16 w-[360px] h-[360px] rounded-full bg-violet-600 opacity-[0.10] blur-[90px] pointer-events-none" />

        <div className="relative space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
            URL Management
          </p>
          <h2 className="text-4xl font-bold leading-tight text-white xl:text-5xl">
            Shorter links,
            <br />
            <span className="text-blue-400">bigger reach.</span>
          </h2>
          <p className="max-w-sm text-base leading-relaxed text-slate-400">
            Create, track, and manage all your shortened URLs from one clean
            dashboard. Built for teams that move fast.
          </p>
        </div>

        {/* Footer */}
        <p className="relative text-xs text-slate-600">
          © {new Date().getFullYear()} Sniply. All rights reserved.
        </p>
      </div>

      {/* Right — login form */}
      <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2 xl:w-[45%]">
        {/* Mobile-only brand mark */}
        <div className="mb-8 flex items-center gap-2 lg:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <Link2 className="h-4 w-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-base font-semibold tracking-tight text-slate-800">
            Snip<span className="text-blue-500">.</span>ly
          </span>
        </div>

        <div className="w-full max-w-[400px]">
          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Welcome back
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">
              Sign in to your account to continue.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700"
              >
                Email address
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 shadow-sm outline-none transition duration-150 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-slate-300"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700"
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 shadow-sm outline-none transition duration-150 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-slate-300"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group relative mt-2 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-500/20 transition duration-150 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Signing in…</span>
                </>
              ) : (
                <>
                  <span>Sign in</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100" />
            </div>
          </div>

          {/* Register link */}
          <p className="text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-600 underline-offset-2 transition hover:underline"
            >
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
