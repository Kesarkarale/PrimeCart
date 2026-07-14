"use client";

import Image from "next/image";
import Link from "next/link";

import { addToCart } from "@/lib/cart";

import { toast } from "sonner";

import {
  Heart,
  ShoppingCart,
  Star,
  Zap
} from "lucide-react";

import { motion } from "framer-motion";



interface Product {

 id:string;

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

bg-white

dark:bg-white/5

backdrop-blur-xl

border

border-gray-200

dark:border-white/10

rounded-3xl

overflow-hidden

hover:border-[#D4AF37]

shadow-sm

dark:shadow-none

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


bg-gray-100

dark:bg-black/50


p-3

rounded-full


hover:bg-[#D4AF37]

hover:text-black


transition

"

>


<Heart size={20}/>


</button>







{/* IMAGE */}



<Link

href={`/dashboard/products/${product.id}`}

>



<div className="

relative

h-64


bg-gray-100

dark:bg-black/40


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





{/* CATEGORY */}



<p className="

text-xs

text-[#D4AF37]

uppercase

tracking-wider

font-semibold

">


{product.category}


</p>








{/* NAME */}



<h3 className="

mt-2

text-xl

font-bold


text-gray-900

dark:text-white


line-clamp-1

">


{product.name}


</h3>









{/* RATING */}



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


<Star

size={14}

fill="currentColor"

/>


{product.rating}


</div>





<span className="

text-gray-500

dark:text-gray-400

text-sm

">


(120 Reviews)


</span>


</div>









{/* PRICE */}



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

text-gray-400

dark:text-gray-500

line-through

text-sm

">


₹{product.oldPrice.toLocaleString()}


</p>


}



</div>









{/* BUTTONS */}



<div className="

grid

grid-cols-2

gap-3

mt-5

">





<button


onClick={async()=>{


try{


await addToCart(product);


toast.success(
"Product added to cart 🛒"
);


}


catch(error:any){


toast.error(

error.message ||

"Please login first"

);


}


}}



className="

flex

items-center

justify-center

gap-2


bg-gray-100

dark:bg-white/10


border

border-gray-200

dark:border-white/10


py-3


rounded-xl


hover:border-[#D4AF37]


transition


text-sm


text-gray-900

dark:text-white

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
