 "use client";

import Image from "next/image";
import { Heart, ShoppingCart, Star } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    image: "/products/headphone.png",
    price: 2499,
    oldPrice: 3999,
    rating: 4.8,
    discount: "38%",
  },
  {
    id: 2,
    name: "Smart Watch",
    image: "/products/watch.png",
    price: 3499,
    oldPrice: 4999,
    rating: 4.7,
    discount: "30%",
  },
  {
    id: 3,
    name: "Running Shoes",
    image: "/products/shoes.png",
    price: 2999,
    oldPrice: 4599,
    rating: 4.9,
    discount: "35%",
  },
  {
    id: 4,
    name: "Laptop Backpack",
    image: "/products/bag.png",
    price: 1899,
    oldPrice: 2899,
    rating: 4.6,
    discount: "34%",
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    image: "/products/speaker.png",
    price: 2199,
    oldPrice: 3299,
    rating: 4.8,
    discount: "33%",
  },
  {
    id: 6,
    name: "Gaming Mouse",
    image: "/products/mouse.png",
    price: 1499,
    oldPrice: 2299,
    rating: 4.7,
    discount: "35%",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-10">

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">
          Featured Products
        </h2>

        <button className="text-[#D4AF37] font-semibold">
          View All
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">

        {products.map((product) => (

          <div
            key={product.id}
            className="
            bg-white
            rounded-3xl
            overflow-hidden
            border
            border-gray-200
            hover:border-[#D4AF37]
            hover:shadow-2xl
            transition-all
            duration-300
            group
            "
          >

            <div className="relative h-56 bg-gray-50">

              <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-20">
                {product.discount} OFF
              </span>

              <button className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center z-20">
                <Heart size={18} />
              </button>

              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-6 group-hover:scale-110 transition"
              />

            </div>

            <div className="p-5">

              <h3 className="font-bold text-lg line-clamp-2">
                {product.name}
              </h3>

              <div className="flex items-center gap-1 mt-2">
                <Star
                  size={16}
                  className="fill-yellow-400 text-yellow-400"
                />
                <span className="font-semibold">
                  {product.rating}
                </span>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <span className="text-2xl font-black">
                  ₹{product.price}
                </span>

                <span className="text-gray-400 line-through">
                  ₹{product.oldPrice}
                </span>
              </div>

              <button
                className="
                mt-5
                w-full
                h-12
                rounded-2xl
                bg-[#D4AF37]
                hover:bg-black
                text-white
                font-semibold
                flex
                items-center
                justify-center
                gap-2
                transition
                "
              >
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
