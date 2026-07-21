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
    <main className="min-h-screen bg-[#f8f5ef]">
      <div className="grid lg:grid-cols-2 min-h-screen">

        {/* LEFT SIDE */}
      

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center p-8">

          <div
            className="
            w-full
            max-w-md
            bg-white
            rounded-[32px]
            shadow-xl
            p-8
            "
          >
            <p
              className="
              text-[#B68B2C]
              uppercase
              tracking-[5px]
              text-sm
              font-semibold
              "
            >
              Welcome Back
            </p>

            <h1
              className="
              mt-4
              text-4xl
              font-black
              text-gray-900
              "
            >
              Login To PrimeCart
            </h1>

            <p className="mt-3 text-gray-500">
              Continue your luxury shopping journey
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-10 space-y-6"
            >

              {/* EMAIL */}

              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Email Address
                </label>

                <div className="relative mt-2">
                  <Mail
                    size={20}
                    className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                    "
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
                    rounded-2xl
                    border
                    border-gray-200
                    bg-gray-50
                    pl-12
                    pr-4
                    outline-none
                    focus:border-[#D4AF37]
                    focus:ring-2
                    focus:ring-[#D4AF37]/20
                    "
                  />
                </div>
              </div>

              {/* PASSWORD */}

              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Password
                </label>

                <div className="relative mt-2">

                  <Lock
                    size={20}
                    className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                    "
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
                    placeholder="Enter password"
                    required
                    className="
                    w-full
                    h-14
                    rounded-2xl
                    border
                    border-gray-200
                    bg-gray-50
                    pl-12
                    pr-12
                    outline-none
                    focus:border-[#D4AF37]
                    focus:ring-2
                    focus:ring-[#D4AF37]/20
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
                    text-gray-500
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

                            {/* REMEMBER + FORGOT */}

              <div
                className="
                flex
                items-center
                justify-between
                text-sm
                "
              >
                <label
                  className="
                  flex
                  items-center
                  gap-2
                  text-gray-600
                  "
                >
                  <input
                    type="checkbox"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                    className="
                    w-4
                    h-4
                    accent-[#D4AF37]
                    "
                  />

                  Remember me
                </label>

                <button
                  type="button"
                  className="
                  text-[#B68B2C]
                  font-semibold
                  hover:underline
                  "
                >
                  Forgot Password?
                </button>
              </div>

              {/* LOGIN BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="
                w-full
                h-14
                rounded-2xl
                bg-[#D4AF37]
                text-white
                font-bold
                text-lg
                flex
                items-center
                justify-center
                gap-2
                hover:bg-[#b89225]
                transition
                "
              >
                {loading ? (
                  "Logging in..."
                ) : (
                  <>
                    Login Now
                    <ArrowRight size={20} />
                  </>
                )}
              </button>

            </form>

            {/* DIVIDER */}

            <div
              className="
              flex
              items-center
              gap-4
              my-8
              "
            >
              <div className="h-px bg-gray-200 flex-1" />

              <span className="text-gray-400 text-sm">
                OR
              </span>

              <div className="h-px bg-gray-200 flex-1" />
            </div>

            {/* GOOGLE LOGIN */}

            <button
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
              font-semibold
              text-gray-700
              hover:bg-gray-50
              transition
              "
            >
              <FcGoogle size={24} />
              Continue With Google
            </button>

            {/* REGISTER */}

            <p
              className="
              text-center
              mt-8
              text-gray-500
              "
            >
              Don't have an account?

              <Link
                href="/register"
                className="
                ml-2
                text-[#B68B2C]
                font-bold
                hover:underline
                "
              >
                Create Account
              </Link>
            </p>

            {/* SECURITY BOX */}

            <div
              className="
              mt-10
              p-5
              rounded-3xl
              bg-[#faf8f3]
              border
              border-[#D4AF37]/20
              "
            >
              <div
                className="
                flex
                items-center
                gap-3
                "
              >
                <div
                  className="
                  w-10
                  h-10
                  rounded-xl
                  bg-[#D4AF37]/20
                  flex
                  items-center
                  justify-center
                  "
                >
                  <Lock className="text-[#B68B2C]" />
                </div>

                <div>
                  <h4 className="font-bold text-gray-900">
                    Secure Shopping
                  </h4>

                  <p className="text-sm text-gray-500">
                    Your information is protected
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
