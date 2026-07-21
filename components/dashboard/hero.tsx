"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const banners = [
  "/banner/hero-banner.png",
  "/banner/hero-banner2.png",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full">
      <div className="relative h-[220px] sm:h-[300px] md:h-[380px] lg:h-[460px] xl:h-[520px] rounded-[30px] overflow-hidden shadow-xl">

        {banners.map((banner, index) => (
          <Image
            key={banner}
            src={banner}
            alt={`Banner ${index + 1}`}
            fill
            priority={index === 0}
            className={`object-cover transition-opacity duration-700 ${
              current === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2 rounded-full transition-all ${
                current === index
                  ? "w-8 bg-white"
                  : "w-2 bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
