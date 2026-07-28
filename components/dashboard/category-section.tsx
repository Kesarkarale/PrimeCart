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
    href: "/category/electronics",
  },
  {
    name: "Fashion",
    icon: Shirt,
    href: "/category/fashion",
  },
  {
    name: "Home & Living",
    icon: Sofa,
    href: "/category/home-living",
  },
  {
    name: "Beauty",
    icon: Sparkles,
    href: "/category/beauty",
  },
  {
    name: "Mobiles",
    icon: Smartphone,
    href: "/category/mobiles",
  },
  {
    name: "Appliances",
    icon: WashingMachine,
    href: "/category/appliances",
  },
  {
    name: "Footwear",
    icon: Footprints,
    href: "/category/footwear",
  },
  {
    name: "Watches",
    icon: Watch,
    href: "/category/watches",
  },
  {
    name: "Bags",
    icon: ShoppingBag,
    href: "/category/bags",
  },
  {
    name: "Toys & Baby",
    icon: Baby,
    href: "/category/toys-baby",
  },
  {
    name: "View All",
    icon: Grid2X2,
    href: "/dashboard/categories",
  },
];

export default function CategorySection() {
  return (
    <section className="py-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-4">
        {categories.map((item, i) => {
          const Icon = item.icon;

          return (
            <Link key={i} href={item.href}>
              <div
                className="
                  bg-white
                  rounded-2xl
                  border
                  border-gray-200
                  h-28
                  flex
                  flex-col
                  items-center
                  justify-center
                  shadow-sm
                  hover:shadow-lg
                  hover:border-[#D4AF37]
                  hover:-translate-y-1
                  transition-all
                  duration-300
                  cursor-pointer
                "
              >
                <Icon
                  size={34}
                  className="text-[#C99718] stroke-[1.5]"
                />

                <span className="mt-3 text-sm font-medium text-gray-800 text-center px-1">
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
