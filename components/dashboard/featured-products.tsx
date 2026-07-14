 "use client";

import Image from "next/image";
import Link from "next/link";

import {
  Heart,
  ShoppingCart,
  Star,
  ArrowRight,
} from "lucide-react";

import { motion } from "framer-motion";


const products = [

{
id:1,
name:"iPhone 16 Pro Max",
category:"Electronics",
price:"₹1,29,999",
oldPrice:"₹1,39,999",
discount:"10% OFF",
rating:"4.9",
image:"/products/iphone.png"
},

{
id:2,
name:"MacBook Pro M4",
category:"Laptop",
price:"₹1,89,999",
oldPrice:"₹1,99,999",
discount:"8% OFF",
rating:"4.8",
image:"/products/macbook.png"
},

{
id:3,
name:"Apple Watch Ultra",
category:"Smart Watch",
price:"₹79,999",
oldPrice:"₹89,999",
discount:"12% OFF",
rating:"4.7",
image:"/products/watch.png"
},

{
id:4,
name:"Premium Sneakers",
category:"Fashion",
price:"₹12,999",
oldPrice:"₹15,999",
discount:"20% OFF",
rating:"4.6",
image:"/products/shoes.png"
}

];



export default function FeaturedProducts(){


return (

<section className="mt-14">


{/* HEADER */}

<div className="flex items-center justify-between mb-7">


<div>

<div className="
inline-flex
items-center
rounded-full
bg-red-100
dark:bg-red-500/20
px-4
py-2
text-sm
font-bold
text-red-600
">

🔥 Limited Deals

</div>


<h2 className="
mt-4
text-3xl
font-black
text-gray-900
dark:text-white
">

Featured Products

</h2>


<p className="
mt-2
text-gray-500
dark:text-gray-400
">

Best selling premium products

</p>


</div>



<Link
href="/dashboard/products"
className="
hidden
md:flex
items-center
gap-2
text-[#D4AF37]
font-semibold
"
>

View All

<ArrowRight size={18}/>

</Link>


</div>





{/* PRODUCTS */}


<div className="
grid
sm:grid-cols-2
lg:grid-cols-4
gap-6
">


{
products.map((product,index)=>(


<motion.div

key={product.id}

initial={{
opacity:0,
y:30
}}

whileInView={{
opacity:1,
y:0
}}

transition={{
delay:index*.1
}}

viewport={{
once:true
}}

className="
group
relative
rounded-3xl
bg-white
dark:bg-[#111827]
border
border-gray-200
dark:border-white/10
overflow-hidden
hover:-translate-y-2
transition
duration-300
shadow-sm
hover:shadow-2xl
"

>


{/* DISCOUNT */}

<div className="
absolute
top-4
left-4
z-10
rounded-full
bg-red-500
px-3
py-1
text-xs
font-bold
text-white
">

{product.discount}

</div>




{/* WISHLIST */}

<button className="
absolute
right-4
top-4
z-10
h-10
w-10
rounded-full
bg-white
dark:bg-black
flex
items-center
justify-center
shadow
hover:text-red-500
">

<Heart size={18}/>

</button>





{/* IMAGE */}


<div className="
h-64
flex
items-center
justify-center
bg-gray-50
dark:bg-black/30
">


<Image

src={product.image}

alt={product.name}

width={220}

height={220}

className="
object-contain
group-hover:scale-110
transition
duration-500
"

/>


</div>






{/* CONTENT */}


<div className="p-5">


<p className="
text-sm
text-gray-500
dark:text-gray-400
">

{product.category}

</p>


<h3 className="
mt-2
font-bold
text-lg
text-gray-900
dark:text-white
">

{product.name}

</h3>




<div className="
mt-3
flex
items-center
gap-2
">


<div className="
flex
items-center
gap-1
bg-green-100
px-2
py-1
rounded-lg
text-green-700
text-sm
font-bold
">

<Star size={14} fill="currentColor"/>

{product.rating}

</div>


</div>





<div className="
mt-4
flex
items-center
gap-3
">


<span className="
text-xl
font-black
text-[#D4AF37]
">

{product.price}

</span>


<span className="
text-sm
line-through
text-gray-400
">

{product.oldPrice}

</span>


</div>





<button className="
mt-5
w-full
rounded-xl
bg-black
dark:bg-[#D4AF37]
text-white
dark:text-black
py-3
font-bold
flex
items-center
justify-center
gap-2
hover:scale-105
transition
">


<ShoppingCart size={18}/>

Add To Cart


</button>



</div>


</motion.div>


))

}


</div>


</section>

);

}
