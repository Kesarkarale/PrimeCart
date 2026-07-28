 "use client";

import Image from "next/image";
import Link from "next/link";

import {
  ChevronRight,
  Headphones,
  Shirt,
  Sofa,
  Sparkles,
  Smartphone,
  Refrigerator,
  Footprints,
  Watch,
  ShoppingBag,
  Baby,
  Dumbbell,
  Car,
} from "lucide-react";

const categories = [
  {
    name: "Electronics",
    image: "/products/electronics.png",
    items: "2500+ Items",
    icon: Headphones,
  },

  {
    name: "Fashion",
    image: "/products/fashion.png",
    items: "3800+ Items",
    icon: Shirt,
  },

  {
    name: "Home & Living",
    image: "/products/home.png",
    items: "4200+ Items",
    icon: Sofa,
  },

  {
    name: "Beauty",
    image: "/products/perfume.png",
    items: "2100+ Items",
    icon: Sparkles,
  },

  {
    name: "Mobiles",
    image: "/products/mobiles.png",
    items: "1500+ Items",
    icon: Smartphone,
  },

  {
    name: "Appliances",
    image: "/products/appliances.png",
    items: "1800+ Items",
    icon: Refrigerator,
  },

  {
    name: "Footwear",
    image: "/products/footwear.png",
    items: "2200+ Items",
    icon: Footprints,
  },

  {
    name: "Watches",
    image: "/products/watch.png",
    items: "1300+ Items",
    icon: Watch,
  },

  {
    name: "Bags",
    image: "/products/bag.png",
    items: "1100+ Items",
    icon: ShoppingBag,
  },

  {
    name: "Toys & Baby",
    image: "/products/toys.png",
    items: "1600+ Items",
    icon: Baby,
  },

  {
    name: "Sports & Outdoors",
    image: "/products/sports.png",
    items: "1000+ Items",
    icon: Dumbbell,
  },

  {
    name: "Automotive",
    image: "/products/automotive.png",
    items: "900+ Items",
    icon: Car,
  },
];

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-[#fafafa]">

      <div className="max-w-[1500px] mx-auto px-6 py-8">

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">

          {/* SIDEBAR */}

          <div className="space-y-5">

            <div className="bg-white border border-gray-200 rounded-3xl p-5">

              <h2 className="text-2xl font-bold mb-5">
                All Categories
              </h2>

              <div className="space-y-1">

                {categories.map((cat, i) => {

                  const Icon = cat.icon;

                  return (
                    <button
                      key={cat.name}
                      className={"
                      w-full
                      flex
                      items-center
                      justify-between
                      px-4
                      py-3
                      rounded-2xl
                      transition
                      ${
                        i === 0
                          ? "bg-[#f7f1e4] text-[#c99718]"
                          : "hover:bg-[#faf6ee]"
                      }
                      "}
                    >

                      <div className="flex items-center gap-3">
                        <Icon size={18} />
                        <span>{cat.name}</span>
                      </div>

                      <ChevronRight size={16} />

                    </button>
                  );
                })}

              </div>

              <button
                className="
                w-full
                mt-5
                border
                border-gray-200
                rounded-2xl
                py-3
                font-medium
                "
              >
                View All Categories
              </button>

            </div>
                       {/* OFFER CARD */}

            <div
              className="
              bg-gradient-to-br
              from-[#fff6df]
              to-[#f5e3b0]
              rounded-3xl
              p-6
              border
              border-[#f0d78a]
              "
            >
              <p className="text-gray-600 text-sm">
                Limited Time Offer
              </p>

              <h3 className="text-4xl font-bold mt-2">
                10% OFF
              </h3>

              <p className="mt-2 text-gray-700">
                On your first order
              </p>

              <button
                className="
                mt-5
                bg-[#D4AF37]
                text-white
                px-5
                py-3
                rounded-xl
                font-semibold
                "
              >
                Use Code PRIME10
              </button>
            </div>

          </div>

          {/* RIGHT SIDE */}

          <div>

            <h1 className="text-4xl md:text-5xl font-bold">
              Shop by Category
            </h1>

            <p className="text-gray-500 mt-3 mb-8">
              Explore our wide range of premium products across all categories
            </p>

            {/* CATEGORY GRID */}

            <div
              className="
              grid
              grid-cols-2
              md:grid-cols-3
              xl:grid-cols-4
              2xl:grid-cols-6
              gap-6
              "
            >

              {categories.map((category) => (

                <Link
                  href="#"
                  key={category.name}
                  className="
                  bg-white
                  border
                  border-gray-200
                  rounded-3xl
                  p-5
                  text-center
                  hover:shadow-lg
                  transition-all
                  duration-300
                  "
                >

                  <div
                    className="
                    w-[140px]
                    h-[140px]
                    mx-auto
                    rounded-full
                    bg-[#f8f3e7]
                    flex
                    items-center
                    justify-center
                    "
                  >

                    <Image
                      src={category.image}
                      alt={category.name}
                      width={110}
                      height={110}
                      className="
                      object-contain
                      hover:scale-105
                      transition
                      "
                    />

                  </div>

                  <h3
                    className="
                    mt-5
                    text-lg
                    font-bold
                    "
                  >
                    {category.name}
                  </h3>

                  <p
                    className="
                    text-gray-500
                    text-sm
                    mt-1
                    "
                  >
                    {category.items}
                  </p>

                </Link>

              ))}

            </div>
                       {/* FEATURES ROW */}

            <div
              className="
              mt-8
              bg-white
              border
              border-gray-200
              rounded-3xl
              p-6
              grid
              grid-cols-2
              md:grid-cols-4
              gap-6
              "
            >

              <div className="text-center">
                <div className="text-3xl mb-2">🏆</div>
                <h3 className="font-bold">Top Brands</h3>
                <p className="text-sm text-gray-500">
                  1000+ Trusted Brands
                </p>
              </div>

              <div className="text-center">
                <div className="text-3xl mb-2">💰</div>
                <h3 className="font-bold">Best Prices</h3>
                <p className="text-sm text-gray-500">
                  Daily Best Deals
                </p>
              </div>

              <div className="text-center">
                <div className="text-3xl mb-2">↩️</div>
                <h3 className="font-bold">Easy Returns</h3>
                <p className="text-sm text-gray-500">
                  Hassle Free Returns
                </p>
              </div>

              <div className="text-center">
                <div className="text-3xl mb-2">🔒</div>
                <h3 className="font-bold">Secure Shopping</h3>
                <p className="text-sm text-gray-500">
                  Safe Payments
                </p>
              </div>

            </div>

            {/* POPULAR SEARCHES */}

            <div className="mt-10">

              <h2 className="text-2xl font-bold mb-5">
                Popular Searches
              </h2>

              <div className="flex flex-wrap gap-3">

                {[
                  "iPhone 16",
                  "Samsung Galaxy",
                  "Nike Shoes",
                  "Luxury Watch",
                  "Gaming Laptop",
                  "Handbags",
                  "Perfume",
                  "Makeup Kit",
                  "Sofa Set",
                  "Bluetooth Speaker",
                  "Refrigerator",
                  "Smart TV",
                ].map((item) => (
                  <button
                    key={item}
                    className="
                    px-5
                    py-3
                    bg-white
                    border
                    border-gray-200
                    rounded-full
                    hover:border-[#D4AF37]
                    hover:text-[#C99718]
                    transition
                    "
                  >
                    {item}
                  </button>
                ))}

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}
