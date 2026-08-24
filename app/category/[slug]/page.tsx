import { notFound } from "next/navigation";
import ProductCard from "@/components/products/product-card";
import { createClient } from "@/lib/supabase/server";

interface Props {
  params: {
    slug: string;
  };
}

export default async function CategoryPage({ params }: Props) {
  const supabase = await createClient();

  // Category शोध
  const { data: category } = await supabase
    .from("categories")
    .select("id,name,slug")
    .eq("slug", params.slug)
    .single();

  if (!category) notFound();

  // त्या category चे products
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", category.id)
    .eq("is_active", true);

  return (
    <main className="min-h-screen bg-[#faf8f3] dark:bg-[#050505] px-4 py-8 lg:px-8">
      <div className="max-w-[1400px] mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#111] dark:text-white">
            {category.name}
          </h1>

          <p className="mt-2 text-gray-500 dark:text-gray-400">
            {products?.length || 0} Products Available
          </p>
        </div>

        {products && products.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  ...product,
                  image: product.image_url,
                  oldPrice: product.original_price,
                  category: category.name,
                }}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-white dark:bg-[#0d0d0d] border p-16 text-center">
            <h2 className="text-xl font-bold">
              No Products Found
            </h2>

            <p className="mt-2 text-gray-500">
              Products for this category will appear here.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
