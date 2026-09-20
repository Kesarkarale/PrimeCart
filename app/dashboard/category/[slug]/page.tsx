"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  ArrowLeft,
  ChevronRight,
  Heart,
  Search,
  ShoppingCart,
  Star,
  User,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

type Category = {
  id: string;
  name: string;
  slug: string;
};

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

const getProductImage = (image: string | null) => {
  if (!image) return "";

  const cleanImage = image.trim();

  if (!cleanImage) return "";

  if (
    cleanImage.startsWith("http://") ||
    cleanImage.startsWith("https://")
  ) {
    return cleanImage;
  }

  if (cleanImage.startsWith("/products/")) {
    return cleanImage;
  }

  if (cleanImage.startsWith("/")) {
    return `/products${cleanImage}`;
  }

  return `/products/${cleanImage}`;
};

export default function CategoryPage() {
  const params = useParams();

  const slug = String(params?.slug || "");

  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!slug) return;

    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const supabase = createClient();

        /*
        |--------------------------------------------------------------------------
        | GET CATEGORY
        |--------------------------------------------------------------------------
        */

        const { data: categoryData, error: categoryError } =
          await supabase
            .from("categories")
            .select("id,name,slug")
            .eq("slug", slug)
            .maybeSingle();

        console.log("CATEGORY SLUG:", slug);
        console.log("CATEGORY:", categoryData);
        console.log("CATEGORY ERROR:", categoryError);

        if (categoryError) {
          throw new Error(categoryError.message);
        }

        if (!categoryData) {
          setCategory(null);
          setProducts([]);
          setErrorMessage("Category not found.");
          return;
        }

        setCategory(categoryData as Category);

        /*
        |--------------------------------------------------------------------------
        | GET PRODUCTS OF CATEGORY
        |--------------------------------------------------------------------------
        */

        const { data: productData, error: productError } =
          await supabase
            .from("products")
            .select("*")
            .eq("category_id", categoryData.id)
            .eq("is_active", true)
            .order("created_at", {
              ascending: false,
            });

        console.log("CATEGORY PRODUCTS:", productData);
        console.log("CATEGORY PRODUCT ERROR:", productError);

        if (productError) {
          throw new Error(productError.message);
        }

        setProducts((productData || []) as Product[]);
      } catch (error) {
        console.error("CATEGORY PAGE ERROR:", error);

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [slug]);

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <main className="min-h-screen bg-white">

        {/* TOP BAR */}

        <div className="hidden border-b border-[#f0f0f0] bg-[#fffdf7] md:block">
          <div className="mx-auto flex h-9 max-w-[1400px] items-center justify-between px-5 text-[11px] text-gray-500">
            <div className="flex gap-8">
              <span>📍 Deliver to Mumbai, India</span>
              <span>
                🚚 Free Shipping on orders above ₹499
              </span>
            </div>

            <div className="flex gap-8">
              <span>Download App</span>
              <span>Track Order</span>
              <span>Help & Support</span>
            </div>
          </div>
        </div>

        {/* HEADER */}

        <header className="border-b border-gray-100 bg-white">
          <div className="mx-auto flex h-[78px] max-w-[1400px] items-center gap-5 px-4 sm:px-6">

            <Link
              href="/dashboard"
              className="flex shrink-0 items-center gap-2"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D4AF37] text-white">
                <ShoppingCart size={25} />
              </div>

              <div>
                <div className="text-[24px] font-black leading-none">
                  Prime
                  <span className="text-[#D4AF37]">
                    Cart
                  </span>
                </div>

                <div className="mt-1 text-[8px] font-bold tracking-[0.2em] text-gray-400">
                  SHOP • SAVE • SMILE
                </div>
              </div>
            </Link>

            <div className="ml-5 hidden h-11 max-w-[650px] flex-1 overflow-hidden rounded-xl border border-gray-200 bg-gray-50 lg:flex">

              <div className="flex items-center border-r border-gray-200 px-4 text-sm font-semibold">
                All Categories
              </div>

              <div className="flex flex-1 items-center gap-3 px-4">
                <Search
                  size={18}
                  className="text-gray-400"
                />

                <span className="text-sm text-gray-400">
                  Search for products, brands and more...
                </span>
              </div>

              <div className="flex w-12 items-center justify-center bg-[#D4AF37] text-white">
                <Search size={19} />
              </div>

            </div>

            <div className="ml-auto flex items-center gap-5">

              <div className="hidden items-center gap-2 md:flex">
                <User size={23} />

                <div className="leading-tight">
                  <p className="text-[10px] text-gray-400">
                    Hello
                  </p>

                  <p className="text-xs font-bold">
                    Account
                  </p>
                </div>
              </div>

              <div className="relative">
                <Heart size={23} />

                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#D4AF37] text-[9px] text-white">
                  0
                </span>
              </div>

              <Link
                href="/dashboard/cart"
                className="flex items-center gap-2"
              >
                <ShoppingCart size={24} />

                <div className="hidden leading-tight sm:block">
                  <p className="text-[10px] text-gray-400">
                    Cart
                  </p>

                  <p className="text-xs font-bold">
                    ₹0.00
                  </p>
                </div>
              </Link>

            </div>

          </div>
        </header>

        {/* SKELETON */}

        <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6">

          <div className="h-4 w-48 animate-pulse rounded bg-gray-200" />

          <div className="mt-8 h-12 w-72 animate-pulse rounded bg-gray-200" />

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="h-[350px] animate-pulse rounded-2xl bg-gray-100"
              />
            ))}

          </div>

        </div>

      </main>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | CATEGORY NOT FOUND
  |--------------------------------------------------------------------------
  */

  if (!category) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-5">

        <div className="text-center">

          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-gray-100">
            <ShoppingCart
              size={40}
              className="text-gray-400"
            />
          </div>

          <h1 className="mt-6 text-3xl font-black">
            Category Not Found
          </h1>

          <p className="mt-3 text-gray-500">
            {errorMessage ||
              "This category does not exist."}
          </p>

          <Link
            href="/dashboard"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#D4AF37] px-6 py-3 font-bold text-white transition hover:bg-black"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>

        </div>

      </main>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | PAGE
  |--------------------------------------------------------------------------
  */

  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* TOP BAR */}

      <div className="hidden border-b border-[#f0f0f0] bg-[#fffdf7] md:block">

        <div className="mx-auto flex h-9 max-w-[1400px] items-center justify-between px-5 text-[11px] font-medium text-gray-500">

          <div className="flex items-center gap-8">
            <span>
              📍 Deliver to{" "}
              <b className="text-gray-700">
                Mumbai, India
              </b>
            </span>

            <span>
              🚚 Free Shipping on orders above ₹499
            </span>
          </div>

          <div className="flex items-center gap-8">
            <span>Download App</span>
            <span>Track Order</span>
            <span>Help & Support</span>
          </div>

        </div>

      </div>

      {/* HEADER */}

      <header className="border-b border-gray-100 bg-white">

        <div className="mx-auto flex h-[78px] max-w-[1400px] items-center gap-5 px-4 sm:px-6">

          <Link
            href="/dashboard"
            className="flex shrink-0 items-center gap-2"
          >

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D4AF37] text-white">
              <ShoppingCart size={25} />
            </div>

            <div>
              <div className="text-[24px] font-black leading-none">
                Prime
                <span className="text-[#D4AF37]">
                  Cart
                </span>
              </div>

              <div className="mt-1 text-[8px] font-bold tracking-[0.2em] text-gray-400">
                SHOP • SAVE • SMILE
              </div>
            </div>

          </Link>

          {/* SEARCH */}

          <div className="ml-5 hidden h-11 max-w-[650px] flex-1 overflow-hidden rounded-xl border border-gray-200 bg-gray-50 lg:flex">

            <div className="flex items-center border-r border-gray-200 px-4 text-sm font-semibold">
              All Categories
            </div>

            <div className="flex flex-1 items-center gap-3 px-4">

              <Search
                size={18}
                className="text-gray-400"
              />

              <span className="text-sm text-gray-400">
                Search for products, brands and more...
              </span>

            </div>

            <button
              type="button"
              className="flex w-12 items-center justify-center bg-[#D4AF37] text-white"
            >
              <Search size={19} />
            </button>

          </div>

          {/* ACTIONS */}

          <div className="ml-auto flex items-center gap-5">

            <div className="hidden items-center gap-2 md:flex">

              <User size={23} />

              <div className="leading-tight">

                <p className="text-[10px] text-gray-400">
                  Hello
                </p>

                <p className="text-xs font-bold">
                  Account
                </p>

              </div>

            </div>

            <Link
              href="/dashboard/wishlist"
              className="relative"
            >

              <Heart size={23} />

              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#D4AF37] text-[9px] text-white">
                0
              </span>

            </Link>

            <Link
              href="/dashboard/cart"
              className="flex items-center gap-2"
            >

              <ShoppingCart size={24} />

              <div className="hidden leading-tight sm:block">

                <p className="text-[10px] text-gray-400">
                  Cart
                </p>

                <p className="text-xs font-bold">
                  ₹0.00
                </p>

              </div>

            </Link>

          </div>

        </div>

      </header>

      {/* BREADCRUMB */}

      <div className="border-b border-gray-100">

        <div className="mx-auto max-w-[1400px] px-4 py-4 sm:px-6">

          <div className="flex items-center gap-2 text-sm">

            <Link
              href="/dashboard"
              className="font-semibold text-[#C39B25] hover:text-black"
            >
              Home
            </Link>

            <ChevronRight
              size={15}
              className="text-gray-300"
            />

            <span className="font-semibold text-gray-700">
              {category.name}
            </span>

          </div>

        </div>

      </div>

      {/* CATEGORY HEADER */}

      <section className="mx-auto max-w-[1400px] px-4 pb-6 pt-8 sm:px-6">

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div>

            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C39B25]">
              PrimeCart Category
            </p>

            <h1 className="mt-2 text-3xl font-black sm:text-4xl">
              {category.name}
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Explore products from the {category.name} category.
            </p>

          </div>

          <p className="text-sm font-semibold text-gray-500">
            {products.length}{" "}
            {products.length === 1
              ? "Product"
              : "Products"}
          </p>

        </div>

      </section>

      {/* PRODUCTS */}

      <section className="mx-auto max-w-[1400px] px-4 pb-14 sm:px-6">

        {products.length === 0 ? (

          <div className="rounded-2xl border border-gray-100 bg-gray-50 px-6 py-20 text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white">
              <ShoppingCart
                size={35}
                className="text-gray-300"
              />
            </div>

            <h2 className="mt-5 text-2xl font-black">
              No Products Found
            </h2>

            <p className="mt-2 text-gray-500">
              There are currently no active products
              in this category.
            </p>

            <Link
              href="/dashboard/products"
              className="mt-6 inline-flex rounded-xl bg-[#D4AF37] px-6 py-3 font-bold text-white"
            >
              View All Products
            </Link>

          </div>

        ) : (

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-5">

            {products.map((product) => {

              const price = Number(product.price || 0);

              const originalPrice =
                product.original_price !== null
                  ? Number(product.original_price)
                  : null;

              const rating =
                Number(product.rating || 0);

              const reviews =
                Number(product.reviews_count || 0);

              const discount =
                originalPrice &&
                originalPrice > price
                  ? Math.round(
                      ((originalPrice - price) /
                        originalPrice) *
                        100
                    )
                  : 0;

              const image = getProductImage(
                product.image_url
              );

              return (
                <Link
                  key={product.id}
                  href={`/dashboard/products/${product.id}`}
                  className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition hover:-translate-y-1 hover:border-[#D4AF37] hover:shadow-lg"
                >

                  {/* IMAGE */}

                  <div className="relative h-[220px] bg-[#fafafa] sm:h-[250px]">

                    {product.is_flash_sale && (
                      <span className="absolute left-3 top-3 z-10 rounded-full bg-black px-3 py-1.5 text-[10px] font-black text-white">
                        FLASH SALE
                      </span>
                    )}

                    {discount > 0 && (
                      <span className="absolute right-3 top-3 z-10 rounded-full bg-[#D4AF37] px-3 py-1.5 text-[10px] font-black text-white">
                        {discount}% OFF
                      </span>
                    )}

                    {image ? (
                      <Image
                        src={image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 50vw, 250px"
                        className="object-contain p-5 transition duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-gray-300">
                        <ShoppingCart size={40} />
                      </div>
                    )}

                  </div>

                  {/* CONTENT */}

                  <div className="p-4">

                    {product.brand && (
                      <p className="text-[10px] font-black uppercase tracking-wider text-[#C39B25]">
                        {product.brand}
                      </p>
                    )}

                    <h2 className="mt-1 line-clamp-2 min-h-[42px] text-sm font-black leading-5">
                      {product.name}
                    </h2>

                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-500">
                      {product.short_description ||
                        "Premium quality product from PrimeCart."}
                    </p>

                    <div className="mt-3 flex items-center gap-1">

                      <div className="flex">

                        {[1, 2, 3, 4, 5].map(
                          (star) => (
                            <Star
                              key={star}
                              size={13}
                              className={
                                star <=
                                Math.round(rating)
                                  ? "fill-[#E5A900] text-[#E5A900]"
                                  : "text-gray-300"
                              }
                            />
                          )
                        )}

                      </div>

                      <span className="text-[11px] font-semibold text-gray-500">
                        {rating.toFixed(1)}
                      </span>

                      <span className="text-[11px] text-gray-400">
                        ({reviews})
                      </span>

                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2">

                      <span className="text-lg font-black">
                        ₹{price.toLocaleString("en-IN")}
                      </span>

                      {originalPrice &&
                        originalPrice > price && (
                          <span className="text-xs text-gray-400 line-through">
                            ₹
                            {originalPrice.toLocaleString(
                              "en-IN"
                            )}
                          </span>
                        )}

                    </div>

                    <p
                      className={
                        Number(product.stock || 0) <= 0
                          ? "mt-2 text-xs font-bold text-red-500"
                          : Number(product.stock || 0) <= 5
                          ? "mt-2 text-xs font-bold text-orange-500"
                          : "mt-2 text-xs font-bold text-green-600"
                      }
                    >
                      {Number(product.stock || 0) <= 0
                        ? "Out of Stock"
                        : Number(product.stock || 0) <= 5
                        ? `Only ${product.stock} left`
                        : "In Stock"}
                    </p>

                  </div>

                </Link>
              );
            })}

          </div>

        )}

      </section>

    </main>
  );
}
