import { useState } from "react";

import {
  ArrowRight,
  Check,
  Link2,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { register } from "../services/authApi";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      alert("Registration successful! Please login.");

      navigate("/login");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const passwordsMatch =
    formData.confirmPassword.length > 0 &&
    formData.password === formData.confirmPassword;

  const features = [
    "Unlimited short links",
    "Click analytics & tracking",
    "Custom link management",
  ];

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* Left decorative panel */}
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
        {/* Glow accents */}
        <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-violet-600 opacity-[0.12] blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-16 w-[360px] h-[360px] rounded-full bg-blue-600 opacity-[0.10] blur-[90px] pointer-events-none" />

        {/* Headline */}
        <div className="relative space-y-7">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
            Get started free
          </p>
          <h2 className="text-4xl font-bold leading-tight text-white xl:text-5xl">
            Everything you need
            <br />
            <span className="text-violet-400">in one place.</span>
          </h2>
          <p className="max-w-sm text-base leading-relaxed text-slate-400">
            Join to manage, track, and share links that actually perform.
          </p>

          {/* Feature list */}
          <ul className="space-y-3 pt-1">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-500/20">
                  <Check
                    className="h-3 w-3 text-violet-400"
                    strokeWidth={2.5}
                  />
                </div>
                <span className="text-sm text-slate-400">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <p className="relative text-xs text-slate-600">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>

      {/* Right — register form */}
      <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2 xl:w-[45%]">
        {/* Mobile-only brand mark */}
        <div className="mb-8 flex items-center gap-2 lg:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <Link2 className="h-4 w-4 text-white" strokeWidth={2.5} />
          </div>
        </div>

        <div className="w-full max-w-[400px]">
          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Create your account
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">Free forever</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div className="space-y-1.5">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-slate-700"
              >
                Username
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="username"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="yourname"
                  required
                  autoComplete="username"
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 shadow-sm outline-none transition duration-150 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-slate-300"
                />
              </div>
            </div>

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
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  required
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 shadow-sm outline-none transition duration-150 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-slate-300"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-slate-700"
              >
                Confirm password
              </label>
              <div className="relative">
                <ShieldCheck className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  required
                  autoComplete="new-password"
                  className={`w-full rounded-xl border bg-white py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder-slate-400 shadow-sm outline-none transition duration-150 hover:border-slate-300 ${
                    formData.confirmPassword.length > 0
                      ? passwordsMatch
                        ? "border-emerald-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                        : "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-400/20"
                      : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  }`}
                />
                {/* Match indicator */}
                {formData.confirmPassword.length > 0 && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {passwordsMatch ? (
                      <Check
                        className="h-4 w-4 text-emerald-500"
                        strokeWidth={2.5}
                      />
                    ) : (
                      <span className="block h-4 w-4 text-center text-xs leading-4 font-bold text-red-400">
                        ✕
                      </span>
                    )}
                  </div>
                )}
              </div>
              {formData.confirmPassword.length > 0 && !passwordsMatch && (
                <p className="text-xs text-red-500">Passwords don't match.</p>
              )}
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
                  <span>Creating account…</span>
                </>
              ) : (
                <>
                  <span>Create account</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 border-t border-slate-100" />

          {/* Login link */}
          <p className="text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-600 underline-offset-2 transition hover:underline"
            >
              Sign in instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
