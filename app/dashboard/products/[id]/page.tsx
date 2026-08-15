"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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

  const [addingToCart, setAddingToCart] = useState(false);
  const [buyingNow, setBuyingNow] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | FETCH PRODUCT
  |--------------------------------------------------------------------------
  */

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

        /*
        |--------------------------------------------------------------------------
        | FETCH CATEGORY
        |--------------------------------------------------------------------------
        */

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

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

          {/* Breadcrumb Skeleton */}
          <div className="flex gap-2 items-center">
            <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
          </div>

          <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 mt-8">

            {/* Image */}
            <div className="h-[520px] bg-gray-100 rounded-3xl animate-pulse" />

            {/* Details */}
            <div className="space-y-5 pt-3">

              <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />

              <div className="h-12 w-4/5 bg-gray-200 rounded animate-pulse" />

              <div className="h-6 w-64 bg-gray-200 rounded animate-pulse" />

              <div className="h-10 w-72 bg-gray-200 rounded animate-pulse" />

              <div className="h-24 w-full bg-gray-200 rounded animate-pulse" />

              <div className="h-14 w-full bg-gray-200 rounded animate-pulse" />

            </div>
          </div>
        </div>
      </main>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | PRODUCT NOT FOUND
  |--------------------------------------------------------------------------
  */

  if (!product) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-6">

        <div className="text-center max-w-md">

          <div className="w-24 h-24 rounded-3xl bg-gray-100 flex items-center justify-center mx-auto">
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

      </main>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | PRODUCT VALUES
  |--------------------------------------------------------------------------
  */

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

  /*
  |--------------------------------------------------------------------------
  | QUANTITY
  |--------------------------------------------------------------------------
  */

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

  /*
  |--------------------------------------------------------------------------
  | ADD TO CART
  |--------------------------------------------------------------------------
  */

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

  /*
  |--------------------------------------------------------------------------
  | BUY NOW
  |--------------------------------------------------------------------------
  */

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

  /*
  |--------------------------------------------------------------------------
  | PAGE
  |--------------------------------------------------------------------------
  */

  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* =========================================================
          BREADCRUMB
      ========================================================= */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5">

        <div className="flex flex-wrap items-center gap-2 text-sm">

          <Link
            href="/dashboard"
            className="text-gray-400 hover:text-[#D4AF37] font-semibold transition"
          >
            Home
          </Link>

          <ChevronRight
            size={15}
            className="text-gray-300"
          />

          {category && (
            <>
              <Link
                href={`/dashboard/category/${category.slug}`}
                className="text-gray-400 hover:text-[#D4AF37] font-semibold transition"
              >
                {category.name}
              </Link>

              <ChevronRight
                size={15}
                className="text-gray-300"
              />
            </>
          )}

          <span className="text-gray-500 font-semibold truncate max-w-[220px]">
            {product.name}
          </span>

        </div>

      </div>


      {/* =========================================================
          MAIN PRODUCT
      ========================================================= */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-7 lg:py-10">

        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 xl:gap-14">

          {/* =====================================================
              LEFT SIDE
          ===================================================== */}

          <div className="min-w-0">

            <div className="grid grid-cols-[72px_1fr] sm:grid-cols-[82px_1fr] gap-4">

              {/* THUMBNAILS */}

              <div className="flex flex-col gap-3">

                <button
                  type="button"
                  className="
                    relative
                    h-16
                    sm:h-[74px]
                    rounded-xl
                    border-2
                    border-[#D4AF37]
                    bg-white
                    overflow-hidden
                  "
                >

                  {product.image_url ? (
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      sizes="82px"
                      className="object-contain p-2"
                    />
                  ) : (
                    <ShoppingBag
                      size={24}
                      className="absolute inset-0 m-auto text-gray-300"
                    />
                  )}

                </button>

                {/* Second thumbnail */}

                <button
                  type="button"
                  className="
                    relative
                    h-16
                    sm:h-[74px]
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50
                    overflow-hidden
                  "
                >

                  {product.image_url ? (
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      sizes="82px"
                      className="object-contain p-2 opacity-80"
                    />
                  ) : (
                    <ShoppingBag
                      size={24}
                      className="absolute inset-0 m-auto text-gray-300"
                    />
                  )}

                </button>

              </div>


              {/* MAIN IMAGE */}

              <div
                className="
                  relative
                  h-[430px]
                  sm:h-[540px]
                  lg:h-[590px]
                  rounded-3xl
                  bg-[#fafafa]
                  border
                  border-gray-100
                  overflow-hidden
                "
              >

                {/* SALE BADGE */}

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
                      shadow-lg
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
                    setWishlist((value) => !value)
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
                  aria-label="Add to wishlist"
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
                      (max-width: 768px) 80vw,
                      (max-width: 1024px) 45vw,
                      42vw
                    "
                    className="
                      object-contain
                      p-8
                      sm:p-12
                      hover:scale-105
                      transition-transform
                      duration-500
                    "
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


            {/* SECURE TEXT */}

            <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mt-5">
              <ShieldCheck
                size={17}
                className="text-[#D4AF37]"
              />

              Secure & Quality Assured
            </div>

          </div>


          {/* =====================================================
              RIGHT SIDE
          ===================================================== */}

          <div className="flex flex-col justify-center">

            {/* BRAND */}

            {product.brand && (
              <p
                className="
                  text-sm
                  font-black
                  uppercase
                  tracking-[0.18em]
                  text-[#C39B25]
                "
              >
                {product.brand}
              </p>
            )}


            {/* PRODUCT NAME */}

            <h1
              className="
                text-3xl
                sm:text-4xl
                xl:text-[46px]
                font-black
                leading-[1.08]
                text-gray-900
                mt-3
              "
            >
              {product.name}
            </h1>


            {/* SHORT DESCRIPTION */}

            <p className="text-gray-500 mt-3 text-base leading-7">
              {product.short_description ||
                "Premium quality product from PrimeCart."}
            </p>


            {/* RATING */}

            <div className="flex flex-wrap items-center gap-3 mt-5">

              <div className="flex items-center gap-1.5 text-[#E0A800]">

                <Star
                  size={18}
                  className="fill-[#E0A800]"
                />

                <Star
                  size={18}
                  className="fill-[#E0A800]"
                />

                <Star
                  size={18}
                  className="fill-[#E0A800]"
                />

                <Star
                  size={18}
                  className="fill-[#E0A800]"
                />

                <Star
                  size={18}
                  className="fill-[#E0A800]"
                />

              </div>

              <span className="font-bold text-gray-700">
                {rating.toFixed(1)}
              </span>

              <span className="text-gray-400">
                ({reviews} Reviews)
              </span>

              <span className="hidden sm:block text-gray-300">
                |
              </span>

              <span className="flex items-center gap-1 text-[#C39B25] font-bold">
                <Check size={16} />
                Genuine Product
              </span>

            </div>


            <div className="h-px bg-gray-100 my-6" />


            {/* PRICE */}

            <div>

              <div className="flex flex-wrap items-center gap-3">

                <span className="text-4xl sm:text-5xl font-black text-gray-900">
                  ₹{price.toLocaleString("en-IN")}
                </span>

                {originalPrice &&
                  originalPrice > price && (
                    <>
                      <span className="text-lg text-gray-400 line-through">
                        ₹
                        {originalPrice.toLocaleString(
                          "en-IN"
                        )}
                      </span>

                      <span className="text-sm font-black text-[#C39B25]">
                        ({discount}% OFF)
                      </span>
                    </>
                  )}

              </div>

              <p className="text-sm text-gray-400 mt-2">
                Inclusive of all applicable taxes
              </p>

            </div>


            {/* OFFERS */}

            <div className="mt-7">

              <h3 className="font-black text-lg mb-3">
                Offers
              </h3>

              <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white">

                <div className="flex items-center gap-4 px-5 py-4 border-b border-gray-100">

                  <div className="w-9 h-9 rounded-full bg-[#FFF7DD] flex items-center justify-center">
                    <Zap
                      size={17}
                      className="text-[#D4AF37]"
                    />
                  </div>

                  <div className="flex-1">

                    <p className="font-bold text-sm">
                      Bank Offer
                    </p>

                    <p className="text-sm text-gray-500 mt-0.5">
                      Get extra instant discount on selected cards
                    </p>

                  </div>

                  <ChevronRight
                    size={18}
                    className="text-gray-400"
                  />

                </div>


                <div className="flex items-center gap-4 px-5 py-4">

                  <div className="w-9 h-9 rounded-full bg-[#FFF7DD] flex items-center justify-center">
                    <ShoppingBag
                      size={17}
                      className="text-[#D4AF37]"
                    />
                  </div>

                  <div className="flex-1">

                    <p className="font-bold text-sm">
                      PrimeCart Offer
                    </p>

                    <p className="text-sm text-gray-500 mt-0.5">
                      Buy more and save more on selected products
                    </p>

                  </div>

                  <ChevronRight
                    size={18}
                    className="text-gray-400"
                  />

                </div>

              </div>

            </div>


            {/* COLOR */}

            <div className="mt-7">

              <p className="font-black">
                Color:{" "}
                <span className="font-normal text-gray-500">
                  {selectedColor}
                </span>
              </p>

              <div className="flex items-center gap-4 mt-3">

                {/* BLACK */}

                <button
                  type="button"
                  onClick={() =>
                    setSelectedColor("Black")
                  }
                  className={`
                    w-11
                    h-11
                    rounded-full
                    bg-black
                    border-4
                    ${
                      selectedColor === "Black"
                        ? "border-[#D4AF37] ring-2 ring-[#D4AF37]/30"
                        : "border-white shadow ring-1 ring-gray-200"
                    }
                  `}
                  aria-label="Black"
                />


                {/* RED */}

                <button
                  type="button"
                  onClick={() =>
                    setSelectedColor("Red")
                  }
                  className={`
                    w-11
                    h-11
                    rounded-full
                    bg-red-500
                    border-4
                    ${
                      selectedColor === "Red"
                        ? "border-[#D4AF37] ring-2 ring-[#D4AF37]/30"
                        : "border-white shadow ring-1 ring-gray-200"
                    }
                  `}
                  aria-label="Red"
                />


                {/* GOLD */}

                <button
                  type="button"
                  onClick={() =>
                    setSelectedColor("Gold")
                  }
                  className={`
                    w-11
                    h-11
                    rounded-full
                    bg-[#D4AF37]
                    border-4
                    ${
                      selectedColor === "Gold"
                        ? "border-black ring-2 ring-[#D4AF37]/30"
                        : "border-white shadow ring-1 ring-gray-200"
                    }
                  `}
                  aria-label="Gold"
                />

              </div>

            </div>


            {/* STOCK */}

            <div className="mt-5">

              {outOfStock ? (
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


            {/* QUANTITY + BUTTONS */}

            <div className="grid sm:grid-cols-[125px_1fr_1fr] gap-3 mt-6">

              {/* QUANTITY */}

              <div
                className="
                  h-14
                  rounded-2xl
                  border-2
                  border-gray-200
                  flex
                  items-center
                  justify-between
                  overflow-hidden
                "
              >

                <button
                  type="button"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="w-10 h-full flex items-center justify-center hover:bg-gray-50 disabled:opacity-30"
                >
                  <Minus size={17} />
                </button>

                <span className="font-black">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  disabled={quantity >= stock}
                  className="w-10 h-full flex items-center justify-center hover:bg-gray-50 disabled:opacity-30"
                >
                  <Plus size={17} />
                </button>

              </div>


              {/* ADD TO CART */}

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={outOfStock || addingToCart}
                className="
                  h-14
                  rounded-2xl
                  border-2
                  border-[#D4AF37]
                  text-[#B28B18]
                  bg-white
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
                  : "Add to Cart"}

              </button>


              {/* BUY NOW */}

              <button
                type="button"
                onClick={handleBuyNow}
                disabled={outOfStock || buyingNow}
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
              className="
                flex
                items-center
                gap-2
                mt-5
                text-gray-600
                hover:text-[#D4AF37]
                font-bold
                transition
              "
            >

              <Heart
                size={20}
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

            <div className="grid sm:grid-cols-3 gap-3 mt-7">

              <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">

                <Truck
                  size={21}
                  className="text-[#D4AF37]"
                />

                <p className="font-bold text-sm mt-3">
                  Fast Delivery
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Quick doorstep delivery
                </p>

              </div>


              <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">

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


              <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">

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


      {/* =========================================================
          DESCRIPTION
      ========================================================= */}

      <section className="border-t border-gray-100 bg-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

          <div className="grid lg:grid-cols-3 gap-10">

            <div className="lg:col-span-2">

              <p className="text-sm font-black uppercase tracking-wider text-[#D4AF37]">
                PrimeCart Product
              </p>

              <h2 className="text-3xl font-black mt-2">
                About This Product
              </h2>

              <p className="text-gray-600 leading-8 mt-5 whitespace-pre-line">
                {product.description ||
                  product.short_description ||
                  "No detailed description available for this product."}
              </p>

            </div>


            {/* PRODUCT DETAILS */}

            <div className="bg-gray-50 rounded-3xl border border-gray-100 p-6 h-fit">

              <h3 className="text-xl font-black">
                Product Details
              </h3>

              <div className="mt-5 space-y-4">

                {product.brand && (
                  <div className="flex justify-between gap-4 pb-4 border-b border-gray-200">

                    <span className="text-gray-500">
                      Brand
                    </span>

                    <span className="font-bold">
                      {product.brand}
                    </span>

                  </div>
                )}

                <div className="flex justify-between gap-4 pb-4 border-b border-gray-200">

                  <span className="text-gray-500">
                    Rating
                  </span>

                  <span className="font-bold">
                    {rating.toFixed(1)} / 5
                  </span>

                </div>

                <div className="flex justify-between gap-4 pb-4 border-b border-gray-200">

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
                      outOfStock
                        ? "font-bold text-red-500"
                        : "font-bold text-green-600"
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


      {/* =========================================================
          TRUST SECTION
      ========================================================= */}

      <section className="bg-gray-50 border-t border-gray-100">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid sm:grid-cols-3 gap-8">

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
