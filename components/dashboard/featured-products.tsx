"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Product = {
  id: string;
  category_id: string | null;
  name: string;
  short_description: string | null;
  description: string | null;
  price: number;
  stock: number | null;
  image_url: string | null;
  brand: string | null;
  rating: number | null;
  created_at: string | null;
};

export default function FeaturedProducts() {
    const supabase = createClient();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setProducts(data);
      }

      setLoading(false);
    };

    fetchProducts();
  }, []);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  if (loading) {
    return (
      <section className="py-10">
        <h2 className="text-2xl font-bold">
          Loading Products...
        </h2>
      </section>
    );
  }

  return (
    <section className="py-10">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white">
            Featured Products
          </h2>

          <p className="text-gray-500 mt-1">
            Premium products specially selected for you
          </p>
        </div>

        <Link
          href="/dashboard/products"
          className="text-[#D4AF37] font-bold hover:underline"
        >
          View All →
        </Link>
      </div>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="
              bg-white
              dark:bg-[#111]
              rounded-3xl
              border
              border-gray-200
              dark:border-[#222]
              overflow-hidden
              group
              hover:shadow-2xl
              hover:-translate-y-1
              transition-all
              duration-300
            "
          >
            {/* IMAGE */}
            <Link href={`/product/dashboard/${product.id}`}>
              <div className="relative h-56 bg-gray-50 overflow-hidden">
                <span
                  className="
                  absolute
                  top-3
                  left-3
                  bg-[#D4AF37]
                  text-white
                  text-xs
                  font-bold
                  px-3
                  py-1
                  rounded-full
                  z-10
                "
                >
                  NEW
                </span>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleWishlist(product.id);
                  }}
                  className="
                    absolute
                    top-3
                    right-3
                    z-10
                    bg-white
                    w-10
                    h-10
                    rounded-full
                    shadow
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Heart
                    size={19}
                    className={
                      wishlist.includes(product.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-700"
                    }
                  />
                </button>

                <Image
                  src={
                    product.image_url ||
                    "https://via.placeholder.com/400x400?text=Product"
                  }
                  alt={product.name}
                  fill
                  className="
                    object-contain
                    p-6
                    group-hover:scale-110
                    transition
                    duration-500
                  "
                />
              </div>
            </Link>

            {/* DETAILS */}
            <div className="p-5">
              <Link href={`/product/dashboard/${product.id}`}>
                <h3
                  className="
                  font-bold
                  text-lg
                  line-clamp-2
                  hover:text-[#D4AF37]
                  transition
                "
                >
                  {product.name}
                </h3>
              </Link>

              <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                {product.short_description ||
                  product.description ||
                  "Premium product"}
              </p>

              <div className="flex items-center gap-2 mt-3">
                <div
                  className="
                  flex
                  items-center
                  gap-1
                  bg-green-600
                  text-white
                  px-2
                  py-1
                  rounded-lg
                  text-sm
                  font-bold
                "
                >
                  <Star size={14} className="fill-white" />
                  {product.rating || 4.5}
                </div>

                <span className="text-sm text-gray-500">
                  (100+)
                </span>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <span className="text-2xl font-black">
                  ₹{product.price}
                </span>
              </div>

              <button
                onClick={() => {
                  console.log("Add cart", product.id);
                }}
                className="
                  mt-5
                  w-full
                  h-12
                  rounded-2xl
                  bg-[#D4AF37]
                  hover:bg-black
                  text-white
                  font-bold
                  flex
                  items-center
                  justify-center
                  gap-2
                  transition
                "
              >
                <ShoppingCart size={18} />
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
