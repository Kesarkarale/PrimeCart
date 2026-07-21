"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
} from "lucide-react";

import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Login Successful ✨");
        router.push("/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="h-screen bg-gradient-to-br from-[#f8f5ef] via-[#f6f2ea] to-[#efe7d8] flex items-center justify-center p-5">

    <div className="w-full max-w-[1450px] h-[90vh] bg-white rounded-[40px] shadow-[0_25px_80px_rgba(0,0,0,0.08)] overflow-hidden grid lg:grid-cols-[45%_55%]">

      {/* LEFT BANNER */}
      <div className="relative hidden lg:block">
        <Image
          src="/login-banner.png"
          alt="PrimeCart Banner"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* RIGHT LOGIN */}
      <div className="flex items-center justify-center bg-white">

        <div className="w-full max-w-lg px-10">

          {/* Logo */}
          <div className="mb-8">
            <Image
              src="/logo.png"
              alt="PrimeCart"
              width={180}
              height={50}
              priority
            />
          </div>

          {/* Heading */}
          <div className="mb-8">

            <h1 className="text-5xl font-bold text-[#111827] leading-tight">
              Welcome{" "}
              <span className="text-[#D4AF37]">
                Back ✨
              </span>
            </h1>

            <p className="mt-4 text-gray-500 text-lg">
              Sign in to access your orders,
              wishlist, cart and premium deals.
            </p>

          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* EMAIL */}
            <div>

              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Email Address
              </label>

              <div className="relative">

                <Mail
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="
                  w-full
                  h-14
                  pl-12
                  pr-4
                  rounded-2xl
                  border
                  border-gray-200
                  bg-[#fafafa]
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#D4AF37]/20
                  focus:border-[#D4AF37]
                  transition
                  "
                />
              </div>

            </div>

            {/* PASSWORD */}
            <div>

              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Password
              </label>

              <div className="relative">

                <Lock
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
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
                  placeholder="Enter your password"
                  required
                  className="
                  w-full
                  h-14
                  pl-12
                  pr-12
                  rounded-2xl
                  border
                  border-gray-200
                  bg-[#fafafa]
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#D4AF37]/20
                  focus:border-[#D4AF37]
                  transition
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                  "
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

            </div>

            {/* FORGOT */}
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="
                text-[#D4AF37]
                font-medium
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
              w-full
              h-14
              rounded-2xl
              bg-gradient-to-r
              from-[#B8860B]
              to-[#D4AF37]
              text-white
              font-semibold
              text-lg
              flex
              items-center
              justify-center
              gap-2
              hover:scale-[1.01]
              transition-all
              duration-300
              "
            >
              {loading ? (
                "Signing In..."
              ) : (
                <>
                  Sign In
                  <ArrowRight size={20} />
                </>
              )}
            </button>

          </form>

          {/* DIVIDER */}
          <div className="flex items-center my-7">

            <div className="flex-1 border-t border-gray-200" />

            <span className="px-4 text-gray-400 text-sm">
              OR
            </span>

            <div className="flex-1 border-t border-gray-200" />

          </div>

          {/* GOOGLE */}
          <button
            type="button"
            className="
            w-full
            h-14
            rounded-2xl
            border
            border-gray-200
            flex
            items-center
            justify-center
            gap-3
            font-medium
            hover:bg-gray-50
            transition
            "
          >
            <FcGoogle size={24} />
            Continue with Google
          </button>

          {/* REGISTER */}
          <p className="mt-7 text-center text-gray-500">

            Don&apos;t have an account?

            <Link
              href="/register"
              className="
              ml-2
              text-[#D4AF37]
              font-semibold
              hover:underline
              "
            >
              Create Account →
            </Link>

          </p>

        </div>

      </div>

    </div>

  </div>
);
}
