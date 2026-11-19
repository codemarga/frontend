/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { signIn } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FloatingLabelInput from "@/components/floatingInput";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Code2, ArrowLeft } from "lucide-react";

function Login() {
  const router = useRouter();

  const [user, setUser] = useState({ email: "", password: "" });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  useEffect(() => {
    setButtonDisabled(user.email.trim() === "" || user.password.trim() === "");
  }, [user]);

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (buttonDisabled) return;
    setLoading(true);

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_LOGIN_URL!,
        {
          email: user.email,
          password: user.password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const { access, refresh } = response.data;
      if (access) {
        document.cookie = `access=${access}; path=/; secure; samesite=strict;`;
      }
      if (refresh) {
        document.cookie = `refresh=${refresh}; path=/; secure; samesite=strict;`;
      }

      toast.success("Login successful!");
      router.push("/profile");
    } catch (error: any) {
      if (error.response) {
        const statusCode = error.response.status;
        const errorMessage =
          error.response.data?.error ||
          (statusCode === 401
            ? "Invalid credentials, please try again."
            : "An error occurred. Please try again later.");
        toast.error(errorMessage);
      } else {
        toast.error("Network error. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: "google" | "github") => {
    try {
      setSocialLoading(provider);
      await signIn(provider, { callbackUrl: "/profile" });
    } catch (err: any) {
      toast.error(`Failed to sign in with ${provider}`);
      setSocialLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative">
      {/* Top back button */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Left Branding Panel */}
        <div className="hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border-r border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
              <Code2 className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tight text-white">CodeMarga</span>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-extrabold text-white leading-tight">
              Master Data Structures & Algorithms.
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Solve curated problems, join live competitive coding contests, and test your code across multiple programming languages.
            </p>
          </div>

          <div className="text-xs text-slate-500">
            &copy; 2026 CodeMarga. Independent accounts supported for Google and GitHub.
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="p-8 sm:p-10 flex flex-col justify-center">
          <div className="mb-6 text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Welcome Back
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Choose your preferred sign-in method
            </p>
          </div>

          {/* Social Sign-In Buttons */}
          <div className="space-y-3 mb-6">
            <button
              type="button"
              disabled={socialLoading !== null}
              onClick={() => handleOAuthSignIn("google")}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-slate-600 rounded-xl text-sm font-semibold text-white shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              <FcGoogle className="w-5 h-5" />
              <span>
                {socialLoading === "google" ? "Connecting to Google..." : "Continue with Google"}
              </span>
            </button>

            <button
              type="button"
              disabled={socialLoading !== null}
              onClick={() => handleOAuthSignIn("github")}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-slate-600 rounded-xl text-sm font-semibold text-white shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              <FaGithub className="w-5 h-5 text-white" />
              <span>
                {socialLoading === "github" ? "Connecting to GitHub..." : "Continue with GitHub"}
              </span>
            </button>

            <p className="text-[11px] text-center text-slate-500 pt-1">
              Google and GitHub accounts are treated as independent profiles with separate contest ranks and ratings.
            </p>
          </div>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 px-3 text-slate-500 font-medium tracking-wider">
                Or with email
              </span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-slate-900">
              <FloatingLabelInput
                id="email"
                name="email"
                value={user.email}
                placeholder="Email Address"
                onChange={handleChanges}
              />
            </div>

            <div className="text-slate-900">
              <FloatingLabelInput
                id="password"
                name="password"
                value={user.password}
                placeholder="Password"
                onChange={handleChanges}
              />
            </div>

            <button
              type="submit"
              disabled={buttonDisabled || loading}
              className={`w-full py-3 rounded-xl text-sm font-semibold text-white shadow-md transition-all ${
                buttonDisabled || loading
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                  : "bg-indigo-600 hover:bg-indigo-500 active:scale-[0.99] shadow-indigo-600/30"
              }`}
            >
              {loading ? "Signing in..." : "Sign In with Email"}
            </button>
          </form>

          {/* Footer Navigation */}
          <div className="mt-6 text-center text-xs text-slate-400">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer theme="dark" />
    </div>
  );
}

export default Login;
