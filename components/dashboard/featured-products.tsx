"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Check,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  ShoppingCart,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  Package,
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
  const params = useParams();
  const productId = String(params.id);

  const supabase = createClient();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", productId)
          .eq("is_active", true)
          .single();

        console.log("PRODUCT DETAIL:", data);
        console.log("PRODUCT DETAIL ERROR:", error);

        if (error) {
          console.error("Product fetch error:", error);
          setErrorMessage(error.message);
          setProduct(null);
          return;
        }

        setProduct(data);
      } catch (error) {
        console.error("Unexpected product error:", error);
        setErrorMessage(
          "Something went wrong while loading this product."
        );
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="animate-pulse">

            <div className="h-5 w-32 bg-gray-200 rounded mb-8" />

            <div className="grid lg:grid-cols-2 gap-12">

              <div className="h-[550px] bg-gray-100 rounded-3xl" />

              <div className="space-y-5">
                <div className="h-5 w-24 bg-gray-200 rounded" />
                <div className="h-12 w-4/5 bg-gray-200 rounded" />
                <div className="h-5 w-32 bg-gray-200 rounded" />
                <div className="h-10 w-48 bg-gray-200 rounded" />
                <div className="h-20 w-full bg-gray-200 rounded" />
                <div className="h-12 w-full bg-gray-200 rounded" />
                <div className="h-12 w-full bg-gray-200 rounded" />
              </div>

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
      <main className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="max-w-lg w-full text-center">

          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
            <Package
              size={36}
              className="text-gray-400"
            />
          </div>

          <h1 className="text-3xl font-black text-gray-900 mt-6">
            Product Not Found
          </h1>

          <p className="text-gray-500 mt-3">
            {errorMessage ||
              "The product you're looking for does not exist or is no longer available."}
          </p>

          <Link
            href="/dashboard/products"
            className="
              inline-flex
              items-center
              gap-2
              mt-7
              px-6
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
            Back To Products
          </Link>

        </div>
      </main>
    );
  }

  /* =========================
     CALCULATIONS
  ========================= */

  const price = Number(product.price);

  const originalPrice = product.original_price
    ? Number(product.original_price)
    : null;

  const discount =
    originalPrice && originalPrice > price
      ? Math.round(
          ((originalPrice - price) / originalPrice) * 100
        )
      : 0;

  const stock = Number(product.stock ?? 0);

  const rating = Number(product.rating ?? 4.5);

  const reviews = Number(
    product.reviews_count ?? 0
  );

  const isOutOfStock = stock <= 0;

  const increaseQuantity = () => {
    if (quantity < stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = async () => {
    if (isOutOfStock) return;

    setAddingToCart(true);

    console.log("ADD TO CART:", {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
    });

    /*
      Cart functionality can be connected here later.
    */

    setTimeout(() => {
      setAddingToCart(false);
    }, 700);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;

    console.log("BUY NOW:", {
      id: product.id,
      quantity,
    });

    /*
      Checkout functionality can be connected here later.
    */
  };

  return (
    <main className="min-h-screen bg-white">

      {/* =========================
          TOP NAV / BACK
      ========================= */}

      <div className="max-w-7xl mx-auto px-6 pt-6">

        <Link
          href="/dashboard/products"
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            font-bold
            text-gray-500
            hover:text-black
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

      <section className="max-w-7xl mx-auto px-6 py-8">

        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16">

          {/* =========================
              LEFT - IMAGE
          ========================= */}

          <div>

            <div
              className="
                relative
                h-[420px]
                sm:h-[520px]
                lg:h-[580px]
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
                    tracking-wide
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
                  setWishlist((prev) => !prev)
                }
                aria-label="Wishlist"
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

              {/* IMAGE */}

              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  priority
                  sizes="
                    (max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    600px
                  "
                  className="
                    object-contain
                    p-8
                    sm:p-12
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
                  <div className="text-center">

                    <ShoppingBag
                      size={60}
                      className="mx-auto"
                    />

                    <p className="mt-4 font-semibold">
                      No Image Available
                    </p>

                  </div>
                </div>
              )}

            </div>

            {/* IMAGE NOTE */}

            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-400">
              <ShieldCheck size={16} />
              Secure & quality assured product
            </div>

          </div>

          {/* =========================
              RIGHT - DETAILS
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

            <div className="flex flex-wrap items-center gap-3 mt-5">

              <div
                className="
                  inline-flex
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

              <span className="text-gray-500 font-medium">
                {reviews}{" "}
                {reviews === 1
                  ? "Review"
                  : "Reviews"}
              </span>

              <span className="text-gray-300">
                •
              </span>

              <span className="text-gray-500">
                PrimeCart Verified
              </span>

            </div>

            {/* DIVIDER */}

            <div className="h-px bg-gray-100 my-6" />

            {/* SHORT DESCRIPTION */}

            <p className="text-gray-600 text-base leading-7">
              {product.short_description ||
                product.description ||
                "Premium quality product from PrimeCart."}
            </p>

            {/* PRICE */}

            <div className="mt-7">

              <div className="flex items-end flex-wrap gap-3">

                <span
                  className="
                    text-4xl
                    sm:text-5xl
                    font-black
                    text-gray-900
                  "
                >
                  ₹
                  {price.toLocaleString(
                    "en-IN"
                  )}
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
                        Save {discount}%
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
                <div className="flex items-center gap-2 text-red-600 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  Out of Stock
                </div>
              ) : stock <= 5 ? (
                <div className="flex items-center gap-2 text-orange-600 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                  Only {stock} left in stock
                </div>
              ) : (
                <div className="flex items-center gap-2 text-green-600 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  In Stock
                </div>
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
                      transition
                    "
                  >
                    <Minus size={17} />
                  </button>

                  <div
                    className="
                      w-14
                      h-12
                      flex
                      items-center
                      justify-center
                      font-black
                      border-x
                      border-gray-200
                    "
                  >
                    {quantity}
                  </div>

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
                      transition
                    "
                  >
                    <Plus size={17} />
                  </button>

                </div>

              </div>
            )}

            {/* ACTIONS */}

            <div className="grid sm:grid-cols-2 gap-3 mt-7">

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={
                  isOutOfStock ||
                  addingToCart
                }
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
                  disabled:cursor-not-allowed
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
                onClick={handleBuyNow}
                disabled={isOutOfStock}
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
                <ShoppingBag size={20} />
                Buy Now
              </button>

            </div>

            {/* BENEFITS */}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">

              <div
                className="
                  rounded-2xl
                  bg-gray-50
                  p-4
                  border
                  border-gray-100
                "
              >
                <Truck
                  size={21}
                  className="text-[#D4AF37]"
                />

                <p className="font-bold text-sm mt-3">
                  Fast Delivery
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Quick & reliable delivery
                </p>
              </div>

              <div
                className="
                  rounded-2xl
                  bg-gray-50
                  p-4
                  border
                  border-gray-100
                "
              >
                <ShieldCheck
                  size={21}
                  className="text-[#D4AF37]"
                />

                <p className="font-bold text-sm mt-3">
                  Secure Payment
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  100% secure checkout
                </p>
              </div>

              <div
                className="
                  rounded-2xl
                  bg-gray-50
                  p-4
                  border
                  border-gray-100
                "
              >
                <RotateCcw
                  size={21}
                  className="text-[#D4AF37]"
                />

                <p className="font-bold text-sm mt-3">
                  Easy Returns
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Hassle-free returns
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

            {/* DESCRIPTION */}

            <div className="lg:col-span-2">

              <p className="text-sm font-black text-[#D4AF37] uppercase tracking-wider">
                Product Information
              </p>

              <h2 className="text-3xl font-black text-gray-900 mt-2">
                About This Product
              </h2>

              <div className="mt-5 text-gray-600 leading-8 whitespace-pre-line">
                {product.description ||
                  product.short_description ||
                  "No detailed description is available for this product yet."}
              </div>

            </div>

            {/* PRODUCT DETAILS */}

            <div
              className="
                rounded-3xl
                bg-gray-50
                border
                border-gray-100
                p-6
                h-fit
              "
            >

              <h3 className="text-xl font-black text-gray-900">
                Product Details
              </h3>

              <div className="mt-5 space-y-4">

                {product.brand && (
                  <div className="flex justify-between gap-4 pb-4 border-b border-gray-200">
                    <span className="text-gray-500">
                      Brand
                    </span>

                    <span className="font-bold text-gray-900 text-right">
                      {product.brand}
                    </span>
                  </div>
                )}

                <div className="flex justify-between gap-4 pb-4 border-b border-gray-200">
                  <span className="text-gray-500">
                    Rating
                  </span>

                  <span className="font-bold text-gray-900">
                    {rating.toFixed(1)} / 5
                  </span>
                </div>

                <div className="flex justify-between gap-4 pb-4 border-b border-gray-200">
                  <span className="text-gray-500">
                    Reviews
                  </span>

                  <span className="font-bold text-gray-900">
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
                      : "In Stock"}
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =========================
          TRUST BAR
      ========================= */}

      <section className="border-t border-gray-100 bg-gray-50">

        <div className="max-w-7xl mx-auto px-6 py-10">

          <div className="grid sm:grid-cols-3 gap-8">

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                <Truck
                  size={22}
                  className="text-[#D4AF37]"
                />
              </div>

              <div>
                <p className="font-black text-gray-900">
                  Fast & Reliable Delivery
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Delivered safely to your doorstep
                </p>
              </div>

            </div>

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                <ShieldCheck
                  size={22}
                  className="text-[#D4AF37]"
                />
              </div>

              <div>
                <p className="font-black text-gray-900">
                  100% Secure Shopping
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Your data is always protected
                </p>
              </div>

            </div>

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                <Check
                  size={22}
                  className="text-[#D4AF37]"
                />
              </div>

              <div>
                <p className="font-black text-gray-900">
                  Quality Products
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Carefully selected for PrimeCart
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}
