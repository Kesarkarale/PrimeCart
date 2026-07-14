"use client";

import {
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
} from "lucide-react";

export default function TopBar() {
  return (
    <div className="hidden lg:block border-b border-gray-200 dark:border-white/10 bg-white dark:bg-[#0B0B0B]">
      <div className="max-w-7xl mx-auto px-5 h-11 flex items-center justify-between text-sm">

        <div className="flex items-center gap-8">

          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <Truck size={16} className="text-[#D4AF37]" />
            Free Delivery over ₹999
          </div>

          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <RotateCcw size={16} className="text-[#D4AF37]" />
            7 Days Return
          </div>

          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <ShieldCheck size={16} className="text-[#D4AF37]" />
            Secure Payment
          </div>

        </div>

        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <Headphones size={16} className="text-[#D4AF37]" />
          24/7 Support
        </div>

      </div>
    </div>
  );
}
