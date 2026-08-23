import { getProducts } from "@/lib/products";
import ProductCard from "@/components/products/product-card";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-[#faf8f3] px-4 py-8 dark:bg-[#050505] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1400px] space-y-8">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-[#111] dark:text-white sm:text-4xl">
            All Products
          </h1>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Explore our premium collections
          </p>
        </div>

        {/* PRODUCTS */}
        {products.length === 0 ? (
          <div className="rounded-2xl border border-[#e5e5e5] bg-white p-12 text-center dark:border-[#222] dark:bg-[#0d0d0d]">
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              No products found
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Products will appear here once they are added.
            </p>
          </div>
        ) : (
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
            {products.map((product: any) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}

      </div>
    </main>
  );
}
