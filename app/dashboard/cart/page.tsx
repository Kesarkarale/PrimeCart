"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";

import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ShieldCheck,
  Truck,
  ArrowRight,
  Sparkles,
  LockKeyhole,
  RotateCcw,
  BadgeCheck,
  Tag,
  ChevronRight,
  Check,
  Heart,
  Search,
  UserRound,
  Headphones,
  Menu,
  X,
  PackageCheck,
  CreditCard,
  Gift,
  MapPin,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

type CartItem = {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  brand?: string;
  rating?: number;
  reviews?: number;
  oldPrice?: number;
};

const initialCart: CartItem[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    image: "/products/headphone.png",
    price: 2499,
    quantity: 1,
    brand: "PrimeAudio",
    rating: 4.8,
    reviews: 245,
    oldPrice: 3999,
  },
  {
    id: 2,
    name: "Smart Watch",
    image: "/products/watch.png",
    price: 3499,
    quantity: 1,
    brand: "PrimeTech",
    rating: 4.7,
    reviews: 182,
    oldPrice: 4999,
  },
];

const FREE_DELIVERY_LIMIT = 499;
const DELIVERY_CHARGE = 99;

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>(initialCart);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /* =========================================================
     CART ACTIONS
  ========================================================= */

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

  /* =========================================================
     CALCULATIONS
  ========================================================= */

  const subtotal = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }, [cart]);

  const totalItems = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const delivery =
    subtotal >= FREE_DELIVERY_LIMIT
      ? 0
      : cart.length > 0
      ? DELIVERY_CHARGE
      : 0;

  const total = subtotal + delivery;

  const amountRemaining = Math.max(
    FREE_DELIVERY_LIMIT - subtotal,
    0
  );

  const deliveryProgress =
    subtotal >= FREE_DELIVERY_LIMIT
      ? 100
      : Math.min(
          (subtotal / FREE_DELIVERY_LIMIT) * 100,
          100
        );

  /* =========================================================
     COUPON
  ========================================================= */

  const applyCoupon = () => {
    if (!coupon.trim()) return;

    setCouponApplied(true);
  };

  /* =========================================================
     EMPTY CART
  ========================================================= */

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[#fafaf8] text-[#171717]">
        <PrimeCartHeader
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          totalItems={0}
        />

        <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">
          <Breadcrumb />

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 overflow-hidden rounded-[24px] border border-[#e9e9e5] bg-white"
          >
            <div className="flex min-h-[560px] flex-col items-center justify-center px-6 py-16 text-center">
              <div className="relative">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#fff8df]">
                  <ShoppingBag
                    size={48}
                    strokeWidth={1.5}
                    className="text-[#c6971b]"
                  />
                </div>

                <div className="absolute -right-1 -top-1 flex h-9 w-9 items-center justify-center rounded-full bg-black text-white shadow-lg">
                  <Sparkles size={14} />
                </div>
              </div>

              <p className="mt-8 text-[11px] font-black uppercase tracking-[0.22em] text-[#b28b18]">
                PrimeCart
              </p>

              <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                Your cart is empty
              </h1>

              <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
                Looks like you haven't added anything to your
                cart yet. Explore our collection and find
                something you'll love.
              </p>

              <Link
                href="/"
                className="mt-8 inline-flex h-13 items-center justify-center gap-3 rounded-xl bg-[#111111] px-8 text-sm font-black text-white transition hover:bg-[#d4a51c]"
              >
                Start Shopping
                <ArrowRight size={17} />
              </Link>

              <div className="mt-12 grid gap-3 sm:grid-cols-3">
                <MiniTrust
                  icon={<ShieldCheck size={17} />}
                  title="Secure Shopping"
                />
                <MiniTrust
                  icon={<Truck size={17} />}
                  title="Fast Delivery"
                />
                <MiniTrust
                  icon={<RotateCcw size={17} />}
                  title="Easy Returns"
                />
              </div>
            </div>
          </motion.section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fafaf8] text-[#171717]">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <PrimeCartHeader
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        totalItems={totalItems}
      />

      {/* =====================================================
          PAGE
      ===================================================== */}

      <div className="mx-auto max-w-[1400px] px-4 pb-14 pt-6 sm:px-6 lg:px-8 lg:pt-7">
        <Breadcrumb />

        {/* ===================================================
            TITLE
        =================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 flex flex-col gap-5 border-b border-[#e7e7e2] pb-7 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="h-[3px] w-8 rounded-full bg-[#d4a51c]" />

              <span className="text-[10px] font-black uppercase tracking-[0.22em] text-[#b28b18]">
                Shopping Bag
              </span>
            </div>

            <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] sm:text-4xl lg:text-[42px]">
              Your Cart
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Review your selected products before checkout.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-gray-400">
                Cart Items
              </p>

              <p className="mt-1 text-sm font-black">
                {totalItems}{" "}
                {totalItems === 1 ? "Item" : "Items"}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white">
              <ShoppingBag size={18} />
            </div>
          </div>
        </motion.div>

        {/* ===================================================
            FREE DELIVERY
        =================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="mt-6 overflow-hidden rounded-[18px] border border-[#eadcae] bg-[#fffdf5]"
        >
          <div className="flex gap-4 p-4 sm:p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fff1bd]">
              {amountRemaining > 0 ? (
                <Truck
                  size={18}
                  className="text-[#b28b18]"
                />
              ) : (
                <Check
                  size={18}
                  className="text-green-600"
                />
              )}
            </div>

            <div className="min-w-0 flex-1">
              {amountRemaining > 0 ? (
                <p className="text-xs font-semibold text-gray-700 sm:text-sm">
                  Add{" "}
                  <span className="font-black text-[#a17c0d]">
                    ₹
                    {amountRemaining.toLocaleString(
                      "en-IN"
                    )}
                  </span>{" "}
                  more to unlock{" "}
                  <span className="font-black">
                    FREE delivery
                  </span>
                </p>
              ) : (
                <p className="flex items-center gap-2 text-xs font-black text-green-700 sm:text-sm">
                  <Check size={16} />
                  Free delivery unlocked on your order
                </p>
              )}

              <div className="mt-3 h-[6px] overflow-hidden rounded-full bg-[#eee8d5]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${deliveryProgress}%`,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                  className="h-full rounded-full bg-[#d4a51c]"
                />
              </div>
            </div>

            <div className="hidden shrink-0 text-right sm:block">
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-gray-400">
                Free delivery
              </p>

              <p className="mt-1 text-sm font-black">
                ₹499+
              </p>
            </div>
          </div>
        </motion.div>

        {/* ===================================================
            MAIN CONTENT
        =================================================== */}

        <div className="mt-7 grid items-start gap-7 xl:grid-cols-[minmax(0,1fr)_400px]">
          {/* =================================================
              LEFT
          ================================================= */}

          <section className="min-w-0">
            <div className="mb-4 flex items-end justify-between">
              <div>
                <h2 className="text-lg font-black tracking-tight">
                  Cart Items
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  {totalItems}{" "}
                  {totalItems === 1
                    ? "product"
                    : "products"}{" "}
                  selected
                </p>
              </div>

              <span className="rounded-full border border-[#e6e6e1] bg-white px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.12em] text-gray-500">
                {cart.length}{" "}
                {cart.length === 1
                  ? "Product"
                  : "Products"}
              </span>
            </div>

            {/* =================================================
                PRODUCTS
            ================================================= */}

            <div className="space-y-4">
              <AnimatePresence initial={false}>
                {cart.map((item) => {
                  const discount = item.oldPrice
                    ? Math.round(
                        ((item.oldPrice - item.price) /
                          item.oldPrice) *
                          100
                      )
                    : 25;

                  return (
                    <motion.article
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
                        scale: 0.97,
                        height: 0,
                        marginBottom: 0,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                      className="overflow-hidden rounded-[20px] border border-[#e4e4df] bg-white transition hover:border-[#dbc887] hover:shadow-[0_14px_40px_rgba(0,0,0,0.055)]"
                    >
                      <div className="p-4 sm:p-5 lg:p-6">
                        <div className="flex gap-4 sm:gap-6">
                          {/* IMAGE */}

                          <Link
                            href={`/dashboard/product/${item.id}`}
                            className="group relative h-[120px] w-[120px] shrink-0 overflow-hidden rounded-[14px] border border-[#eeeeea] bg-[#f7f7f4] sm:h-[160px] sm:w-[160px]"
                          >
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="160px"
                              className="object-contain p-4 transition duration-500 group-hover:scale-105 sm:p-5"
                            />

                            <span className="absolute left-2 top-2 rounded-md bg-black px-2 py-1 text-[8px] font-black uppercase tracking-[0.1em] text-white">
                              Prime
                            </span>
                          </Link>

                          {/* DETAILS */}

                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <Link
                                  href={`/dashboard/product/${item.id}`}
                                  className="block line-clamp-2 text-[15px] font-black leading-6 tracking-[-0.015em] transition hover:text-[#b28b18] sm:text-lg"
                                >
                                  {item.name}
                                </Link>

                                <p className="mt-1 text-[11px] text-gray-400">
                                  {item.brand ||
                                    "PrimeCart Exclusive"}
                                </p>
                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  removeItem(item.id)
                                }
                                className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-500 sm:flex"
                                aria-label={`Remove ${item.name}`}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>

                            {/* RATING */}

                            <div className="mt-2.5 flex flex-wrap items-center gap-2">
                              <span className="inline-flex items-center gap-1 rounded-md bg-[#fff6d7] px-2 py-1 text-[10px] font-black text-[#9d780c]">
                                ★{" "}
                                {item.rating || 4.8}
                              </span>

                              <span className="text-[10px] text-gray-400">
                                {item.reviews || 100}{" "}
                                reviews
                              </span>

                              <span className="hidden h-1 w-1 rounded-full bg-gray-300 sm:block" />

                              <span className="flex items-center gap-1 text-[10px] font-semibold text-green-600">
                                <Check size={11} />
                                In stock
                              </span>
                            </div>

                            {/* PRICE */}

                            <div className="mt-3 flex flex-wrap items-center gap-2">
                              <span className="text-xl font-black tracking-tight sm:text-2xl">
                                ₹
                                {item.price.toLocaleString(
                                  "en-IN"
                                )}
                              </span>

                              {item.oldPrice && (
                                <span className="text-xs text-gray-400 line-through sm:text-sm">
                                  ₹
                                  {item.oldPrice.toLocaleString(
                                    "en-IN"
                                  )}
                                </span>
                              )}

                              <span className="rounded-md bg-[#edf8ef] px-2 py-1 text-[9px] font-black text-green-600">
                                {discount}% OFF
                              </span>
                            </div>

                            {/* OFFER */}

                            <div className="mt-3 hidden items-center gap-2 text-[10px] text-gray-500 sm:flex">
                              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#fff8df]">
                                <Tag
                                  size={12}
                                  className="text-[#b28b18]"
                                />
                              </div>

                              <span>
                                Special offer available on
                                this product
                              </span>
                            </div>

                            {/* ACTIONS */}

                            <div className="mt-4 flex items-end justify-between gap-3">
                              <div>
                                <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-gray-400">
                                  Quantity
                                </p>

                                <div className="flex h-9 items-center overflow-hidden rounded-lg border border-[#deded9]">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      decreaseQty(
                                        item.id
                                      )
                                    }
                                    disabled={
                                      item.quantity <=
                                      1
                                    }
                                    className="flex h-full w-9 items-center justify-center text-gray-500 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
                                    aria-label="Decrease quantity"
                                  >
                                    <Minus size={13} />
                                  </button>

                                  <span className="flex h-full min-w-10 items-center justify-center border-x border-[#deded9] px-2 text-xs font-black">
                                    {item.quantity}
                                  </span>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      increaseQty(
                                        item.id
                                      )
                                    }
                                    className="flex h-full w-9 items-center justify-center text-gray-500 transition hover:bg-gray-100"
                                    aria-label="Increase quantity"
                                  >
                                    <Plus size={13} />
                                  </button>
                                </div>
                              </div>

                              <div className="text-right">
                                <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-gray-400">
                                  Item Total
                                </p>

                                <p className="mt-1 text-base font-black sm:text-lg">
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

                            {/* MOBILE ACTION */}

                            <div className="mt-3 flex items-center gap-4 sm:hidden">
                              <button
                                type="button"
                                onClick={() =>
                                  removeItem(item.id)
                                }
                                className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 transition hover:text-red-500"
                              >
                                <Trash2 size={13} />
                                Remove
                              </button>

                              <button
                                type="button"
                                className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 transition hover:text-black"
                              >
                                <Heart size={13} />
                                Wishlist
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* PRODUCT FOOTER */}

                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[#eeeeea] bg-[#fcfcfa] px-4 py-3 text-[9px] font-medium text-gray-500 sm:px-6">
                        <span className="flex items-center gap-1.5">
                          <Truck
                            size={13}
                            className="text-[#d4a51c]"
                          />
                          Fast delivery available
                        </span>

                        <span className="flex items-center gap-1.5">
                          <ShieldCheck
                            size={13}
                            className="text-[#d4a51c]"
                          />
                          Secure purchase
                        </span>

                        <span className="flex items-center gap-1.5">
                          <RotateCcw
                            size={13}
                            className="text-[#d4a51c]"
                          />
                          Easy returns
                        </span>
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* =================================================
                TRUST CARDS
            ================================================= */}

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <TrustCard
                icon={<ShieldCheck size={19} />}
                title="Secure Payment"
                description="Protected checkout with encrypted payment."
              />

              <TrustCard
                icon={<Truck size={19} />}
                title="Fast Delivery"
                description="Reliable doorstep delivery across India."
              />

              <TrustCard
                icon={<RotateCcw size={19} />}
                title="Easy Returns"
                description="Simple and hassle-free return experience."
              />
            </div>

            {/* =================================================
                CONTINUE SHOPPING
            ================================================= */}

            <Link
              href="/"
              className="group mt-6 inline-flex items-center gap-2 text-xs font-black text-gray-500 transition hover:text-black"
            >
              <ArrowRight
                size={15}
                className="rotate-180 transition-transform group-hover:-translate-x-1"
              />
              Continue Shopping
            </Link>
          </section>

          {/* =================================================
              RIGHT — SUMMARY
          ================================================= */}

          <aside>
            <div className="sticky top-5 space-y-4">
              {/* =================================================
                  ORDER SUMMARY
              ================================================= */}

              <div className="overflow-hidden rounded-[20px] border border-[#deded9] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.035)]">
                {/* HEADER */}

                <div className="border-b border-[#eeeeea] px-5 py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff8df]">
                      <ShoppingBag
                        size={18}
                        className="text-[#b28b18]"
                      />
                    </div>

                    <div>
                      <h2 className="text-lg font-black tracking-tight">
                        Order Summary
                      </h2>

                      <p className="mt-0.5 text-[10px] text-gray-400">
                        {totalItems}{" "}
                        {totalItems === 1
                          ? "item"
                          : "items"}{" "}
                        in your order
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  {/* PRICE */}

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
                        <span className="flex items-center gap-1.5">
                          <Tag size={13} />
                          Coupon discount
                        </span>

                        <span className="font-black">
                          Applied
                        </span>
                      </div>
                    )}
                  </div>

                  {/* COUPON */}

                  <div className="mt-5 border-t border-[#eeeeea] pt-5">
                    <label
                      htmlFor="coupon"
                      className="mb-2 block text-[9px] font-black uppercase tracking-[0.16em] text-gray-500"
                    >
                      Have a coupon?
                    </label>

                    <div className="flex h-11 overflow-hidden rounded-xl border border-[#deded9] bg-white transition focus-within:border-[#d4a51c]">
                      <div className="flex w-10 shrink-0 items-center justify-center text-gray-400">
                        <Tag size={14} />
                      </div>

                      <input
                        id="coupon"
                        value={coupon}
                        onChange={(e) => {
                          setCoupon(e.target.value);
                          setCouponApplied(false);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            applyCoupon();
                          }
                        }}
                        placeholder="Enter promo code"
                        className="min-w-0 flex-1 bg-transparent pr-2 text-xs font-medium outline-none placeholder:text-gray-400"
                      />

                      <button
                        type="button"
                        onClick={applyCoupon}
                        disabled={!coupon.trim()}
                        className="px-4 text-[10px] font-black text-[#a27d12] transition hover:bg-[#fff9e7] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {couponApplied
                          ? "Applied"
                          : "Apply"}
                      </button>
                    </div>
                  </div>

                  {/* TOTAL */}

                  <div className="mt-5 rounded-xl bg-[#f7f7f4] p-4">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-gray-400">
                          Total Amount
                        </p>

                        <p className="mt-1 text-[27px] font-black tracking-[-0.04em]">
                          ₹
                          {total.toLocaleString(
                            "en-IN"
                          )}
                        </p>
                      </div>

                      <BadgeCheck
                        size={23}
                        className="mb-1 text-[#d4a51c]"
                      />
                    </div>

                    <p className="mt-2 text-[9px] leading-4 text-gray-400">
                      Inclusive of applicable taxes and
                      delivery charges.
                    </p>
                  </div>

                  {/* CHECKOUT */}

                  <Link
                    href="/checkout"
                    className="group mt-5 flex min-h-[54px] items-center justify-center gap-2 rounded-xl bg-[#111111] px-5 text-sm font-black text-white transition hover:bg-[#d4a51c]"
                  >
                    Proceed to Checkout

                    <ArrowRight
                      size={17}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>

                  <div className="mt-4 flex items-center justify-center gap-2 text-[9px] font-semibold text-gray-400">
                    <LockKeyhole size={12} />
                    Secure & encrypted checkout
                  </div>
                </div>
              </div>

              {/* =================================================
                  PAYMENT METHODS
              ================================================= */}

              <div className="rounded-[20px] border border-[#deded9] bg-white p-5">
                <div className="flex items-center justify-between">
                  <p className="text-[9px] font-black uppercase tracking-[0.16em] text-gray-500">
                    Payment methods
                  </p>

                  <ShieldCheck
                    size={15}
                    className="text-[#d4a51c]"
                  />
                </div>

                <div className="mt-4 grid grid-cols-4 gap-2">
                  <PaymentBadge
                    icon={<span>UPI</span>}
                    label="UPI"
                  />

                  <PaymentBadge
                    icon={<CreditCard size={14} />}
                    label="Cards"
                  />

                  <PaymentBadge
                    icon={<span>₹</span>}
                    label="COD"
                  />

                  <PaymentBadge
                    icon={<LockKeyhole size={13} />}
                    label="Secure"
                  />
                </div>
              </div>

              {/* =================================================
                  PRIME CART PROMISE
              ================================================= */}

              <div className="rounded-[20px] border border-[#eadcae] bg-[#fffdf5] p-5">
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fff1bd]">
                    <BadgeCheck
                      size={19}
                      className="text-[#b28b18]"
                    />
                  </div>

                  <div>
                    <p className="text-xs font-black">
                      PrimeCart Promise
                    </p>

                    <p className="mt-1 text-[10px] leading-5 text-gray-500">
                      Quality products, secure payments
                      and reliable delivery — every time.
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <PromiseItem
                    icon={<PackageCheck size={13} />}
                    text="Quality Assured"
                  />

                  <PromiseItem
                    icon={<ShieldCheck size={13} />}
                    text="Secure Payment"
                  />

                  <PromiseItem
                    icon={<Truck size={13} />}
                    text="Fast Delivery"
                  />

                  <PromiseItem
                    icon={<RotateCcw size={13} />}
                    text="Easy Returns"
                  />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

/* ===========================================================
   PRIME CART HEADER
=========================================================== */

function PrimeCartHeader({
  mobileMenuOpen,
  setMobileMenuOpen,
  totalItems,
}: {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (value: boolean) => void;
  totalItems: number;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-[#e8e8e4] bg-white/95 backdrop-blur-xl">
      {/* TOP BAR */}

      <div className="hidden border-b border-[#f0f0ec] bg-[#fafaf8] lg:block">
        <div className="mx-auto flex h-9 max-w-[1400px] items-center justify-between px-8 text-[9px] font-semibold text-gray-500">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin
                size={11}
                className="text-[#d4a51c]"
              />
              Deliver to Mumbai, India
            </span>

            <span className="flex items-center gap-1.5">
              <Truck
                size={11}
                className="text-[#d4a51c]"
              />
              Free shipping on orders above ₹499
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span>Download App</span>
            <span>Track Order</span>

            <Link
              href="/support"
              className="transition hover:text-black"
            >
              Help & Support
            </Link>
          </div>
        </div>
      </div>

      {/* MAIN NAV */}

      <div className="mx-auto flex h-[76px] max-w-[1400px] items-center gap-4 px-4 sm:px-6 lg:px-8">
        {/* MOBILE MENU */}

        <button
          type="button"
          onClick={() =>
            setMobileMenuOpen(!mobileMenuOpen)
          }
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 lg:hidden"
          aria-label="Open menu"
        >
          {mobileMenuOpen ? (
            <X size={19} />
          ) : (
            <Menu size={19} />
          )}
        </button>

        {/* LOGO */}

        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff8df]">
            <ShoppingBag
              size={23}
              strokeWidth={2.2}
              className="text-[#d4a51c]"
            />
          </div>

          <div className="hidden sm:block">
            <p className="text-[23px] font-black leading-none tracking-[-0.055em]">
              Prime<span className="text-[#d4a51c]">Cart</span>
            </p>

            <p className="mt-0.5 text-[7px] font-bold uppercase tracking-[0.18em] text-gray-400">
              Shop. Save. Smile.
            </p>
          </div>
        </Link>

        {/* CATEGORY */}

        <button
          type="button"
          className="hidden h-11 shrink-0 items-center gap-2 rounded-lg border border-[#e3e3de] bg-white px-4 text-xs font-bold text-gray-700 lg:flex"
        >
          <Menu size={15} />
          All Categories
          <ChevronRight
            size={13}
            className="rotate-90 text-gray-400"
          />
        </button>

        {/* SEARCH */}

        <div className="relative hidden min-w-0 flex-1 md:block">
          <Search
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search for products, brands and more..."
            className="h-11 w-full rounded-lg border border-[#e3e3de] bg-[#fafaf8] pl-11 pr-14 text-xs outline-none transition placeholder:text-gray-400 focus:border-[#d4a51c] focus:bg-white"
          />

          <button
            type="button"
            className="absolute right-0 top-0 flex h-11 w-12 items-center justify-center rounded-r-lg bg-[#d4a51c] text-white transition hover:bg-black"
            aria-label="Search"
          >
            <Search size={17} />
          </button>
        </div>

        {/* ACTIONS */}

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <HeaderAction
            icon={<UserRound size={19} />}
            label="Account"
            subLabel="Sign in"
            href="/login"
            hideOnMobile
          />

          <HeaderAction
            icon={<Heart size={20} />}
            label="Wishlist"
            href="/wishlist"
            hideOnMobile
          />

          <Link
            href="/cart"
            className="relative flex h-11 items-center gap-2 rounded-lg px-2.5 transition hover:bg-[#fafaf8] sm:px-3"
          >
            <div className="relative">
              <ShoppingBag size={21} />

              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#d4a51c] px-1 text-[8px] font-black text-white">
                  {totalItems}
                </span>
              )}
            </div>

            <div className="hidden xl:block">
              <p className="text-[9px] font-medium text-gray-400">
                Your
              </p>

              <p className="text-[11px] font-black">
                Cart
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* MOBILE SEARCH */}

      <div className="border-t border-[#f0f0ec] px-4 py-3 md:hidden">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search products, brands and more..."
            className="h-10 w-full rounded-lg border border-[#e3e3de] bg-[#fafaf8] pl-10 pr-4 text-xs outline-none focus:border-[#d4a51c]"
          />
        </div>
      </div>

      {/* MOBILE MENU */}

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            className="overflow-hidden border-t border-[#eeeeea] bg-white lg:hidden"
          >
            <nav className="space-y-1 px-4 py-4">
              <MobileNavLink
                href="/"
                label="Home"
              />

              <MobileNavLink
                href="/categories"
                label="All Categories"
              />

              <MobileNavLink
                href="/wishlist"
                label="Wishlist"
              />

              <MobileNavLink
                href="/dashboard/product"
                label="Products"
              />

              <MobileNavLink
                href="/support"
                label="Help & Support"
              />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ===========================================================
   HEADER ACTION
=========================================================== */

function HeaderAction({
  icon,
  label,
  subLabel,
  href,
  hideOnMobile = false,
}: {
  icon: ReactNode;
  label: string;
  subLabel?: string;
  href: string;
  hideOnMobile?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`h-11 items-center gap-2 rounded-lg px-2.5 transition hover:bg-[#fafaf8] sm:px-3 ${
        hideOnMobile ? "hidden sm:flex" : "flex"
      }`}
    >
      {icon}

      <div className="hidden xl:block">
        <p className="text-[9px] font-medium text-gray-400">
          {subLabel || label}
        </p>

        <p className="text-[11px] font-black">
          {label}
        </p>
      </div>
    </Link>
  );
}

/* ===========================================================
   BREADCRUMB
=========================================================== */

function Breadcrumb() {
  return (
    <nav className="flex items-center gap-2 text-[10px] font-medium">
      <Link
        href="/"
        className="text-gray-400 transition hover:text-black"
      >
        Home
      </Link>

      <ChevronRight
        size={12}
        className="text-gray-300"
      />

      <span className="font-black text-gray-900">
        Cart
      </span>
    </nav>
  );
}

/* ===========================================================
   TRUST CARD
=========================================================== */

function TrustCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[17px] border border-[#e4e4df] bg-white p-4 transition hover:border-[#dbc887] hover:shadow-sm">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#fff8df] text-[#b28b18]">
        {icon}
      </div>

      <p className="mt-3 text-xs font-black">
        {title}
      </p>

      <p className="mt-1 text-[10px] leading-4 text-gray-400">
        {description}
      </p>
    </div>
  );
}

/* ===========================================================
   PAYMENT BADGE
=========================================================== */

function PaymentBadge({
  icon,
  label,
}: {
  icon: ReactNode;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 rounded-lg border border-[#eeeeea] bg-[#fafaf8] py-2.5">
      <div className="text-[11px] font-black text-gray-700">
        {icon}
      </div>

      <span className="text-[7px] font-bold uppercase tracking-wider text-gray-400">
        {label}
      </span>
    </div>
  );
}

/* ===========================================================
   PROMISE ITEM
=========================================================== */

function PromiseItem({
  icon,
  text,
}: {
  icon: ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-1.5 rounded-lg bg-white/70 px-2.5 py-2 text-[8px] font-bold text-gray-500">
      <span className="text-[#b28b18]">
        {icon}
      </span>

      {text}
    </div>
  );
}

/* ===========================================================
   MINI TRUST
=========================================================== */

function MiniTrust({
  icon,
  title,
}: {
  icon: ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-[#eeeeea] bg-[#fafaf8] px-4 py-3">
      <span className="text-[#d4a51c]">
        {icon}
      </span>

      <span className="text-[10px] font-bold text-gray-500">
        {title}
      </span>
    </div>
  );
}

/* ===========================================================
   MOBILE NAV
=========================================================== */

function MobileNavLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-lg px-3 py-3 text-sm font-bold transition hover:bg-[#fafaf8]"
    >
      {label}

      <ChevronRight size={15} className="text-gray-400" />
    </Link>
  );
}
