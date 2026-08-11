"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Star,
  ShoppingCart,
  Truck,
  ShieldCheck,
  Minus,
  Plus,
  ArrowLeft,
  Check,
  RotateCcw,
  PackageCheck,
  Loader2,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Product = {
  id: string;
  category_id: string | null;
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  price: number;
  original_price: number | null;
  stock: number | null;
  image_url: string | null;
  brand: string | null;
  rating: number | null;
  reviews_count: number | null;
  is_featured: boolean;
  is_flash_sale: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

type RelatedProduct = {
  id: string;
  name: string;
  price: number;
  original_price: number | null;
  image_url: string | null;
  rating: number | null;
  reviews_count: number | null;
  category_id: string | null;
};

export default function ProductDetails() {
  const params = useParams();
  const router = useRouter();

  const supabase = createClient();

  const productId = Array.isArray(params.id)
    ? params.id[0]
    : params.id;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<
    RelatedProduct[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [relatedLoading, setRelatedLoading] = useState(true);

  const [activeImage, setActiveImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();

      console.log("PRODUCT DETAILS:", data);
      console.log("PRODUCT DETAILS ERROR:", error);

      if (error || !data) {
        setProduct(null);
        setLoading(false);
        return;
      }

      setProduct(data);
      setActiveImage(
        data.image_url || "/products/product-placeholder.png"
      );

      setLoading(false);

      // RELATED PRODUCTS
      setRelatedLoading(true);

      let relatedQuery = supabase
        .from("products")
        .select(
          "id,name,price,original_price,image_url,rating,reviews_count,category_id"
        )
        .eq("is_active", true)
        .neq("id", data.id)
        .limit(8);

      if (data.category_id) {
        relatedQuery = relatedQuery.eq(
          "category_id",
          data.category_id
        );
      }

      const { data: relatedData, error: relatedError } =
        await relatedQuery;

      console.log("RELATED PRODUCTS:", relatedData);
      console.log("RELATED ERROR:", relatedError);

      if (!relatedError) {
        setRelatedProducts(relatedData || []);
      }

      setRelatedLoading(false);
    };

    fetchProduct();
  }, [productId]);

  const increaseQuantity = () => {
    if (!product) return;

    const maxStock = product.stock ?? 99;

    setQuantity((prev) => Math.min(prev + 1, maxStock));
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const addToCart = async () => {
    if (!product) return;

    setCartLoading(true);

    console.log("ADD TO CART:", {
      product_id: product.id,
      quantity,
    });

    // Cart functionality can be connected to cart table/context here.
    setTimeout(() => {
      setCartLoading(false);
      alert(`${product.name} added to cart`);
    }, 500);
  };

  const buyNow = () => {
    if (!product) return;

    router.push(
      `/checkout?product=${product.id}&quantity=${quantity}`
    );
  };

  const discount =
    product?.original_price &&
    product.original_price > product.price
      ? Math.round(
          ((product.original_price - product.price) /
            product.original_price) *
            100
        )
      : 0;

  if (loading) {
    return (
      <main className="min-h-screen bg-[#faf8f3] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2
            size={42}
            className="animate-spin text-[#D4AF37]"
          />

          <p className="text-gray-600 font-semibold">
            Loading Product...
          </p>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-[#faf8f3] flex items-center justify-center px-6">
        <div className="text-center">
          <div className="text-6xl mb-5">🛍️</div>

          <h1 className="text-3xl font-black">
            Product Not Found
          </h1>

          <p className="text-gray-500 mt-2">
            The product you are looking for does not exist.
          </p>

          <Link
            href="/dashboard"
            className="
              inline-flex
              items-center
              gap-2
              mt-6
              px-6
              py-3
              rounded-xl
              bg-black
              text-white
              font-bold
              hover:bg-[#D4AF37]
              transition
            "
          >
            <ArrowLeft size={18} />
            Back To Shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf8f3]">

      {/* TOP BACK NAVIGATION */}

      <div className="max-w-7xl mx-auto px-6 pt-8">

        <Link
          href="/dashboard"
          className="
            inline-flex
            items-center
            gap-2
            text-gray-600
            hover:text-black
            font-semibold
            transition
          "
        >
          <ArrowLeft size={19} />
          Back To Shopping
        </Link>

      </div>


      {/* PRODUCT MAIN SECTION */}

      <section className="max-w-7xl mx-auto px-6 py-8">

        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10">


          {/* ========================= */}
          {/* LEFT - PRODUCT IMAGES */}
          {/* ========================= */}

          <div>

            <div
              className="
                relative
                h-[420px]
                sm:h-[520px]
                bg-white
                rounded-[30px]
                border
                border-gray-200
                overflow-hidden
                shadow-sm
              "
            >

              {/* FLASH SALE */}

              {product.is_flash_sale && (
                <div
                  className="
                    absolute
                    top-5
                    left-5
                    z-10
                    bg-red-500
                    text-white
                    px-4
                    py-2
                    rounded-full
                    text-sm
                    font-black
                  "
                >
                  FLASH SALE
                </div>
              )}


              {/* WISHLIST */}

              <button
                onClick={() => setWishlist(!wishlist)}
                className="
                  absolute
                  top-5
                  right-5
                  z-10
                  w-12
                  h-12
                  rounded-full
                  bg-white
                  shadow-lg
                  flex
                  items-center
                  justify-center
                  hover:scale-105
                  transition
                "
              >

                <Heart
                  size={23}
                  className={
                    wishlist
                      ? "fill-red-500 text-red-500"
                      : "text-gray-700"
                  }
                />

              </button>


              {/* MAIN IMAGE */}

              {activeImage ? (
                <Image
                  src={activeImage}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="
                    object-contain
                    p-8
                    sm:p-12
                    hover:scale-105
                    transition
                    duration-500
                  "
                />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  No Image Available
                </div>
              )}

            </div>


            {/* IMAGE THUMBNAILS */}

            <div className="flex gap-4 mt-5">

              <button
                onClick={() =>
                  setActiveImage(
                    product.image_url ||
                      "/products/product-placeholder.png"
                  )
                }
                className={`
                  relative
                  w-20
                  h-20
                  rounded-2xl
                  bg-white
                  border-2
                  overflow-hidden
                  transition
                  ${
                    activeImage === product.image_url
                      ? "border-[#D4AF37]"
                      : "border-gray-200"
                  }
                `}
              >

                {product.image_url && (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    sizes="80px"
                    className="object-contain p-2"
                  />
                )}

              </button>

            </div>

          </div>


          {/* ========================= */}
          {/* RIGHT - PRODUCT DETAILS */}
          {/* ========================= */}

          <div className="bg-white rounded-[30px] border border-gray-200 p-6 sm:p-8 shadow-sm">

            {/* BRAND */}

            {product.brand && (
              <p className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider">
                {product.brand}
              </p>
            )}


            {/* PRODUCT NAME */}

            <h1
              className="
                text-3xl
                sm:text-4xl
                font-black
                text-gray-900
                mt-2
                leading-tight
              "
            >
              {product.name}
            </h1>


            {/* SHORT DESCRIPTION */}

            {product.short_description && (
              <p className="text-gray-500 mt-3 leading-6">
                {product.short_description}
              </p>
            )}


            {/* RATING */}

            <div className="flex items-center gap-3 mt-5">

              <div
                className="
                  flex
                  items-center
                  gap-1
                  bg-green-600
                  text-white
                  px-3
                  py-1.5
                  rounded-lg
                  font-bold
                  text-sm
                "
              >

                <Star
                  size={15}
                  className="fill-white"
                />

                {product.rating ?? 4.5}

              </div>

              <span className="text-gray-500 text-sm">
                {product.reviews_count ?? 0} Reviews
              </span>

            </div>


            <div className="h-px bg-gray-200 my-6" />


            {/* PRICE */}

            <div>

              <div className="flex items-center gap-3 flex-wrap">

                <span className="text-4xl font-black text-gray-900">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>

                {product.original_price &&
                  product.original_price > product.price && (
                    <span className="text-lg text-gray-400 line-through">
                      ₹
                      {product.original_price.toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  )}

              </div>


              {discount > 0 && (
                <p className="text-green-600 font-bold mt-2">
                  {discount}% OFF
                </p>
              )}

            </div>


            {/* STOCK */}

            <div className="mt-5">

              {product.stock && product.stock > 0 ? (
                <div className="flex items-center gap-2 text-green-600 font-bold">

                  <Check size={18} />

                  In Stock

                  <span className="text-gray-500 font-normal">
                    ({product.stock} available)
                  </span>

                </div>
              ) : (
                <div className="text-red-500 font-bold">
                  Out of Stock
                </div>
              )}

            </div>


            {/* DESCRIPTION */}

            {product.description && (
              <div className="mt-7">

                <h2 className="text-xl font-black mb-2">
                  About This Product
                </h2>

                <p className="text-gray-600 leading-7">
                  {product.description}
                </p>

              </div>
            )}


            {/* QUANTITY */}

            {product.stock && product.stock > 0 && (
              <div className="mt-7">

                <h3 className="font-bold mb-3">
                  Quantity
                </h3>

                <div
                  className="
                    inline-flex
                    items-center
                    border
                    border-gray-300
                    rounded-xl
                    overflow-hidden
                    bg-white
                  "
                >

                  <button
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="
                      w-12
                      h-12
                      flex
                      items-center
                      justify-center
                      hover:bg-gray-100
                      disabled:opacity-40
                    "
                  >
                    <Minus size={18} />
                  </button>

                  <span
                    className="
                      w-14
                      text-center
                      font-bold
                    "
                  >
                    {quantity}
                  </span>

                  <button
                    onClick={increaseQuantity}
                    disabled={
                      quantity >= (product.stock ?? 99)
                    }
                    className="
                      w-12
                      h-12
                      flex
                      items-center
                      justify-center
                      hover:bg-gray-100
                      disabled:opacity-40
                    "
                  >
                    <Plus size={18} />
                  </button>

                </div>

              </div>
            )}


            {/* ACTION BUTTONS */}

            <div className="grid sm:grid-cols-[auto_1fr_1fr] gap-3 mt-7">

              {/* WISHLIST */}

              <button
                onClick={() => setWishlist(!wishlist)}
                className="
                  h-14
                  w-full
                  sm:w-14
                  rounded-2xl
                  border
                  border-gray-300
                  flex
                  items-center
                  justify-center
                  hover:border-[#D4AF37]
                  transition
                "
              >

                <Heart
                  size={23}
                  className={
                    wishlist
                      ? "fill-red-500 text-red-500"
                      : ""
                  }
                />

              </button>


              {/* ADD CART */}

              <button
                onClick={addToCart}
                disabled={
                  cartLoading ||
                  !product.stock ||
                  product.stock <= 0
                }
                className="
                  h-14
                  rounded-2xl
                  bg-[#D4AF37]
                  hover:bg-black
                  disabled:bg-gray-300
                  text-white
                  font-black
                  flex
                  items-center
                  justify-center
                  gap-2
                  transition
                "
              >

                {cartLoading ? (
                  <Loader2
                    size={20}
                    className="animate-spin"
                  />
                ) : (
                  <ShoppingCart size={20} />
                )}

                Add To Cart

              </button>


              {/* BUY NOW */}

              <button
                onClick={buyNow}
                disabled={!product.stock || product.stock <= 0}
                className="
                  h-14
                  rounded-2xl
                  bg-black
                  hover:bg-[#D4AF37]
                  disabled:bg-gray-300
                  text-white
                  font-black
                  transition
                "
              >
                Buy Now
              </button>

            </div>


            {/* SERVICE FEATURES */}

            <div className="grid sm:grid-cols-2 gap-3 mt-7">

              <div
                className="
                  rounded-2xl
                  bg-[#faf8f3]
                  border
                  p-4
                  flex
                  gap-3
                "
              >

                <Truck
                  className="text-[#D4AF37] shrink-0"
                  size={23}
                />

                <div>

                  <p className="font-bold">
                    Free Delivery
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Fast & reliable delivery
                  </p>

                </div>

              </div>


              <div
                className="
                  rounded-2xl
                  bg-[#faf8f3]
                  border
                  p-4
                  flex
                  gap-3
                "
              >

                <ShieldCheck
                  className="text-[#D4AF37] shrink-0"
                  size={23}
                />

                <div>

                  <p className="font-bold">
                    Secure Payment
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    100% secure checkout
                  </p>

                </div>

              </div>


              <div
                className="
                  rounded-2xl
                  bg-[#faf8f3]
                  border
                  p-4
                  flex
                  gap-3
                "
              >

                <RotateCcw
                  className="text-[#D4AF37] shrink-0"
                  size={23}
                />

                <div>

                  <p className="font-bold">
                    Easy Returns
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Hassle-free returns
                  </p>

                </div>

              </div>


              <div
                className="
                  rounded-2xl
                  bg-[#faf8f3]
                  border
                  p-4
                  flex
                  gap-3
                "
              >

                <PackageCheck
                  className="text-[#D4AF37] shrink-0"
                  size={23}
                />

                <div>

                  <p className="font-bold">
                    Quality Assured
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Genuine premium products
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* ========================= */}
        {/* PRODUCT INFORMATION */}
        {/* ========================= */}

        <div
          className="
            mt-10
            bg-white
            rounded-[30px]
            border
            border-gray-200
            p-6
            sm:p-8
          "
        >

          <h2 className="text-2xl font-black mb-6">
            Product Information
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

            <div className="bg-gray-50 rounded-2xl p-5">
              <p className="text-sm text-gray-500">
                Brand
              </p>

              <p className="font-bold mt-1">
                {product.brand || "PrimeCart"}
              </p>
            </div>


            <div className="bg-gray-50 rounded-2xl p-5">
              <p className="text-sm text-gray-500">
                Product ID
              </p>

              <p className="font-bold mt-1 text-sm break-all">
                {product.id}
              </p>
            </div>


            <div className="bg-gray-50 rounded-2xl p-5">
              <p className="text-sm text-gray-500">
                Availability
              </p>

              <p className="font-bold mt-1">
                {product.stock && product.stock > 0
                  ? "In Stock"
                  : "Out of Stock"}
              </p>
            </div>


            <div className="bg-gray-50 rounded-2xl p-5">
              <p className="text-sm text-gray-500">
                Reviews
              </p>

              <p className="font-bold mt-1">
                {product.reviews_count ?? 0}
              </p>
            </div>

          </div>

        </div>


        {/* ========================= */}
        {/* CUSTOMER REVIEWS */}
        {/* ========================= */}

        <div
          className="
            mt-8
            bg-white
            rounded-[30px]
            border
            border-gray-200
            p-6
            sm:p-8
          "
        >

          <h2 className="text-2xl font-black">
            Customer Reviews
          </h2>


          <div className="mt-6 flex flex-col sm:flex-row gap-6">

            <div
              className="
                min-w-[180px]
                rounded-2xl
                bg-gray-50
                p-6
                text-center
              "
            >

              <p className="text-5xl font-black">
                {product.rating ?? 4.5}
              </p>

              <div className="flex justify-center gap-1 mt-3">

                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={17}
                    className="
                      fill-yellow-400
                      text-yellow-400
                    "
                  />
                ))}

              </div>

              <p className="text-sm text-gray-500 mt-2">
                {product.reviews_count ?? 0} Reviews
              </p>

            </div>


            <div className="flex-1 space-y-4">

              <div className="border rounded-2xl p-5">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="font-bold">
                      Verified Customer
                    </p>

                    <p className="text-xs text-gray-400">
                      Verified Purchase
                    </p>
                  </div>

                  <div className="flex text-yellow-400">
                    ★★★★★
                  </div>

                </div>

                <p className="text-gray-600 mt-3">
                  Great quality product. Exactly as described
                  and delivery was fast.
                </p>

              </div>


              <div className="border rounded-2xl p-5">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="font-bold">
                      Verified Customer
                    </p>

                    <p className="text-xs text-gray-400">
                      Verified Purchase
                    </p>
                  </div>

                  <div className="flex text-yellow-400">
                    ★★★★★
                  </div>

                </div>

                <p className="text-gray-600 mt-3">
                  Very happy with the product. Good packaging
                  and premium quality.
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* ========================= */}
        {/* RELATED PRODUCTS */}
        {/* ========================= */}

        <div className="mt-12">

          <div className="flex items-end justify-between mb-6">

            <div>

              <h2 className="text-3xl font-black">
                Related Products
              </h2>

              <p className="text-gray-500 mt-1">
                You may also like these products
              </p>

            </div>

            <Link
              href="/dashboard/products"
              className="
                text-[#D4AF37]
                font-bold
                hover:underline
              "
            >
              View All →
            </Link>

          </div>


          {relatedLoading ? (

            <div className="flex justify-center py-10">

              <Loader2
                className="
                  animate-spin
                  text-[#D4AF37]
                "
                size={30}
              />

            </div>

          ) : relatedProducts.length === 0 ? (

            <div className="bg-white border rounded-2xl p-8 text-center">
              <p className="text-gray-500">
                No related products available.
              </p>
            </div>

          ) : (

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-4
                gap-6
              "
            >

              {relatedProducts.map((item) => {

                const itemDiscount =
                  item.original_price &&
                  item.original_price > item.price
                    ? Math.round(
                        ((item.original_price -
                          item.price) /
                          item.original_price) *
                          100
                      )
                    : 0;

                return (
                  <Link
                    key={item.id}
                    href={`/product/dashboard/${item.id}`}
                    className="
                      group
                      bg-white
                      rounded-3xl
                      border
                      border-gray-200
                      overflow-hidden
                      hover:shadow-xl
                      transition
                    "
                  >

                    <div
                      className="
                        relative
                        h-56
                        bg-gray-50
                      "
                    >

                      {item.image_url ? (
                        <Image
                          src={item.image_url}
                          alt={item.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="
                            object-contain
                            p-6
                            group-hover:scale-110
                            transition
                            duration-500
                          "
                        />
                      ) : (
                        <div className="h-full flex items-center justify-center text-gray-400">
                          No Image
                        </div>
                      )}

                      {itemDiscount > 0 && (
                        <span
                          className="
                            absolute
                            top-3
                            left-3
                            bg-red-500
                            text-white
                            text-xs
                            font-bold
                            px-3
                            py-1
                            rounded-full
                          "
                        >
                          {itemDiscount}% OFF
                        </span>
                      )}

                    </div>


                    <div className="p-5">

                      <h3
                        className="
                          font-bold
                          text-lg
                          line-clamp-2
                          group-hover:text-[#D4AF37]
                          transition
                        "
                      >
                        {item.name}
                      </h3>


                      <div className="flex items-center gap-2 mt-3">

                        <span
                          className="
                            flex
                            items-center
                            gap-1
                            bg-green-600
                            text-white
                            px-2
                            py-1
                            rounded-lg
                            text-xs
                            font-bold
                          "
                        >

                          <Star
                            size={12}
                            className="fill-white"
                          />

                          {item.rating ?? 4.5}

                        </span>

                        <span className="text-xs text-gray-500">
                          ({item.reviews_count ?? 0})
                        </span>

                      </div>


                      <div className="flex items-center gap-2 mt-3">

                        <span className="text-xl font-black">
                          ₹{item.price.toLocaleString("en-IN")}
                        </span>

                        {item.original_price &&
                          item.original_price > item.price && (
                            <span className="text-sm text-gray-400 line-through">
                              ₹
                              {item.original_price.toLocaleString(
                                "en-IN"
                              )}
                            </span>
                          )}

                      </div>

                    </div>

                  </Link>
                );
              })}

            </div>

          )}

        </div>

      </section>

    </main>
  );
}
