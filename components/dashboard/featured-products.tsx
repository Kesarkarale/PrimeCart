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
  slug: string;
  short_description: string | null;
  description: string | null;
  price: number;
  original_price: number | null;
  stock: number | null;
  image_url: string | null;
  brand: string | null;
  rating: number | null;
  reviews_count: number | null;
  is_featured: boolean;
  is_flash_sale: boolean;
  is_active: boolean;
};

export default function FeaturedProducts() {
  const supabase = createClient();

  const [products, setProducts] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setErrorMessage("");

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      console.log("PRODUCT DATA:", data);
      console.log("PRODUCT ERROR:", error);

      if (error) {
        console.error("Supabase products error:", error);
        setErrorMessage(error.message);
        setProducts([]);
      } else {
        setProducts(data ?? []);
      }

      setLoading(false);
    };

    fetchProducts();
  }, [supabase]);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-center min-h-[200px]">
          <p className="text-gray-500 font-semibold">
            Loading Products...
          </p>
        </div>
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="rounded-2xl bg-red-50 border border-red-200 p-6">
          <h3 className="text-lg font-bold text-red-600">
            Products could not be loaded
          </h3>

          <p className="text-sm text-red-500 mt-2">
            {errorMessage}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">

      {/* HEADER */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black text-gray-900">
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

      {/* TOTAL */}
      <p className="mb-5 text-lg font-semibold text-gray-700">
        Total Products: {products.length}
      </p>

      {/* EMPTY */}
      {products.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-10 text-center">
          <p className="text-gray-500 font-semibold">
            No products found.
          </p>
        </div>
      ) : (

        /* PRODUCTS GRID */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {products.map((product) => (

            <div
              key={product.id}
              className="
                group
                bg-white
                rounded-3xl
                overflow-hidden
                border
                border-gray-100
                shadow-sm
                hover:shadow-xl
                transition
                duration-300
              "
            >

              {/* IMAGE */}
              <Link href={`/product/dashboard/${product.id}`}>

                <div className="relative h-[280px] bg-gray-50 overflow-hidden">

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

                  {product.image_url ? (
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="
                        object-contain
                        p-6
                        group-hover:scale-110
                        transition
                        duration-500
                      "
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}

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

                {product.brand && (
                  <p className="text-xs text-gray-400 mt-1">
                    {product.brand}
                  </p>
                )}

                <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                  {product.short_description ||
                    product.description ||
                    "Premium product"}
                </p>

                {/* RATING */}
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
                    <Star
                      size={14}
                      className="fill-white"
                    />

                    {product.rating ?? 4.5}
                  </div>

                  <span className="text-sm text-gray-500">
                    ({product.reviews_count ?? 0})
                  </span>

                </div>

                {/* PRICE */}
                <div className="flex items-center gap-3 mt-4">

                  <span className="text-2xl font-black">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>

                  {product.original_price &&
                    product.original_price > product.price && (
                      <span className="text-sm text-gray-400 line-through">
                        ₹{product.original_price.toLocaleString("en-IN")}
                      </span>
                    )}

                </div>

                {/* CART */}
                <button
                  onClick={() => {
                    console.log("Add cart:", product.id);
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
      )}

    </section>
  );
}
