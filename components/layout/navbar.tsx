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

  // ==============================
  // AUTH STATE
  // ==============================

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  const categories = [
    "Electronics",
    "Fashion",
    "Mobiles",
    "Beauty",
    "Home & Living",
    "Kitchen",
    "Sports",
  ];

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
      link: "/category/home",
    },
    {
      name: "Beauty",
      link: "/category/beauty",
    },
  ];

  // =========================================================
  // GET LOGGED-IN USER
  // =========================================================

  useEffect(() => {
    const supabase = createClient();

    let mounted = true;

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

        const metadata = user.user_metadata || {};

        // First preference:
        // full_name saved during registration
        const fullName =
          metadata.full_name ||
          metadata.name ||
          metadata.fullName ||
          "";

        // Email
        const email = user.email || "";

        setUserEmail(email);

        if (fullName) {
          setUserName(String(fullName));
        } else if (email) {
          // If Google doesn't provide name,
          // show email username.
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
    // LISTEN FOR LOGIN / LOGOUT
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

    if (value) {
      router.push(
        `/search?q=${encodeURIComponent(value)}`
      );
    }
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
  // USER DISPLAY NAME
  // =========================================================

  const displayName =
    userName.length > 22
      ? `${userName.slice(0, 22)}...`
      : userName;

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
          className="min-w-[210px]"
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

          <p className="text-xs text-gray-500">
            Shop More. Pay Less.
          </p>
        </Link>

        {/* ===================================================
            SEARCH
        ==================================================== */}

        <div
          className="
            hidden
            h-11
            flex-1
            lg:flex
          "
        >
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
                bg-gray-50
                px-5
                text-sm
                font-semibold
              "
            >
              All Categories

              <ChevronDown size={16} />
            </button>

            {openCategory && (
              <div
                className="
                  absolute
                  left-0
                  top-12
                  z-50
                  w-56
                  rounded-xl
                  border
                  bg-white
                  p-3
                  shadow-xl
                "
              >
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/category/${cat
                      .toLowerCase()
                      .replaceAll(
                        " ",
                        "-"
                      )}`}
                    onClick={() =>
                      setOpenCategory(false)
                    }
                    className="
                      block
                      rounded-lg
                      px-4
                      py-3
                      hover:bg-[#D4AF37]
                      hover:text-white
                    "
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            )}
          </div>

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
              flex-1
              border-y
              px-5
              text-sm
              outline-none
            "
          />

          <button
            onClick={handleSearch}
            type="button"
            className="
              flex
              w-12
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
            items-center
            gap-6
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
                <p className="text-sm font-semibold">
                  Account
                </p>

                <p className="text-xs text-gray-500">
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

                <div className="hidden max-w-[170px] sm:block">
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
                  className="hidden sm:block"
                />
              </button>

              {/* ACCOUNT DROPDOWN */}

              <div
                className="
                  invisible
                  absolute
                  right-0
                  top-12
                  w-64
                  translate-y-2
                  rounded-xl
                  border
                  bg-white
                  p-3
                  opacity-0
                  shadow-xl
                  transition-all
                  group-hover:visible
                  group-hover:translate-y-0
                  group-hover:opacity-100
                "
              >
                <div className="border-b px-3 pb-3">
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

                <Link
                  href="/dashboard/profile"
                  className="
                    mt-2
                    block
                    rounded-lg
                    px-3
                    py-2
                    text-sm
                    font-medium
                    hover:bg-gray-100
                  "
                >
                  My Profile
                </Link>

                <Link
                  href="/dashboard/orders"
                  className="
                    block
                    rounded-lg
                    px-3
                    py-2
                    text-sm
                    font-medium
                    hover:bg-gray-100
                  "
                >
                  My Orders
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    mt-1
                    flex
                    w-full
                    items-center
                    gap-2
                    rounded-lg
                    px-3
                    py-2
                    text-left
                    text-sm
                    font-semibold
                    text-red-600
                    hover:bg-red-50
                  "
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          ) : (
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
                <p className="text-sm font-semibold">
                  Account
                </p>

                <p className="text-xs text-gray-500">
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
            className="relative"
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
            className="relative"
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
              MOBILE MENU
          ================================================== */}

          <button
            onClick={() =>
              setMobile(!mobile)
            }
            type="button"
            className="lg:hidden"
            aria-label="Toggle menu"
          >
            {mobile ? (
              <X />
            ) : (
              <Menu />
            )}
          </button>
        </div>
      </div>

      {/* =====================================================
          SECOND MENU
      ====================================================== */}

      <div className="border-t">
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
            "
          >
            <Menu size={18} />
            All Categories
          </button>

          {nav.map((item, index) => (
            <Link
              key={item.name}
              href={item.link}
              className={`
                whitespace-nowrap
                text-sm
                font-semibold
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
            bg-white
            p-5
            lg:hidden
          "
        >
          {/* MOBILE SEARCH */}

          <div className="mb-5 flex h-11">
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
                flex-1
                rounded-l-lg
                border
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
                items-center
                justify-center
                rounded-r-lg
                bg-[#D4AF37]
                text-white
              "
            >
              <Search size={19} />
            </button>
          </div>

          {loggedIn && (
            <div
              className="
                mb-4
                rounded-xl
                bg-[#faf8f3]
                p-4
              "
            >
              <p className="text-sm font-bold">
                {userName}
              </p>

              {userEmail && (
                <p className="mt-1 text-xs text-gray-500">
                  {userEmail}
                </p>
              )}

              <button
                type="button"
                onClick={handleLogout}
                className="
                  mt-3
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                  text-red-600
                "
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}

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
