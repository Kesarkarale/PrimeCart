"use client";

import {
  Laptop,
  Smartphone,
  Shirt,
  Watch,
  Armchair,
  Gamepad2,
  Headphones,
  Camera,
} from "lucide-react";

const categories = [
  { name: "Electronics", icon: Laptop },
  { name: "Mobiles", icon: Smartphone },
  { name: "Fashion", icon: Shirt },
  { name: "Furniture", icon: Armchair },
  { name: "Watches", icon: Watch },
  { name: "Gaming", icon: Gamepad2 },
  { name: "Audio", icon: Headphones },
  { name: "Camera", icon: Camera },
];

export default function CategorySection() {
  return (
    <section className="py-12">

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">
          Shop by Category
        </h2>

        <button className="text-[#D4AF37] font-semibold hover:underline">
          View All →
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6">

        {categories.map((item, index) => {
          const Icon = item.icon;

          return (
            <button
              key={index}
              className="
              group
              flex
              flex-col
              items-center
              transition-all
              hover:-translate-y-2
              "
            >

              <div
                className="
                w-24
                h-24
                rounded-full
                bg-[#FFF8E5]
                border
                border-[#D4AF37]/20
                flex
                items-center
                justify-center
                shadow-sm
                group-hover:bg-[#D4AF37]
                group-hover:shadow-xl
                transition-all
                duration-300
                "
              >

                <Icon
                  size={34}
                  className="
                  text-[#D4AF37]
                  group-hover:text-white
                  transition
                  "
                />

              </div>

              <span className="mt-4 font-semibold text-gray-800 group-hover:text-[#D4AF37]">
                {item.name}
              </span>

            </button>
          );
        })}

      </div>

    </section>
  );
}
