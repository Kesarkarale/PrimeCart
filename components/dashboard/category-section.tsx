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
    slug: "electronics",
    icon: Headphones,
  },
  {
    name: "Fashion",
    slug: "fashion",
    icon: Shirt,
  },
  {
    name: "Home & Living",
    slug: "home-living",
    icon: Sofa,
  },
  {
    name: "Beauty",
    slug: "beauty",
    icon: Sparkles,
  },
  {
    name: "Mobiles",
    slug: "mobiles",
    icon: Smartphone,
  },
  {
    name: "Appliances",
    slug: "appliances",
    icon: WashingMachine,
  },
  {
    name: "Footwear",
    slug: "footwear",
    icon: Footprints,
  },
  {
    name: "Watches",
    slug: "watches",
    icon: Watch,
  },
  {
    name: "Bags",
    slug: "bags",
    icon: ShoppingBag,
  },
  {
    name: "Toys & Baby",
    slug: "toys-baby",
    icon: Baby,
  },
];

export default function CategorySection() {
  return (
    <section className="py-6">
      {/* HEADER */}

      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Shop by Category
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Explore products from your favourite categories
          </p>
        </div>

        <Link
          href="/dashboard/categories"
          className="
            hidden
            text-sm
            font-semibold
            text-[#C99718]
            hover:underline
            sm:block
          "
        >
          View All →
        </Link>
      </div>

      {/* CATEGORY GRID */}

      <div
        className="
          grid
          grid-cols-2
          gap-4
          sm:grid-cols-4
          md:grid-cols-5
          lg:grid-cols-10
        "
      >
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <Link
              key={category.slug}
              href={`/dashboard/category/${category.slug}`}
              className="group"
            >
              <div
                className="
                  flex
                  h-[125px]
                  flex-col
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#D4AF37]
                  hover:shadow-lg
                "
              >
                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    bg-[#faf4df]
                    transition-all
                    duration-300
                    group-hover:bg-[#D4AF37]
                  "
                >
                  <Icon
                    size={25}
                    strokeWidth={1.7}
                    className="
                      text-[#C99718]
                      transition-colors
                      group-hover:text-white
                    "
                  />
                </div>

                <span
                  className="
                    mt-3
                    px-2
                    text-center
                    text-sm
                    font-semibold
                    text-gray-800
                  "
                >
                  {category.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* MOBILE VIEW ALL */}

      <div className="mt-5 text-center sm:hidden">
        <Link
          href="/dashboard/categories"
          className="
            text-sm
            font-semibold
            text-[#C99718]
          "
        >
          View All Categories →
        </Link>
      </div>
    </section>
  );
}
