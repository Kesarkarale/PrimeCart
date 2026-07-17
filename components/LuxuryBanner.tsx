import Image from "next/image";

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
      p-10
      lg:p-14
      flex
      flex-col
      justify-between
      "
    >
      {/* Glow */}
      <div className="absolute top-[-80px] left-[-80px] w-80 h-80 bg-[#D4AF37]/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#D4AF37]/10 blur-[100px] rounded-full" />

      {/* Logo */}
      <div className="relative z-10">
        <h1 className="text-4xl font-black text-gray-900">
          PrimeCart
        </h1>

        <p className="text-gray-500 mt-2">
          Luxury Shopping Experience
        </p>
      </div>

      {/* Heading */}
      <div className="relative z-10 mt-10">
        <p className="text-[#B68B2C] tracking-[5px] font-semibold text-sm">
          PREMIUM COLLECTION
        </p>

        <h2 className="text-5xl font-black text-gray-900 leading-tight mt-4">
          Discover
          <br />
          Luxury
          <br />
          Shopping
        </h2>

        <p className="text-gray-600 mt-5 max-w-md">
          Shop premium bags, watches, perfumes and fashion
          accessories with exclusive offers.
        </p>
      </div>

      {/* Product Images */}
      <div className="relative h-[420px] mt-10">
        <Image
          src="/login/bag.png"
          alt="Bag"
          width={280}
          height={280}
          className="absolute left-0 top-10 drop-shadow-2xl"
        />

        <Image
          src="/login/shoes.png"
          alt="Shoes"
          width={260}
          height={260}
          className="absolute right-0 top-0 drop-shadow-2xl"
        />

        <Image
          src="/login/perfume.png"
          alt="Perfume"
          width={140}
          height={140}
          className="absolute left-40 bottom-0 drop-shadow-xl"
        />

        <Image
          src="/login/watch.png"
          alt="Watch"
          width={160}
          height={160}
          className="absolute right-14 bottom-0 drop-shadow-xl"
        />
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 gap-4 mt-6 text-sm text-gray-700">
        <div>🚚 Free Delivery</div>
        <div>🔒 Secure Payment</div>
        <div>↩ Easy Return</div>
        <div>🎧 24/7 Support</div>
      </div>
    </div>
  );
}
