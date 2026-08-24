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
      <div
        className="
          grid
          grid-cols-2
          gap-4
          sm:grid-cols-4
          md:grid-cols-6
          lg:grid-cols-10
        "
      >
        {categories.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.slug}
              href={`/dashboard/category/${item.slug}`}
              className="block"
            >
              <div
                className="
                  flex
                  h-28
                  cursor-pointer
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
                  className="text-[#C99718] stroke-[1.5]"
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

        {/* VIEW ALL */}

        <Link
          href="/dashboard/categories"
          className="block"
        >
          <div
            className="
              flex
              h-28
              cursor-pointer
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
            <Grid2X2
              size={34}
              className="text-[#C99718] stroke-[1.5]"
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
              View All
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
