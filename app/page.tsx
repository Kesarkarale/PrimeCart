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
  Crown,
  Zap
} from "lucide-react";

import { motion } from "framer-motion";


export default function Home(){


const [open,setOpen]=useState(false);



return (

<main className="
min-h-screen
bg-[#050505]
text-white
overflow-hidden
relative
">



{/* GOLD BACKGROUND GLOW */}

<div className="
absolute
top-40
left-1/2
-translate-x-1/2
w-[700px]
h-[700px]
bg-[#D4AF37]
opacity-20
blur-[180px]
rounded-full
">

</div>





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
bg-black/60
backdrop-blur-2xl
border
border-white/10
rounded-2xl
px-6
py-4
flex
items-center
justify-between
shadow-xl
">





<Link
href="/"
className="
flex
items-center
gap-3
"
>


<div className="
bg-gradient-to-br
from-yellow-300
to-yellow-700
text-black
p-3
rounded-xl
shadow-lg
">


<ShoppingBag size={28}/>


</div>




<div>


<h1 className="
text-2xl
font-bold
">

Prime
<span className="
text-[#D4AF37]
">

Cart

</span>

</h1>


<p className="
text-xs
text-gray-400
">

Luxury Marketplace

</p>


</div>



</Link>








<div className="
hidden
md:flex
gap-8
text-gray-300
">


<a className="
hover:text-[#D4AF37]
transition
">

Home

</a>


<a className="
hover:text-[#D4AF37]
transition
">

Shop

</a>


<a className="
hover:text-[#D4AF37]
transition
">

Categories

</a>


<a className="
hover:text-[#D4AF37]
transition
">

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
transition
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
bg-gradient-to-r
from-yellow-300
to-yellow-700
text-black
font-bold
hover:scale-105
transition
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

<X/>

:

<Menu/>

}

</button>




</div>






{

open &&

<div className="
md:hidden
mt-3
bg-black/90
backdrop-blur-xl
border
border-white/10
rounded-xl
p-5
space-y-4
">


<Link href="/login">

Login

</Link>


<br/>

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
gap-16
items-center
">






<motion.div

initial={{
opacity:0,
x:-60
}}

animate={{
opacity:1,
x:0
}}

>


<div className="
flex
items-center
gap-2
text-[#D4AF37]
mb-5
">


<Crown size={22}/>


Premium Online Marketplace


</div>





<h1 className="
text-5xl
md:text-7xl
font-bold
leading-tight
">


Luxury Shopping.

<br/>


Made Simple.


</h1>





<p className="
text-gray-400
mt-6
text-lg
max-w-xl
">


Discover premium products,
exclusive collections and a
next-generation shopping
experience designed for you.


</p>






<div className="
flex
gap-4
mt-8
flex-wrap
">


<Link

href="/register"

className="
bg-gradient-to-r
from-yellow-300
to-yellow-700
text-black
px-8
py-4
rounded-xl
font-bold
flex
items-center
gap-2
hover:scale-105
transition
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
px-8
py-4
rounded-xl
hover:border-[#D4AF37]
transition
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
backdrop-blur-3xl
border
border-[#D4AF37]/40
rounded-3xl
p-10
shadow-2xl
text-center
">


<div className="
absolute
top-5
right-5
bg-[#D4AF37]
text-black
px-4
py-1
rounded-full
text-sm
font-bold
">

NEW

</div>



<div className="
text-8xl
">

🛍️

</div>




<h2 className="
text-4xl
font-bold
mt-6
">

PrimeCart

</h2>




<p className="
text-gray-400
mt-2
">

Premium Products Collection

</p>




<div className="
flex
justify-center
gap-5
mt-8
">


<div className="
bg-black/40
p-4
rounded-xl
">

⭐

</div>


<div className="
bg-black/40
p-4
rounded-xl
">

🚚

</div>



<div className="
bg-black/40
p-4
rounded-xl
">

🔒

</div>



</div>


</div>



</motion.div>



</section>









{/* FEATURES */}



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

{
title:"Fast Delivery",
icon:Truck
},

{
title:"Secure Payment",
icon:ShieldCheck
},

{
title:"Premium Quality",
icon:Star
}

].map((item)=>(


<div

key={item.title}

className="
bg-white/5
border
border-white/10
rounded-3xl
p-8
hover:border-[#D4AF37]
hover:-translate-y-2
transition
"


>


<item.icon

className="
text-[#D4AF37]
mb-5
"
size={35}

/>



<h3 className="
text-xl
font-bold
">

{item.title}

</h3>



<p className="
text-gray-400
mt-3
">

Best shopping experience

</p>



</div>


))


}


</section>









{/* CTA */}



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


<Sparkles

className="
mx-auto
"

size={40}

/>



<h2 className="
text-4xl
font-bold
mt-5
">

Welcome To PrimeCart

</h2>



<p className="
mt-3
text-lg
">

Where luxury meets technology.

</p>



<Link

href="/register"

className="
inline-flex
items-center
gap-2
mt-6
bg-black
text-white
px-7
py-3
rounded-xl
"

>

Join Now

<Zap size={18}/>

</Link>



</section>







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
