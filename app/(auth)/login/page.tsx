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
  const [rememberMe, setRememberMe] = useState(false);

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
        const message =
          loginError.message.toLowerCase();

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
    <main
      className="
        min-h-screen
        bg-[#f7f6f1]
        px-[22px]
        py-[20px]
        sm:px-6
        sm:py-6
      "
    >
      {/* =====================================================
          MAIN WHITE CONTAINER
      ====================================================== */}

      <div
        className="
          mx-auto
          w-full
          max-w-[620px]
          overflow-hidden
          rounded-[30px]
          bg-white
          shadow-[0_5px_25px_rgba(0,0,0,0.05)]
        "
      >
        <div
          className="
            px-[38px]
            pb-[40px]
            pt-[54px]

            sm:px-12
            sm:pb-12
            sm:pt-14
          "
        >

          {/* =================================================
              LOGO + NAME
          ================================================= */}

          <Link
            href="/"
            aria-label="PrimeCart Home"
            className="
              mb-[60px]
              flex
              w-fit
              items-center
              gap-[16px]
              transition-opacity
              hover:opacity-85
            "
          >
            <img
              src="/logo.png"
              alt="PrimeCart Logo"
              className="
                h-[58px]
                w-[58px]
                object-contain
              "
            />

            <span
              className="
                font-serif
                text-[30px]
                font-bold
                tracking-[-1px]
                text-[#111111]

                sm:text-[34px]
              "
            >
              PrimeCart
            </span>
          </Link>

          {/* =================================================
              HEADING
          ================================================= */}

          <div className="mb-[58px]">
            <h1
              className="
                font-serif
                text-[38px]
                font-bold
                leading-[1.12]
                tracking-[-1px]
                text-[#111111]

                sm:text-[42px]
              "
            >
              Login to your account
            </h1>

            <p
              className="
                mt-[22px]
                max-w-[550px]
                font-serif
                text-[19px]
                leading-[1.55]
                text-[#858585]

                sm:text-[21px]
              "
            >
              Enter your email and password to access
              your account
            </p>
          </div>

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <div
              role="alert"
              className="
                mb-6
                rounded-[10px]
                border
                border-red-200
                bg-red-50
                px-4
                py-3
                text-[13px]
                text-red-700
              "
            >
              {error}
            </div>
          )}

          {/* =================================================
              SUCCESS
          ================================================= */}

          {success && (
            <div
              role="status"
              className="
                mb-6
                rounded-[10px]
                border
                border-green-200
                bg-green-50
                px-4
                py-3
                text-[13px]
                text-green-700
              "
            >
              {success}
            </div>
          )}

          {/* =================================================
              FORM
          ================================================= */}

          <form
            onSubmit={handleLogin}
            className="space-y-[39px]"
          >

            {/* EMAIL */}

            <div>
              <label
                htmlFor="email"
                className="
                  mb-[16px]
                  block
                  font-serif
                  text-[20px]
                  font-bold
                  text-[#222222]
                "
              >
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={29}
                  strokeWidth={1.6}
                  className="
                    pointer-events-none
                    absolute
                    left-[30px]
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
                    h-[96px]
                    w-full
                    rounded-[16px]
                    border
                    border-[#d8d8d8]
                    bg-white
                    pl-[82px]
                    pr-5
                    font-serif
                    text-[20px]
                    text-[#222222]
                    outline-none
                    transition
                    placeholder:text-[#a1a1a1]
                    focus:border-[#d59b00]
                    focus:ring-[3px]
                    focus:ring-[#d59b00]/10
                    disabled:bg-[#fafafa]
                  "
                />
              </div>
            </div>

            {/* PASSWORD */}

            <div>
              <div
                className="
                  mb-[16px]
                  flex
                  items-center
                  justify-between
                "
              >
                <label
                  htmlFor="password"
                  className="
                    font-serif
                    text-[20px]
                    font-bold
                    text-[#222222]
                  "
                >
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="
                    font-serif
                    text-[18px]
                    font-bold
                    text-[#b4881d]
                    transition
                    hover:text-[#8f6a10]
                    hover:underline
                  "
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="relative">
                <LockKeyhole
                  size={29}
                  strokeWidth={1.6}
                  className="
                    pointer-events-none
                    absolute
                    left-[30px]
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
                    h-[96px]
                    w-full
                    rounded-[16px]
                    border
                    border-[#d8d8d8]
                    bg-white
                    pl-[82px]
                    pr-[75px]
                    font-serif
                    text-[20px]
                    text-[#222222]
                    outline-none
                    transition
                    placeholder:text-[#a1a1a1]
                    focus:border-[#d59b00]
                    focus:ring-[3px]
                    focus:ring-[#d59b00]/10
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
                    right-[28px]
                    top-1/2
                    -translate-y-1/2
                    text-[#777777]
                    transition
                    hover:text-[#222222]
                  "
                >
                  {showPassword ? (
                    <EyeOff size={29} />
                  ) : (
                    <Eye size={29} />
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
                gap-[16px]
                font-serif
                text-[20px]
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
                  h-[30px]
                  w-[30px]
                  cursor-pointer
                  accent-[#d99d00]
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
                h-[98px]
                w-full
                items-center
                justify-center
                gap-[16px]
                rounded-[17px]
                bg-[#e0a000]
                font-serif
                text-[22px]
                font-bold
                text-white
                shadow-[0_8px_25px_rgba(224,160,0,0.20)]
                transition-all
                hover:bg-[#cd9000]
                active:scale-[0.99]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {loading ? (
                <>
                  <Loader2
                    size={28}
                    className="animate-spin"
                  />
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn size={29} />
                  Login
                </>
              )}
            </button>
          </form>

          {/* =================================================
              OR
          ================================================= */}

          <div className="my-[48px] flex items-center gap-[28px]">
            <div className="h-[2px] flex-1 bg-[#e0e0e0]" />

            <span
              className="
                font-serif
                text-[18px]
                text-[#858585]
              "
            >
              OR
            </span>

            <div className="h-[2px] flex-1 bg-[#e0e0e0]" />
          </div>

          {/* =================================================
              GOOGLE
          ================================================= */}

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={
              loading || googleLoading
            }
            className="
              flex
              h-[96px]
              w-full
              items-center
              justify-center
              gap-[22px]
              rounded-[16px]
              border
              border-[#d8d8d8]
              bg-white
              font-serif
              text-[20px]
              font-bold
              text-[#333333]
              transition
              hover:bg-[#fafafa]
              active:scale-[0.99]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {googleLoading ? (
              <Loader2
                size={27}
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
              mt-[58px]
              pb-[12px]
              text-center
              font-serif
              text-[18px]
              text-[#777777]
            "
          >
            Don't have an account?{" "}

            <Link
              href="/register"
              className="
                font-bold
                text-[#b4881d]
                hover:underline
              "
            >
              Register
            </Link>
          </p>

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
      width="28"
      height="28"
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
