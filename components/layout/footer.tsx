"use client";

import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  ShieldCheck,
  Truck,
  CreditCard,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Logo */}
          <div>

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-2xl bg-[#D4AF37] flex items-center justify-center text-2xl font-bold">
                P
              </div>

              <div>
                <h2 className="text-2xl font-bold">
                  PrimeCart
                </h2>

                <p className="text-gray-400 text-sm">
                  Premium Shopping
                </p>

              </div>

            </div>

            <p className="mt-6 text-gray-400 leading-7">
              Discover premium quality products at the best prices with
              secure payments, fast delivery and trusted customer support.
            </p>

            <div className="flex gap-4 mt-8">

              <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[#D4AF37] transition">
                <Globe size={20} />
              </div>

              <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[#D4AF37] transition">
                <ShieldCheck size={20} />
              </div>

              <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[#D4AF37] transition">
                <Truck size={20} />
              </div>

              <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[#D4AF37] transition">
                <CreditCard size={20} />
              </div>

            </div>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-xl font-bold mb-6">
              Quick Links
            </h3>

            <div className="space-y-4 text-gray-400">

              <Link href="/" className="block hover:text-[#D4AF37]">
                Home
              </Link>

              <Link href="/dashboard" className="block hover:text-[#D4AF37]">
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

            <div className="space-y-4 text-gray-400">

              <p>Electronics</p>

              <p>Fashion</p>

              <p>Mobiles</p>

              <p>Furniture</p>

              <p>Accessories</p>

              <p>Beauty</p>

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-xl font-bold mb-6">
              Contact Us
            </h3>

            <div className="space-y-5 text-gray-400">

              <div className="flex items-center gap-3">

                <MapPin
                  size={18}
                  className="text-[#D4AF37]"
                />

                <span>
                  Mumbai, Maharashtra, India
                </span>

              </div>

              <div className="flex items-center gap-3">

                <Phone
                  size={18}
                  className="text-[#D4AF37]"
                />

                <span>
                  +91 98765 43210
                </span>

              </div>

              <div className="flex items-center gap-3">

                <Mail
                  size={18}
                  className="text-[#D4AF37]"
                />

                <span>
                  support@primecart.com
                </span>

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

          <div className="flex gap-6 mt-4 md:mt-0 text-gray-400 text-sm">

            <Link href="#">
              Privacy Policy
            </Link>

            <Link href="#">
              Terms
            </Link>

            <Link href="#">
              Refund Policy
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
}
