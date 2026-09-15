"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Filter,
  Grid3X3,
  LayoutGrid,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
  ArrowLeft,
  ShoppingBag,
} from "lucide-react";

import Navbar from "@/components/layout/navbar";
import TopBar from "@/components/layout/top-bar";
import Footer from "@/components/layout/footer";

import ProductCard from "@/components/products/product-card";
import { getProducts, type Product } from "@/lib/products";

type SortOption =
  | "newest"
  | "price-low"
  | "price-high"
  | "name";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<SortOption>("newest");

  const [showFilters, setShowFilters] = useState(false);
  const [gridSize, setGridSize] =
    useState<"normal" | "large">("normal");

  /* =========================================================
     LOAD PRODUCTS FROM DATABASE
  ========================================================= */

  useEffect(() => {
    let mounted = true;

    async function loadProducts() {
      try {
        setLoading(true);

        const data = await getProducts();

        if (mounted) {
          setProducts(data || []);
        }
      } catch (error) {
        console.error("Products loading error:", error);

        if (mounted) {
          setProducts([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      mounted = false;
    };
  }, []);

  /* =========================================================
     DYNAMIC CATEGORIES
  ========================================================= */

  const categories = useMemo(() => {
    const uniqueCategories = products
      .map((product) => product.category?.trim())
      .filter(
        (value): value is string => Boolean(value)
      );

    return [
      "All",
      ...Array.from(new Set(uniqueCategories)),
    ];
  }, [products]);

  /* =========================================================
     SEARCH + FILTER + SORT
  ========================================================= */

  const filteredProducts = useMemo(() => {
    let result = [...products];

    const searchValue = search.trim().toLowerCase();

    if (searchValue) {
      result = result.filter((product) => {
        const name =
          product.name?.toLowerCase() || "";

        const brand =
          product.brand?.toLowerCase() || "";

        const productCategory =
          product.category?.toLowerCase() || "";

        const shortDescription =
          product.short_description?.toLowerCase() || "";

        const description =
          product.description?.toLowerCase() || "";

        return (
          name.includes(searchValue) ||
          brand.includes(searchValue) ||
          productCategory.includes(searchValue) ||
          shortDescription.includes(searchValue) ||
          description.includes(searchValue)
        );
      });
    }

    if (category !== "All") {
      result = result.filter(
        (product) =>
          product.category === category
      );
    }

    switch (sort) {
      case "price-low":
        result.sort(
          (a, b) =>
            Number(a.price || 0) -
            Number(b.price || 0)
        );
        break;

      case "price-high":
        result.sort(
          (a, b) =>
            Number(b.price || 0) -
            Number(a.price || 0)
        );
        break;

      case "name":
        result.sort((a, b) =>
          (a.name || "").localeCompare(
            b.name || ""
          )
        );
        break;

      case "newest":
      default:
        result.sort((a, b) => {
          const dateA = a.created_at
            ? new Date(a.created_at).getTime()
            : 0;

          const dateB = b.created_at
            ? new Date(b.created_at).getTime()
            : 0;

          return dateB - dateA;
        });
        break;
    }

    return result;
  }, [
    products,
    search,
    category,
    sort,
  ]);

  /* =========================================================
     CLEAR FILTERS
  ========================================================= */

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setSort("newest");
  };

  const hasActiveFilters =
    search.trim() !== "" ||
    category !== "All" ||
    sort !== "newest";

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="min-h-screen bg-[#faf8f3] text-gray-900 dark:bg-[#050505] dark:text-white">

      {/* =====================================================
          SAME DASHBOARD HEADER
      ===================================================== */}

      <TopBar />
      <Navbar />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1500px]">

          {/* =================================================
              BREADCRUMB
          ================================================= */}

          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-[#B28D1A] dark:hover:text-[#D4AF37]"
            >
              <ArrowLeft size={15} />
              Dashboard
            </Link>

            <span>/</span>

            <span className="font-semibold text-gray-900 dark:text-white">
              Products
            </span>
          </div>

          {/* =================================================
              HERO / PAGE HEADER
          ================================================= */}

          <section className="relative overflow-hidden rounded-[30px] border border-gray-200 bg-white px-6 py-8 shadow-sm dark:border-white/10 dark:bg-[#101010] sm:px-8 sm:py-10 lg:px-10">

            {/* Decorative Gold Glow */}

            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#D4AF37]/10 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-[#D4AF37]/5 blur-3xl" />

            <div className="relative z-10 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">

              <div>

                {/* Badge */}

                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#9B7712] dark:text-[#D4AF37]">

                  <Sparkles size={13} />

                  PrimeCart Collection

                </div>

                <h1 className="text-3xl font-black tracking-tight text-gray-950 dark:text-white sm:text-4xl lg:text-5xl">
                  All Products
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 dark:text-gray-400 sm:text-base">
                  Explore our complete collection of
                  premium products, latest arrivals,
                  exclusive deals and everyday
                  essentials — all in one place.
                </p>

              </div>

              {/* Product Stats */}

              <div className="grid grid-cols-2 gap-3">

                <div className="min-w-[115px] rounded-2xl border border-gray-200 bg-gray-50 px-5 py-3 dark:border-white/10 dark:bg-white/5">

                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Showing
                  </p>

                  <p className="mt-1 text-xl font-black text-gray-900 dark:text-white">
                    {loading
                      ? "—"
                      : filteredProducts.length}
                  </p>

                </div>

                <div className="min-w-[115px] rounded-2xl border border-gray-200 bg-gray-50 px-5 py-3 dark:border-white/10 dark:bg-white/5">

                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Total
                  </p>

                  <p className="mt-1 text-xl font-black text-gray-900 dark:text-white">
                    {loading
                      ? "—"
                      : products.length}
                  </p>

                </div>

              </div>

            </div>
          </section>

          {/* =================================================
              SEARCH + FILTER TOOLBAR
          ================================================= */}

          <section className="sticky top-4 z-30 mt-6 rounded-2xl border border-gray-200 bg-white/95 p-3 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-[#0d0d0d]/95">

            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">

              {/* SEARCH */}

              <div className="relative min-w-0 flex-1">

                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search products, brands or categories..."
                  className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-10 text-sm font-medium text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-gray-600"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-200 hover:text-gray-700 dark:hover:bg-white/10 dark:hover:text-white"
                    aria-label="Clear search"
                  >
                    <X size={15} />
                  </button>
                )}

              </div>

              {/* CATEGORY */}

              <div className="relative hidden lg:block">

                <select
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value)
                  }
                  className="h-12 min-w-[190px] appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 pr-10 text-sm font-semibold text-gray-800 outline-none transition focus:border-[#D4AF37] dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                >
                  {categories.map((item) => (
                    <option
                      key={item}
                      value={item}
                      className="bg-white text-black dark:bg-black dark:text-white"
                    >
                      {item === "All"
                        ? "All Categories"
                        : item}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

              </div>

              {/* SORT */}

              <div className="relative">

                <select
                  value={sort}
                  onChange={(event) =>
                    setSort(
                      event.target.value as SortOption
                    )
                  }
                  className="h-12 min-w-[180px] appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 pr-10 text-sm font-semibold text-gray-800 outline-none transition focus:border-[#D4AF37] dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                >
                  <option value="newest">
                    Newest
                  </option>

                  <option value="price-low">
                    Price: Low to High
                  </option>

                  <option value="price-high">
                    Price: High to Low
                  </option>

                  <option value="name">
                    Name: A to Z
                  </option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

              </div>

              {/* MOBILE FILTER */}

              <button
                type="button"
                onClick={() =>
                  setShowFilters((value) => !value)
                }
                className="flex h-12 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm font-bold text-gray-800 transition hover:border-[#D4AF37] dark:border-white/10 dark:bg-white/[0.04] dark:text-white lg:hidden"
              >
                <SlidersHorizontal size={17} />
                Filters
              </button>

              {/* GRID SWITCHER */}

              <div className="hidden items-center rounded-xl border border-gray-200 bg-gray-50 p-1 dark:border-white/10 dark:bg-white/[0.04] sm:flex">

                <button
                  type="button"
                  onClick={() =>
                    setGridSize("normal")
                  }
                  className={`flex h-10 w-10 items-center justify-center rounded-lg transition ${
                    gridSize === "normal"
                      ? "bg-[#D4AF37] text-black shadow-sm"
                      : "text-gray-400 hover:text-gray-700 dark:hover:text-white"
                  }`}
                  aria-label="Four column grid"
                >
                  <Grid3X3 size={17} />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setGridSize("large")
                  }
                  className={`flex h-10 w-10 items-center justify-center rounded-lg transition ${
                    gridSize === "large"
                      ? "bg-[#D4AF37] text-black shadow-sm"
                      : "text-gray-400 hover:text-gray-700 dark:hover:text-white"
                  }`}
                  aria-label="Three column grid"
                >
                  <LayoutGrid size={17} />
                </button>

              </div>

            </div>

            {/* =================================================
                MOBILE FILTER PANEL
            ================================================= */}

            {showFilters && (
              <div className="mt-3 grid grid-cols-1 gap-3 border-t border-gray-100 pt-3 dark:border-white/10 sm:grid-cols-2 lg:hidden">

                <div>

                  <label className="mb-2 block text-xs font-bold text-gray-500 dark:text-gray-400">
                    Category
                  </label>

                  <select
                    value={category}
                    onChange={(event) =>
                      setCategory(event.target.value)
                    }
                    className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm font-semibold outline-none dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                  >
                    {categories.map((item) => (
                      <option
                        key={item}
                        value={item}
                        className="bg-white text-black"
                      >
                        {item === "All"
                          ? "All Categories"
                          : item}
                      </option>
                    ))}
                  </select>

                </div>

                <div>

                  <label className="mb-2 block text-xs font-bold text-gray-500 dark:text-gray-400">
                    Sort By
                  </label>

                  <select
                    value={sort}
                    onChange={(event) =>
                      setSort(
                        event.target.value as SortOption
                      )
                    }
                    className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm font-semibold outline-none dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                  >
                    <option value="newest">
                      Newest
                    </option>

                    <option value="price-low">
                      Price: Low to High
                    </option>

                    <option value="price-high">
                      Price: High to Low
                    </option>

                    <option value="name">
                      Name: A to Z
                    </option>
                  </select>

                </div>

              </div>
            )}

            {/* =================================================
                ACTIVE FILTERS
            ================================================= */}

            {hasActiveFilters && (
              <div className="mt-3 flex flex-wrap items-center gap-2">

                <span className="text-xs font-semibold text-gray-400">
                  Active:
                </span>

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-700 dark:bg-white/10 dark:text-gray-200"
                  >
                    Search: {search}
                    <X size={12} />
                  </button>
                )}

                {category !== "All" && (
                  <button
                    type="button"
                    onClick={() => setCategory("All")}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37]/15 px-3 py-1.5 text-xs font-bold text-[#8C6B0F] dark:text-[#D4AF37]"
                  >
                    {category}
                    <X size={12} />
                  </button>
                )}

                {sort !== "newest" && (
                  <button
                    type="button"
                    onClick={() =>
                      setSort("newest")
                    }
                    className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-700 dark:bg-white/10 dark:text-gray-200"
                  >
                    Sorted
                    <X size={12} />
                  </button>
                )}

                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs font-bold text-red-500 transition hover:text-red-600"
                >
                  Clear all
                </button>

              </div>
            )}

          </section>

          {/* =================================================
              RESULTS HEADER
          ================================================= */}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <h2 className="text-xl font-black text-gray-900 dark:text-white">
                {category === "All"
                  ? "Explore Products"
                  : category}
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {loading
                  ? "Loading products..."
                  : `${filteredProducts.length} ${
                      filteredProducts.length === 1
                        ? "product"
                        : "products"
                    } available`}
              </p>

            </div>

            <div className="hidden items-center gap-2 text-xs font-medium text-gray-400 sm:flex">
              <ShoppingBag size={14} />
              PrimeCart Store
            </div>

          </div>

          {/* =================================================
              LOADING
          ================================================= */}

          {loading ? (
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {Array.from({ length: 8 }).map(
                (_, index) => (
                  <ProductSkeleton
                    key={index}
                  />
                )
              )}

            </div>
          ) : filteredProducts.length === 0 ? (

            /* =================================================
               EMPTY STATE
            ================================================= */

            <section className="mt-6 rounded-[28px] border border-gray-200 bg-white px-6 py-16 text-center shadow-sm dark:border-white/10 dark:bg-[#101010]">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gray-100 text-gray-400 dark:bg-white/5 dark:text-gray-500">
                <Search size={34} />
              </div>

              <h3 className="mt-6 text-2xl font-black text-gray-900 dark:text-white">
                No products found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">
                We couldn't find any products
                matching your current search or
                filters. Try another search or
                category.
              </p>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#D4AF37] px-5 py-3 text-sm font-extrabold text-black transition hover:bg-[#C9A227]"
                >
                  <X size={16} />
                  Clear Filters
                </button>
              )}

            </section>

          ) : (

            /* =================================================
               PRODUCT GRID
            ================================================= */

            <div
              className={`mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 ${
                gridSize === "large"
                  ? "lg:grid-cols-3"
                  : "lg:grid-cols-3 xl:grid-cols-4"
              }`}
            >

              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}

            </div>

          )}

          {/* =================================================
              BOTTOM PROMO
          ================================================= */}

          {!loading &&
            filteredProducts.length > 0 && (
              <section className="relative mt-12 overflow-hidden rounded-[30px] bg-[#111111] px-6 py-9 text-white sm:px-8 sm:py-10 lg:px-10">

                <div className="pointer-events-none absolute -right-20 -top-32 h-72 w-72 rounded-full bg-[#D4AF37]/20 blur-3xl" />

                <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                  <div>

                    <div className="flex items-center gap-2 text-[#D4AF37]">

                      <Sparkles size={17} />

                      <span className="text-xs font-extrabold uppercase tracking-[0.16em]">
                        PrimeCart Promise
                      </span>

                    </div>

                    <h3 className="mt-2 text-2xl font-black sm:text-3xl">
                      Shop with confidence.
                    </h3>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-white/60">
                      Quality products, secure
                      checkout and a seamless
                      shopping experience —
                      all from PrimeCart.
                    </p>

                  </div>

                  <Link
                    href="/dashboard"
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-6 py-3 text-sm font-extrabold text-black transition hover:bg-[#C9A227]"
                  >
                    <ArrowLeft size={16} />
                    Back to Dashboard
                  </Link>

                </div>

              </section>
            )}

        </div>
      </main>

      {/* =====================================================
          SAME DASHBOARD FOOTER
      ===================================================== */}

      <Footer />

    </div>
  );
}

/* =========================================================
   PRODUCT SKELETON
========================================================= */

function ProductSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#101010]">

      {/* Image */}

      <div className="h-64 animate-pulse bg-gray-100 dark:bg-white/5" />

      {/* Details */}

      <div className="space-y-4 p-5">

        <div className="h-3 w-20 animate-pulse rounded bg-gray-200 dark:bg-white/10" />

        <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-white/10" />

        <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-white/10" />

        <div className="h-8 w-32 animate-pulse rounded bg-gray-200 dark:bg-white/10" />

        <div className="grid grid-cols-2 gap-3">

          <div className="h-11 animate-pulse rounded-xl bg-gray-200 dark:bg-white/10" />

          <div className="h-11 animate-pulse rounded-xl bg-gray-200 dark:bg-white/10" />

        </div>

      </div>

    </div>
  );
}
