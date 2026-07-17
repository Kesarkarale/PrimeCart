
import Image from "next/image";
import { ShoppingBag, Truck, ShieldCheck, RotateCcw, Headphones } from "lucide-react";

export default function LuxuryBanner() {
  return (
    <div
      className="
      relative
      overflow-hidden
      bg-gradient-to-br
      from-[#f8f1e5]
      via-[#fffaf2]
      to-[#ead8b8]
      p-8
      lg:p-12
      flex
      flex-col
      justify-between
      "
    >
      {/* Glow Effects */}

      <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-[#D4AF37]/20 blur-[120px] rounded-full" />

      <div className="absolute bottom-[-50px] right-[-50px] w-80 h-80 bg-[#D4AF37]/10 blur-[120px] rounded-full" />

      {/* Logo */}

      <div className="relative z-10 flex items-center gap-4">
        <div
          className="
          w-14
          h-14
          rounded-2xl
          bg-[#D4AF37]
          flex
          items-center
          justify-center
          shadow-lg
          "
        >
          <ShoppingBag className="text-white w-7 h-7" />
        </div>

        <div>
          <h2 className="text-3xl font-black text-gray-900">
            PrimeCart
          </h2>

          <p className="text-gray-500">
            Luxury Shopping
          </p>
        </div>
      </div>

      {/* Content */}

      <div className="relative z-10 mt-10">
        <p
          className="
          text-[#B68B2C]
          tracking-[5px]
          text-sm
          font-semibold
          "
        >
          PREMIUM COLLECTION
        </p>

        <h1
          className="
          mt-4
          text-5xl
          lg:text-6xl
          font-black
          leading-tight
          text-gray-900
          "
        >
          Discover
          <br />
          Luxury
          <br />
          Shopping
        </h1>

        <p
          className="
          mt-6
          text-gray-600
          text-lg
          leading-8
          max-w-md
          "
        >
          Explore premium bags, watches,
          perfumes and luxury accessories
          crafted for modern lifestyles.
        </p>
      </div>

      {/* Products */}

      <div className="relative h-[420px] mt-8">

        <Image
          src="/login/bag.png"
          alt="Bag"
          width={280}
          height={280}
          className="
          absolute
          left-0
          top-8
          drop-shadow-2xl
          hover:scale-105
          transition
          "
        />

        <Image
          src="/login/shoes.png"
          alt="Shoes"
          width={250}
          height={250}
          className="
          absolute
          right-0
          top-0
          drop-shadow-2xl
          hover:scale-105
          transition
          "
        />

        <Image
          src="/login/perfume.png"
          alt="Perfume"
          width={140}
          height={140}
          className="
          absolute
          left-40
          bottom-0
          drop-shadow-xl
          "
        />

        <Image
          src="/login/watch.png"
          alt="Watch"
          width={160}
          height={160}
          className="
          absolute
          right-10
          bottom-0
          drop-shadow-xl
          "
        />
      </div>

      {/* Features */}

      <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
        <div className="flex items-center gap-2 text-gray-700">
          <Truck size={18} className="text-[#D4AF37]" />
          Free Delivery
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <ShieldCheck size={18} className="text-[#D4AF37]" />
          Secure Payment
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <RotateCcw size={18} className="text-[#D4AF37]" />
          Easy Return
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <Headphones size={18} className="text-[#D4AF37]" />
          24/7 Support
        </div>
      </div>
    </div>
  );
}
