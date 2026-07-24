"use client";

import Link from "next/link";
import Image from "next/image";
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
      font-serif
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
      <Image
  src="/hero-product.png"
  alt="PrimeCart Hero"
  width={800}
  height={700}
  className="w-full max-w-[750px] mx-auto object-contain"
/>
    </div>

  </div>
       
</section>
      {/* ================= FEATURES BAR ================= */}

<section className="max-w-7xl mx-auto px-6 py-8">
  <div className="bg-white rounded-[30px] border border-[#ece7db] shadow-sm grid md:grid-cols-4 overflow-hidden">

    <div className="p-8 flex gap-4 items-center border-r border-[#ece7db]">
      <div className="text-4xl">🚚</div>
      <div>
        <h3 className="font-semibold">Free Delivery</h3>
        <p className="text-gray-500 text-sm">On orders above ₹499</p>
      </div>
    </div>

    <div className="p-8 flex gap-4 items-center border-r border-[#ece7db]">
      <div className="text-4xl">🛡️</div>
      <div>
        <h3 className="font-semibold">Secure Payment</h3>
        <p className="text-gray-500 text-sm">100% secure payment</p>
      </div>
    </div>

    <div className="p-8 flex gap-4 items-center border-r border-[#ece7db]">
      <div className="text-4xl">🏆</div>
      <div>
        <h3 className="font-semibold">Best Quality</h3>
        <p className="text-gray-500 text-sm">Top quality products</p>
      </div>
    </div>

    <div className="p-8 flex gap-4 items-center">
      <div className="text-4xl">🎧</div>
      <div>
        <h3 className="font-semibold">24/7 Support</h3>
        <p className="text-gray-500 text-sm">Dedicated support</p>
      </div>
    </div>

  </div>
</section>
      
      {/* ================= CATEGORIES ================= */} 
      
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-10"> 
          <h2 className="text-5xl font-bold text-black"> 
            Shop By Categories 
          </h2> 
          <div className="w-16 h-1 bg-[#D4AF37] mx-auto mt-3 rounded-full" />
        </div> 
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5"> 
          {categories.map((category) => ( 
  
  <div key={category.name}
    
    className=" bg-white rounded-3xl border border-[#eee] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 " > 
    <div className="h-40 bg-[#faf8f3] relative"> 
      <img src={category.image}
        alt={category.name}
        className=" w-full h-full object-contain p-4 " /> 
    </div> 
    <div className="p-4"> 
      <h3 className="font-semibold text-lg text-black"> 
        {category.name} </h3>
      <p className="text-gray-500 text-sm mt-1"> 
        {category.products}
      </p> 
    </div> 
  </div>
))}
        </div>
        <div className="flex justify-center mt-10">
          <button className=" bg-[#D4AF37] text-white px-10 py-4 rounded-2xl font-medium hover:bg-[#c69f2f] transition " > 
          View All Categories →
        </button> 
        </div> 
      </section>
 
<footer className="py-10 text-center text-gray-500">
  © 2026 PrimeCart. All Rights Reserved.
</footer>
    </main>
  );
}
