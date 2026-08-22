"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Mail,
  Send,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // =========================================================
  // SEND PASSWORD RESET EMAIL
  // =========================================================

  const handleResetPassword = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setSuccess(false);

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

      const { error: resetError } =
        await supabase.auth.resetPasswordForEmail(
          cleanEmail,
          {
            redirectTo:
              `${window.location.origin}/reset-password`,
          }
        );

      if (resetError) {
        console.error(
          "Password reset error:",
          resetError
        );

        setError(resetError.message);
        return;
      }

      setSuccess(true);
    } catch (err) {
      console.error(
        "Forgot password error:",
        err
      );

      setError(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="
        min-h-screen
        bg-[#f8f6f1]
        px-3
        py-3
        sm:px-5
        sm:py-5
        lg:p-6
      "
    >
      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div
        className="
          mx-auto
          grid
          min-h-[calc(100vh-24px)]
          w-full
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
            LEFT BANNER
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

          <div
            className="
              absolute
              inset-0
              bg-black/5
            "
          />
        </div>

        {/* =====================================================
            RIGHT SECTION
        ====================================================== */}

        <div
          className="
            flex
            w-full
            items-center
            justify-center
            bg-white

            px-5
            py-10

            sm:px-9
            sm:py-12

            md:px-12

            lg:px-12
            xl:px-16
            xl:py-14
          "
        >
          <div
            className="
              w-full
              max-w-[430px]
            "
          >
            {/* =================================================
                LOGO
            ================================================= */}

            <Link
              href="/"
              aria-label="PrimeCart Home"
              className="
                mb-9
                flex
                w-fit
                items-center
                gap-3
                transition-opacity
                duration-200
                hover:opacity-85
              "
            >
              <img
                src="/logo.png"
                alt="PrimeCart Logo"
                width={58}
                height={58}
                className="
                  h-[52px]
                  w-[52px]
                  object-contain

                  sm:h-[56px]
                  sm:w-[56px]
                "
              />

              <span
                className="
                  font-serif
                  text-[28px]
                  font-bold
                  tracking-[-0.8px]
                  text-[#111111]

                  sm:text-[30px]
                "
              >
                PrimeCart
              </span>
            </Link>

            {/* =================================================
                BACK TO LOGIN
            ================================================= */}

            <Link
              href="/login"
              className="
                mb-7
                inline-flex
                items-center
                gap-2
                font-serif
                text-[13px]
                font-semibold
                text-[#777777]
                transition
                hover:text-[#c18b13]
              "
            >
              <ArrowLeft size={16} />
              Back to Login
            </Link>

            {/* =================================================
                SUCCESS STATE
            ================================================= */}

            {success ? (
              <div>
                <div
                  className="
                    mb-6
                    flex
                    h-[58px]
                    w-[58px]
                    items-center
                    justify-center
                    rounded-full
                    bg-[#fdf5df]
                  "
                >
                  <CheckCircle2
                    size={30}
                    strokeWidth={1.8}
                    className="text-[#c18b13]"
                  />
                </div>

                <h1
                  className="
                    font-serif
                    text-[29px]
                    font-bold
                    leading-[1.2]
                    tracking-[-0.6px]
                    text-[#111111]

                    sm:text-[31px]
                  "
                >
                  Check your email
                </h1>

                <p
                  className="
                    mt-3
                    max-w-[390px]
                    font-serif
                    text-[14px]
                    leading-[1.7]
                    text-[#777777]

                    sm:text-[15px]
                  "
                >
                  We've sent a password reset link to{" "}
                  <span className="font-semibold text-[#333333]">
                    {email}
                  </span>
                  .
                </p>

                <div
                  className="
                    mt-6
                    rounded-[11px]
                    border
                    border-[#eadfbf]
                    bg-[#fffaf0]
                    px-4
                    py-4
                    font-serif
                    text-[13px]
                    leading-6
                    text-[#6d5b2a]
                  "
                >
                  Please check your inbox and click the
                  reset link to create a new password.
                  If you don't see the email, check your
                  spam or junk folder.
                </div>

                <Link
                  href="/login"
                  className="
                    mt-7
                    flex
                    h-[54px]
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-[10px]
                    bg-[#d99d08]
                    font-serif
                    text-[14px]
                    font-bold
                    text-white
                    shadow-[0_7px_18px_rgba(217,157,8,0.20)]
                    transition
                    hover:bg-[#c88f05]
                    active:scale-[0.99]

                    sm:h-[56px]
                    sm:text-[15px]
                  "
                >
                  <ArrowLeft size={18} />
                  Back to Login
                </Link>
              </div>
            ) : (
              <>
                {/* =============================================
                    HEADING
                ============================================== */}

                <div className="mb-8">
                  <div
                    className="
                      mb-5
                      flex
                      h-[58px]
                      w-[58px]
                      items-center
                      justify-center
                      rounded-full
                      bg-[#fdf5df]
                    "
                  >
                    <Mail
                      size={28}
                      strokeWidth={1.8}
                      className="text-[#c18b13]"
                    />
                  </div>

                  <h1
                    className="
                      font-serif
                      text-[29px]
                      font-bold
                      leading-[1.2]
                      tracking-[-0.6px]
                      text-[#111111]

                      sm:text-[31px]
                    "
                  >
                    Forgot your password?
                  </h1>

                  <p
                    className="
                      mt-3
                      max-w-[390px]
                      font-serif
                      text-[14px]
                      leading-[1.7]
                      text-[#777777]

                      sm:text-[15px]
                    "
                  >
                    No worries. Enter the email address
                    associated with your account and we'll
                    send you a link to reset your password.
                  </p>
                </div>

                {/* =============================================
                    ERROR
                ============================================== */}

                {error && (
                  <div
                    role="alert"
                    className="
                      mb-5
                      rounded-[10px]
                      border
                      border-red-200
                      bg-red-50
                      px-4
                      py-3
                      font-serif
                      text-[12px]
                      leading-5
                      text-red-700
                    "
                  >
                    {error}
                  </div>
                )}

                {/* =============================================
                    FORM
                ============================================== */}

                <form
                  onSubmit={handleResetPassword}
                  className="space-y-5"
                >
                  {/* EMAIL */}

                  <div>
                    <label
                      htmlFor="email"
                      className="
                        mb-2
                        block
                        font-serif
                        text-[14px]
                        font-bold
                        text-[#222222]

                        sm:text-[15px]
                      "
                    >
                      Email Address
                    </label>

                    <div className="relative">
                      <Mail
                        size={19}
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
                        disabled={loading}
                        required
                        className="
                          h-[58px]
                          w-full
                          rounded-[11px]
                          border
                          border-[#d9d9d9]
                          bg-white
                          pl-[49px]
                          pr-4
                          font-serif
                          text-[14px]
                          text-[#222222]
                          outline-none
                          transition-all

                          placeholder:text-[#999999]

                          focus:border-[#d19a18]
                          focus:ring-[3px]
                          focus:ring-[#d19a18]/10

                          disabled:cursor-not-allowed
                          disabled:bg-[#fafafa]

                          sm:h-[60px]
                          sm:text-[15px]
                        "
                      />
                    </div>
                  </div>

                  {/* SEND BUTTON */}

                  <button
                    type="submit"
                    disabled={loading}
                    className="
                      flex
                      h-[58px]
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-[11px]
                      bg-[#d99d08]
                      font-serif
                      text-[15px]
                      font-bold
                      text-white
                      shadow-[0_7px_18px_rgba(217,157,8,0.20)]
                      transition-all
                      hover:bg-[#c88f05]
                      active:scale-[0.99]
                      disabled:cursor-not-allowed
                      disabled:opacity-60

                      sm:h-[60px]
                      sm:text-[16px]
                    "
                  >
                    {loading ? (
                      <>
                        <Loader2
                          size={19}
                          className="animate-spin"
                        />
                        Sending Reset Link...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Reset Link
                      </>
                    )}
                  </button>
                </form>

                {/* =============================================
                    BACK TO LOGIN
                ============================================== */}

                <div
                  className="
                    mt-7
                    text-center
                    font-serif
                    text-[13px]
                    text-[#777777]

                    sm:text-[14px]
                  "
                >
                  Remember your password?{" "}

                  <Link
                    href="/login"
                    className="
                      font-bold
                      text-[#c18b13]
                      transition
                      hover:underline
                    "
                  >
                    Login
                  </Link>
                </div>

                {/* =============================================
                    SECURITY NOTE
                ============================================== */}

                <div
                  className="
                    mt-8
                    flex
                    items-start
                    gap-2.5
                    rounded-[10px]
                    bg-[#faf9f6]
                    px-4
                    py-3.5
                  "
                >
                  <Mail
                    size={16}
                    strokeWidth={1.8}
                    className="
                      mt-[2px]
                      shrink-0
                      text-[#c18b13]
                    "
                  />

                  <p
                    className="
                      font-serif
                      text-[11px]
                      leading-5
                      text-[#888888]

                      sm:text-[12px]
                    "
                  >
                    For your security, we'll only send a
                    password reset link to an email address
                    registered with PrimeCart.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
