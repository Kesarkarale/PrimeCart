"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  LogIn,
  Loader2,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =========================================================
  // EMAIL + PASSWORD LOGIN
  // =========================================================

  const handleLogin = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
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
        const message = loginError.message.toLowerCase();

        if (
          message.includes("invalid login credentials")
        ) {
          setError("Invalid email or password.");
        } else if (
          message.includes("email not confirmed")
        ) {
          setError(
            "Please verify your email before logging in."
          );
        } else {
          setError(loginError.message);
        }

        return;
      }

      if (!data.session) {
        setError(
          "Login session could not be created. Please try again."
        );
        return;
      }

      setSuccess("Login successful. Redirecting...");

      // Full navigation ensures the auth session is available
      // before the dashboard loads.
      window.location.replace("/dashboard");
    } catch (err) {
      console.error("Login error:", err);

      setError(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // GOOGLE LOGIN
  // =========================================================

  const handleGoogleLogin = async () => {
    setError("");
    setSuccess("");

    try {
      setGoogleLoading(true);

      const redirectTo =
        `${window.location.origin}/auth/callback?next=/dashboard`;

      const { error: googleError } =
        await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo,
            queryParams: {
              prompt: "select_account",
            },
          },
        });

      if (googleError) {
        console.error(
          "Google login error:",
          googleError
        );

        setError(googleError.message);
        setGoogleLoading(false);
      }
    } catch (err) {
      console.error(
        "Google authentication error:",
        err
      );

      setError(
        "Unable to continue with Google."
      );

      setGoogleLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f6f1] p-3 sm:p-5 lg:p-6">
      <div
        className="
          mx-auto
          grid
          min-h-[calc(100vh-24px)]
          max-w-[1370px]
          overflow-hidden
          rounded-[22px]
          bg-white
          shadow-[0_8px_40px_rgba(0,0,0,0.08)]
          lg:min-h-[720px]
          lg:grid-cols-[1fr_1fr]
        "
      >
        {/* =====================================================
            LEFT SIDE — LOGIN BANNER
        ====================================================== */}

        <div
          className="
            relative
            hidden
            overflow-hidden
            bg-[#f4efe7]
            lg:block
          "
        >
          <img
            src="/login-banner.png"
            alt="PrimeCart"
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
            "
          />

          {/* Soft overlay */}
          <div className="absolute inset-0 bg-black/[0.03]" />
        </div>

        {/* =====================================================
            RIGHT SIDE — LOGIN FORM
        ====================================================== */}

        <div
          className="
            flex
            items-center
            justify-center
            bg-white
            px-6
            py-10
            sm:px-10
            lg:px-12
            xl:px-16
          "
        >
          <div className="w-full max-w-[430px]">

            {/* =================================================
                PRIME CART LOGO
            ================================================= */}

            <Link
              href="/"
              aria-label="PrimeCart Home"
              className="
                mb-8
                inline-flex
                items-center
                justify-center
                transition-transform
                duration-200
                hover:scale-[1.02]
              "
            >
              <img
                src="/logo.png"
                alt="PrimeCart"
                width={180}
                height={60}
                className="
                  h-auto
                  max-h-[64px]
                  w-auto
                  max-w-[190px]
                  object-contain
                "
              />
            </Link>

            {/* =================================================
                HEADING
            ================================================= */}

            <div className="mb-7">
              <h1
                className="
                  text-[28px]
                  font-bold
                  leading-[1.2]
                  tracking-[-0.5px]
                  text-[#111111]
                  sm:text-[30px]
                "
              >
                Login to your account
              </h1>

              <p
                className="
                  mt-2
                  max-w-[360px]
                  text-[13px]
                  leading-[1.6]
                  text-[#777777]
                  sm:text-[14px]
                "
              >
                Enter your email and password to access
                your account
              </p>
            </div>

            {/* =================================================
                ERROR MESSAGE
            ================================================= */}

            {error && (
              <div
                role="alert"
                className="
                  mb-5
                  rounded-[9px]
                  border
                  border-red-200
                  bg-red-50
                  px-4
                  py-3
                  text-[12px]
                  leading-5
                  text-red-700
                "
              >
                {error}
              </div>
            )}

            {/* =================================================
                SUCCESS MESSAGE
            ================================================= */}

            {success && (
              <div
                role="status"
                className="
                  mb-5
                  rounded-[9px]
                  border
                  border-green-200
                  bg-green-50
                  px-4
                  py-3
                  text-[12px]
                  leading-5
                  text-green-700
                "
              >
                {success}
              </div>
            )}

            {/* =================================================
                LOGIN FORM
            ================================================= */}

            <form
              onSubmit={handleLogin}
              className="space-y-5"
            >
              {/* EMAIL */}

              <div>
                <label
                  htmlFor="email"
                  className="
                    mb-2
                    block
                    text-[12px]
                    font-semibold
                    text-[#222222]
                    sm:text-[13px]
                  "
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={17}
                    strokeWidth={1.8}
                    className="
                      pointer-events-none
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-[#777777]
                    "
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
                    disabled={
                      loading || googleLoading
                    }
                    required
                    className="
                      h-[52px]
                      w-full
                      rounded-[9px]
                      border
                      border-[#dddddd]
                      bg-white
                      pl-[43px]
                      pr-4
                      text-[13px]
                      text-[#222222]
                      outline-none
                      transition-all
                      placeholder:text-[#999999]
                      focus:border-[#d19a18]
                      focus:ring-[3px]
                      focus:ring-[#d19a18]/10
                      disabled:cursor-not-allowed
                      disabled:bg-[#fafafa]
                    "
                  />
                </div>
              </div>

              {/* PASSWORD */}

              <div>
                <div
                  className="
                    mb-2
                    flex
                    items-center
                    justify-between
                  "
                >
                  <label
                    htmlFor="password"
                    className="
                      text-[12px]
                      font-semibold
                      text-[#222222]
                      sm:text-[13px]
                    "
                  >
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="
                      text-[11px]
                      font-semibold
                      text-[#c18b13]
                      transition
                      hover:text-[#a8750b]
                      hover:underline
                      sm:text-[12px]
                    "
                  >
                    Forgot Password?
                  </Link>
                </div>

                <div className="relative">
                  <LockKeyhole
                    size={17}
                    strokeWidth={1.8}
                    className="
                      pointer-events-none
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-[#777777]
                    "
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
                    disabled={
                      loading || googleLoading
                    }
                    required
                    className="
                      h-[52px]
                      w-full
                      rounded-[9px]
                      border
                      border-[#dddddd]
                      bg-white
                      pl-[43px]
                      pr-[45px]
                      text-[13px]
                      text-[#222222]
                      outline-none
                      transition-all
                      placeholder:text-[#999999]
                      focus:border-[#d19a18]
                      focus:ring-[3px]
                      focus:ring-[#d19a18]/10
                      disabled:cursor-not-allowed
                      disabled:bg-[#fafafa]
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (value) => !value
                      )
                    }
                    disabled={
                      loading || googleLoading
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
                      text-[#777777]
                      transition
                      hover:text-[#222222]
                      disabled:cursor-not-allowed
                    "
                  >
                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>
              </div>

              {/* REMEMBER ME */}

              <label
                className="
                  flex
                  cursor-pointer
                  items-center
                  gap-2
                  text-[12px]
                  text-[#555555]
                "
              >
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) =>
                    setRememberMe(
                      e.target.checked
                    )
                  }
                  disabled={
                    loading || googleLoading
                  }
                  className="
                    h-[16px]
                    w-[16px]
                    cursor-pointer
                    accent-[#c99516]
                  "
                />

                <span>Remember Me</span>
              </label>

              {/* LOGIN BUTTON */}

              <button
                type="submit"
                disabled={
                  loading || googleLoading
                }
                className="
                  flex
                  h-[52px]
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-[9px]
                  bg-[#d99d08]
                  text-[14px]
                  font-semibold
                  text-white
                  shadow-[0_6px_16px_rgba(217,157,8,0.20)]
                  transition-all
                  hover:bg-[#c88f05]
                  active:scale-[0.99]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {loading ? (
                  <>
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
                    Logging in...
                  </>
                ) : (
                  <>
                    <LogIn size={17} />
                    Login
                  </>
                )}
              </button>
            </form>

            {/* =================================================
                DIVIDER
            ================================================= */}

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#e6e6e6]" />

              <span
                className="
                  text-[11px]
                  font-medium
                  text-[#888888]
                "
              >
                OR
              </span>

              <div className="h-px flex-1 bg-[#e6e6e6]" />
            </div>

            {/* =================================================
                GOOGLE LOGIN
            ================================================= */}

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={
                loading || googleLoading
              }
              className="
                flex
                h-[52px]
                w-full
                items-center
                justify-center
                gap-3
                rounded-[9px]
                border
                border-[#dddddd]
                bg-white
                text-[13px]
                font-semibold
                text-[#333333]
                transition-all
                hover:bg-[#fafafa]
                active:scale-[0.99]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {googleLoading ? (
                <Loader2
                  size={18}
                  className="animate-spin"
                />
              ) : (
                <GoogleIcon />
              )}

              {googleLoading
                ? "Connecting..."
                : "Continue with Google"}
            </button>

            {/* =================================================
                REGISTER
            ================================================= */}

            <p
              className="
                mt-7
                text-center
                text-[12px]
                text-[#777777]
                sm:text-[13px]
              "
            >
              Don't have an account?{" "}

              <Link
                href="/register"
                className="
                  font-semibold
                  text-[#c18b13]
                  transition
                  hover:underline
                "
              >
                Register
              </Link>
            </p>

          </div>
        </div>
      </div>
    </main>
  );
}

/* =============================================================
   GOOGLE ICON
============================================================= */

function GoogleIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M21.35 12.27c0-.78-.07-1.53-.2-2.27H12v4.3h5.23a4.47 4.47 0 0 1-1.94 2.93v2.43h3.14c1.84-1.69 2.92-4.18 2.92-7.39Z"
      />

      <path
        fill="#34A853"
        d="M12 21.5c2.63 0 4.84-.87 6.45-2.34l-3.14-2.43c-.87.58-1.98.93-3.31.93-2.55 0-4.71-1.72-5.49-4.03H3.27v2.51A9.74 9.74 0 0 0 12 21.5Z"
      />

      <path
        fill="#FBBC05"
        d="M6.51 13.63A5.85 5.85 0 0 1 6.2 12c0-.57.11-1.12.31-1.63V7.86H3.27A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.02 4.14l3.24-2.51Z"
      />

      <path
        fill="#EA4335"
        d="M12 6.34c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.43 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.73 5.36l3.24 2.51 3.24 2.51C7.29 8.06 9.45 6.34 12 6.34Z"
      />
    </svg>
  );
}
