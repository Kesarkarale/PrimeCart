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
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
  Zap,
  RotateCcw,
  PackageCheck,
  ImageOff,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

interface Product {
  id: string;
  category_id: string | null;
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  price: number;
  original_price: number | null;
  stock: number;
  image_url: string | null;
  brand: string | null;
  rating: number | null;
  reviews_count: number | null;
  is_featured: boolean;
  is_flash_sale: boolean;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const productId = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<Category | null>(null);

  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [wishlist, setWishlist] = useState(false);

  const supabase = createClient();

  /* ---------------------------------------------------------
     PRODUCT IMAGE PATH
     --------------------------------------------------------- */

  const productImage = useMemo(() => {
    const image = product?.image_url?.trim();

    if (!image) return "";

    // Already a full URL
    if (
      image.startsWith("http://") ||
      image.startsWith("https://") ||
      image.startsWith("data:")
    ) {
      return image;
    }

    // Already starts with /products/
    if (image.startsWith("/products/")) {
      return image;
    }

    // Any other local path
    if (image.startsWith("/")) {
      return image;
    }

    // DB contains only filename
    return `/products/${image}`;
  }, [product?.image_url]);

  /* ---------------------------------------------------------
     FETCH PRODUCT
     --------------------------------------------------------- */

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);

        const { data: productData, error: productError } =
          await supabase
            .from("products")
            .select("*")
            .eq("id", productId)
            .eq("is_active", true)
            .maybeSingle();

        if (productError) {
          console.error("Product fetch error:", productError);
          toast.error("Unable to load product.");
          setProduct(null);
          return;
        }

        if (!productData) {
          setProduct(null);
          return;
        }

        setProduct(productData as Product);

        if (productData.category_id) {
          const { data: categoryData, error: categoryError } =
            await supabase
              .from("categories")
              .select("id, name, slug")
              .eq("id", productData.category_id)
              .maybeSingle();

          if (!categoryError && categoryData) {
            setCategory(categoryData as Category);
          }
        }
      } catch (error) {
        console.error("Unexpected error:", error);
        toast.error("Something went wrong.");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  /* ---------------------------------------------------------
     RESET IMAGE ERROR WHEN PRODUCT CHANGES
     --------------------------------------------------------- */

  useEffect(() => {
    setImageError(false);
    setSelectedImage(0);
  }, [product?.id]);

  /* ---------------------------------------------------------
     CALCULATIONS
     --------------------------------------------------------- */

  const price = Number(product?.price ?? 0);
  const originalPrice = Number(product?.original_price ?? 0);
  const rating = Number(product?.rating ?? 0);
  const reviews = Number(product?.reviews_count ?? 0);
  const stock = Number(product?.stock ?? 0);

  const discount =
    originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  const outOfStock = stock <= 0;

  /* ---------------------------------------------------------
     QUANTITY
     --------------------------------------------------------- */

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const increaseQuantity = () => {
    setQuantity((current) => {
      if (stock > 0) {
        return Math.min(stock, current + 1);
      }

      return current;
    });
  };

  /* ---------------------------------------------------------
     WISHLIST
     --------------------------------------------------------- */

  const handleWishlist = () => {
    setWishlist((current) => !current);

    if (!wishlist) {
      toast.success("Added to wishlist");
    } else {
      toast.success("Removed from wishlist");
    }
  };

  /* ---------------------------------------------------------
     ADD TO CART
     --------------------------------------------------------- */

  const handleAddToCart = () => {
    if (!product) return;

    if (outOfStock) {
      toast.error("This product is currently out of stock.");
      return;
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image_url: product.image_url,
      brand: product.brand,
    };

    try {
      const existingCart = localStorage.getItem("primecart_cart");

      const cart = existingCart ? JSON.parse(existingCart) : [];

      const existingItemIndex = cart.findIndex(
        (item: { id: string }) => item.id === product.id
      );

      if (existingItemIndex >= 0) {
        cart[existingItemIndex].quantity += quantity;
      } else {
        cart.push(cartItem);
      }

      localStorage.setItem("primecart_cart", JSON.stringify(cart));

      toast.success(
        quantity > 1
          ? `${quantity} items added to cart`
          : "Product added to cart"
      );
    } catch (error) {
      console.error("Cart error:", error);
      toast.error("Unable to add product to cart.");
    }
  };

  /* ---------------------------------------------------------
     BUY NOW
     --------------------------------------------------------- */

  const handleBuyNow = () => {
    if (!product) return;

    if (outOfStock) {
      toast.error("This product is currently out of stock.");
      return;
    }

    const buyNowProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image_url: product.image_url,
      brand: product.brand,
    };

    try {
      localStorage.setItem(
        "primecart_buy_now",
        JSON.stringify(buyNowProduct)
      );

      router.push("/dashboard/checkout");
    } catch (error) {
      console.error("Buy now error:", error);
      toast.error("Unable to continue to checkout.");
    }
  };

  /* ---------------------------------------------------------
     LOADING STATE
     --------------------------------------------------------- */

  if (loading) {
    return (
      <main className="min-h-screen bg-[#faf8f3] dark:bg-[#080808]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8 h-5 w-40 animate-pulse rounded bg-gray-200 dark:bg-white/10" />

          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="animate-pulse">
              <div className="aspect-square rounded-3xl bg-gray-200 dark:bg-white/10" />
            </div>

            <div className="space-y-5">
              <div className="h-5 w-32 animate-pulse rounded bg-gray-200 dark:bg-white/10" />
              <div className="h-10 w-4/5 animate-pulse rounded bg-gray-200 dark:bg-white/10" />
              <div className="h-24 w-full animate-pulse rounded bg-gray-200 dark:bg-white/10" />
              <div className="h-12 w-48 animate-pulse rounded bg-gray-200 dark:bg-white/10" />
              <div className="h-14 w-full animate-pulse rounded bg-gray-200 dark:bg-white/10" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* ---------------------------------------------------------
     PRODUCT NOT FOUND
     --------------------------------------------------------- */

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#faf8f3] px-4 dark:bg-[#080808]">
        <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm dark:border-white/10 dark:bg-[#111]">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#b9923b]/10">
            <PackageCheck className="h-8 w-8 text-[#b9923b]" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Product Not Found
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
            The product you are looking for may have been removed or is no
            longer available.
          </p>

          <button
            type="button"
            onClick={() => router.push("/dashboard/products")}
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#b9923b] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#a7812f]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </button>
        </div>
      </main>
    );
  }

  /* ---------------------------------------------------------
     RENDER
     --------------------------------------------------------- */

  return (
    <main className="min-h-screen bg-[#faf8f3] text-gray-900 dark:bg-[#080808] dark:text-white">
      {/* -----------------------------------------------------
          BREADCRUMB
      ----------------------------------------------------- */}

      <div className="border-b border-gray-200 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-[#0c0c0c]/80">
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-4 text-sm sm:px-6 lg:px-8">
          <Link
            href="/dashboard"
            className="shrink-0 text-gray-500 transition hover:text-[#b9923b]"
          >
            Home
          </Link>

          <ChevronRight className="h-4 w-4 shrink-0 text-gray-400" />

          <Link
            href="/dashboard/products"
            className="shrink-0 text-gray-500 transition hover:text-[#b9923b]"
          >
            Products
          </Link>

          {category && (
            <>
              <ChevronRight className="h-4 w-4 shrink-0 text-gray-400" />

              <Link
                href={`/dashboard/categories/${category.id}`}
                className="shrink-0 text-gray-500 transition hover:text-[#b9923b]"
              >
                {category.name}
              </Link>
            </>
          )}

          <ChevronRight className="h-4 w-4 shrink-0 text-gray-400" />

          <span className="max-w-[220px] truncate font-medium text-gray-800 dark:text-gray-200">
            {product.name}
          </span>
        </div>
      </div>

      {/* -----------------------------------------------------
          MAIN PRODUCT SECTION
      ----------------------------------------------------- */}

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* -------------------------------------------------
              IMAGE SECTION
          ------------------------------------------------- */}

          <div>
            <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#111]">
              {/* Flash Sale */}
              {product.is_flash_sale && (
                <div className="absolute left-5 top-5 z-20 inline-flex items-center gap-1.5 rounded-full bg-[#b9923b] px-4 py-2 text-xs font-bold text-white shadow-lg">
                  <Zap className="h-3.5 w-3.5 fill-current" />
                  FLASH SALE
                </div>
              )}

              {/* Discount */}
              {discount > 0 && (
                <div className="absolute right-5 top-5 z-20 rounded-full bg-red-500 px-4 py-2 text-xs font-bold text-white shadow-lg">
                  {discount}% OFF
                </div>
              )}

              <div className="relative aspect-square w-full">
                {productImage && !imageError ? (
                  <Image
                    src={productImage}
                    alt={product.name}
                    fill
                    priority
                    className="object-contain p-8 sm:p-12 lg:p-16"
                    onError={() => setImageError(true)}
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center text-gray-400">
                    <ImageOff className="h-16 w-16" />
                    <p className="mt-3 text-sm">Image unavailable</p>
                  </div>
                )}
              </div>
            </div>

            {/* -------------------------------------------------
                THUMBNAILS
            ------------------------------------------------- */}

            <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
              <button
                type="button"
                onClick={() => setSelectedImage(0)}
                className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 bg-white transition dark:bg-[#111] ${
                  selectedImage === 0
                    ? "border-[#b9923b]"
                    : "border-gray-200 dark:border-white/10"
                }`}
              >
                {productImage && !imageError ? (
                  <Image
                    src={productImage}
                    alt={product.name}
                    fill
                    className="object-contain p-2"
                    sizes="80px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-400">
                    <ImageOff className="h-5 w-5" />
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* -------------------------------------------------
              PRODUCT INFORMATION
          ------------------------------------------------- */}

          <div>
            {/* Brand */}
            {product.brand && (
              <div className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#b9923b]">
                {product.brand}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 rounded-lg bg-[#b9923b]/10 px-3 py-2">
                <Star className="h-4 w-4 fill-[#b9923b] text-[#b9923b]" />

                <span className="font-semibold text-gray-900 dark:text-white">
                  {rating.toFixed(1)}
                </span>
              </div>

              <span className="text-sm text-gray-500 dark:text-gray-400">
                {reviews.toLocaleString()}{" "}
                {reviews === 1 ? "Review" : "Reviews"}
              </span>

              <span className="hidden h-5 w-px bg-gray-300 dark:bg-white/10 sm:block" />

              <span
                className={`text-sm font-semibold ${
                  outOfStock ? "text-red-500" : "text-green-600"
                }`}
              >
                {outOfStock ? "Out of Stock" : `${stock} items available`}
              </span>
            </div>

            {/* Divider */}
            <div className="my-7 h-px bg-gray-200 dark:bg-white/10" />

            {/* Short Description */}
            {product.short_description && (
              <p className="text-base leading-7 text-gray-600 dark:text-gray-300">
                {product.short_description}
              </p>
            )}

            {/* Price */}
            <div className="mt-7 rounded-2xl border border-[#b9923b]/20 bg-[#b9923b]/5 p-5">
              <div className="flex flex-wrap items-end gap-3">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ₹{price.toLocaleString("en-IN")}
                </span>

                {originalPrice > price && (
                  <span className="pb-1 text-lg text-gray-400 line-through">
                    ₹{originalPrice.toLocaleString("en-IN")}
                  </span>
                )}

                {discount > 0 && (
                  <span className="rounded-md bg-green-100 px-2 py-1 text-xs font-bold text-green-700 dark:bg-green-500/10 dark:text-green-400">
                    Save {discount}%
                  </span>
                )}
              </div>

              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Inclusive of all applicable taxes
              </p>
            </div>

            {/* Offer */}
            {product.is_flash_sale && (
              <div className="mt-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-500/20 dark:bg-red-500/5">
                <Zap className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />

                <div>
                  <p className="font-semibold text-red-600 dark:text-red-400">
                    Limited Time Offer
                  </p>

                  <p className="mt-1 text-sm text-red-500/80 dark:text-red-300/70">
                    Grab this product before the flash sale ends.
                  </p>
                </div>
              </div>
            )}

            {/* Quantity */}
            {!outOfStock && (
              <div className="mt-7">
                <p className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
                  Quantity
                </p>

                <div className="inline-flex items-center overflow-hidden rounded-xl border border-gray-300 bg-white dark:border-white/10 dark:bg-[#111]">
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="flex h-11 w-11 items-center justify-center text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-gray-300 dark:hover:bg-white/5"
                  >
                    <Minus className="h-4 w-4" />
                  </button>

                  <span className="flex h-11 min-w-12 items-center justify-center border-x border-gray-200 px-3 text-sm font-semibold dark:border-white/10">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    disabled={quantity >= stock}
                    className="flex h-11 w-11 items-center justify-center text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-gray-300 dark:hover:bg-white/5"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={outOfStock}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-[#b9923b] bg-white px-5 py-3.5 text-sm font-bold text-[#9b782e] transition hover:bg-[#b9923b]/5 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400 dark:bg-transparent dark:disabled:border-white/10"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                disabled={outOfStock}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#b9923b] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#b9923b]/20 transition hover:bg-[#a7812f] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
              >
                <Zap className="h-5 w-5" />
                Buy Now
              </button>

              <button
                type="button"
                onClick={handleWishlist}
                aria-label="Wishlist"
                className={`flex h-12 w-full items-center justify-center rounded-xl border px-5 transition sm:w-14 sm:px-0 ${
                  wishlist
                    ? "border-red-200 bg-red-50 text-red-500 dark:border-red-500/20 dark:bg-red-500/10"
                    : "border-gray-200 bg-white text-gray-600 hover:border-[#b9923b] hover:text-[#b9923b] dark:border-white/10 dark:bg-[#111] dark:text-gray-300"
                }`}
              >
                <Heart
                  className={`h-5 w-5 ${wishlist ? "fill-current" : ""}`}
                />
              </button>
            </div>

            {/* Benefits */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 dark:border-white/10 dark:bg-[#111]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#b9923b]/10">
                  <Truck className="h-5 w-5 text-[#b9923b]" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    Fast Delivery
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Quick & reliable shipping
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 dark:border-white/10 dark:bg-[#111]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#b9923b]/10">
                  <RotateCcw className="h-5 w-5 text-[#b9923b]" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    Easy Returns
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Hassle-free returns
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 dark:border-white/10 dark:bg-[#111]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#b9923b]/10">
                  <ShieldCheck className="h-5 w-5 text-[#b9923b]" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    Secure Payment
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    100% secure checkout
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 dark:border-white/10 dark:bg-[#111]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#b9923b]/10">
                  <Check className="h-5 w-5 text-[#b9923b]" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    Genuine Product
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Quality guaranteed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------
            DESCRIPTION
        --------------------------------------------------- */}

        <div className="mt-14 border-t border-gray-200 pt-12 dark:border-white/10">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Product Description
              </h2>

              <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-[#111]">
                <p className="whitespace-pre-line text-sm leading-7 text-gray-600 dark:text-gray-300">
                  {product.description ||
                    product.short_description ||
                    "No detailed description is available for this product."}
                </p>
              </div>
            </div>

            {/* Product Details */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Product Details
              </h2>

              <div className="mt-5 overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-[#111]">
                <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-white/10">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Brand
                  </span>

                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {product.brand || "PrimeCart"}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-white/10">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Category
                  </span>

                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {category?.name || "General"}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-white/10">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Rating
                  </span>

                  <span className="flex items-center gap-1 text-sm font-semibold text-gray-900 dark:text-white">
                    <Star className="h-4 w-4 fill-[#b9923b] text-[#b9923b]" />
                    {rating.toFixed(1)}
                  </span>
                </div>

                <div className="flex items-center justify-between px-5 py-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Availability
                  </span>

                  <span
                    className={`text-sm font-semibold ${
                      outOfStock ? "text-red-500" : "text-green-600"
                    }`}
                  >
                    {outOfStock ? "Out of Stock" : "In Stock"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------
            TRUST STRIP
        --------------------------------------------------- */}

        <div className="mt-14 grid overflow-hidden rounded-3xl border border-gray-200 bg-white dark:border-white/10 dark:bg-[#111] sm:grid-cols-3">
          <div className="flex items-center gap-4 border-b border-gray-200 p-6 dark:border-white/10 sm:border-b-0 sm:border-r">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#b9923b]/10">
              <ShieldCheck className="h-6 w-6 text-[#b9923b]" />
            </div>

            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                Secure Shopping
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Your data is protected
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 border-b border-gray-200 p-6 dark:border-white/10 sm:border-b-0 sm:border-r">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#b9923b]/10">
              <Truck className="h-6 w-6 text-[#b9923b]" />
            </div>

            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                Reliable Delivery
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Delivered safely to your door
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#b9923b]/10">
              <RotateCcw className="h-6 w-6 text-[#b9923b]" />
            </div>

            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                Easy Returns
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Simple return process
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
