 "use client";

import Link from "next/link";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
} from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#D4AF37]/20 bg-white/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-5">

        {/* Top Row */}
        <div className="h-20 flex items-center justify-between gap-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#D4AF37] flex items-center justify-center text-white text-2xl font-black">
              P
            </div>

            <div>
              <h2 className="text-2xl font-black tracking-wide">
                PrimeCart
              </h2>
              <p className="text-xs text-gray-500">
                Premium Shopping
              </p>
            </div>
          </Link>

          {/* Search */}
          <div className="hidden lg:flex flex-1 max-w-3xl">

            <button className="px-5 bg-gray-100 border rounded-l-2xl text-sm font-semibold">
              All
            </button>

            <input
              placeholder="Search products..."
              className="flex-1 border-y outline-none px-5 h-14"
            />

            <button className="w-16 bg-[#D4AF37] rounded-r-2xl flex items-center justify-center text-white hover:bg-black transition">
              <Search size={20} />
            </button>

          </div>

          {/* Right */}
          <div className="flex items-center gap-4">

            <button className="w-12 h-12 rounded-2xl bg-gray-100 hover:bg-[#D4AF37] hover:text-white transition flex items-center justify-center">
              <Heart size={20} />
            </button>

            <button className="w-12 h-12 rounded-2xl bg-gray-100 hover:bg-[#D4AF37] hover:text-white transition flex items-center justify-center">
              <ShoppingCart size={20} />
            </button>

            <button className="flex items-center gap-3 bg-[#111827] text-white px-5 h-12 rounded-2xl hover:bg-[#D4AF37] transition">
              <User size={18} />
              Account
            </button>

            <button className="lg:hidden w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
              <Menu />
            </button>

          </div>

        </div>

        {/* Bottom Menu */}
        <div className="hidden lg:flex items-center gap-8 h-14 text-sm font-semibold">

          <Link href="#">Home</Link>

          <Link href="#">Electronics</Link>

          <Link href="#">Fashion</Link>

          <Link href="#">Mobiles</Link>

          <Link href="#">Beauty</Link>

          <Link href="#">Home</Link>

          <Link href="#">Kitchen</Link>

          <Link href="#">Sports</Link>

          <Link href="#">Deals</Link>

          <Link
            href="#"
            className="ml-auto bg-[#D4AF37] text-white px-5 py-2 rounded-full"
          >
            Today's Offer
          </Link>

        </div>

      </div>
    </header>
  );
}
