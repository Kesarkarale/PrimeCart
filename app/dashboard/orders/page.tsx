"use client";

import Link from "next/link";
import {
  Package,
  Truck,
  CheckCircle2,
  Clock3,
  XCircle,
  ChevronRight,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react";

const orders = [
  {
    id: "PC102458",
    date: "20 Aug 2026",
    status: "Delivered",
    statusType: "delivered",
    items: [
      {
        name: "Wireless Headphones",
        image: "/products/headphone.png",
        quantity: 1,
      },
    ],
    total: 2499,
    payment: "Paid",
  },
  {
    id: "PC102391",
    date: "18 Aug 2026",
    status: "Out for Delivery",
    statusType: "shipping",
    items: [
      {
        name: "Smart Watch",
        image: "/products/watch.png",
        quantity: 1,
      },
    ],
    total: 3299,
    payment: "Paid",
  },
  {
    id: "PC102244",
    date: "15 Aug 2026",
    status: "Processing",
    statusType: "processing",
    items: [
      {
        name: "Premium Backpack",
        image: "/products/bag.png",
        quantity: 1,
      },
    ],
    total: 1899,
    payment: "Paid",
  },
];

export default function OrdersPage() {
  return (
    <main className="min-h-screen bg-[#faf8f3] px-4 py-6 sm:px-6 lg:px-8 dark:bg-[#050505]">
      <div className="mx-auto max-w-[1250px]">

        {/* HEADER */}
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
              <Link
                href="/dashboard"
                className="transition hover:text-[#c99516]"
              >
                Home
              </Link>

              <ChevronRight size={15} />

              <span>Orders</span>
            </div>

            <h1 className="text-3xl font-black tracking-tight text-[#111] dark:text-white sm:text-4xl">
              My Orders
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Track and manage all your PrimeCart orders.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-[#dedede]
              bg-white
              px-5
              py-3
              text-sm
              font-bold
              text-[#333]
              transition
              hover:border-[#c99516]
              hover:text-[#c99516]
              dark:border-[#2a2a2a]
              dark:bg-[#111]
              dark:text-white
            "
          >
            <ArrowLeft size={17} />
            Continue Shopping
          </Link>
        </div>

        {/* ORDER SUMMARY */}
        <div className="mb-7 grid grid-cols-2 gap-4 md:grid-cols-4">

          <SummaryCard
            icon={<Package size={21} />}
            title="Total Orders"
            value="3"
          />

          <SummaryCard
            icon={<Clock3 size={21} />}
            title="Processing"
            value="1"
          />

          <SummaryCard
            icon={<Truck size={21} />}
            title="On the Way"
            value="1"
          />

          <SummaryCard
            icon={<CheckCircle2 size={21} />}
            title="Delivered"
            value="1"
          />

        </div>

        {/* ORDERS */}
        <div className="space-y-5">

          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
            />
          ))}

        </div>

        {/* EMPTY STATE — use when there are no orders */}
        {orders.length === 0 && (
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
              mb-5
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-full
              bg-[#faf3df]
              text-[#c99516]
            ">
              <ShoppingBag size={34} />
            </div>

            <h2 className="text-xl font-bold text-[#111] dark:text-white">
              No orders yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              You haven't placed any orders yet. Start shopping
              and your orders will appear here.
            </p>

            <Link
              href="/dashboard"
              className="
                mt-6
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

      </div>
    </main>
  );
}

/* =========================================================
   SUMMARY CARD
========================================================= */

function SummaryCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="
      rounded-2xl
      border
      border-[#e8e3d9]
      bg-white
      p-4
      shadow-sm
      dark:border-[#222]
      dark:bg-[#0d0d0d]
    ">
      <div className="mb-3 flex items-center justify-between">

        <div className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          bg-[#faf3df]
          text-[#c99516]
        ">
          {icon}
        </div>

      </div>

      <p className="text-xs font-medium text-gray-500">
        {title}
      </p>

      <p className="mt-1 text-2xl font-black text-[#111] dark:text-white">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   ORDER CARD
========================================================= */

function OrderCard({
  order,
}: {
  order: {
    id: string;
    date: string;
    status: string;
    statusType: string;
    items: {
      name: string;
      image: string;
      quantity: number;
    }[];
    total: number;
    payment: string;
  };
}) {
  return (
    <div className="
      overflow-hidden
      rounded-3xl
      border
      border-[#e8e3d9]
      bg-white
      shadow-sm
      dark:border-[#222]
      dark:bg-[#0d0d0d]
    ">

      {/* ORDER HEADER */}

      <div className="
        flex
        flex-col
        gap-4
        border-b
        border-[#eeeeee]
        bg-[#fcfbf8]
        px-5
        py-5
        sm:flex-row
        sm:items-center
        sm:justify-between
        sm:px-6
        dark:border-[#222]
        dark:bg-[#111]
      ">

        <div className="flex flex-wrap items-center gap-x-7 gap-y-3">

          <div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-gray-500">
              Order ID
            </p>

            <p className="mt-1 text-sm font-black text-[#111] dark:text-white">
              #{order.id}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-gray-500">
              Order Date
            </p>

            <p className="mt-1 text-sm font-semibold text-[#333] dark:text-gray-200">
              {order.date}
            </p>
          </div>

          <StatusBadge
            status={order.status}
            type={order.statusType}
          />

        </div>

        <div className="text-left sm:text-right">

          <p className="text-[11px] font-medium uppercase tracking-wide text-gray-500">
            Total Amount
          </p>

          <p className="mt-1 text-lg font-black text-[#111] dark:text-white">
            ₹{order.total.toLocaleString("en-IN")}
          </p>

        </div>

      </div>

      {/* PRODUCTS */}

      <div className="px-5 py-5 sm:px-6">

        <div className="space-y-4">

          {order.items.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4"
            >

              <div className="
                flex
                h-[78px]
                w-[78px]
                shrink-0
                items-center
                justify-center
                overflow-hidden
                rounded-2xl
                border
                border-[#eeeeee]
                bg-[#fafafa]
                dark:border-[#292929]
                dark:bg-[#151515]
              ">

                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-contain p-2"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />

              </div>

              <div className="min-w-0 flex-1">

                <h3 className="
                  truncate
                  text-sm
                  font-bold
                  text-[#111]
                  dark:text-white
                ">
                  {item.name}
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Quantity: {item.quantity}
                </p>

                <p className="mt-1 text-xs font-medium text-green-600">
                  {order.payment}
                </p>

              </div>

            </div>
          ))}

        </div>

        {/* ACTIONS */}

        <div className="
          mt-5
          flex
          flex-col
          gap-3
          border-t
          border-[#eeeeee]
          pt-5
          sm:flex-row
          sm:items-center
          sm:justify-between
          dark:border-[#222]
        ">

          <div className="flex items-center gap-2 text-xs text-gray-500">
            {order.statusType === "delivered" && (
              <>
                <CheckCircle2
                  size={16}
                  className="text-green-600"
                />
                Delivered successfully
              </>
            )}

            {order.statusType === "shipping" && (
              <>
                <Truck
                  size={16}
                  className="text-[#c99516]"
                />
                Your order is on the way
              </>
            )}

            {order.statusType === "processing" && (
              <>
                <Clock3
                  size={16}
                  className="text-[#c99516]"
                />
                Preparing your order
              </>
            )}
          </div>

          <div className="flex flex-wrap gap-2">

            <Link
              href={`/dashboard/orders/${order.id}`}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-[#dcdcdc]
                px-4
                py-2.5
                text-xs
                font-bold
                text-[#333]
                transition
                hover:border-[#c99516]
                hover:text-[#c99516]
                dark:border-[#333]
                dark:text-white
              "
            >
              View Details
              <ChevronRight size={15} />
            </Link>

            {order.statusType !== "delivered" && (
              <Link
                href={`/dashboard/orders/${order.id}/track`}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#d99d08]
                  px-4
                  py-2.5
                  text-xs
                  font-bold
                  text-white
                  transition
                  hover:bg-[#c88f05]
                "
              >
                <Truck size={15} />
                Track Order
              </Link>
            )}

            {order.statusType === "delivered" && (
              <button
                type="button"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#111]
                  px-4
                  py-2.5
                  text-xs
                  font-bold
                  text-white
                  transition
                  hover:bg-[#333]
                  dark:bg-white
                  dark:text-black
                  dark:hover:bg-gray-200
                "
              >
                Buy Again
              </button>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({
  status,
  type,
}: {
  status: string;
  type: string;
}) {
  const config = {
    delivered: {
      icon: <CheckCircle2 size={14} />,
      className:
        "bg-green-50 text-green-700 border-green-200",
    },

    shipping: {
      icon: <Truck size={14} />,
      className:
        "bg-blue-50 text-blue-700 border-blue-200",
    },

    processing: {
      icon: <Clock3 size={14} />,
      className:
        "bg-amber-50 text-amber-700 border-amber-200",
    },

    cancelled: {
      icon: <XCircle size={14} />,
      className:
        "bg-red-50 text-red-700 border-red-200",
    },
  };

  const current =
    config[type as keyof typeof config] ||
    config.processing;

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        rounded-full
        border
        px-3
        py-1.5
        text-[11px]
        font-bold
        ${current.className}
      `}
    >
      {current.icon}
      {status}
    </span>
  );
}
