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
  const supabase = createClient();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  /* =========================================================
     LOAD REMEMBERED EMAIL
  ========================================================= */

  useEffect(() => {
    const rememberedEmail =
      localStorage.getItem("rememberEmail");

    if (rememberedEmail) {
      setFormData((prev) => ({
        ...prev,
        email: rememberedEmail,
        remember: true,
      }));
    }
  }, []);

  /* =========================================================
     HANDLE INPUT
  ========================================================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  /* =========================================================
     LOGIN
  ========================================================= */

  async function login(e: React.FormEvent) {
    e.preventDefault();

    if (loading) return;

    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const {
        data,
        error,
      } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (error) {
        console.error("LOGIN ERROR:", error);

        if (
          error.message
            .toLowerCase()
            .includes("email not confirmed")
        ) {
          toast.error(
            "Please verify your email before logging in."
          );
        } else if (
          error.message
            .toLowerCase()
            .includes("invalid login credentials")
        ) {
          toast.error(
            "Invalid email or password."
          );
        } else {
          toast.error(error.message);
        }

        return;
      }

      if (!data.user) {
        toast.error(
          "Login failed. Please try again."
        );
        return;
      }

      /* =====================================================
         REMEMBER EMAIL
      ===================================================== */

      if (formData.remember) {
        localStorage.setItem(
          "rememberEmail",
          email
        );
      } else {
        localStorage.removeItem(
          "rememberEmail"
        );
      }

      /* =====================================================
         SUCCESS
      ===================================================== */

      toast.success(
        "Login successful ✨"
      );

      /*
       * Give Supabase a moment to persist the
       * authentication session before navigation.
       */

      setTimeout(() => {
        router.replace("/dashboard");
        router.refresh();
      }, 500);
    } catch (error) {
      console.error(
        "Unexpected login error:",
        error
      );

      toast.error(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  /* =========================================================
     GOOGLE LOGIN
  ========================================================= */

  async function loginWithGoogle() {
    if (googleLoading) return;

    try {
      setGoogleLoading(true);

      const {
        error,
      } =
        await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo:
              `${window.location.origin}/auth/callback?next=/`,
          },
        });

      if (error) {
        console.error(
          "GOOGLE LOGIN ERROR:",
          error
        );

        toast.error(error.message);
      }
    } catch (error) {
      console.error(
        "Google login error:",
        error
      );

      toast.error(
        "Google login failed."
      );
    } finally {
      setGoogleLoading(false);
    }
  }

  /* =========================================================
     UI
  ========================================================= */

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
          bg-white/90
          backdrop-blur-xl
          shadow-[0_25px_80px_rgba(0,0,0,0.12)]
          border
          border-white/40
          grid
          lg:grid-cols-2
        "
      >
        {/* =====================================================
            LEFT BANNER
        ===================================================== */}

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

          {/* Overlay */}

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* Gold Glow */}

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

          

        {/* =====================================================
            RIGHT LOGIN
        ===================================================== */}

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
          <div className="w-full max-w-md">
            {/* =================================================
                LOGO
            ================================================= */}

            <Link
              href="/"
              className="
                mb-8
                flex
                items-center
                gap-3
                -ml-5
                w-fit
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

              <h2 className="text-3xl font-black sm:text-4xl">
                Prime
                <span className="text-[#D4AF37]">
                  Cart
                </span>
              </h2>
            </Link>

            {/* =================================================
                HEADING
            ================================================= */}

            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#B28B18]">
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
                {" "}
                Back ✨
              </span>
            </h1>

            <p className="mt-3 text-sm text-gray-500">
              Continue your premium shopping journey.
            </p>

            {/* Customer Badge */}

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

              <span className="text-xs font-semibold text-gray-700">
                10,000+ Happy Customers
              </span>
            </div>

            {/* =================================================
                FORM
            ================================================= */}

            <form
              onSubmit={login}
              className="mt-6 space-y-4"
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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  autoComplete="email"
                  disabled={loading}
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
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-[#D4AF37]
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#D4AF37]/10
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  autoComplete="current-password"
                  disabled={loading}
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
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-[#D4AF37]
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#D4AF37]/10
                    disabled:opacity-60
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  disabled={loading}
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

              <div className="flex items-center justify-between text-xs sm:text-sm">
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
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                    className="h-4 w-4 accent-[#D4AF37]"
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

              {/* LOGIN BUTTON */}

              <button
                type="submit"
                disabled={loading}
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
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  disabled:hover:translate-y-0
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

            {/* =================================================
                OR
            ================================================= */}

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />

              <span className="text-xs font-medium text-gray-400">
                OR
              </span>

              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* =================================================
                GOOGLE
            ================================================= */}

            <button
              type="button"
              onClick={loginWithGoogle}
              disabled={
                googleLoading || loading
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

            {/* =================================================
                REGISTER
            ================================================= */}

            <p className="mt-7 text-center text-sm text-gray-500">
              Don't have an account?

              <Link
                href="/register"
                className="
                  ml-2
                  font-black
                  text-[#B28B18]
                  transition
                  hover:text-black
                  hover:underline
                "
              >
                Create Account →
              </Link>
            </p>

            {/* =================================================
                SECURITY
            ================================================= */}

            <div className="mt-7 flex items-center justify-center gap-5 border-t border-gray-100 pt-5 text-[9px] font-semibold text-gray-400">
              <span className="flex items-center gap-1.5">
                <Lock
                  size={12}
                  className="text-[#D4AF37]"
                />
                Secure Login
              </span>

              <span className="flex items-center gap-1.5">
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
