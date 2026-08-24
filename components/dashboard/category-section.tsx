"use client";

import Link from "next/link";
import {
  Headphones,
  Shirt,
  Sofa,
  Sparkles,
  Smartphone,
  WashingMachine,
  Footprints,
  Watch,
  ShoppingBag,
  Baby,
  Grid2X2,
} from "lucide-react";

const categories = [
  {
    name: "Electronics",
    icon: Headphones,
    href: "/dashboard/category/electronics",
  },
  {
    name: "Fashion",
    icon: Shirt,
    href: "/dashboard/category/fashion",
  },
  {
    name: "Home & Living",
    icon: Sofa,
    href: "/dashboard/category/home-living",
  },
  {
    name: "Beauty",
    icon: Sparkles,
    href: "/dashboard/category/beauty",
  },
  {
    name: "Mobiles",
    icon: Smartphone,
    href: "/dashboard/category/mobiles",
  },
  {
    name: "Appliances",
    icon: WashingMachine,
    href: "/dashboard/category/appliances",
  },
  {
    name: "Footwear",
    icon: Footprints,
    href: "/dashboard/category/footwear",
  },
  {
    name: "Watches",
    icon: Watch,
    href: "/dashboard/category/watches",
  },
  {
    name: "Bags",
    icon: ShoppingBag,
    href: "/dashboard/category/bags",
  },
  {
    name: "Toys & Baby",
    icon: Baby,
    href: "/dashboard/category/toys-baby",
  },
  {
    name: "View All",
    icon: Grid2X2,
    href: "/dashboard/categories",
  },
];

export default function CategorySection() {
  return (
    <section className="w-full py-6">
      <div
        className="
          grid
          grid-cols-2
          gap-4
          sm:grid-cols-4
          md:grid-cols-6
          lg:grid-cols-11
        "
      >
        {categories.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className="group block"
            >
              <div
                className="
                  flex
                  h-28
                  flex-col
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#D4AF37]
                  hover:shadow-lg
                "
              >
                <Icon
                  size={34}
                  strokeWidth={1.5}
                  className="
                    text-[#C99718]
                    transition-transform
                    duration-300
                    group-hover:scale-110
                  "
                />

                <span
                  className="
                    mt-3
                    px-1
                    text-center
                    text-sm
                    font-medium
                    text-gray-800
                  "
                >
                  {item.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
