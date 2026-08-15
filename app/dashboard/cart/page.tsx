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
  LockKeyhole,
  RotateCcw,
  BadgeCheck,
  Tag,
  ChevronRight,
  Check,
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

const FREE_DELIVERY_LIMIT = 499;
const DELIVERY_CHARGE = 99;

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>(initialCart);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

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
    setCart((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  /* =========================================================
     CALCULATIONS
  ========================================================= */

  const subtotal = useMemo(() => {
    return cart.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    );
  }, [cart]);

  const totalItems = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
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
    const value = coupon.trim();

    if (!value) return;

    setCouponApplied(true);
  };

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <main className="min-h-screen bg-[#f7f7f5] text-gray-900">
      {/* =====================================================
          PAGE WRAPPER
      ===================================================== */}

      <div className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8 lg:py-9">
        {/* ===================================================
            BREADCRUMB
        =================================================== */}

        <nav className="mb-7 flex items-center gap-2 text-xs">
          <Link
            href="/"
            className="font-medium text-gray-400 transition hover:text-black"
          >
            Home
          </Link>

          <ChevronRight
            size={14}
            className="text-gray-300"
          />

          <span className="font-bold text-gray-900">
            Cart
          </span>
        </nav>

        {/* ===================================================
            PAGE HEADING
        =================================================== */}

        <div className="mb-8 flex flex-col gap-5 border-b border-gray-200 pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-1 w-7 rounded-full bg-[#D4AF37]" />

              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#B28B18]">
                PrimeCart
              </span>
            </div>

            <h1 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-[42px]">
              Shopping Cart
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
              Review your selected products and continue
              securely to checkout.
            </p>
          </div>

          {cart.length > 0 && (
            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                  Your Cart
                </p>

                <p className="mt-1 text-sm font-black">
                  {totalItems}{" "}
                  {totalItems === 1
                    ? "Item"
                    : "Items"}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white">
                <ShoppingBag size={19} />
              </div>
            </div>
          )}
        </div>

        {/* ===================================================
            EMPTY CART
        =================================================== */}

        {cart.length === 0 ? (
          <motion.section
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="rounded-3xl border border-gray-200 bg-white"
          >
            <div className="flex min-h-[500px] flex-col items-center justify-center px-6 py-16 text-center">
              <div className="relative">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#fff8df]">
                  <ShoppingBag
                    size={42}
                    strokeWidth={1.5}
                    className="text-[#D4AF37]"
                  />
                </div>

                <div className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">
                  <Sparkles size={13} />
                </div>
              </div>

              <h2 className="mt-7 text-2xl font-black sm:text-3xl">
                Your cart is empty
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
                You haven't added any products to your cart
                yet. Discover something you'll love from our
                collection.
              </p>

              <Link
                href="/"
                className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-black px-7 text-sm font-black text-white transition hover:bg-[#D4AF37]"
              >
                Continue Shopping
                <ArrowRight size={17} />
              </Link>

              <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs text-gray-400">
                <span className="flex items-center gap-2">
                  <ShieldCheck
                    size={15}
                    className="text-[#D4AF37]"
                  />
                  Secure Shopping
                </span>

                <span className="flex items-center gap-2">
                  <Truck
                    size={15}
                    className="text-[#D4AF37]"
                  />
                  Fast Delivery
                </span>

                <span className="flex items-center gap-2">
                  <RotateCcw
                    size={15}
                    className="text-[#D4AF37]"
                  />
                  Easy Returns
                </span>
              </div>
            </div>
          </motion.section>
        ) : (
          <>
            {/* =================================================
                FREE DELIVERY BANNER
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="mb-7 overflow-hidden rounded-2xl border border-[#eadcae] bg-[#fffdf5]"
            >
              <div className="flex gap-4 p-4 sm:p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fff1bd]">
                  <Truck
                    size={19}
                    className="text-[#B28B18]"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  {amountRemaining > 0 ? (
                    <p className="text-sm font-semibold text-gray-800">
                      Add{" "}
                      <span className="font-black text-[#A17C0D]">
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
                    <p className="flex items-center gap-2 text-sm font-black text-green-700">
                      <Check size={16} />
                      Free delivery unlocked
                    </p>
                  )}

                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#eee8d5]">
                    <motion.div
                      initial={{
                        width: 0,
                      }}
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

                <div className="hidden shrink-0 self-center text-right sm:block">
                  <p className="text-[10px] uppercase tracking-wider text-gray-400">
                    Free delivery
                  </p>

                  <p className="mt-1 text-sm font-black">
                    ₹499+
                  </p>
                </div>
              </div>
            </motion.div>

            {/* =================================================
                MAIN LAYOUT
            ================================================= */}

            <div className="grid items-start gap-7 xl:grid-cols-[minmax(0,1fr)_390px]">
              {/* =================================================
                  LEFT — CART PRODUCTS
              ================================================= */}

              <section className="min-w-0">
                <div className="mb-4 flex items-end justify-between">
                  <div>
                    <h2 className="text-lg font-black">
                      Your Items
                    </h2>

                    <p className="mt-1 text-xs text-gray-400">
                      {totalItems}{" "}
                      {totalItems === 1
                        ? "product"
                        : "products"}{" "}
                      selected
                    </p>
                  </div>

                  <span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-gray-500 shadow-sm ring-1 ring-gray-100">
                    {cart.length}{" "}
                    {cart.length === 1
                      ? "Product"
                      : "Products"}
                  </span>
                </div>

                {/* PRODUCTS */}

                <div className="space-y-4">
                  <AnimatePresence initial={false}>
                    {cart.map((item) => (
                      <motion.article
                        key={item.id}
                        layout
                        initial={{
                          opacity: 0,
                          y: 12,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.97,
                        }}
                        transition={{
                          duration: 0.22,
                        }}
                        className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:border-[#dfcf98] hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
                      >
                        <div className="p-4 sm:p-5">
                          <div className="flex gap-4 sm:gap-5">
                            {/* PRODUCT IMAGE */}

                            <Link
                              href={`/dashboard/product/${item.id}`}
                              className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-[#f7f7f5] sm:h-36 sm:w-36"
                            >
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                sizes="144px"
                                className="object-contain p-4 transition duration-500 hover:scale-105 sm:p-5"
                              />

                              <span className="absolute left-2 top-2 rounded-md bg-black px-2 py-1 text-[8px] font-black uppercase tracking-wider text-white">
                                Prime
                              </span>
                            </Link>

                            {/* DETAILS */}

                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                  <Link
                                    href={`/dashboard/product/${item.id}`}
                                    className="line-clamp-2 text-base font-black leading-6 transition hover:text-[#B28B18] sm:text-lg"
                                  >
                                    {item.name}
                                  </Link>

                                  <p className="mt-1 text-xs text-gray-400">
                                    Premium quality product
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
                                  <Trash2 size={17} />
                                </button>
                              </div>

                              {/* RATING */}

                              <div className="mt-2.5 flex items-center gap-2">
                                <span className="inline-flex items-center gap-1 rounded-md bg-[#fff6d7] px-2 py-1 text-[10px] font-black text-[#9D780C]">
                                  ★ 4.8
                                </span>

                                <span className="text-[10px] text-gray-400">
                                  Highly rated
                                </span>
                              </div>

                              {/* PRICE */}

                              <div className="mt-3 flex flex-wrap items-center gap-2">
                                <span className="text-xl font-black tracking-tight">
                                  ₹
                                  {item.price.toLocaleString(
                                    "en-IN"
                                  )}
                                </span>

                                <span className="text-xs text-gray-400 line-through">
                                  ₹
                                  {Math.round(
                                    item.price * 1.35
                                  ).toLocaleString(
                                    "en-IN"
                                  )}
                                </span>

                                <span className="rounded-md bg-green-50 px-2 py-1 text-[9px] font-black text-green-600">
                                  SAVE 25%
                                </span>
                              </div>

                              {/* ACTION ROW */}

                              <div className="mt-4 flex items-center justify-between gap-3">
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
                                    aria-label="Decrease quantity"
                                  >
                                    <Minus size={14} />
                                  </button>

                                  <span className="flex h-full min-w-9 items-center justify-center border-x border-gray-200 px-2 text-xs font-black">
                                    {item.quantity}
                                  </span>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      increaseQty(item.id)
                                    }
                                    className="flex h-full w-9 items-center justify-center text-gray-500 transition hover:bg-gray-100"
                                    aria-label="Increase quantity"
                                  >
                                    <Plus size={14} />
                                  </button>
                                </div>

                                <div className="text-right">
                                  <p className="text-[9px] font-medium uppercase tracking-wider text-gray-400">
                                    Total
                                  </p>

                                  <p className="text-sm font-black sm:text-base">
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
                                className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-gray-400 hover:text-red-500 sm:hidden"
                              >
                                <Trash2 size={13} />
                                Remove item
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* PRODUCT FOOTER */}

                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-gray-100 bg-[#fcfcfa] px-4 py-3 text-[10px] text-gray-500 sm:px-5">
                          <span className="flex items-center gap-1.5">
                            <Truck
                              size={13}
                              className="text-[#D4AF37]"
                            />
                            Fast delivery available
                          </span>

                          <span className="flex items-center gap-1.5">
                            <ShieldCheck
                              size={13}
                              className="text-[#D4AF37]"
                            />
                            Secure purchase
                          </span>
                        </div>
                      </motion.article>
                    ))}
                  </AnimatePresence>
                </div>

                {/* =================================================
                    TRUST SECTION
                ================================================= */}

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <TrustCard
                    icon={<ShieldCheck size={20} />}
                    title="Secure Payment"
                    description="Encrypted and protected checkout."
                  />

                  <TrustCard
                    icon={<Truck size={20} />}
                    title="Fast Delivery"
                    description="Reliable doorstep delivery."
                  />

                  <TrustCard
                    icon={<RotateCcw size={20} />}
                    title="Easy Returns"
                    description="Simple return experience."
                  />
                </div>

                {/* CONTINUE SHOPPING */}

                <Link
                  href="/"
                  className="mt-6 inline-flex items-center gap-2 text-xs font-black text-gray-500 transition hover:text-black"
                >
                  <ArrowRight
                    size={15}
                    className="rotate-180"
                  />
                  Continue Shopping
                </Link>
              </section>

              {/* =================================================
                  RIGHT — ORDER SUMMARY
              ================================================= */}

              <aside>
                <div className="sticky top-6 space-y-4">
                  {/* SUMMARY */}

                  <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    {/* HEADER */}

                    <div className="border-b border-gray-100 p-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff8df]">
                          <Sparkles
                            size={18}
                            className="text-[#B28B18]"
                          />
                        </div>

                        <div>
                          <h2 className="text-lg font-black">
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
                      {/* PRICE BREAKDOWN */}

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
                              Coupon
                            </span>

                            <span className="font-black">
                              Applied
                            </span>
                          </div>
                        )}
                      </div>

                      {/* COUPON */}

                      <div className="mt-5 border-t border-gray-100 pt-5">
                        <label
                          htmlFor="coupon"
                          className="mb-2 block text-[10px] font-black uppercase tracking-[0.14em] text-gray-500"
                        >
                          Promo code
                        </label>

                        <div className="flex h-11 overflow-hidden rounded-xl border border-gray-200 bg-white focus-within:border-[#D4AF37]">
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
                            placeholder="Enter coupon code"
                            className="min-w-0 flex-1 bg-transparent px-3 text-xs font-medium outline-none placeholder:text-gray-400"
                          />

                          <button
                            type="button"
                            onClick={applyCoupon}
                            disabled={!coupon.trim()}
                            className="px-4 text-xs font-black text-[#A27D12] transition hover:bg-[#fff9e7] disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            {couponApplied
                              ? "Applied"
                              : "Apply"}
                          </button>
                        </div>
                      </div>

                      {/* TOTAL */}

                      <div className="mt-5 rounded-xl bg-[#f8f8f5] p-4">
                        <div className="flex items-end justify-between">
                          <div>
                            <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                              Total
                            </p>

                            <p className="mt-1 text-2xl font-black tracking-tight">
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

                        <p className="mt-2 text-[9px] leading-4 text-gray-400">
                          Taxes and applicable charges are
                          included where applicable.
                        </p>
                      </div>

                      {/* CHECKOUT */}

                      <Link
                        href="/checkout"
                        className="group mt-5 flex min-h-[54px] items-center justify-center gap-2 rounded-xl bg-black px-5 text-sm font-black text-white transition hover:bg-[#D4AF37]"
                      >
                        Proceed to Checkout

                        <ArrowRight
                          size={17}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </Link>

                      {/* SECURITY */}

                      <div className="mt-4 flex items-center justify-center gap-2 text-[9px] font-semibold text-gray-400">
                        <LockKeyhole size={12} />
                        Secure & encrypted checkout
                      </div>
                    </div>
                  </div>

                  {/* =================================================
                      PAYMENT CARD
                  ================================================= */}

                  <div className="rounded-2xl border border-gray-200 bg-white p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-500">
                        Payment methods
                      </p>

                      <ShieldCheck
                        size={15}
                        className="text-[#D4AF37]"
                      />
                    </div>

                    <div className="mt-4 grid grid-cols-4 gap-2">
                      <PaymentBadge label="UPI" />
                      <PaymentBadge label="VISA" />
                      <PaymentBadge label="CARD" />
                      <PaymentBadge label="COD" />
                    </div>
                  </div>

                  {/* =================================================
                      GUARANTEE
                  ================================================= */}

                  <div className="rounded-2xl border border-[#eadcae] bg-[#fffdf5] p-5">
                    <div className="flex gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#fff1bd]">
                        <BadgeCheck
                          size={18}
                          className="text-[#B28B18]"
                        />
                      </div>

                      <div>
                        <p className="text-xs font-black">
                          PrimeCart Promise
                        </p>

                        <p className="mt-1 text-[10px] leading-5 text-gray-500">
                          Quality products, secure payments
                          and reliable delivery.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </>
        )}
      </div>
    </main>
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
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#fff8df] text-[#B28B18]">
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
  label,
}: {
  label: string;
}) {
  return (
    <div className="flex h-9 items-center justify-center rounded-lg border border-gray-100 bg-gray-50 text-[9px] font-black text-gray-600">
      {label}
    </div>
  );
}
