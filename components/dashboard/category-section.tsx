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
    href: "/dashboard/categories/electronics",
  },
  {
    name: "Fashion",
    icon: Shirt,
    href: "/dashboard/categories/fashion",
  },
  {
    name: "Home & Living",
    icon: Sofa,
    href: "/dashboard/categories/home-living",
  },
  {
    name: "Beauty",
    icon: Sparkles,
    href: "/dashboard/categories/beauty",
  },
  {
    name: "Mobiles",
    icon: Smartphone,
    href: "/dashboard/categories/mobiles",
  },
  {
    name: "Appliances",
    icon: WashingMachine,
    href: "/dashboard/categories/appliances",
  },
  {
    name: "Footwear",
    icon: Footprints,
    href: "/dashboard/categories/footwear",
  },
  {
    name: "Watches",
    icon: Watch,
    href: "/dashboard/categories/watches",
  },
  {
    name: "Bags",
    icon: ShoppingBag,
    href: "/dashboard/categories/bags",
  },
  {
    name: "Toys & Baby",
    icon: Baby,
    href: "/dashboard/categories/toys-baby",
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
