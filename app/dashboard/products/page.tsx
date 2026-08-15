"use client";
export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  ArrowLeft,
  Check,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";

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
};

export default function ProductPage() {
  const searchParams = useSearchParams();

  const productId = searchParams.get("id");

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);

  /* =========================
     FETCH PRODUCT
  ========================= */

  useEffect(() => {
    if (!productId) {
      setErrorMessage("Product ID is missing.");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const supabase = createClient();

        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", productId)
          .eq("is_active", true)
          .maybeSingle();

        console.log("PRODUCT ID:", productId);
        console.log("PRODUCT DATA:", data);
        console.log("PRODUCT ERROR:", error);

        if (error) {
          setErrorMessage(error.message);
          setProduct(null);
          return;
        }

        if (!data) {
          setErrorMessage("Product not found.");
          setProduct(null);
          return;
        }

        setProduct(data);
      } catch (error) {
        console.error("Product fetch error:", error);

        setErrorMessage(
          "Something went wrong while loading this product."
        );

        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-white">

        <div className="max-w-7xl mx-auto px-6 py-8">

          <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />

          <div className="grid lg:grid-cols-2 gap-12 mt-10">

            <div className="h-[550px] bg-gray-100 rounded-[32px] animate-pulse" />

            <div className="space-y-5 pt-5">

              <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />

              <div className="h-12 w-4/5 bg-gray-200 rounded animate-pulse" />

              <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />

              <div className="h-24 w-full bg-gray-200 rounded animate-pulse" />

              <div className="h-12 w-48 bg-gray-200 rounded animate-pulse" />

              <div className="h-14 w-full bg-gray-200 rounded animate-pulse" />

            </div>

          </div>

        </div>

      </main>
    );
  }

  /* =========================
     ERROR / NOT FOUND
  ========================= */

  if (!product) {
    return (
      <main className="min-h-screen bg-white">

        <div className="max-w-7xl mx-auto px-6 py-8">

          <Link
            href="/dashboard/products"
            className="
              inline-flex
              items-center
              gap-2
              text-gray-500
              font-bold
              hover:text-[#D4AF37]
              transition
            "
          >
            <ArrowLeft size={18} />
            Back to Products
          </Link>

        </div>

        <div className="min-h-[70vh] flex items-center justify-center px-6">

          <div className="text-center max-w-md">

            <div
              className="
                w-24
                h-24
                mx-auto
                rounded-3xl
                bg-gray-100
                flex
                items-center
                justify-center
              "
            >
              <ShoppingBag
                size={42}
                className="text-gray-400"
              />
            </div>

            <h1 className="text-3xl font-black text-gray-900 mt-7">
              Product Not Found
            </h1>

            <p className="text-gray-500 mt-3">
              {errorMessage || "This product is unavailable."}
            </p>

            <Link
              href="/dashboard/products"
              className="
                inline-flex
                items-center
                gap-2
                mt-7
                px-7
                h-12
                rounded-2xl
                bg-[#D4AF37]
                hover:bg-black
                text-white
                font-bold
                transition
              "
            >
              <ArrowLeft size={18} />
              Back to Products
            </Link>

          </div>

        </div>

      </main>
    );
  }

  /* =========================
     PRODUCT VALUES
  ========================= */

  const price = Number(product.price || 0);

  const originalPrice =
    product.original_price !== null
      ? Number(product.original_price)
      : null;

  const stock = Number(product.stock || 0);

  const rating = Number(product.rating || 4.5);

  const reviews = Number(product.reviews_count || 0);

  const discount =
    originalPrice && originalPrice > price
      ? Math.round(
          ((originalPrice - price) / originalPrice) * 100
        )
      : 0;

  const isOutOfStock = stock <= 0;

  /* =========================
     QUANTITY
  ========================= */

  const decreaseQuantity = () => {
    setQuantity((current) =>
      current > 1 ? current - 1 : 1
    );
  };

  const increaseQuantity = () => {
    if (quantity < stock) {
      setQuantity((current) => current + 1);
    }
  };

  /* =========================
     ADD TO CART
  ========================= */

  const handleAddToCart = () => {
    if (isOutOfStock) return;

    setAddingToCart(true);

    console.log("ADD TO CART:", {
      product_id: product.id,
      name: product.name,
      price,
      quantity,
    });

    setTimeout(() => {
      setAddingToCart(false);
    }, 800);
  };

  return (
    <main className="min-h-screen bg-white">

      {/* =========================
          BACK
      ========================= */}

      <div className="max-w-7xl mx-auto px-6 pt-7">

        <Link
          href="/dashboard/products"
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            font-bold
            text-gray-500
            hover:text-[#D4AF37]
            transition
          "
        >
          <ArrowLeft size={18} />
          Back to Products
        </Link>

      </div>

      {/* =========================
          PRODUCT SECTION
      ========================= */}

      <section className="max-w-7xl mx-auto px-6 py-8 lg:py-12">

        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16">

          {/* =========================
              LEFT IMAGE
          ========================= */}

          <div>

            <div
              className="
                relative
                h-[420px]
                sm:h-[520px]
                lg:h-[600px]
                bg-gray-50
                rounded-[32px]
                overflow-hidden
                border
                border-gray-100
              "
            >

              {/* FLASH SALE */}

              {product.is_flash_sale && (
                <div
                  className="
                    absolute
                    top-5
                    left-5
                    z-20
                    bg-red-500
                    text-white
                    px-4
                    py-2
                    rounded-full
                    text-xs
                    font-black
                  "
                >
                  FLASH SALE
                </div>
              )}

              {/* DISCOUNT */}

              {discount > 0 &&
                !product.is_flash_sale && (
                  <div
                    className="
                      absolute
                      top-5
                      left-5
                      z-20
                      bg-black
                      text-white
                      px-4
                      py-2
                      rounded-full
                      text-xs
                      font-black
                    "
                  >
                    {discount}% OFF
                  </div>
                )}

              {/* WISHLIST */}

              <button
                type="button"
                onClick={() =>
                  setWishlist((current) => !current)
                }
                className="
                  absolute
                  top-5
                  right-5
                  z-20
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
                  size={22}
                  className={
                    wishlist
                      ? "fill-red-500 text-red-500"
                      : "text-gray-700"
                  }
                />
              </button>

              {/* PRODUCT IMAGE */}

              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  priority
                  sizes="
                    (max-width: 640px) 100vw,
                    (max-width: 1024px) 50vw,
                    50vw
                  "
                  className="object-contain p-8 sm:p-12"
                />
              ) : (
                <div
                  className="
                    h-full
                    flex
                    flex-col
                    items-center
                    justify-center
                    text-gray-400
                  "
                >
                  <ShoppingBag size={55} />

                  <p className="mt-4 font-semibold">
                    No Image Available
                  </p>
                </div>
              )}

            </div>

            <div
              className="
                flex
                items-center
                justify-center
                gap-2
                text-sm
                text-gray-400
                mt-4
              "
            >
              <ShieldCheck size={17} />
              Secure & Quality Assured
            </div>

          </div>

          {/* =========================
              RIGHT DETAILS
          ========================= */}

          <div className="flex flex-col justify-center">

            {/* BRAND */}

            {product.brand && (
              <p
                className="
                  text-sm
                  font-black
                  uppercase
                  tracking-[0.18em]
                  text-[#D4AF37]
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
                lg:text-5xl
                font-black
                text-gray-900
                leading-tight
                mt-3
              "
            >
              {product.name}
            </h1>

            {/* RATING */}

            <div className="flex items-center gap-3 mt-5">

              <div
                className="
                  flex
                  items-center
                  gap-1.5
                  bg-green-600
                  text-white
                  px-3
                  py-1.5
                  rounded-lg
                  font-bold
                "
              >
                <Star
                  size={15}
                  className="fill-white"
                />

                {rating.toFixed(1)}
              </div>

              <span className="text-gray-500">
                {reviews} Reviews
              </span>

            </div>

            <div className="h-px bg-gray-100 my-6" />

            {/* DESCRIPTION */}

            <p
              className="
                text-gray-600
                leading-7
                text-base
              "
            >
              {product.short_description ||
                product.description ||
                "Premium quality product from PrimeCart."}
            </p>

            {/* PRICE */}

            <div className="mt-7">

              <div className="flex flex-wrap items-end gap-3">

                <span
                  className="
                    text-4xl
                    sm:text-5xl
                    font-black
                    text-gray-900
                  "
                >
                  ₹{price.toLocaleString("en-IN")}
                </span>

                {originalPrice &&
                  originalPrice > price && (
                    <>
                      <span
                        className="
                          text-lg
                          text-gray-400
                          line-through
                          mb-1
                        "
                      >
                        ₹
                        {originalPrice.toLocaleString(
                          "en-IN"
                        )}
                      </span>

                      <span
                        className="
                          text-sm
                          font-black
                          text-green-600
                          mb-2
                        "
                      >
                        {discount}% OFF
                      </span>
                    </>
                  )}

              </div>

              <p className="text-xs text-gray-400 mt-2">
                Inclusive of all applicable taxes
              </p>

            </div>

            {/* STOCK */}

            <div className="mt-6">

              {isOutOfStock ? (
                <p className="font-bold text-red-500">
                  ● Out of Stock
                </p>
              ) : stock <= 5 ? (
                <p className="font-bold text-orange-500">
                  ● Only {stock} left in stock
                </p>
              ) : (
                <p className="font-bold text-green-600">
                  ● In Stock
                </p>
              )}

            </div>

            {/* QUANTITY */}

            {!isOutOfStock && (
              <div className="mt-6">

                <p className="text-sm font-bold text-gray-700 mb-3">
                  Quantity
                </p>

                <div
                  className="
                    inline-flex
                    items-center
                    border
                    border-gray-200
                    rounded-2xl
                    overflow-hidden
                  "
                >

                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="
                      w-12
                      h-12
                      flex
                      items-center
                      justify-center
                      hover:bg-gray-50
                      disabled:opacity-30
                    "
                  >
                    <Minus size={17} />
                  </button>

                  <span
                    className="
                      w-14
                      h-12
                      flex
                      items-center
                      justify-center
                      border-x
                      border-gray-200
                      font-black
                    "
                  >
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    disabled={quantity >= stock}
                    className="
                      w-12
                      h-12
                      flex
                      items-center
                      justify-center
                      hover:bg-gray-50
                      disabled:opacity-30
                    "
                  >
                    <Plus size={17} />
                  </button>

                </div>

              </div>
            )}

            {/* BUTTONS */}

            <div
              className="
                grid
                sm:grid-cols-2
                gap-3
                mt-7
              "
            >

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock || addingToCart}
                className="
                  h-14
                  rounded-2xl
                  border-2
                  border-[#D4AF37]
                  text-[#B79524]
                  hover:bg-[#D4AF37]
                  hover:text-white
                  disabled:bg-gray-100
                  disabled:border-gray-200
                  disabled:text-gray-400
                  font-black
                  flex
                  items-center
                  justify-center
                  gap-2
                  transition
                "
              >
                <ShoppingCart size={20} />

                {addingToCart
                  ? "Adding..."
                  : "Add To Cart"}
              </button>

              <button
                type="button"
                disabled={isOutOfStock}
                className="
                  h-14
                  rounded-2xl
                  bg-[#D4AF37]
                  hover:bg-black
                  disabled:bg-gray-300
                  text-white
                  font-black
                  flex
                  items-center
                  justify-center
                  gap-2
                  transition
                "
              >
                <ShoppingBag size={20} />
                Buy Now
              </button>

            </div>

            {/* BENEFITS */}

            <div
              className="
                grid
                sm:grid-cols-3
                gap-3
                mt-8
              "
            >

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">

                <Truck
                  size={21}
                  className="text-[#D4AF37]"
                />

                <p className="font-bold text-sm mt-3">
                  Fast Delivery
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Quick delivery
                </p>

              </div>

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">

                <ShieldCheck
                  size={21}
                  className="text-[#D4AF37]"
                />

                <p className="font-bold text-sm mt-3">
                  Secure Payment
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Safe checkout
                </p>

              </div>

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">

                <RotateCcw
                  size={21}
                  className="text-[#D4AF37]"
                />

                <p className="font-bold text-sm mt-3">
                  Easy Returns
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Hassle-free
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =========================
          DESCRIPTION SECTION
      ========================= */}

      <section className="max-w-7xl mx-auto px-6 pb-16">

        <div className="border-t border-gray-100 pt-10">

          <div className="grid lg:grid-cols-3 gap-10">

            <div className="lg:col-span-2">

              <p
                className="
                  text-sm
                  font-black
                  text-[#D4AF37]
                  uppercase
                  tracking-wider
                "
              >
                PrimeCart Product
              </p>

              <h2
                className="
                  text-3xl
                  font-black
                  text-gray-900
                  mt-2
                "
              >
                About This Product
              </h2>

              <p
                className="
                  mt-5
                  text-gray-600
                  leading-8
                  whitespace-pre-line
                "
              >
                {product.description ||
                  product.short_description ||
                  "No detailed description available."}
              </p>

            </div>

            {/* DETAILS CARD */}

            <div
              className="
                bg-gray-50
                border
                border-gray-100
                rounded-3xl
                p-6
                h-fit
              "
            >

              <h3 className="text-xl font-black">
                Product Details
              </h3>

              <div className="mt-5 space-y-4">

                {product.brand && (
                  <div
                    className="
                      flex
                      justify-between
                      gap-4
                      pb-4
                      border-b
                      border-gray-200
                    "
                  >
                    <span className="text-gray-500">
                      Brand
                    </span>

                    <span className="font-bold">
                      {product.brand}
                    </span>
                  </div>
                )}

                <div
                  className="
                    flex
                    justify-between
                    gap-4
                    pb-4
                    border-b
                    border-gray-200
                  "
                >
                  <span className="text-gray-500">
                    Rating
                  </span>

                  <span className="font-bold">
                    {rating.toFixed(1)} / 5
                  </span>
                </div>

                <div
                  className="
                    flex
                    justify-between
                    gap-4
                    pb-4
                    border-b
                    border-gray-200
                  "
                >
                  <span className="text-gray-500">
                    Reviews
                  </span>

                  <span className="font-bold">
                    {reviews}
                  </span>
                </div>

                <div className="flex justify-between gap-4">

                  <span className="text-gray-500">
                    Availability
                  </span>

                  <span
                    className={
                      isOutOfStock
                        ? "font-bold text-red-500"
                        : "font-bold text-green-600"
                    }
                  >
                    {isOutOfStock
                      ? "Out of Stock"
                      : `${stock} Available`}
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =========================
          TRUST SECTION
      ========================= */}

      <section className="border-t border-gray-100 bg-gray-50">

        <div
          className="
            max-w-7xl
            mx-auto
            px-6
            py-10
            grid
            sm:grid-cols-3
            gap-8
          "
        >

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center">
              <Truck
                size={22}
                className="text-[#D4AF37]"
              />
            </div>

            <div>
              <p className="font-black">
                Fast Delivery
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Safe doorstep delivery
              </p>
            </div>

          </div>

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center">
              <ShieldCheck
                size={22}
                className="text-[#D4AF37]"
              />
            </div>

            <div>
              <p className="font-black">
                Secure Shopping
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Protected checkout
              </p>
            </div>

          </div>

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center">
              <Check
                size={22}
                className="text-[#D4AF37]"
              />
            </div>

            <div>
              <p className="font-black">
                Quality Products
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Carefully selected
              </p>
            </div>

          </div>

        </div>

      </section>

    </main>
  );
}
