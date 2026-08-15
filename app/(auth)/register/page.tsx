"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  CheckCircle2,
} from "lucide-react";

import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    if (!name) {
      toast.error("Please enter your full name.");
      return false;
    }

    if (name.length < 2) {
      toast.error("Name must contain at least 2 characters.");
      return false;
    }

    if (!email) {
      toast.error("Please enter your email address.");
      return false;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    if (!password) {
      toast.error("Please enter a password.");
      return false;
    }

    if (password.length < 6) {
      toast.error(
        "Password must be at least 6 characters."
      );
      return false;
    }

    if (!confirmPassword) {
      toast.error("Please confirm your password.");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }

    return true;
  };

  const register = async () => {
    if (loading) return;

    if (!validateForm()) return;

    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    try {
      setLoading(true);

      const {
        data,
        error,
      } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            full_name: name,
          },
        },
      });

      if (error) {
        console.error("Registration error:", error);

        const message = error.message.toLowerCase();

        if (
          message.includes("already registered") ||
          message.includes("already exists") ||
          message.includes("user already registered")
        ) {
          toast.error(
            "This email is already registered. Please login instead."
          );
        } else if (message.includes("password")) {
          toast.error(error.message);
        } else if (message.includes("email")) {
          toast.error(error.message);
        } else {
          toast.error(error.message);
        }

        return;
      }

      if (!data.user) {
        toast.error(
          "Account could not be created. Please try again."
        );
        return;
      }

      /*
       * Supabase returns a session immediately when
       * email confirmation is disabled.
       *
       * If email confirmation is enabled, session will
       * normally be null and the user needs to verify email.
       */

      if (!data.session) {
        toast.success(
          "Account created! Please verify your email before logging in."
        );

        router.push("/login");
        return;
      }

      toast.success(
        "Account created successfully! Welcome to PrimeCart ✨"
      );

      router.push("/login");
    } catch (error) {
      console.error("Unexpected registration error:", error);

      toast.error(
        "Something went wrong while creating your account."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f8f5ef] via-white to-[#efe5cf] p-4 sm:p-5">
      <div className="flex min-h-[calc(100vh-40px)] items-center justify-center">
        <div className="grid w-full max-w-[1200px] overflow-hidden rounded-[32px] bg-white shadow-[0_25px_80px_rgba(0,0,0,0.12)] lg:h-[760px] lg:grid-cols-2 lg:rounded-[40px]">
          {/* =====================================================
              LEFT IMAGE
          ===================================================== */}

          <div className="relative hidden min-h-[400px] lg:block">
            <Image
              src="/login-banner.png"
              alt="PrimeCart shopping"
              fill
              priority
              sizes="50vw"
              className="object-cover"
            />

            {/* Overlay */}

            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

            <div className="absolute bottom-10 left-10 right-10 text-white">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#D4AF37]">
                  <CheckCircle2
                    size={17}
                    className="text-white"
                  />
                </div>

                <span className="text-xs font-bold uppercase tracking-[0.16em]">
                  Premium Shopping
                </span>
              </div>

              <h2 className="max-w-md text-4xl font-black leading-tight">
                Everything you love,
                <br />
                all in one place.
              </h2>

              <p className="mt-4 max-w-md text-sm leading-6 text-white/75">
                Create your PrimeCart account and enjoy
                a smarter, simpler and premium shopping
                experience.
              </p>
            </div>
          </div>

          {/* =====================================================
              RIGHT REGISTER
          ===================================================== */}

          <div className="flex items-center justify-center px-5 py-8 sm:px-8 lg:px-12">
            <div className="w-full max-w-[430px]">
              {/* =================================================
                  LOGO
              ================================================= */}

              <Link
                href="/"
                className="mb-7 inline-flex items-center gap-3"
              >
                <div className="relative h-12 w-[92px]">
                  <Image
                    src="/logo.png"
                    alt="PrimeCart Logo"
                    fill
                    priority
                    sizes="92px"
                    className="object-contain object-left"
                  />
                </div>

                <div className="border-l border-gray-200 pl-3">
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-gray-400">
                    Premium
                  </p>

                  <p className="text-xs font-black text-gray-800">
                    Shopping Experience
                  </p>
                </div>
              </Link>

              {/* =================================================
                  HEADING
              ================================================= */}

              <div>
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#B28B18]">
                  Join PrimeCart
                </p>

                <h1 className="text-3xl font-black tracking-[-0.04em] text-gray-900 sm:text-4xl">
                  Create
                  <span className="text-[#D4AF37]">
                    {" "}
                    Account
                  </span>
                </h1>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Start your premium shopping journey
                  with PrimeCart.
                </p>
              </div>

              {/* =================================================
                  FORM
              ================================================= */}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  register();
                }}
                className="mt-7 space-y-4"
              >
                {/* NAME */}

                <div className="relative">
                  <User
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={loading}
                    className="h-14 w-full rounded-2xl border border-gray-200 bg-gray-50 pl-12 pr-4 text-sm font-medium text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#D4AF37] focus:bg-white focus:ring-4 focus:ring-[#D4AF37]/10 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>

                {/* EMAIL */}

                <div className="relative">
                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                    className="h-14 w-full rounded-2xl border border-gray-200 bg-gray-50 pl-12 pr-4 text-sm font-medium text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#D4AF37] focus:bg-white focus:ring-4 focus:ring-[#D4AF37]/10 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>

                {/* PASSWORD */}

                <div className="relative">
                  <Lock
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    autoComplete="new-password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading}
                    className="h-14 w-full rounded-2xl border border-gray-200 bg-gray-50 pl-12 pr-12 text-sm font-medium text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#D4AF37] focus:bg-white focus:ring-4 focus:ring-[#D4AF37]/10 disabled:cursor-not-allowed disabled:opacity-60"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    disabled={loading}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-black disabled:opacity-40"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>

                {/* PASSWORD HINT */}

                <div className="-mt-1 flex items-center gap-2 px-1 text-[10px] text-gray-400">
                  <div className="h-1 w-1 rounded-full bg-[#D4AF37]" />

                  Password must contain at least 6
                  characters.
                </div>

                {/* CONFIRM PASSWORD */}

                <div className="relative">
                  <Lock
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    name="confirmPassword"
                    type={
                      showConfirm
                        ? "text"
                        : "password"
                    }
                    autoComplete="new-password"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={loading}
                    className="h-14 w-full rounded-2xl border border-gray-200 bg-gray-50 pl-12 pr-12 text-sm font-medium text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#D4AF37] focus:bg-white focus:ring-4 focus:ring-[#D4AF37]/10 disabled:cursor-not-allowed disabled:opacity-60"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirm(
                        !showConfirm
                      )
                    }
                    disabled={loading}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-black disabled:opacity-40"
                    aria-label={
                      showConfirm
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    {showConfirm ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>

                {/* PASSWORD MATCH STATUS */}

                {formData.confirmPassword.length >
                  0 && (
                  <div
                    className={`flex items-center gap-2 px-1 text-[10px] font-semibold ${
                      formData.password ===
                      formData.confirmPassword
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    <CheckCircle2 size={13} />

                    {formData.password ===
                    formData.confirmPassword
                      ? "Passwords match"
                      : "Passwords do not match"}
                  </div>
                )}

                {/* REGISTER */}

                <button
                  type="submit"
                  disabled={loading}
                  className="group mt-2 flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-base font-black text-white shadow-[0_12px_25px_rgba(184,134,11,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(184,134,11,0.28)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {loading ? (
                    <>
                      <Loader2
                        size={20}
                        className="animate-spin"
                      />

                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account

                      <ArrowRight
                        size={19}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </form>

              {/* =================================================
                  LOGIN
              ================================================= */}

              <p className="mt-7 text-center text-sm text-gray-500">
                Already have an account?

                <Link
                  href="/login"
                  className="ml-2 font-black text-[#B28B18] transition hover:text-black"
                >
                  Login →
                </Link>
              </p>

              {/* =================================================
                  TRUST
              ================================================= */}

              <div className="mt-7 flex items-center justify-center gap-5 border-t border-gray-100 pt-5 text-[9px] font-semibold text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Lock
                    size={12}
                    className="text-[#D4AF37]"
                  />
                  Secure
                </span>

                <span className="flex items-center gap-1.5">
                  <CheckCircle2
                    size={12}
                    className="text-[#D4AF37]"
                  />
                  Trusted
                </span>

                <span className="flex items-center gap-1.5">
                  <Mail
                    size={12}
                    className="text-[#D4AF37]"
                  />
                  Verified
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
