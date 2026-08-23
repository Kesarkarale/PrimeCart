"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Heart,
  ShoppingCart,
  Trash2,
  ArrowLeft,
  Star,
  X,
  ShoppingBag,
  Check,
  Minus,
  Plus,
} from "lucide-react";

type WishlistProduct = {
  id: number;
  name: string;
  brand: string;
  image: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  discount: number;
  category: string;
  inStock: boolean;
};

const initialWishlist: WishlistProduct[] = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    brand: "PrimeAudio",
    image: "/products/headphone.png",
    price: 2499,
    originalPrice: 3999,
    rating: 4.8,
    reviews: 245,
    discount: 38,
    category: "Electronics",
    inStock: true,
  },
  {
    id: 2,
    name: "Premium Smart Watch",
    brand: "PrimeTech",
    image: "/products/smartwatch.png",
    price: 3299,
    originalPrice: 4999,
    rating: 4.6,
    reviews: 182,
    discount: 34,
    category: "Electronics",
    inStock: true,
  },
  {
    id: 3,
    name: "Classic Casual Sneakers",
    brand: "UrbanStep",
    image: "/products/shoes.png",
    price: 1899,
    originalPrice: 2999,
    rating: 4.5,
    reviews: 126,
    discount: 37,
    category: "Fashion",
    inStock: true,
  },
  {
    id: 4,
    name: "Portable Mini Bluetooth Speaker",
    brand: "SoundMax",
    image: "/products/speaker.png",
    price: 1499,
    originalPrice: 2499,
    rating: 4.7,
    reviews: 98,
    discount: 40,
    category: "Electronics",
    inStock: true,
  },
];

export default function WishlistPage() {
  const [wishlist, setWishlist] =
    useState<WishlistProduct[]>(initialWishlist);

  const [cartItems, setCartItems] = useState<number[]>([]);

  const removeItem = (id: number) => {
    setWishlist((items) =>
      items.filter((item) => item.id !== id)
    );
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const addToCart = (id: number) => {
    setCartItems((items) =>
      items.includes(id) ? items : [...items, id]
    );
  };

  const addAllToCart = () => {
    const availableIds = wishlist
      .filter((item) => item.inStock)
      .map((item) => item.id);

    setCartItems(availableIds);
  };

  const totalValue = wishlist.reduce(
    (total, item) => total + item.price,
    0
  );

  const totalOriginalValue = wishlist.reduce(
    (total, item) => total + item.originalPrice,
    0
  );

  const totalSavings =
    totalOriginalValue - totalValue;

  return (
    <main className="min-h-screen bg-[#faf8f3] text-[#171717]">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <section className="border-b border-[#e9e5dc] bg-white">

        <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <Link
                href="/dashboard"
                className="
                  mb-4
                  inline-flex
                  items-center
                  gap-2
                  text-sm
                  font-medium
                  text-[#777]
                  transition
                  hover:text-[#c99516]
                "
              >
                <ArrowLeft size={16} />
                Back to Shopping
              </Link>

              <div className="flex items-center gap-3">

                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    bg-[#f8f1df]
                    text-[#c99516]
                  "
                >
                  <Heart
                    size={24}
                    strokeWidth={1.8}
                    fill="currentColor"
                  />
                </div>

                <div>

                  <h1
                    className="
                      text-2xl
                      font-bold
                      tracking-tight
                      sm:text-3xl
                    "
                  >
                    My Wishlist
                  </h1>

                  <p className="mt-1 text-sm text-[#777]">
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
              <div className="flex items-center gap-3">

                <button
                  onClick={addAllToCart}
                  className="
                    inline-flex
                    h-11
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[#d99d08]
                    px-5
                    text-sm
                    font-bold
                    text-white
                    shadow-[0_6px_18px_rgba(217,157,8,0.18)]
                    transition
                    hover:bg-[#c88f05]
                  "
                >
                  <ShoppingCart size={17} />
                  Add All to Cart
                </button>

                <button
                  onClick={clearWishlist}
                  className="
                    inline-flex
                    h-11
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-[#dedede]
                    bg-white
                    px-4
                    text-sm
                    font-semibold
                    text-[#555]
                    transition
                    hover:border-red-200
                    hover:bg-red-50
                    hover:text-red-600
                  "
                >
                  <Trash2 size={16} />
                  <span className="hidden sm:inline">
                    Clear All
                  </span>
                </button>

              </div>
            )}

          </div>

        </div>

      </section>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="mx-auto max-w-[1400px] px-4 py-7 sm:px-6 lg:px-8">

        {wishlist.length === 0 ? (
          <EmptyWishlist />
        ) : (
          <div className="grid gap-7 lg:grid-cols-[1fr_330px]">

            {/* =================================================
                PRODUCT GRID
            ================================================= */}

            <section>

              <div className="mb-5 flex items-center justify-between">

                <div>
                  <h2 className="text-lg font-bold">
                    Saved Items
                  </h2>

                  <p className="mt-1 text-xs text-[#888]">
                    Your favorite products are waiting for you
                  </p>
                </div>

                <span
                  className="
                    rounded-full
                    bg-white
                    px-3
                    py-1.5
                    text-xs
                    font-semibold
                    text-[#666]
                    shadow-sm
                    ring-1
                    ring-[#e8e4db]
                  "
                >
                  {wishlist.length} Items
                </span>

              </div>

              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

                {wishlist.map((product) => (
                  <WishlistCard
                    key={product.id}
                    product={product}
                    inCart={cartItems.includes(product.id)}
                    onRemove={() =>
                      removeItem(product.id)
                    }
                    onAddToCart={() =>
                      addToCart(product.id)
                    }
                  />
                ))}

              </div>

            </section>

            {/* =================================================
                SUMMARY
            ================================================= */}

            <aside>

              <div
                className="
                  sticky
                  top-24
                  rounded-2xl
                  border
                  border-[#e7e2d8]
                  bg-white
                  p-5
                  shadow-[0_5px_25px_rgba(0,0,0,0.04)]
                "
              >

                <div className="mb-5 flex items-center gap-3">

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#faf3df]
                      text-[#c99516]
                    "
                  >
                    <ShoppingBag size={20} />
                  </div>

                  <div>
                    <h3 className="font-bold">
                      Wishlist Summary
                    </h3>

                    <p className="text-xs text-[#888]">
                      Your saved products
                    </p>
                  </div>

                </div>

                <div className="space-y-4">

                  <SummaryRow
                    label="Items"
                    value={`${wishlist.length}`}
                  />

                  <SummaryRow
                    label="Total Value"
                    value={`₹${totalValue.toLocaleString("en-IN")}`}
                  />

                  <SummaryRow
                    label="Original Price"
                    value={`₹${totalOriginalValue.toLocaleString(
                      "en-IN"
                    )}`}
                    muted
                  />

                  <div className="border-t border-dashed border-[#dedede]" />

                  <div className="flex items-center justify-between">

                    <span className="text-sm font-bold">
                      You Save
                    </span>

                    <span className="text-sm font-bold text-green-600">
                      ₹{totalSavings.toLocaleString("en-IN")}
                    </span>

                  </div>

                </div>

                <button
                  onClick={addAllToCart}
                  className="
                    mt-6
                    flex
                    h-12
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[#d99d08]
                    text-sm
                    font-bold
                    text-white
                    shadow-[0_7px_18px_rgba(217,157,8,0.18)]
                    transition
                    hover:bg-[#c88f05]
                  "
                >
                  <ShoppingCart size={18} />
                  Add All to Cart
                </button>

                <Link
                  href="/dashboard"
                  className="
                    mt-3
                    flex
                    h-11
                    w-full
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-[#dedede]
                    bg-white
                    text-sm
                    font-semibold
                    text-[#444]
                    transition
                    hover:bg-[#fafafa]
                  "
                >
                  Continue Shopping
                </Link>

                {/* SECURITY NOTE */}

                <div
                  className="
                    mt-5
                    rounded-xl
                    bg-[#faf8f3]
                    p-3.5
                  "
                >
                  <p className="text-xs font-semibold text-[#444]">
                    Your wishlist is private
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-[#888]">
                    Products you save here will stay in
                    your account until you remove them.
                  </p>
                </div>

              </div>

            </aside>

          </div>
        )}

      </div>

    </main>
  );
}

/* =============================================================
   WISHLIST CARD
============================================================= */

function WishlistCard({
  product,
  inCart,
  onRemove,
  onAddToCart,
}: {
  product: WishlistProduct;
  inCart: boolean;
  onRemove: () => void;
  onAddToCart: () => void;
}) {
  return (
    <article
      className="
        group
        overflow-hidden
        rounded-2xl
        border
        border-[#e7e3da]
        bg-white
        shadow-[0_4px_20px_rgba(0,0,0,0.035)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)]
      "
    >

      {/* IMAGE */}

      <div className="relative h-[245px] overflow-hidden bg-[#f8f7f4]">

        <Link
          href={`/dashboard/products/${product.id}`}
          className="absolute inset-0 z-0"
        />

        <img
          src={product.image}
          alt={product.name}
          className="
            h-full
            w-full
            object-contain
            p-6
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />

        {/* DISCOUNT */}

        <span
          className="
            absolute
            left-3
            top-3
            rounded-lg
            bg-[#d99d08]
            px-2.5
            py-1.5
            text-[11px]
            font-bold
            text-white
          "
        >
          {product.discount}% OFF
        </span>

        {/* REMOVE */}

        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${product.name}`}
          className="
            absolute
            right-3
            top-3
            z-10
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-white
            text-[#777]
            shadow-md
            transition
            hover:bg-red-50
            hover:text-red-600
          "
        >
          <X size={17} />
        </button>

      </div>

      {/* DETAILS */}

      <div className="p-4">

        <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[#a17a18]">
          {product.brand}
        </p>

        <Link
          href={`/dashboard/products/${product.id}`}
          className="
            block
            min-h-[44px]
            text-sm
            font-bold
            leading-5
            text-[#222]
            transition
            hover:text-[#c99516]
          "
        >
          {product.name}
        </Link>

        {/* RATING */}

        <div className="mt-3 flex items-center gap-2">

          <span
            className="
              inline-flex
              items-center
              gap-1
              rounded-md
              bg-[#f5f1e6]
              px-2
              py-1
              text-[11px]
              font-bold
              text-[#765a13]
            "
          >
            {product.rating}
            <Star
              size={11}
              fill="currentColor"
            />
          </span>

          <span className="text-[11px] text-[#888]">
            {product.reviews} reviews
          </span>

        </div>

        {/* PRICE */}

        <div className="mt-3 flex items-end gap-2">

          <span className="text-xl font-extrabold text-[#181818]">
            ₹{product.price.toLocaleString("en-IN")}
          </span>

          <span className="pb-0.5 text-xs text-[#999] line-through">
            ₹{product.originalPrice.toLocaleString(
              "en-IN"
            )}
          </span>

        </div>

        {/* STOCK */}

        <div className="mt-2">

          {product.inStock ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-green-600">
              <Check size={13} />
              In Stock
            </span>
          ) : (
            <span className="text-[11px] font-semibold text-red-500">
              Out of Stock
            </span>
          )}

        </div>

        {/* BUTTON */}

        <button
          type="button"
          onClick={onAddToCart}
          disabled={!product.inStock || inCart}
          className={`
            mt-4
            flex
            h-11
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            text-sm
            font-bold
            transition-all

            ${
              inCart
                ? "bg-green-50 text-green-700 border border-green-200"
                : product.inStock
                ? "bg-[#d99d08] text-white hover:bg-[#c88f05]"
                : "cursor-not-allowed bg-[#f1f1f1] text-[#999]"
            }
          `}
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

    </article>
  );
}

/* =============================================================
   SUMMARY ROW
============================================================= */

function SummaryRow({
  label,
  value,
  muted = false,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">

      <span
        className={`text-sm ${
          muted
            ? "text-[#999]"
            : "text-[#666]"
        }`}
      >
        {label}
      </span>

      <span
        className={`text-sm font-semibold ${
          muted
            ? "text-[#999]"
            : "text-[#222]"
        }`}
      >
        {value}
      </span>

    </div>
  );
}

/* =============================================================
   EMPTY WISHLIST
============================================================= */

function EmptyWishlist() {
  return (
    <div
      className="
        flex
        min-h-[600px]
        flex-col
        items-center
        justify-center
        rounded-3xl
        border
        border-[#e7e2d8]
        bg-white
        px-6
        text-center
        shadow-[0_5px_25px_rgba(0,0,0,0.035)]
      "
    >

      <div
        className="
          flex
          h-24
          w-24
          items-center
          justify-center
          rounded-full
          bg-[#faf3df]
          text-[#c99516]
        "
      >
        <Heart
          size={43}
          strokeWidth={1.4}
        />
      </div>

      <h2 className="mt-7 text-2xl font-bold">
        Your Wishlist is Empty
      </h2>

      <p className="mt-2 max-w-[430px] text-sm leading-6 text-[#888]">
        You haven't saved any products yet. Explore
        our collection and add your favorite products
        to your wishlist.
      </p>

      <Link
        href="/dashboard"
        className="
          mt-7
          inline-flex
          h-12
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-[#d99d08]
          px-7
          text-sm
          font-bold
          text-white
          shadow-[0_7px_18px_rgba(217,157,8,0.18)]
          transition
          hover:bg-[#c88f05]
        "
      >
        <ShoppingBag size={18} />
        Start Shopping
      </Link>

    </div>
  );
}
