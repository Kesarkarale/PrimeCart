"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  MapPin,
  Package,
  ShieldCheck,
  Truck,
  Wallet,
  Banknote,
  Loader2,
} from "lucide-react";

type PaymentMethod = "cod" | "card" | "upi";

export default function CheckoutPage() {
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("cod");

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [error, setError] = useState("");

  const product = {
    name: "Wireless Headphones",
    brand: "PrimeAudio",
    price: 2499,
    originalPrice: 3999,
    quantity: 1,
    image: "/products/headphone.png",
  };

  const subtotal = product.price * product.quantity;
  const delivery = subtotal >= 499 ? 0 : 49;
  const total = subtotal + delivery;
  const discount = product.originalPrice - product.price;

  function updateField(
    field: keyof typeof form,
    value: string
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function validateForm() {
    if (!form.fullName.trim()) {
      return "Please enter your full name.";
    }

    if (!/^[0-9]{10}$/.test(form.mobile)) {
      return "Please enter a valid 10-digit mobile number.";
    }

    if (!form.address.trim()) {
      return "Please enter your complete address.";
    }

    if (!form.city.trim()) {
      return "Please enter your city.";
    }

    if (!form.state.trim()) {
      return "Please enter your state.";
    }

    if (!/^[0-9]{6}$/.test(form.pincode)) {
      return "Please enter a valid 6-digit pincode.";
    }

    return "";
  }

  async function handlePlaceOrder() {
    setError("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      /*
       * Later you can insert the order into Supabase here.
       */

      await new Promise((resolve) =>
        setTimeout(resolve, 1200)
      );

      router.push("/dashboard/orders");
    } catch (err) {
      console.error("Place order error:", err);
      setError("Unable to place your order. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#faf8f3] text-[#111]">

      {/* HEADER */}

      <header className="sticky top-0 z-40 border-b border-[#e8e4da] bg-white">
        <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-4 lg:px-6">

          <Link
            href="/dashboard"
            className="flex items-center gap-3"
          >
            <img
              src="/logo.png"
              alt="PrimeCart"
              className="h-11 w-11 object-contain"
            />

            <div>
              <h1 className="text-[24px] font-black tracking-tight">
                Prime
                <span className="text-[#D4AF37]">
                  Cart
                </span>
              </h1>

              <p className="-mt-1 text-[9px] font-medium tracking-[1px] text-gray-500">
                SHOP MORE. PAY LESS.
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-2 text-sm font-semibold text-gray-600 sm:flex">
            <ShieldCheck
              size={19}
              className="text-[#D4AF37]"
            />
            Secure Checkout
          </div>
        </div>
      </header>

      {/* CONTENT */}

      <div className="mx-auto max-w-[1400px] px-4 py-7 lg:px-6 lg:py-10">

        {/* TOP */}

        <div className="mb-8">

          <Link
            href="/dashboard/cart"
            className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-[#b58f21]"
          >
            <ArrowLeft size={17} />
            Back to Cart
          </Link>

          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            Checkout
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Complete your details and place your order securely.
          </p>
        </div>

        {/* ERROR */}

        {error && (
          <div
            role="alert"
            className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          >
            {error}
          </div>
        )}

        <div className="grid gap-7 lg:grid-cols-[1fr_390px]">

          {/* LEFT */}

          <div className="space-y-6">

            {/* DELIVERY ADDRESS */}

            <section className="rounded-2xl border border-[#e7e2d8] bg-white p-5 shadow-sm sm:p-7">

              <div className="mb-6 flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8f2df]">
                  <MapPin
                    size={21}
                    className="text-[#c29620]"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-bold">
                    Delivery Address
                  </h3>

                  <p className="text-xs text-gray-500">
                    Where should we deliver your order?
                  </p>
                </div>

              </div>

              <div className="grid gap-5 sm:grid-cols-2">

                <Input
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={form.fullName}
                  onChange={(value) =>
                    updateField("fullName", value)
                  }
                />

                <Input
                  label="Mobile Number"
                  placeholder="10-digit mobile number"
                  value={form.mobile}
                  maxLength={10}
                  inputMode="numeric"
                  onChange={(value) =>
                    updateField(
                      "mobile",
                      value.replace(/\D/g, "").slice(0, 10)
                    )
                  }
                />

                <div className="sm:col-span-2">
                  <Input
                    label="Complete Address"
                    placeholder="House no, building, street, area"
                    value={form.address}
                    onChange={(value) =>
                      updateField("address", value)
                    }
                  />
                </div>

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

                <Input
                  label="Pincode"
                  placeholder="6-digit pincode"
                  value={form.pincode}
                  maxLength={6}
                  inputMode="numeric"
                  onChange={(value) =>
                    updateField(
                      "pincode",
                      value.replace(/\D/g, "").slice(0, 6)
                    )
                  }
                />

              </div>
            </section>

            {/* PAYMENT */}

            <section className="rounded-2xl border border-[#e7e2d8] bg-white p-5 shadow-sm sm:p-7">

              <div className="mb-6 flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8f2df]">
                  <CreditCard
                    size={21}
                    className="text-[#c29620]"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-bold">
                    Payment Method
                  </h3>

                  <p className="text-xs text-gray-500">
                    Choose your preferred payment option.
                  </p>
                </div>

              </div>

              <div className="space-y-3">

                <PaymentOption
                  selected={paymentMethod === "cod"}
                  onClick={() =>
                    setPaymentMethod("cod")
                  }
                  icon={<Banknote size={21} />}
                  title="Cash on Delivery"
                  description="Pay when your order arrives"
                />

                <PaymentOption
                  selected={paymentMethod === "upi"}
                  onClick={() =>
                    setPaymentMethod("upi")
                  }
                  icon={<Wallet size={21} />}
                  title="UPI"
                  description="Pay securely using UPI"
                />

                <PaymentOption
                  selected={paymentMethod === "card"}
                  onClick={() =>
                    setPaymentMethod("card")
                  }
                  icon={<CreditCard size={21} />}
                  title="Credit / Debit Card"
                  description="Visa, Mastercard and more"
                />

              </div>
            </section>

            {/* SECURITY */}

            <div className="grid gap-4 sm:grid-cols-3">

              <SecurityItem
                icon={<ShieldCheck size={21} />}
                title="Secure Payment"
                text="100% protected"
              />

              <SecurityItem
                icon={<Truck size={21} />}
                title="Fast Delivery"
                text="Quick doorstep delivery"
              />

              <SecurityItem
                icon={<CheckCircle2 size={21} />}
                title="Easy Returns"
                text="Simple return process"
              />

            </div>
          </div>

          {/* RIGHT */}

          <aside className="h-fit lg:sticky lg:top-[95px]">

            <div className="rounded-2xl border border-[#e7e2d8] bg-white p-5 shadow-sm sm:p-6">

              <h3 className="mb-5 text-xl font-bold">
                Order Summary
              </h3>

              {/* PRODUCT */}

              <div className="flex gap-4 border-b border-[#eeeeee] pb-5">

                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-[#f7f6f2] p-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain"
                  />
                </div>

                <div className="min-w-0">

                  <p className="text-xs font-semibold text-[#c29620]">
                    {product.brand}
                  </p>

                  <h4 className="mt-1 line-clamp-2 text-sm font-bold">
                    {product.name}
                  </h4>

                  <p className="mt-2 text-xs text-gray-500">
                    Quantity: {product.quantity}
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="font-bold">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>

                    <span className="text-xs text-gray-400 line-through">
                      ₹
                      {product.originalPrice.toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* PRICE */}

              <div className="space-y-3 border-b border-[#eeeeee] py-5">

                <PriceRow
                  label="Subtotal"
                  value={`₹${subtotal.toLocaleString(
                    "en-IN"
                  )}`}
                />

                <PriceRow
                  label="Delivery"
                  value={
                    delivery === 0
                      ? "FREE"
                      : `₹${delivery}`
                  }
                  valueClass={
                    delivery === 0
                      ? "text-green-600"
                      : ""
                  }
                />

                <PriceRow
                  label="Product Discount"
                  value={`- ₹${discount.toLocaleString(
                    "en-IN"
                  )}`}
                  valueClass="text-green-600"
                />

              </div>

              {/* TOTAL */}

              <div className="flex items-center justify-between py-5">

                <span className="text-base font-bold">
                  Total Amount
                </span>

                <span className="text-2xl font-black text-[#111]">
                  ₹{total.toLocaleString("en-IN")}
                </span>

              </div>

              {/* PLACE ORDER */}

              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={loading}
                className="flex h-[56px] w-full items-center justify-center gap-2 rounded-xl bg-[#D4AF37] text-[15px] font-bold text-white shadow-[0_7px_20px_rgba(212,175,55,0.25)] transition hover:bg-[#bd9828] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2
                      size={19}
                      className="animate-spin"
                    />
                    Placing Order...
                  </>
                ) : (
                  <>
                    <Package size={19} />
                    Place Order
                  </>
                )}
              </button>

              <p className="mt-4 text-center text-[11px] leading-5 text-gray-500">
                By placing this order, you agree to PrimeCart's
                terms and conditions.
              </p>

            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   INPUT
========================================================= */

function Input({
  label,
  placeholder,
  value,
  onChange,
  maxLength,
  inputMode,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  inputMode?: "numeric" | "text";
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-[#222]">
        {label}
      </label>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        inputMode={inputMode}
        className="h-[50px] w-full rounded-xl border border-[#dedbd3] bg-white px-4 text-sm text-[#222] outline-none transition placeholder:text-gray-400 focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/10"
      />
    </div>
  );
}

/* =========================================================
   PAYMENT OPTION
========================================================= */

function PaymentOption({
  selected,
  onClick,
  icon,
  title,
  description,
}: {
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
        selected
          ? "border-[#D4AF37] bg-[#fffaf0] shadow-sm"
          : "border-[#e2e0da] bg-white hover:border-[#D4AF37]"
      }`}
    >
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
          selected
            ? "bg-[#D4AF37] text-white"
            : "bg-[#f5f4ef] text-gray-600"
        }`}
      >
        {icon}
      </div>

      <div className="flex-1">
        <p className="text-sm font-bold text-[#222]">
          {title}
        </p>

        <p className="mt-1 text-xs text-gray-500">
          {description}
        </p>
      </div>

      <div
        className={`flex h-5 w-5 items-center justify-center rounded-full border ${
          selected
            ? "border-[#D4AF37]"
            : "border-gray-300"
        }`}
      >
        {selected && (
          <div className="h-2.5 w-2.5 rounded-full bg-[#D4AF37]" />
        )}
      </div>
    </button>
  );
}

/* =========================================================
   PRICE ROW
========================================================= */

function PriceRow({
  label,
  value,
  valueClass = "",
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-600">
        {label}
      </span>

      <span className={`font-semibold ${valueClass}`}>
        {value}
      </span>
    </div>
  );
}

/* =========================================================
   SECURITY ITEM
========================================================= */

function SecurityItem({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-[#e7e2d8] bg-white p-4">
      <div className="mb-2 text-[#c29620]">
        {icon}
      </div>

      <p className="text-xs font-bold">
        {title}
      </p>

      <p className="mt-1 text-[10px] text-gray-500">
        {text}
      </p>
    </div>
  );
}
