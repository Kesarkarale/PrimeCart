"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Package } from "lucide-react";

export default function ProductPage() {
  const params = useParams();

  const productId = Array.isArray(params?.id)
    ? params.id[0]
    : params?.id;

  return (
    <main className="min-h-screen bg-white">

      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-5">

          <Link
            href="/dashboard/products"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-bold
              text-gray-600
              hover:text-[#D4AF37]
              transition
            "
          >
            <ArrowLeft size={18} />
            Back to Products
          </Link>

        </div>
      </header>

      {/* Product */}
      <section className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6 py-12">

        <div className="w-full max-w-2xl">

          <div
            className="
              bg-white
              border
              border-gray-100
              rounded-[32px]
              shadow-xl
              p-8
              sm:p-12
              text-center
            "
          >

            {/* Icon */}
            <div
              className="
                w-20
                h-20
                mx-auto
                rounded-3xl
                bg-[#D4AF37]/10
                flex
                items-center
                justify-center
              "
            >
              <Package
                size={38}
                className="text-[#D4AF37]"
              />
            </div>

            {/* Title */}
            <h1
              className="
                mt-7
                text-3xl
                sm:text-4xl
                font-black
                text-gray-900
              "
            >
              Product Page Working
            </h1>

            {/* Success */}
            <div
              className="
                inline-flex
                items-center
                gap-2
                mt-4
                px-4
                py-2
                rounded-full
                bg-green-50
                text-green-600
                text-sm
                font-bold
              "
            >
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Dynamic Route Connected
            </div>

            {/* ID */}
            <div className="mt-8">

              <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                Product ID
              </p>

              <div
                className="
                  mt-3
                  p-4
                  rounded-2xl
                  bg-gray-50
                  border
                  border-gray-100
                  break-all
                  text-[#D4AF37]
                  font-black
                "
              >
                {productId || "No Product ID Found"}
              </div>

            </div>

            {/* Route */}
            <div className="mt-6">

              <p className="text-sm text-gray-400">
                Current Route
              </p>

              <p className="mt-2 text-sm font-bold text-gray-700 break-all">
                /dashboard/product/{productId}
              </p>

            </div>

            {/* Info */}
            <div
              className="
                mt-8
                p-5
                rounded-2xl
                bg-gray-50
                text-left
              "
            >

              <p className="font-bold text-gray-900">
                ✓ Dynamic `[id]` route is working
              </p>

              <p className="text-sm text-gray-500 mt-2 leading-6">
                This page is receiving the product ID from
                the URL correctly. The next step is to fetch
                this product from Supabase and display its
                complete product details.
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}
