"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  ShieldCheck,
} from "lucide-react";

import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";

import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  /*
   * IMPORTANT:
   * Create the Supabase browser client once.
   */
  const supabase = createClient();

  // =========================================================
  // LOAD REMEMBERED EMAIL
  // =========================================================

  useEffect(() => {
    try {
      const savedEmail = localStorage.getItem("rememberEmail");

      if (savedEmail) {
        setEmail(savedEmail);
        setRemember(true);
      }
    } catch (error) {
      console.error("Remember email error:", error);
    }
  }, []);

  // =========================================================
  // LOGIN
  // =========================================================

  async function handleLogin(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (loading || googleLoading) {
      return;
    }

    const cleanEmail = email.trim().toLowerCase();

    // -------------------------------------------------------
    // VALIDATION
    // -------------------------------------------------------

    if (!cleanEmail) {
      toast.error("Please enter your email address.");
      return;
    }

    if (!password) {
      toast.error("Please enter your password.");
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      console.log("=================================");
      console.log("🔐 PRIME CART LOGIN");
      console.log("Email:", cleanEmail);
      console.log("=================================");

      // -------------------------------------------------------
      // SUPABASE LOGIN
      // -------------------------------------------------------

      const {
        data,
        error,
      } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      // -------------------------------------------------------
      // SUPABASE ERROR
      // -------------------------------------------------------

      if (error) {
        console.error(
          "❌ Supabase login error:",
          error
        );

        const message = error.message.toLowerCase();

        if (
          message.includes("invalid login credentials")
        ) {
          toast.error(
            "Invalid email or password."
          );
        } else if (
          message.includes("email not confirmed")
        ) {
          toast.error(
            "Please verify your email before logging in."
          );
        } else {
          toast.error(
            error.message || "Login failed."
          );
        }

        setLoading(false);
        return;
      }

      // -------------------------------------------------------
      // USER CHECK
      // -------------------------------------------------------

      if (!data.user) {
        console.error(
          "❌ No user returned after login."
        );

        toast.error(
          "Login failed. User was not found."
        );

        setLoading(false);
        return;
      }

      console.log(
        "✅ User logged in:",
        data.user.email
      );

      // -------------------------------------------------------
      // SESSION CHECK
      // -------------------------------------------------------

      const {
        data: sessionData,
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        console.error(
          "❌ Session error:",
          sessionError
        );

        toast.error(
          "Unable to create login session."
        );

        setLoading(false);
        return;
      }

      if (!sessionData.session) {
        console.error(
          "❌ No active session found."
        );

        toast.error(
          "Login session was not created."
        );

        setLoading(false);
        return;
      }

      console.log(
        "✅ Active session confirmed."
      );

      // -------------------------------------------------------
      // REMEMBER EMAIL
      // -------------------------------------------------------

      try {
        if (remember) {
          localStorage.setItem(
            "rememberEmail",
            cleanEmail
          );
        } else {
          localStorage.removeItem(
            "rememberEmail"
          );
        }
      } catch (error) {
        console.error(
          "Remember email error:",
          error
        );
      }

      // -------------------------------------------------------
      // SUCCESS
      // -------------------------------------------------------

      toast.success(
        "Login successful! Welcome back to PrimeCart ✨"
      );

      console.log(
        "🚀 Redirecting to /dashboard..."
      );

      /*
       * IMPORTANT:
       *
       * replace() prevents user from coming back
       * to login page using browser back button.
       *
       * refresh() makes Next.js re-check the
       * authenticated session.
       */

      router.replace("/dashboard");

      router.refresh();

    } catch (error) {
      console.error(
        "❌ Unexpected login error:",
        error
      );

      toast.error(
        "Something went wrong. Please try again."
      );

      setLoading(false);
    }
  }

  // =========================================================
  // GOOGLE LOGIN
  // =========================================================

  async function handleGoogleLogin() {
    if (loading || googleLoading) {
      return;
    }

    try {
      setGoogleLoading(true);

      console.log(
        "🔐 Starting Google login..."
      );

      const {
        error,
      } = await supabase.auth.signInWithOAuth({
        provider: "google",

        options: {
          redirectTo:
            `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error(
          "❌ Google login error:",
          error
        );

        toast.error(
          error.message ||
            "Google login failed."
        );

        setGoogleLoading(false);
      }

    } catch (error) {
      console.error(
        "❌ Google login error:",
        error
      );

      toast.error(
        "Google login failed."
      );

      setGoogleLoading(false);
    }
  }

  // =========================================================
  // UI
  // =========================================================

  return (
    <main
      className="
        min-h-screen
        bg-gradient-to-br
        from-[#f8f5ef]
        via-white
        to-[#efe5cf]
        flex
        items-center
        justify-center
        p-4
        sm:p-5
      "
    >
      <div
        className="
          w-full
          max-w-[1200px]
          min-h-[650px]
          overflow-hidden
          rounded-[32px]
          border
          border-white/40
          bg-white/90
          shadow-[0_25px_80px_rgba(0,0,0,0.12)]
          backdrop-blur-xl
          grid
          lg:grid-cols-2
        "
      >
        {/* ================================================= */}
        {/* LEFT SIDE */}
        {/* ================================================= */}

        <div
          className="
            relative
            hidden
            min-h-[650px]
            lg:block
          "
        >
          <Image
            src="/login-banner.png"
            alt="PrimeCart Shopping"
            fill
            priority
            sizes="50vw"
            className="object-cover"
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/70
              via-black/15
              to-transparent
            "
          />

          <div
            className="
              absolute
              left-10
              top-10
              z-10
              h-52
              w-52
              rounded-full
              bg-[#D4AF37]/20
              blur-[120px]
            "
          />

          <div
            className="
              absolute
              bottom-10
              right-10
              z-10
              h-64
              w-64
              rounded-full
              bg-[#D4AF37]/15
              blur-[140px]
            "
          />

          <div
            className="
              absolute
              bottom-10
              left-10
              right-10
              z-20
              text-white
            "
          >
            <div
              className="
                mb-4
                flex
                items-center
                gap-2
              "
            >
              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#D4AF37]
                  text-black
                "
              >
                <ShieldCheck size={18} />
              </div>

              <span
                className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.2em]
                "
              >
                Premium Shopping
              </span>
            </div>

            <h2
              className="
                max-w-md
                text-4xl
                font-black
                leading-tight
              "
            >
              Welcome back to
              <br />
              PrimeCart.
            </h2>

            <p
              className="
                mt-4
                max-w-md
                text-sm
                leading-6
                text-white/75
              "
            >
              Discover premium products,
              exclusive deals and a smarter
              shopping experience.
            </p>

            <div
              className="
                mt-6
                flex
                items-center
                gap-3
              "
            >
              <div
                className="
                  h-1
                  w-10
                  rounded-full
                  bg-[#D4AF37]
                "
              />

              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-white/60
                "
              >
                Shop smarter. Live better.
              </span>
            </div>
          </div>
        </div>

        {/* ================================================= */}
        {/* RIGHT SIDE */}
        {/* ================================================= */}

        <div
          className="
            flex
            items-center
            justify-center
            px-5
            py-8
            sm:px-8
            lg:px-10
          "
        >
          <div
            className="
              w-full
              max-w-md
            "
          >
            {/* ================================================= */}
            {/* LOGO */}
            {/* ================================================= */}

            <Link
              href="/"
              className="
                mb-8
                flex
                w-fit
                items-center
                gap-3
              "
            >
              <Image
                src="/logo.png"
                alt="PrimeCart Logo"
                width={100}
                height={50}
                priority
                className="object-contain"
              />

              <h2
                className="
                  text-3xl
                  font-black
                  tracking-tight
                  sm:text-4xl
                "
              >
                Prime
                <span className="text-[#D4AF37]">
                  Cart
                </span>
              </h2>
            </Link>

            {/* ================================================= */}
            {/* HEADING */}
            {/* ================================================= */}

            <p
              className="
                mb-2
                text-[10px]
                font-black
                uppercase
                tracking-[0.2em]
                text-[#B28B18]
              "
            >
              Welcome to PrimeCart
            </p>

            <h1
              className="
                text-3xl
                font-black
                tracking-tight
                text-gray-900
                sm:text-4xl
              "
            >
              Welcome
              <span className="text-[#D4AF37]">
                {" "}Back ✨
              </span>
            </h1>

            <p
              className="
                mt-3
                text-sm
                leading-6
                text-gray-500
              "
            >
              Continue your premium
              shopping journey.
            </p>

            {/* ================================================= */}
            {/* CUSTOMER BADGE */}
            {/* ================================================= */}

            <div
              className="
                mt-5
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#D4AF37]/20
                bg-[#D4AF37]/10
                px-4
                py-2
              "
            >
              <span className="text-[#D4AF37]">
                ⭐
              </span>

              <span
                className="
                  text-xs
                  font-semibold
                  text-gray-700
                "
              >
                10,000+ Happy Customers
              </span>
            </div>

            {/* ================================================= */}
            {/* LOGIN FORM */}
            {/* ================================================= */}

            <form
              onSubmit={handleLogin}
              className="
                mt-6
                space-y-4
              "
            >
              {/* EMAIL */}

              <div className="relative">
                <Mail
                  size={20}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="Email Address"
                  autoComplete="email"
                  disabled={
                    loading ||
                    googleLoading
                  }
                  className="
                    h-14
                    w-full
                    rounded-2xl
                    border
                    border-gray-200
                    bg-gray-50
                    pl-12
                    pr-4
                    text-sm
                    font-medium
                    text-gray-900
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-[#D4AF37]
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#D4AF37]/10
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                />
              </div>

              {/* PASSWORD */}

              <div className="relative">
                <Lock
                  size={20}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Password"
                  autoComplete="current-password"
                  disabled={
                    loading ||
                    googleLoading
                  }
                  className="
                    h-14
                    w-full
                    rounded-2xl
                    border
                    border-gray-200
                    bg-gray-50
                    pl-12
                    pr-12
                    text-sm
                    font-medium
                    text-gray-900
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-[#D4AF37]
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#D4AF37]/10
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (prev) => !prev
                    )
                  }
                  disabled={
                    loading ||
                    googleLoading
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                    transition
                    hover:text-black
                  "
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>

              {/* REMEMBER / FORGOT */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  text-xs
                  sm:text-sm
                "
              >
                <label
                  className="
                    flex
                    cursor-pointer
                    items-center
                    gap-2
                    text-gray-600
                  "
                >
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) =>
                      setRemember(
                        e.target.checked
                      )
                    }
                    disabled={
                      loading ||
                      googleLoading
                    }
                    className="
                      h-4
                      w-4
                      accent-[#D4AF37]
                    "
                  />

                  Remember me
                </label>

                <Link
                  href="/forgot-password"
                  className="
                    font-bold
                    text-[#B28B18]
                    transition
                    hover:text-black
                    hover:underline
                  "
                >
                  Forgot Password?
                </Link>
              </div>

              {/* ================================================= */}
              {/* LOGIN BUTTON */}
              {/* ================================================= */}

              <button
                type="submit"
                disabled={
                  loading ||
                  googleLoading
                }
                className="
                  group
                  flex
                  h-14
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-2xl
                  bg-gradient-to-r
                  from-[#B8860B]
                  to-[#D4AF37]
                  text-base
                  font-black
                  text-white
                  shadow-[0_12px_25px_rgba(184,134,11,0.22)]
                  transition
                  hover:-translate-y-0.5
                  hover:shadow-[0_16px_30px_rgba(184,134,11,0.28)]
                  active:translate-y-0
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {loading ? (
                  <>
                    <Loader2
                      size={20}
                      className="animate-spin"
                    />

                    Logging in...
                  </>
                ) : (
                  <>
                    Login Now

                    <ArrowRight
                      size={20}
                      className="
                        transition-transform
                        group-hover:translate-x-1
                      "
                    />
                  </>
                )}
              </button>
            </form>

            {/* ================================================= */}
            {/* DIVIDER */}
            {/* ================================================= */}

            <div
              className="
                my-7
                flex
                items-center
                gap-4
              "
            >
              <div
                className="
                  h-px
                  flex-1
                  bg-gray-200
                "
              />

              <span
                className="
                  text-xs
                  font-medium
                  text-gray-400
                "
              >
                OR
              </span>

              <div
                className="
                  h-px
                  flex-1
                  bg-gray-200
                "
              />
            </div>

            {/* ================================================= */}
            {/* GOOGLE */}
            {/* ================================================= */}

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={
                googleLoading ||
                loading
              }
              className="
                flex
                h-14
                w-full
                items-center
                justify-center
                gap-3
                rounded-2xl
                border
                border-gray-200
                bg-white
                text-sm
                font-bold
                text-gray-700
                transition
                hover:bg-gray-50
                hover:shadow-sm
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {googleLoading ? (
                <>
                  <Loader2
                    size={19}
                    className="animate-spin"
                  />

                  Connecting...
                </>
              ) : (
                <>
                  <FcGoogle size={24} />

                  Continue With Google
                </>
              )}
            </button>

            {/* ================================================= */}
            {/* REGISTER */}
            {/* ================================================= */}

            <p
              className="
                mt-7
                text-center
                text-sm
                text-gray-500
              "
            >
              Don't have an account?

              <Link
                href="/register"
                className="
                  ml-2
                  font-black
                  text-[#B28B18]
                  hover:text-black
                  hover:underline
                "
              >
                Create Account →
              </Link>
            </p>

            {/* ================================================= */}
            {/* SECURITY */}
            {/* ================================================= */}

            <div
              className="
                mt-7
                flex
                items-center
                justify-center
                gap-5
                border-t
                border-gray-100
                pt-5
                text-[9px]
                font-semibold
                text-gray-400
              "
            >
              <span
                className="
                  flex
                  items-center
                  gap-1.5
                "
              >
                <Lock
                  size={12}
                  className="text-[#D4AF37]"
                />

                Secure Login
              </span>

              <span
                className="
                  flex
                  items-center
                  gap-1.5
                "
              >
                <ShieldCheck
                  size={12}
                  className="text-[#D4AF37]"
                />

                Protected
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
