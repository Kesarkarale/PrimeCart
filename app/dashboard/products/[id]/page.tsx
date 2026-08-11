"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  ShoppingCart,
  Star,
  Truck,
  ShieldCheck,
  Minus,
  Plus,
  RotateCcw,
  PackageCheck,
  Loader2,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

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
  created_at: string;
  updated_at: string;
};

type RelatedProduct = {
  id: string;
  name: string;
  price: number;
  original_price: number | null;
  image_url: string | null;
  rating: number | null;
  reviews_count: number | null;
};

export default function ProductDetailsPage() {
  const params = useParams();

  const productId =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
      ? params.id[0]
      : "";

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<
    RelatedProduct[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [relatedLoading, setRelatedLoading] = useState(true);

  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;
    }

    const supabase = createClient();

    const loadProduct = async () => {
      try {
        setLoading(true);

        console.log("PRODUCT ID:", productId);

        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", productId)
          .maybeSingle();

        console.log("PRODUCT:", data);
        console.log("PRODUCT ERROR:", error);

        if (error || !data) {
          console.error("Product not found:", error);
          setProduct(null);
          setLoading(false);
          return;
        }

        setProduct(data);
        setQuantity(1);

        // Related products
        setRelatedLoading(true);

        const { data: relatedData, error: relatedError } =
          await supabase
            .from("products")
            .select(
              "id,name,price,original_price,image_url,rating,reviews_count"
            )
            .eq("is_active", true)
            .neq("id", data.id)
            .limit(8);

        console.log(
          "RELATED PRODUCTS:",
          relatedData
        );

        console.log(
          "RELATED ERROR:",
          relatedError
        );

        setRelatedProducts(relatedData ?? []);
      } catch (error) {
        console.error(
          "Product loading error:",
          error
        );

        setProduct(null);
      } finally {
        setLoading(false);
        setRelatedLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  const increaseQuantity = () => {
    if (!product) return;

    const maxStock = product.stock ?? 1;

    setQuantity((current) =>
      Math.min(current + 1, maxStock)
    );
  };

  const decreaseQuantity = () => {
    setQuantity((current) =>
      Math.max(current - 1, 1)
    );
  };

  const addToCart = () => {
    if (!product) return;

    if (!product.stock || product.stock <= 0) {
      return;
    }

    setCartLoading(true);

    console.log("ADD TO CART:", {
      product_id: product.id,
      name: product.name,
      quantity,
      price: product.price,
    });

    setTimeout(() => {
      setCartLoading(false);

      alert(
        `${product.name} added to cart`
      );
    }, 500);
  };

  const buyNow = () => {
    if (!product) return;

    if (!product.stock || product.stock <= 0) {
      return;
    }

    console.log("BUY NOW:", {
      product_id: product.id,
      quantity,
    });

    alert(
      `Proceeding to checkout for ${product.name}`
    );
  };

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <main
        className="
          min-h-screen
          bg-[#faf8f3]
          flex
          items-center
          justify-center
        "
      >
        <div className="text-center">
          <Loader2
            size={42}
            className="
              animate-spin
              text-[#D4AF37]
              mx-auto
            "
          />

          <p className="mt-4 text-gray-500 font-semibold">
            Loading Product...
          </p>
        </div>
      </main>
    );
  }

  /* =========================
     NOT FOUND
  ========================= */

  if (!product) {
    return (
      <main
        className="
          min-h-screen
          bg-[#faf8f3]
          flex
          items-center
          justify-center
          px-6
        "
      >
        <div className="text-center">
          <div className="text-6xl mb-5">
            🛍️
          </div>

          <h1 className="text-3xl font-black">
            Product Not Found
          </h1>

          <p className="text-gray-500 mt-2">
            This product could not be found.
          </p>

          <p className="text-xs text-gray-400 mt-2 break-all">
            ID: {productId}
          </p>

          <Link
            href="/dashboard"
            className="
              inline-flex
              items-center
              gap-2
              mt-6
              px-6
              py-3
              rounded-xl
              bg-black
              text-white
              font-bold
              hover:bg-[#D4AF37]
              transition
            "
          >
            <ArrowLeft size={18} />
            Back To Shop
          </Link>
        </div>
      </main>
    );
  }

  const discount =
    product.original_price &&
    product.original_price > product.price
      ? Math.round(
          ((product.original_price -
            product.price) /
            product.original_price) *
            100
        )
      : 0;

  const productImage =
    product.image_url ||
    "/products/product-placeholder.png";

  const isOutOfStock =
    !product.stock ||
    product.stock <= 0;

  return (
    <main className="min-h-screen bg-[#faf8f3]">

      {/* =========================
          BACK
      ========================= */}

      <div className="max-w-7xl mx-auto px-6 pt-8">
        <Link
          href="/dashboard"
          className="
            inline-flex
            items-center
            gap-2
            text-gray-600
            font-semibold
            hover:text-black
            transition
          "
        >
          <ArrowLeft size={19} />
          Back To Shop
        </Link>
      </div>

      {/* =========================
          MAIN PRODUCT
      ========================= */}

      <section className="max-w-7xl mx-auto px-6 py-8">

        <div className="grid lg:grid-cols-2 gap-10">

          {/* =========================
              PRODUCT IMAGE
          ========================= */}

          <div>

            <div
              className="
                relative
                h-[420px]
                sm:h-[540px]
                bg-white
                rounded-[30px]
                border
                overflow-hidden
                shadow-sm
              "
            >

              {/* FLASH SALE */}

              {product.is_flash_sale && (
                <div
                  className="
                    absolute
                    top-5
                    left-5
                    z-10
                    bg-red-500
                    text-white
                    px-4
                    py-2
                    rounded-full
                    text-sm
                    font-black
                  "
                >
                  FLASH SALE
                </div>
              )}

              {/* WISHLIST */}

              <button
                type="button"
                onClick={() =>
                  setWishlist((value) => !value)
                }
                aria-label="Add to wishlist"
                className="
                  absolute
                  top-5
                  right-5
                  z-10
                  w-12
                  h-12
                  rounded-full
                  bg-white
                  shadow-lg
                  flex
                  items-center
                  justify-center
                  hover:scale-110
                  transition
                "
              >
                <Heart
                  size={23}
                  className={
                    wishlist
                      ? "fill-red-500 text-red-500"
                      : "text-gray-700"
                  }
                />
              </button>

              <Image
                src={productImage}
                alt={product.name}
                fill
                priority
                sizes="
                  (max-width: 1024px) 100vw,
                  50vw
                "
                className="
                  object-contain
                  p-8
                  sm:p-12
                  hover:scale-105
                  transition
                  duration-500
                "
              />

            </div>

            {/* THUMBNAIL */}

            <div className="mt-5">
              <div
                className="
                  relative
                  w-20
                  h-20
                  bg-white
                  rounded-xl
                  border-2
                  border-[#D4AF37]
                  overflow-hidden
                "
              >
                <Image
                  src={productImage}
                  alt={product.name}
                  fill
                  sizes="80px"
                  className="object-contain p-2"
                />
              </div>
            </div>

          </div>


          {/* =========================
              PRODUCT DETAILS
          ========================= */}

          <div
            className="
              bg-white
              rounded-[30px]
              border
              p-6
              sm:p-8
            "
          >

            {/* BRAND */}

            {product.brand && (
              <p
                className="
                  text-sm
                  font-bold
                  text-[#D4AF37]
                  uppercase
                  tracking-wider
                "
              >
                {product.brand}
              </p>
            )}

            {/* NAME */}

            <h1
              className="
                text-3xl
                sm:text-4xl
                font-black
                mt-2
                leading-tight
              "
            >
              {product.name}
            </h1>

            {/* SHORT DESCRIPTION */}

            {product.short_description && (
              <p className="text-gray-500 mt-3 leading-6">
                {product.short_description}
              </p>
            )}

            {/* RATING */}

            <div className="flex items-center gap-3 mt-5">

              <div
                className="
                  flex
                  items-center
                  gap-1
                  bg-green-600
                  text-white
                  px-3
                  py-1.5
                  rounded-lg
                  text-sm
                  font-bold
                "
              >
                <Star
                  size={15}
                  className="fill-white"
                />

                {product.rating ?? 4.5}
              </div>

              <span className="text-gray-500 text-sm">
                {product.reviews_count ?? 0} Reviews
              </span>

            </div>

            <div className="h-px bg-gray-200 my-6" />

            {/* PRICE */}

            <div className="flex items-center gap-3 flex-wrap">

              <span className="text-4xl font-black">
                ₹
                {Number(product.price).toLocaleString(
                  "en-IN"
                )}
              </span>

              {product.original_price &&
                product.original_price >
                  product.price && (
                  <span
                    className="
                      text-lg
                      text-gray-400
                      line-through
                    "
                  >
                    ₹
                    {Number(
                      product.original_price
                    ).toLocaleString("en-IN")}
                  </span>
                )}

            </div>

            {discount > 0 && (
              <p className="text-green-600 font-bold mt-2">
                {discount}% OFF
              </p>
            )}

            {/* STOCK */}

            <div className="mt-5">

              {!isOutOfStock ? (
                <p className="text-green-600 font-bold">
                  ✓ In Stock

                  <span className="text-gray-500 font-normal ml-2">
                    ({product.stock} available)
                  </span>
                </p>
              ) : (
                <p className="text-red-500 font-bold">
                  Out of Stock
                </p>
              )}

            </div>

            {/* DESCRIPTION */}

            {product.description && (
              <div className="mt-7">

                <h2 className="text-xl font-black mb-2">
                  Description
                </h2>

                <p className="text-gray-600 leading-7">
                  {product.description}
                </p>

              </div>
            )}

            {/* QUANTITY */}

            {!isOutOfStock && (
              <div className="mt-7">

                <h3 className="font-bold mb-3">
                  Quantity
                </h3>

                <div
                  className="
                    inline-flex
                    items-center
                    border
                    rounded-xl
                    overflow-hidden
                  "
                >

                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    className="
                      w-12
                      h-12
                      flex
                      items-center
                      justify-center
                      hover:bg-gray-100
                    "
                  >
                    <Minus size={18} />
                  </button>

                  <span className="w-14 text-center font-bold">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    className="
                      w-12
                      h-12
                      flex
                      items-center
                      justify-center
                      hover:bg-gray-100
                    "
                  >
                    <Plus size={18} />
                  </button>

                </div>

              </div>
            )}

            {/* ACTION BUTTONS */}

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-[56px_1fr_1fr]
                gap-3
                mt-7
              "
            >

              {/* WISHLIST */}

              <button
                type="button"
                onClick={() =>
                  setWishlist((value) => !value)
                }
                className="
                  h-14
                  rounded-2xl
                  border
                  flex
                  items-center
                  justify-center
                  hover:border-[#D4AF37]
                  transition
                "
              >
                <Heart
                  size={22}
                  className={
                    wishlist
                      ? "fill-red-500 text-red-500"
                      : ""
                  }
                />
              </button>

              {/* ADD CART */}

              <button
                type="button"
                onClick={addToCart}
                disabled={
                  cartLoading ||
                  isOutOfStock
                }
                className="
                  h-14
                  rounded-2xl
                  bg-[#D4AF37]
                  hover:bg-black
                  disabled:bg-gray-300
                  disabled:cursor-not-allowed
                  text-white
                  font-black
                  flex
                  items-center
                  justify-center
                  gap-2
                  transition
                "
              >

                {cartLoading ? (
                  <Loader2
                    size={20}
                    className="animate-spin"
                  />
                ) : (
                  <ShoppingCart size={20} />
                )}

                {isOutOfStock
                  ? "Out Of Stock"
                  : "Add To Cart"}

              </button>

              {/* BUY NOW */}

              <button
                type="button"
                onClick={buyNow}
                disabled={isOutOfStock}
                className="
                  h-14
                  rounded-2xl
                  bg-black
                  hover:bg-[#D4AF37]
                  disabled:bg-gray-300
                  disabled:cursor-not-allowed
                  text-white
                  font-black
                  transition
                "
              >
                Buy Now
              </button>

            </div>

            {/* SERVICE FEATURES */}

            <div className="grid sm:grid-cols-2 gap-3 mt-7">

              <div className="bg-[#faf8f3] rounded-2xl p-4 flex gap-3">
                <Truck className="text-[#D4AF37]" />

                <div>
                  <p className="font-bold">
                    Free Delivery
                  </p>

                  <p className="text-xs text-gray-500">
                    Fast delivery
                  </p>
                </div>
              </div>

              <div className="bg-[#faf8f3] rounded-2xl p-4 flex gap-3">
                <ShieldCheck className="text-[#D4AF37]" />

                <div>
                  <p className="font-bold">
                    Secure Payment
                  </p>

                  <p className="text-xs text-gray-500">
                    100% secure checkout
                  </p>
                </div>
              </div>

              <div className="bg-[#faf8f3] rounded-2xl p-4 flex gap-3">
                <RotateCcw className="text-[#D4AF37]" />

                <div>
                  <p className="font-bold">
                    Easy Returns
                  </p>

                  <p className="text-xs text-gray-500">
                    Hassle-free returns
                  </p>
                </div>
              </div>

              <div className="bg-[#faf8f3] rounded-2xl p-4 flex gap-3">
                <PackageCheck className="text-[#D4AF37]" />

                <div>
                  <p className="font-bold">
                    Quality Assured
                  </p>

                  <p className="text-xs text-gray-500">
                    Genuine products
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>


        {/* =========================
            PRODUCT INFORMATION
        ========================= */}

        <div
          className="
            mt-10
            bg-white
            rounded-[30px]
            border
            p-6
            sm:p-8
          "
        >

          <h2 className="text-2xl font-black mb-6">
            Product Information
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

            <div className="bg-gray-50 rounded-2xl p-5">
              <p className="text-sm text-gray-500">
                Brand
              </p>

              <p className="font-bold mt-1">
                {product.brand || "PrimeCart"}
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-5">
              <p className="text-sm text-gray-500">
                Product ID
              </p>

              <p className="font-bold mt-1 text-xs break-all">
                {product.id}
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-5">
              <p className="text-sm text-gray-500">
                Stock
              </p>

              <p className="font-bold mt-1">
                {product.stock ?? 0}
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-5">
              <p className="text-sm text-gray-500">
                Reviews
              </p>

              <p className="font-bold mt-1">
                {product.reviews_count ?? 0}
              </p>
            </div>

          </div>

        </div>


        {/* =========================
            REVIEWS
        ========================= */}

        <div
          className="
            mt-8
            bg-white
            rounded-[30px]
            border
            p-6
            sm:p-8
          "
        >

          <h2 className="text-2xl font-black">
            Customer Reviews
          </h2>

          <div className="mt-6 flex flex-col sm:flex-row gap-6">

            <div
              className="
                bg-gray-50
                rounded-2xl
                p-6
                text-center
                sm:w-52
              "
            >

              <p className="text-5xl font-black">
                {product.rating ?? 4.5}
              </p>

              <div className="flex justify-center gap-1 mt-3">

                {[1, 2, 3, 4, 5].map(
                  (star) => (
                    <Star
                      key={star}
                      size={17}
                      className="
                        fill-yellow-400
                        text-yellow-400
                      "
                    />
                  )
                )}

              </div>

              <p className="text-sm text-gray-500 mt-2">
                {product.reviews_count ?? 0} Reviews
              </p>

            </div>

            <div className="flex-1">

              <div className="border rounded-2xl p-5">

                <div className="flex justify-between">

                  <div>
                    <p className="font-bold">
                      Verified Customer
                    </p>

                    <p className="text-xs text-gray-400">
                      Verified Purchase
                    </p>
                  </div>

                  <span className="text-yellow-400">
                    ★★★★★
                  </span>

                </div>

                <p className="text-gray-600 mt-3">
                  Great quality product. Exactly as
                  described and delivery was fast.
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* =========================
            RELATED PRODUCTS
        ========================= */}

        <div className="mt-12">

          <h2 className="text-3xl font-black">
            Related Products
          </h2>

          <p className="text-gray-500 mt-1 mb-6">
            You may also like these products
          </p>

          {relatedLoading ? (
            <div className="flex justify-center py-10">
              <Loader2
                size={30}
                className="
                  animate-spin
                  text-[#D4AF37]
                "
              />
            </div>
          ) : relatedProducts.length === 0 ? (
            <div
              className="
                bg-white
                border
                rounded-2xl
                p-8
                text-center
              "
            >
              <p className="text-gray-500">
                No related products available.
              </p>
            </div>
          ) : (
            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-4
                gap-6
              "
            >

              {relatedProducts.map((item) => (

                <Link
                  key={item.id}
                  href={`/dashboard/product/${item.id}`}
                  className="
                    bg-white
                    rounded-3xl
                    border
                    overflow-hidden
                    hover:shadow-xl
                    transition
                    group
                  "
                >

                  <div
                    className="
                      relative
                      h-56
                      bg-gray-50
                    "
                  >

                    {item.image_url ? (
                      <Image
                        src={item.image_url}
                        alt={item.name}
                        fill
                        sizes="
                          (max-width: 640px) 100vw,
                          (max-width: 1024px) 50vw,
                          25vw
                        "
                        className="
                          object-contain
                          p-6
                          group-hover:scale-110
                          transition
                        "
                      />
                    ) : (
                      <div
                        className="
                          h-full
                          flex
                          items-center
                          justify-center
                          text-gray-400
                        "
                      >
                        No Image
                      </div>
                    )}

                  </div>

                  <div className="p-5">

                    <h3
                      className="
                        font-bold
                        line-clamp-2
                        group-hover:text-[#D4AF37]
                        transition
                      "
                    >
                      {item.name}
                    </h3>

                    <div className="flex items-center gap-2 mt-3">

                      <span
                        className="
                          bg-green-600
                          text-white
                          px-2
                          py-1
                          rounded-lg
                          text-xs
                          font-bold
                          flex
                          items-center
                          gap-1
                        "
                      >
                        <Star
                          size={12}
                          className="fill-white"
                        />

                        {item.rating ?? 4.5}
                      </span>

                      <span className="text-xs text-gray-500">
                        ({item.reviews_count ?? 0})
                      </span>

                    </div>

                    <div className="flex items-center gap-2 mt-3">

                      <span className="text-xl font-black">
                        ₹
                        {Number(
                          item.price
                        ).toLocaleString("en-IN")}
                      </span>

                      {item.original_price &&
                        item.original_price >
                          item.price && (
                          <span
                            className="
                              text-sm
                              text-gray-400
                              line-through
                            "
                          >
                            ₹
                            {Number(
                              item.original_price
                            ).toLocaleString("en-IN")}
                          </span>
                        )}

                    </div>

                  </div>

                </Link>

              ))}

            </div>
          )}

        </div>

      </section>

    </main>
  );
}
