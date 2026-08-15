"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ShieldCheck,
  Truck,
  ArrowRight,
  Sparkles,
  ChevronRight,
  LockKeyhole,
  RotateCcw,
  Heart,
  BadgeCheck,
  Tag,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

type CartItem = {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

const initialCart: CartItem[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    image: "/products/headphone.png",
    price: 2499,
    quantity: 1,
  },
  {
    id: 2,
    name: "Smart Watch",
    image: "/products/watch.png",
    price: 3499,
    quantity: 1,
  },
];

const FREE_DELIVERY_LIMIT = 1000;

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>(initialCart);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const increaseQty = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQty = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = useMemo(
    () =>
      cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
    [cart]
  );

  const delivery =
    subtotal === 0
      ? 0
      : subtotal > FREE_DELIVERY_LIMIT
      ? 0
      : 99;

  const total = subtotal + delivery;

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const remainingForFreeDelivery =
    Math.max(FREE_DELIVERY_LIMIT - subtotal, 0);

  const deliveryProgress = Math.min(
    (subtotal / FREE_DELIVERY_LIMIT) * 100,
    100
  );

  const applyCoupon = () => {
    if (!coupon.trim()) return;
    setCouponApplied(true);
  };

  return (
    <main className="min-h-screen bg-[#faf9f6] text-gray-900">
      {/* =====================================================
          TOP BAR
      ===================================================== */}

      <div className="hidden border-b border-gray-100 bg-white md:block">
        <div className="mx-auto flex h-9 max-w-[1440px] items-center justify-between px-6 text-[11px] text-gray-500">
          <div className="flex items-center gap-7">
            <span>📍 Deliver to Mumbai, India</span>

            <span>
              🚚 Free Shipping on orders above ₹499
            </span>
          </div>

          <div className="flex items-center gap-7">
            <span>Download App</span>
            <span>Track Order</span>
            <span>Help & Support</span>
          </div>
        </div>
      </div>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center px-4 sm:px-6">
          {/* LOGO */}

          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D4AF37] text-white shadow-sm">
              <ShoppingBag size={24} strokeWidth={2.3} />
            </div>

            <div>
              <div className="text-[24px] font-black leading-none tracking-tight">
                Prime<span className="text-[#D4AF37]">Cart</span>
              </div>

              <p className="mt-1 text-[8px] font-bold tracking-[0.2em] text-gray-400">
                SHOP • SAVE • SMILE
              </p>
            </div>
          </Link>

          {/* CENTER */}

          <div className="ml-auto flex items-center gap-5">
            <div className="hidden text-right sm:block">
              <p className="text-[10px] text-gray-400">
                Shopping Cart
              </p>

              <p className="text-sm font-bold">
                {totalItems}{" "}
                {totalItems === 1 ? "Item" : "Items"}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#eadcae] bg-[#fffaf0]">
              <ShoppingBag
                size={21}
                className="text-[#C39B25]"
              />
            </div>
          </div>
        </div>
      </header>

      {/* =====================================================
          BREADCRUMB
      ===================================================== */}

      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-[1440px] items-center gap-2 px-4 py-4 text-sm sm:px-6">
          <Link
            href="/"
            className="font-medium text-gray-400 transition hover:text-[#C39B25]"
          >
            Home
          </Link>

          <ChevronRight
            size={15}
            className="text-gray-300"
          />

          <span className="font-bold text-gray-900">
            Shopping Cart
          </span>
        </div>
      </div>

      {/* =====================================================
          PAGE CONTENT
      ===================================================== */}

      <div className="mx-auto max-w-[1440px] px-4 py-7 sm:px-6 lg:py-10">
        {/* TITLE */}

        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-1 w-8 rounded-full bg-[#D4AF37]" />

              <span className="text-xs font-black uppercase tracking-[0.18em] text-[#C39B25]">
                PrimeCart
              </span>
            </div>

            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
              Your Shopping Cart
            </h1>

            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Review your selected products before checkout.
            </p>
          </div>

          {cart.length > 0 && (
            <Link
              href="/"
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-bold transition hover:border-[#D4AF37] hover:text-[#C39B25]"
            >
              Continue Shopping
              <ArrowRight size={16} />
            </Link>
          )}
        </div>

        {/* =====================================================
            EMPTY CART
        ===================================================== */}

        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm"
          >
            <div className="flex min-h-[520px] flex-col items-center justify-center px-6 text-center">
              <div className="relative">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#fff9e8]">
                  <ShoppingBag
                    size={52}
                    strokeWidth={1.5}
                    className="text-[#D4AF37]"
                  />
                </div>

                <div className="absolute -right-2 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">
                  <Sparkles size={14} />
                </div>
              </div>

              <h2 className="mt-7 text-2xl font-black sm:text-3xl">
                Your cart is empty
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
                Looks like you haven't added anything to your
                cart yet. Explore our collection and find
                something you love.
              </p>

              <Link
                href="/"
                className="mt-7 inline-flex h-12 items-center gap-2 rounded-xl bg-[#D4AF37] px-7 text-sm font-black text-white shadow-sm transition hover:bg-black"
              >
                Start Shopping
                <ArrowRight size={18} />
              </Link>

              <div className="mt-10 flex flex-wrap justify-center gap-7 text-xs text-gray-400">
                <span className="flex items-center gap-2">
                  <ShieldCheck
                    size={16}
                    className="text-[#D4AF37]"
                  />
                  Secure Shopping
                </span>

                <span className="flex items-center gap-2">
                  <Truck
                    size={16}
                    className="text-[#D4AF37]"
                  />
                  Fast Delivery
                </span>

                <span className="flex items-center gap-2">
                  <RotateCcw
                    size={16}
                    className="text-[#D4AF37]"
                  />
                  Easy Returns
                </span>
              </div>
            </div>
          </motion.div>
        ) : (
          <>
            {/* =================================================
                FREE DELIVERY PROGRESS
            ================================================= */}

            <div className="mb-7 overflow-hidden rounded-2xl border border-[#eee3bd] bg-[#fffdf6] p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fff3c9]">
                  <Truck
                    size={20}
                    className="text-[#C39B25]"
                  />
                </div>

                <div className="flex-1">
                  {remainingForFreeDelivery > 0 ? (
                    <p className="text-sm font-semibold">
                      Add{" "}
                      <span className="font-black text-[#B28B18]">
                        ₹
                        {remainingForFreeDelivery.toLocaleString(
                          "en-IN"
                        )}
                      </span>{" "}
                      more to get{" "}
                      <span className="font-black">
                        FREE delivery
                      </span>
                    </p>
                  ) : (
                    <p className="text-sm font-bold text-green-700">
                      🎉 Congratulations! You've unlocked FREE
                      delivery.
                    </p>
                  )}

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#eee8d7]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${deliveryProgress}%`,
                      }}
                      transition={{
                        duration: 0.7,
                        ease: "easeOut",
                      }}
                      className="h-full rounded-full bg-[#D4AF37]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                MAIN GRID
            ================================================= */}

            <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_390px]">
              {/* =================================================
                  CART ITEMS
              ================================================= */}

              <section>
                {/* SECTION HEADER */}

                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-black">
                      Cart Items
                    </h2>

                    <p className="mt-1 text-xs text-gray-400">
                      {totalItems}{" "}
                      {totalItems === 1
                        ? "item"
                        : "items"}{" "}
                      in your cart
                    </p>
                  </div>

                  <span className="rounded-full bg-black px-3 py-1.5 text-[11px] font-bold text-white">
                    {cart.length} Products
                  </span>
                </div>

                <div className="space-y-4">
                  <AnimatePresence initial={false}>
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{
                          opacity: 0,
                          y: 15,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.96,
                          height: 0,
                        }}
                        transition={{
                          duration: 0.25,
                        }}
                        className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:border-[#e8dcae] hover:shadow-md"
                      >
                        <div className="p-4 sm:p-5">
                          <div className="flex gap-4 sm:gap-5">
                            {/* IMAGE */}

                            <Link
                              href={`/dashboard/product/${item.id}`}
                              className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-[#f8f8f7] sm:h-36 sm:w-36"
                            >
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                sizes="144px"
                                className="object-contain p-3 transition duration-500 group-hover:scale-105 sm:p-5"
                              />

                              <div className="absolute left-2 top-2 rounded-md bg-white px-2 py-1 text-[9px] font-black uppercase tracking-wide shadow-sm">
                                Prime
                              </div>
                            </Link>

                            {/* DETAILS */}

                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <Link
                                    href={`/dashboard/product/${item.id}`}
                                    className="line-clamp-2 text-base font-black leading-6 transition hover:text-[#C39B25] sm:text-lg"
                                  >
                                    {item.name}
                                  </Link>

                                  <p className="mt-1 text-xs text-gray-400">
                                    Premium Quality Product
                                  </p>
                                </div>

                                {/* DELETE DESKTOP */}

                                <button
                                  type="button"
                                  onClick={() =>
                                    removeItem(item.id)
                                  }
                                  aria-label={`Remove ${item.name}`}
                                  className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-500 sm:flex"
                                >
                                  <Trash2 size={17} />
                                </button>
                              </div>

                              {/* RATING */}

                              <div className="mt-3 flex items-center gap-2">
                                <div className="flex items-center gap-1 rounded-md bg-[#fff7dc] px-2 py-1">
                                  <span className="text-[10px]">
                                    ★
                                  </span>

                                  <span className="text-[10px] font-black text-[#A37D0E]">
                                    4.8
                                  </span>
                                </div>

                                <span className="text-[10px] text-gray-400">
                                  Premium Selection
                                </span>
                              </div>

                              {/* PRICE */}

                              <div className="mt-3 flex flex-wrap items-center gap-2">
                                <span className="text-xl font-black">
                                  ₹
                                  {item.price.toLocaleString(
                                    "en-IN"
                                  )}
                                </span>

                                <span className="text-xs text-gray-400 line-through">
                                  ₹
                                  {Math.round(
                                    item.price * 1.35
                                  ).toLocaleString("en-IN")}
                                </span>

                                <span className="rounded-md bg-green-50 px-2 py-1 text-[10px] font-bold text-green-600">
                                  SAVE 25%
                                </span>
                              </div>

                              {/* BOTTOM */}

                              <div className="mt-4 flex items-center justify-between gap-3">
                                {/* QUANTITY */}

                                <div className="flex h-9 items-center overflow-hidden rounded-lg border border-gray-200">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      decreaseQty(item.id)
                                    }
                                    disabled={
                                      item.quantity <= 1
                                    }
                                    className="flex h-full w-9 items-center justify-center text-gray-500 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
                                  >
                                    <Minus size={14} />
                                  </button>

                                  <span className="flex h-full min-w-9 items-center justify-center border-x border-gray-200 text-sm font-black">
                                    {item.quantity}
                                  </span>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      increaseQty(item.id)
                                    }
                                    className="flex h-full w-9 items-center justify-center text-gray-500 transition hover:bg-gray-100"
                                  >
                                    <Plus size={14} />
                                  </button>
                                </div>

                                {/* ITEM TOTAL */}

                                <div className="text-right">
                                  <p className="text-[10px] uppercase tracking-wider text-gray-400">
                                    Item Total
                                  </p>

                                  <p className="text-base font-black">
                                    ₹
                                    {(
                                      item.price *
                                      item.quantity
                                    ).toLocaleString(
                                      "en-IN"
                                    )}
                                  </p>
                                </div>
                              </div>

                              {/* MOBILE REMOVE */}

                              <button
                                type="button"
                                onClick={() =>
                                  removeItem(item.id)
                                }
                                className="mt-3 flex items-center gap-1.5 text-xs font-bold text-gray-400 transition hover:text-red-500 sm:hidden"
                              >
                                <Trash2 size={14} />
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* SHIPPING STRIP */}

                        <div className="flex items-center gap-2 border-t border-gray-100 bg-[#fcfcfa] px-4 py-3 text-[11px] text-gray-500 sm:px-5">
                          <Truck
                            size={14}
                            className="shrink-0 text-[#D4AF37]"
                          />

                          <span>
                            Eligible for{" "}
                            <b className="text-gray-700">
                              fast delivery
                            </b>{" "}
                            at checkout
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* =================================================
                    TRUST CARDS
                ================================================= */}

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-gray-100 bg-white p-4">
                    <ShieldCheck
                      size={21}
                      className="text-[#D4AF37]"
                    />

                    <p className="mt-3 text-sm font-black">
                      Secure Payment
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-gray-400">
                      Your payment information is protected.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-100 bg-white p-4">
                    <Truck
                      size={21}
                      className="text-[#D4AF37]"
                    />

                    <p className="mt-3 text-sm font-black">
                      Fast Delivery
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-gray-400">
                      Quick and reliable doorstep delivery.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-100 bg-white p-4">
                    <RotateCcw
                      size={21}
                      className="text-[#D4AF37]"
                    />

                    <p className="mt-3 text-sm font-black">
                      Easy Returns
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-gray-400">
                      Simple and hassle-free return process.
                    </p>
                  </div>
                </div>
              </section>

              {/* =================================================
                  ORDER SUMMARY
              ================================================= */}

              <aside>
                <div className="sticky top-[100px] space-y-4">
                  <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                    {/* SUMMARY HEADER */}

                    <div className="border-b border-gray-100 px-5 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff8df]">
                          <Sparkles
                            size={19}
                            className="text-[#C39B25]"
                          />
                        </div>

                        <div>
                          <h2 className="text-lg font-black">
                            Order Summary
                          </h2>

                          <p className="text-[11px] text-gray-400">
                            {totalItems} items selected
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* SUMMARY BODY */}

                    <div className="p-5">
                      <div className="space-y-4 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">
                            Subtotal
                          </span>

                          <span className="font-bold">
                            ₹
                            {subtotal.toLocaleString(
                              "en-IN"
                            )}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">
                            Delivery
                          </span>

                          {delivery === 0 ? (
                            <span className="font-black text-green-600">
                              FREE
                            </span>
                          ) : (
                            <span className="font-bold">
                              ₹{delivery}
                            </span>
                          )}
                        </div>

                        {couponApplied && (
                          <div className="flex items-center justify-between text-green-600">
                            <span className="flex items-center gap-2">
                              <Tag size={14} />
                              Coupon Discount
                            </span>

                            <span className="font-black">
                              Applied
                            </span>
                          </div>
                        )}
                      </div>

                      {/* COUPON */}

                      <div className="mt-5 border-t border-gray-100 pt-5">
                        <p className="mb-2 text-xs font-black uppercase tracking-wider text-gray-500">
                          Have a coupon?
                        </p>

                        <div className="flex h-11 overflow-hidden rounded-xl border border-gray-200">
                          <input
                            value={coupon}
                            onChange={(e) =>
                              setCoupon(e.target.value)
                            }
                            placeholder="Enter coupon code"
                            className="min-w-0 flex-1 bg-transparent px-3 text-xs outline-none placeholder:text-gray-400"
                          />

                          <button
                            type="button"
                            onClick={applyCoupon}
                            disabled={!coupon.trim()}
                            className="px-4 text-xs font-black text-[#B28B18] transition hover:bg-[#fff9e8] disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            {couponApplied
                              ? "Applied"
                              : "Apply"}
                          </button>
                        </div>
                      </div>

                      {/* TOTAL */}

                      <div className="mt-5 rounded-2xl bg-[#faf9f5] p-4">
                        <div className="flex items-end justify-between">
                          <div>
                            <p className="text-xs text-gray-400">
                              Total Amount
                            </p>

                            <p className="mt-1 text-2xl font-black">
                              ₹
                              {total.toLocaleString(
                                "en-IN"
                              )}
                            </p>
                          </div>

                          <BadgeCheck
                            size={22}
                            className="mb-1 text-[#D4AF37]"
                          />
                        </div>

                        <p className="mt-2 text-[10px] text-gray-400">
                          Inclusive of all applicable taxes
                        </p>
                      </div>

                      {/* CHECKOUT */}

                      <Link
                        href="/checkout"
                        className="mt-5 flex h-13 min-h-[52px] items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-5 text-sm font-black text-white shadow-sm transition hover:bg-black"
                      >
                        Proceed to Checkout
                        <ArrowRight size={18} />
                      </Link>

                      {/* SECURE */}

                      <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-semibold text-gray-400">
                        <LockKeyhole size={13} />

                        Secure checkout powered by PrimeCart
                      </div>
                    </div>
                  </div>

                  {/* PAYMENT METHODS */}

                  <div className="rounded-2xl border border-gray-100 bg-white p-5">
                    <p className="text-xs font-black uppercase tracking-wider text-gray-500">
                      We Accept
                    </p>

                    <div className="mt-4 grid grid-cols-4 gap-2">
                      <div className="flex h-10 items-center justify-center rounded-lg border border-gray-100 bg-gray-50 text-[10px] font-black">
                        UPI
                      </div>

                      <div className="flex h-10 items-center justify-center rounded-lg border border-gray-100 bg-gray-50 text-[10px] font-black">
                        VISA
                      </div>

                      <div className="flex h-10 items-center justify-center rounded-lg border border-gray-100 bg-gray-50 text-[10px] font-black">
                        CARD
                      </div>

                      <div className="flex h-10 items-center justify-center rounded-lg border border-gray-100 bg-gray-50 text-[10px] font-black">
                        COD
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </>
        )}
      </div>

      {/* =====================================================
          FOOTER STRIP
      ===================================================== */}

      <section className="border-t border-gray-100 bg-white">
        <div className="mx-auto grid max-w-[1440px] gap-6 px-4 py-8 sm:px-6 md:grid-cols-3">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff8df]">
              <ShieldCheck
                size={21}
                className="text-[#D4AF37]"
              />
            </div>

            <div>
              <p className="text-sm font-black">
                100% Secure
              </p>

              <p className="text-xs text-gray-400">
                Safe & secure payments
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff8df]">
              <Truck
                size={21}
                className="text-[#D4AF37]"
              />
            </div>

            <div>
              <p className="text-sm font-black">
                Fast Delivery
              </p>

              <p className="text-xs text-gray-400">
                Reliable doorstep delivery
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff8df]">
              <RotateCcw
                size={21}
                className="text-[#D4AF37]"
              />
            </div>

            <div>
              <p className="text-sm font-black">
                Easy Returns
              </p>

              <p className="text-xs text-gray-400">
                Hassle-free return experience
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
