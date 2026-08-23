"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  User,
  Phone,
  Mail,
  CreditCard,
  Smartphone,
  Banknote,
  ShieldCheck,
  Lock,
  ChevronRight,
  Check,
  Tag,
  ShoppingBag,
  Truck,
  WalletCards,
} from "lucide-react";

type PaymentMethod =
  | "upi"
  | "card"
  | "cod";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("upi");

  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] =
    useState(false);

  const [placingOrder, setPlacingOrder] =
    useState(false);

  const [orderPlaced, setOrderPlaced] =
    useState(false);

  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    email: "",
    address: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
  });

  const subtotal = 6797;
  const deliveryCharge = subtotal >= 499 ? 0 : 49;
  const discount = couponApplied ? 500 : 0;
  const total =
    subtotal + deliveryCharge - discount;

  function updateField(
    field: keyof typeof form,
    value: string
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function applyCoupon() {
    if (coupon.trim().toUpperCase() === "PRIME500") {
      setCouponApplied(true);
    }
  }

  function placeOrder() {
    setPlacingOrder(true);

    setTimeout(() => {
      setPlacingOrder(false);
      setOrderPlaced(true);
    }, 1200);
  }

  if (orderPlaced) {
    return <OrderSuccess />;
  }

  return (
    <main className="min-h-screen bg-[#faf8f3] text-[#181818]">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="border-b border-[#e8e3d9] bg-white">

        <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">

          <Link
            href="/dashboard/cart"
            className="
              flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-[#555]
              transition
              hover:text-[#c99516]
            "
          >
            <ArrowLeft size={18} />
            <span>Back to Cart</span>
          </Link>

          <div className="flex items-center gap-2">

            <Lock
              size={16}
              className="text-[#c99516]"
            />

            <span className="text-xs font-semibold text-[#666] sm:text-sm">
              Secure Checkout
            </span>

          </div>

        </div>

      </header>

      {/* =====================================================
          CHECKOUT STEPS
      ===================================================== */}

      <div className="border-b border-[#ebe7df] bg-white">

        <div className="mx-auto max-w-[1400px] px-4 py-5 sm:px-6 lg:px-8">

          <div className="mx-auto flex max-w-[700px] items-center justify-center">

            <Step
              number="1"
              title="Address"
              active
            />

            <StepLine />

            <Step
              number="2"
              title="Payment"
              active
            />

            <StepLine />

            <Step
              number="3"
              title="Confirmation"
            />

          </div>

        </div>

      </div>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <div className="mx-auto max-w-[1400px] px-4 py-7 sm:px-6 lg:px-8">

        <div className="mb-7">

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Checkout
          </h1>

          <p className="mt-1 text-sm text-[#888]">
            Complete your order securely and quickly.
          </p>

        </div>

        <div className="grid gap-7 lg:grid-cols-[1fr_370px]">

          {/* =================================================
              LEFT
          ================================================= */}

          <div className="space-y-6">

            {/* ADDRESS */}

            <section
              className="
                rounded-2xl
                border
                border-[#e5e0d7]
                bg-white
                p-5
                shadow-[0_4px_20px_rgba(0,0,0,0.03)]
                sm:p-7
              "
            >

              <SectionHeader
                icon={<MapPin size={20} />}
                title="Delivery Address"
                subtitle="Where should we deliver your order?"
              />

              <div className="mt-6 grid gap-5 sm:grid-cols-2">

                <Input
                  label="Full Name"
                  icon={<User size={17} />}
                  placeholder="Enter your full name"
                  value={form.fullName}
                  onChange={(value) =>
                    updateField("fullName", value)
                  }
                />

                <Input
                  label="Mobile Number"
                  icon={<Phone size={17} />}
                  placeholder="10-digit mobile number"
                  value={form.mobile}
                  onChange={(value) =>
                    updateField(
                      "mobile",
                      value
                        .replace(/\D/g, "")
                        .slice(0, 10)
                    )
                  }
                />

                <div className="sm:col-span-2">

                  <Input
                    label="Email Address"
                    icon={<Mail size={17} />}
                    placeholder="Enter your email"
                    type="email"
                    value={form.email}
                    onChange={(value) =>
                      updateField("email", value)
                    }
                  />

                </div>

                <div className="sm:col-span-2">

                  <label className="mb-2 block text-xs font-bold text-[#333]">
                    Complete Address
                  </label>

                  <textarea
                    value={form.address}
                    onChange={(e) =>
                      updateField(
                        "address",
                        e.target.value
                      )
                    }
                    placeholder="House / Flat / Building / Street"
                    rows={3}
                    className="
                      w-full
                      resize-none
                      rounded-xl
                      border
                      border-[#dcd8d0]
                      bg-white
                      px-4
                      py-3
                      text-sm
                      outline-none
                      transition
                      placeholder:text-[#aaa]
                      focus:border-[#c99516]
                      focus:ring-4
                      focus:ring-[#c99516]/10
                    "
                  />

                </div>

                <Input
                  label="Landmark"
                  icon={<MapPin size={17} />}
                  placeholder="Nearby landmark"
                  value={form.landmark}
                  onChange={(value) =>
                    updateField("landmark", value)
                  }
                />

                <Input
                  label="Pincode"
                  placeholder="6-digit pincode"
                  value={form.pincode}
                  onChange={(value) =>
                    updateField(
                      "pincode",
                      value
                        .replace(/\D/g, "")
                        .slice(0, 6)
                    )
                  }
                />

                <Input
                  label="City"
                  placeholder="Enter city"
                  value={form.city}
                  onChange={(value) =>
                    updateField("city", value)
                  }
                />

                <Input
                  label="State"
                  placeholder="Enter state"
                  value={form.state}
                  onChange={(value) =>
                    updateField("state", value)
                  }
                />

              </div>

            </section>

            {/* PAYMENT */}

            <section
              className="
                rounded-2xl
                border
                border-[#e5e0d7]
                bg-white
                p-5
                shadow-[0_4px_20px_rgba(0,0,0,0.03)]
                sm:p-7
              "
            >

              <SectionHeader
                icon={<WalletCards size={20} />}
                title="Payment Method"
                subtitle="Choose your preferred payment option"
              />

              <div className="mt-6 space-y-3">

                <PaymentOption
                  id="upi"
                  title="UPI"
                  subtitle="Google Pay, PhonePe, Paytm & more"
                  icon={<Smartphone size={21} />}
                  active={
                    paymentMethod === "upi"
                  }
                  onClick={() =>
                    setPaymentMethod("upi")
                  }
                />

                <PaymentOption
                  id="card"
                  title="Credit / Debit Card"
                  subtitle="Visa, Mastercard, RuPay & more"
                  icon={<CreditCard size={21} />}
                  active={
                    paymentMethod === "card"
                  }
                  onClick={() =>
                    setPaymentMethod("card")
                  }
                />

                <PaymentOption
                  id="cod"
                  title="Cash on Delivery"
                  subtitle="Pay when your order arrives"
                  icon={<Banknote size={21} />}
                  active={
                    paymentMethod === "cod"
                  }
                  onClick={() =>
                    setPaymentMethod("cod")
                  }
                />

              </div>

              {/* UPI */}

              {paymentMethod === "upi" && (
                <div className="mt-5 rounded-xl bg-[#faf8f3] p-4">

                  <p className="text-xs font-bold text-[#333]">
                    UPI Payment
                  </p>

                  <p className="mt-1 text-xs text-[#888]">
                    You will be redirected to your UPI
                    app after placing the order.
                  </p>

                </div>
              )}

              {/* CARD */}

              {paymentMethod === "card" && (
                <div className="mt-5 grid gap-4 rounded-xl bg-[#faf8f3] p-4 sm:grid-cols-2">

                  <div className="sm:col-span-2">

                    <label className="mb-2 block text-xs font-bold">
                      Card Number
                    </label>

                    <input
                      placeholder="1234 5678 9012 3456"
                      className="checkout-input"
                    />

                  </div>

                  <div>

                    <label className="mb-2 block text-xs font-bold">
                      Expiry Date
                    </label>

                    <input
                      placeholder="MM / YY"
                      className="checkout-input"
                    />

                  </div>

                  <div>

                    <label className="mb-2 block text-xs font-bold">
                      CVV
                    </label>

                    <input
                      type="password"
                      placeholder="•••"
                      maxLength={3}
                      className="checkout-input"
                    />

                  </div>

                </div>
              )}

              {/* COD */}

              {paymentMethod === "cod" && (
                <div className="mt-5 rounded-xl border border-[#e7dfca] bg-[#fffaf0] p-4">

                  <div className="flex gap-3">

                    <Banknote
                      size={20}
                      className="mt-0.5 shrink-0 text-[#c99516]"
                    />

                    <div>

                      <p className="text-xs font-bold text-[#333]">
                        Cash on Delivery
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[#777]">
                        Please keep the exact amount ready
                        when your order is delivered.
                      </p>

                    </div>

                  </div>

                </div>
              )}

            </section>

            {/* TRUST */}

            <div
              className="
                grid
                grid-cols-1
                gap-3
                sm:grid-cols-3
              "
            >

              <TrustItem
                icon={<ShieldCheck size={20} />}
                title="Secure Payment"
                text="Your payment is protected"
              />

              <TrustItem
                icon={<Truck size={20} />}
                title="Fast Delivery"
                text="Quick & reliable delivery"
              />

              <TrustItem
                icon={<Lock size={20} />}
                title="100% Safe"
                text="Your information is secure"
              />

            </div>

          </div>

          {/* =================================================
              RIGHT SUMMARY
          ================================================= */}

          <aside>

            <div
              className="
                sticky
                top-5
                rounded-2xl
                border
                border-[#e5e0d7]
                bg-white
                p-5
                shadow-[0_5px_25px_rgba(0,0,0,0.04)]
                sm:p-6
              "
            >

              <div className="flex items-center gap-3">

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

                  <h2 className="font-bold">
                    Order Summary
                  </h2>

                  <p className="text-xs text-[#888]">
                    3 items
                  </p>

                </div>

              </div>

              {/* PRODUCTS */}

              <div className="mt-6 space-y-4">

                <CheckoutProduct
                  image="/products/headphone.png"
                  name="Wireless Bluetooth Headphones"
                  quantity={1}
                  price={2499}
                />

                <CheckoutProduct
                  image="/products/smartwatch.png"
                  name="Premium Smart Watch"
                  quantity={1}
                  price={3299}
                />

                <CheckoutProduct
                  image="/products/speaker.png"
                  name="Portable Bluetooth Speaker"
                  quantity={1}
                  price={999}
                />

              </div>

              <div className="my-5 border-t border-dashed border-[#dedede]" />

              {/* COUPON */}

              <div>

                <label className="mb-2 block text-xs font-bold text-[#444]">
                  Have a coupon?
                </label>

                <div className="flex gap-2">

                  <div className="relative flex-1">

                    <Tag
                      size={16}
                      className="
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        text-[#999]
                      "
                    />

                    <input
                      value={coupon}
                      onChange={(e) =>
                        setCoupon(e.target.value)
                      }
                      placeholder="Enter coupon code"
                      disabled={couponApplied}
                      className="
                        h-11
                        w-full
                        rounded-xl
                        border
                        border-[#ddd]
                        pl-9
                        pr-3
                        text-xs
                        outline-none
                        focus:border-[#c99516]
                      "
                    />

                  </div>

                  <button
                    type="button"
                    onClick={applyCoupon}
                    disabled={couponApplied}
                    className="
                      h-11
                      rounded-xl
                      border
                      border-[#d5a32d]
                      px-4
                      text-xs
                      font-bold
                      text-[#b17d08]
                      transition
                      hover:bg-[#fff8e8]
                      disabled:opacity-50
                    "
                  >
                    {couponApplied
                      ? "Applied"
                      : "Apply"}
                  </button>

                </div>

                {couponApplied && (
                  <p className="mt-2 text-[11px] font-semibold text-green-600">
                    ✓ PRIME500 applied. You saved ₹500.
                  </p>
                )}

              </div>

              <div className="my-5 border-t border-[#e8e4dc]" />

              {/* PRICE */}

              <div className="space-y-3">

                <PriceRow
                  label="Subtotal"
                  value={`₹${subtotal.toLocaleString(
                    "en-IN"
                  )}`}
                />

                <PriceRow
                  label="Delivery"
                  value={
                    deliveryCharge === 0
                      ? "FREE"
                      : `₹${deliveryCharge}`
                  }
                  green
                />

                {couponApplied && (
                  <PriceRow
                    label="Coupon Discount"
                    value={`- ₹${discount.toLocaleString(
                      "en-IN"
                    )}`}
                    green
                  />
                )}

              </div>

              <div className="my-5 border-t border-[#dedbd4]" />

              <div className="flex items-center justify-between">

                <span className="text-base font-bold">
                  Total Amount
                </span>

                <span className="text-xl font-extrabold text-[#181818]">
                  ₹{total.toLocaleString("en-IN")}
                </span>

              </div>

              {/* PLACE ORDER */}

              <button
                onClick={placeOrder}
                disabled={placingOrder}
                className="
                  mt-6
                  flex
                  h-13
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#d99d08]
                  px-5
                  py-3.5
                  text-sm
                  font-bold
                  text-white
                  shadow-[0_8px_22px_rgba(217,157,8,0.2)]
                  transition
                  hover:bg-[#c88f05]
                  active:scale-[0.99]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {placingOrder ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Processing...
                  </>
                ) : (
                  <>
                    Place Order
                    <ChevronRight size={18} />
                  </>
                )}
              </button>

              <p className="mt-3 text-center text-[10px] leading-4 text-[#999]">
                By placing this order, you agree to
                PrimeCart's Terms & Conditions and
                Privacy Policy.
              </p>

            </div>

          </aside>

        </div>

      </div>

      <style jsx global>{`
        .checkout-input {
          height: 46px;
          width: 100%;
          border-radius: 10px;
          border: 1px solid #dcd8d0;
          background: #ffffff;
          padding: 0 14px;
          font-size: 13px;
          color: #222;
          outline: none;
          transition: all 0.2s ease;
        }

        .checkout-input::placeholder {
          color: #aaa;
        }

        .checkout-input:focus {
          border-color: #c99516;
          box-shadow: 0 0 0 4px rgba(201, 149, 22, 0.09);
        }
      `}</style>

    </main>
  );
}

/* =============================================================
   STEP
============================================================= */

function Step({
  number,
  title,
  active = false,
}: {
  number: string;
  title: string;
  active?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">

      <div
        className={`
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-full
          text-xs
          font-bold

          ${
            active
              ? "bg-[#d99d08] text-white"
              : "bg-[#eeeeee] text-[#999]"
          }
        `}
      >
        {number}
      </div>

      <span
        className={`
          hidden
          text-xs
          font-semibold
          sm:block

          ${
            active
              ? "text-[#333]"
              : "text-[#999]"
          }
        `}
      >
        {title}
      </span>

    </div>
  );
}

/* =============================================================
   STEP LINE
============================================================= */

function StepLine() {
  return (
    <div className="mx-3 h-px w-12 bg-[#dedbd3] sm:mx-5 sm:w-20" />
  );
}

/* =============================================================
   SECTION HEADER
============================================================= */

function SectionHeader({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-start gap-3">

      <div
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-[#faf3df]
          text-[#c99516]
        "
      >
        {icon}
      </div>

      <div>

        <h2 className="text-base font-bold">
          {title}
        </h2>

        <p className="mt-1 text-xs text-[#888]">
          {subtitle}
        </p>

      </div>

    </div>
  );
}

/* =============================================================
   INPUT
============================================================= */

function Input({
  label,
  placeholder,
  value,
  onChange,
  icon,
  type = "text",
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  type?: string;
}) {
  return (
    <div>

      <label className="mb-2 block text-xs font-bold text-[#333]">
        {label}
      </label>

      <div className="relative">

        {icon && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#888]">
            {icon}
          </span>
        )}

        <input
          type={type}
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          placeholder={placeholder}
          className={`
            checkout-input
            ${icon ? "pl-10" : ""}
          `}
        />

      </div>

    </div>
  );
}

/* =============================================================
   PAYMENT OPTION
============================================================= */

function PaymentOption({
  id,
  title,
  subtitle,
  icon,
  active,
  onClick,
}: {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex
        w-full
        items-center
        gap-4
        rounded-xl
        border
        p-4
        text-left
        transition

        ${
          active
            ? "border-[#d5a32d] bg-[#fffaf0]"
            : "border-[#e2ded6] bg-white hover:border-[#cfc8bb]"
        }
      `}
    >

      <div
        className={`
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl

          ${
            active
              ? "bg-[#d99d08] text-white"
              : "bg-[#f5f3ee] text-[#777]"
          }
        `}
      >
        {icon}
      </div>

      <div className="flex-1">

        <p className="text-sm font-bold text-[#333]">
          {title}
        </p>

        <p className="mt-1 text-[11px] text-[#888]">
          {subtitle}
        </p>

      </div>

      <div
        className={`
          flex
          h-5
          w-5
          items-center
          justify-center
          rounded-full
          border

          ${
            active
              ? "border-[#d99d08] bg-[#d99d08] text-white"
              : "border-[#ccc]"
          }
        `}
      >
        {active && <Check size={12} />}
      </div>

    </button>
  );
}

/* =============================================================
   CHECKOUT PRODUCT
============================================================= */

function CheckoutProduct({
  image,
  name,
  quantity,
  price,
}: {
  image: string;
  name: string;
  quantity: number;
  price: number;
}) {
  return (
    <div className="flex gap-3">

      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#f7f6f2]">

        <img
          src={image}
          alt={name}
          className="h-full w-full object-contain p-2"
        />

        <span
          className="
            absolute
            -right-1
            -top-1
            flex
            h-5
            min-w-5
            items-center
            justify-center
            rounded-full
            bg-[#d99d08]
            px-1
            text-[9px]
            font-bold
            text-white
          "
        >
          {quantity}
        </span>

      </div>

      <div className="min-w-0 flex-1">

        <p className="line-clamp-2 text-xs font-semibold leading-5 text-[#333]">
          {name}
        </p>

        <p className="mt-1 text-[11px] text-[#888]">
          Qty: {quantity}
        </p>

      </div>

      <span className="text-xs font-bold text-[#222]">
        ₹{price.toLocaleString("en-IN")}
      </span>

    </div>
  );
}

/* =============================================================
   PRICE ROW
============================================================= */

function PriceRow({
  label,
  value,
  green = false,
}: {
  label: string;
  value: string;
  green?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">

      <span className="text-xs text-[#777]">
        {label}
      </span>

      <span
        className={`
          text-xs
          font-semibold

          ${green ? "text-green-600" : "text-[#333]"}
        `}
      >
        {value}
      </span>

    </div>
  );
}

/* =============================================================
   TRUST ITEM
============================================================= */

function TrustItem({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-3
        rounded-xl
        border
        border-[#e8e3da]
        bg-white
        p-4
      "
    >

      <div className="text-[#c99516]">
        {icon}
      </div>

      <div>

        <p className="text-xs font-bold">
          {title}
        </p>

        <p className="mt-1 text-[10px] text-[#888]">
          {text}
        </p>

      </div>

    </div>
  );
}

/* =============================================================
   ORDER SUCCESS
============================================================= */

function OrderSuccess() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#faf8f3] px-5">

      <div
        className="
          w-full
          max-w-[560px]
          rounded-3xl
          border
          border-[#e5e0d7]
          bg-white
          px-6
          py-12
          text-center
          shadow-[0_10px_40px_rgba(0,0,0,0.06)]
          sm:px-10
        "
      >

        <div
          className="
            mx-auto
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-full
            bg-green-50
            text-green-600
          "
        >
          <Check size={40} />
        </div>

        <h1 className="mt-7 text-2xl font-bold sm:text-3xl">
          Order Placed Successfully!
        </h1>

        <p className="mx-auto mt-3 max-w-[430px] text-sm leading-6 text-[#777]">
          Thank you for shopping with PrimeCart.
          Your order has been received and will be
          processed shortly.
        </p>

        <div
          className="
            mx-auto
            mt-6
            max-w-[360px]
            rounded-xl
            bg-[#faf8f3]
            p-4
          "
        >
          <p className="text-xs text-[#888]">
            Order ID
          </p>

          <p className="mt-1 font-bold text-[#333]">
            #PC{Math.floor(Math.random() * 900000 + 100000)}
          </p>
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">

          <Link
            href="/dashboard/orders"
            className="
              flex
              h-12
              flex-1
              items-center
              justify-center
              rounded-xl
              bg-[#d99d08]
              text-sm
              font-bold
              text-white
              transition
              hover:bg-[#c88f05]
            "
          >
            View My Orders
          </Link>

          <Link
            href="/dashboard"
            className="
              flex
              h-12
              flex-1
              items-center
              justify-center
              rounded-xl
              border
              border-[#dedede]
              text-sm
              font-semibold
              text-[#444]
              transition
              hover:bg-[#fafafa]
            "
          >
            Continue Shopping
          </Link>

        </div>

      </div>

    </main>
  );
}
