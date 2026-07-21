"use client";

import Link from "next/link";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Menu,
  ChevronDown,
} from "lucide-react";


export default function Navbar() {

const menu = [
  "Home",
  "Categories",
  "Deals",
  "New Arrivals",
  "Best Sellers",
  "Electronics",
  "Fashion",
  "Home & Living",
  "Beauty",
  "More"
];


return (
<header className="
bg-white
border-b
border-gray-200
sticky
top-0
z-50
">


{/* TOP NAV */}

<div className="
max-w-[1400px]
mx-auto
px-6
h-[75px]
flex
items-center
gap-8
">


{/* LOGO */}

<Link
href="/"
className="
flex
items-center
gap-3
min-w-[210px]
"
>

<div
className="
text-[#D4AF37]
text-5xl
"
>
🛒
</div>


<div>

<h1
className="
text-3xl
font-black
tracking-tight
text-black
"
>
Prime<span className="text-[#D4AF37]">
Cart
</span>
</h1>


<p
className="
text-[11px]
text-gray-500
font-medium
"
>
Shop More. Pay Less.
</p>


</div>

</Link>





{/* SEARCH */}


<div
className="
flex
flex-1
h-[42px]
"
>


<button
className="
px-5
bg-gray-50
border
border-gray-200
rounded-l-xl
flex
items-center
gap-2
text-sm
font-medium
"
>

All Categories

<ChevronDown size={16}/>

</button>



<input

placeholder="
Search for products, brands and more...
"

className="
flex-1
border-y
border-gray-200
px-5
outline-none
text-sm
"

/>



<button
className="
w-12
bg-[#D4AF37]
text-white
rounded-r-xl
flex
items-center
justify-center
hover:bg-black
transition
"
>

<Search size={20}/>

</button>


</div>





{/* RIGHT MENU */}


<div
className="
flex
items-center
gap-7
"
>



{/* ACCOUNT */}

<div
className="
flex
items-center
gap-3
cursor-pointer
"
>

<User size={25}/>

<div>

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
Sign in / Register
</p>


</div>


</div>






{/* WISHLIST */}

<div
className="
flex
items-center
gap-2
relative
"
>

<Heart size={27}/>


<div>

<p
className="
text-sm
font-semibold
"
>
Wishlist
</p>

</div>


<span
className="
absolute
-top-2
right-[-8px]
bg-[#D4AF37]
text-white
text-[10px]
rounded-full
w-5
h-5
flex
items-center
justify-center
"
>
0
</span>


</div>







{/* CART */}


<div
className="
flex
items-center
gap-2
relative
"
>

<ShoppingCart size={28}/>


<div>

<p
className="
text-sm
font-semibold
"
>
Cart
</p>

<p
className="
text-xs
text-gray-500
"
>
₹0.00
</p>


</div>


<span
className="
absolute
-top-2
right-[-8px]
bg-[#D4AF37]
text-white
text-[10px]
rounded-full
w-5
h-5
flex
items-center
justify-center
"
>
0
</span>


</div>




</div>


</div>








{/* SECOND NAV */}


<div
className="
border-t
border-gray-100
"
>


<div
className="
max-w-[1400px]
mx-auto
px-6
h-[55px]
flex
items-center
gap-8
"
>


<button
className="
bg-[#D4AF37]
text-white
px-8
h-10
rounded-lg
flex
items-center
gap-3
font-semibold
"
>

<Menu size={20}/>

All Categories

</button>





{
menu.map((item,index)=>(

<Link
key={item}
href="#"
className={`
text-sm
font-semibold
h-full
flex
items-center
relative

${index===0
?
"text-[#D4AF37]"
:
"text-gray-800"
}

`}
>


{item}


{
index===0 &&

<span
className="
absolute
bottom-0
left-0
w-full
h-[3px]
bg-[#D4AF37]
"
/>

}


</Link>

))
}



</div>


</div>



</header>
)

}
