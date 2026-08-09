"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, ShoppingBag, Star } from "lucide-react";

import Navbar from "@/components/layout/navbar";
import TopBar from "@/components/layout/top-bar";
import Footer from "@/components/layout/footer";

import { createClient } from "@/lib/supabase/client";

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
};

type Product = {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  price: number;
  original_price: number | null;
  stock: number;
  image_url: string | null;
  brand: string | null;
  rating: number | null;
  reviews_count: number | null;
  is_active: boolean;
};

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default function CategoryProductsPage({ params }: Props) {
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    async function loadCategory() {
      const resolvedParams = await params;

      setSlug(resolvedParams.slug);

      // ============================
      // FIND CATEGORY
      // ============================

      const { data: categoryData, error: categoryError } =
        await supabase
          .from("categories")
          .select("*")
          .eq("slug", resolvedParams.slug)
          .single();

      if (categoryError || !categoryData) {
        setLoading(false);
        return;
      }

      setCategory(categoryData);

      // ============================
      // FIND PRODUCTS
      // ============================

      const { data: productData, error: productError } =
        await supabase
          .from("products")
          .select("*")
          .eq("category_id", categoryData.id)
          .eq("is_active", true)
          .order("created_at", {
            ascending: false,
          });

      if (!productError && productData) {
        setProducts(productData);
      }

      setLoading(false);
    }

    loadCategory();
  }, [params]);

  // ============================
  // LOADING
  // ============================

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white via-[#fffdf8] to-[#f8f4ea]">

        <TopBar />
        <Navbar />

        <div className="max-w-7xl mx-auto px-6 py-20">

          <div className="flex justify-center">
            <div
              className="
                w-10
                h-10
                border-4
                border-[#D4AF37]
                border-t-transparent
                rounded-full
                animate-spin
              "
            />
          </div>

        </div>

        <Footer />

      </main>
    );
  }

  // ============================
  // CATEGORY NOT FOUND
  // ============================

  if (!category) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white via-[#fffdf8] to-[#f8f4ea]">

        <TopBar />
        <Navbar />

        <div className="max-w-7xl mx-auto px-6 py-24 text-center">

          <h1 className="text-4xl font-bold">
            Category Not Found
          </h1>

          <p className="text-gray-500 mt-3">
            Sorry, this category does not exist.
          </p>

          <Link
            href="/categories"
            className="
              inline-flex
              items-center
              gap-2
              mt-8
              bg-black
              text-white
              px-6
              py-3
              rounded-xl
              hover:bg-[#D4AF37]
              transition
            "
          >
            <ArrowLeft size={18} />
            Back to Categories
          </Link>

        </div>

        <Footer />

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-[#fffdf8] to-[#f8f4ea] text-gray-900">

      <TopBar />
      <Navbar />

      <div className="max-w-[1500px] mx-auto px-6 py-8">

        {/* ============================
            BACK BUTTON
        ============================ */}

        <Link
          href="/categories"
          className="
            inline-flex
            items-center
            gap-2
            text-gray-600
            hover:text-[#C99718]
            transition
            mb-6
          "
        >
          <ArrowLeft size={18} />
          Back to Categories
        </Link>


        {/* ============================
            CATEGORY HEADER
        ============================ */}

        <div
          className="
            bg-white
            border
            border-gray-200
            rounded-3xl
            p-6
            md:p-8
            mb-8
          "
        >

          <div className="flex flex-col md:flex-row md:items-center gap-6">

            {category.image && (
              <div
                className="
                  w-24
                  h-24
                  rounded-2xl
                  bg-[#f8f3e7]
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  width={75}
                  height={75}
                  className="object-contain"
                />
              </div>
            )}

            <div>

              <p className="text-sm text-[#C99718] font-semibold uppercase tracking-wider">
                PrimeCart Category
              </p>

              <h1 className="text-4xl md:text-5xl font-bold mt-1">
                {category.name}
              </h1>

              {category.description && (
                <p className="text-gray-500 mt-3 max-w-2xl">
                  {category.description}
                </p>
              )}

              <p className="text-sm text-gray-400 mt-3">
                {products.length} Products Available
              </p>

            </div>

          </div>

        </div>


        {/* ============================
            PRODUCTS
        ============================ */}

        {products.length === 0 ? (

          <div
            className="
              bg-white
              border
              border-gray-200
              rounded-3xl
              py-24
              text-center
            "
          >

            <ShoppingBag
              size={50}
              className="mx-auto text-gray-300"
            />

            <h2 className="text-2xl font-bold mt-5">
              No Products Yet
            </h2>

            <p className="text-gray-500 mt-2">
              There are no products available in this category.
            </p>

          </div>

        ) : (

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
              gap-6
            "
          >

            {products.map((product) => (

              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="
                  group
                  bg-white
                  border
                  border-gray-200
                  rounded-3xl
                  overflow-hidden
                  hover:shadow-xl
                  hover:-translate-y-1
                  transition-all
                  duration-300
                "
              >

                {/* PRODUCT IMAGE */}

                <div
                  className="
                    h-[280px]
                    bg-[#f8f3e7]
                    flex
                    items-center
                    justify-center
                    overflow-hidden
                  "
                >

                  {product.image_url ? (

                    <Image
                      src={product.image_url}
                      alt={product.name}
                      width={260}
                      height={260}
                      className="
                        w-full
                        h-full
                        object-contain
                        p-8
                        group-hover:scale-105
                        transition
                        duration-300
                      "
                    />

                  ) : (

                    <ShoppingBag
                      size={60}
                      className="text-gray-300"
                    />

                  )}

                </div>


                {/* PRODUCT DETAILS */}

                <div className="p-5">

                  {product.brand && (
                    <p className="text-xs text-gray-400 uppercase tracking-wide">
                      {product.brand}
                    </p>
                  )}

                  <h2 className="text-lg font-bold mt-1 line-clamp-2">
                    {product.name}
                  </h2>


                  {product.short_description && (
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                      {product.short_description}
                    </p>
                  )}


                  {/* RATING */}

                  <div className="flex items-center gap-2 mt-3">

                    <div className="flex items-center gap-1 text-[#D4AF37]">

                      <Star
                        size={15}
                        fill="currentColor"
                      />

                      <span className="text-sm font-semibold">
                        {product.rating ?? "0.0"}
                      </span>

                    </div>

                    <span className="text-xs text-gray-400">
                      ({product.reviews_count ?? 0} reviews)
                    </span>

                  </div>


                  {/* PRICE */}

                  <div className="flex items-center gap-3 mt-4">

                    <span className="text-2xl font-bold">
                      ₹{Number(product.price).toLocaleString("en-IN")}
                    </span>

                    {product.original_price && (
                      <span className="text-sm text-gray-400 line-through">
                        ₹
                        {Number(
                          product.original_price
                        ).toLocaleString("en-IN")}
                      </span>
                    )}

                  </div>


                  {/* STOCK */}

                  <p
                    className={`text-sm mt-2 ${
                      product.stock > 0
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {product.stock > 0
                      ? `${product.stock} items available`
                      : "Out of stock"}
                  </p>


                  {/* BUTTON */}

                  <div
                    className="
                      mt-5
                      w-full
                      bg-black
                      text-white
                      text-center
                      py-3
                      rounded-xl
                      font-semibold
                      group-hover:bg-[#D4AF37]
                      transition
                    "
                  >
                    View Product
                  </div>

                </div>

              </Link>

            ))}

          </div>

        )}

      </div>

      <Footer />

    </main>
  );
}
