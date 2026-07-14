"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import {
  Smartphone,
  Laptop,
  Shirt,
  Watch,
  Home,
  Gamepad2,
  ArrowRight,
} from "lucide-react";

const categories = [
  {
    name: "Electronics",
    icon: Smartphone,
    color: "from-blue-500/20 to-cyan-500/20",
    href: "/dashboard/products?category=electronics",
  },
  {
    name: "Laptops",
    icon: Laptop,
    color: "from-violet-500/20 to-purple-500/20",
    href: "/dashboard/products?category=laptops",
  },
  {
    name: "Fashion",
    icon: Shirt,
    color: "from-pink-500/20 to-rose-500/20",
    href: "/dashboard/products?category=fashion",
  },
  {
    name: "Watches",
    icon: Watch,
    color: "from-yellow-500/20 to-orange-500/20",
    href: "/dashboard/products?category=watches",
  },
  {
    name: "Home",
    icon: Home,
    color: "from-green-500/20 to-emerald-500/20",
    href: "/dashboard/products?category=home",
  },
  {
    name: "Gaming",
    icon: Gamepad2,
    color: "from-red-500/20 to-pink-500/20",
    href: "/dashboard/products?category=gaming",
  },
];

export default function CategorySection() {
  return (
    <section className="mt-10">

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-3xl font-bold text-white">
            Shop By Category
          </h2>

          <p className="text-gray-400 mt-1">
            Explore premium collections
          </p>

        </div>

        <Link
          href="/dashboard/categories"
          className="hidden md:flex items-center gap-2 text-[#D4AF37] hover:gap-3 transition-all"
        >
          View All
          <ArrowRight size={18} />
        </Link>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">

        {categories.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
              }}
              viewport={{ once: true }}
            >
              <Link href={item.href}>

                <div
                  className={`
                    group
                    rounded-3xl
                    border
                    border-white/10
                    bg-gradient-to-br
                    ${item.color}
                    backdrop-blur-xl
                    p-6
                    hover:border-[#D4AF37]
                    hover:-translate-y-2
                    transition-all
                    duration-300
                    cursor-pointer
                  `}
                >

                  <div className="flex justify-center">

                    <div className="h-16 w-16 rounded-2xl bg-[#D4AF37] text-black flex items-center justify-center shadow-xl group-hover:scale-110 transition">

                      <Icon size={30} />

                    </div>

                  </div>

                  <h3 className="mt-6 text-center text-lg font-bold text-white">
                    {item.name}
                  </h3>

                  <p className="mt-2 text-center text-sm text-gray-400">
                    Premium Collection
                  </p>

                </div>

              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
