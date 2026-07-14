"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Heart,
  ShoppingCart,
  Star,
  Zap
} from "lucide-react";

import { motion } from "framer-motion";


interface Product {

  id:number;

  name:string;

  price:number;

  oldPrice?:number;

  rating:number;

  image:string;

  category:string;

}



export default function ProductCard({
  product
}:{
  product:Product;
}) {


return (

<motion.div

initial={{
opacity:0,
y:30
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true
}}

whileHover={{
y:-8
}}

transition={{
duration:.3
}}

className="
group
relative
bg-white/5
backdrop-blur-xl
border
border-white/10
rounded-3xl
overflow-hidden
hover:border-[#D4AF37]
transition
"

>


{/* Wishlist */}


<button

className="
absolute
right-4
top-4
z-10
bg-black/50
p-3
rounded-full
hover:bg-[#D4AF37]
hover:text-black
transition
"

>

<Heart size={20}/>

</button>





{/* Image */}


<Link

href={`/dashboard/products/${product.id}`}

>


<div className="
relative
h-64
bg-black/40
flex
items-center
justify-center
overflow-hidden
">


<Image

src={product.image}

alt={product.name}

fill

className="
object-contain
p-8
group-hover:scale-110
transition
duration-500
"

/>


</div>


</Link>







<div className="
p-5
">


{/* Category */}


<p className="
text-xs
text-[#D4AF37]
uppercase
tracking-wider
">

{product.category}

</p>





{/* Name */}


<h3 className="
mt-2
text-xl
font-bold
text-white
line-clamp-1
">

{product.name}

</h3>





{/* Rating */}


<div className="
flex
items-center
gap-2
mt-3
">


<div className="
flex
items-center
gap-1
bg-[#D4AF37]
text-black
px-2
py-1
rounded-lg
text-sm
font-bold
">


<Star size={14} fill="currentColor"/>

{product.rating}


</div>


<span className="
text-gray-400
text-sm
">

(120 Reviews)

</span>


</div>







{/* Price */}


<div className="
flex
items-center
gap-3
mt-4
">


<h4 className="
text-2xl
font-bold
text-[#D4AF37]
">

₹{product.price.toLocaleString()}

</h4>


{
product.oldPrice &&

<p className="
text-gray-500
line-through
text-sm
">

₹{product.oldPrice.toLocaleString()}

</p>

}


</div>







{/* Buttons */}


<div className="
grid
grid-cols-2
gap-3
mt-5
">



<button

className="
flex
items-center
justify-center
gap-2
bg-white/10
border
border-white/10
py-3
rounded-xl
hover:border-[#D4AF37]
transition
text-sm
"


>

<ShoppingCart size={17}/>

Cart

</button>





<button

className="
flex
items-center
justify-center
gap-2
bg-[#D4AF37]
text-black
font-bold
py-3
rounded-xl
hover:scale-105
transition
text-sm
"


>

<Zap size={17}/>

Buy

</button>



</div>


</div>



</motion.div>


);


}
