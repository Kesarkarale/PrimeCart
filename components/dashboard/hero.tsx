"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  BadgePercent,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0B0B0B] via-[#111827] to-[#1F2937] border border-[#D4AF37]/20 p-8 md:p-12">

      {/* Glow */}
      <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-[#D4AF37]/20 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-yellow-500/10 blur-3xl" />

      <div className="relative grid lg:grid-cols-2 gap-10 items-center">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-2 text-[#D4AF37] text-sm font-semibold">
            <Sparkles size={16} />
            Premium Shopping Experience
          </div>

          <h1 className="mt-6 text-5xl lg:text-6xl font-black leading-tight text-white">
            Shop
            <span className="text-[#D4AF37]"> Smarter</span>
            <br />
            Live Better.
          </h1>

          <p className="mt-6 max-w-xl text-lg text-gray-300">
            Explore premium products, luxury brands, exclusive offers and
            lightning-fast delivery—all in one beautiful shopping experience.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <Link
              href="/dashboard/products"
              className="inline-flex items-center gap-2 rounded-xl bg-[#D4AF37] px-6 py-3 font-bold text-black transition hover:scale-105"
            >
              Shop Now
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/dashboard/categories"
              className="rounded-xl border border-white/20 px-6 py-3 font-semibold text-white transition hover:border-[#D4AF37]"
            >
              Explore Categories
            </Link>

          </div>

          <div className="mt-10 grid grid-cols-3 gap-4">

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-xl">
              <Truck className="mx-auto text-[#D4AF37]" />
              <p className="mt-2 text-sm text-gray-300">
                Free Delivery
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-xl">
              <ShieldCheck className="mx-auto text-[#D4AF37]" />
              <p className="mt-2 text-sm text-gray-300">
                Secure Payment
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-xl">
              <BadgePercent className="mx-auto text-[#D4AF37]" />
              <p className="mt-2 text-sm text-gray-300">
                Daily Offers
              </p>
            </div>

          </div>

        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
          className="flex justify-center"
        >

          <div className="relative">

            <div className="absolute -inset-6 rounded-full bg-[#D4AF37]/20 blur-3xl" />

            <div className="relative rounded-[35px] border border-[#D4AF37]/30 bg-white/10 p-8 backdrop-blur-2xl shadow-2xl">

              <div className="text-[130px] text-center">
                🛍️
              </div>

              <h2 className="mt-4 text-center text-3xl font-bold">
                PrimeCart
              </h2>

              <p className="mt-2 text-center text-gray-300">
                Luxury Shopping Marketplace
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">

                <div className="rounded-xl bg-black/40 p-4 text-center">
                  <h3 className="text-2xl font-bold text-[#D4AF37]">
                    10K+
                  </h3>

                  <p className="text-sm text-gray-400">
                    Products
                  </p>
                </div>

                <div className="rounded-xl bg-black/40 p-4 text-center">
                  <h3 className="text-2xl font-bold text-[#D4AF37]">
                    50K+
                  </h3>

                  <p className="text-sm text-gray-400">
                    Customers
                  </p>
                </div>

              </div>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}
