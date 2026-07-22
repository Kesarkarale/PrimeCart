"use client";

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
  { name: "Electronics", icon: Headphones },
  { name: "Fashion", icon: Shirt },
  { name: "Home & Living", icon: Sofa },
  { name: "Beauty", icon: Sparkles },
  { name: "Mobiles", icon: Smartphone },
  { name: "Appliances", icon: WashingMachine },
  { name: "Footwear", icon: Footprints },
  { name: "Watches", icon: Watch },
  { name: "Bags", icon: ShoppingBag },
  { name: "Toys & Baby", icon: Baby },
  { name: "View All", icon: Grid2X2 },
];

export default function CategorySection() {
  return (
    <section className="py-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-4">
        {categories.map((item, i) => {
          const Icon = item.icon;

          return (
            <button
              key={i}
              className="
                bg-white
                rounded-2xl
                border
                border-gray-200
                h-28
                flex
                flex-col
                items-center
                justify-center
                shadow-sm
                hover:shadow-lg
                hover:border-[#D4AF37]
                transition-all
                duration-300
              "
            >
              <Icon
                size={34}
                className="text-[#C99718] stroke-[1.5]"
              />

              <span className="mt-3 text-sm font-medium text-gray-800 text-center px-1">
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
