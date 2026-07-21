"use client";

import Image from "next/image";
import { Heart, ShoppingCart, Star } from "lucide-react";

const deals = [
  {
    id: 1,
    image: "/products/headphone.png",
    title: "Wireless Headphones",
    price: 2499,
    old: 3999,
    discount: "38%",
    rating: 4.8,
  },
  {
    id: 2,
    image: "/products/watch.png",
    title: "Smart Watch",
    price: 3499,
    old: 4999,
    discount: "30%",
    rating: 4.7,
  },
  {
    id: 3,
    image: "/products/shoes.png",
    title: "Running Shoes",
    price: 2999,
    old: 4599,
    discount: "35%",
    rating: 4.9,
  },
  {
    id: 4,
    image: "/products/bag.png",
    title: "Laptop Backpack",
    price: 1899,
    old: 2899,
    discount: "34%",
    rating: 4.6,
  },
];

export default function FlashSale() {
  return (
    <section className="py-12">

      <div className="flex items-center justify-between mb-8">

        <div>
          <h2 className="text-3xl font-bold">
            ⚡ Flash Sale
          </h2>

          <p className="text-gray-500 mt-2">
            Limited time offers
          </p>
        </div>

        <button className="bg-[#D4AF37] text-white px-5 py-2 rounded-xl">
          View All
        </button>

      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

        {deals.map((item) => (

          <div
            key={item.id}
            className="bg-white rounded-3xl shadow hover:shadow-xl border hover:border-[#D4AF37] transition overflow-hidden"
          >

            <div className="relative h-60 bg-gray-50">

              <span className="absolute top-4 left-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full z-10">
                {item.discount} OFF
              </span>

              <button className="absolute top-4 right-4 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow z-10">
                <Heart size={18} />
              </button>

              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain p-8 hover:scale-110 transition"
              />

            </div>

            <div className="p-5">

              <h3 className="font-bold">
                {item.title}
              </h3>

              <div className="flex items-center gap-1 mt-2">
                <Star
                  size={16}
                  className="fill-yellow-400 text-yellow-400"
                />
                {item.rating}
              </div>

              <div className="mt-3">

                <span className="text-2xl font-bold">
                  ₹{item.price}
                </span>

                <span className="ml-2 line-through text-gray-400">
                  ₹{item.old}
                </span>

              </div>

              <button className="w-full mt-5 h-11 rounded-xl bg-[#D4AF37] text-white flex justify-center items-center gap-2 hover:bg-black transition">
                <ShoppingCart size={18} />
                Add to Cart
              </button>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}
