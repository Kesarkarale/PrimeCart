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
  Package,
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

export default function ProductDetailPage() {
  const params = useParams();

  const productId = Array.isArray(params?.id)
    ? params.id[0]
    : String(params?.id ?? "");

  const [product, setProduct] = useState<Product | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);

  const [addingToCart, setAddingToCart] = useState(false);
  const [buying, setBuying] = useState(false);

  /* =========================================================
     FETCH PRODUCT
  ========================================================= */

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const supabase = createClient();

        const { data, error: fetchError } = await supabase
          .from("products")
          .select("*")
          .eq("id", productId)
          .eq("is_active", true)
          .maybeSingle();

        if (fetchError) {
          console.error("PRODUCT ERROR:", fetchError);
          setError(fetchError.message);
          setProduct(null);
          return;
        }

        if (!data) {
          setError("This product could not be found.");
          setProduct(null);
          return;
        }

        setProduct(data);
      } catch (err) {
        console.error("PRODUCT FETCH ERROR:", err);

        setError(
          "Something went wrong while loading this product."
        );

        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-[#faf8f3]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-5 w-40 bg-gray-200 rounded-lg mb-8" />

            <div className="grid lg:grid-cols-2 gap-8 xl:gap-14">
              <div className="h-[500px] lg:h-[650px] bg-gray-200 rounded-[32px]" />

              <div className="space-y-5 pt-4">
                <div className="h-5 w-28 bg-gray-200 rounded" />
                <div className="h-14 w-4/5 bg-gray-200 rounded-xl" />
                <div className="h-6 w-48 bg-gray-200 rounded" />
                <div className="h-12 w-52 bg-gray-200 rounded-xl" />
                <div className="h-20 bg-gray-200 rounded-xl" />
                <div className="h-14 bg-gray-200 rounded-xl" />
                <div className="h-14 bg-gray-200 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     NOT FOUND
  ========================================================= */

  if (!product) {
    return (
      <main className="min-h-screen bg-[#faf8f3]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/dashboard/products"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#D4AF37] transition"
          >
            <ArrowLeft size={18} />
            Back to Products
          </Link>

          <div className="min-h-[70vh] flex items-center justify-center">
            <div className="text-center max-w-md">
              <div className="w-24 h-24 mx-auto rounded-[28px] bg-white border border-gray-100 shadow-sm flex items-center justify-center">
                <Package
                  size={42}
                  className="text-gray-400"
                />
              </div>

              <h1 className="text-3xl font-black text-gray-900 mt-7">
                Product Not Found
              </h1>

              <p className="text-gray-500 mt-3 leading-6">
                {error ||
                  "This product is no longer available."}
              </p>

              <Link
                href="/dashboard/products"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  mt-7
                  px-7
                  h-12
                  rounded-2xl
                  bg-[#D4AF37]
                  hover:bg-black
                  text-white
                  font-black
                  transition
                "
              >
                <ArrowLeft size={18} />
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     PRODUCT VALUES
  ========================================================= */

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

  const outOfStock = stock <= 0;

  /* =========================================================
     QUANTITY
  ========================================================= */

  const decreaseQuantity = () => {
    setQuantity((current) =>
      current > 1 ? current - 1 : 1
    );
  };

  const increaseQuantity = () => {
    setQuantity((current) =>
      current < stock ? current + 1 : current
    );
  };

  /* =========================================================
     ADD TO CART
  ========================================================= */

  const handleAddToCart = () => {
    if (outOfStock || addingToCart) return;

    setAddingToCart(true);

    console.log("ADD TO CART:", {
      productId: product.id,
      name: product.name,
      price,
      quantity,
    });

    setTimeout(() => {
      setAddingToCart(false);
    }, 800);
  };

  /* =========================================================
     BUY NOW
  ========================================================= */

  const handleBuyNow = () => {
    if (outOfStock || buying) return;

    setBuying(true);

    console.log("BUY NOW:", {
      productId: product.id,
      name: product.name,
      price,
      quantity,
    });

    setTimeout(() => {
      setBuying(false);
    }, 800);
  };

  return (
    <main className="min-h-screen bg-[#faf8f3]">

      {/* =====================================================
          TOP NAV / BREADCRUMB
      ===================================================== */}

      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5">

          <div className="flex items-center gap-2 text-sm">

            <Link
              href="/dashboard"
              className="font-bold text-[#B79524] hover:text-black transition"
            >
              Home
            </Link>

            <span className="text-gray-300">
              /
            </span>

            <Link
              href="/dashboard/products"
              className="font-semibold text-gray-500 hover:text-[#B79524] transition"
            >
              Products
            </Link>

            <span className="text-gray-300">
              /
            </span>

            <span className="text-gray-400 truncate max-w-[180px]">
              {product.name}
            </span>

          </div>

        </div>
      </div>

      {/* =====================================================
          PRODUCT SECTION
      ===================================================== */}

      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-7 lg:py-10">

        {/* BACK */}

        <Link
          href="/dashboard/products"
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            font-bold
            text-gray-500
            hover:text-[#B79524]
            transition
            mb-7
          "
        >
          <ArrowLeft size={18} />
          Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 xl:gap-14">

          {/* =================================================
              LEFT — IMAGE
          ================================================= */}

          <div>

            <div
              className="
                relative
                h-[430px]
                sm:h-[540px]
                lg:h-[650px]
                rounded-[32px]
                bg-white
                border
                border-gray-100
                shadow-sm
                overflow-hidden
              "
            >

              {/* TOP BADGES */}

              <div className="absolute top-5 left-5 z-20 flex flex-wrap gap-2">

                {product.is_flash_sale && (
                  <span className="px-4 py-2 rounded-full bg-red-500 text-white text-xs font-black shadow-sm">
                    FLASH SALE
                  </span>
                )}

                {discount > 0 &&
                  !product.is_flash_sale && (
                    <span className="px-4 py-2 rounded-full bg-black text-white text-xs font-black shadow-sm">
                      {discount}% OFF
                    </span>
                  )}

                {product.is_featured && (
                  <span className="px-4 py-2 rounded-full bg-[#D4AF37] text-white text-xs font-black shadow-sm">
                    FEATURED
                  </span>
                )}

              </div>

              {/* WISHLIST */}

              <button
                type="button"
                onClick={() =>
                  setWishlist((current) => !current)
                }
                aria-label="Add to wishlist"
                className="
                  absolute
                  top-5
                  right-5
                  z-20
                  w-12
                  h-12
                  rounded-full
                  bg-white
                  border
                  border-gray-100
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
                    50vw
                  "
                  className="
                    object-contain
                    p-8
                    sm:p-12
                    lg:p-16
                    hover:scale-105
                    transition-transform
                    duration-500
                  "
                />
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <ShoppingBag size={60} />
                  <p className="mt-4 font-bold">
                    No Image Available
                  </p>
                </div>
              )}

            </div>

            {/* IMAGE TRUST */}

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-5 text-xs sm:text-sm text-gray-500">

              <div className="flex items-center gap-2">
                <ShieldCheck
                  size={17}
                  className="text-[#D4AF37]"
                />
                Secure Shopping
              </div>

              <div className="flex items-center gap-2">
                <Check
                  size={17}
                  className="text-green-600"
                />
                Quality Checked
              </div>

            </div>

          </div>

          {/* =================================================
              RIGHT — DETAILS
          ================================================= */}

          <div className="flex flex-col justify-center">

            {/* BRAND */}

            {product.brand && (
              <p className="
                text-xs
                sm:text-sm
                uppercase
                tracking-[0.2em]
                font-black
                text-[#B79524]
              ">
                {product.brand}
              </p>
            )}

            {/* NAME */}

            <h1 className="
              text-3xl
              sm:text-4xl
              xl:text-5xl
              font-black
              text-gray-950
              leading-[1.08]
              mt-3
            ">
              {product.name}
            </h1>

            {/* RATING */}

            <div className="flex flex-wrap items-center gap-3 mt-5">

              <div className="
                inline-flex
                items-center
                gap-1.5
                bg-green-600
                text-white
                px-3
                py-1.5
                rounded-lg
                text-sm
                font-black
              ">
                <Star
                  size={15}
                  className="fill-white"
                />
                {rating.toFixed(1)}
              </div>

              <span className="text-gray-500 text-sm font-semibold">
                {reviews} Reviews
              </span>

              <span className="text-gray-300">
                •
              </span>

              <span className="text-green-600 text-sm font-bold">
                {outOfStock
                  ? "Currently unavailable"
                  : "Available"}
              </span>

            </div>

            <div className="h-px bg-gray-200 my-7" />

            {/* SHORT DESCRIPTION */}

            <p className="
              text-gray-600
              text-base
              sm:text-lg
              leading-7
            ">
              {product.short_description ||
                "Premium quality product carefully selected by PrimeCart."}
            </p>

            {/* PRICE */}

            <div className="mt-7">

              <div className="flex flex-wrap items-end gap-3">

                <span className="
                  text-4xl
                  sm:text-5xl
                  font-black
                  tracking-tight
                  text-gray-950
                ">
                  ₹{price.toLocaleString("en-IN")}
                </span>

                {originalPrice &&
                  originalPrice > price && (
                    <>
                      <span className="
                        text-lg
                        sm:text-xl
                        text-gray-400
                        line-through
                        mb-1
                      ">
                        ₹
                        {originalPrice.toLocaleString(
                          "en-IN"
                        )}
                      </span>

                      <span className="
                        text-sm
                        font-black
                        text-green-600
                        mb-2
                      ">
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

              {outOfStock ? (
                <div className="
                  inline-flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  rounded-xl
                  bg-red-50
                  text-red-600
                  font-bold
                  text-sm
                ">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  Out of Stock
                </div>
              ) : stock <= 5 ? (
                <div className="
                  inline-flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  rounded-xl
                  bg-orange-50
                  text-orange-600
                  font-bold
                  text-sm
                ">
                  <span className="w-2 h-2 rounded-full bg-orange-500" />
                  Only {stock} left in stock
                </div>
              ) : (
                <div className="
                  inline-flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  rounded-xl
                  bg-green-50
                  text-green-600
                  font-bold
                  text-sm
                ">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  In Stock
                </div>
              )}

            </div>

            {/* QUANTITY */}

            {!outOfStock && (
              <div className="mt-7">

                <p className="text-sm font-black text-gray-800 mb-3">
                  Quantity
                </p>

                <div className="
                  inline-flex
                  items-center
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  overflow-hidden
                ">

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

                  <span className="
                    w-14
                    h-12
                    border-x
                    border-gray-200
                    flex
                    items-center
                    justify-center
                    font-black
                    text-gray-900
                  ">
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
                      transition
                    "
                  >
                    <Plus size={17} />
                  </button>

                </div>

                <p className="text-xs text-gray-400 mt-2">
                  Maximum {stock} available
                </p>

              </div>
            )}

            {/* ACTION BUTTONS */}

            <div className="grid sm:grid-cols-2 gap-3 mt-7">

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={outOfStock || addingToCart}
                className="
                  h-14
                  rounded-2xl
                  border-2
                  border-[#D4AF37]
                  bg-white
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
                  transition-all
                "
              >
                <ShoppingCart size={20} />

                {addingToCart
                  ? "Adding..."
                  : "Add to Cart"}
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                disabled={outOfStock || buying}
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
                  transition-all
                  shadow-sm
                "
              >
                <ShoppingBag size={20} />

                {buying ? "Processing..." : "Buy Now"}
              </button>

            </div>

            {/* SMALL INFO */}

            <div className="
              grid
              grid-cols-1
              sm:grid-cols-3
              gap-3
              mt-8
            ">

              <div className="
                rounded-2xl
                bg-white
                border
                border-gray-100
                p-4
              ">
                <Truck
                  size={21}
                  className="text-[#D4AF37]"
                />

                <p className="font-black text-sm mt-3">
                  Fast Delivery
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Quick doorstep delivery
                </p>
              </div>

              <div className="
                rounded-2xl
                bg-white
                border
                border-gray-100
                p-4
              ">
                <ShieldCheck
                  size={21}
                  className="text-[#D4AF37]"
                />

                <p className="font-black text-sm mt-3">
                  Secure Payment
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Safe & protected checkout
                </p>
              </div>

              <div className="
                rounded-2xl
                bg-white
                border
                border-gray-100
                p-4
              ">
                <RotateCcw
                  size={21}
                  className="text-[#D4AF37]"
                />

                <p className="font-black text-sm mt-3">
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

      {/* =====================================================
          PRODUCT INFORMATION
      ===================================================== */}

      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">

        <div className="
          bg-white
          rounded-[32px]
          border
          border-gray-100
          shadow-sm
          overflow-hidden
        ">

          <div className="grid lg:grid-cols-3">

            {/* DESCRIPTION */}

            <div className="lg:col-span-2 p-7 sm:p-10">

              <p className="
                text-xs
                sm:text-sm
                font-black
                uppercase
                tracking-[0.18em]
                text-[#B79524]
              ">
                Product Information
              </p>

              <h2 className="
                text-2xl
                sm:text-3xl
                font-black
                text-gray-950
                mt-2
              ">
                About This Product
              </h2>

              <div className="
                mt-6
                text-gray-600
                leading-8
                whitespace-pre-line
              ">
                {product.description ||
                  product.short_description ||
                  "No detailed description available for this product."}
              </div>

            </div>

            {/* DETAILS */}

            <div className="
              bg-gray-50
              border-t
              lg:border-t-0
              lg:border-l
              border-gray-100
              p-7
              sm:p-10
            ">

              <h3 className="text-xl font-black text-gray-950">
                Product Details
              </h3>

              <div className="mt-6 space-y-4">

                {product.brand && (
                  <div className="
                    flex
                    items-center
                    justify-between
                    gap-5
                    pb-4
                    border-b
                    border-gray-200
                  ">
                    <span className="text-gray-500">
                      Brand
                    </span>

                    <span className="font-black text-gray-900 text-right">
                      {product.brand}
                    </span>
                  </div>
                )}

                <div className="
                  flex
                  items-center
                  justify-between
                  gap-5
                  pb-4
                  border-b
                  border-gray-200
                ">
                  <span className="text-gray-500">
                    Rating
                  </span>

                  <span className="font-black text-gray-900">
                    {rating.toFixed(1)} / 5
                  </span>
                </div>

                <div className="
                  flex
                  items-center
                  justify-between
                  gap-5
                  pb-4
                  border-b
                  border-gray-200
                ">
                  <span className="text-gray-500">
                    Reviews
                  </span>

                  <span className="font-black text-gray-900">
                    {reviews}
                  </span>
                </div>

                <div className="
                  flex
                  items-center
                  justify-between
                  gap-5
                ">
                  <span className="text-gray-500">
                    Availability
                  </span>

                  <span
                    className={
                      outOfStock
                        ? "font-black text-red-500"
                        : "font-black text-green-600"
                    }
                  >
                    {outOfStock
                      ? "Out of Stock"
                      : `${stock} Available`}
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          TRUST SECTION
      ===================================================== */}

      <section className="bg-white border-t border-gray-100">

        <div className="
          max-w-[1400px]
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          py-10
          grid
          sm:grid-cols-3
          gap-6
        ">

          <div className="
            flex
            items-center
            gap-4
            rounded-2xl
            bg-[#faf8f3]
            p-5
          ">
            <div className="
              w-12
              h-12
              shrink-0
              rounded-2xl
              bg-white
              flex
              items-center
              justify-center
              shadow-sm
            ">
              <Truck
                size={22}
                className="text-[#D4AF37]"
              />
            </div>

            <div>
              <p className="font-black text-gray-900">
                Fast Delivery
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Safe doorstep delivery
              </p>
            </div>
          </div>

          <div className="
            flex
            items-center
            gap-4
            rounded-2xl
            bg-[#faf8f3]
            p-5
          ">
            <div className="
              w-12
              h-12
              shrink-0
              rounded-2xl
              bg-white
              flex
              items-center
              justify-center
              shadow-sm
            ">
              <ShieldCheck
                size={22}
                className="text-[#D4AF37]"
              />
            </div>

            <div>
              <p className="font-black text-gray-900">
                Secure Shopping
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Protected checkout
              </p>
            </div>
          </div>

          <div className="
            flex
            items-center
            gap-4
            rounded-2xl
            bg-[#faf8f3]
            p-5
          ">
            <div className="
              w-12
              h-12
              shrink-0
              rounded-2xl
              bg-white
              flex
              items-center
              justify-center
              shadow-sm
            ">
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
                Carefully selected products
              </p>
            </div>
          </div>

        </div>

      </section>

    </main>
  );
}
