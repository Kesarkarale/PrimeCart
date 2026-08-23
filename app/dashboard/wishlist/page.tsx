"use client";

import Link from "next/link";
import {
  Heart,
  ShoppingCart,
  Trash2,
  Star,
  ArrowLeft,
  ShoppingBag,
  ChevronRight,
  Check,
} from "lucide-react";
import { useState } from "react";

type WishlistProduct = {
  id: number;
  name: string;
  brand: string;
  image: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  stock: number;
};

const initialWishlist: WishlistProduct[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    brand: "PrimeAudio",
    image: "/products/headphone.png",
    price: 2499,
    originalPrice: 3999,
    rating: 4.8,
    reviews: 245,
    stock: 12,
  },
  {
    id: 2,
    name: "Smart Watch",
    brand: "PrimeTech",
    image: "/products/watch.png",
    price: 3299,
    originalPrice: 4999,
    rating: 4.6,
    reviews: 182,
    stock: 8,
  },
  {
    id: 3,
    name: "Premium Backpack",
    brand: "PrimeCarry",
    image: "/products/bag.png",
    price: 1899,
    originalPrice: 2999,
    rating: 4.7,
    reviews: 126,
    stock: 15,
  },
];

export default function WishlistPage() {
  const [wishlist, setWishlist] =
    useState<WishlistProduct[]>(initialWishlist);

  const [cartItems, setCartItems] = useState<number[]>([]);

  function removeFromWishlist(id: number) {
    setWishlist((items) =>
      items.filter((item) => item.id !== id)
    );
  }

  function addToCart(id: number) {
    setCartItems((items) =>
      items.includes(id) ? items : [...items, id]
    );
  }

  function moveAllToCart() {
    setCartItems(wishlist.map((item) => item.id));
  }

  return (
    <main className="min-h-screen bg-[#faf8f3] px-4 py-6 transition-colors dark:bg-[#050505] sm:px-6 lg:px-8">

      <div className="mx-auto max-w-[1350px]">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>

            {/* Breadcrumb */}

            <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">

              <Link
                href="/dashboard"
                className="transition hover:text-[#c99516]"
              >
                Home
              </Link>

              <ChevronRight size={15} />

              <span>Wishlist</span>

            </div>

            <div className="flex items-center gap-3">

              <div className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-[#faf0d7]
                text-[#c99516]
              ">
                <Heart
                  size={23}
                  fill="currentColor"
                />
              </div>

              <div>

                <h1 className="
                  text-3xl
                  font-black
                  tracking-tight
                  text-[#111]
                  dark:text-white
                  sm:text-4xl
                ">
                  My Wishlist
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  {wishlist.length}{" "}
                  {wishlist.length === 1
                    ? "item"
                    : "items"}{" "}
                  saved for later
                </p>

              </div>

            </div>

          </div>

          {wishlist.length > 0 && (
            <button
              type="button"
              onClick={moveAllToCart}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#d99d08]
                px-5
                py-3
                text-sm
                font-bold
                text-white
                shadow-[0_6px_18px_rgba(217,157,8,0.18)]
                transition
                hover:bg-[#c88f05]
                active:scale-[0.98]
              "
            >
              <ShoppingCart size={17} />
              Move All to Cart
            </button>
          )}

        </div>

        {/* =====================================================
            WISHLIST
        ===================================================== */}

        {wishlist.length > 0 ? (

          <div className="
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
          ">

            {wishlist.map((product) => {

              const discount = Math.round(
                ((product.originalPrice -
                  product.price) /
                  product.originalPrice) *
                  100
              );

              const inCart =
                cartItems.includes(product.id);

              return (
                <div
                  key={product.id}
                  className="
                    group
                    overflow-hidden
                    rounded-3xl
                    border
                    border-[#e8e3d9]
                    bg-white
                    shadow-sm
                    transition
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-lg
                    dark:border-[#222]
                    dark:bg-[#0d0d0d]
                  "
                >

                  {/* PRODUCT IMAGE */}

                  <div className="
                    relative
                    h-[245px]
                    overflow-hidden
                    bg-[#fafafa]
                    dark:bg-[#151515]
                  ">

                    {/* DISCOUNT */}

                    <span className="
                      absolute
                      left-4
                      top-4
                      z-10
                      rounded-full
                      bg-[#d99d08]
                      px-3
                      py-1.5
                      text-[11px]
                      font-black
                      text-white
                    ">
                      {discount}% OFF
                    </span>

                    {/* REMOVE */}

                    <button
                      type="button"
                      onClick={() =>
                        removeFromWishlist(product.id)
                      }
                      aria-label={`Remove ${product.name} from wishlist`}
                      className="
                        absolute
                        right-4
                        top-4
                        z-10
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        bg-white
                        text-gray-500
                        shadow-md
                        transition
                        hover:bg-red-50
                        hover:text-red-500
                        dark:bg-[#222]
                      "
                    >
                      <Trash2 size={16} />
                    </button>

                    {/* IMAGE */}

                    <Link
                      href={`/dashboard/product/${product.id}`}
                      className="flex h-full w-full items-center justify-center"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="
                          h-full
                          w-full
                          object-contain
                          p-7
                          transition
                          duration-500
                          group-hover:scale-105
                        "
                        onError={(e) => {
                          e.currentTarget.style.display =
                            "none";
                        }}
                      />
                    </Link>

                  </div>

                  {/* DETAILS */}

                  <div className="p-5">

                    {/* BRAND */}

                    <p className="
                      text-[11px]
                      font-bold
                      uppercase
                      tracking-[0.12em]
                      text-[#c99516]
                    ">
                      {product.brand}
                    </p>

                    {/* NAME */}

                    <Link
                      href={`/dashboard/product/${product.id}`}
                      className="
                        mt-1
                        block
                        truncate
                        text-[16px]
                        font-bold
                        text-[#111]
                        transition
                        hover:text-[#c99516]
                        dark:text-white
                      "
                    >
                      {product.name}
                    </Link>

                    {/* RATING */}

                    <div className="mt-2 flex items-center gap-2">

                      <span className="
                        inline-flex
                        items-center
                        gap-1
                        rounded-md
                        bg-green-600
                        px-2
                        py-1
                        text-[11px]
                        font-bold
                        text-white
                      ">
                        {product.rating}
                        <Star
                          size={11}
                          fill="currentColor"
                        />
                      </span>

                      <span className="text-xs text-gray-500">
                        {product.reviews} reviews
                      </span>

                    </div>

                    {/* PRICE */}

                    <div className="mt-4 flex items-center gap-2">

                      <span className="
                        text-xl
                        font-black
                        text-[#111]
                        dark:text-white
                      ">
                        ₹
                        {product.price.toLocaleString(
                          "en-IN"
                        )}
                      </span>

                      <span className="
                        text-sm
                        text-gray-400
                        line-through
                      ">
                        ₹
                        {product.originalPrice.toLocaleString(
                          "en-IN"
                        )}
                      </span>

                    </div>

                    {/* STOCK */}

                    <p className="
                      mt-2
                      text-xs
                      font-semibold
                      text-green-600
                    ">
                      {product.stock > 0
                        ? `${product.stock} items left in stock`
                        : "Out of stock"}
                    </p>

                    {/* ACTION */}

                    <button
                      type="button"
                      disabled={
                        product.stock === 0
                      }
                      onClick={() =>
                        addToCart(product.id)
                      }
                      className="
                        mt-4
                        flex
                        h-11
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-[#111]
                        text-sm
                        font-bold
                        text-white
                        transition
                        hover:bg-[#d99d08]
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                        dark:bg-white
                        dark:text-black
                        dark:hover:bg-[#d99d08]
                        dark:hover:text-white
                      "
                    >
                      {inCart ? (
                        <>
                          <Check size={17} />
                          Added to Cart
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={17} />
                          Add to Cart
                        </>
                      )}
                    </button>

                  </div>

                </div>
              );
            })}

          </div>

        ) : (

          /* ===================================================
             EMPTY WISHLIST
          =================================================== */

          <div className="
            rounded-3xl
            border
            border-[#e8e3d9]
            bg-white
            px-6
            py-20
            text-center
            shadow-sm
            dark:border-[#222]
            dark:bg-[#0d0d0d]
          ">

            <div className="
              mx-auto
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-full
              bg-[#faf0d7]
              text-[#c99516]
            ">
              <Heart
                size={42}
                strokeWidth={1.7}
              />
            </div>

            <h2 className="
              mt-6
              text-2xl
              font-black
              text-[#111]
              dark:text-white
            ">
              Your wishlist is empty
            </h2>

            <p className="
              mx-auto
              mt-2
              max-w-md
              text-sm
              leading-6
              text-gray-500
            ">
              Save products you love to your wishlist
              and easily find them whenever you're ready
              to buy.
            </p>

            <Link
              href="/dashboard"
              className="
                mt-7
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-[#d99d08]
                px-6
                py-3
                text-sm
                font-bold
                text-white
                transition
                hover:bg-[#c88f05]
              "
            >
              <ShoppingBag size={17} />
              Start Shopping
            </Link>

          </div>

        )}

        {/* =====================================================
            BOTTOM NOTE
        ===================================================== */}

        {wishlist.length > 0 && (
          <div className="
            mt-7
            flex
            items-center
            justify-center
            gap-2
            text-center
            text-xs
            text-gray-500
          ">
            <Heart
              size={14}
              className="text-[#c99516]"
              fill="currentColor"
            />
            Your saved products are waiting for you.
          </div>
        )}

      </div>

    </main>
  );
}
