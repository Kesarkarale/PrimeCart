import Link from "next/link";
import {
  ArrowUpDown,
  ChevronDown,
  Filter,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";

import { getProducts } from "@/lib/products";
import ProductCard from "@/components/products/product-card";

type Product = {
  id: string | number;
  name?: string;
  title?: string;
  slug?: string;
  category?: string;
  category_name?: string;
  category_id?: string | number;
  price?: number;
  original_price?: number;
  sale_price?: number;
  image?: string;
  image_url?: string;
  active?: boolean;
  featured?: boolean;
};

type ProductsPageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
    sort?: string;
  }>;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const products = (await getProducts()) as Product[];

  const params = await searchParams;

  const query = (params.q || "").trim().toLowerCase();
  const selectedCategory = (
    params.category || ""
  ).trim().toLowerCase();

  const selectedSort = params.sort || "featured";

  // =========================================================
  // CATEGORY LIST
  // =========================================================

  const categories = Array.from(
    new Set(
      products
        .map((product) => {
          return (
            product.category ||
            product.category_name ||
            ""
          )
            .toString()
            .trim();
        })
        .filter(Boolean)
    )
  ).sort();

  // =========================================================
  // FILTER PRODUCTS
  // =========================================================

  let filteredProducts = products.filter(
    (product) => {
      const productName = (
        product.name ||
        product.title ||
        ""
      )
        .toString()
        .toLowerCase();

      const productSlug = (
        product.slug || ""
      )
        .toString()
        .toLowerCase();

      const productCategory = (
        product.category ||
        product.category_name ||
        ""
      )
        .toString()
        .toLowerCase();

      const matchesSearch =
        !query ||
        productName.includes(query) ||
        productSlug.includes(query) ||
        productCategory.includes(query);

      const matchesCategory =
        !selectedCategory ||
        productCategory === selectedCategory;

      return (
        matchesSearch &&
        matchesCategory
      );
    }
  );

  // =========================================================
  // SORT PRODUCTS
  // =========================================================

  filteredProducts = [...filteredProducts].sort(
    (a, b) => {
      const priceA =
        Number(
          a.sale_price ??
            a.price ??
            a.original_price ??
            0
        ) || 0;

      const priceB =
        Number(
          b.sale_price ??
            b.price ??
            b.original_price ??
            0
        ) || 0;

      switch (selectedSort) {
        case "price-low":
          return priceA - priceB;

        case "price-high":
          return priceB - priceA;

        case "name":
          return (
            (a.name || a.title || "")
              .toString()
              .localeCompare(
                (b.name || b.title || "").toString()
              )
          );

        case "featured":
        default:
          return (
            Number(Boolean(b.featured)) -
            Number(Boolean(a.featured))
          );
      }
    }
  );

  const hasFilters =
    Boolean(query) ||
    Boolean(selectedCategory) ||
    selectedSort !== "featured";

  return (
    <main className="min-h-screen bg-[#faf8f3] text-[#111111] dark:bg-[#050505] dark:text-white">

      {/* =====================================================
          TOP SECTION
      ====================================================== */}

      <section className="border-b border-[#e9e4da] bg-[#faf8f3] dark:border-[#1c1c1c] dark:bg-[#050505]">
        <div className="mx-auto max-w-[1400px] px-4 pb-8 pt-8 sm:px-6 lg:px-8 lg:pb-10 lg:pt-10">

          {/* BREADCRUMB */}

          <div className="mb-6 flex items-center gap-2 text-xs text-[#8a8a8a]">
            <Link
              href="/"
              className="transition hover:text-[#c99516]"
            >
              Home
            </Link>

            <span>/</span>

            <span className="font-medium text-[#333333] dark:text-[#dddddd]">
              Products
            </span>
          </div>

          {/* HEADER */}

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

            <div className="max-w-[700px]">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#e4d8c0] bg-[#fffdf8] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#b17d0d] dark:border-[#302b20] dark:bg-[#11100d] dark:text-[#d6a52b]">
                <Sparkles size={13} />
                PrimeCart Collection
              </div>

              <h1 className="font-serif text-[36px] font-bold leading-[1.1] tracking-[-1.2px] text-[#111111] dark:text-white sm:text-[44px] lg:text-[50px]">
                Explore Our Products
              </h1>

              <p className="mt-3 max-w-[620px] text-[14px] leading-7 text-[#777777] dark:text-[#999999] sm:text-[15px]">
                Discover carefully selected products across
                electronics, fashion, beauty, home, sports
                and more — all in one place.
              </p>
            </div>

            {/* PRODUCT COUNT */}

            <div className="flex shrink-0 items-center gap-3 rounded-[16px] border border-[#e6e1d8] bg-white px-5 py-4 shadow-[0_4px_18px_rgba(0,0,0,0.04)] dark:border-[#222222] dark:bg-[#0d0d0d]">
              <div className="flex h-10 w-10 items-center justify-center rounded-[11px] bg-[#faf3df] text-[#c18b13] dark:bg-[#211b0d]">
                <SlidersHorizontal size={18} />
              </div>

              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#999999]">
                  Showing
                </p>

                <p className="mt-0.5 text-[15px] font-bold text-[#222222] dark:text-white">
                  {filteredProducts.length}{" "}
                  {filteredProducts.length === 1
                    ? "Product"
                    : "Products"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FILTER / SEARCH BAR
      ====================================================== */}

      <section className="sticky top-0 z-20 border-b border-[#e7e2d9] bg-[#faf8f3]/95 backdrop-blur-xl dark:border-[#1b1b1b] dark:bg-[#050505]/95">
        <div className="mx-auto max-w-[1400px] px-4 py-4 sm:px-6 lg:px-8">

          <form
            method="GET"
            className="flex flex-col gap-3 lg:flex-row lg:items-center"
          >

            {/* SEARCH */}

            <div className="relative min-w-0 flex-1">
              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8a8a8a]"
              />

              <input
                type="search"
                name="q"
                defaultValue={params.q || ""}
                placeholder="Search products..."
                className="
                  h-[50px]
                  w-full
                  rounded-[13px]
                  border
                  border-[#dedbd4]
                  bg-white
                  pl-[46px]
                  pr-4
                  text-[14px]
                  text-[#222]
                  outline-none
                  transition
                  placeholder:text-[#999]
                  focus:border-[#c99516]
                  focus:ring-[3px]
                  focus:ring-[#c99516]/10
                  dark:border-[#292929]
                  dark:bg-[#0d0d0d]
                  dark:text-white
                  dark:placeholder:text-[#777]
                "
              />

              {query && (
                <Link
                  href="/products"
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-[#888] transition hover:bg-[#f3f1ed] hover:text-[#222] dark:hover:bg-[#1c1c1c] dark:hover:text-white"
                >
                  <X size={15} />
                </Link>
              )}
            </div>

            {/* CATEGORY */}

            <div className="relative lg:w-[210px]">
              <Filter
                size={16}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#888]"
              />

              <select
                name="category"
                defaultValue={params.category || ""}
                className="
                  h-[50px]
                  w-full
                  appearance-none
                  rounded-[13px]
                  border
                  border-[#dedbd4]
                  bg-white
                  pl-[43px]
                  pr-10
                  text-[13px]
                  font-medium
                  text-[#333]
                  outline-none
                  transition
                  focus:border-[#c99516]
                  focus:ring-[3px]
                  focus:ring-[#c99516]/10
                  dark:border-[#292929]
                  dark:bg-[#0d0d0d]
                  dark:text-white
                "
              >
                <option value="">
                  All Categories
                </option>

                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#888]"
              />
            </div>

            {/* SORT */}

            <div className="relative lg:w-[210px]">
              <ArrowUpDown
                size={16}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#888]"
              />

              <select
                name="sort"
                defaultValue={selectedSort}
                className="
                  h-[50px]
                  w-full
                  appearance-none
                  rounded-[13px]
                  border
                  border-[#dedbd4]
                  bg-white
                  pl-[43px]
                  pr-10
                  text-[13px]
                  font-medium
                  text-[#333]
                  outline-none
                  transition
                  focus:border-[#c99516]
                  focus:ring-[3px]
                  focus:ring-[#c99516]/10
                  dark:border-[#292929]
                  dark:bg-[#0d0d0d]
                  dark:text-white
                "
              >
                <option value="featured">
                  Featured
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
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#888]"
              />
            </div>

            {/* APPLY */}

            <button
              type="submit"
              className="
                h-[50px]
                rounded-[13px]
                bg-[#d99d08]
                px-7
                text-[13px]
                font-bold
                text-white
                shadow-[0_6px_16px_rgba(217,157,8,0.18)]
                transition
                hover:bg-[#c88f05]
                active:scale-[0.98]
              "
            >
              Apply Filters
            </button>
          </form>

          {/* ACTIVE FILTERS */}

          {hasFilters && (
            <div className="mt-3 flex flex-wrap items-center gap-2">

              <span className="mr-1 text-[11px] font-medium text-[#999999]">
                Active filters:
              </span>

              {query && (
                <span className="rounded-full border border-[#e5dcc9] bg-white px-3 py-1.5 text-[11px] font-medium text-[#77570d] dark:border-[#332c1c] dark:bg-[#11100d] dark:text-[#d5a631]">
                  Search: {params.q}
                </span>
              )}

              {selectedCategory && (
                <span className="rounded-full border border-[#e5dcc9] bg-white px-3 py-1.5 text-[11px] font-medium capitalize text-[#77570d] dark:border-[#332c1c] dark:bg-[#11100d] dark:text-[#d5a631]">
                  Category: {params.category}
                </span>
              )}

              {selectedSort !== "featured" && (
                <span className="rounded-full border border-[#e5dcc9] bg-white px-3 py-1.5 text-[11px] font-medium text-[#77570d] dark:border-[#332c1c] dark:bg-[#11100d] dark:text-[#d5a631]">
                  Sorted
                </span>
              )}

              <Link
                href="/products"
                className="ml-1 text-[11px] font-bold text-[#c18b13] underline-offset-4 hover:underline"
              >
                Clear all
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          PRODUCTS
      ====================================================== */}

      <section className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">

        {filteredProducts.length === 0 ? (
          /* EMPTY STATE */

          <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[22px] border border-[#e5e1d9] bg-white px-6 text-center dark:border-[#222222] dark:bg-[#0d0d0d]">

            <div className="flex h-16 w-16 items-center justify-center rounded-[18px] bg-[#faf3df] text-[#c99516] dark:bg-[#211b0d]">
              <Search size={27} />
            </div>

            <h2 className="mt-5 font-serif text-[23px] font-bold text-[#222222] dark:text-white">
              No products found
            </h2>

            <p className="mt-2 max-w-[430px] text-[13px] leading-6 text-[#888888]">
              We couldn't find any products matching
              your current search or filters. Try
              changing your search or clearing the
              filters.
            </p>

            <Link
              href="/products"
              className="mt-6 inline-flex h-[44px] items-center justify-center rounded-[11px] bg-[#d99d08] px-6 text-[13px] font-bold text-white transition hover:bg-[#c88f05]"
            >
              View All Products
            </Link>
          </div>
        ) : (
          <>
            {/* GRID HEADER */}

            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-[12px] font-medium text-[#999999]">
                  Showing{" "}
                  <span className="font-bold text-[#333333] dark:text-[#dddddd]">
                    {filteredProducts.length}
                  </span>{" "}
                  products
                </p>
              </div>

              {selectedCategory && (
                <div className="hidden items-center gap-2 text-[12px] text-[#777777] sm:flex">
                  <span>Category:</span>

                  <span className="font-bold capitalize text-[#333333] dark:text-white">
                    {selectedCategory}
                  </span>
                </div>
              )}
            </div>

            {/* PRODUCTS GRID */}

            <div
              className="
                grid
                grid-cols-1
                gap-5
                sm:grid-cols-2
                md:gap-6
                lg:grid-cols-3
                xl:grid-cols-4
              "
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
          </>
        )}
      </section>

      {/* =====================================================
          BOTTOM PROMO
      ====================================================== */}

      <section className="mx-auto max-w-[1400px] px-4 pb-10 sm:px-6 lg:px-8 lg:pb-14">
        <div className="relative overflow-hidden rounded-[22px] border border-[#e3d9c6] bg-[#f5eddd] px-6 py-8 dark:border-[#30291b] dark:bg-[#15120b] sm:px-10 sm:py-10">

          <div className="relative z-10 max-w-[650px]">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#b27e0c]">
              PrimeCart
            </p>

            <h2 className="mt-2 font-serif text-[25px] font-bold tracking-[-0.5px] text-[#171717] dark:text-white sm:text-[30px]">
              Quality products. Simple shopping.
            </h2>

            <p className="mt-2 text-[13px] leading-6 text-[#777777] dark:text-[#999999]">
              Browse our growing collection and find
              products you'll love.
            </p>
          </div>

          <div className="absolute -right-8 -top-12 h-44 w-44 rounded-full border-[24px] border-[#e5d7b9] opacity-60 dark:border-[#2b2416]" />

          <div className="absolute -bottom-16 right-24 h-36 w-36 rounded-full border-[18px] border-[#e5d7b9] opacity-50 dark:border-[#2b2416]" />
        </div>
      </section>
    </main>
  );
}
