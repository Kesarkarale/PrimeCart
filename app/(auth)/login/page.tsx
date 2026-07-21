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

      {/* LEFT LOGIN */}
      <div className="flex items-center justify-center p-10">
        <div className="w-full max-w-sm">

          {/* Logo */}
          <Image
            src="/logo.png"
            alt="PrimeCart"
            width={180}
            height={50}
          />

          <h1 className="mt-8 text-4xl font-bold">
            Welcome <span className="text-[#D4AF37]">Back ✨</span>
          </h1>

          <p className="mt-3 text-gray-500">
            Sign in to continue your premium shopping experience.
          </p>

          {/* Form */}
          {/* Tujha existing form ithe paste kar */}
        </div>
      </div>

      {/* RIGHT BANNER */}
      <div className="relative">
        <Image
          src="/login-banner.png"
          alt="Banner"
          fill
          priority
          className="object-cover"
        />
      </div>

    </div>

  </div>
);
}
