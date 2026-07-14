 "use client";


import {
 Search,
 ShoppingCart,
 Bell,
 UserCircle
} from "lucide-react";


import ThemeToggle from "@/components/theme-toggle";


export default function Navbar(){


return (

<header className="
h-20
flex
items-center
justify-between
px-5
md:px-8
bg-black/60
dark:bg-black/60
bg-white
backdrop-blur-xl
border-b
border-white/10
text-white
dark:text-white
">


{/* SEARCH */}

<div className="
hidden
md:flex
items-center
gap-3
bg-white/10
px-5
py-3
rounded-xl
w-96
">


<Search size={20}/>


<input

placeholder="Search products..."

className="
bg-transparent
outline-none
w-full
text-sm
placeholder:text-gray-400
"

/>


</div>






{/* RIGHT ICONS */}


<div className="
flex
items-center
gap-4
">


{/* Theme */}

<ThemeToggle />




{/* Cart */}

<div className="
relative
cursor-pointer
">


<ShoppingCart size={25}/>


<span className="
absolute
- top-2
-right-3
bg-[#D4AF37]
text-black
text-xs
font-bold
rounded-full
px-2
">


0


</span>


</div>





{/* Notification */}

<Bell

size={23}

className="
text-[#D4AF37]
cursor-pointer
"

/>





{/* User */}

<UserCircle

size={30}

className="
cursor-pointer
"

/>



</div>



</header>

);


}
