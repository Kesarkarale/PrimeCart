 "use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const slides = [
  {
    id: 1,
    badge: "🔥 Mega Sale 2026",
    title: "Premium Electronics Collection",
    subtitle: "Up To 70% OFF",
    description:
      "Discover flagship smartphones, laptops, watches and premium gadgets.",
    image: "/banner/headphones.png",
    bg: "from-[#FFF8E6] via-white to-[#F8F8F8]",
  },
  {
    id: 2,
    badge: "⚡ Limited Offer",
    title: "Fashion Week Specials",
    subtitle: "Flat 50% OFF",
    description:
      "Upgrade your wardrobe with premium fashion brands.",
    image: "/banner/fashion.png",
    bg: "from-[#FCE7F3] via-white to-[#FFF7ED]",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const next = () =>
    setCurrent((prev) => (prev + 1) % slides.length);

  const prev = () =>
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );

  const slide = slides[current];

  return (
    <section className="relative overflow-hidden rounded-3xl">

      <motion.div
        key={slide.id}
        initial={{ opacity: 0, scale: .98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: .5 }}
        className={`
          bg-gradient-to-r
          ${slide.bg}
          dark:from-[#0B0B0B]
          dark:via-[#111827]
          dark:to-[#1F2937]
          border
          border-gray-200
          dark:border-white/10
          rounded-3xl
          p-10
        `}
      >
        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* LEFT */}

          <div>

            <span className="inline-block rounded-full bg-[#D4AF37] px-4 py-2 text-sm font-bold text-black">
              {slide.badge}
            </span>

            <h1 className="mt-6 text-5xl lg:text-6xl font-black leading-tight text-gray-900 dark:text-white">
              {slide.title}
            </h1>

            <h2 className="mt-3 text-4xl font-black text-[#D4AF37]">
              {slide.subtitle}
            </h2>

            <p className="mt-5 max-w-xl text-lg text-gray-600 dark:text-gray-300">
              {slide.description}
            </p>

            <div className="mt-8 flex gap-4">

              <Link
                href="/dashboard/products"
                className="rounded-xl bg-[#D4AF37] px-7 py-3 font-bold text-black flex items-center gap-2 hover:scale-105 transition"
              >
                Shop Now
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/dashboard/categories"
                className="rounded-xl border border-gray-300 dark:border-white/20 px-7 py-3 font-semibold hover:border-[#D4AF37]"
              >
                Explore
              </Link>

            </div>

          </div>

          {/* RIGHT */}

          <div className="relative flex justify-center">

            <div className="absolute h-80 w-80 rounded-full bg-[#D4AF37]/20 blur-3xl" />

            <motion.div
              initial={{ y: 20 }}
              animate={{ y: [0, -12, 0] }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="relative"
            >
              <Image
                src={slide.image}
                alt={slide.title}
                width={500}
                height={500}
                className="object-contain"
              />
            </motion.div>

          </div>

        </div>
      </motion.div>

      {/* CONTROLS */}

      <button
        onClick={prev}
        className="absolute left-5 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white dark:bg-black shadow-lg flex items-center justify-center"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={next}
        className="absolute right-5 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white dark:bg-black shadow-lg flex items-center justify-center"
      >
        <ChevronRight />
      </button>

      {/* DOTS */}

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 rounded-full transition-all ${
              current === index
                ? "w-10 bg-[#D4AF37]"
                : "w-3 bg-white/60"
            }`}
          />
        ))}
      </div>

    </section>
  );
}
