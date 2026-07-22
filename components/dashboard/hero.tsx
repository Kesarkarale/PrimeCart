"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const banners = [
  {
    image: "/banner/hero-banner.png",
    link: "/categories/fashion",
  },
  {
    image: "/banner/hero-banner2.png",
    link: "/categories/electronics",
  },
  {
    image: "/banner/hero-banner3.png",
    link: "/categories/home-living",
  },
  {
    image: "/banner/hero-banner4.png",
    link: "/categories/beauty",
  },
  {
    image: "/banner/hero-banner5.png",
    link: "/categories/fashion",
  },
  {
    image: "/banner/hero-banner6.png",
    link: "/categories/electronics",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full">
      <div className="relative h-[180px] sm:h-[240px] md:h-[300px] lg:h-[360px] xl:h-[400px] rounded-[30px] overflow-hidden shadow-xl">
        
        {banners.map((banner, index) => (
          <Image
            key={banner.image}
            src={banner.image}
            alt={`Banner ${index + 1}`}
            fill
            priority={index === 0}
            onClick={() => router.push(banner.link)}
            className={`object-cover cursor-pointer transition-opacity duration-700 ${
              current === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
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
