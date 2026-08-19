"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  User,
  Phone,
  UserPlus,
  Truck,
  RotateCcw,
  ShieldCheck,
  Headphones,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const supabase = createClient();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [agree, setAgree] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleRegister(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");
    setSuccess("");

    const name = fullName.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanMobile = mobile.trim();

    if (!name) {
      setError("Please enter your full name.");
      return;
    }

    if (!cleanEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (
      cleanMobile &&
      !/^[0-9]{10}$/.test(cleanMobile)
    ) {
      setError(
        "Please enter a valid 10-digit mobile number."
      );
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!agree) {
      setError(
        "Please accept the Terms & Conditions and Privacy Policy."
      );
      return;
    }

    try {
      setLoading(true);

      const { data, error: signUpError } =
        await supabase.auth.signUp({
          email: cleanEmail,
          password,
          options: {
            data: {
              full_name: name,
              mobile: cleanMobile,
            },

            emailRedirectTo:
              `${window.location.origin}/auth/callback?next=/dashboard`,
          },
        });

      if (signUpError) {
        if (
          signUpError.message
            .toLowerCase()
            .includes("already registered")
        ) {
          throw new Error(
            "An account with this email already exists."
          );
        }

        throw signUpError;
      }

      /*
       * If Confirm Email is OFF,
       * Supabase immediately returns a session.
       */
      if (data.session) {
        window.location.replace("/dashboard");
        return;
      }

      /*
       * If Confirm Email is ON,
       * user needs to verify email first.
       */
      setSuccess(
        "Account created successfully! Please check your email and verify your account before logging in."
      );

      setFullName("");
      setEmail("");
      setMobile("");
      setPassword("");
      setConfirmPassword("");
      setAgree(false);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to create your account."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f8f6f1] p-3 sm:p-5 lg:p-7">

      <div className="mx-auto max-w-[1380px] overflow-hidden rounded-[24px] bg-white shadow-[0_10px_50px_rgba(0,0,0,0.08)]">

        {/* ================= MAIN ================= */}

        <div className="grid min-h-[760px] lg:grid-cols-2">

          {/* ================= IMAGE ================= */}

          <div className="relative min-h-[250px] bg-[#f5f1e9] lg:min-h-[760px]">

            <img
              src="/login-banner.png"
              alt="PrimeCart"
              className="absolute inset-0 h-full w-full object-cover"
            />

          </div>

          {/* ================= REGISTER FORM ================= */}

          <div className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-14 xl:px-20">

            <div className="w-full max-w-[470px]">

              {/* LOGO */}

              <Link
                href="/"
                className="mb-8 flex w-fit items-center gap-2"
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

              <div className="mb-7">

                <h1 className="text-[30px] font-extrabold tracking-tight text-[#111] sm:text-[34px]">
                  Create your account
                </h1>

                <p className="mt-2 text-[14px] text-[#777]">
                  Fill in the details below to get started
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
                <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm leading-6 text-green-700">
                  {success}
                </div>
              )}

              {/* FORM */}

              <form
                onSubmit={handleRegister}
                className="space-y-4"
              >

                {/* FULL NAME */}

                <Field label="Full Name">

                  <div className="relative">

                    <User
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777]"
                    />

                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) =>
                        setFullName(e.target.value)
                      }
                      placeholder="Enter your full name"
                      autoComplete="name"
                      disabled={loading}
                      className="auth-input pl-11"
                      required
                    />

                  </div>

                </Field>

                {/* EMAIL */}

                <Field label="Email Address">

                  <div className="relative">

                    <Mail
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777]"
                    />

                    <input
                      type="email"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      placeholder="Enter your email"
                      autoComplete="email"
                      disabled={loading}
                      className="auth-input pl-11"
                      required
                    />

                  </div>

                </Field>

                {/* MOBILE */}

                <Field label="Mobile Number">

                  <div className="relative">

                    <Phone
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777]"
                    />

                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) =>
                        setMobile(
                          e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 10)
                        )
                      }
                      placeholder="Enter your mobile number"
                      autoComplete="tel"
                      disabled={loading}
                      className="auth-input pl-11"
                    />

                  </div>

                </Field>

                {/* PASSWORD */}

                <Field label="Password">

                  <div className="relative">

                    <LockKeyhole
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777]"
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
                      placeholder="Create a password"
                      autoComplete="new-password"
                      disabled={loading}
                      className="auth-input pl-11 pr-11"
                      required
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (value) => !value
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#777]"
                    >
                      {showPassword ? (
                        <EyeOff size={17} />
                      ) : (
                        <Eye size={17} />
                      )}
                    </button>

                  </div>

                </Field>

                {/* CONFIRM PASSWORD */}

                <Field label="Confirm Password">

                  <div className="relative">

                    <LockKeyhole
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777]"
                    />

                    <input
                      type={
                        showConfirm
                          ? "text"
                          : "password"
                      }
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(
                          e.target.value
                        )
                      }
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                      disabled={loading}
                      className="auth-input pl-11 pr-11"
                      required
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirm(
                          (value) => !value
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#777]"
                    >
                      {showConfirm ? (
                        <EyeOff size={17} />
                      ) : (
                        <Eye size={17} />
                      )}
                    </button>

                  </div>

                </Field>

                {/* TERMS */}

                <label className="flex cursor-pointer items-start gap-2 pt-1 text-[11px] leading-5 text-[#666]">

                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) =>
                      setAgree(e.target.checked)
                    }
                    disabled={loading}
                    className="mt-[2px] h-4 w-4 shrink-0 cursor-pointer accent-[#c99516]"
                  />

                  <span>
                    I agree to the{" "}
                    <span className="font-semibold text-[#c28b12]">
                      Terms & Conditions
                    </span>{" "}
                    and{" "}
                    <span className="font-semibold text-[#c28b12]">
                      Privacy Policy
                    </span>
                  </span>

                </label>

                {/* CREATE ACCOUNT */}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 flex h-[53px] w-full items-center justify-center gap-2 rounded-xl bg-[#d99d08] text-[14px] font-bold text-white shadow-[0_7px_18px_rgba(217,157,8,0.20)] transition hover:bg-[#c68e05] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {loading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <UserPlus size={18} />
                      Create Account
                    </>
                  )}

                </button>

              </form>

              {/* DIVIDER */}

              <div className="my-7 flex items-center gap-4">

                <div className="h-px flex-1 bg-[#e7e7e7]" />

                <span className="text-[12px] font-medium text-[#888]">
                  OR
                </span>

                <div className="h-px flex-1 bg-[#e7e7e7]" />

              </div>

              {/* GOOGLE */}

              <button
                type="button"
                onClick={() => {
                  setError(
                    "Google sign-up is not configured yet."
                  );
                }}
                className="flex h-[52px] w-full items-center justify-center gap-3 rounded-xl border border-[#dedede] bg-white text-[14px] font-semibold text-[#333] transition hover:bg-[#fafafa]"
              >
                <span className="text-[18px] font-bold text-[#4285f4]">
                  G
                </span>

                Sign up with Google
              </button>

              {/* LOGIN */}

              <p className="mt-7 text-center text-[13px] text-[#777]">

                Already have an account?{" "}

                <Link
                  href="/login"
                  className="font-bold text-[#c28b12] hover:underline"
                >
                  Login
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

      <style jsx global>{`

        .auth-input {
          height: 50px;
          width: 100%;
          border-radius: 10px;
          border: 1px solid #dedede;
          background: #ffffff;
          padding-right: 16px;
          font-size: 13px;
          color: #222222;
          outline: none;
          transition: all 0.2s ease;
        }

        .auth-input::placeholder {
          color: #999999;
        }

        .auth-input:focus {
          border-color: #c99516;
          box-shadow: 0 0 0 4px rgba(201, 149, 22, 0.09);
        }

        .auth-input:disabled {
          background: #fafafa;
          cursor: not-allowed;
        }

      `}</style>

    </main>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>

      <label className="mb-2 block text-[12px] font-bold text-[#222]">
        {label}
      </label>

      {children}

    </div>
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
