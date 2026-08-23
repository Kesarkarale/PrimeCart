"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { addToCart } from "@/lib/cart";
import { toast } from "sonner";

import {
  Heart,
  ShoppingCart,
  Star,
  Zap,
  ImageOff,
} from "lucide-react";

import { motion } from "framer-motion";

interface Product {
  id: string;
  name: string;

  price: number;
  original_price?: number | null;
  oldPrice?: number | null;

  rating?: number | null;
  reviews_count?: number | null;

  image?: string | null;
  image_url?: string | null;

  category?: string | null;
  category_id?: string | null;

  brand?: string | null;

  stock?: number | null;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);

  /*
   * Supabase DB uses image_url.
   * FeaturedProducts may use image.
   * Support both.
   */
  const productImage =
    product.image_url?.trim() ||
    product.image?.trim() ||
    "";

  const productRating =
    typeof product.rating === "number"
      ? product.rating
      : 0;

  const reviews =
    typeof product.reviews_count === "number"
      ? product.reviews_count
      : 0;

  const oldPrice =
    product.original_price ??
    product.oldPrice ??
    null;

  const category =
    product.category ||
    "Product";

  const discount =
    oldPrice && oldPrice > product.price
      ? Math.round(
          ((oldPrice - product.price) / oldPrice) * 100
        )
      : 0;

  /*
   * Handle Add To Cart
   */
  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);

      await addToCart(product as any);

      toast.success("Product added to cart 🛒");
    } catch (error: any) {
      console.error("Add to cart error:", error);

      toast.error(
        error?.message || "Please login first"
      );
    } finally {
      setAddingToCart(false);
    }
  };

  /*
   * Wishlist
   */
  const handleWishlist = () => {
    setWishlist((value) => !value);

    toast.success(
      wishlist
        ? "Removed from wishlist"
        : "Added to wishlist ❤️"
    );
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.3,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-gray-200
        bg-white
        shadow-sm
        transition
        hover:border-[#D4AF37]
        hover:shadow-lg

        dark:border-white/10
        dark:bg-white/5
        dark:shadow-none
      "
    >
      {/* =====================================================
          DISCOUNT
      ====================================================== */}

      {discount > 0 && (
        <div
          className="
            absolute
            left-4
            top-4
            z-10
            rounded-full
            bg-[#D4AF37]
            px-3
            py-1
            text-[11px]
            font-bold
            text-black
          "
        >
          {discount}% OFF
        </div>
      )}

      {/* =====================================================
          WISHLIST
      ====================================================== */}

      <button
        type="button"
        onClick={handleWishlist}
        aria-label={
          wishlist
            ? "Remove from wishlist"
            : "Add to wishlist"
        }
        className="
          absolute
          right-4
          top-4
          z-10
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          bg-gray-100
          text-gray-700
          transition

          hover:bg-[#D4AF37]
          hover:text-black

          dark:bg-black/50
          dark:text-white
        "
      >
        <Heart
          size={19}
          fill={
            wishlist
              ? "currentColor"
              : "none"
          }
        />
      </button>

      {/* =====================================================
          IMAGE
      ====================================================== */}

      <Link
        href={`/dashboard/products/${product.id}`}
        className="block"
      >
        <div
          className="
            relative
            h-64
            w-full
            overflow-hidden
            bg-gray-100

            dark:bg-black/40
          "
        >
          {!productImage || imageError ? (
            <div
              className="
                flex
                h-full
                w-full
                flex-col
                items-center
                justify-center
                text-gray-400
                dark:text-gray-500
              "
            >
              <ImageOff size={42} />

              <span className="mt-2 text-xs">
                Image unavailable
              </span>
            </div>
          ) : (
            <Image
              src={productImage}
              alt={product.name || "Product"}
              fill
              sizes="
                (max-width: 640px) 100vw,
                (max-width: 1024px) 50vw,
                25vw
              "
              unoptimized
              onError={() => setImageError(true)}
              className="
                object-contain
                p-8
                transition
                duration-500
                group-hover:scale-110
              "
            />
          )}
        </div>
      </Link>

      {/* =====================================================
          PRODUCT DETAILS
      ====================================================== */}

      <div className="p-5">

        {/* CATEGORY */}

        <p
          className="
            text-xs
            font-semibold
            uppercase
            tracking-wider
            text-[#D4AF37]
          "
        >
          {category}
        </p>

        {/* BRAND */}

        {product.brand && (
          <p
            className="
              mt-1
              text-[11px]
              font-medium
              text-gray-400
              dark:text-gray-500
            "
          >
            {product.brand}
          </p>
        )}

        {/* NAME */}

        <h3
          className="
            mt-2
            line-clamp-1
            text-xl
            font-bold
            text-gray-900
            dark:text-white
          "
          title={product.name}
        >
          {product.name}
        </h3>

        {/* =================================================
            RATING
        ================================================== */}

        <div className="mt-3 flex items-center gap-2">

          <div
            className="
              flex
              items-center
              gap-1
              rounded-lg
              bg-[#D4AF37]
              px-2
              py-1
              text-sm
              font-bold
              text-black
            "
          >
            <Star
              size={14}
              fill="currentColor"
            />

            {productRating > 0
              ? productRating.toFixed(1)
              : "New"}
          </div>

          <span
            className="
              text-sm
              text-gray-500
              dark:text-gray-400
            "
          >
            ({reviews} Reviews)
          </span>

        </div>

        {/* =================================================
            PRICE
        ================================================== */}

        <div className="mt-4 flex items-center gap-3">

          <h4
            className="
              text-2xl
              font-bold
              text-[#D4AF37]
            "
          >
            ₹
            {Number(
              product.price || 0
            ).toLocaleString("en-IN")}
          </h4>

          {oldPrice &&
            oldPrice > product.price && (
              <p
                className="
                  text-sm
                  text-gray-400
                  line-through
                  dark:text-gray-500
                "
              >
                ₹
                {Number(
                  oldPrice
                ).toLocaleString("en-IN")}
              </p>
            )}

        </div>

        {/* =================================================
            STOCK
        ================================================== */}

        {typeof product.stock === "number" && (
          <p
            className={`
              mt-2
              text-xs
              font-medium

              ${
                product.stock > 0
                  ? "text-green-600"
                  : "text-red-500"
              }
            `}
          >
            {product.stock > 0
              ? `${product.stock} items available`
              : "Out of stock"}
          </p>
        )}

        {/* =================================================
            BUTTONS
        ================================================== */}

        <div className="mt-5 grid grid-cols-2 gap-3">

          {/* CART */}

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={
              addingToCart ||
              product.stock === 0
            }
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-gray-200
              bg-gray-100
              py-3
              text-sm
              text-gray-900
              transition

              hover:border-[#D4AF37]

              disabled:cursor-not-allowed
              disabled:opacity-50

              dark:border-white/10
              dark:bg-white/10
              dark:text-white
            "
          >
            {addingToCart ? (
              <span
                className="
                  h-4
                  w-4
                  animate-spin
                  rounded-full
                  border-2
                  border-gray-400
                  border-t-transparent
                "
              />
            ) : (
              <ShoppingCart size={17} />
            )}

            {addingToCart
              ? "Adding..."
              : "Cart"}
          </button>

          {/* BUY */}

          <Link
            href={`/checkout?product=${product.id}`}
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#D4AF37]
              py-3
              text-sm
              font-bold
              text-black
              transition

              hover:scale-[1.02]
              hover:bg-[#c9a227]
            "
          >
            <Zap size={17} />

            Buy
          </Link>

        </div>

      </div>
    </motion.div>
  );
}
