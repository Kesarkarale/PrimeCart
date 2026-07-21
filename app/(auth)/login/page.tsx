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
  <div className="grid min-h-screen lg:grid-cols-2 bg-[#FAF8F3]">
 {/* LEFT SIDE BANNER */}
    <div className="relative hidden lg:block">
      <Image
        src="/login-banner.png"
        alt="PrimeCart Banner"
        fill
        priority
        className="object-cover"
      />
    </div>
    {/* RIGHT SIDE LOGIN */}
    
  <div className="grid min-h-screen lg:grid-cols-[45%_55%] bg-[#FAF8F3]">

    <div className="flex items-center justify-center bg-white px-10 lg:px-20">

      <div className="w-full max-w-lg">

        {/* Logo */}
        <div className="mb-12">
          <Image
            src="/logo.png"
            alt="PrimeCart"
            width={260}
            height={70}
            priority
          />
        </div>

        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-6xl font-bold text-black leading-tight">
            Welcome{" "}
            <span className="text-[#D4AF37]">
              Back ✨
            </span>
          </h1>

          <p className="mt-6 text-gray-600 text-2xl leading-relaxed">
            Sign in to access your orders,
            wishlist, cart and premium deals.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Email */}
          <div>
            <label className="block mb-3 text-xl font-semibold text-gray-900">
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={24}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full h-16 rounded-2xl border border-gray-300 bg-white pl-14 pr-4 text-lg outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-3 text-xl font-semibold text-gray-900">
              Password
            </label>

            <div className="relative">
              <Lock
                size={24}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
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
                className="w-full h-16 rounded-2xl border border-gray-300 bg-white pl-14 pr-14 text-lg outline-none focus:border-[#D4AF37]"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <EyeOff size={24} />
                ) : (
                  <Eye size={24} />
                )}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-[#D4AF37] text-lg font-medium hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-16 rounded-2xl bg-gradient-to-r from-[#C58B00] to-[#E5B62C] text-white text-2xl font-semibold flex items-center justify-center gap-3 hover:opacity-90 transition"
          >
            {loading ? (
              "Signing In..."
            ) : (
              <>
                Sign In
                <ArrowRight size={24} />
              </>
            )}
          </button>

        </form>

        {/* Divider */}
        <div className="flex items-center my-8">
          <div className="flex-1 border-t border-gray-300" />
          <span className="px-5 text-gray-500 text-lg">
            OR
          </span>
          <div className="flex-1 border-t border-gray-300" />
        </div>

        {/* Google */}
        <button
          type="button"
          className="w-full h-16 rounded-2xl border border-gray-300 bg-white flex items-center justify-center gap-4 text-xl font-medium hover:bg-gray-50 transition"
        >
          <FcGoogle size={30} />
          Continue with Google
        </button>

        {/* Register */}
        <p className="mt-10 text-lg text-gray-600">
          Don&apos;t have an account?

          <Link
            href="/register"
            className="ml-2 text-[#D4AF37] font-semibold hover:underline"
          >
            Create Account →
          </Link>
        </p>

      </div>
    </div>

     

  </div>
);
}
