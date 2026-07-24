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

const categories = [
  {
    name: "Electronics",
    products: "2500+ Products",
    image: "/categories/electronics.png",
  },
  {
    name: "Fashion",
    products: "1800+ Products",
    image: "/categories/fashion.png",
  },
  {
    name: "Watches",
    products: "1200+ Products",
    image: "/categories/watch.png",
  },
  {
    name: "Beauty",
    products: "800+ Products",
    image: "/categories/perfume.png",
  },
  {
    name: "Home & Living",
    products: "1500+ Products",
    image: "/categories/home.png",
  },
  {
    name: "Gaming",
    products: "950+ Products",
    image: "/categories/gaming.png",
  },
];

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

     <section className="max-w-7xl mx-auto px-6 py-20">
  <div className="grid lg:grid-cols-2 gap-12 items-center">

    {/* Right CONTENT */}
    <div>

      <div className="
      inline-flex
      items-center
      px-5
      py-2
      rounded-full
      border
      border-[#D4AF37]/30
      text-[#D4AF37]
      font-medium
      ">
        🔥 Super Sale is Live!
      </div>

      <h1 className="
      mt-8
      text-6xl
      lg:text-7xl
      font-bold
      leading-tight
      text-black
      ">
        Shop More.
        <br />
        <span className="text-[#D4AF37]">
          Pay Less.
        </span>
      </h1>

      <p className="
      mt-6
      text-xl
      text-gray-600
      max-w-xl
      ">
        Discover the best products at unbeatable prices.
        Your one-stop destination for all your shopping needs.
      </p>

      <div className="flex gap-4 mt-8">

        <button className="
        bg-[#D4AF37]
        text-white
        px-8
        py-4
        rounded-2xl
        font-semibold
        ">
          Shop Now
        </button>

        <button className="
        border
        border-gray-300
        px-8
        py-4
        rounded-2xl
        bg-white
        ">
          Explore Deals
        </button>

      </div>

      <div className="flex items-center gap-4 mt-10">

        <div className="flex -space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white"></div>
          <div className="w-10 h-10 rounded-full bg-gray-400 border-2 border-white"></div>
          <div className="w-10 h-10 rounded-full bg-gray-500 border-2 border-white"></div>
        </div>

        <p className="text-gray-600">
          Join <span className="text-[#D4AF37] font-bold">10,000+</span> Happy Customers
        </p>

      </div>

    </div>
     {/* Left IMAGE */}
    <div className="relative">
      <img
        src="/hero-product.png"
        alt="PrimeCart Hero"
        className="w-full h-auto object-contain"
      />
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
<section className="py-16">

  <div className="text-center mb-10">
    <h2 className="text-5xl font-bold text-black">
      Shop By Categories
    </h2>

    <div className="w-16 h-1 bg-[#D4AF37] mx-auto mt-3 rounded-full" />
  </div>

  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">

    {categories.map((category) => (

      <div
        key={category.name}
        className="
        bg-white
        rounded-3xl
        border
        border-[#eee]
        overflow-hidden
        shadow-sm
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
        "
      >

        <div className="h-40 bg-[#faf8f3] relative">

          <img
            src={category.image}
            alt={category.name}
            className="
            w-full
            h-full
            object-contain
            p-4
            "
          />

        </div>

        <div className="p-4">

          <h3 className="font-semibold text-lg text-black">
            {category.name}
          </h3>

          <p className="text-gray-500 text-sm mt-1">
            {category.products}
          </p>

        </div>

      </div>

    ))}

  </div>

  <div className="flex justify-center mt-10">

    <button
      className="
      bg-[#D4AF37]
      text-white
      px-10
      py-4
      rounded-2xl
      font-medium
      hover:bg-[#c69f2f]
      transition
      "
    >
      View All Categories →
    </button>

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
