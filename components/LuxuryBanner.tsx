<div className="relative flex flex-col h-full p-10 bg-[#fbf8f3] overflow-hidden">

  {/* Logo */}
  <Image
    src="/logo.png"
    alt="PrimeCart"
    width={180}
    height={60}
  />

  {/* Content */}
  <div className="mt-20">
    <div className="inline-flex px-4 py-2 rounded-full bg-[#f5e6b7] text-[#c99700] text-xs font-semibold">
      PREMIUM EXPERIENCE
    </div>

    <h1 className="mt-8 text-6xl font-black text-black leading-tight">
      Welcome
      <br />
      <span className="text-[#d4af37]">
        Back!
      </span>
    </h1>

    <p className="mt-5 text-gray-500 text-lg">
      Sign in to continue shopping
      <br />
      your favorite products
    </p>
  </div>

  {/* Product Showcase */}
  <div className="relative flex-1 mt-10">

    <Image
      src="/login/bag.png"
      alt="Bag"
      width={340}
      height={340}
      className="
      absolute
      bottom-8
      left-1/2
      -translate-x-1/2
      z-20
      "
    />

    <Image
      src="/login/perfume.png"
      alt="Perfume"
      width={110}
      height={110}
      className="
      absolute
      bottom-10
      right-10
      z-30
      "
    />

    <Image
      src="/login/watch.png"
      alt="Watch"
      width={120}
      height={120}
      className="
      absolute
      bottom-0
      left-10
      z-30
      "
    />

  </div>

</div>
