"use client";

import Link from "next/link";
import { useState } from "react";
import CartDrawer from "@/components/cart/cart-drawer";
import WishlistPanel from "@/components/wishlist/wishlist-panel";

import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
} from "lucide-react";

export default function Navbar() {
  const [search, setSearch] = useState("");
const [cartOpen,setCartOpen]=useState(false);
const [wishOpen,setWishOpen]=useState(false);
  
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-white/10 bg-white/90 dark:bg-[#050505]/90 backdrop-blur-xl">

      <div className="max-w-7xl mx-auto px-5 py-4">

        <div className="flex items-center gap-6">

          {/* LOGO */}

          <Link href="/dashboard">

            <h1 className="text-3xl font-black tracking-tight">

              Prime

              <span className="text-[#D4AF37]">
                Cart
              </span>

            </h1>

          </Link>

          {/* SEARCH */}

          <div className="hidden md:flex flex-1 relative">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Products..."
              className="w-full rounded-2xl border border-gray-300 dark:border-white/10 bg-gray-100 dark:bg-[#111827] pl-11 pr-4 py-3 outline-none focus:border-[#D4AF37]"
            />

          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-3 ml-auto">

            <button
onClick={()=>setWishOpen(true)}
>
<Heart/>
</button>

           <button
onClick={()=>setCartOpen(true)}
>
<ShoppingCart/>
</button>

            <button className="h-11 w-11 rounded-xl border border-gray-300 dark:border-white/10 hover:border-[#D4AF37] flex items-center justify-center">
              <User size={20} />
            </button>

            <button className="md:hidden h-11 w-11 rounded-xl border border-gray-300 dark:border-white/10 flex items-center justify-center">
              <Menu size={22} />
            </button>

          </div>

        </div>

      </div>

    </header>
    {
cartOpen &&
<CartDrawer/>
}


{
wishOpen &&
<WishlistPanel/>
}
  );
}
