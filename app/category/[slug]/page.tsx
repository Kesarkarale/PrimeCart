import { createClient } from "@/lib/supabase/server";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  const supabase = await createClient();

  // Find category
  const { data: category, error: categoryError } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (categoryError || !category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">
          Category not found
        </h1>
      </div>
    );
  }

  // Find products
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", category.id)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (productsError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">
          Failed to load products
        </h1>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f4ea] px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Category Header */}
        <div className="mb-10">
          <p className="text-sm text-gray-500 uppercase tracking-wider">
            PrimeCart
          </p>

          <h1 className="text-4xl font-bold mt-2">
            {category.name}
          </h1>

          {category.description && (
            <p className="text-gray-600 mt-3">
              {category.description}
            </p>
          )}
        </div>

        {/* Products */}
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition"
              >
                <div className="h-64 bg-gray-100 flex items-center justify-center">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-contain p-6"
                    />
                  ) : (
                    <span className="text-gray-400">
                      No Image
                    </span>
                  )}
                </div>

                <div className="p-5">

                  <p className="text-sm text-gray-500">
                    {product.brand}
                  </p>

                  <h2 className="text-lg font-semibold mt-1">
                    {product.name}
                  </h2>

                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-xl font-bold">
                      ₹{product.price}
                    </span>

                    {product.original_price && (
                      <span className="text-sm text-gray-400 line-through">
                        ₹{product.original_price}
                      </span>
                    )}
                  </div>

                  <a
                    href={`/product/${product.slug}`}
                    className="block text-center bg-black text-white rounded-xl py-3 mt-5 hover:bg-gray-800 transition"
                  >
                    View Product
                  </a>

                </div>
              </div>
            ))}

          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold">
              No products found
            </h2>

            <p className="text-gray-500 mt-2">
              There are no products in this category yet.
            </p>
          </div>
        )}

      </div>
    </main>
  );
}
