"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="w-full">
      <div className="grid lg:grid-cols-2 gap-8 items-center bg-gradient-to-r from-[#fff8e6] via-white to-[#fff2cc] rounded-[32px] p-10 shadow-xl border border-[#D4AF37]/20">

        {/* Left */}
        <div>
          <span className="bg-[#D4AF37] text-white px-4 py-2 rounded-full text-sm font-semibold">
            New Collection
          </span>

          <h1 className="mt-6 text-5xl font-black text-gray-900 leading-tight">
            Discover Premium
            <br />
            Shopping Experience
          </h1>

          <p className="mt-5 text-gray-600 text-lg max-w-lg">
            Explore thousands of premium products with amazing offers,
            fast delivery and trusted quality.
          </p>

          <div className="flex gap-5 mt-8">
            <button className="bg-[#D4AF37] text-black font-bold px-8 py-4 rounded-2xl hover:scale-105 duration-300">
              Shop Now
            </button>

            <button className="border border-[#D4AF37] px-8 py-4 rounded-2xl font-semibold hover:bg-[#D4AF37] hover:text-white duration-300">
              Explore
            </button>
          </div>

          <div className="flex gap-10 mt-12">
            <div>
              <h2 className="text-3xl font-bold">20K+</h2>
              <p className="text-gray-500">Products</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">15K+</h2>
              <p className="text-gray-500">Customers</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">99%</h2>
              <p className="text-gray-500">Happy Users</p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="relative h-[500px]">
          <Image
            src="/banner/hero-banner.png"
            alt="Hero"
            fill
            priority
            className="object-contain"
          />

          <div className="absolute top-6 right-6 bg-red-500 text-white px-5 py-3 rounded-2xl font-bold shadow-xl">
            60% OFF
          </div>

          <div className="absolute bottom-8 left-6 bg-white rounded-2xl p-5 shadow-xl">
            <p className="font-bold">Premium Quality</p>
            <p className="text-sm text-gray-500">
              Trusted by thousands
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
