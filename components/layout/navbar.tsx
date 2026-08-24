"use client";

import Link from "next/link";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  ChevronDown,
  Menu,
  X,
  LogOut,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function Navbar() {
  const router = useRouter();

  const [openCategory, setOpenCategory] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState("");

  // =========================================================
  // AUTH STATE
  // =========================================================

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  // =========================================================
  // CATEGORIES
  // IMPORTANT:
  // All category links use /dashboard/category/[slug]
  // =========================================================

  const categories = [
    {
      name: "Electronics",
      slug: "electronics",
    },
    {
      name: "Fashion",
      slug: "fashion",
    },
    {
      name: "Mobiles",
      slug: "mobiles",
    },
    {
      name: "Beauty",
      slug: "beauty",
    },
    {
      name: "Home & Living",
      slug: "home-living",
    },
    {
      name: "Kitchen",
      slug: "kitchen",
    },
    {
      name: "Sports",
      slug: "sports",
    },
  ];

  // =========================================================
  // NAVIGATION
  // =========================================================

 const nav = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Categories",
    link: "/dashboard/categories",
  },
  {
    name: "Deals",
    link: "/dashboard/deals",
  },
  {
    name: "New Arrivals",
    link: "/dashboard/products/new",
  },
  {
    name: "Best Sellers",
    link: "/dashboard/products/best",
  },
  {
    name: "Electronics",
    link: "/dashboard/category/electronics",
  },
  {
    name: "Fashion",
    link: "/dashboard/category/fashion",
  },
  {
    name: "Home & Living",
    link: "/dashboard/category/home-living",
  },
  {
    name: "Beauty",
    link: "/dashboard/category/beauty",
  },
];

  // =========================================================
  // GET LOGGED-IN USER
  // =========================================================

  useEffect(() => {
    const supabase = createClient();

    let mounted = true;

    function getDisplayName(user: any) {
      const metadata = user?.user_metadata || {};

      const fullName =
        metadata.full_name ||
        metadata.name ||
        metadata.fullName ||
        metadata.display_name ||
        "";

      const email = user?.email || "";

      if (fullName) {
        return String(fullName);
      }

      if (email) {
        return email
          .split("@")[0]
          .replace(/[._-]/g, " ")
          .replace(/\b\w/g, (letter: string) =>
            letter.toUpperCase()
          );
      }

      return "My Account";
    }

    async function loadUser() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!mounted) return;

        if (!user) {
          setLoggedIn(false);
          setUserName("");
          setUserEmail("");
          setAuthLoading(false);
          return;
        }

        setLoggedIn(true);
        setUserEmail(user.email || "");
        setUserName(getDisplayName(user));
      } catch (error) {
        console.error(
          "Navbar user loading error:",
          error
        );

        if (mounted) {
          setLoggedIn(false);
          setUserName("");
          setUserEmail("");
        }
      } finally {
        if (mounted) {
          setAuthLoading(false);
        }
      }
    }

    loadUser();

    // =======================================================
    // AUTH LISTENER
    // =======================================================

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!mounted) return;

        const user = session?.user;

        if (!user) {
          setLoggedIn(false);
          setUserName("");
          setUserEmail("");
          return;
        }

        const metadata = user.user_metadata || {};

        const fullName =
          metadata.full_name ||
          metadata.name ||
          metadata.fullName ||
          metadata.display_name ||
          "";

        const email = user.email || "";

        setLoggedIn(true);
        setUserEmail(email);

        if (fullName) {
          setUserName(String(fullName));
        } else if (email) {
          setUserName(
            email
              .split("@")[0]
              .replace(/[._-]/g, " ")
              .replace(/\b\w/g, (letter) =>
                letter.toUpperCase()
              )
          );
        } else {
          setUserName("My Account");
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // =========================================================
  // SEARCH
  // =========================================================

  function handleSearch() {
    const value = search.trim();

    if (!value) return;

    setOpenCategory(false);

    router.push(
      `/search?q=${encodeURIComponent(value)}`
    );
  }

  // =========================================================
  // LOGOUT
  // =========================================================

  async function handleLogout() {
    try {
      const supabase = createClient();

      await supabase.auth.signOut();

      setLoggedIn(false);
      setUserName("");
      setUserEmail("");

      setMobile(false);
      setOpenCategory(false);

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(
        "Logout error:",
        error
      );
    }
  }

  // =========================================================
  // CATEGORY CLICK
  // =========================================================

  function handleCategoryClick() {
    setOpenCategory(false);
    setMobile(false);
  }

  // =========================================================
  // DISPLAY NAME
  // =========================================================

  const displayName =
    userName.length > 22
      ? `${userName.slice(0, 22)}...`
      : userName;

  // =========================================================
  // UI
  // =========================================================

  return (
    <header
      className="
        sticky
        top-0
        z-50
        border-b
        border-gray-200
        bg-white
      "
    >
      {/* =====================================================
          MAIN NAV
      ====================================================== */}

      <div
        className="
          mx-auto
          flex
          h-[75px]
          max-w-[1400px]
          items-center
          gap-8
          px-6
        "
      >
        {/* ===================================================
            LOGO
        ==================================================== */}

        <Link
          href="/"
          className="
            min-w-[210px]
            shrink-0
          "
        >
          <h1
            className="
              text-3xl
              font-black
              text-black
            "
          >
            Prime
            <span className="text-[#D4AF37]">
              Cart
            </span>
          </h1>

          <p
            className="
              text-xs
              text-gray-500
            "
          >
            Shop More. Pay Less.
          </p>
        </Link>

        {/* ===================================================
            DESKTOP SEARCH
        ==================================================== */}

        <div
          className="
            hidden
            h-11
            flex-1
            lg:flex
          "
        >
          {/* CATEGORY SELECTOR */}

          <div className="relative">
            <button
              onClick={() =>
                setOpenCategory(
                  !openCategory
                )
              }
              type="button"
              className="
                flex
                h-11
                items-center
                gap-2
                rounded-l-xl
                border
                border-gray-300
                bg-gray-50
                px-5
                text-sm
                font-semibold
                text-gray-800
                transition
                hover:bg-gray-100
              "
            >
              All Categories

              <ChevronDown
                size={16}
                className={
                  openCategory
                    ? "rotate-180 transition"
                    : "transition"
                }
              />
            </button>

            {/* CATEGORY DROPDOWN */}

            {openCategory && (
              <div
                className="
                  absolute
                  left-0
                  top-12
                  z-[100]
                  w-60
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  p-2
                  shadow-2xl
                "
              >
                {/* ALL PRODUCTS */}

                <Link
                  href="/dashboard/products"
                  onClick={handleCategoryClick}
                  className="
                    mb-1
                    block
                    rounded-xl
                    px-4
                    py-3
                    text-sm
                    font-semibold
                    text-gray-800
                    transition
                    hover:bg-[#D4AF37]
                    hover:text-white
                  "
                >
                  All Products
                </Link>

                {/* CATEGORIES */}

              {categories.map((cat) => (
  <Link
    key={cat.slug}
    href={`/dashboard/category/${cat.slug}`}
    onClick={() => setOpenCategory(false)}
    className="
      block
      rounded-lg
      px-4
      py-3
      text-sm
      font-medium
      text-gray-800
      transition
      hover:bg-[#D4AF37]
      hover:text-white
    "
  >
    {cat.name}
  </Link>
))}
              </div>
            )}
          </div>

          {/* SEARCH INPUT */}

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            placeholder="Search for products, brands and more..."
            className="
              min-w-0
              flex-1
              border-y
              border-gray-300
              px-5
              text-sm
              text-gray-800
              outline-none
              placeholder:text-gray-400
            "
          />

          {/* SEARCH BUTTON */}

          <button
            onClick={handleSearch}
            type="button"
            className="
              flex
              w-12
              shrink-0
              items-center
              justify-center
              rounded-r-xl
              bg-[#D4AF37]
              text-white
              transition
              hover:bg-black
            "
          >
            <Search size={20} />
          </button>
        </div>

        {/* ===================================================
            RIGHT SIDE
        ==================================================== */}

        <div
          className="
            flex
            shrink-0
            items-center
            gap-5
          "
        >
          {/* =================================================
              ACCOUNT
          ================================================== */}

          {authLoading ? (
            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <User size={25} />

              <div className="hidden sm:block">
                <p
                  className="
                    text-sm
                    font-semibold
                  "
                >
                  Account
                </p>

                <p
                  className="
                    text-xs
                    text-gray-500
                  "
                >
                  Loading...
                </p>
              </div>
            </div>
          ) : loggedIn ? (
            <div className="relative group">
              <button
                type="button"
                className="
                  flex
                  items-center
                  gap-2
                  text-left
                "
              >
                {/* USER ICON */}

                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#D4AF37]
                    text-white
                  "
                >
                  <User size={21} />
                </div>

                {/* NAME */}

                <div
                  className="
                    hidden
                    max-w-[170px]
                    sm:block
                  "
                >
                  <p
                    className="
                      truncate
                      text-sm
                      font-semibold
                      text-gray-900
                    "
                  >
                    {displayName}
                  </p>

                  <p
                    className="
                      text-xs
                      text-gray-500
                    "
                  >
                    My Account
                  </p>
                </div>

                <ChevronDown
                  size={15}
                  className="
                    hidden
                    sm:block
                  "
                />
              </button>

              {/* ACCOUNT DROPDOWN */}

              <div
                className="
                  invisible
                  absolute
                  right-0
                  top-12
                  z-[100]
                  w-64
                  translate-y-2
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  p-3
                  opacity-0
                  shadow-2xl
                  transition-all
                  group-hover:visible
                  group-hover:translate-y-0
                  group-hover:opacity-100
                "
              >
                {/* USER INFO */}

                <div
                  className="
                    border-b
                    border-gray-100
                    px-3
                    pb-3
                  "
                >
                  <p
                    className="
                      truncate
                      text-sm
                      font-bold
                      text-gray-900
                    "
                  >
                    {userName}
                  </p>

                  {userEmail && (
                    <p
                      className="
                        mt-1
                        truncate
                        text-xs
                        text-gray-500
                      "
                    >
                      {userEmail}
                    </p>
                  )}
                </div>

                {/* PROFILE */}

                <Link
                  href="/dashboard/profile"
                  className="
                    mt-2
                    block
                    rounded-xl
                    px-3
                    py-2.5
                    text-sm
                    font-medium
                    text-gray-700
                    transition
                    hover:bg-gray-100
                  "
                >
                  My Profile
                </Link>

                {/* ORDERS */}

                <Link
                  href="/dashboard/orders"
                  className="
                    block
                    rounded-xl
                    px-3
                    py-2.5
                    text-sm
                    font-medium
                    text-gray-700
                    transition
                    hover:bg-gray-100
                  "
                >
                  My Orders
                </Link>

                {/* WISHLIST */}

                <Link
                  href="/dashboard/wishlist"
                  className="
                    block
                    rounded-xl
                    px-3
                    py-2.5
                    text-sm
                    font-medium
                    text-gray-700
                    transition
                    hover:bg-gray-100
                  "
                >
                  Wishlist
                </Link>

                {/* LOGOUT */}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    mt-1
                    flex
                    w-full
                    items-center
                    gap-2
                    rounded-xl
                    px-3
                    py-2.5
                    text-left
                    text-sm
                    font-semibold
                    text-red-600
                    transition
                    hover:bg-red-50
                  "
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            /* NOT LOGGED IN */

            <Link
              href="/login"
              className="
                flex
                items-center
                gap-2
              "
            >
              <User size={25} />

              <div>
                <p
                  className="
                    text-sm
                    font-semibold
                    text-gray-900
                  "
                >
                  Account
                </p>

                <p
                  className="
                    text-xs
                    text-gray-500
                  "
                >
                  Sign in / Register
                </p>
              </div>
            </Link>
          )}

          {/* =================================================
              WISHLIST
          ================================================== */}

          <Link
            href="/dashboard/wishlist"
            className="
              relative
              text-gray-800
              transition
              hover:text-[#D4AF37]
            "
            aria-label="Wishlist"
          >
            <Heart size={26} />

            <span
              className="
                absolute
                -right-2
                -top-2
                flex
                h-5
                w-5
                items-center
                justify-center
                rounded-full
                bg-[#D4AF37]
                text-xs
                text-white
              "
            >
              0
            </span>
          </Link>

          {/* =================================================
              CART
          ================================================== */}

          <Link
            href="/dashboard/cart"
            className="
              relative
              text-gray-800
              transition
              hover:text-[#D4AF37]
            "
            aria-label="Shopping Cart"
          >
            <ShoppingCart size={27} />

            <span
              className="
                absolute
                -right-2
                -top-2
                flex
                h-5
                w-5
                items-center
                justify-center
                rounded-full
                bg-[#D4AF37]
                text-xs
                text-white
              "
            >
              0
            </span>
          </Link>

          {/* =================================================
              MOBILE MENU BUTTON
          ================================================== */}

          <button
            onClick={() =>
              setMobile(!mobile)
            }
            type="button"
            className="
              lg:hidden
              text-gray-800
            "
            aria-label="Toggle menu"
          >
            {mobile ? (
              <X size={25} />
            ) : (
              <Menu size={25} />
            )}
          </button>
        </div>
      </div>

      {/* =====================================================
          SECOND MENU
      ====================================================== */}

      <div
        className="
          border-t
          border-gray-200
        "
      >
        <div
          className="
            mx-auto
            flex
            h-14
            max-w-[1400px]
            items-center
            gap-8
            overflow-x-auto
            px-6
          "
        >
          {/* ALL CATEGORIES */}

          <div className="relative shrink-0">
            <button
              onClick={() =>
                setOpenCategory(
                  !openCategory
                )
              }
              type="button"
              className="
                flex
                items-center
                gap-2
                whitespace-nowrap
                rounded-lg
                bg-[#D4AF37]
                px-7
                py-2
                font-semibold
                text-white
                transition
                hover:bg-black
              "
            >
              <Menu size={18} />

              All Categories

              <ChevronDown
                size={15}
                className={
                  openCategory
                    ? "rotate-180 transition"
                    : "transition"
                }
              />
            </button>

            {/* SECOND MENU CATEGORY DROPDOWN */}

            {openCategory && (
              <div
                className="
                  absolute
                  left-0
                  top-12
                  z-[100]
                  w-60
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  p-2
                  shadow-2xl
                "
              >
                <Link
                  href="/dashboard/products"
                  onClick={handleCategoryClick}
                  className="
                    mb-1
                    block
                    rounded-xl
                    px-4
                    py-3
                    text-sm
                    font-semibold
                    text-gray-800
                    hover:bg-[#D4AF37]
                    hover:text-white
                  "
                >
                  All Products
                </Link>

                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/dashboard/category/${category.slug}`}
                    onClick={handleCategoryClick}
                    className="
                      block
                      rounded-xl
                      px-4
                      py-3
                      text-sm
                      font-medium
                      text-gray-700
                      hover:bg-[#D4AF37]
                      hover:text-white
                    "
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* NAV LINKS */}

          {nav.map((item, index) => (
            <Link
              key={item.name}
              href={item.link}
              className={`
                whitespace-nowrap
                text-sm
                font-semibold
                transition
                hover:text-[#D4AF37]
                ${
                  index === 0
                    ? "text-[#D4AF37]"
                    : "text-gray-800"
                }
              `}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* =====================================================
          MOBILE MENU
      ====================================================== */}

      {mobile && (
        <div
          className="
            border-t
            border-gray-200
            bg-white
            p-5
            lg:hidden
          "
        >
          {/* MOBILE SEARCH */}

          <div
            className="
              mb-5
              flex
              h-11
            "
          >
            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                  setMobile(false);
                }
              }}
              placeholder="Search products..."
              className="
                min-w-0
                flex-1
                rounded-l-xl
                border
                border-gray-300
                px-4
                text-sm
                outline-none
              "
            />

            <button
              type="button"
              onClick={() => {
                handleSearch();
                setMobile(false);
              }}
              className="
                flex
                w-12
                shrink-0
                items-center
                justify-center
                rounded-r-xl
                bg-[#D4AF37]
                text-white
              "
            >
              <Search size={19} />
            </button>
          </div>

          {/* MOBILE CATEGORIES */}

          <div className="mb-4">
            <p
              className="
                mb-2
                text-xs
                font-bold
                uppercase
                tracking-wider
                text-gray-400
              "
            >
              Categories
            </p>

            <Link
              href="/dashboard/products"
              onClick={() =>
                setMobile(false)
              }
              className="
                block
                border-b
                border-gray-100
                py-3
                font-semibold
                text-[#D4AF37]
              "
            >
              All Products
            </Link>

            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/dashboard/category/${category.slug}`}
                onClick={() =>
                  setMobile(false)
                }
                className="
                  block
                  border-b
                  border-gray-100
                  py-3
                  font-medium
                  text-gray-800
                  transition
                  hover:text-[#D4AF37]
                "
              >
                {category.name}
              </Link>
            ))}
          </div>

          {/* LOGGED IN USER */}

          {loggedIn && (
            <div
              className="
                mb-4
                rounded-2xl
                bg-[#faf8f3]
                p-4
              "
            >
              <p
                className="
                  text-sm
                  font-bold
                  text-gray-900
                "
              >
                {userName}
              </p>

              {userEmail && (
                <p
                  className="
                    mt-1
                    truncate
                    text-xs
                    text-gray-500
                  "
                >
                  {userEmail}
                </p>
              )}

              <div className="mt-3 flex gap-4">
                <Link
                  href="/dashboard/profile"
                  onClick={() =>
                    setMobile(false)
                  }
                  className="
                    text-sm
                    font-semibold
                    text-gray-700
                  "
                >
                  Profile
                </Link>

                <Link
                  href="/dashboard/orders"
                  onClick={() =>
                    setMobile(false)
                  }
                  className="
                    text-sm
                    font-semibold
                    text-gray-700
                  "
                >
                  Orders
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    flex
                    items-center
                    gap-1
                    text-sm
                    font-semibold
                    text-red-600
                  "
                >
                  <LogOut size={15} />
                  Logout
                </button>
              </div>
            </div>
          )}

          {/* MOBILE NAV */}

          <p
            className="
              mb-2
              text-xs
              font-bold
              uppercase
              tracking-wider
              text-gray-400
            "
          >
            Menu
          </p>

          {nav.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              onClick={() =>
                setMobile(false)
              }
              className="
                block
                border-b
                border-gray-100
                py-3
                font-semibold
                text-gray-800
                transition
                hover:text-[#D4AF37]
              "
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
