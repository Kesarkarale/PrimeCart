"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  BadgeCheck,
  Banknote,
  Check,
  ChevronRight,
  CreditCard,
  Lock,
  MapPin,
  Package,
  Phone,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Truck,
  User,
  WalletCards,
} from "lucide-react";

type PaymentMethod = "cod" | "card" | "upi";
type DeliveryMethod = "standard" | "express";

interface CheckoutProduct {
  id: string;
  name: string;
  slug: string;
  brand: string | null;
  price: number;
  originalPrice: number | null;
  image_url: string | null;
  quantity: number;
  color: string;
  stock: number;
}

interface FormData {
  fullName: string;
  mobile: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

const initialForm: FormData = {
  fullName: "",
  mobile: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
};

export default function CheckoutPage() {
  const router = useRouter();

  const [product, setProduct] = useState<CheckoutProduct | null>(null);

  const [formData, setFormData] = useState<FormData>(initialForm);

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("cod");

  const [deliveryMethod, setDeliveryMethod] =
    useState<DeliveryMethod>("standard");

  const [loadingProduct, setLoadingProduct] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);

  const [errors, setErrors] = useState<
    Partial<Record<keyof FormData, string>>
  >({});

  useEffect(() => {
    try {
      const storedProduct = localStorage.getItem("primecart_buy_now");

      if (!storedProduct) {
        router.replace("/dashboard/products");
        return;
      }

      const parsedProduct = JSON.parse(storedProduct);

      if (!parsedProduct?.id) {
        router.replace("/dashboard/products");
        return;
      }

      setProduct(parsedProduct);
    } catch (error) {
      console.error("Checkout product error:", error);
      router.replace("/dashboard/products");
    } finally {
      setLoadingProduct(false);
    }
  }, [router]);

  const subtotal = useMemo(() => {
    if (!product) return 0;

    return product.price * product.quantity;
  }, [product]);

  const originalTotal = useMemo(() => {
    if (!product) return 0;

    if (!product.originalPrice) {
      return subtotal;
    }

    return product.originalPrice * product.quantity;
  }, [product, subtotal]);

  const discount = Math.max(originalTotal - subtotal, 0);

  const standardDelivery = subtotal >= 499 ? 0 : 49;

  const deliveryCharge =
    deliveryMethod === "standard"
      ? standardDelivery
      : 99;

  const total = subtotal + deliveryCharge;

  const updateField = (
    field: keyof FormData,
    value: string
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: "",
    }));
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Please enter your mobile number.";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile.trim())) {
      newErrors.mobile =
        "Please enter a valid 10-digit mobile number.";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Please enter your delivery address.";
    }

    if (!formData.city.trim()) {
      newErrors.city = "Please enter your city.";
    }

    if (!formData.state.trim()) {
      newErrors.state = "Please enter your state.";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = "Please enter your pincode.";
    } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
      newErrors.pincode =
        "Please enter a valid 6-digit pincode.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!product) return;

    const valid = validateForm();

    if (!valid) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    setPlacingOrder(true);

    try {
      /*
       * Order data prepared for Supabase/backend integration.
       * Currently the checkout UI completes the order flow
       * and redirects to the orders page.
       */

      const orderData = {
        product_id: product.id,
        product_name: product.name,
        quantity: product.quantity,
        color: product.color,
        price: product.price,
        subtotal,
        discount,
        delivery_charge: deliveryCharge,
        total,
        delivery_method: deliveryMethod,
        payment_method: paymentMethod,
        customer: formData,
      };

      console.log("PRIMECART ORDER:", orderData);

      await new Promise((resolve) =>
        setTimeout(resolve, 1200)
      );

      localStorage.removeItem("primecart_buy_now");

      router.push("/dashboard/orders");
    } catch (error) {
      console.error("Place order error:", error);
      setPlacingOrder(false);
    }
  };

  if (loadingProduct) {
    return <CheckoutSkeleton />;
  }

  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#faf8f3] text-[#171717]">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-[#eadfca] bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/dashboard"
            className="flex items-center gap-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D4AF37] text-white">
              <ShoppingBag size={20} />
            </div>

            <div>
              <p className="text-lg font-extrabold tracking-tight">
                Prime<span className="text-[#b8941f]">Cart</span>
              </p>

              <p className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-gray-400 sm:block">
                Secure Checkout
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 sm:text-sm">
            <Lock size={15} />
            Secure Checkout
          </div>
        </div>
      </header>

      {/* PROGRESS */}
      <div className="border-b border-[#eadfca] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-4 sm:px-6 lg:px-8">
          <CheckoutStep
            number="1"
            label="Checkout"
            active
          />

          <div className="mx-2 h-px w-10 bg-[#D4AF37] sm:mx-4 sm:w-20" />

          <CheckoutStep
            number="2"
            label="Payment"
            active
          />

          <div className="mx-2 h-px w-10 bg-gray-200 sm:mx-4 sm:w-20" />

          <CheckoutStep
            number="3"
            label="Confirmation"
          />
        </div>
      </div>

      {/* MAIN */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* BACK */}
        <Link
          href="/dashboard/products"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-[#b8941f]"
        >
          <ArrowLeft size={17} />
          Continue Shopping
        </Link>

        <div className="mb-8">
          <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
            Checkout
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Complete your order securely and quickly.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_390px]">
          {/* LEFT */}
          <div className="space-y-6">
            {/* DELIVERY ADDRESS */}
            <section className="rounded-2xl border border-[#eadfca] bg-white p-5 shadow-sm sm:p-6">
              <SectionHeading
                icon={<MapPin size={19} />}
                title="Delivery Address"
                subtitle="Where should we deliver your order?"
              />

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Input
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(value) =>
                    updateField("fullName", value)
                  }
                  error={errors.fullName}
                  icon={<User size={16} />}
                />

                <Input
                  label="Mobile Number"
                  placeholder="10-digit mobile number"
                  value={formData.mobile}
                  onChange={(value) =>
                    updateField(
                      "mobile",
                      value.replace(/\D/g, "").slice(0, 10)
                    )
                  }
                  error={errors.mobile}
                  icon={<Phone size={16} />}
                />

                <div className="sm:col-span-2">
                  <Input
                    label="Complete Address"
                    placeholder="House / Flat / Street / Area"
                    value={formData.address}
                    onChange={(value) =>
                      updateField("address", value)
                    }
                    error={errors.address}
                    multiline
                    icon={<MapPin size={16} />}
                  />
                </div>

                <Input
                  label="City"
                  placeholder="Enter city"
                  value={formData.city}
                  onChange={(value) =>
                    updateField("city", value)
                  }
                  error={errors.city}
                />

                <Input
                  label="State"
                  placeholder="Enter state"
                  value={formData.state}
                  onChange={(value) =>
                    updateField("state", value)
                  }
                  error={errors.state}
                />

                <Input
                  label="Pincode"
                  placeholder="6-digit pincode"
                  value={formData.pincode}
                  onChange={(value) =>
                    updateField(
                      "pincode",
                      value.replace(/\D/g, "").slice(0, 6)
                    )
                  }
                  error={errors.pincode}
                />
              </div>
            </section>

            {/* DELIVERY OPTIONS */}
            <section className="rounded-2xl border border-[#eadfca] bg-white p-5 shadow-sm sm:p-6">
              <SectionHeading
                icon={<Truck size={19} />}
                title="Delivery Options"
                subtitle="Choose how you want your order delivered."
              />

              <div className="mt-5 space-y-3">
                <DeliveryOption
                  selected={deliveryMethod === "standard"}
                  onClick={() =>
                    setDeliveryMethod("standard")
                  }
                  title="Standard Delivery"
                  description="Delivery within 3–5 business days"
                  price={
                    standardDelivery === 0
                      ? "FREE"
                      : "₹49"
                  }
                  icon={<Package size={20} />}
                />

                <DeliveryOption
                  selected={deliveryMethod === "express"}
                  onClick={() =>
                    setDeliveryMethod("express")
                  }
                  title="Express Delivery"
                  description="Faster delivery within 1–2 business days"
                  price="₹99"
                  icon={<Truck size={20} />}
                />
              </div>
            </section>

            {/* PAYMENT */}
            <section className="rounded-2xl border border-[#eadfca] bg-white p-5 shadow-sm sm:p-6">
              <SectionHeading
                icon={<WalletCards size={19} />}
                title="Payment Method"
                subtitle="Select your preferred payment option."
              />

              <div className="mt-5 space-y-3">
                <PaymentOption
                  selected={paymentMethod === "cod"}
                  onClick={() =>
                    setPaymentMethod("cod")
                  }
                  title="Cash on Delivery"
                  description="Pay when your order arrives"
                  icon={<Banknote size={20} />}
                />

                <PaymentOption
                  selected={paymentMethod === "upi"}
                  onClick={() =>
                    setPaymentMethod("upi")
                  }
                  title="UPI"
                  description="Google Pay, PhonePe, Paytm & more"
                  icon={<Smartphone size={20} />}
                />

                <PaymentOption
                  selected={paymentMethod === "card"}
                  onClick={() =>
                    setPaymentMethod("card")
                  }
                  title="Credit / Debit Card"
                  description="Visa, Mastercard, RuPay & more"
                  icon={<CreditCard size={20} />}
                />
              </div>

              {paymentMethod !== "cod" && (
                <div className="mt-4 rounded-xl border border-[#eadfca] bg-[#faf8f3] p-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck
                      size={19}
                      className="mt-0.5 shrink-0 text-[#b8941f]"
                    />

                    <div>
                      <p className="text-sm font-bold">
                        Secure Online Payment
                      </p>

                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        You will be redirected to our secure
                        payment gateway after placing the order.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* SECURITY */}
            <section className="rounded-2xl border border-[#eadfca] bg-white p-5 shadow-sm sm:p-6">
              <div className="grid gap-4 sm:grid-cols-3">
                <SecurityItem
                  icon={<Lock size={18} />}
                  title="Secure Checkout"
                  text="Your information is protected."
                />

                <SecurityItem
                  icon={<BadgeCheck size={18} />}
                  title="Genuine Products"
                  text="100% authentic products."
                />

                <SecurityItem
                  icon={<Truck size={18} />}
                  title="Easy Delivery"
                  text="Reliable doorstep delivery."
                />
              </div>
            </section>
          </div>

          {/* RIGHT SUMMARY */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <section className="overflow-hidden rounded-2xl border border-[#eadfca] bg-white shadow-sm">
              <div className="border-b border-[#eadfca] p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-black">
                    Order Summary
                  </h2>

                  <span className="rounded-full bg-[#faf8f3] px-3 py-1 text-xs font-bold text-gray-500">
                    {product.quantity} item
                    {product.quantity > 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              {/* PRODUCT */}
              <div className="border-b border-[#eadfca] p-5 sm:p-6">
                <div className="flex gap-4">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-[#eadfca] bg-[#faf8f3]">
                    {product.image_url ? (
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        className="object-contain p-2"
                        sizes="96px"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#b8941f]">
                      {product.brand || "PrimeCart"}
                    </p>

                    <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-5">
                      {product.name}
                    </h3>

                    {product.color && (
                      <p className="mt-2 text-xs text-gray-500">
                        Color:{" "}
                        <span className="font-semibold text-gray-700">
                          {product.color}
                        </span>
                      </p>
                    )}

                    <p className="mt-1 text-xs text-gray-500">
                      Quantity:{" "}
                      <span className="font-semibold text-gray-700">
                        {product.quantity}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* PRICE */}
              <div className="space-y-3 p-5 sm:p-6">
                <PriceRow
                  label="Subtotal"
                  value={formatCurrency(subtotal)}
                />

                {discount > 0 && (
                  <PriceRow
                    label="Product Discount"
                    value={`- ${formatCurrency(discount)}`}
                    green
                  />
                )}

                <PriceRow
                  label="Delivery"
                  value={
                    deliveryCharge === 0
                      ? "FREE"
                      : formatCurrency(deliveryCharge)
                  }
                  green={deliveryCharge === 0}
                />

                <div className="my-4 border-t border-dashed border-[#e5dcc9]" />

                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-gray-600">
                      Total Amount
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Inclusive of all applicable charges
                    </p>
                  </div>

                  <p className="text-2xl font-black text-[#b8941f]">
                    {formatCurrency(total)}
                  </p>
                </div>

                {/* PLACE ORDER */}
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={placingOrder}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-5 py-3.5 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#b8941f] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {placingOrder ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Processing Order...
                    </>
                  ) : (
                    <>
                      {paymentMethod === "cod"
                        ? "Place Order"
                        : "Continue to Payment"}

                      <ChevronRight size={18} />
                    </>
                  )}
                </button>

                <div className="mt-3 flex items-center justify-center gap-2 text-[11px] font-medium text-gray-400">
                  <Lock size={13} />
                  Safe & secure checkout
                </div>
              </div>
            </section>

            {/* SAVINGS */}
            {discount > 0 && (
              <div className="mt-4 rounded-2xl border border-green-200 bg-green-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Check size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-green-700">
                      You&apos;re saving{" "}
                      {formatCurrency(discount)}
                    </p>

                    <p className="mt-0.5 text-xs text-green-600">
                      Great choice! Your discount has been applied.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}

/* =========================================================
   COMPONENTS
========================================================= */

function CheckoutStep({
  number,
  label,
  active = false,
}: {
  number: string;
  label: string;
  active?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-black ${
          active
            ? "bg-[#D4AF37] text-white"
            : "bg-gray-100 text-gray-400"
        }`}
      >
        {number}
      </div>

      <span
        className={`hidden text-xs font-bold sm:block ${
          active ? "text-gray-800" : "text-gray-400"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function SectionHeading({
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
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#faf8f3] text-[#b8941f]">
        {icon}
      </div>

      <div>
        <h2 className="text-base font-black sm:text-lg">
          {title}
        </h2>

        <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

function Input({
  label,
  placeholder,
  value,
  onChange,
  error,
  icon,
  multiline = false,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  icon?: React.ReactNode;
  multiline?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold text-gray-700">
        {label}
      </label>

      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute left-3 top-3.5 text-gray-400">
            {icon}
          </div>
        )}

        {multiline ? (
          <textarea
            value={value}
            onChange={(event) =>
              onChange(event.target.value)
            }
            placeholder={placeholder}
            rows={3}
            className={`w-full resize-none rounded-xl border bg-white px-3 py-3 text-sm outline-none transition placeholder:text-gray-400 ${
              icon ? "pl-10" : ""
            } ${
              error
                ? "border-red-300 focus:border-red-500"
                : "border-[#e5dcc9] focus:border-[#D4AF37]"
            }`}
          />
        ) : (
          <input
            value={value}
            onChange={(event) =>
              onChange(event.target.value)
            }
            placeholder={placeholder}
            className={`h-12 w-full rounded-xl border bg-white px-3 text-sm outline-none transition placeholder:text-gray-400 ${
              icon ? "pl-10" : ""
            } ${
              error
                ? "border-red-300 focus:border-red-500"
                : "border-[#e5dcc9] focus:border-[#D4AF37]"
            }`}
          />
        )}
      </div>

      {error && (
        <p className="mt-1.5 text-xs font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

function DeliveryOption({
  selected,
  onClick,
  title,
  description,
  price,
  icon,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  description: string;
  price: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
        selected
          ? "border-[#D4AF37] bg-[#fffaf0]"
          : "border-[#e5dcc9] bg-white hover:border-[#D4AF37]"
      }`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
          selected
            ? "bg-[#D4AF37] text-white"
            : "bg-[#faf8f3] text-gray-500"
        }`}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold">{title}</p>

        <p className="mt-0.5 text-xs text-gray-500">
          {description}
        </p>
      </div>

      <div className="text-right">
        <p
          className={`text-sm font-black ${
            price === "FREE"
              ? "text-green-600"
              : "text-gray-800"
          }`}
        >
          {price}
        </p>

        <div
          className={`mt-1 ml-auto flex h-5 w-5 items-center justify-center rounded-full border ${
            selected
              ? "border-[#D4AF37] bg-[#D4AF37] text-white"
              : "border-gray-300"
          }`}
        >
          {selected && <Check size={12} />}
        </div>
      </div>
    </button>
  );
}

function PaymentOption({
  selected,
  onClick,
  title,
  description,
  icon,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
        selected
          ? "border-[#D4AF37] bg-[#fffaf0]"
          : "border-[#e5dcc9] bg-white hover:border-[#D4AF37]"
      }`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
          selected
            ? "bg-[#D4AF37] text-white"
            : "bg-[#faf8f3] text-gray-500"
        }`}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold">{title}</p>

        <p className="mt-0.5 text-xs text-gray-500">
          {description}
        </p>
      </div>

      <div
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
          selected
            ? "border-[#D4AF37] bg-[#D4AF37] text-white"
            : "border-gray-300"
        }`}
      >
        {selected && <Check size={12} />}
      </div>
    </button>
  );
}

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
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-gray-500">{label}</span>

      <span
        className={`font-bold ${
          green ? "text-green-600" : "text-gray-800"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

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
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#faf8f3] text-[#b8941f]">
        {icon}
      </div>

      <div>
        <p className="text-xs font-bold">{title}</p>

        <p className="mt-0.5 text-[11px] leading-4 text-gray-400">
          {text}
        </p>
      </div>
    </div>
  );
}

function CheckoutSkeleton() {
  return (
    <div className="min-h-screen animate-pulse bg-[#faf8f3]">
      <div className="h-16 border-b border-[#eadfca] bg-white" />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="h-8 w-40 rounded-lg bg-gray-200" />

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_390px]">
          <div className="space-y-6">
            <div className="h-72 rounded-2xl bg-white" />
            <div className="h-52 rounded-2xl bg-white" />
            <div className="h-64 rounded-2xl bg-white" />
          </div>

          <div className="h-[560px] rounded-2xl bg-white" />
        </div>
      </div>
    </div>
  );
}

function formatCurrency(value: number) {
  return `₹${value.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
