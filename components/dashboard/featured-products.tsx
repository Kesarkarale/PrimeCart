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
      try {
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
          return;
        }

        setProducts(data ?? []);
      } catch (error) {
        console.error("Unexpected products error:", error);

        setErrorMessage(
          "Something went wrong while loading products."
        );

        setProducts([]);
      } finally {
        setLoading(false);
      }
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

  const handleAddToCart = (product: Product) => {
    console.log("ADD TO CART:", {
      id: product.id,
      name: product.name,
      price: product.price,
    });

    // Cart functionality later
  };

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-center min-h-[250px]">
          <div className="text-center">
            <div
              className="
                w-10
                h-10
                border-4
                border-gray-200
                border-t-[#D4AF37]
                rounded-full
                animate-spin
                mx-auto
              "
            />

            <p className="text-gray-500 font-semibold mt-4">
              Loading Products...
            </p>
          </div>
        </div>
      </section>
    );
  }

  /* =========================
     ERROR
  ========================= */

  if (errorMessage) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div
          className="
            rounded-3xl
            bg-red-50
            border
            border-red-200
            p-8
          "
        >
          <h3 className="text-xl font-black text-red-600">
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

      {/* =========================
          HEADER
      ========================= */}

      <div className="flex items-end justify-between gap-4 mb-8">

        <div>
          <p className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider">
            PrimeCart Collection
          </p>

          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-1">
            Featured Products
          </h2>

          <p className="text-gray-500 mt-2">
            Premium products specially selected for you
          </p>
        </div>

        <Link
          href="/dashboard/products"
          className="
            hidden
            sm:block
            text-[#D4AF37]
            font-bold
            hover:text-black
            transition
            whitespace-nowrap
          "
        >
          View All →
        </Link>

      </div>


      {/* MOBILE VIEW ALL */}

      <div className="sm:hidden mb-6">
        <Link
          href="/dashboard/products"
          className="text-[#D4AF37] font-bold"
        >
          View All Products →
        </Link>
      </div>


      {/* TOTAL */}

      <div className="mb-6">
        <span
          className="
            inline-flex
            items-center
            px-4
            py-2
            bg-white
            border
            rounded-full
            text-sm
            font-semibold
            text-gray-600
          "
        >
          {products.length} Products
        </span>
      </div>


      {/* =========================
          EMPTY
      ========================= */}

      {products.length === 0 ? (
        <div
          className="
            rounded-3xl
            border
            bg-gray-50
            p-12
            text-center
          "
        >
          <ShoppingCart
            size={40}
            className="mx-auto text-gray-400"
          />

          <p className="text-gray-500 font-semibold mt-4">
            No products found.
          </p>
        </div>
      ) : (

        /* =========================
           PRODUCTS GRID
        ========================= */

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-6
          "
        >

          {products.map((product) => {

            const discount =
              product.original_price &&
              product.original_price > product.price
                ? Math.round(
                    ((product.original_price -
                      product.price) /
                      product.original_price) *
                      100
                  )
                : 0;

            return (
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
                  hover:shadow-2xl
                  hover:-translate-y-1
                  transition-all
                  duration-300
                "
              >

                {/* =========================
                    IMAGE
                ========================= */}

                <div className="relative">

                  <Link
                    href={`/dashboard/product/${product.id}`}
                    className="block"
                  >

                    <div
                      className="
                        relative
                        h-[280px]
                        bg-gray-50
                        overflow-hidden
                      "
                    >

                      {/* FLASH SALE */}

                      {product.is_flash_sale && (
                        <div
                          className="
                            absolute
                            top-4
                            left-4
                            z-10
                            bg-red-500
                            text-white
                            px-3
                            py-1.5
                            rounded-full
                            text-xs
                            font-black
                          "
                        >
                          FLASH SALE
                        </div>
                      )}


                      {/* DISCOUNT */}

                      {discount > 0 && !product.is_flash_sale && (
                        <div
                          className="
                            absolute
                            top-4
                            left-4
                            z-10
                            bg-black
                            text-white
                            px-3
                            py-1.5
                            rounded-full
                            text-xs
                            font-bold
                          "
                        >
                          {discount}% OFF
                        </div>
                      )}


                      {/* PRODUCT IMAGE */}

                      {product.image_url ? (
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          fill
                          sizes="
                            (max-width: 640px) 100vw,
                            (max-width: 1024px) 50vw,
                            25vw
                          "
                          className="
                            object-contain
                            p-6
                            group-hover:scale-110
                            transition-transform
                            duration-500
                          "
                        />
                      ) : (
                        <div
                          className="
                            h-full
                            flex
                            items-center
                            justify-center
                            text-gray-400
                          "
                        >
                          <div className="text-center">
                            <ShoppingCart
                              size={35}
                              className="mx-auto"
                            />

                            <p className="text-sm mt-2">
                              No Image
                            </p>
                          </div>
                        </div>
                      )}

                    </div>

                  </Link>


                  {/* WISHLIST */}

                  <button
                    type="button"
                    onClick={() =>
                      toggleWishlist(product.id)
                    }
                    aria-label="Add to wishlist"
                    className="
                      absolute
                      top-3
                      right-3
                      z-20
                      bg-white
                      w-10
                      h-10
                      rounded-full
                      shadow-md
                      flex
                      items-center
                      justify-center
                      hover:scale-110
                      transition
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

                </div>


                {/* =========================
                    DETAILS
                ========================= */}

                <div className="p-5">

                  {/* PRODUCT NAME */}

                  <Link
                    href={`/dashboard/product/${product.id}`}
                  >
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


                  {/* BRAND */}

                  {product.brand && (
                    <p
                      className="
                        text-xs
                        text-gray-400
                        mt-1
                        font-medium
                      "
                    >
                      {product.brand}
                    </p>
                  )}


                  {/* DESCRIPTION */}

                  <p
                    className="
                      text-sm
                      text-gray-500
                      mt-2
                      line-clamp-2
                      min-h-[40px]
                    "
                  >
                    {product.short_description ||
                      product.description ||
                      "Premium quality product from PrimeCart."}
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

                    <span className="text-2xl font-black text-gray-900">
                      ₹
                      {Number(product.price).toLocaleString(
                        "en-IN"
                      )}
                    </span>

                    {product.original_price &&
                      product.original_price >
                        product.price && (
                        <span
                          className="
                            text-sm
                            text-gray-400
                            line-through
                          "
                        >
                          ₹
                          {Number(
                            product.original_price
                          ).toLocaleString("en-IN")}
                        </span>
                      )}

                  </div>


                  {/* ADD TO CART */}

                  <button
                    type="button"
                    onClick={() =>
                      handleAddToCart(product)
                    }
                    disabled={
                      !product.stock ||
                      product.stock <= 0
                    }
                    className="
                      mt-5
                      w-full
                      h-12
                      rounded-2xl
                      bg-[#D4AF37]
                      hover:bg-black
                      disabled:bg-gray-300
                      disabled:cursor-not-allowed
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

                    {product.stock &&
                    product.stock > 0
                      ? "Add To Cart"
                      : "Out Of Stock"}
                  </button>

                </div>

              </div>
            );
          })}

        </div>
      )}

    </section>
  );
}
