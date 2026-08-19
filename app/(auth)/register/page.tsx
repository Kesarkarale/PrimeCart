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
  const [agree, setAgree] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (
    e: FormEvent<HTMLFormElement>
  ) => {
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

    if (cleanMobile && !/^[0-9]{10}$/.test(cleanMobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!agree) {
      setError(
        "Please agree to the Terms & Conditions and Privacy Policy."
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
            emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
          },
        });

      if (signUpError) {
        throw signUpError;
      }

      // If email confirmation is OFF
      if (data.session) {
        window.location.href = "/dashboard";
        return;
      }

      // If email confirmation is ON
      setSuccess(
        "Account created successfully! Please check your email and verify your account."
      );

      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to create your account."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#faf8f4] px-3 py-4 sm:px-5 sm:py-6">
      <div className="mx-auto max-w-[1400px] overflow-hidden rounded-[24px] bg-white shadow-[0_8px_40px_rgba(0,0,0,0.08)]">

        <div className="grid min-h-[760px] lg:grid-cols-[48%_52%]">

          {/* LEFT BANNER */}
          <section className="relative hidden overflow-hidden lg:block">
            <img
              src="/login-banner.png"
              alt="PrimeCart shopping"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <Link
              href="/"
              className="absolute left-9 top-9 z-10"
            >
              <div className="flex items-center gap-2">
                <div className="text-[30px] text-[#c99516]">
                  🛒
                </div>

                <div>
                  <div className="text-[27px] font-extrabold tracking-tight">
                    Prime<span className="text-[#c99516]">
                      Cart
                    </span>
                  </div>

                  <p className="-mt-1 text-[9px] text-[#444]">
                    Shop More. Pay Less.
                  </p>
                </div>
              </div>
            </Link>

            <div className="absolute left-9 top-[190px] z-10 max-w-[310px]">
              <div className="mb-5 inline-flex items-center gap-2 rounded-lg bg-[#fff1d4] px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-[#b27b05]">
                <span>♛</span>
                Join PrimeCart
              </div>

              <h1 className="text-[47px] font-extrabold leading-[1.04] tracking-tight">
                Create Your
                <br />
                <span className="text-[#c99516]">
                  Account
                </span>
              </h1>

              <p className="mt-5 max-w-[280px] text-[15px] leading-6 text-[#555]">
                Join PrimeCart and start shopping
                <br />
                the best products online
              </p>
            </div>
          </section>

          {/* REGISTER */}
          <section className="flex items-center justify-center bg-white px-6 py-10 sm:px-12 lg:px-16 xl:px-20">
            <div className="w-full max-w-[500px]">

              {/* MOBILE LOGO */}
              <Link
                href="/"
                className="mb-9 flex items-center justify-center lg:hidden"
              >
                <div className="text-[28px] text-[#c99516]">
                  🛒
                </div>

                <div className="ml-2">
                  <div className="text-[25px] font-extrabold">
                    Prime<span className="text-[#c99516]">
                      Cart
                    </span>
                  </div>

                  <p className="-mt-1 text-[8px] text-gray-500">
                    Shop More. Pay Less.
                  </p>
                </div>
              </Link>

              <div className="mb-7">
                <h2 className="text-[31px] font-extrabold tracking-tight text-[#111]">
                  Create your account
                </h2>

                <p className="mt-2 text-[14px] text-[#777]">
                  Fill in the details below to get started
                </p>
              </div>

              {error && (
                <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm leading-6 text-green-700">
                  {success}
                </div>
              )}

              <form
                onSubmit={handleRegister}
                className="space-y-4"
              >

                {/* NAME */}
                <FieldLabel label="Full Name">
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
                      className="auth-input pl-11"
                      required
                    />
                  </div>
                </FieldLabel>

                {/* EMAIL */}
                <FieldLabel label="Email Address">
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
                      className="auth-input pl-11"
                      required
                    />
                  </div>
                </FieldLabel>

                {/* MOBILE */}
                <FieldLabel label="Mobile Number">
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
                          e.target.value.replace(/\D/g, "").slice(0, 10)
                        )
                      }
                      placeholder="Enter your mobile number"
                      autoComplete="tel"
                      className="auth-input pl-11"
                    />
                  </div>
                </FieldLabel>

                {/* PASSWORD */}
                <FieldLabel label="Password">
                  <div className="relative">
                    <LockKeyhole
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777]"
                    />

                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      placeholder="Create a password"
                      autoComplete="new-password"
                      className="auth-input pl-11 pr-11"
                      required
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
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
                </FieldLabel>

                {/* CONFIRM */}
                <FieldLabel label="Confirm Password">
                  <div className="relative">
                    <LockKeyhole
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777]"
                    />

                    <input
                      type={showConfirm ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(e.target.value)
                      }
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                      className="auth-input pl-11 pr-11"
                      required
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirm(!showConfirm)
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
                </FieldLabel>

                {/* TERMS */}
                <label className="flex cursor-pointer items-start gap-2 pt-1 text-[11px] leading-5 text-[#666]">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) =>
                      setAgree(e.target.checked)
                    }
                    className="mt-1 h-4 w-4 accent-[#c99516]"
                  />

                  <span>
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="font-semibold text-[#c28b12]"
                    >
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="font-semibold text-[#c28b12]"
                    >
                      Privacy Policy
                    </Link>
                  </span>
                </label>

                {/* CREATE */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 flex h-[52px] w-full items-center justify-center gap-2 rounded-lg bg-[#d99e08] text-[14px] font-bold text-white shadow-[0_5px_15px_rgba(217,158,8,0.18)] transition hover:bg-[#c58e05] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
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

              {/* OR */}
              <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-[#e5e5e5]" />

                <span className="text-[12px] text-[#777]">
                  OR
                </span>

                <div className="h-px flex-1 bg-[#e5e5e5]" />
              </div>

              {/* GOOGLE */}
              <button
                type="button"
                className="flex h-[51px] w-full items-center justify-center gap-3 rounded-lg border border-[#ddd] bg-white text-[14px] font-semibold text-[#333] hover:bg-[#fafafa]"
              >
                <span className="text-[18px] font-bold text-[#4285F4]">
                  G
                </span>
                Sign up with Google
              </button>

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

      <style jsx global>{`
        .auth-input {
          height: 50px;
          width: 100%;
          border-radius: 8px;
          border: 1px solid #d9d9d9;
          background: white;
          padding-right: 16px;
          font-size: 13px;
          color: #222;
          outline: none;
          transition: all 0.2s ease;
        }

        .auth-input:focus {
          border-color: #d19b1d;
          box-shadow: 0 0 0 3px rgba(209, 155, 29, 0.08);
        }

        .auth-input::placeholder {
          color: #999;
        }
      `}</style>
    </main>
  );
}

function FieldLabel({
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
      <div className="text-[#c99516]">{icon}</div>

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
