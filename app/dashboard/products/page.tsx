"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronDown,
  Grid3X3,
  LayoutGrid,
  Search,
  SlidersHorizontal,
  X,
  Truck,
  RotateCcw,
  ShieldCheck,
  Tag,
  Headphones,
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

type RatingFilter = 0 | 1 | 2 | 3 | 4;

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<SortOption>("newest");

  const [selectedBrands, setSelectedBrands] =
    useState<string[]>([]);

  const [ratingFilter, setRatingFilter] =
    useState<RatingFilter>(0);

  const [availability, setAvailability] =
    useState<"all" | "in-stock" | "out-stock">("all");

  const [discountFilter, setDiscountFilter] =
    useState<string>("all");

  const [showFilters, setShowFilters] = useState(false);

  const [gridSize, setGridSize] =
    useState<"normal" | "large">("normal");

  /*
   * =========================================================
   * LOAD PRODUCTS
   * =========================================================
   */

  useEffect(() => {
    let mounted = true;

    const loadProducts = async () => {
      try {
        setLoading(true);

        const data = await getProducts();

        if (mounted) {
          setProducts(Array.isArray(data) ? data : []);
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
    };

    loadProducts();

    return () => {
      mounted = false;
    };
  }, []);

  /*
   * =========================================================
   * CATEGORIES
   * =========================================================
   */

  const categories = useMemo(() => {
    const values = products
      .map((product) => product.category?.trim())
      .filter(
        (value): value is string => Boolean(value)
      );

    return [
      "All",
      ...Array.from(new Set(values)),
    ];
  }, [products]);

  /*
   * =========================================================
   * BRANDS
   * =========================================================
   */

  const brands = useMemo(() => {
    const values = products
      .map((product) => product.brand?.trim())
      .filter(
        (value): value is string => Boolean(value)
      );

    return Array.from(new Set(values)).sort();
  }, [products]);

  /*
   * =========================================================
   * DISCOUNT CALCULATION
   * =========================================================
   */

  const getDiscount = (product: Product) => {
    const price = Number(product.price || 0);
    const originalPrice = Number(
      product.original_price || 0
    );

    if (
      !price ||
      !originalPrice ||
      originalPrice <= price
    ) {
      return 0;
    }

    return Math.round(
      ((originalPrice - price) / originalPrice) * 100
    );
  };

  /*
   * =========================================================
   * FILTER + SORT
   * =========================================================
   */

  const filteredProducts = useMemo(() => {
    let result = [...products];

    /*
     * SEARCH
     */

    const searchValue = search
      .trim()
      .toLowerCase();

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

        return (
          name.includes(searchValue) ||
          brand.includes(searchValue) ||
          productCategory.includes(searchValue) ||
          shortDescription.includes(searchValue)
        );
      });
    }

    /*
     * CATEGORY
     */

    if (category !== "All") {
      result = result.filter(
        (product) =>
          product.category === category
      );
    }

    /*
     * BRAND
     */

    if (selectedBrands.length > 0) {
      result = result.filter((product) =>
        selectedBrands.includes(
          product.brand || ""
        )
      );
    }

    /*
     * RATING
     */

    if (ratingFilter > 0) {
      result = result.filter(
        (product) =>
          Number(product.rating || 0) >=
          ratingFilter
      );
    }

    /*
     * AVAILABILITY
     */

    if (availability === "in-stock") {
      result = result.filter(
        (product) =>
          Number(product.stock || 0) > 0
      );
    }

    if (availability === "out-stock") {
      result = result.filter(
        (product) =>
          Number(product.stock || 0) <= 0
      );
    }

    /*
     * DISCOUNT
     */

    if (discountFilter !== "all") {
      result = result.filter((product) => {
        const discount = getDiscount(product);

        if (discountFilter === "10-20") {
          return discount >= 10 && discount < 20;
        }

        if (discountFilter === "20-40") {
          return discount >= 20 && discount < 40;
        }

        if (discountFilter === "40-60") {
          return discount >= 40 && discount < 60;
        }

        if (discountFilter === "60") {
          return discount >= 60;
        }

        return true;
      });
    }

    /*
     * SORT
     */

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
    selectedBrands,
    ratingFilter,
    availability,
    discountFilter,
    sort,
  ]);

  /*
   * =========================================================
   * BRAND TOGGLE
   * =========================================================
   */

  const toggleBrand = (brand: string) => {
    setSelectedBrands((current) =>
      current.includes(brand)
        ? current.filter((item) => item !== brand)
        : [...current, brand]
    );
  };

  /*
   * =========================================================
   * CLEAR FILTERS
   * =========================================================
   */

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setSort("newest");
    setSelectedBrands([]);
    setRatingFilter(0);
    setAvailability("all");
    setDiscountFilter("all");
  };

  const hasActiveFilters =
    search.trim() !== "" ||
    category !== "All" ||
    sort !== "newest" ||
    selectedBrands.length > 0 ||
    ratingFilter !== 0 ||
    availability !== "all" ||
    discountFilter !== "all";

  /*
   * =========================================================
   * FILTER SIDEBAR
   * =========================================================
   */

  const FilterSidebar = () => {
    return (
      <aside className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#101010]">

        {/* Filter Header */}

        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-white/10">

          <h2 className="text-lg font-black text-gray-900 dark:text-white">
            Filters
          </h2>

          <button
            type="button"
            onClick={clearFilters}
            className="text-xs font-bold text-[#B28D1A] transition hover:text-[#8F6F10] dark:text-[#D4AF37]"
          >
            Clear All
          </button>

        </div>

        <div className="p-5">

          {/* =================================================
              CATEGORIES
          ================================================= */}

          <FilterSection title="Categories">

            <div className="space-y-3">

              {categories.map((item) => {
                const count =
                  item === "All"
                    ? products.length
                    : products.filter(
                        (product) =>
                          product.category === item
                      ).length;

                return (
                  <label
                    key={item}
                    className="flex cursor-pointer items-center justify-between gap-3 text-sm"
                  >

                    <span className="flex min-w-0 items-center gap-2">

                      <input
                        type="radio"
                        name="category"
                        checked={category === item}
                        onChange={() =>
                          setCategory(item)
                        }
                        className="h-4 w-4 accent-[#D4AF37]"
                      />

                      <span
                        className={`truncate ${
                          category === item
                            ? "font-bold text-gray-900 dark:text-white"
                            : "text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        {item === "All"
                          ? "All Products"
                          : item}
                      </span>

                    </span>

                    <span className="text-xs text-gray-400">
                      {count}
                    </span>

                  </label>
                );
              })}

            </div>

          </FilterSection>

          {/* =================================================
              PRICE
          ================================================= */}

          <FilterSection title="Price Range">

            <div className="pt-2">

              <div className="relative h-2 rounded-full bg-gray-200 dark:bg-white/10">

                <div className="absolute left-0 right-0 top-0 h-2 rounded-full bg-[#D4AF37]" />

                <span className="absolute -left-1 -top-1 h-4 w-4 rounded-full border-2 border-[#D4AF37] bg-white shadow dark:bg-[#101010]" />

                <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full border-2 border-[#D4AF37] bg-white shadow dark:bg-[#101010]" />

              </div>

              <div className="mt-4 flex items-center justify-between text-xs font-semibold text-gray-500 dark:text-gray-400">

                <span>₹0</span>

                <span>₹50,000+</span>

              </div>

            </div>

          </FilterSection>

          {/* =================================================
              BRANDS
          ================================================= */}

          {brands.length > 0 && (
            <FilterSection title="Brand">

              <div className="space-y-3">

                {brands.slice(0, 8).map((brand) => {
                  const count =
                    products.filter(
                      (product) =>
                        product.brand === brand
                    ).length;

                  return (
                    <label
                      key={brand}
                      className="flex cursor-pointer items-center justify-between gap-3 text-sm"
                    >

                      <span className="flex items-center gap-2">

                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(
                            brand
                          )}
                          onChange={() =>
                            toggleBrand(brand)
                          }
                          className="h-4 w-4 rounded accent-[#D4AF37]"
                        />

                        <span className="text-gray-600 dark:text-gray-400">
                          {brand}
                        </span>

                      </span>

                      <span className="text-xs text-gray-400">
                        {count}
                      </span>

                    </label>
                  );
                })}

              </div>

              {brands.length > 8 && (
                <button
                  type="button"
                  className="mt-3 text-xs font-bold text-[#B28D1A] dark:text-[#D4AF37]"
                >
                  + Show more
                </button>
              )}

            </FilterSection>
          )}

          {/* =================================================
              RATING
          ================================================= */}

          <FilterSection title="Rating">

            <div className="space-y-3">

              {[4, 3, 2, 1].map((rating) => (
                <label
                  key={rating}
                  className="flex cursor-pointer items-center gap-3"
                >

                  <input
                    type="radio"
                    name="rating"
                    checked={
                      ratingFilter === rating
                    }
                    onChange={() =>
                      setRatingFilter(
                        rating as RatingFilter
                      )
                    }
                    className="h-4 w-4 accent-[#D4AF37]"
                  />

                  <span className="flex items-center text-sm">

                    <span className="mr-1 tracking-wide text-[#E0A800]">
                      {"★".repeat(rating)}
                    </span>

                    <span className="text-gray-400">
                      & above
                    </span>

                  </span>

                </label>
              ))}

              {ratingFilter > 0 && (
                <button
                  type="button"
                  onClick={() =>
                    setRatingFilter(0)
                  }
                  className="text-xs font-bold text-[#B28D1A] dark:text-[#D4AF37]"
                >
                  Clear rating
                </button>
              )}

            </div>

          </FilterSection>

          {/* =================================================
              AVAILABILITY
          ================================================= */}

          <FilterSection title="Availability">

            <div className="space-y-3">

              <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600 dark:text-gray-400">

                <input
                  type="radio"
                  name="availability"
                  checked={
                    availability === "in-stock"
                  }
                  onChange={() =>
                    setAvailability("in-stock")
                  }
                  className="h-4 w-4 accent-[#D4AF37]"
                />

                In Stock

              </label>

              <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600 dark:text-gray-400">

                <input
                  type="radio"
                  name="availability"
                  checked={
                    availability === "out-stock"
                  }
                  onChange={() =>
                    setAvailability("out-stock")
                  }
                  className="h-4 w-4 accent-[#D4AF37]"
                />

                Out of Stock

              </label>

            </div>

          </FilterSection>

          {/* =================================================
              DISCOUNT
          ================================================= */}

          <FilterSection title="Discount">

            <div className="space-y-3">

              {[
                ["10-20", "10% - 20%"],
                ["20-40", "20% - 40%"],
                ["40-60", "40% - 60%"],
                ["60", "Above 60%"],
              ].map(([value, label]) => (
                <label
                  key={value}
                  className="flex cursor-pointer items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                >

                  <input
                    type="radio"
                    name="discount"
                    checked={
                      discountFilter === value
                    }
                    onChange={() =>
                      setDiscountFilter(value)
                    }
                    className="h-4 w-4 accent-[#D4AF37]"
                  />

                  {label}

                </label>
              ))}

            </div>

          </FilterSection>

        </div>
      </aside>
    );
  };

  /*
   * =========================================================
   * PAGE
   * =========================================================
   */

  return (
    <div className="min-h-screen bg-[#faf8f3] text-gray-900 dark:bg-[#050505] dark:text-white">

      {/* HEADER */}

      <TopBar />
      <Navbar />

      {/* MAIN */}

      <main className="px-4 pb-16 pt-5 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-[1500px]">

          {/* =================================================
              BREADCRUMB
          ================================================= */}

          <div className="mb-5 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 transition hover:text-[#B28D1A] dark:hover:text-[#D4AF37]"
            >
              <ArrowLeft size={15} />
              Home
            </Link>

            <span>›</span>

            <span className="font-semibold text-gray-800 dark:text-white">
              All Products
            </span>

          </div>

          {/* =================================================
              PAGE TITLE
          ================================================= */}

          <section className="mb-5 rounded-2xl border border-gray-200 bg-white px-5 py-5 shadow-sm dark:border-white/10 dark:bg-[#101010] sm:px-6">

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                  All Products
                </h1>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Discover amazing products from top brands at the best prices.
                </p>

              </div>

              <div className="hidden rounded-xl bg-[#D4AF37]/10 px-4 py-2 text-xs font-bold text-[#8C6B0F] dark:text-[#D4AF37] sm:block">
                {products.length} Products
              </div>

            </div>

          </section>

          {/* =================================================
              MOBILE FILTER BUTTON
          ================================================= */}

          <button
            type="button"
            onClick={() =>
              setShowFilters((value) => !value)
            }
            className="mb-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white text-sm font-bold text-gray-800 shadow-sm dark:border-white/10 dark:bg-[#101010] dark:text-white lg:hidden"
          >
            <SlidersHorizontal size={17} />
            {showFilters
              ? "Hide Filters"
              : "Show Filters"}
          </button>

          {/* =================================================
              MAIN SHOP AREA
          ================================================= */}

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[235px_minmax(0,1fr)]">

            {/* DESKTOP SIDEBAR */}

            <div className="hidden lg:block">
              <FilterSidebar />
            </div>

            {/* MOBILE SIDEBAR */}

            {showFilters && (
              <div className="lg:hidden">
                <FilterSidebar />
              </div>
            )}

            {/* PRODUCTS SIDE */}

            <section className="min-w-0">

              {/* =================================================
                  TOOLBAR
              ================================================= */}

              <div className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm dark:border-white/10 dark:bg-[#101010]">

                <div className="flex flex-col gap-3 md:flex-row md:items-center">

                  {/* SEARCH */}

                  <div className="relative min-w-0 flex-1">

                    <Search
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="text"
                      value={search}
                      onChange={(event) =>
                        setSearch(
                          event.target.value
                        )
                      }
                      placeholder="Search products..."
                      className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-10 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                    />

                    {search && (
                      <button
                        type="button"
                        onClick={() =>
                          setSearch("")
                        }
                        className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10"
                      >
                        <X size={14} />
                      </button>
                    )}

                  </div>

                  {/* SORT */}

                  <div className="relative">

                    <select
                      value={sort}
                      onChange={(event) =>
                        setSort(
                          event.target
                            .value as SortOption
                        )
                      }
                      className="h-11 w-full min-w-[180px] appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 pr-10 text-sm font-semibold text-gray-800 outline-none focus:border-[#D4AF37] dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                    >
                      <option value="newest">
                        Sort by: Newest
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
                      size={15}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                  </div>

                  {/* GRID */}

                  <div className="hidden items-center rounded-xl border border-gray-200 bg-gray-50 p-1 dark:border-white/10 dark:bg-white/[0.04] sm:flex">

                    <button
                      type="button"
                      onClick={() =>
                        setGridSize("normal")
                      }
                      className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                        gridSize === "normal"
                          ? "bg-[#D4AF37] text-black"
                          : "text-gray-400"
                      }`}
                      aria-label="Grid view"
                    >
                      <Grid3X3 size={17} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setGridSize("large")
                      }
                      className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                        gridSize === "large"
                          ? "bg-[#D4AF37] text-black"
                          : "text-gray-400"
                      }`}
                      aria-label="Large grid view"
                    >
                      <LayoutGrid size={17} />
                    </button>

                  </div>

                </div>

                {/* ACTIVE FILTERS */}

                {hasActiveFilters && (
                  <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-3 dark:border-white/10">

                    <span className="text-xs font-bold text-gray-400">
                      Active:
                    </span>

                    {search && (
                      <button
                        type="button"
                        onClick={() =>
                          setSearch("")
                        }
                        className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-700 dark:bg-white/10 dark:text-gray-200"
                      >
                        Search: {search}
                        <X
                          size={11}
                          className="ml-1 inline"
                        />
                      </button>
                    )}

                    {category !== "All" && (
                      <button
                        type="button"
                        onClick={() =>
                          setCategory("All")
                        }
                        className="rounded-full bg-[#D4AF37]/15 px-3 py-1.5 text-xs font-bold text-[#8C6B0F] dark:text-[#D4AF37]"
                      >
                        {category}
                        <X
                          size={11}
                          className="ml-1 inline"
                        />
                      </button>
                    )}

                    {selectedBrands.map(
                      (brand) => (
                        <button
                          key={brand}
                          type="button"
                          onClick={() =>
                            toggleBrand(brand)
                          }
                          className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-700 dark:bg-white/10 dark:text-gray-200"
                        >
                          {brand}
                          <X
                            size={11}
                            className="ml-1 inline"
                          />
                        </button>
                      )
                    )}

                    <button
                      type="button"
                      onClick={clearFilters}
                      className="text-xs font-bold text-red-500"
                    >
                      Clear all
                    </button>

                  </div>
                )}

              </div>

              {/* =================================================
                  RESULTS COUNT
              ================================================= */}

              <div className="my-4 flex items-center justify-between">

                <p className="text-sm text-gray-500 dark:text-gray-400">

                  {loading ? (
                    "Loading products..."
                  ) : (
                    <>
                      Showing{" "}
                      <span className="font-bold text-gray-800 dark:text-white">
                        {filteredProducts.length}
                      </span>{" "}
                      {filteredProducts.length === 1
                        ? "product"
                        : "products"}
                    </>
                  )}

                </p>

                <span className="hidden text-xs font-medium text-gray-400 sm:block">
                  PrimeCart Store
                </span>

              </div>

              {/* =================================================
                  LOADING
              ================================================= */}

              {loading ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

                  {Array.from({
                    length: 8,
                  }).map((_, index) => (
                    <ProductSkeleton
                      key={index}
                    />
                  ))}

                </div>
              ) : filteredProducts.length ===
                0 ? (

                /* EMPTY */

                <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm dark:border-white/10 dark:bg-[#101010]">

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-400 dark:bg-white/5">
                    <Search size={28} />
                  </div>

                  <h2 className="mt-5 text-xl font-black text-gray-900 dark:text-white">
                    No products found
                  </h2>

                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Try changing your search or filters.
                  </p>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-5 rounded-xl bg-[#D4AF37] px-5 py-3 text-sm font-extrabold text-black hover:bg-[#C9A227]"
                  >
                    Clear Filters
                  </button>

                </div>

              ) : (

                /* =================================================
                   PRODUCT GRID
                ================================================= */

                <div
                  className={`grid grid-cols-1 gap-5 sm:grid-cols-2 ${
                    gridSize === "large"
                      ? "xl:grid-cols-3"
                      : "xl:grid-cols-4"
                  }`}
                >

                  {filteredProducts.map(
                    (product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                      />
                    )
                  )}

                </div>
              )}

              {/* =================================================
                  PAGINATION UI
              ================================================= */}

              {!loading &&
                filteredProducts.length > 0 && (
                  <div className="mt-8 flex items-center justify-center gap-2">

                    <button
                      type="button"
                      disabled
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-sm text-gray-300 dark:border-white/10 dark:bg-[#101010]"
                    >
                      ‹
                    </button>

                    <button
                      type="button"
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#D4AF37] text-sm font-black text-black"
                    >
                      1
                    </button>

                    <button
                      type="button"
                      className="hidden h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-sm font-semibold text-gray-600 dark:border-white/10 dark:bg-[#101010] dark:text-gray-300 sm:flex"
                    >
                      2
                    </button>

                    <button
                      type="button"
                      className="hidden h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-sm font-semibold text-gray-600 dark:border-white/10 dark:bg-[#101010] dark:text-gray-300 sm:flex"
                    >
                      3
                    </button>

                    <span className="px-1 text-gray-400">
                      ...
                    </span>

                    <button
                      type="button"
                      className="hidden h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-sm font-semibold text-gray-600 dark:border-white/10 dark:bg-[#101010] dark:text-gray-300 sm:flex"
                    >
                      10
                    </button>

                    <button
                      type="button"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#D4AF37]/30 bg-white text-[#B28D1A] dark:bg-[#101010] dark:text-[#D4AF37]"
                    >
                      ›
                    </button>

                  </div>
                )}

            </section>

          </div>

          {/* =================================================
              SERVICE STRIP
          ================================================= */}

          <section className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#101010]">

            <div className="grid grid-cols-1 divide-y divide-gray-100 dark:divide-white/10 sm:grid-cols-2 lg:grid-cols-5 lg:divide-x lg:divide-y-0">

              <ServiceItem
                icon={<Truck size={22} />}
                title="Free Delivery"
                text="On orders above ₹499"
              />

              <ServiceItem
                icon={<RotateCcw size={22} />}
                title="7-Day Returns"
                text="Easy return & refund"
              />

              <ServiceItem
                icon={<ShieldCheck size={22} />}
                title="Secure Payment"
                text="100% secure payment"
              />

              <ServiceItem
                icon={<Tag size={22} />}
                title="Best Price"
                text="Guaranteed best price"
              />

              <ServiceItem
                icon={<Headphones size={22} />}
                title="24/7 Support"
                text="Always here to help"
              />

            </div>

          </section>

        </div>

      </main>

      <Footer />

    </div>
  );
}

/*
 * =========================================================
 * FILTER SECTION
 * =========================================================
 */

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-gray-100 py-5 last:border-b-0 dark:border-white/10">

      <h3 className="mb-4 text-sm font-black text-gray-900 dark:text-white">
        {title}
      </h3>

      {children}

    </div>
  );
}

/*
 * =========================================================
 * SERVICE ITEM
 * =========================================================
 */

function ServiceItem({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 px-5 py-4">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37]/10 text-[#C39716] dark:text-[#D4AF37]">
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-xs font-black text-gray-800 dark:text-white">
          {title}
        </p>

        <p className="mt-0.5 text-[10px] text-gray-400">
          {text}
        </p>

      </div>

    </div>
  );
}

/*
 * =========================================================
 * PRODUCT SKELETON
 * =========================================================
 */

function ProductSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#101010]">

      <div className="h-60 animate-pulse bg-gray-100 dark:bg-white/5" />

      <div className="space-y-4 p-4">

        <div className="h-3 w-20 animate-pulse rounded bg-gray-200 dark:bg-white/10" />

        <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-white/10" />

        <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-white/10" />

        <div className="h-5 w-24 animate-pulse rounded bg-gray-200 dark:bg-white/10" />

        <div className="h-10 w-full animate-pulse rounded-xl bg-gray-200 dark:bg-white/10" />

      </div>

    </div>
  );
}
