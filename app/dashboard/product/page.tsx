"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import {
  ArrowLeft,
  ChevronDown,
  Heart,
  Search,
  ShoppingCart,
  SlidersHorizontal,
  Star,
  X,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

type Product = {
  id: string;
  category_id: string | null;
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  price: number | string;
  original_price: number | string | null;
  stock: number | null;
  image_url: string | null;
  brand: string | null;
  rating: number | string | null;
  reviews_count: number | null;
  is_featured: boolean;
  is_flash_sale: boolean;
  is_active: boolean;
};

export default function ProductsPage() {
  const supabase = createClient();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const [wishlist, setWishlist] = useState<string[]>([]);

  /* =========================================================
     FETCH PRODUCTS
  ========================================================= */

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

        console.log("PRODUCTS:", data);
        console.log("PRODUCT ERROR:", error);

        if (error) {
          setErrorMessage(error.message);
          setProducts([]);
          return;
        }

        setProducts(data ?? []);
      } catch (error) {
        console.error(error);

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

  /* =========================================================
     LOAD WISHLIST
  ========================================================= */

  useEffect(() => {
    try {
      const saved = localStorage.getItem("primecart_wishlist");

      if (saved) {
        setWishlist(JSON.parse(saved));
      }
    } catch {
      setWishlist([]);
    }
  }, []);

  /* =========================================================
     WISHLIST
  ========================================================= */

  const toggleWishlist = (id: string) => {
    setWishlist((current) => {
      const updated = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];

      localStorage.setItem(
        "primecart_wishlist",
        JSON.stringify(updated)
      );

      return updated;
    });
  };

  /* =========================================================
     BRANDS
  ========================================================= */

  const brands = useMemo(() => {
    const values = products
      .map((product) => product.brand)
      .filter(
        (brand): brand is string =>
          Boolean(brand && brand.trim())
      );

    return [...new Set(values)].sort();
  }, [products]);

  /* =========================================================
     FILTER + SEARCH + SORT
  ========================================================= */

  const filteredProducts = useMemo(() => {
    let result = [...products];

    /* SEARCH */

    if (search.trim()) {
      const query = search.toLowerCase().trim();

      result = result.filter((product) => {
        return (
          product.name.toLowerCase().includes(query) ||
          product.brand?.toLowerCase().includes(query) ||
          product.short_description
            ?.toLowerCase()
            .includes(query)
        );
      });
    }

    /* BRAND */

    if (selectedBrand !== "all") {
      result = result.filter(
        (product) => product.brand === selectedBrand
      );
    }

    /* SORT */

    if (sortBy === "price-low") {
      result.sort(
        (a, b) => Number(a.price) - Number(b.price)
      );
    }

    if (sortBy === "price-high") {
      result.sort(
        (a, b) => Number(b.price) - Number(a.price)
      );
    }

    if (sortBy === "rating") {
      result.sort(
        (a, b) =>
          Number(b.rating ?? 0) -
          Number(a.rating ?? 0)
      );
    }

    if (sortBy === "discount") {
      result.sort((a, b) => {
        const discountA =
          Number(a.original_price) > Number(a.price)
            ? ((Number(a.original_price) -
                Number(a.price)) /
                Number(a.original_price)) *
              100
            : 0;

        const discountB =
          Number(b.original_price) > Number(b.price)
            ? ((Number(b.original_price) -
                Number(b.price)) /
                Number(b.original_price)) *
              100
            : 0;

        return discountB - discountA;
      });
    }

    return result;
  }, [
    products,
    search,
    selectedBrand,
    sortBy,
  ]);

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

          <div className="h-8 w-56 bg-gray-200 rounded-lg animate-pulse" />

          <div className="h-5 w-80 bg-gray-200 rounded mt-3 animate-pulse" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100"
              >
                <div className="h-[280px] bg-gray-200 animate-pulse" />

                <div className="p-5 space-y-3">
                  <div className="h-5 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
                  <div className="h-7 w-1/2 bg-gray-200 rounded animate-pulse" />
                  <div className="h-12 bg-gray-200 rounded-2xl animate-pulse" />
                </div>
              </div>
            ))}

          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (errorMessage) {
    return (
      <main className="min-h-screen bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6 py-10">

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-[#D4AF37] font-bold transition"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>

          <div className="mt-10 rounded-3xl bg-red-50 border border-red-200 p-8">
            <h1 className="text-2xl font-black text-red-600">
              Products could not be loaded
            </h1>

            <p className="text-red-500 mt-2">
              {errorMessage}
            </p>
          </div>

        </div>
      </main>
    );
  }

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <main className="min-h-screen bg-[#fafafa]">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="bg-white border-b border-gray-100">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-7">

          {/* BREADCRUMB */}

          <div className="flex items-center gap-2 text-sm mb-6">

            <Link
              href="/dashboard"
              className="text-[#D4AF37] font-bold hover:text-black transition"
            >
              Home
            </Link>

            <span className="text-gray-300">
              /
            </span>

            <span className="text-gray-500 font-semibold">
              Products
            </span>

          </div>

          {/* TITLE */}

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">

            <div>

              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#D4AF37]">
                PrimeCart Collection
              </p>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-950 mt-2">
                All Products
              </h1>

              <p className="text-gray-500 mt-2">
                Discover premium products specially selected for you.
              </p>

            </div>

            <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-full px-5 py-3 w-fit">

              <ShoppingCart
                size={17}
                className="text-[#D4AF37]"
              />

              <span className="font-bold text-gray-700">
                {filteredProducts.length} Products
              </span>

            </div>

          </div>

          {/* SEARCH */}

          <div className="mt-7 flex flex-col lg:flex-row gap-3">

            <div className="relative flex-1">

              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search for products, brands and more..."
                className="
                  w-full
                  h-14
                  rounded-2xl
                  border
                  border-gray-200
                  bg-gray-50
                  pl-12
                  pr-12
                  outline-none
                  focus:border-[#D4AF37]
                  focus:ring-2
                  focus:ring-[#D4AF37]/10
                  transition
                  text-gray-900
                "
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                >
                  <X size={18} />
                </button>
              )}

            </div>

            {/* SORT */}

            <div className="relative">

              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value)
                }
                className="
                  appearance-none
                  w-full
                  lg:w-56
                  h-14
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  px-5
                  pr-10
                  outline-none
                  focus:border-[#D4AF37]
                  font-semibold
                  text-gray-700
                "
              >
                <option value="latest">
                  Latest Products
                </option>

                <option value="price-low">
                  Price: Low to High
                </option>

                <option value="price-high">
                  Price: High to Low
                </option>

                <option value="rating">
                  Highest Rated
                </option>

                <option value="discount">
                  Biggest Discount
                </option>
              </select>

              <ChevronDown
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
              />

            </div>

            {/* FILTER BUTTON */}

            {brands.length > 0 && (
              <button
                type="button"
                onClick={() =>
                  setShowFilters(!showFilters)
                }
                className="
                  h-14
                  px-6
                  rounded-2xl
                  border-2
                  border-gray-200
                  bg-white
                  hover:border-[#D4AF37]
                  hover:text-[#B79524]
                  font-bold
                  flex
                  items-center
                  justify-center
                  gap-2
                  transition
                "
              >
                <SlidersHorizontal size={18} />
                Filters
              </button>
            )}

          </div>

          {/* FILTER PANEL */}

          {showFilters && brands.length > 0 && (
            <div className="mt-4 p-5 rounded-2xl border border-gray-100 bg-gray-50">

              <p className="text-sm font-black text-gray-700 mb-3">
                Filter by Brand
              </p>

              <div className="flex flex-wrap gap-2">

                <button
                  type="button"
                  onClick={() =>
                    setSelectedBrand("all")
                  }
                  className={`
                    px-4
                    py-2
                    rounded-full
                    text-sm
                    font-bold
                    transition
                    ${
                      selectedBrand === "all"
                        ? "bg-[#D4AF37] text-white"
                        : "bg-white border border-gray-200 text-gray-600 hover:border-[#D4AF37]"
                    }
                  `}
                >
                  All Brands
                </button>

                {brands.map((brand) => (
                  <button
                    key={brand}
                    type="button"
                    onClick={() =>
                      setSelectedBrand(brand)
                    }
                    className={`
                      px-4
                      py-2
                      rounded-full
                      text-sm
                      font-bold
                      transition
                      ${
                        selectedBrand === brand
                          ? "bg-[#D4AF37] text-white"
                          : "bg-white border border-gray-200 text-gray-600 hover:border-[#D4AF37]"
                      }
                    `}
                  >
                    {brand}
                  </button>
                ))}

              </div>
            </div>
          )}

        </div>
      </section>

      {/* =====================================================
          PRODUCTS
      ===================================================== */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

        {/* RESULT INFO */}

        <div className="flex items-center justify-between gap-4 mb-6">

          <div>
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-black text-gray-900">
                {filteredProducts.length}
              </span>{" "}
              products
            </p>
          </div>

          {(search || selectedBrand !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSelectedBrand("all");
              }}
              className="text-sm font-bold text-[#B79524] hover:text-black transition"
            >
              Clear Filters
            </button>
          )}

        </div>

        {/* EMPTY */}

        {filteredProducts.length === 0 ? (
          <div className="min-h-[400px] rounded-[30px] bg-white border border-gray-100 flex items-center justify-center">

            <div className="text-center px-6">

              <div className="w-20 h-20 rounded-3xl bg-gray-50 flex items-center justify-center mx-auto">

                <Search
                  size={32}
                  className="text-gray-400"
                />

              </div>

              <h2 className="text-2xl font-black mt-5">
                No Products Found
              </h2>

              <p className="text-gray-500 mt-2">
                Try searching for another product or brand.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedBrand("all");
                }}
                className="mt-5 px-6 h-11 rounded-xl bg-[#D4AF37] text-white font-bold hover:bg-black transition"
              >
                View All Products
              </button>

            </div>

          </div>
        ) : (

          /* =================================================
             GRID
          ================================================= */

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">

            {filteredProducts.map((product) => {

              const price = Number(product.price);

              const originalPrice =
                product.original_price !== null
                  ? Number(product.original_price)
                  : null;

              const rating =
                Number(product.rating ?? 4.5);

              const reviews =
                Number(product.reviews_count ?? 0);

              const discount =
                originalPrice &&
                originalPrice > price
                  ? Math.round(
                      ((originalPrice - price) /
                        originalPrice) *
                        100
                    )
                  : 0;

              const outOfStock =
                Number(product.stock ?? 0) <= 0;

              return (
                <article
                  key={product.id}
                  className="
                    group
                    bg-white
                    rounded-[26px]
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

                  {/* =================================================
                     IMAGE
                  ================================================= */}

                  <div className="relative">

                    <Link
                      href={`/dashboard/products/${product.id}`}
                      className="block"
                    >

                      <div className="relative h-[285px] bg-gray-50 overflow-hidden">

                        {/* BADGE */}

                        {product.is_flash_sale ? (
                          <span className="absolute top-4 left-4 z-10 bg-red-500 text-white px-3 py-1.5 rounded-full text-[11px] font-black">
                            FLASH SALE
                          </span>
                        ) : discount > 0 ? (
                          <span className="absolute top-4 left-4 z-10 bg-black text-white px-3 py-1.5 rounded-full text-[11px] font-black">
                            {discount}% OFF
                          </span>
                        ) : null}

                        {/* FEATURED */}

                        {product.is_featured &&
                          !product.is_flash_sale && (
                            <span className="absolute top-4 left-4 z-10 bg-[#D4AF37] text-white px-3 py-1.5 rounded-full text-[11px] font-black">
                              FEATURED
                            </span>
                          )}

                        {/* IMAGE */}

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
                          <div className="h-full flex items-center justify-center text-gray-400">
                            <ShoppingCart size={42} />
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
                      aria-label="Wishlist"
                      className="
                        absolute
                        top-4
                        right-4
                        z-20
                        w-10
                        h-10
                        rounded-full
                        bg-white
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

                  {/* =================================================
                     CONTENT
                  ================================================= */}

                  <div className="p-5">

                    {/* BRAND */}

                    {product.brand && (
                      <p className="text-[11px] uppercase tracking-wider text-[#B79524] font-black">
                        {product.brand}
                      </p>
                    )}

                    {/* NAME */}

                    <Link
                      href={`/dashboard/products/${product.id}`}
                    >
                      <h2 className="font-black text-lg leading-6 mt-1 line-clamp-2 hover:text-[#D4AF37] transition">
                        {product.name}
                      </h2>
                    </Link>

                    {/* DESCRIPTION */}

                    <p className="text-sm text-gray-500 mt-2 line-clamp-2 min-h-[40px]">
                      {product.short_description ||
                        product.description ||
                        "Premium quality product from PrimeCart."}
                    </p>

                    {/* RATING */}

                    <div className="flex items-center gap-2 mt-4">

                      <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded-lg text-xs font-black">

                        <Star
                          size={13}
                          className="fill-white"
                        />

                        {rating.toFixed(1)}
                      </div>

                      <span className="text-xs text-gray-500">
                        ({reviews})
                      </span>

                    </div>

                    {/* PRICE */}

                    <div className="flex items-center flex-wrap gap-2 mt-4">

                      <span className="text-2xl font-black text-gray-950">
                        ₹{price.toLocaleString("en-IN")}
                      </span>

                      {originalPrice &&
                        originalPrice > price && (
                          <span className="text-sm text-gray-400 line-through">
                            ₹
                            {originalPrice.toLocaleString(
                              "en-IN"
                            )}
                          </span>
                        )}

                    </div>

                    {/* STOCK */}

                    <div className="mt-2">

                      {outOfStock ? (
                        <span className="text-xs font-bold text-red-500">
                          Out of Stock
                        </span>
                      ) : Number(product.stock) <= 5 ? (
                        <span className="text-xs font-bold text-orange-500">
                          Only {product.stock} left
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-green-600">
                          In Stock
                        </span>
                      )}

                    </div>

                    {/* VIEW PRODUCT */}

                    <Link
                      href={`/dashboard/products/${product.id}`}
                      className="
                        mt-4
                        h-11
                        w-full
                        rounded-xl
                        bg-[#D4AF37]
                        hover:bg-black
                        text-white
                        font-black
                        flex
                        items-center
                        justify-center
                        transition
                      "
                    >
                      View Product
                    </Link>

                  </div>

                </article>
              );
            })}

          </div>
        )}

      </section>

    </main>
  );
}
