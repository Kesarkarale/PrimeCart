"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  LogIn,
  Truck,
  RotateCcw,
  ShieldCheck,
  Headphones,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

      if (loginError) {
        if (
          loginError.message
            .toLowerCase()
            .includes("email not confirmed")
        ) {
          throw new Error(
            "Please verify your email before logging in."
          );
        }

        throw new Error("Invalid email or password.");
      }

      if (!data.user) {
        throw new Error("Login failed. Please try again.");
      }

      setSuccess("Login successful! Redirecting...");

      // Login successful → Dashboard
      window.location.href = "/dashboard";
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#faf8f4] px-3 py-4 sm:px-5 sm:py-6">
      <div className="mx-auto max-w-[1400px] overflow-hidden rounded-[24px] bg-white shadow-[0_8px_40px_rgba(0,0,0,0.08)]">

        {/* MAIN */}
        <div className="grid min-h-[760px] lg:grid-cols-[48%_52%]">

          {/* LEFT BANNER */}
          <section className="relative hidden overflow-hidden lg:block">
            <img
              src="/login-banner.png"
              alt="PrimeCart shopping"
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/5" />

            {/* Logo */}
            <Link
              href="/"
              className="absolute left-9 top-9 z-10"
            >
              <div className="flex items-center gap-2">
                <div className="text-[30px] leading-none text-[#c99516]">
                  🛒
                </div>

                <div>
                  <div className="text-[27px] font-extrabold tracking-tight text-[#111]">
                    Prime<span className="text-[#c99516]">Cart</span>
                  </div>

                  <p className="-mt-1 text-[9px] font-medium text-[#444]">
                    Shop More. Pay Less.
                  </p>
                </div>
              </div>
            </Link>

            {/* Welcome text */}
            <div className="absolute left-9 top-[190px] z-10 max-w-[300px]">
              <div className="mb-5 inline-flex items-center gap-2 rounded-lg bg-[#fff1d4] px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-[#b27b05]">
                <span>♛</span>
                Premium Experience
              </div>

              <h1 className="text-[48px] font-extrabold leading-[1.03] tracking-tight text-[#111]">
                Welcome
                <br />
                <span className="text-[#c99516]">Back!</span>
              </h1>

              <p className="mt-5 max-w-[260px] text-[15px] leading-6 text-[#555]">
                Sign in to continue shopping
                <br />
                your favorite products
              </p>
            </div>
          </section>

          {/* LOGIN FORM */}
          <section className="flex items-center justify-center bg-white px-6 py-10 sm:px-12 lg:px-16 xl:px-20">
            <div className="w-full max-w-[500px]">

              {/* Mobile Logo */}
              <Link
                href="/"
                className="mb-10 flex items-center justify-center lg:hidden"
              >
                <div className="text-[28px] text-[#c99516]">🛒</div>

                <div className="ml-2">
                  <div className="text-[25px] font-extrabold">
                    Prime<span className="text-[#c99516]">Cart</span>
                  </div>

                  <p className="-mt-1 text-[8px] text-gray-500">
                    Shop More. Pay Less.
                  </p>
                </div>
              </Link>

              <div className="mb-9">
                <h2 className="text-[31px] font-extrabold tracking-tight text-[#111]">
                  Login to your account
                </h2>

                <p className="mt-2 text-[14px] leading-6 text-[#777]">
                  Enter your email and password to access
                  <br />
                  your account
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* Success */}
              {success && (
                <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                  {success}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-6">

                {/* EMAIL */}
                <div>
                  <label className="mb-2.5 block text-[13px] font-bold text-[#222]">
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777]"
                    />

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      autoComplete="email"
                      className="h-[52px] w-full rounded-lg border border-[#d9d9d9] bg-white pl-12 pr-4 text-[14px] text-[#222] outline-none transition focus:border-[#d19b1d] focus:ring-2 focus:ring-[#d19b1d]/10"
                      required
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div>
                  <div className="mb-2.5 flex items-center justify-between">
                    <label className="text-[13px] font-bold text-[#222]">
                      Password
                    </label>

                    <Link
                      href="/forgot-password"
                      className="text-[12px] font-semibold text-[#c28b12] hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <div className="relative">
                    <LockKeyhole
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777]"
                    />

                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className="h-[52px] w-full rounded-lg border border-[#d9d9d9] bg-white pl-12 pr-12 text-[14px] text-[#222] outline-none transition focus:border-[#d19b1d] focus:ring-2 focus:ring-[#d19b1d]/10"
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#777] hover:text-[#222]"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* REMEMBER */}
                <label className="flex cursor-pointer items-center gap-2 text-[13px] text-[#444]">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) =>
                      setRememberMe(e.target.checked)
                    }
                    className="h-4 w-4 accent-[#c99516]"
                  />

                  <span>Remember Me</span>
                </label>

                {/* LOGIN BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-[53px] w-full items-center justify-center gap-2 rounded-lg bg-[#d99e08] text-[15px] font-bold text-white shadow-[0_5px_15px_rgba(217,158,8,0.18)] transition hover:bg-[#c58e05] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Logging in...
                    </>
                  ) : (
                    <>
                      <LogIn size={18} />
                      Login
                    </>
                  )}
                </button>
              </form>

              {/* OR */}
              <div className="my-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-[#e5e5e5]" />
                <span className="text-[12px] font-medium text-[#777]">
                  OR
                </span>
                <div className="h-px flex-1 bg-[#e5e5e5]" />
              </div>

              {/* GOOGLE */}
              <button
                type="button"
                className="flex h-[52px] w-full items-center justify-center gap-3 rounded-lg border border-[#dcdcdc] bg-white text-[14px] font-semibold text-[#333] transition hover:bg-[#fafafa]"
              >
                <span className="text-[18px] font-bold text-[#4285F4]">
                  G
                </span>
                Continue with Google
              </button>

              {/* REGISTER */}
              <p className="mt-9 text-center text-[13px] text-[#777]">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="font-bold text-[#c28b12] hover:underline"
                >
                  Register
                </Link>
              </p>
            </div>
          </section>
        </div>

        {/* FEATURES */}
        <div className="border-t border-[#eee] bg-white px-6 py-7">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">

            <Feature
              icon={<Truck size={23} />}
              title="Free Delivery"
              text="On orders above ₹499"
            />

            <Feature
              icon={<RotateCcw size={23} />}
              title="7-Day Returns"
              text="Easy return & refund"
            />

            <Feature
              icon={<ShieldCheck size={23} />}
              title="Secure Payment"
              text="100% secure payment"
            />

            <Feature
              icon={<Headphones size={23} />}
              title="24/7 Support"
              text="Always here to help"
            />
          </div>

          <p className="mt-7 text-center text-[12px] text-[#777]">
            © {new Date().getFullYear()} PrimeCart. All rights reserved.
          </p>
        </div>
      </div>
    </main>
  );
}

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="text-[#c99516]">
        {icon}
      </div>

      <div>
        <p className="text-[12px] font-bold text-[#222]">
          {title}
        </p>

        <p className="mt-1 text-[10px] text-[#777]">
          {text}
        </p>
      </div>
    </div>
  );
}
