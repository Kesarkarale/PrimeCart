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
  ArrowRight,
} from "lucide-react";

const categories = [
  {
    name: "Electronics",
    slug: "electronics",
    description: "Headphones, TVs, Cameras, Laptops & more",
    icon: Headphones,
  },
  {
    name: "Fashion",
    slug: "fashion",
    description: "Clothing, Dresses, Shirts & Accessories",
    icon: Shirt,
  },
  {
    name: "Home & Living",
    slug: "home-living",
    description: "Furniture, Decor, Bedding & more",
    icon: Sofa,
  },
  {
    name: "Beauty",
    slug: "beauty",
    description: "Makeup, Skincare, Haircare & more",
    icon: Sparkles,
  },
  {
    name: "Mobiles",
    slug: "mobiles",
    description: "Smartphones, Tablets & Accessories",
    icon: Smartphone,
  },
  {
    name: "Appliances",
    slug: "appliances",
    description: "Kitchen & Home Appliances",
    icon: WashingMachine,
  },
  {
    name: "Footwear",
    slug: "footwear",
    description: "Shoes, Sneakers, Sandals & more",
    icon: Footprints,
  },
  {
    name: "Watches",
    slug: "watches",
    description: "Smart Watches & Classic Watches",
    icon: Watch,
  },
  {
    name: "Bags",
    slug: "bags",
    description: "Backpacks, Handbags, Travel Bags",
    icon: ShoppingBag,
  },
  {
    name: "Toys & Baby",
    slug: "toys-baby",
    description: "Toys, Baby Products & Games",
    icon: Baby,
  },
];

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-[#faf8f3] px-4 py-8 lg:px-8">
      <div className="mx-auto max-w-[1400px]">

        {/* HEADER */}

        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#C99718]">
            PrimeCart
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            All Categories
          </h1>

          <p className="mt-2 max-w-2xl text-gray-500">
            Browse our complete collection and discover
            products from your favourite categories.
          </p>
        </div>

        {/* CATEGORY GRID */}

        <div
          className="
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
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
                    relative
                    overflow-hidden
                    rounded-3xl
                    border
                    border-gray-200
                    bg-white
                    p-6
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-[#D4AF37]
                    hover:shadow-xl
                  "
                >
                  {/* ICON */}

                  <div
                    className="
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-2xl
                      bg-[#faf4df]
                      transition-all
                      duration-300
                      group-hover:bg-[#D4AF37]
                    "
                  >
                    <Icon
                      size={32}
                      strokeWidth={1.5}
                      className="
                        text-[#C99718]
                        transition-colors
                        group-hover:text-white
                      "
                    />
                  </div>

                  {/* TEXT */}

                  <h2
                    className="
                      mt-6
                      text-xl
                      font-bold
                      text-gray-900
                    "
                  >
                    {category.name}
                  </h2>

                  <p
                    className="
                      mt-2
                      min-h-[42px]
                      text-sm
                      leading-5
                      text-gray-500
                    "
                  >
                    {category.description}
                  </p>

                  {/* ARROW */}

                  <div
                    className="
                      mt-6
                      flex
                      items-center
                      gap-2
                      text-sm
                      font-semibold
                      text-[#C99718]
                    "
                  >
                    Shop Now

                    <ArrowRight
                      size={16}
                      className="
                        transition-transform
                        group-hover:translate-x-1
                      "
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
