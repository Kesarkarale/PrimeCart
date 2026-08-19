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

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setSuccess("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      setError("Please enter your email address and password.");
      return;
    }

    try {
      setLoading(true);

      const { data, error: authError } =
        await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

      if (authError) {
        if (
          authError.message
            .toLowerCase()
            .includes("email not confirmed")
        ) {
          setError(
            "Please verify your email address before logging in."
          );
        } else {
          setError("Invalid email or password.");
        }

        return;
      }

      if (!data.user) {
        setError("Unable to login. Please try again.");
        return;
      }

      setSuccess("Login successful. Redirecting...");

      /*
       * Full page navigation makes sure the newly created
       * Supabase auth session is available to the server.
       */
      window.location.replace("/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f8f6f1] p-3 sm:p-5 lg:p-7">
      <div className="mx-auto max-w-[1380px] overflow-hidden rounded-[24px] bg-white shadow-[0_10px_50px_rgba(0,0,0,0.08)]">

        {/* ================= MAIN AUTH AREA ================= */}

        <div className="grid min-h-[760px] lg:grid-cols-2">

          {/* ================= IMAGE ================= */}

          <div className="relative min-h-[250px] bg-[#f5f1e9] lg:min-h-[760px]">

            <img
              src="/login-banner.png"
              alt="PrimeCart"
              className="absolute inset-0 h-full w-full object-cover"
            />

          </div>

          {/* ================= LOGIN FORM ================= */}

          <div className="flex items-center justify-center px-5 py-12 sm:px-10 lg:px-14 xl:px-20">

            <div className="w-full max-w-[470px]">

              {/* LOGO */}

              <Link
                href="/"
                className="mb-10 flex w-fit items-center gap-2"
              >
                <span className="text-[28px] leading-none">
                  🛒
                </span>

                <div>
                  <div className="text-[25px] font-extrabold tracking-tight text-[#111]">
                    Prime<span className="text-[#c99516]">
                      Cart
                    </span>
                  </div>

                  <p className="-mt-1 text-[8px] font-medium tracking-wide text-[#777]">
                    SHOP MORE. PAY LESS.
                  </p>
                </div>
              </Link>

              {/* HEADING */}

              <div className="mb-8">
                <h1 className="text-[30px] font-extrabold tracking-tight text-[#111] sm:text-[34px]">
                  Login to your account
                </h1>

                <p className="mt-2 text-[14px] leading-6 text-[#777]">
                  Enter your email and password to access
                  <br className="hidden sm:block" />
                  your account
                </p>
              </div>

              {/* ERROR */}

              {error && (
                <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700">
                  {error}
                </div>
              )}

              {/* SUCCESS */}

              {success && (
                <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm leading-5 text-green-700">
                  {success}
                </div>
              )}

              {/* FORM */}

              <form
                onSubmit={handleLogin}
                className="space-y-6"
              >

                {/* EMAIL */}

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2.5 block text-[13px] font-bold text-[#222]"
                  >
                    Email Address
                  </label>

                  <div className="relative">

                    <Mail
                      size={18}
                      strokeWidth={1.8}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777]"
                    />

                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      placeholder="Enter your email"
                      autoComplete="email"
                      disabled={loading}
                      className="h-[53px] w-full rounded-xl border border-[#dedede] bg-white pl-12 pr-4 text-[14px] text-[#222] outline-none transition placeholder:text-[#999] focus:border-[#c99516] focus:ring-4 focus:ring-[#c99516]/10 disabled:bg-[#fafafa]"
                      required
                    />

                  </div>
                </div>

                {/* PASSWORD */}

                <div>

                  <div className="mb-2.5 flex items-center justify-between">

                    <label
                      htmlFor="password"
                      className="text-[13px] font-bold text-[#222]"
                    >
                      Password
                    </label>

                  </div>

                  <div className="relative">

                    <LockKeyhole
                      size={18}
                      strokeWidth={1.8}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777]"
                    />

                    <input
                      id="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      disabled={loading}
                      className="h-[53px] w-full rounded-xl border border-[#dedede] bg-white pl-12 pr-12 text-[14px] text-[#222] outline-none transition placeholder:text-[#999] focus:border-[#c99516] focus:ring-4 focus:ring-[#c99516]/10 disabled:bg-[#fafafa]"
                      required
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (value) => !value
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#777] transition hover:text-[#222]"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
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

                <div className="flex items-center">

                  <label className="flex cursor-pointer items-center gap-2 text-[13px] text-[#555]">

                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) =>
                        setRememberMe(
                          e.target.checked
                        )
                      }
                      className="h-[17px] w-[17px] cursor-pointer accent-[#c99516]"
                    />

                    <span>Remember Me</span>

                  </label>

                </div>

                {/* LOGIN BUTTON */}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-[54px] w-full items-center justify-center gap-2 rounded-xl bg-[#d99d08] text-[15px] font-bold text-white shadow-[0_7px_18px_rgba(217,157,8,0.20)] transition hover:bg-[#c68e05] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {loading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
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

              {/* DIVIDER */}

              <div className="my-8 flex items-center gap-4">

                <div className="h-px flex-1 bg-[#e7e7e7]" />

                <span className="text-[12px] font-medium text-[#888]">
                  OR
                </span>

                <div className="h-px flex-1 bg-[#e7e7e7]" />

              </div>

              {/* GOOGLE - UI ONLY UNTIL SUPABASE GOOGLE PROVIDER IS ENABLED */}

              <button
                type="button"
                onClick={() => {
                  setError(
                    "Google sign-in is not configured yet."
                  );
                }}
                className="flex h-[53px] w-full items-center justify-center gap-3 rounded-xl border border-[#dedede] bg-white text-[14px] font-semibold text-[#333] transition hover:bg-[#fafafa]"
              >
                <span className="text-[18px] font-bold text-[#4285f4]">
                  G
                </span>

                Continue with Google
              </button>

              {/* REGISTER */}

              <p className="mt-8 text-center text-[13px] text-[#777]">

                Don't have an account?{" "}

                <Link
                  href="/register"
                  className="font-bold text-[#c28b12] hover:underline"
                >
                  Register
                </Link>

              </p>

            </div>

          </div>

        </div>

        {/* ================= FEATURES ================= */}

        <div className="border-t border-[#eeeeee] bg-white px-5 py-7 sm:px-10">

          <div className="grid grid-cols-2 gap-y-7 md:grid-cols-4 md:gap-5">

            <Feature
              icon={<Truck size={22} />}
              title="Free Delivery"
              text="On orders above ₹499"
            />

            <Feature
              icon={<RotateCcw size={22} />}
              title="7-Day Returns"
              text="Easy return & refund"
            />

            <Feature
              icon={<ShieldCheck size={22} />}
              title="Secure Payment"
              text="100% secure payment"
            />

            <Feature
              icon={<Headphones size={22} />}
              title="24/7 Support"
              text="Always here to help"
            />

          </div>

          <p className="mt-7 text-center text-[11px] text-[#888]">
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

      <div className="shrink-0 text-[#c99516]">
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
