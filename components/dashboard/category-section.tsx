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
  Headphones,
  Camera,
  Tv,
  Sofa,
  ShoppingBag,
  Gift,
} from "lucide-react";

const categories = [
  { name: "Mobiles", icon: Smartphone, href: "/dashboard/products?category=mobiles" },
  { name: "Laptops", icon: Laptop, href: "/dashboard/products?category=laptops" },
  { name: "Fashion", icon: Shirt, href: "/dashboard/products?category=fashion" },
  { name: "Watches", icon: Watch, href: "/dashboard/products?category=watches" },
  { name: "Home", icon: Home, href: "/dashboard/products?category=home" },
  { name: "Gaming", icon: Gamepad2, href: "/dashboard/products?category=gaming" },
  { name: "Audio", icon: Headphones, href: "/dashboard/products?category=audio" },
  { name: "Camera", icon: Camera, href: "/dashboard/products?category=camera" },
  { name: "TV", icon: Tv, href: "/dashboard/products?category=tv" },
  { name: "Furniture", icon: Sofa, href: "/dashboard/products?category=furniture" },
  { name: "Bags", icon: ShoppingBag, href: "/dashboard/products?category=bags" },
  { name: "Gifts", icon: Gift, href: "/dashboard/products?category=gifts" },
];

export default function CategorySection() {
  return (
    <section className="mt-10">

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Shop by Category
          </h2>

          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Browse our premium collections
          </p>
        </div>

        <Link
          href="/dashboard/categories"
          className="font-semibold text-[#D4AF37] hover:underline"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-12 gap-5">

        {categories.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: index * 0.05,
              }}
              viewport={{ once: true }}
            >
              <Link href={item.href}>

                <div className="group flex flex-col items-center">

                  <div
                    className="
                    h-20
                    w-20
                    rounded-full
                    bg-white
                    dark:bg-[#111827]
                    border
                    border-gray-200
                    dark:border-white/10
                    shadow-md
                    flex
                    items-center
                    justify-center
                    transition
                    duration-300
                    group-hover:bg-[#D4AF37]
                    group-hover:scale-110
                    group-hover:shadow-xl
                  "
                  >
                    <Icon
                      size={34}
                      className="text-gray-700 dark:text-white group-hover:text-black"
                    />
                  </div>

                  <span className="mt-3 text-sm font-semibold text-center text-gray-800 dark:text-white">
                    {item.name}
                  </span>

                </div>

              </Link>
            </motion.div>
          );
        })}

      </div>
    </section>
  );
}
