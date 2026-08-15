"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import {
  ArrowLeft,
  Check,
  ChevronRight,
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
  price: number | string;
  original_price: number | string | null;
  stock: number | null;
  image_url: string | null;
  brand: string | null;
  rating: number | string | null;
  reviews_count: number | null;
  is_featured: boolean;
  is_flash_sale: boolean;
  is_active: boolean;
};

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();

  const productId =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
      ? params.id[0]
      : "";

  const [product, setProduct] = useState<Product | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [addingCart, setAddingCart] = useState(false);
  const [buying, setBuying] = useState(false);

  /* =========================================================
     FETCH PRODUCT
  ========================================================= */

  useEffect(() => {
    if (!productId) {
      setError("Product ID is missing.");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

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
          setError(error.message);
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

        setError("Something went wrong while loading this product.");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  /* =========================================================
     LOAD WISHLIST
  ========================================================= */

  useEffect(() => {
    if (!productId) return;

    try {
      const savedWishlist = localStorage.getItem("primecart_wishlist");

      if (savedWishlist) {
        const wishlistItems: string[] = JSON.parse(savedWishlist);

        setWishlist(wishlistItems.includes(productId));
      }
    } catch {
      console.log("Wishlist storage unavailable.");
    }
  }, [productId]);

  /* =========================================================
     PRODUCT CALCULATIONS
  ========================================================= */

  const price = useMemo(() => {
    return Number(product?.price ?? 0);
  }, [product]);

  const originalPrice = useMemo(() => {
    if (product?.original_price === null) return null;

    return Number(product?.original_price ?? 0);
  }, [product]);

  const stock = Number(product?.stock ?? 0);

  const rating = Number(product?.rating ?? 4.5);

  const reviews = Number(product?.reviews_count ?? 0);

  const discount =
    originalPrice && originalPrice > price
      ? Math.round(
          ((originalPrice - price) / originalPrice) * 100
        )
      : 0;

  const isOutOfStock = stock <= 0;

  /* =========================================================
     QUANTITY
  ========================================================= */

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const increaseQuantity = () => {
    setQuantity((current) => {
      if (current >= stock) return current;

      return current + 1;
    });
  };

  /* =========================================================
     WISHLIST
  ========================================================= */

  const toggleWishlist = () => {
    if (!productId) return;

    try {
      const savedWishlist = localStorage.getItem(
        "primecart_wishlist"
      );

      let wishlistItems: string[] = savedWishlist
        ? JSON.parse(savedWishlist)
        : [];

      if (wishlistItems.includes(productId)) {
        wishlistItems = wishlistItems.filter(
          (id) => id !== productId
        );

        setWishlist(false);
      } else {
        wishlistItems.push(productId);

        setWishlist(true);
      }

      localStorage.setItem(
        "primecart_wishlist",
        JSON.stringify(wishlistItems)
      );
    } catch (err) {
      console.error("Wishlist error:", err);
    }
  };

  /* =========================================================
     ADD TO CART
  ========================================================= */

  const handleAddToCart = () => {
    if (!product || isOutOfStock) return;

    try {
      setAddingCart(true);

      const savedCart = localStorage.getItem(
        "primecart_cart"
      );

      const cart = savedCart
        ? JSON.parse(savedCart)
        : [];

      const existingIndex = cart.findIndex(
        (item: { id: string }) => item.id === product.id
      );

      if (existingIndex >= 0) {
        cart[existingIndex].quantity += quantity;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          price,
          original_price: originalPrice,
          image_url: product.image_url,
          quantity,
          stock,
        });
      }

      localStorage.setItem(
        "primecart_cart",
        JSON.stringify(cart)
      );

      setTimeout(() => {
        setAddingCart(false);
      }, 700);
    } catch (err) {
      console.error("Cart error:", err);
      setAddingCart(false);
    }
  };

  /* =========================================================
     BUY NOW
  ========================================================= */

  const handleBuyNow = () => {
    if (!product || isOutOfStock) return;

    try {
      setBuying(true);

      const buyNowProduct = {
        id: product.id,
        name: product.name,
        price,
        original_price: originalPrice,
        image_url: product.image_url,
        quantity,
        stock,
      };

      localStorage.setItem(
        "primecart_buy_now",
        JSON.stringify(buyNowProduct)
      );

      setTimeout(() => {
        router.push("/dashboard/cart");
      }, 500);
    } catch (err) {
      console.error("Buy now error:", err);
      setBuying(false);
    }
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />

          <div className="grid lg:grid-cols-2 gap-10 mt-8">
            <div className="h-[520px] bg-white rounded-[30px] animate-pulse border border-gray-100" />

            <div className="space-y-5 py-5">
              <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />

              <div className="h-12 w-4/5 bg-gray-200 rounded animate-pulse" />

              <div className="h-7 w-56 bg-gray-200 rounded animate-pulse" />

              <div className="h-28 w-full bg-gray-200 rounded animate-pulse" />

              <div className="h-12 w-64 bg-gray-200 rounded animate-pulse" />

              <div className="h-14 w-full bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (!product) {
    return (
      <main className="min-h-screen bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Link
            href="/dashboard/products"
            className="inline-flex items-center gap-2 font-bold text-gray-500 hover:text-[#D4AF37] transition"
          >
            <ArrowLeft size={18} />
            Back to Products
          </Link>

          <div className="min-h-[70vh] flex items-center justify-center">
            <div className="text-center max-w-md">
              <div className="w-24 h-24 rounded-3xl bg-white border border-gray-200 flex items-center justify-center mx-auto shadow-sm">
                <ShoppingBag
                  size={42}
                  className="text-gray-400"
                />
              </div>

              <h1 className="text-3xl font-black text-gray-900 mt-7">
                Product Not Found
              </h1>

              <p className="text-gray-500 mt-3 leading-7">
                {error ||
                  "The product you are looking for is unavailable."}
              </p>

              <Link
                href="/dashboard/products"
                className="inline-flex items-center gap-2 mt-7 h-12 px-7 rounded-2xl bg-[#D4AF37] hover:bg-black text-white font-bold transition"
              >
                <ArrowLeft size={18} />
                Back to Products
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     MAIN PAGE
  ========================================================= */

  return (
    <main className="min-h-screen bg-[#fafafa] text-gray-900">

      {/* =====================================================
          TOP BREADCRUMB
      ===================================================== */}

      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-2 text-sm overflow-x-auto whitespace-nowrap">

            <Link
              href="/dashboard"
              className="text-[#D4AF37] font-bold hover:text-black transition"
            >
              Home
            </Link>

            <ChevronRight
              size={15}
              className="text-gray-400"
            />

            <Link
              href="/dashboard/products"
              className="text-gray-500 hover:text-[#D4AF37] transition"
            >
              Products
            </Link>

            <ChevronRight
              size={15}
              className="text-gray-400"
            />

            <span className="text-gray-700 font-semibold truncate">
              {product.name}
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================
          PRODUCT AREA
      ===================================================== */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">

        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 xl:gap-14">

          {/* =================================================
              LEFT IMAGE
          ================================================= */}

          <div>

            <div className="relative bg-white rounded-[30px] border border-gray-100 shadow-sm overflow-hidden">

              {/* SALE BADGE */}

              {product.is_flash_sale ? (
                <div className="absolute top-5 left-5 z-20 px-4 py-2 rounded-full bg-red-500 text-white text-xs font-black shadow-lg">
                  FLASH SALE
                </div>
              ) : discount > 0 ? (
                <div className="absolute top-5 left-5 z-20 px-4 py-2 rounded-full bg-black text-white text-xs font-black shadow-lg">
                  {discount}% OFF
                </div>
              ) : null}

              {/* WISHLIST */}

              <button
                type="button"
                onClick={toggleWishlist}
                aria-label="Add to wishlist"
                className="absolute top-5 right-5 z-30 w-12 h-12 rounded-full bg-white border border-gray-100 shadow-lg flex items-center justify-center hover:scale-110 transition"
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

              <div className="relative h-[420px] sm:h-[540px] lg:h-[600px] bg-[#fafafa]">

                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain p-8 sm:p-12 hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400">
                    <ShoppingBag size={60} />

                    <p className="mt-4 font-semibold">
                      No Image Available
                    </p>
                  </div>
                )}
              </div>

            </div>

            {/* IMAGE TRUST */}

            <div className="grid grid-cols-3 gap-3 mt-4">

              <div className="bg-white border border-gray-100 rounded-2xl p-3 flex items-center justify-center gap-2 text-xs font-bold text-gray-600">
                <ShieldCheck
                  size={17}
                  className="text-[#D4AF37]"
                />
                Secure
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl p-3 flex items-center justify-center gap-2 text-xs font-bold text-gray-600">
                <Truck
                  size={17}
                  className="text-[#D4AF37]"
                />
                Fast Delivery
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl p-3 flex items-center justify-center gap-2 text-xs font-bold text-gray-600">
                <RotateCcw
                  size={17}
                  className="text-[#D4AF37]"
                />
                Easy Return
              </div>

            </div>
          </div>

          {/* =================================================
              RIGHT DETAILS
          ================================================= */}

          <div className="bg-white rounded-[30px] border border-gray-100 shadow-sm p-6 sm:p-8">

            {/* BRAND */}

            {product.brand && (
              <p className="uppercase tracking-[0.2em] text-xs sm:text-sm font-black text-[#D4AF37]">
                {product.brand}
              </p>
            )}

            {/* PRODUCT NAME */}

            <h1 className="text-3xl sm:text-4xl xl:text-[46px] leading-tight font-black mt-3 text-gray-950">
              {product.name}
            </h1>

            {/* SHORT DESCRIPTION */}

            {product.short_description && (
              <p className="text-gray-500 mt-3 leading-7">
                {product.short_description}
              </p>
            )}

            {/* RATING */}

            <div className="flex flex-wrap items-center gap-3 mt-5">

              <div className="flex items-center gap-1.5 bg-green-600 text-white px-3 py-1.5 rounded-lg font-black text-sm">
                <Star
                  size={15}
                  className="fill-white"
                />
                {rating.toFixed(1)}
              </div>

              <span className="text-gray-500 text-sm">
                {reviews} Reviews
              </span>

              <span className="hidden sm:block text-gray-300">
                |
              </span>

              {product.is_featured && (
                <span className="text-[#B79524] text-sm font-bold">
                  ★ Featured Product
                </span>
              )}

            </div>

            <div className="h-px bg-gray-100 my-6" />

            {/* PRICE */}

            <div>

              <div className="flex flex-wrap items-center gap-3">

                <span className="text-4xl sm:text-5xl font-black text-gray-950">
                  ₹{price.toLocaleString("en-IN")}
                </span>

                {originalPrice &&
                  originalPrice > price && (
                    <span className="text-lg sm:text-xl text-gray-400 line-through">
                      ₹
                      {originalPrice.toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  )}

                {discount > 0 && (
                  <span className="text-sm font-black text-green-600">
                    {discount}% OFF
                  </span>
                )}

              </div>

              <p className="text-xs text-gray-400 mt-2">
                Inclusive of all applicable taxes
              </p>

            </div>

            {/* OFFER */}

            <div className="mt-7">

              <h3 className="font-black text-lg">
                Available Offers
              </h3>

              <div className="mt-3 border border-gray-100 rounded-2xl overflow-hidden">

                <div className="flex items-center gap-3 p-4 border-b border-gray-100">
                  <div className="w-9 h-9 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                    <Check
                      size={17}
                      className="text-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <p className="font-bold text-sm">
                      PrimeCart Offer
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      Special price available on this product
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4">
                  <div className="w-9 h-9 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                    <ShieldCheck
                      size={17}
                      className="text-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <p className="font-bold text-sm">
                      Secure Shopping
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      Safe and protected checkout
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* STOCK */}

            <div className="mt-6">

              {isOutOfStock ? (
                <div className="inline-flex items-center gap-2 text-red-600 font-black">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  Out of Stock
                </div>
              ) : stock <= 5 ? (
                <div className="inline-flex items-center gap-2 text-orange-500 font-black">
                  <span className="w-2 h-2 rounded-full bg-orange-500" />
                  Only {stock} left in stock
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 text-green-600 font-black">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  In Stock
                </div>
              )}

            </div>

            {/* QUANTITY + BUTTONS */}

            {!isOutOfStock && (
              <>
                <div className="mt-6">

                  <p className="text-sm font-black text-gray-700 mb-3">
                    Quantity
                  </p>

                  <div className="flex flex-wrap gap-3">

                    {/* QUANTITY */}

                    <div className="h-14 inline-flex items-center border-2 border-gray-200 rounded-2xl overflow-hidden">

                      <button
                        type="button"
                        onClick={decreaseQuantity}
                        disabled={quantity <= 1}
                        className="w-14 h-full flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 transition"
                      >
                        <Minus size={18} />
                      </button>

                      <span className="w-14 h-full border-x border-gray-200 flex items-center justify-center font-black">
                        {quantity}
                      </span>

                      <button
                        type="button"
                        onClick={increaseQuantity}
                        disabled={quantity >= stock}
                        className="w-14 h-full flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 transition"
                      >
                        <Plus size={18} />
                      </button>

                    </div>

                  </div>
                </div>

                {/* MAIN BUTTONS */}

                <div className="grid sm:grid-cols-2 gap-3 mt-5">

                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={addingCart}
                    className="h-14 rounded-2xl border-2 border-[#D4AF37] text-[#B79524] hover:bg-[#D4AF37] hover:text-white font-black flex items-center justify-center gap-2 transition disabled:opacity-60"
                  >
                    <ShoppingCart size={20} />

                    {addingCart
                      ? "Added!"
                      : "Add To Cart"}
                  </button>

                  <button
                    type="button"
                    onClick={handleBuyNow}
                    disabled={buying}
                    className="h-14 rounded-2xl bg-[#D4AF37] hover:bg-black text-white font-black flex items-center justify-center gap-2 transition disabled:opacity-60"
                  >
                    <ShoppingBag size={20} />

                    {buying
                      ? "Please wait..."
                      : "Buy Now"}
                  </button>

                </div>
              </>
            )}

            {/* WISHLIST */}

            <button
              type="button"
              onClick={toggleWishlist}
              className="mt-5 flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-red-500 transition"
            >
              <Heart
                size={18}
                className={
                  wishlist
                    ? "fill-red-500 text-red-500"
                    : ""
                }
              />

              {wishlist
                ? "Added to Wishlist"
                : "Add to Wishlist"}
            </button>

            {/* DELIVERY */}

            <div className="mt-7 pt-6 border-t border-gray-100">

              <div className="flex items-start gap-4">

                <div className="w-11 h-11 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                  <Truck
                    size={21}
                    className="text-[#D4AF37]"
                  />
                </div>

                <div>
                  <p className="font-black">
                    Fast & Secure Delivery
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Your order will be safely delivered to your doorstep.
                  </p>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          PRODUCT DESCRIPTION
      ===================================================== */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-14">

        <div className="bg-white rounded-[30px] border border-gray-100 shadow-sm p-6 sm:p-8">

          <div className="max-w-4xl">

            <p className="uppercase tracking-[0.18em] text-xs font-black text-[#D4AF37]">
              PrimeCart Product
            </p>

            <h2 className="text-2xl sm:text-3xl font-black mt-2">
              About This Product
            </h2>

            <p className="mt-5 text-gray-600 leading-8 whitespace-pre-line">
              {product.description ||
                product.short_description ||
                "No detailed description available for this product."}
            </p>

          </div>

        </div>
      </section>

      {/* =====================================================
          PRODUCT DETAILS
      ===================================================== */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-14">

        <div className="grid md:grid-cols-2 gap-6">

          {/* DETAILS */}

          <div className="bg-white rounded-[30px] border border-gray-100 shadow-sm p-6 sm:p-8">

            <h2 className="text-2xl font-black">
              Product Details
            </h2>

            <div className="mt-6 divide-y divide-gray-100">

              {product.brand && (
                <div className="flex justify-between gap-5 py-4">
                  <span className="text-gray-500">
                    Brand
                  </span>

                  <span className="font-bold text-right">
                    {product.brand}
                  </span>
                </div>
              )}

              <div className="flex justify-between gap-5 py-4">
                <span className="text-gray-500">
                  Rating
                </span>

                <span className="font-bold">
                  {rating.toFixed(1)} / 5
                </span>
              </div>

              <div className="flex justify-between gap-5 py-4">
                <span className="text-gray-500">
                  Reviews
                </span>

                <span className="font-bold">
                  {reviews}
                </span>
              </div>

              <div className="flex justify-between gap-5 py-4">
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

          {/* WHY PRIMECART */}

          <div className="bg-white rounded-[30px] border border-gray-100 shadow-sm p-6 sm:p-8">

            <h2 className="text-2xl font-black">
              Why Shop With PrimeCart?
            </h2>

            <div className="mt-6 space-y-5">

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center">
                  <ShieldCheck
                    size={23}
                    className="text-[#D4AF37]"
                  />
                </div>

                <div>
                  <p className="font-black">
                    Secure Payments
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Safe and protected checkout.
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center">
                  <Truck
                    size={23}
                    className="text-[#D4AF37]"
                  />
                </div>

                <div>
                  <p className="font-black">
                    Fast Delivery
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Reliable doorstep delivery.
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center">
                  <RotateCcw
                    size={23}
                    className="text-[#D4AF37]"
                  />
                </div>

                <div>
                  <p className="font-black">
                    Easy Returns
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Hassle-free return experience.
                  </p>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* =====================================================
          BOTTOM TRUST BAR
      ===================================================== */}

      <section className="border-t border-gray-100 bg-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

          <div className="grid sm:grid-cols-3 gap-6">

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center">
                <Truck
                  size={22}
                  className="text-[#D4AF37]"
                />
              </div>

              <div>
                <p className="font-black">
                  Fast Delivery
                </p>

                <p className="text-sm text-gray-500">
                  Safe doorstep delivery
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center">
                <ShieldCheck
                  size={22}
                  className="text-[#D4AF37]"
                />
              </div>

              <div>
                <p className="font-black">
                  Secure Shopping
                </p>

                <p className="text-sm text-gray-500">
                  Protected checkout
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center">
                <Check
                  size={22}
                  className="text-[#D4AF37]"
                />
              </div>

              <div>
                <p className="font-black">
                  Quality Products
                </p>

                <p className="text-sm text-gray-500">
                  Carefully selected
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
