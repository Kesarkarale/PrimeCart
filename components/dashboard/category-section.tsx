 "use client";

import {
  Laptop,
  Smartphone,
  Shirt,
  Sofa,
  Watch,
  Gamepad2,
  Headphones,
  Camera,
} from "lucide-react";

const categories = [
  {
    name: "Electronics",
    icon: Laptop,
  },
  {
    name: "Mobiles",
    icon: Smartphone,
  },
  {
    name: "Fashion",
    icon: Shirt,
  },
  {
    name: "Furniture",
    icon: Sofa,
  },
  {
    name: "Watches",
    icon: Watch,
  },
  {
    name: "Gaming",
    icon: Gamepad2,
  },
  {
    name: "Audio",
    icon: Headphones,
  },
  {
    name: "Cameras",
    icon: Camera,
  },
];

export default function CategorySection() {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">
          Shop By Category
        </h2>

        <button className="text-[#D4AF37] font-semibold hover:underline">
          View All
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-5">
        {categories.map((item, index) => {
          const Icon = item.icon;

          return (
            <button
              key={index}
              className="
              group
              bg-white
              rounded-3xl
              border
              border-gray-200
              p-6
              shadow-sm
              hover:shadow-xl
              hover:border-[#D4AF37]
              transition-all
              duration-300
              hover:-translate-y-2
              "
            >
              <div
                className="
                w-16
                h-16
                mx-auto
                rounded-2xl
                bg-[#FFF6DA]
                flex
                items-center
                justify-center
                group-hover:bg-[#D4AF37]
                transition
                "
              >
                <Icon
                  size={30}
                  className="text-[#D4AF37] group-hover:text-white"
                />
              </div>

              <h3 className="mt-4 font-semibold text-gray-800">
                {item.name}
              </h3>
            </button>
          );
        })}
      </div>
    </section>
  );
}
