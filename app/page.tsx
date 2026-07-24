"use client";

import Link from "next/link";
import {
  ShoppingBag,
  Menu,
  Search,
  Heart,
  ShoppingCart,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#faf8f3] overflow-hidden">

      {/* ================= NAVBAR ================= */}

      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-[#ece7db]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-yellow-600 flex items-center justify-center text-white shadow-lg">
              <ShoppingBag size={24} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-black">
                Prime<span className="text-[#D4AF37]">Cart</span>
              </h1>

              <p className="text-xs text-gray-500">
                Premium Shopping
              </p>
            </div>
          </Link>

          {/* Menu */}
          <div className="hidden lg:flex items-center gap-10 font-medium text-gray-700">
            <a href="#" className="hover:text-[#D4AF37] transition">Home</a>
            <a href="#" className="hover:text-[#D4AF37] transition">Shop</a>
            <a href="#" className="hover:text-[#D4AF37] transition">Categories</a>
            <a href="#" className="hover:text-[#D4AF37] transition">Deals</a>
            <a href="#" className="hover:text-[#D4AF37] transition">Contact</a>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">

            <button className="hidden md:flex w-11 h-11 rounded-xl bg-[#f5f2ea] items-center justify-center hover:bg-[#ece4d0] transition">
              <Search size={20} />
            </button>

            <button className="hidden md:flex w-11 h-11 rounded-xl bg-[#f5f2ea] items-center justify-center hover:bg-[#ece4d0] transition">
              <Heart size={20} />
            </button>

            <button className="hidden md:flex w-11 h-11 rounded-xl bg-[#f5f2ea] items-center justify-center hover:bg-[#ece4d0] transition">
              <ShoppingCart size={20} />
            </button>

            <Link
              href="/login"
              className="hidden md:block px-6 py-3 rounded-xl border border-gray-300 hover:border-[#D4AF37] transition"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="hidden md:block px-6 py-3 rounded-xl bg-[#D4AF37] text-white font-semibold hover:scale-105 transition"
            >
              Register
            </Link>

            <button className="lg:hidden">
              <Menu />
            </button>

          </div>
        </div>
      </nav>

      {/* ================= HERO ================= */}

      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <div>

            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#D4AF37]/30 bg-white text-[#D4AF37] font-medium">
              <Sparkles size={18} />
              Premium Shopping Experience
            </div>

            <h1 className="mt-8 text-6xl lg:text-7xl font-bold leading-tight text-black">
              Shop More.
              <br />
              <span className="text-[#D4AF37]">
                Pay Less.
              </span>
            </h1>

            <p className="mt-8 text-xl text-gray-600 max-w-xl leading-relaxed">
              Discover premium fashion, electronics,
              beauty products and luxury collections
              with unbeatable offers and lightning-fast delivery.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">

              <Link
                href="/register"
                className="px-8 py-4 rounded-2xl bg-[#D4AF37] text-white font-semibold flex items-center gap-2 hover:scale-105 transition"
              >
                Shop Now
                <ArrowRight size={18} />
              </Link>

              <button className="px-8 py-4 rounded-2xl border border-gray-300 bg-white hover:border-[#D4AF37] transition">
                Explore Deals
              </button>

            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-14">

              <div>
                <h3 className="text-3xl font-bold text-black">
                  50K+
                </h3>
                <p className="text-gray-500">
                  Customers
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-black">
                  15K+
                </h3>
                <p className="text-gray-500">
                  Products
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-black">
                  4.9★
                </h3>
                <p className="text-gray-500">
                  Rating
                </p>
              </div>

            </div>

          </div>

          {/* Right Hero Design */}

          <div className="relative h-[650px] flex items-center justify-center">

            <div className="absolute w-[550px] h-[550px] rounded-full border-2 border-[#D4AF37]/20"></div>

            <div className="absolute w-[420px] h-[420px] rounded-full bg-[#D4AF37]/10"></div>

            {/* Main Product */}
            <div className="absolute z-20 w-[280px] h-[360px] rounded-[40px] bg-white shadow-2xl border border-[#eee] flex items-center justify-center text-[120px]">
              👜
            </div>

            {/* Left Card */}
            <div className="absolute left-0 bottom-24 w-[180px] h-[220px] bg-white rounded-[30px] shadow-xl flex items-center justify-center text-7xl">
              🌸
            </div>

            {/* Right Card */}
            <div className="absolute right-0 top-24 w-[180px] h-[180px] bg-white rounded-full shadow-xl flex items-center justify-center text-7xl">
              ⌚
            </div>

            {/* Floating Badge */}
            <div className="absolute top-10 left-20 bg-white rounded-2xl shadow-lg px-5 py-3">
              <p className="text-sm text-gray-500">
                Special Offer
              </p>

              <h4 className="font-bold text-[#D4AF37]">
                Up to 70% OFF
              </h4>
            </div>

          </div>

        </div>
      </section>
      {/* ================= FEATURES BAR ================= */}

<section className="max-w-7xl mx-auto px-6 py-8">
  <div className="grid md:grid-cols-4 gap-5">

    <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#eee]">
      <div className="text-4xl mb-3">🚚</div>
      <h3 className="font-bold text-lg">Free Delivery</h3>
      <p className="text-gray-500 text-sm mt-2">
        Free shipping on all orders
      </p>
    </div>

    <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#eee]">
      <div className="text-4xl mb-3">🔒</div>
      <h3 className="font-bold text-lg">Secure Payment</h3>
      <p className="text-gray-500 text-sm mt-2">
        100% secure transactions
      </p>
    </div>

    <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#eee]">
      <div className="text-4xl mb-3">⭐</div>
      <h3 className="font-bold text-lg">Premium Quality</h3>
      <p className="text-gray-500 text-sm mt-2">
        Trusted premium products
      </p>
    </div>

    <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#eee]">
      <div className="text-4xl mb-3">💬</div>
      <h3 className="font-bold text-lg">24/7 Support</h3>
      <p className="text-gray-500 text-sm mt-2">
        Dedicated customer support
      </p>
    </div>

  </div>
</section>

{/* ================= CATEGORIES ================= */}

<section className="max-w-7xl mx-auto px-6 py-20">

  <div className="text-center mb-14">
    <span className="text-[#D4AF37] font-semibold">
      SHOP BY CATEGORY
    </span>

    <h2 className="text-5xl font-bold mt-3 text-black">
      Explore Categories
    </h2>

    <p className="text-gray-500 mt-4">
      Discover products across multiple categories
    </p>
  </div>

  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

    {[
      {
        name: "Electronics",
        icon: "📱"
      },
      {
        name: "Fashion",
        icon: "👕"
      },
      {
        name: "Watches",
        icon: "⌚"
      },
      {
        name: "Beauty",
        icon: "💄"
      },
      {
        name: "Home",
        icon: "🏠"
      },
      {
        name: "Gaming",
        icon: "🎮"
      },
    ].map((item) => (

      <div
        key={item.name}
        className="
        bg-white
        rounded-3xl
        p-8
        text-center
        border
        border-[#eee]
        shadow-sm
        hover:shadow-xl
        hover:-translate-y-2
        transition-all
        duration-300
        cursor-pointer
        "
      >
        <div className="text-5xl mb-4">
          {item.icon}
        </div>

        <h3 className="font-semibold text-lg">
          {item.name}
        </h3>
      </div>

    ))}

  </div>

</section>

{/* ================= TRENDING PRODUCTS ================= */}

<section className="max-w-7xl mx-auto px-6 py-20">

  <div className="flex items-center justify-between mb-12">

    <div>
      <span className="text-[#D4AF37] font-semibold">
        FEATURED PRODUCTS
      </span>

      <h2 className="text-5xl font-bold mt-2">
        Trending Products
      </h2>
    </div>

    <button className="hidden md:block border border-gray-300 px-6 py-3 rounded-xl hover:border-[#D4AF37]">
      View All
    </button>

  </div>

  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

    {[
      {
        name: "Luxury Handbag",
        price: "$129",
        image: "👜"
      },
      {
        name: "Premium Watch",
        price: "$249",
        image: "⌚"
      },
      {
        name: "Designer Perfume",
        price: "$99",
        image: "🌸"
      },
      {
        name: "Wireless Headphone",
        price: "$189",
        image: "🎧"
      }
    ].map((product) => (

      <div
        key={product.name}
        className="
        bg-white
        rounded-[32px]
        overflow-hidden
        border
        border-[#eee]
        shadow-sm
        hover:shadow-2xl
        transition-all
        duration-300
        "
      >

        <div className="h-64 flex items-center justify-center text-[100px] bg-[#faf8f3]">
          {product.image}
        </div>

        <div className="p-6">

          <h3 className="font-bold text-xl">
            {product.name}
          </h3>

          <div className="flex items-center justify-between mt-4">

            <span className="text-[#D4AF37] font-bold text-2xl">
              {product.price}
            </span>

            <button className="bg-[#D4AF37] text-white px-4 py-2 rounded-xl">
              Add
            </button>

          </div>

        </div>

      </div>

    ))}

  </div>

</section>
      {/* ================= MEGA SALE BANNER ================= */}

<section className="max-w-7xl mx-auto px-6 py-20">

  <div className="
  relative
  overflow-hidden
  rounded-[40px]
  bg-gradient-to-r
  from-[#D4AF37]
  via-yellow-500
  to-yellow-600
  p-12
  lg:p-20
  ">

    <div className="grid lg:grid-cols-2 gap-10 items-center">

      <div>

        <span className="
        bg-white/20
        text-white
        px-5
        py-2
        rounded-full
        text-sm
        ">
          LIMITED TIME OFFER
        </span>

        <h2 className="
        text-5xl
        lg:text-7xl
        font-bold
        text-white
        mt-6
        leading-tight
        ">
          Mega Sale
          <br />
          Up To 70% Off
        </h2>

        <p className="
        text-white/90
        text-lg
        mt-6
        max-w-xl
        ">
          Shop premium products with exclusive discounts.
          Hurry before the offer ends.
        </p>

        <button className="
        mt-8
        bg-black
        text-white
        px-8
        py-4
        rounded-2xl
        font-semibold
        hover:scale-105
        transition
        ">
          Shop Collection
        </button>

      </div>

      <div className="
      flex
      justify-center
      text-[180px]
      ">
        🛍️
      </div>

    </div>

  </div>

</section>

{/* ================= REVIEWS ================= */}

<section className="max-w-7xl mx-auto px-6 py-20">

  <div className="text-center mb-14">

    <span className="text-[#D4AF37] font-semibold">
      TESTIMONIALS
    </span>

    <h2 className="text-5xl font-bold mt-3">
      What Customers Say
    </h2>

  </div>

  <div className="grid md:grid-cols-3 gap-8">

    {[
      {
        name: "Sarah Johnson",
        review:
          "Amazing shopping experience and fast delivery."
      },
      {
        name: "David Smith",
        review:
          "Premium quality products and great support."
      },
      {
        name: "Emma Wilson",
        review:
          "Best online shopping platform I have used."
      }
    ].map((item) => (

      <div
        key={item.name}
        className="
        bg-white
        rounded-[30px]
        p-8
        border
        border-[#eee]
        shadow-sm
        "
      >

        <div className="text-yellow-500 text-2xl">
          ⭐⭐⭐⭐⭐
        </div>

        <p className="
        text-gray-600
        mt-5
        leading-relaxed
        ">
          {item.review}
        </p>

        <div className="mt-6">

          <h4 className="font-bold">
            {item.name}
          </h4>

          <p className="text-sm text-gray-500">
            Verified Customer
          </p>

        </div>

      </div>

    ))}

  </div>

</section>

{/* ================= NEWSLETTER ================= */}

<section className="max-w-7xl mx-auto px-6 py-20">

  <div className="
  bg-white
  border
  border-[#eee]
  rounded-[40px]
  p-10
  lg:p-16
  text-center
  shadow-sm
  ">

    <h2 className="
    text-5xl
    font-bold
    ">
      Stay Updated
    </h2>

    <p className="
    text-gray-500
    mt-4
    ">
      Subscribe for offers, updates and new arrivals.
    </p>

    <div className="
    max-w-xl
    mx-auto
    mt-8
    flex
    flex-col
    md:flex-row
    gap-4
    ">

      <input
        type="email"
        placeholder="Enter your email"
        className="
        flex-1
        px-6
        py-4
        rounded-2xl
        border
        border-gray-300
        outline-none
        "
      />

      <button className="
      bg-[#D4AF37]
      text-white
      px-8
      py-4
      rounded-2xl
      font-semibold
      ">
        Subscribe
      </button>

    </div>

  </div>

</section>

{/* ================= FOOTER ================= */}

<footer className="
bg-white
border-t
border-[#eee]
mt-10
">

  <div className="
  max-w-7xl
  mx-auto
  px-6
  py-16
  grid
  md:grid-cols-4
  gap-10
  ">

    <div>

      <h2 className="
      text-3xl
      font-bold
      ">
        Prime
        <span className="text-[#D4AF37]">
          Cart
        </span>
      </h2>

      <p className="
      text-gray-500
      mt-4
      ">
        Premium shopping experience for everyone.
      </p>

    </div>

    <div>

      <h3 className="font-bold mb-4">
        Company
      </h3>

      <ul className="space-y-3 text-gray-500">
        <li>About Us</li>
        <li>Careers</li>
        <li>Contact</li>
      </ul>

    </div>

    <div>

      <h3 className="font-bold mb-4">
        Support
      </h3>

      <ul className="space-y-3 text-gray-500">
        <li>Help Center</li>
        <li>Returns</li>
        <li>Privacy Policy</li>
      </ul>

    </div>

    <div>

      <h3 className="font-bold mb-4">
        Follow Us
      </h3>

      <ul className="space-y-3 text-gray-500">
        <li>Instagram</li>
        <li>Facebook</li>
        <li>Twitter</li>
      </ul>

    </div>

  </div>

  <div className="
  border-t
  border-[#eee]
  py-6
  text-center
  text-gray-500
  ">
    © 2026 PrimeCart. All Rights Reserved.
  </div>

</footer>
    </main>
  );
}
