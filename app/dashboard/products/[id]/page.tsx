"use client";

import { useParams } from "next/navigation";

export default function ProductPage() {
  const params = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-4xl font-black text-black">
          PRODUCT PAGE WORKING ✅
        </h1>

        <p className="mt-4 text-gray-500">
          Product ID:
        </p>

        <p className="mt-2 text-[#D4AF37] font-bold break-all">
          {String(params.id)}
        </p>
      </div>
    </div>
  );
}
