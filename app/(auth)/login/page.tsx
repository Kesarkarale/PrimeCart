"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  Eye,
  EyeOff,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";

import { FaGoogle } from "react-icons/fa";

import { toast } from "sonner";

import { motion } from "framer-motion";

import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {

  const router = useRouter();

  const supabase = createClient();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  async function login() {

    try {

      setLoading(true);

      const { error } =
        await supabase.auth.signInWithPassword({

          email,
          password,

        });

      if (error) {

        toast.error(error.message);

        return;
      }

      toast.success(
        "Welcome back to PrimeCart ✨"
      );

      router.push("/dashboard");

    } catch {

      toast.error(
        "Something went wrong"
      );

    } finally {

      setLoading(false);
    }
  }

  async function googleLogin() {

    const { error } =
      await supabase.auth.signInWithOAuth({

        provider: "google",

        options: {

          redirectTo:
            `${window.location.origin}/auth/callback`,
        },
      });

    if (error) {

      toast.error(error.message);
    }
  }
   return (

    <main className="
      min-h-screen
      bg-[#F8F5EF]
      flex
      items-center
      justify-center
      p-6
    ">

      <div className="
        w-full
        max-w-7xl
        bg-white
        rounded-[32px]
        overflow-hidden
        shadow-[0_20px_80px_rgba(0,0,0,0.08)]
        grid
        lg:grid-cols-2
      ">

        {/* LEFT SECTION */}

        <motion.div

          initial={{
            opacity: 0,
            x: -50
          }}

          animate={{
            opacity: 1,
            x: 0
          }}

          transition={{
            duration: 0.6
          }}

          className="
            hidden
            lg:flex
            flex-col
            justify-between
            bg-[#FAF7F2]
            p-12
            relative
            overflow-hidden
          "
        >

          {/* TOP */}

          <div>

            <Image
              src="/logo.png"
              alt="PrimeCart"
              width={180}
              height={60}
              priority
            />

            <div className="
              inline-flex
              mt-10
              px-4
              py-2
              rounded-full
              bg-[#F6E7C8]
              text-[#C58A5C]
              text-sm
              font-semibold
            ">
              PREMIUM EXPERIENCE
            </div>

            <h1 className="
              mt-8
              text-6xl
              font-bold
              leading-tight
              text-black
            ">
              Welcome
              <br />

              <span className="
                text-[#C58A5C]
              ">
                Back!
              </span>

            </h1>

            <p className="
              mt-6
              text-gray-600
              text-lg
              max-w-sm
            ">
              Sign in to continue shopping
              your favourite products and
              enjoy a luxury shopping
              experience.
            </p>

          </div>

          {/* PRODUCT SHOWCASE */}

          <div className="
            relative
            h-[420px]
            flex
            items-end
            justify-center
          ">

            {/* BAG */}

            <Image
              src="/luxury-bag.png"
              alt="Luxury Bag"
              width={380}
              height={380}
              className="
                relative
                z-20
                object-contain
              "
            />

            {/* PERFUME */}

            <Image
              src="/luxury-perfume.png"
              alt="Perfume"
              width={120}
              height={120}
              className="
                absolute
                left-6
                bottom-10
                z-30
                drop-shadow-2xl
              "
            />

            {/* WATCH */}

            <Image
              src="/luxury-watch.png"
              alt="Watch"
              width={120}
              height={120}
              className="
                absolute
                right-6
                bottom-8
                z-30
                drop-shadow-2xl
              "
            />

          </div>

        </motion.div>

        {/* RIGHT LOGIN SECTION START */}

        <motion.div

          initial={{
            opacity: 0,
            y: 40
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          transition={{
            duration: 0.6
          }}

          className="
            flex
            items-center
            justify-center
            p-8
            lg:p-14
          "
        >

          <div className="
            w-full
            max-w-md
          ">
                       <div className="mb-8">

              <h2 className="
                text-4xl
                font-bold
                text-black
              ">
                Login to your account
              </h2>

              <p className="
                text-gray-500
                mt-3
              ">
                Enter your email and password
                to access your PrimeCart account.
              </p>

            </div>

            {/* EMAIL */}

            <div className="mb-5">

              <label className="
                block
                text-sm
                font-medium
                text-gray-700
                mb-2
              ">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter your email"
                className="
                  w-full
                  h-14
                  px-4
                  border
                  border-gray-200
                  rounded-xl
                  outline-none
                  focus:border-[#C58A5C]
                  transition
                "
              />

            </div>

            {/* PASSWORD */}

            <div>

              <div className="
                flex
                justify-between
                items-center
                mb-2
              ">

                <label className="
                  text-sm
                  font-medium
                  text-gray-700
                ">
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="
                    text-[#C58A5C]
                    text-sm
                    hover:underline
                  "
                >
                  Forgot Password?
                </Link>

              </div>

              <div className="relative">

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
                  placeholder="Enter your password"
                  className="
                    w-full
                    h-14
                    px-4
                    pr-12
                    border
                    border-gray-200
                    rounded-xl
                    outline-none
                    focus:border-[#C58A5C]
                    transition
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="
                    absolute
                    right-4
                    top-4
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

            {/* REMEMBER */}

            <div className="
              flex
              items-center
              mt-5
            ">

              <input
                type="checkbox"
                className="mr-2"
              />

              <span className="
                text-sm
                text-gray-600
              ">
                Remember me
              </span>

            </div>

            {/* LOGIN BUTTON */}

            <button
              onClick={login}
              disabled={loading}
              className="
                mt-7
                w-full
                h-14
                rounded-xl
                bg-[#C58A5C]
                text-white
                font-semibold
                flex
                items-center
                justify-center
                gap-2
                hover:opacity-90
                transition
              "
            >

              {loading ? (
                "Logging in..."
              ) : (
                <>
                  Login
                  <ArrowRight size={18} />
                </>
              )}

            </button>

            {/* DIVIDER */}

            <div className="
              flex
              items-center
              gap-4
              my-8
            ">

              <div className="
                flex-1
                h-px
                bg-gray-200
              " />

              <span className="
                text-sm
                text-gray-400
              ">
                OR
              </span>

              <div className="
                flex-1
                h-px
                bg-gray-200
              " />

            </div>

            {/* GOOGLE LOGIN */}

            <button
              onClick={googleLogin}
              className="
                w-full
                h-14
                border
                border-gray-200
                rounded-xl
                flex
                items-center
                justify-center
                gap-3
                font-medium
                hover:bg-gray-50
                transition
              "
            >

              <FaGoogle size={18} />

              Continue with Google

            </button>

            {/* REGISTER */}

            <p className="
              text-center
              text-gray-600
              mt-8
            ">

              Don't have an account?

              <Link
                href="/register"
                className="
                  ml-2
                  text-[#C58A5C]
                  font-semibold
                "
              >
                Create Account
              </Link>

            </p>

          </div>

        </motion.div>

      </div>

    </main>

  );
}
