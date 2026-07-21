 "use client";

import React, { useState } from "react";
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
  <div>
    {/* Left Login Form */}
  </div>

  <div className="relative hidden lg:block">
    <Image
      src="/login-banner.png"
      alt="PrimeCart Banner"
      fill
      className="object-cover"
    />
  </div>
</div>
      

        {/* RIGHT SIDE */}
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
    <h1 className="text-5xl font-bold text-black leading-tight">
      Welcome <span className="text-[#D4AF37]">Back ✨</span>
    </h1>

    <p className="mt-4 text-gray-600 text-lg max-w-md">
      Sign in to access your orders,
      wishlist, cart and premium deals.
    </p>
  </div>

  {/* Form */}
  <form className="space-y-6">
    <div>
      <label className="block mb-2 text-sm font-semibold text-gray-700">
        Email Address
      </label>

      <input
        type="email"
        placeholder="Enter your email"
        className="w-full h-14 px-5 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
      />
    </div>

    <div>
      <label className="block mb-2 text-sm font-semibold text-gray-700">
        Password
      </label>

      <input
        type="password"
        placeholder="Enter your password"
        className="w-full h-14 px-5 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
      />
    </div>

    <div className="flex justify-end">
      <button
        type="button"
        className="text-[#D4AF37] font-medium hover:underline"
      >
        Forgot Password?
      </button>
    </div>

    <button
      type="submit"
      className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-white font-semibold text-lg hover:scale-[1.02] transition"
    >
      Sign In →
    </button>
  </form>

  {/* Divider */}
  <div className="flex items-center my-8">
    <div className="flex-1 border-t"></div>
    <span className="px-4 text-gray-500">OR</span>
    <div className="flex-1 border-t"></div>
  </div>

  {/* Google */}
  <button className="w-full h-14 border border-gray-200 rounded-2xl font-medium hover:bg-gray-50 transition">
    Continue with Google
  </button>

  {/* Register */}
  <p className="mt-8 text-center text-gray-600">
    Don't have an account?
    <span className="ml-2 text-[#D4AF37] font-semibold cursor-pointer">
      Create Account →
    </span>
  </p>
</div>
  );
}
