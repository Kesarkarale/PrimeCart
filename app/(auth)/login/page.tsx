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
  <div className="h-screen bg-[#F8F5EF] flex items-center justify-center p-6">

    {/* Main Container */}
    <div className="w-full max-w-7xl h-[90vh] bg-white rounded-[40px] shadow-2xl overflow-hidden grid lg:grid-cols-[42%_58%]">
   {/* LEFT BANNER */}
      <div className="relative">
        <Image
          src="/login-banner.png"
          alt="Banner"
          fill
          priority
          className="object-cover"
        />
      </div>
{/* RIGHT SIDE LOGIN */}
    <div className="flex flex-col justify-center h-full px-12 bg-white">

      {/* Logo */}
      <div className="mb-10">
        <Image
          src="/logo.png"
          alt="PrimeCart"
          width={220}
          height={60}
          priority
        />
      </div>

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-5xl font-bold text-black">
          Welcome <span className="text-[#D4AF37]">Back ✨</span>
        </h1>

        <p className="mt-4 text-gray-600 text-lg">
          Sign in to access your orders,
          wishlist, cart and premium deals.
        </p>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Email */}
        <div>
          <label className="block mb-2 text-sm font-semibold">
            Email Address
          </label>

          <div className="relative">
            <Mail className="absolute left-4 top-4 h-5 w-5 text-gray-400" />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full h-14 pl-12 pr-4 border border-gray-200 rounded-2xl"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block mb-2 text-sm font-semibold">
            Password
          </label>

          <div className="relative">
            <Lock className="absolute left-4 top-4 h-5 w-5 text-gray-400" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full h-14 pl-12 pr-12 border border-gray-200 rounded-2xl"
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-4"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-[#D4AF37]"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-white font-semibold"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

      </form>

      {/* Divider */}
      <div className="flex items-center my-8">
        <div className="flex-1 border-t" />
        <span className="px-4 text-gray-500">
          OR
        </span>
        <div className="flex-1 border-t" />
      </div>

      {/* Google */}
      <button className="w-full h-14 border rounded-2xl flex items-center justify-center gap-3">
        <FcGoogle size={24} />
        Continue with Google
      </button>

      <p className="mt-8 text-center text-gray-600">
        Don't have an account?
        <Link
          href="/register"
          className="ml-2 text-[#D4AF37] font-semibold"
        >
          Create Account →
        </Link>
      </p>
    </div>

  </div>
  </div>
);
}
