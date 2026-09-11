"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { motion } from "framer-motion";
import {
  Heart,
  ImageOff,
  ShoppingCart,
  Star,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

import { addToCart } from "@/lib/cart";
import type { Product } from "@/lib/products";

/* =========================================================
   PRODUCT CARD
========================================================= */

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const [imageError, setImageError] =
    useState(false);

  const [wishlist, setWishlist] =
    useState(false);

  const [addingToCart, setAddingToCart] =
    useState(false);

  /* =======================================================
     PRODUCT IMAGE
  ======================================================= */

  const productImage =
    product.image_url?.trim() ||
    product.image?.trim() ||
    "";

  /* =======================================================
     RATING
  ======================================================= */

  const productRating =
    typeof product.rating === "number"
      ? product.rating
      : 0;

  /* =======================================================
     REVIEWS
  ======================================================= */

  const reviews =
    typeof product.reviews_count === "number"
      ? product.reviews_count
      : 0;

  /* =======================================================
     OLD PRICE
  ======================================================= */

  const oldPrice =
    product.original_price ??
    product.oldPrice ??
    null;

  /* =======================================================
     CATEGORY
  ======================================================= */

  const category =
    product.category?.trim() ||
    "Product";

  /* =======================================================
     DISCOUNT
  ======================================================= */

  const discount =
    oldPrice &&
    oldPrice > product.price
      ? Math.round(
          ((oldPrice - product.price) /
            oldPrice) *
            100
        )
      : 0;

  /* =======================================================
     STOCK
  ======================================================= */

  const hasStock =
    typeof product.stock !== "number" ||
    product.stock > 0;

  /* =======================================================
     ADD TO CART
  ======================================================= */

  const handleAddToCart = async () => {
    if (!hasStock) {
      toast.error("This product is out of stock");
      return;
    }

    try {
      setAddingToCart(true);

      await addToCart(product as any);

      toast.success(
        "Product added to cart 🛒"
      );
    } catch (error: any) {
      console.error(
        "Add to cart error:",
        error
      );

      toast.error(
        error?.message ||
          "Please login first"
      );
    } finally {
      setAddingToCart(false);
    }
  };

  /* =======================================================
     WISHLIST
  ======================================================= */

  const handleWishlist = () => {
    setWishlist((current) => {
      const next = !current;

      toast.success(
        next
          ? "Added to wishlist ❤️"
          : "Removed from wishlist"
      );

      return next;
    });
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 24,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      whileHover={{
        y: -7,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
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
        transition-all
        duration-300
        hover:border-[#D4AF37]
        hover:shadow-xl

        dark:border-white/10
        dark:bg-[#101010]
        dark:shadow-none
      "
    >
      {/* ===================================================
          BADGES
      ==================================================== */}

      <div
        className="
          absolute
          left-4
          top-4
          z-20
          flex
          flex-wrap
          gap-2
        "
      >
        {discount > 0 && (
          <span
            className="
              rounded-full
              bg-[#D4AF37]
              px-3
              py-1
              text-[10px]
              font-extrabold
              uppercase
              tracking-wide
              text-black
              shadow-sm
            "
          >
            {discount}% OFF
          </span>
        )}

        {product.featured && (
          <span
            className="
              rounded-full
              border
              border-black/10
              bg-black
              px-3
              py-1
              text-[10px]
              font-bold
              uppercase
              tracking-wide
              text-white
              dark:border-white/10
            "
          >
            Featured
          </span>
        )}
      </div>

      {/* ===================================================
          WISHLIST BUTTON
      ==================================================== */}

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
          z-20
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          border
          border-gray-200
          bg-white/90
          text-gray-700
          shadow-sm
          backdrop-blur
          transition-all
          duration-200

          hover:scale-105
          hover:border-[#D4AF37]
          hover:bg-[#D4AF37]
          hover:text-black

          dark:border-white/10
          dark:bg-black/60
          dark:text-white
        "
      >
        <Heart
          size={18}
          fill={
            wishlist
              ? "currentColor"
              : "none"
          }
        />
      </button>

      {/* ===================================================
          PRODUCT IMAGE
      ==================================================== */}

      <Link
        href={`/dashboard/products/${product.id}`}
        className="block"
        aria-label={`View ${product.name}`}
      >
        <div
          className="
            relative
            h-64
            w-full
            overflow-hidden
            bg-gray-50

            dark:bg-black/30
          "
        >
          {/* IMAGE BACKGROUND */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-br
              from-gray-50
              via-white
              to-gray-100

              dark:from-white/[0.03]
              dark:via-transparent
              dark:to-white/[0.02]
            "
          />

          {!productImage ||
          imageError ? (
            <div
              className="
                relative
                z-10
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
              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gray-100

                  dark:bg-white/5
                "
              >
                <ImageOff
                  size={30}
                />
              </div>

              <span
                className="
                  mt-3
                  text-xs
                  font-medium
                "
              >
                Image unavailable
              </span>
            </div>
          ) : (
            <Image
              src={productImage}
              alt={
                product.name ||
                "Product"
              }
              fill
              sizes="
                (max-width: 640px) 100vw,
                (max-width: 1024px) 50vw,
                25vw
              "
              unoptimized
              priority={false}
              onError={() =>
                setImageError(true)
              }
              className="
                relative
                z-10
                object-contain
                p-8
                transition-transform
                duration-500
                ease-out
                group-hover:scale-110
              "
            />
          )}

          {/* HOVER OVERLAY */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              z-10
              bg-black/[0.02]
              opacity-0
              transition-opacity
              duration-300
              group-hover:opacity-100
              dark:bg-white/[0.02]
            "
          />
        </div>
      </Link>

      {/* ===================================================
          PRODUCT INFORMATION
      ==================================================== */}

      <div className="p-5">

        {/* CATEGORY */}

        <p
          className="
            text-[10px]
            font-extrabold
            uppercase
            tracking-[0.18em]
            text-[#B28D1A]
            dark:text-[#D4AF37]
          "
        >
          {category}
        </p>

        {/* BRAND */}

        {product.brand && (
          <p
            className="
              mt-1.5
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

        <Link
          href={`/dashboard/products/${product.id}`}
        >
          <h3
            title={product.name}
            className="
              mt-2
              line-clamp-1
              text-lg
              font-bold
              leading-tight
              text-gray-900
              transition-colors

              group-hover:text-[#B28D1A]

              dark:text-white
              dark:group-hover:text-[#D4AF37]
            "
          >
            {product.name}
          </h3>
        </Link>

        {/* SHORT DESCRIPTION */}

        {product.short_description && (
          <p
            className="
              mt-2
              line-clamp-2
              min-h-[32px]
              text-xs
              leading-5
              text-gray-500

              dark:text-gray-400
            "
          >
            {product.short_description}
          </p>
        )}

        {/* =================================================
            RATING
        ================================================== */}

        <div
          className="
            mt-3
            flex
            items-center
            gap-2
          "
        >
          <div
            className="
              flex
              items-center
              gap-1
              rounded-lg
              bg-[#D4AF37]
              px-2
              py-1
              text-xs
              font-extrabold
              text-black
            "
          >
            <Star
              size={13}
              fill="currentColor"
            />

            {productRating > 0
              ? productRating.toFixed(1)
              : "New"}
          </div>

          {reviews > 0 && (
            <span
              className="
                text-xs
                text-gray-500
                dark:text-gray-400
              "
            >
              {reviews.toLocaleString(
                "en-IN"
              )}{" "}
              reviews
            </span>
          )}
        </div>

        {/* =================================================
            PRICE
        ================================================== */}

        <div
          className="
            mt-4
            flex
            items-center
            gap-3
          "
        >
          <span
            className="
              text-2xl
              font-extrabold
              tracking-tight
              text-[#B28D1A]

              dark:text-[#D4AF37]
            "
          >
            ₹
            {Number(
              product.price || 0
            ).toLocaleString(
              "en-IN"
            )}
          </span>

          {oldPrice &&
            oldPrice >
              product.price && (
              <span
                className="
                  text-sm
                  font-medium
                  text-gray-400
                  line-through
                  dark:text-gray-500
                "
              >
                ₹
                {Number(
                  oldPrice
                ).toLocaleString(
                  "en-IN"
                )}
              </span>
            )}
        </div>

        {/* =================================================
            STOCK STATUS
        ================================================== */}

        {typeof product.stock ===
          "number" && (
          <div className="mt-2">
            {product.stock > 0 ? (
              <p
                className="
                  text-xs
                  font-semibold
                  text-green-600
                  dark:text-green-400
                "
              >
                {product.stock}{" "}
                {product.stock === 1
                  ? "item"
                  : "items"}{" "}
                available
              </p>
            ) : (
              <p
                className="
                  text-xs
                  font-semibold
                  text-red-500
                  dark:text-red-400
                "
              >
                Out of stock
              </p>
            )}
          </div>
        )}

        {/* =================================================
            ACTION BUTTONS
        ================================================== */}

        <div
          className="
            mt-5
            grid
            grid-cols-2
            gap-3
          "
        >
          {/* ADD TO CART */}

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={
              addingToCart ||
              !hasStock
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
              px-3
              py-3
              text-sm
              font-semibold
              text-gray-900
              transition-all
              duration-200

              hover:border-[#D4AF37]
              hover:bg-[#D4AF37]
              hover:text-black

              disabled:cursor-not-allowed
              disabled:opacity-50
              disabled:hover:border-gray-200
              disabled:hover:bg-gray-100

              dark:border-white/10
              dark:bg-white/[0.07]
              dark:text-white

              dark:disabled:hover:border-white/10
              dark:disabled:hover:bg-white/[0.07]
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
              <ShoppingCart
                size={17}
              />
            )}

            <span>
              {addingToCart
                ? "Adding..."
                : "Cart"}
            </span>
          </button>

          {/* BUY NOW */}

          <Link
            href={`/checkout?product=${product.id}`}
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#D4AF37]
              px-3
              py-3
              text-sm
              font-extrabold
              text-black
              transition-all
              duration-200

              hover:scale-[1.02]
              hover:bg-[#C9A227]
              active:scale-[0.98]
            "
          >
            <Zap size={17} />

            <span>
              Buy Now
            </span>
          </Link>
        </div>

      </div>
    </motion.article>
  );
}
