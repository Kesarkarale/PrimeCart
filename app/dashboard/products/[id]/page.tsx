"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Star,
  Truck,
  User,
  Zap,
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

type Category = {
  id: string;
  name: string;
  slug: string;
};

export default function ProductDetailPage() {
  const params = useParams();
  const productId = String(params?.id || "");

  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<Category | null>(null);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [selectedColor, setSelectedColor] = useState("Black");
  const [selectedImage, setSelectedImage] = useState(0);

  const [addingToCart, setAddingToCart] = useState(false);
  const [buyingNow, setBuyingNow] = useState(false);

  /* =========================================================
     FETCH PRODUCT
  ========================================================= */

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

        console.log("DETAIL PRODUCT ID:", productId);
        console.log("DETAIL PRODUCT:", data);
        console.log("DETAIL PRODUCT ERROR:", error);

        if (error) {
          setErrorMessage(error.message);
          setProduct(null);
          return;
        }

        if (!data) {
          setErrorMessage("This product could not be found.");
          setProduct(null);
          return;
        }

        setProduct(data as Product);

        if (data.category_id) {
          const { data: categoryData } = await supabase
            .from("categories")
            .select("id,name,slug")
            .eq("id", data.category_id)
            .maybeSingle();

          if (categoryData) {
            setCategory(categoryData as Category);
          }
        }
      } catch (error) {
        console.error("Product detail error:", error);

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

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        {/* TOP BAR */}
        <div className="hidden md:block border-b border-[#f1f1f1] bg-[#fffdf8]">
          <div className="mx-auto flex h-9 max-w-[1400px] items-center justify-between px-5 text-[11px] font-medium text-gray-500">
            <div className="flex items-center gap-7">
              <span>📍 Deliver to Mumbai, India</span>
              <span>🚚 Free Shipping on orders above ₹499</span>
            </div>

            <div className="flex items-center gap-7">
              <span>Download App</span>
              <span>Track Order</span>
              <span>Help & Support</span>
            </div>
          </div>
        </div>

        {/* HEADER */}
        <header className="border-b border-gray-100 bg-white">
          <div className="mx-auto flex h-[76px] max-w-[1400px] items-center gap-5 px-5">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D4AF37] text-white">
                <ShoppingCart size={23} />
              </div>

              <div>
                <div className="text-[22px] font-black leading-none">
                  Prime<span className="text-[#D4AF37]">Cart</span>
                </div>
                <div className="mt-1 text-[8px] font-bold tracking-[0.18em] text-gray-400">
                  SHOP • SAVE • SMILE
                </div>
              </div>
            </div>

            <div className="ml-8 hidden h-11 flex-1 max-w-[650px] items-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50 md:flex">
              <button className="flex h-full items-center gap-2 border-r border-gray-200 px-4 text-sm font-semibold text-gray-700">
                All Categories
                <ChevronDown size={15} />
              </button>

              <div className="flex flex-1 items-center gap-3 px-4">
                <Search size={18} className="text-gray-400" />
                <span className="text-sm text-gray-400">
                  Search for products, brands and more...
                </span>
              </div>

              <button className="flex h-full w-12 items-center justify-center bg-[#D4AF37] text-white">
                <Search size={19} />
              </button>
            </div>

            <div className="ml-auto flex items-center gap-5">
              <div className="hidden items-center gap-2 md:flex">
                <User size={22} />
                <div className="leading-tight">
                  <p className="text-[11px] text-gray-400">Hello</p>
                  <p className="text-xs font-bold">Account</p>
                </div>
              </div>

              <div className="relative">
                <Heart size={23} />
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#D4AF37] text-[9px] font-bold text-white">
                  0
                </span>
              </div>

              <div className="relative flex items-center gap-2">
                <ShoppingCart size={24} />
                <div className="hidden leading-tight md:block">
                  <p className="text-[11px] text-gray-400">Cart</p>
                  <p className="text-xs font-bold">₹0.00</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-[1400px] px-5 py-8">
          <div className="h-4 w-64 animate-pulse rounded bg-gray-200" />

          <div className="mt-7 grid gap-10 lg:grid-cols-2">
            <div className="h-[550px] animate-pulse rounded-2xl bg-gray-100" />

            <div className="space-y-5">
              <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
              <div className="h-12 w-4/5 animate-pulse rounded bg-gray-200" />
              <div className="h-6 w-64 animate-pulse rounded bg-gray-200" />
              <div className="h-12 w-72 animate-pulse rounded bg-gray-200" />
              <div className="h-28 w-full animate-pulse rounded-2xl bg-gray-200" />
              <div className="h-14 w-full animate-pulse rounded-2xl bg-gray-200" />
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
      <main className="min-h-screen bg-white">
        <div className="flex min-h-[75vh] items-center justify-center px-6">
          <div className="max-w-md text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-gray-100">
              <ShoppingBag size={42} className="text-gray-400" />
            </div>

            <h1 className="mt-7 text-3xl font-black text-gray-900">
              Product Not Found
            </h1>

            <p className="mt-3 text-gray-500">
              {errorMessage || "This product is unavailable."}
            </p>

            <Link
              href="/dashboard/products"
              className="mt-7 inline-flex h-12 items-center gap-2 rounded-xl bg-[#D4AF37] px-7 font-bold text-white transition hover:bg-black"
            >
              <ArrowLeft size={18} />
              Back to Products
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     VALUES
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
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  const outOfStock = stock <= 0;

  const productImages = useMemo(() => {
    if (!product.image_url) return [];
    return [
      product.image_url,
      product.image_url,
      product.image_url,
      product.image_url,
    ];
  }, [product.image_url]);

  /* =========================================================
     QUANTITY
  ========================================================= */

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const increaseQuantity = () => {
    setQuantity((current) =>
      current < stock ? current + 1 : current
    );
  };

  /* =========================================================
     CART
  ========================================================= */

  const handleAddToCart = () => {
    if (outOfStock || addingToCart) return;

    setAddingToCart(true);

    console.log("ADD TO CART:", {
      product_id: product.id,
      name: product.name,
      price,
      quantity,
      color: selectedColor,
    });

    setTimeout(() => {
      setAddingToCart(false);
    }, 900);
  };

  /* =========================================================
     BUY NOW
  ========================================================= */

  const handleBuyNow = () => {
    if (outOfStock || buyingNow) return;

    setBuyingNow(true);

    console.log("BUY NOW:", {
      product_id: product.id,
      name: product.name,
      price,
      quantity,
      color: selectedColor,
    });

    setTimeout(() => {
      setBuyingNow(false);
    }, 900);
  };

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* =====================================================
          TOP BAR
      ===================================================== */}

      <div className="hidden border-b border-[#f0f0f0] bg-[#fffdf7] md:block">
        <div className="mx-auto flex h-9 max-w-[1400px] items-center justify-between px-5 text-[11px] font-medium text-gray-500">

          <div className="flex items-center gap-8">
            <span className="flex items-center gap-1">
              📍 Deliver to <b className="text-gray-700">Mumbai, India</b>
            </span>

            <span className="flex items-center gap-1">
              🚚 Free Shipping on orders above ₹499
            </span>
          </div>

          <div className="flex items-center gap-8">
            <span>📱 Download App</span>
            <span>📦 Track Order</span>
            <span>❓ Help & Support</span>
          </div>

        </div>
      </div>

      {/* =====================================================
          MAIN HEADER
      ===================================================== */}

      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[78px] max-w-[1400px] items-center gap-5 px-4 sm:px-6">

          {/* LOGO */}

          <Link
            href="/dashboard"
            className="flex shrink-0 items-center gap-2"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D4AF37] text-white shadow-sm">
              <ShoppingCart size={25} />
            </div>

            <div>
              <div className="text-[24px] font-black leading-none tracking-tight">
                Prime<span className="text-[#D4AF37]">Cart</span>
              </div>

              <div className="mt-1 text-[8px] font-bold tracking-[0.2em] text-gray-400">
                SHOP • SAVE • SMILE
              </div>
            </div>
          </Link>

          {/* SEARCH */}

          <div className="ml-5 hidden h-11 flex-1 max-w-[650px] overflow-hidden rounded-xl border border-gray-200 bg-gray-50 lg:flex">

            <button
              type="button"
              className="flex items-center gap-2 border-r border-gray-200 px-4 text-sm font-semibold text-gray-700"
            >
              All Categories
              <ChevronDown size={15} />
            </button>

            <div className="flex flex-1 items-center gap-3 px-4">
              <Search size={18} className="text-gray-400" />

              <span className="text-sm text-gray-400">
                Search for products, brands and more...
              </span>
            </div>

            <button
              type="button"
              className="flex w-12 items-center justify-center bg-[#D4AF37] text-white transition hover:bg-black"
            >
              <Search size={19} />
            </button>
          </div>

          {/* HEADER ACTIONS */}

          <div className="ml-auto flex items-center gap-5">

            {/* ACCOUNT */}

            <button
              type="button"
              className="hidden items-center gap-2 md:flex"
            >
              <User size={23} />

              <div className="text-left leading-tight">
                <p className="text-[10px] text-gray-400">
                  Hello
                </p>
                <p className="text-xs font-bold">
                  Account
                </p>
              </div>
            </button>

            {/* WISHLIST */}

            <button
              type="button"
              onClick={() => setWishlist((v) => !v)}
              className="relative"
            >
              <Heart
                size={23}
                className={
                  wishlist
                    ? "fill-red-500 text-red-500"
                    : "text-gray-800"
                }
              />

              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#D4AF37] text-[9px] font-bold text-white">
                {wishlist ? 1 : 0}
              </span>
            </button>

            {/* CART */}

            <button
              type="button"
              className="flex items-center gap-2"
            >
              <div className="relative">
                <ShoppingCart size={24} />

                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#D4AF37] text-[9px] font-bold text-white">
                  0
                </span>
              </div>

              <div className="hidden text-left leading-tight sm:block">
                <p className="text-[10px] text-gray-400">
                  Cart
                </p>

                <p className="text-xs font-bold">
                  ₹0.00
                </p>
              </div>
            </button>

          </div>
        </div>
      </header>

      {/* =====================================================
          BREADCRUMB
      ===================================================== */}

      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-[1400px] px-4 py-4 sm:px-6">

          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">

            <Link
              href="/dashboard"
              className="font-semibold text-[#C39B25] hover:text-black"
            >
              Home
            </Link>

            <ChevronRight
              size={14}
              className="text-gray-300"
            />

            {category && (
              <>
                <Link
                  href={`/dashboard/category/${category.slug}`}
                  className="font-semibold text-gray-400 hover:text-[#C39B25]"
                >
                  {category.name}
                </Link>

                <ChevronRight
                  size={14}
                  className="text-gray-300"
                />
              </>
            )}

            <span className="font-semibold text-gray-500">
              {product.brand || "Product"}
            </span>

            <ChevronRight
              size={14}
              className="text-gray-300"
            />

            <span className="max-w-[250px] truncate font-semibold text-gray-700">
              {product.name}
            </span>

          </div>

        </div>
      </div>

      {/* =====================================================
          MAIN PRODUCT SECTION
      ===================================================== */}

      <section className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:py-8">

        <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr] xl:gap-12">

          {/* =================================================
              LEFT PRODUCT IMAGE
          ================================================= */}

          <div className="min-w-0">

            <div className="grid grid-cols-[64px_1fr] gap-4 sm:grid-cols-[78px_1fr]">

              {/* THUMBNAILS */}

              <div className="flex flex-col gap-3">

                {productImages.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-[66px] overflow-hidden rounded-xl bg-white transition sm:h-[76px] ${
                      selectedImage === index
                        ? "border-2 border-[#D4AF37] shadow-sm"
                        : "border border-gray-200 hover:border-[#D4AF37]"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      sizes="78px"
                      className="object-contain p-2"
                    />
                  </button>
                ))}

              </div>

              {/* MAIN IMAGE */}

              <div className="relative h-[430px] overflow-hidden rounded-2xl border border-gray-100 bg-[#fcfcfc] sm:h-[560px] lg:h-[590px]">

                {/* DISCOUNT */}

                {discount > 0 && (
                  <div className="absolute left-5 top-5 z-20 rounded-lg bg-[#D4AF37] px-3 py-2 text-xs font-black text-white shadow-sm">
                    {discount}% OFF
                  </div>
                )}

                {/* FLASH SALE */}

                {product.is_flash_sale && (
                  <div className="absolute left-5 top-16 z-20 flex items-center gap-1 rounded-lg bg-black px-3 py-2 text-xs font-black text-white">
                    <Zap size={13} />
                    FLASH SALE
                  </div>
                )}

                {/* WISHLIST */}

                <button
                  type="button"
                  onClick={() =>
                    setWishlist((value) => !value)
                  }
                  className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-105"
                  aria-label="Wishlist"
                >
                  <Heart
                    size={21}
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
                    src={productImages[selectedImage] || product.image_url}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 768px) 90vw, 50vw"
                    className="object-contain p-8 transition duration-500 hover:scale-[1.03] sm:p-12"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center text-gray-400">
                    <ShoppingBag size={60} />
                    <p className="mt-4 font-semibold">
                      No Image Available
                    </p>
                  </div>
                )}

              </div>

            </div>

            {/* SECURE TEXT */}

            <div className="mt-5 flex items-center justify-center gap-2 text-xs font-medium text-gray-400">
              <ShieldCheck
                size={16}
                className="text-[#D4AF37]"
              />
              Secure & Quality Assured
            </div>

          </div>

          {/* =================================================
              RIGHT PRODUCT INFORMATION
          ================================================= */}

          <div className="pt-1 lg:pt-3">

            {/* BRAND */}

            {product.brand && (
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C39B25]">
                {product.brand}
              </p>
            )}

            {/* PRODUCT NAME */}

            <h1 className="mt-2 text-3xl font-black leading-tight text-gray-900 sm:text-4xl">
              {product.name}
            </h1>

            {/* DESCRIPTION */}

            <p className="mt-2 text-base leading-7 text-gray-500">
              {product.short_description ||
                "Premium quality product from PrimeCart."}
            </p>

            {/* RATING */}

            <div className="mt-4 flex flex-wrap items-center gap-3">

              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={17}
                    className={
                      star <= Math.round(rating)
                        ? "fill-[#E5A900] text-[#E5A900]"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>

              <span className="font-bold text-gray-700">
                {rating.toFixed(1)}
              </span>

              <span className="text-sm text-gray-400">
                ({reviews} Reviews)
              </span>

              <span className="text-gray-300">
                |
              </span>

              <span className="flex items-center gap-1 text-sm font-bold text-[#C39B25]">
                <Check size={15} />
                Genuine Product
              </span>

              {product.is_featured && (
                <>
                  <span className="text-gray-300">
                    |
                  </span>

                  <span className="rounded-full bg-[#fff7dd] px-3 py-1 text-xs font-bold text-[#B28B18]">
                    Best Seller
                  </span>
                </>
              )}

            </div>

            <div className="my-5 h-px bg-gray-100" />

            {/* PRICE */}

            <div>

              <div className="flex flex-wrap items-center gap-3">

                <span className="text-3xl font-black text-gray-900 sm:text-[38px]">
                  ₹{price.toLocaleString("en-IN")}
                </span>

                {originalPrice &&
                  originalPrice > price && (
                    <>
                      <span className="text-lg text-gray-400 line-through">
                        ₹{originalPrice.toLocaleString("en-IN")}
                      </span>

                      <span className="text-sm font-black text-[#C39B25]">
                        ({discount}% OFF)
                      </span>
                    </>
                  )}

              </div>

              <p className="mt-1.5 text-xs text-gray-400">
                Inclusive of all applicable taxes
              </p>

            </div>

            {/* OFFERS */}

            <div className="mt-6">

              <h3 className="mb-3 text-base font-black">
                Offers
              </h3>

              <div className="overflow-hidden rounded-xl border border-gray-100">

                <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-3.5">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fff8df]">
                    <Zap
                      size={15}
                      className="text-[#D4AF37]"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold">
                      Bank Offer
                    </p>

                    <p className="mt-0.5 truncate text-xs text-gray-500">
                      Get extra instant discount on selected cards
                    </p>
                  </div>

                  <ChevronRight
                    size={17}
                    className="text-gray-400"
                  />

                </div>

                <div className="flex items-center gap-3 px-4 py-3.5">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fff8df]">
                    <ShoppingBag
                      size={15}
                      className="text-[#D4AF37]"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold">
                      PrimeCart Offer
                    </p>

                    <p className="mt-0.5 truncate text-xs text-gray-500">
                      Buy more and save more on selected products
                    </p>
                  </div>

                  <ChevronRight
                    size={17}
                    className="text-gray-400"
                  />

                </div>

              </div>

            </div>

            {/* COLOR */}

            <div className="mt-6">

              <p className="text-sm font-black">
                Color:{" "}
                <span className="font-normal text-gray-500">
                  {selectedColor}
                </span>
              </p>

              <div className="mt-3 flex items-center gap-3">

                <button
                  type="button"
                  onClick={() => setSelectedColor("Black")}
                  className={`h-10 w-10 rounded-full border-4 bg-black transition ${
                    selectedColor === "Black"
                      ? "border-[#D4AF37] ring-2 ring-[#D4AF37]/20"
                      : "border-white shadow ring-1 ring-gray-200"
                  }`}
                  aria-label="Black"
                />

                <button
                  type="button"
                  onClick={() => setSelectedColor("Red")}
                  className={`h-10 w-10 rounded-full border-4 bg-red-500 transition ${
                    selectedColor === "Red"
                      ? "border-[#D4AF37] ring-2 ring-[#D4AF37]/20"
                      : "border-white shadow ring-1 ring-gray-200"
                  }`}
                  aria-label="Red"
                />

                <button
                  type="button"
                  onClick={() => setSelectedColor("Gold")}
                  className={`h-10 w-10 rounded-full border-4 bg-[#D4AF37] transition ${
                    selectedColor === "Gold"
                      ? "border-black ring-2 ring-[#D4AF37]/20"
                      : "border-white shadow ring-1 ring-gray-200"
                  }`}
                  aria-label="Gold"
                />

              </div>

            </div>

            {/* STOCK */}

            <div className="mt-5">

              {outOfStock ? (
                <p className="text-sm font-bold text-red-500">
                  ● Out of Stock
                </p>
              ) : stock <= 5 ? (
                <p className="text-sm font-bold text-orange-500">
                  ● Only {stock} left in stock
                </p>
              ) : (
                <p className="text-sm font-bold text-green-600">
                  ● In Stock
                </p>
              )}

            </div>

            {/* QUANTITY + BUTTONS */}

            <div className="mt-5 grid gap-3 sm:grid-cols-[115px_1fr_1fr]">

              {/* QUANTITY */}

              <div className="flex h-12 items-center justify-between overflow-hidden rounded-xl border-2 border-gray-200">

                <button
                  type="button"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="flex h-full w-9 items-center justify-center transition hover:bg-gray-50 disabled:opacity-30"
                >
                  <Minus size={16} />
                </button>

                <span className="font-black">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  disabled={quantity >= stock}
                  className="flex h-full w-9 items-center justify-center transition hover:bg-gray-50 disabled:opacity-30"
                >
                  <Plus size={16} />
                </button>

              </div>

              {/* ADD TO CART */}

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={outOfStock || addingToCart}
                className="flex h-12 items-center justify-center gap-2 rounded-xl border-2 border-[#D4AF37] bg-white font-black text-[#B28B18] transition hover:bg-[#D4AF37] hover:text-white disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400"
              >
                <ShoppingCart size={19} />

                {addingToCart
                  ? "Adding..."
                  : "Add to Cart"}
              </button>

              {/* BUY NOW */}

              <button
                type="button"
                onClick={handleBuyNow}
                disabled={outOfStock || buyingNow}
                className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#D4AF37] font-black text-white transition hover:bg-black disabled:bg-gray-300"
              >
                <ShoppingBag size={19} />

                {buyingNow
                  ? "Processing..."
                  : "Buy Now"}
              </button>

            </div>

            {/* WISHLIST */}

            <button
              type="button"
              onClick={() =>
                setWishlist((value) => !value)
              }
              className="mt-4 flex items-center gap-2 text-sm font-bold text-gray-600 transition hover:text-[#D4AF37]"
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

            {/* BENEFITS */}

            <div className="mt-6 grid gap-3 sm:grid-cols-3">

              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <Truck
                  size={20}
                  className="text-[#D4AF37]"
                />

                <p className="mt-2 text-sm font-bold">
                  Fast Delivery
                </p>

                <p className="mt-1 text-[11px] text-gray-500">
                  Quick doorstep delivery
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <ShieldCheck
                  size={20}
                  className="text-[#D4AF37]"
                />

                <p className="mt-2 text-sm font-bold">
                  Secure Payment
                </p>

                <p className="mt-1 text-[11px] text-gray-500">
                  100% secure checkout
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <RotateCcw
                  size={20}
                  className="text-[#D4AF37]"
                />

                <p className="mt-2 text-sm font-bold">
                  Easy Returns
                </p>

                <p className="mt-1 text-[11px] text-gray-500">
                  Hassle-free returns
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          DESCRIPTION
      ===================================================== */}

      <section className="border-t border-gray-100 bg-white">

        <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:py-14">

          <div className="grid gap-10 lg:grid-cols-[1fr_360px]">

            <div>

              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#D4AF37]">
                PrimeCart Product
              </p>

              <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                About This Product
              </h2>

              <p className="mt-5 whitespace-pre-line text-sm leading-8 text-gray-600 sm:text-base">
                {product.description ||
                  product.short_description ||
                  "No detailed description available for this product."}
              </p>

            </div>

            {/* PRODUCT DETAILS */}

            <div className="h-fit rounded-2xl border border-gray-100 bg-gray-50 p-6">

              <h3 className="text-xl font-black">
                Product Details
              </h3>

              <div className="mt-5 space-y-4">

                {product.brand && (
                  <div className="flex justify-between gap-5 border-b border-gray-200 pb-4">
                    <span className="text-sm text-gray-500">
                      Brand
                    </span>

                    <span className="text-right text-sm font-bold">
                      {product.brand}
                    </span>
                  </div>
                )}

                <div className="flex justify-between gap-5 border-b border-gray-200 pb-4">
                  <span className="text-sm text-gray-500">
                    Rating
                  </span>

                  <span className="text-sm font-bold">
                    {rating.toFixed(1)} / 5
                  </span>
                </div>

                <div className="flex justify-between gap-5 border-b border-gray-200 pb-4">
                  <span className="text-sm text-gray-500">
                    Reviews
                  </span>

                  <span className="text-sm font-bold">
                    {reviews}
                  </span>
                </div>

                <div className="flex justify-between gap-5">
                  <span className="text-sm text-gray-500">
                    Availability
                  </span>

                  <span
                    className={
                      outOfStock
                        ? "text-sm font-bold text-red-500"
                        : "text-sm font-bold text-green-600"
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
          TRUST STRIP
      ===================================================== */}

      <section className="border-t border-gray-100 bg-[#fafafa]">

        <div className="mx-auto grid max-w-[1400px] gap-6 px-4 py-8 sm:px-6 md:grid-cols-3">

          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
              <Truck
                size={21}
                className="text-[#D4AF37]"
              />
            </div>

            <div>
              <p className="text-sm font-black">
                Fast Delivery
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Safe doorstep delivery
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
              <ShieldCheck
                size={21}
                className="text-[#D4AF37]"
              />
            </div>

            <div>
              <p className="text-sm font-black">
                Secure Shopping
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Protected checkout
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
              <Check
                size={21}
                className="text-[#D4AF37]"
              />
            </div>

            <div>
              <p className="text-sm font-black">
                Quality Products
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Carefully selected
              </p>
            </div>
          </div>

        </div>

      </section>

    </main>
  );
}
