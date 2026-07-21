"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 bg-[#111827] text-white">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid gap-10 lg:grid-cols-4">

          {/* Logo */}
          <div>
            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-2xl bg-[#D4AF37] flex items-center justify-center text-2xl font-black">
                P
              </div>

              <div>
                <h2 className="text-2xl font-bold">
                  PrimeCart
                </h2>

                <p className="text-gray-400 text-sm">
                  Premium Shopping Store
                </p>
              </div>

            </div>

            <p className="mt-6 text-gray-400 leading-7">
              Discover premium products with the best prices,
              secure payments and fast delivery all over India.
            </p>

            <div className="flex gap-4 mt-8">

              <button className="w-11 h-11 rounded-xl bg-white/10 hover:bg-[#D4AF37] transition flex items-center justify-center">
                <Facebook size={20} />
              </button>

              <button className="w-11 h-11 rounded-xl bg-white/10 hover:bg-[#D4AF37] transition flex items-center justify-center">
                <Instagram size={20} />
              </button>

              <button className="w-11 h-11 rounded-xl bg-white/10 hover:bg-[#D4AF37] transition flex items-center justify-center">
                <Twitter size={20} />
              </button>

              <button className="w-11 h-11 rounded-xl bg-white/10 hover:bg-[#D4AF37] transition flex items-center justify-center">
                <Youtube size={20} />
              </button>

            </div>

          </div>

          {/* Quick Links */}
          <div>

            <h3 className="text-xl font-bold mb-6">
              Quick Links
            </h3>

            <div className="space-y-4">

              <Link href="/" className="block hover:text-[#D4AF37]">
                Home
              </Link>

              <Link href="#" className="block hover:text-[#D4AF37]">
                Shop
              </Link>

              <Link href="#" className="block hover:text-[#D4AF37]">
                Categories
              </Link>

              <Link href="#" className="block hover:text-[#D4AF37]">
                Deals
              </Link>

              <Link href="#" className="block hover:text-[#D4AF37]">
                Contact
              </Link>

            </div>

          </div>

          {/* Categories */}
          <div>

            <h3 className="text-xl font-bold mb-6">
              Categories
            </h3>

            <div className="space-y-4">

              <p>Electronics</p>
              <p>Fashion</p>
              <p>Mobiles</p>
              <p>Furniture</p>
              <p>Watches</p>
              <p>Accessories</p>

            </div>

          </div>

          {/* Contact */}
          <div>

            <h3 className="text-xl font-bold mb-6">
              Contact
            </h3>

            <div className="space-y-5">

              <div className="flex gap-3">

                <MapPin className="text-[#D4AF37]" />

                <span>Mumbai, Maharashtra, India</span>

              </div>

              <div className="flex gap-3">

                <Phone className="text-[#D4AF37]" />

                <span>+91 98765 43210</span>

              </div>

              <div className="flex gap-3">

                <Mail className="text-[#D4AF37]" />

                <span>support@primecart.com</span>

              </div>

            </div>

          </div>

        </div>

      </div>

      <div className="border-t border-white/10">

        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between">

          <p className="text-gray-400 text-sm">
            © 2026 PrimeCart. All Rights Reserved.
          </p>

          <div className="flex gap-6 mt-4 md:mt-0 text-sm text-gray-400">

            <Link href="#">Privacy Policy</Link>

            <Link href="#">Terms & Conditions</Link>

            <Link href="#">Refund Policy</Link>

          </div>

        </div>

      </div>

    </footer>
  );
}
