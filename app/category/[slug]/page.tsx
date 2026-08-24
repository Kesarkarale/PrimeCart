import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ShoppingBag,
} from "lucide-react";

import ProductCard from "@/components/products/product-card";
import { createClient } from "@/lib/supabase/server";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { slug } = await params;

  const supabase = await createClient();

  // =====================================================
  // GET CATEGORY
  // =====================================================

  const {
    data: category,
    error: categoryError,
  } = await supabase
    .from("categories")
    .select("id, name, slug")
    .eq("slug", slug)
    .maybeSingle();

  if (categoryError) {
    console.error(
      "Category fetch error:",
      categoryError
    );
  }

  if (!category) {
    notFound();
  }

  // =====================================================
  // GET PRODUCTS OF CATEGORY
  // =====================================================

  const {
    data: products,
    error: productsError,
  } = await supabase
    .from("products")
    .select(`
      id,
      category_id,
      name,
      slug,
      short_description,
      description,
      price,
      original_price,
      stock,
      image_url,
      brand,
      rating,
      reviews_count,
      is_featured,
      is_flash_sale,
      is_active,
      created_at
    `)
    .eq("category_id", category.id)
    .eq("is_active", true)
    .order("created_at", {
      ascending: false,
    });

  if (productsError) {
    console.error(
      "Products fetch error:",
      productsError
    );
  }

  // =====================================================
  // NORMALIZE PRODUCTS
  // =====================================================

  const formattedProducts =
    (products || []).map((product) => ({
      id: product.id,
      name: product.name,
      price: Number(product.price || 0),
      oldPrice: product.original_price
        ? Number(product.original_price)
        : undefined,
      rating: Number(product.rating || 0),
      image:
        product.image_url ||
        "/placeholder-product.png",
      category: category.name,
    }));

  return (
    <main className="min-h-screen bg-[#faf8f3] px-4 py-8 lg:px-8">
      <div className="mx-auto max-w-[1400px]">

        {/* =================================================
            BACK
        ================================================== */}

        <Link
          href="/dashboard/categories"
          className="
            mb-6
            inline-flex
            items-center
            gap-2
            text-sm
            font-semibold
            text-gray-600
            transition
            hover:text-[#C99718]
          "
        >
          <ArrowLeft size={17} />

          All Categories
        </Link>

        {/* =================================================
            CATEGORY HEADER
        ================================================== */}

        <div
          className="
            mb-8
            overflow-hidden
            rounded-3xl
            border
            border-[#eadfbf]
            bg-gradient-to-r
            from-[#fffaf0]
            to-white
            p-7
            sm:p-9
          "
        >
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

            <div>
              <p
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-[#C99718]
                "
              >
                PrimeCart Collection
              </p>

              <h1
                className="
                  mt-2
                  text-3xl
                  font-bold
                  text-gray-900
                  sm:text-4xl
                "
              >
                {category.name}
              </h1>

              <p
                className="
                  mt-2
                  text-sm
                  text-gray-500
                "
              >
                Explore the best products in{" "}
                {category.name}.
              </p>
            </div>

            <div
              className="
                flex
                h-16
                w-16
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-[#D4AF37]
                text-white
              "
            >
              <ShoppingBag size={28} />
            </div>
          </div>

          <div
            className="
              mt-6
              border-t
              border-[#eee5ca]
              pt-4
              text-sm
              font-medium
              text-gray-600
            "
          >
            {formattedProducts.length} products available
          </div>
        </div>

        {/* =================================================
            PRODUCTS
        ================================================== */}

        {formattedProducts.length > 0 ? (
          <>
            <div className="mb-5 flex items-center justify-between">
              <h2
                className="
                  text-xl
                  font-bold
                  text-gray-900
                "
              >
                {category.name} Products
              </h2>

              <span
                className="
                  text-sm
                  text-gray-500
                "
              >
                {formattedProducts.length} items
              </span>
            </div>

            <div
              className="
                grid
                grid-cols-1
                gap-6
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
              "
            >
              {formattedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          </>
        ) : (
          /* EMPTY STATE */

          <div
            className="
              rounded-3xl
              border
              border-gray-200
              bg-white
              px-6
              py-20
              text-center
              shadow-sm
            "
          >
            <div
              className="
                mx-auto
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-[#faf4df]
              "
            >
              <ShoppingBag
                size={32}
                className="text-[#C99718]"
              />
            </div>

            <h2
              className="
                mt-6
                text-2xl
                font-bold
                text-gray-900
              "
            >
              No Products Found
            </h2>

            <p
              className="
                mx-auto
                mt-2
                max-w-md
                text-sm
                text-gray-500
              "
            >
              There are currently no active products
              available in {category.name}.
            </p>

            <Link
              href="/dashboard/categories"
              className="
                mt-6
                inline-flex
                rounded-xl
                bg-[#D4AF37]
                px-6
                py-3
                text-sm
                font-bold
                text-white
                transition
                hover:bg-black
              "
            >
              Browse Categories
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
