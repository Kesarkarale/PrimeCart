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
<div className="flex items-center justify-center bg-[#FAF8F3] p-8">

  <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-[32px] shadow-2xl border border-[#E8E2D6] p-10">

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
      <p className="text-[#D4AF37] uppercase tracking-[4px] text-sm font-semibold">
        Welcome Back
      </p>

      <h1 className="mt-3 text-4xl font-bold text-gray-900">
        Login to PrimeCart
      </h1>

      <p className="mt-3 text-gray-500">
        Continue your premium shopping experience.
      </p>
    </div>

    {/* FORM */}
    <form onSubmit={handleSubmit} className="space-y-5">

      <div>
        <label className="block mb-2 text-sm font-semibold text-gray-700">
          Email Address
        </label>

        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="w-full h-14 pl-12 pr-4 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
          />
        </div>
      </div>

      <div>
        <label className="block mb-2 text-sm font-semibold text-gray-700">
          Password
        </label>

        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            className="w-full h-14 pl-12 pr-12 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <Link
          href="/forgot-password"
          className="text-sm font-medium text-[#D4AF37]"
        >
          Forgot Password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-white font-semibold flex items-center justify-center gap-2"
      >
        {loading ? (
          "Signing In..."
        ) : (
          <>
            Sign In
            <ArrowRight size={18} />
          </>
        )}
      </button>
    </form>

    <div className="flex items-center my-7">
      <div className="flex-1 border-t" />
      <span className="px-4 text-gray-400 text-sm">OR</span>
      <div className="flex-1 border-t" />
    </div>

    <button className="w-full h-14 rounded-2xl border border-gray-200 flex items-center justify-center gap-3 hover:bg-gray-50">
      <FcGoogle size={24} />
      Continue with Google
    </button>

    <p className="text-center mt-7 text-gray-500">
      Don&apos;t have an account?
      <Link
        href="/register"
        className="ml-2 text-[#D4AF37] font-semibold"
      >
        Create Account
      </Link>
    </p>

  </div>
</div>
    );
    
