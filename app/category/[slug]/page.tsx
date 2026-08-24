import { notFound } from "next/navigation";
import ProductCard from "@/components/products/product-card";
import { createClient } from "@/lib/supabase/server";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({
  params,
}: Props) {
  const { slug } = await params;

  const supabase = await createClient();

  // =========================================================
  // FIND CATEGORY
  // =========================================================

  const cleanSlug = decodeURIComponent(slug)
    .trim()
    .toLowerCase();

  const { data: category, error: categoryError } =
    await supabase
      .from("categories")
      .select("id, name, slug")
      .eq("slug", cleanSlug)
      .maybeSingle();

  console.log("CATEGORY SLUG:", cleanSlug);
  console.log("CATEGORY:", category);
  console.log("CATEGORY ERROR:", categoryError);

  // Category doesn't exist
  if (!category) {
    notFound();
  }

  // =========================================================
  // GET PRODUCTS FOR CATEGORY
  // =========================================================

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
      created_at,
      updated_at
    `)
    .eq("category_id", category.id)
    .eq("is_active", true)
    .order("created_at", {
      ascending: false,
    });

  console.log(
    "PRODUCTS:",
    products
  );

  console.log(
    "PRODUCTS ERROR:",
    productsError
  );

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <main
      className="
        min-h-screen
        bg-[#faf8f3]
        px-4
        py-8
        dark:bg-[#050505]
        lg:px-8
      "
    >
      <div className="mx-auto max-w-[1400px]">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-8">

          <div className="flex items-center justify-between gap-4">

            <div>

              <p
                className="
                  text-xs
                  font-semibold
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
                  tracking-tight
                  text-[#111]
                  dark:text-white
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
                  dark:text-gray-400
                "
              >
                {products?.length ?? 0}{" "}
                {products?.length === 1
                  ? "Product"
                  : "Products"}{" "}
                Available
              </p>

            </div>

          </div>

        </div>

        {/* =================================================
            PRODUCTS
        ================================================= */}

        {products && products.length > 0 ? (

          <div
            className="
              grid
              grid-cols-2
              gap-5
              sm:grid-cols-2
              lg:grid-cols-4
              xl:gap-6
            "
          >

            {products.map((product) => (

              <ProductCard
                key={product.id}
                product={{
                  id: product.id,

                  name: product.name,

                  price: Number(
                    product.price ?? 0
                  ),

                  oldPrice:
                    product.original_price
                      ? Number(
                          product.original_price
                        )
                      : undefined,

                  rating: Number(
                    product.rating ?? 0
                  ),

                  image:
                    product.image_url ||
                    "/placeholder-product.png",

                  category:
                    category.name,
                }}
              />

            ))}

          </div>

        ) : (

          /* =================================================
             NO PRODUCTS
          ================================================= */

          <div
            className="
              rounded-3xl
              border
              border-gray-200
              bg-white
              p-16
              text-center
              shadow-sm
              dark:border-white/10
              dark:bg-[#0d0d0d]
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
                bg-[#D4AF37]/10
              "
            >
              <span
                className="
                  text-3xl
                  text-[#C99718]
                "
              >
                🛍️
              </span>
            </div>

            <h2
              className="
                mt-6
                text-xl
                font-bold
                text-gray-900
                dark:text-white
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
                dark:text-gray-400
              "
            >
              Products for this category
              will appear here.
            </p>

          </div>

        )}

      </div>
    </main>
  );
}
