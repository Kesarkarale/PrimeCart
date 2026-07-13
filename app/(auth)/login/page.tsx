"use client";

import Link from "next/link";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { motion } from "framer-motion";


export default function LoginPage() {


const [showPassword,setShowPassword] = useState(false);


return (

<main className="
min-h-screen
bg-[#f8f5ef]
flex
items-center
justify-center
px-4
py-10
">


<motion.div

initial={{
opacity:0,
y:40
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:.6
}}

className="
w-full
max-w-6xl
grid
lg:grid-cols-2
overflow-hidden
rounded-[35px]
bg-white
shadow-2xl
border
border-[#e7d7b5]
"


>


{/* LEFT PREMIUM BRAND SECTION */}


<section

className="
hidden
lg:flex
flex-col
justify-center
p-14
relative
overflow-hidden
bg-gradient-to-br
from-[#0b0b0b]
via-[#17130c]
to-[#2a1f0b]
text-white
"


>


{/* GOLD EFFECT */}


<div className="
absolute
w-80
h-80
bg-yellow-500/20
blur-3xl
rounded-full
top-[-100px]
right-[-100px]
"/>



<div className="
absolute
w-72
h-72
bg-yellow-600/20
blur-3xl
rounded-full
bottom-[-100px]
left-[-100px]
"/>





<div className="
relative
z-10
">


<div className="
flex
items-center
gap-4
mb-12
">


<div className="
p-4
rounded-2xl
bg-gradient-to-br
from-yellow-300
to-yellow-600
text-black
shadow-lg
">


<ShoppingBag size={35}/>


</div>



<h1 className="
text-4xl
font-bold
tracking-wide
">


PrimeCart


</h1>



</div>





<h2 className="
text-5xl
font-extrabold
leading-tight
">


Premium Shopping.


<br/>

Royal Experience.


</h2>




<p className="
mt-6
text-gray-300
text-lg
leading-relaxed
max-w-md
">


Discover luxury products,
exclusive collections and
a smarter way to shop online.


</p>






<div className="
mt-10
flex
items-center
gap-3
text-yellow-400
">


<Sparkles size={22}/>


<span className="
font-medium
">


Trusted by thousands of shoppers


</span>


</div>







<div className="
mt-10
grid
grid-cols-3
gap-4
">


<div className="
bg-white/10
backdrop-blur-md
rounded-2xl
p-4
border
border-white/10
">


<h3 className="
text-2xl
font-bold
text-yellow-400
">

10K+

</h3>


<p className="
text-sm
text-gray-300
">

Products

</p>


</div>





<div className="
bg-white/10
backdrop-blur-md
rounded-2xl
p-4
border
border-white/10
">


<h3 className="
text-2xl
font-bold
text-yellow-400
">

50K+

</h3>


<p className="
text-sm
text-gray-300
">

Customers

</p>


</div>





<div className="
bg-white/10
backdrop-blur-md
rounded-2xl
p-4
border
border-white/10
">


<h3 className="
text-2xl
font-bold
text-yellow-400
">

24/7

</h3>


<p className="
text-sm
text-gray-300
">

Support

</p>


</div>


</div>



</div>


</section>
  
