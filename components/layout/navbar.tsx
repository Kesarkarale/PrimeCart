"use client";


import {
 Search,
 ShoppingCart,
 Bell,
 UserCircle
} from "lucide-react";


export default function Navbar(){


return (

<header className="
h-20
flex
items-center
justify-between
px-8
bg-black/60
backdrop-blur-xl
border-b
border-white/10
text-white
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
"

/>


</div>







<div className="
flex
items-center
gap-5
">


<div className="
relative
">


<ShoppingCart/>

<span className="
absolute
-top-2
-right-3
bg-[#D4AF37]
text-black
text-xs
rounded-full
px-2
">

0

</span>


</div>




<Bell

className="
text-[#D4AF37]
"

/>


<UserCircle size={30}/>



</div>





</header>


);


}
