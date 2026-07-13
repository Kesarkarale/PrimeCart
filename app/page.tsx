 "use client";

import Link from "next/link";
import { useState } from "react";

import {
  Menu,
  X,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Star,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import { motion } from "framer-motion";


export default function Home() {


const [open,setOpen]=useState(false);



return (

<main className="
min-h-screen
bg-[#050505]
text-white
overflow-hidden
">



{/* ================= NAVBAR ================= */}


<nav className="
fixed
top-5
left-0
right-0
z-50
px-5
">


<div className="
max-w-7xl
mx-auto
bg-black/70
backdrop-blur-xl
border
border-white/10
rounded-2xl
px-6
py-4
flex
justify-between
items-center
">


{/* LOGO */}

<Link
href="/"
className="
flex
items-center
gap-3
"
>


<div className="
bg-gradient-to-r
from-yellow-300
to-yellow-700
text-black
p-3
rounded-xl
">


<ShoppingBag size={25}/>

</div>


<div>

<h1 className="
text-2xl
font-bold
">

Prime<span className="text-[#D4AF37]">
Cart
</span>

</h1>

<p className="
text-xs
text-gray-400
">

Luxury Shopping

</p>

</div>


</Link>





{/* MENU */}

<div className="
hidden
md:flex
gap-8
">


<a className="hover:text-[#D4AF37]">
Home
</a>

<a className="hover:text-[#D4AF37]">
Shop
</a>


<a className="hover:text-[#D4AF37]">
Categories
</a>


<a className="hover:text-[#D4AF37]">
Deals
</a>


</div>





<div className="
hidden
md:flex
gap-3
">


<Link

href="/login"

className="
px-5
py-2
rounded-xl
border
border-white/20
hover:border-[#D4AF37]
"

>

Login

</Link>




<Link

href="/register"

className="
px-5
py-2
rounded-xl
bg-[#D4AF37]
text-black
font-semibold
"

>

Get Started

</Link>


</div>





<button

onClick={()=>setOpen(!open)}

className="
md:hidden
"

>


{
open?
<X/>:
<Menu/>
}


</button>



</div>





{
open &&

<div className="
md:hidden
mt-3
bg-black
border
border-white/10
rounded-xl
p-5
space-y-4
">


<Link href="/login">
Login
</Link>


<Link href="/register">
Register
</Link>


</div>

}


</nav>





{/* ================= HERO ================= */}



<section className="
pt-44
px-5
max-w-7xl
mx-auto
grid
md:grid-cols-2
gap-10
items-center
">



<motion.div

initial={{
opacity:0,
x:-50
}}

animate={{
opacity:1,
x:0
}}

>


<p className="
text-[#D4AF37]
font-semibold
mb-4
">

✨ Premium Online Marketplace

</p>



<h1 className="
text-5xl
md:text-7xl
font-bold
leading-tight
">


Shop Smarter.

<br/>

Live Better.

</h1>



<p className="
text-gray-400
mt-6
text-lg
max-w-xl
">

Experience next-generation shopping with
premium products, secure payments and
AI-powered recommendations.

</p>



<div className="
flex
gap-4
mt-8
">


<Link

href="/register"

className="
bg-[#D4AF37]
text-black
px-7
py-3
rounded-xl
font-bold
flex
items-center
gap-2
"

>

Start Shopping

<ArrowRight size={18}/>

</Link>



<Link

href="/login"

className="
border
border-white/20
px-7
py-3
rounded-xl
"

>

Login

</Link>



</div>



</motion.div>





{/* PRODUCT CARD */}


<motion.div

animate={{
y:[0,-20,0]
}}

transition={{
duration:4,
repeat:Infinity
}}

className="
relative
"


>


<div className="
bg-white/10
backdrop-blur-xl
border
border-[#D4AF37]/30
rounded-3xl
p-10
text-center
shadow-2xl
">


<div className="
text-8xl
">

🛒

</div>


<h2 className="
text-3xl
font-bold
mt-5
">

PrimeCart

</h2>


<p className="
text-gray-400
">

Everything you need

</p>


</div>


</motion.div>


</section>






{/* ================= FEATURES ================= */}



<section className="
max-w-7xl
mx-auto
px-5
py-24
grid
md:grid-cols-3
gap-6
">


{

[

["Fast Delivery",Truck],

["Secure Payment",ShieldCheck],

["Premium Quality",Star]

].map(([title,Icon]:any)=>(


<div

key={title}

className="
bg-white/5
border
border-white/10
rounded-3xl
p-8
hover:border-[#D4AF37]
transition
"


>


<Icon className="
text-[#D4AF37]
mb-5
"/>


<h3 className="
text-xl
font-bold
">

{title}

</h3>


<p className="
text-gray-400
mt-2
">

Best experience for customers

</p>


</div>


))


}


</section>







{/* ================= CTA ================= */}



<section className="
mx-5
mb-20
rounded-3xl
bg-gradient-to-r
from-[#D4AF37]
to-yellow-700
text-black
p-12
text-center
">


<Sparkles className="mx-auto"/>


<h2 className="
text-4xl
font-bold
mt-4
">

Welcome To PrimeCart

</h2>


<p className="
mt-3
">

Premium shopping starts here.

</p>


</section>







{/* FOOTER */}


<footer className="
border-t
border-white/10
py-8
text-center
text-gray-400
">


© 2026 PrimeCart. All Rights Reserved.


</footer>



</main>

);


}
