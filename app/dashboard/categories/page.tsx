 "use client";

import Image from "next/image";
import Link from "next/link";

import {
  Search,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  BadgePercent,
  Award,
} from "lucide-react";

import { motion } from "framer-motion";

const categories = [
  {
    name: "Electronics",
    slug: "electronics",
    image: "/category/electronics.png",
    products: "2500+ Products",
    description: "Smartphones, laptops & gadgets",
  },

  {
    name: "Fashion",
    slug: "fashion",
    image: "/category/fashion.png",
    products: "5000+ Products",
    description: "Trending fashion collections",
  },

  {
    name: "Watches",
    slug: "watches",
    image: "/category/watches.png",
    products: "1200+ Products",
    description: "Luxury & smart watches",
  },

  {
    name: "Beauty",
    slug: "beauty",
    image: "/category/beauty.png",
    products: "1800+ Products",
    description: "Beauty & skincare products",
  },

  {
    name: "Home & Living",
    slug: "home-living",
    image: "/category/home-living.png",
    products: "2200+ Products",
    description: "Furniture & home essentials",
  },

  {
    name: "Gaming",
    slug: "gaming",
    image: "/category/gaming.png",
    products: "950+ Products",
    description: "Gaming consoles & accessories",
  },

  {
    name: "Sports",
    slug: "sports",
    image: "/category/sports.png",
    products: "1300+ Products",
    description: "Sports & fitness equipment",
  },

  {
    name: "Toys",
    slug: "toys",
    image: "/category/toys.png",
    products: "800+ Products",
    description: "Kids toys & collections",
  },

  {
    name: "Kitchen",
    slug: "kitchen",
    image: "/category/kitchen.png",
    products: "1100+ Products",
    description: "Modern kitchen essentials",
  },

  {
    name: "Bags",
    slug: "bags",
    image: "/category/bags.png",
    products: "1400+ Products",
    description: "Luxury bags & accessories",
  },

  {
    name: "Furniture",
    slug: "furniture",
    image: "/category/furniture.png",
    products: "900+ Products",
    description: "Premium furniture collection",
  },

  {
    name: "Mobiles",
    slug: "mobiles",
    image: "/category/mobiles.png",
    products: "3000+ Products",
    description: "Latest smartphones collection",
  },
];

export default function CategoriesPage() {
  return (
    <main
      className="
      min-h-screen
      bg-gradient-to-b
      from-white
      via-[#fffdf8]
      to-[#f8f4ea]
      dark:from-[#050505]
      dark:via-[#050505]
      dark:to-black
      text-black
      dark:text-white
      "
    >
      <div className="max-w-7xl mx-auto px-5 py-10">

        {/* HERO SECTION */}

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="
          relative
          overflow-hidden
          rounded-[40px]
          bg-black
          text-white
          p-8
          md:p-14
          mb-10
          "
        >
          <div
            className="
            absolute
            top-0
            right-0
            h-80
            w-80
            bg-[#D4AF37]
            opacity-20
            blur-3xl
            rounded-full
            "
          />

          <div className="relative z-10 max-w-3xl">

            <div
              className="
              inline-flex
              items-center
              gap-2
              bg-[#D4AF37]/20
              text-[#D4AF37]
              px-5
              py-2
              rounded-full
              font-semibold
              "
            >
              <Sparkles size={18} />
              PrimeCart Premium Categories
            </div>

            <h1
              className="
              mt-6
              text-4xl
              md:text-6xl
              font-black
              "
            >
              Explore Premium Categories
            </h1>

            <p
              className="
              mt-5
              text-gray-300
              text-lg
              "
            >
              Discover thousands of products across fashion,
              electronics, beauty, gaming, furniture and more.
            </p>

          </div>
        </motion.section>

        {/* SEARCH BAR */}

        <div
          className="
          bg-white
          dark:bg-white/5
          border
          border-gray-200
          dark:border-white/10
          rounded-3xl
          p-4
          mb-10
          flex
          items-center
          gap-3
          shadow-sm
          "
        >
          <Search className="text-[#D4AF37]" />

          <input
            type="text"
            placeholder="Search categories..."
            className="
            w-full
            bg-transparent
            outline-none
            text-lg
            "
          />
        </div>
        {/* MAIN LAYOUT */}

<div
  className="
  grid
  lg:grid-cols-[280px_1fr]
  gap-8
  "
>

  {/* SIDEBAR */}

  <div
    className="
    bg-white
    dark:bg-white/5
    border
    border-gray-200
    dark:border-white/10
    rounded-[30px]
    p-6
    h-fit
    sticky
    top-24
    "
  >

    <h2
      className="
      text-2xl
      font-black
      mb-6
      "
    >
      Categories
    </h2>

    <div className="space-y-2">

      {categories.map((item) => (

        <Link
          key={item.slug}
          href={`/dashboard/categories/${item.slug}`}
          className="
          flex
          items-center
          justify-between
          px-4
          py-4
          rounded-2xl
          hover:bg-[#D4AF37]/10
          hover:text-[#B8860B]
          transition-all
          duration-300
          font-medium
          "
        >
          {item.name}

          <ArrowRight
            size={16}
            className="
            opacity-60
            "
          />
        </Link>

      ))}

    </div>

  </div>



  {/* RIGHT CONTENT */}

  <div>

    <div
      className="
      grid
      sm:grid-cols-2
      xl:grid-cols-3
      gap-7
      "
    >

      {categories.map((category, index) => (

        <motion.div
          key={category.slug}
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: index * 0.05,
          }}
          whileHover={{
            y: -10,
          }}
        >

          <Link
            href={`/dashboard/categories/${category.slug}`}
            className="
            group
            block
            bg-white
            dark:bg-white/5
            border
            border-gray-200
            dark:border-white/10
            rounded-[32px]
            overflow-hidden
            hover:border-[#D4AF37]
            hover:shadow-2xl
            transition-all
            duration-500
            "
          >

            {/* IMAGE */}

            <div
              className="
              relative
              h-[220px]
              bg-gradient-to-b
              from-[#fffdf7]
              to-[#f7f2e7]
              flex
              items-center
              justify-center
              overflow-hidden
              "
            >

              <Image
                src={category.image}
                alt={category.name}
                fill
                className="
                object-contain
                p-6
                group-hover:scale-110
                transition-all
                duration-700
                "
              />

            </div>

            {/* CONTENT */}

            <div className="p-6">

              <div
                className="
                inline-flex
                px-4
                py-2
                rounded-full
                bg-[#D4AF37]/10
                text-[#B8860B]
                text-xs
                font-bold
                "
              >
                {category.products}
              </div>

              <h3
                className="
                mt-4
                text-2xl
                font-black
                "
              >
                {category.name}
              </h3>

              <p
                className="
                mt-3
                text-gray-600
                dark:text-gray-400
                "
              >
                {category.description}
              </p>

              <div
                className="
                mt-6
                flex
                items-center
                gap-2
                text-[#D4AF37]
                font-bold
                "
              >
                View Collection

                <ArrowRight
                  size={18}
                  className="
                  group-hover:translate-x-2
                  transition
                  "
                />
              </div>

            </div>

          </Link>

        </motion.div>

      ))}

    </div>

        {/* FEATURED BANNER */}

    <div
      className="
      mt-12
      relative
      overflow-hidden
      rounded-[35px]
      bg-gradient-to-r
      from-[#D4AF37]
      via-[#E5C158]
      to-[#B8860B]
      p-8
      md:p-12
      text-black
      "
    >
      <div className="max-w-2xl">

        <span
          className="
          inline-flex
          px-4
          py-2
          rounded-full
          bg-black/10
          font-semibold
          "
        >
          PrimeCart Premium
        </span>

        <h2
          className="
          mt-5
          text-3xl
          md:text-5xl
          font-black
          "
        >
          Discover Luxury Collections
        </h2>

        <p
          className="
          mt-4
          text-black/80
          text-lg
          "
        >
          Shop premium electronics, fashion,
          furniture and lifestyle products with
          exclusive offers and fast delivery.
        </p>

        <button
          className="
          mt-6
          px-7
          py-4
          bg-black
          text-white
          rounded-2xl
          font-bold
          hover:scale-105
          transition
          "
        >
          Explore Now
        </button>

      </div>
    </div>



    {/* STATS SECTION */}

    <div
      className="
      mt-12
      grid
      md:grid-cols-2
      xl:grid-cols-4
      gap-6
      "
    >

      {[
        {
          icon: Award,
          title: "Top Brands",
          desc: "1000+ trusted brands",
        },

        {
          icon: BadgePercent,
          title: "Best Deals",
          desc: "Exclusive discounts",
        },

        {
          icon: Truck,
          title: "Fast Delivery",
          desc: "Quick nationwide shipping",
        },

        {
          icon: ShieldCheck,
          title: "Secure Shopping",
          desc: "100% protected payments",
        },
      ].map((item) => {

        const Icon = item.icon;

        return (

          <div
            key={item.title}
            className="
            bg-white
            dark:bg-white/5
            border
            border-gray-200
            dark:border-white/10
            rounded-[28px]
            p-6
            "
          >

            <div
              className="
              w-14
              h-14
              rounded-2xl
              bg-[#D4AF37]/10
              text-[#B8860B]
              flex
              items-center
              justify-center
              "
            >
              <Icon size={28} />
            </div>

            <h3
              className="
              mt-5
              text-xl
              font-black
              "
            >
              {item.title}
            </h3>

            <p
              className="
              mt-2
              text-gray-600
              dark:text-gray-400
              "
            >
              {item.desc}
            </p>

          </div>

        );
      })}

    </div>



    {/* POPULAR SEARCHES */}

    <div className="mt-12">

      <h2
        className="
        text-3xl
        font-black
        mb-6
        "
      >
        Popular Searches
      </h2>

      <div
        className="
        flex
        flex-wrap
        gap-3
        "
      >

        {[
          "iPhone 16",
          "Samsung Galaxy",
          "Nike Shoes",
          "Luxury Watch",
          "Gaming Laptop",
          "Handbags",
          "Perfume",
          "Makeup Kit",
          "Furniture",
          "Wireless Headphones",
        ].map((item) => (

          <button
            key={item}
            className="
            px-5
            py-3
            rounded-full
            bg-white
            dark:bg-white/5
            border
            border-gray-200
            dark:border-white/10
            hover:border-[#D4AF37]
            hover:text-[#B8860B]
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
