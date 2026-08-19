"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShoppingBag,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      setErrorMessage("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const { data, error } =
        await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

      if (error) {
        throw error;
      }

      if (!data.user) {
        throw new Error("Unable to sign in. Please try again.");
      }

      setSuccessMessage("Login successful. Redirecting...");

      /*
       * Full page navigation ensures the new auth cookies/session
       * are picked up by the next request.
       */
      window.location.replace("/dashboard");
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Invalid email or password.";

      if (
        message.toLowerCase().includes("email not confirmed")
      ) {
        setErrorMessage(
          "Please verify your email address before signing in."
        );
      } else if (
        message.toLowerCase().includes("invalid login credentials")
      ) {
        setErrorMessage(
          "Incorrect email or password. Please try again."
        );
      } else {
        setErrorMessage(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#faf9f7] text-zinc-900">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* LEFT */}
        <section className="relative hidden overflow-hidden bg-zinc-950 lg:flex">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.18),transparent_32%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.06),transparent_30%)]" />

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">

            <Link
              href="/"
              className="flex w-fit items-center gap-3 text-white"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#d4af37] text-black">
                <ShoppingBag size={22} />
              </div>

              <span className="text-2xl font-bold tracking-tight">
                Prime<span className="text-[#d4af37]">Cart</span>
              </span>
            </Link>

            <div className="max-w-xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
                Welcome back
              </p>

              <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight text-white xl:text-6xl">
                Your shopping
                <br />
                <span className="text-[#d4af37]">
                  starts here.
                </span>
              </h1>

              <p className="mt-7 max-w-lg text-lg leading-8 text-zinc-400">
                Sign in to continue shopping, manage your account
                and keep everything in one place.
              </p>
            </div>

            <p className="text-xs text-zinc-600">
              © {new Date().getFullYear()} PrimeCart. All rights reserved.
            </p>
          </div>
        </section>

        {/* LOGIN */}
        <section className="flex items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-md">

            {/* MOBILE LOGO */}
            <Link
              href="/"
              className="mb-10 flex items-center justify-center gap-3 lg:hidden"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-950 text-[#d4af37]">
                <ShoppingBag size={22} />
              </div>

              <span className="text-2xl font-bold">
                Prime<span className="text-[#b89124]">Cart</span>
              </span>
            </Link>

            <div className="mb-8">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#b89124]">
                Sign in
              </p>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Welcome back
              </h2>

              <p className="mt-3 text-sm leading-6 text-zinc-500">
                Sign in to your PrimeCart account to continue.
              </p>
            </div>

            {errorMessage && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
                {errorMessage}
              </div>
            )}

            {successMessage && (
              <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">

              {/* EMAIL */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="h-12 w-full rounded-xl border border-zinc-200 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-[#c6a227] focus:ring-4 focus:ring-[#d4af37]/10"
                    required
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium">
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-[#a47f16] hover:text-[#7d5f0e]"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="h-12 w-full rounded-xl border border-zinc-200 bg-white pl-11 pr-12 text-sm outline-none transition focus:border-[#c6a227] focus:ring-4 focus:ring-[#d4af37]/10"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* LOGIN */}
              <button
                type="submit"
                disabled={loading}
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-zinc-950 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight
                      size={17}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>

            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-zinc-200" />
              <span className="text-xs text-zinc-400">
                NEW TO PRIMECART?
              </span>
              <div className="h-px flex-1 bg-zinc-200" />
            </div>

            <Link
              href="/register"
              className="flex h-12 w-full items-center justify-center rounded-xl border border-zinc-300 bg-white text-sm font-semibold transition hover:border-zinc-950 hover:bg-zinc-50"
            >
              Create a new account
            </Link>

          </div>
        </section>
      </div>
    </main>
  );
}
