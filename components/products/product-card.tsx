"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { motion } from "framer-motion";
import { Heart, ImageOff, Star, Zap } from "lucide-react";
import { toast } from "sonner";

import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const [wishlist, setWishlist] = useState(false);

  /* =========================================================
     PRODUCT IMAGE
  ========================================================= */

  const productImage = (() => {
    const image = product.image_url?.trim();

    if (!image) return "";

    // Full local path
    if (image.startsWith("/")) {
      return image;
    }

    // Filename stored in Supabase
    return `/products/${image}`;
  })();

  /* =========================================================
     RATING
  ========================================================= */

  const productRating =
    typeof product.rating === "number"
      ? product.rating
      : Number(product.rating ?? 0);

  /* =========================================================
     REVIEWS
  ========================================================= */

  const reviews =
    typeof product.reviews_count === "number"
      ? product.reviews_count
      : Number(product.reviews_count ?? 0);

  /* =========================================================
     PRICE
  ========================================================= */

  const currentPrice = Number(product.price ?? 0);

  const oldPrice =
    product.original_price !== null &&
    product.original_price !== undefined
      ? Number(product.original_price)
      : null;

  /* =========================================================
     DISCOUNT
  ========================================================= */

  const discount =
    oldPrice !== null && oldPrice > currentPrice
      ? Math.round(
          ((oldPrice - currentPrice) / oldPrice) * 100
        )
      : 0;

  /* =========================================================
     CATEGORY
  ========================================================= */

  const category =
    typeof product.category === "string" &&
    product.category.trim()
      ? product.category.trim()
      : "Product";

  /* =========================================================
     STOCK
  ========================================================= */

  const stock =
    product.stock === null ||
    product.stock === undefined
      ? null
      : Number(product.stock);

  const hasStock = stock === null || stock > 0;

  /* =========================================================
     FEATURED
  ========================================================= */

  const isFeatured =
    product.is_featured === true ||
    product.featured === true;

  /* =========================================================
     FLASH SALE
  ========================================================= */

  const isFlashSale =
    product.is_flash_sale === true ||
    product.flash_sale === true;

  /* =========================================================
     WISHLIST
  ========================================================= */

  const handleWishlist = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();

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

  /* =========================================================
     PRODUCT DETAIL URL

     IMPORTANT:
     This matches:
     /dashboard/products/[id]
  ========================================================= */

  const productUrl = `/dashboard/products/${product.id}`;

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 20,
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
        y: -6,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
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
      {/* =====================================================
          BADGES
      ====================================================== */}

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
        {/* DISCOUNT */}

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

        {/* FLASH SALE */}

        {isFlashSale && (
          <span
            className="
              flex
              items-center
              gap-1
              rounded-full
              bg-black
              px-3
              py-1
              text-[10px]
              font-extrabold
              uppercase
              tracking-wide
              text-white
            "
          >
            <Zap size={11} />
            Deal
          </span>
        )}

        {/* FEATURED */}

        {isFeatured && (
          <span
            className="
              rounded-full
              border
              border-[#D4AF37]/40
              bg-[#FFF8DF]
              px-3
              py-1
              text-[10px]
              font-bold
              uppercase
              tracking-wide
              text-[#8A6A00]

              dark:border-[#D4AF37]/30
              dark:bg-[#D4AF37]/15
              dark:text-[#D4AF37]
            "
          >
            Featured
          </span>
        )}
      </div>

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
          z-30
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          border
          border-gray-200
          bg-white/95
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
          fill={wishlist ? "currentColor" : "none"}
        />
      </button>

      {/* =====================================================
          ENTIRE PRODUCT AREA
      ====================================================== */}

      <Link
        href={productUrl}
        aria-label={`View ${product.name}`}
        className="block"
      >
        {/* ===================================================
            PRODUCT IMAGE
        ==================================================== */}

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

          {/* IMAGE */}

          {!productImage || imageError ? (
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
                <ImageOff size={30} />
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
              key={productImage}
              src={productImage}
              alt={product.name || "Product"}
              fill
              sizes="
                (max-width: 640px) 100vw,
                (max-width: 1024px) 50vw,
                25vw
              "
              unoptimized
              priority={false}
              onError={() => setImageError(true)}
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

          {/* PRODUCT NAME */}

          <h3
            title={product.name}
            className="
              mt-2
              line-clamp-2
              min-h-[44px]
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
                rounded-md
                bg-[#D4AF37]
                px-2
                py-1
                text-xs
                font-extrabold
                text-black
              "
            >
              <Star
                size={12}
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
                {reviews.toLocaleString("en-IN")}{" "}
                {reviews === 1
                  ? "review"
                  : "reviews"}
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
              flex-wrap
              items-baseline
              gap-2
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
              ₹{currentPrice.toLocaleString("en-IN")}
            </span>

            {oldPrice !== null &&
              oldPrice > currentPrice && (
                <span
                  className="
                    text-sm
                    font-medium
                    text-gray-400
                    line-through

                    dark:text-gray-500
                  "
                >
                  ₹{oldPrice.toLocaleString("en-IN")}
                </span>
              )}
          </div>

          {/* =================================================
              STOCK
          ================================================== */}

          {stock !== null && (
            <div className="mt-2">
              {stock > 0 ? (
                <p
                  className="
                    text-xs
                    font-semibold
                    text-green-600

                    dark:text-green-400
                  "
                >
                  {stock <= 5
                    ? `Only ${stock} left in stock`
                    : "In stock"}
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
                  Currently unavailable
                </p>
              )}
            </div>
          )}

          {/* =================================================
              VIEW PRODUCT
          ================================================== */}

          <div
            className="
              mt-4
              flex
              items-center
              justify-between
              border-t
              border-gray-100
              pt-4

              dark:border-white/10
            "
          >
            <span
              className="
                text-xs
                font-semibold
                text-gray-500

                dark:text-gray-400
              "
            >
              View product details
            </span>

            <span
              className="
                text-sm
                font-bold
                text-[#B28D1A]
                transition-transform
                duration-200

                group-hover:translate-x-1

                dark:text-[#D4AF37]
              "
            >
              →
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
