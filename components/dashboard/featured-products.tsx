"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  Heart,
  ShoppingCart,
  Star
} from "lucide-react";

import { useState } from "react";


const products = [
  {
    id:1,
    name:"Wireless Headphones",
    image:"/products/headphone.png",
    price:2499,
    oldPrice:3999,
    rating:4.8,
    reviews:245,
    discount:"38%",
  },

  {
    id:2,
    name:"Smart Watch",
    image:"/products/watch.png",
    price:3499,
    oldPrice:4999,
    rating:4.7,
    reviews:180,
    discount:"30%",
  },

  {
    id:3,
    name:"Running Shoes",
    image:"/products/shoes.png",
    price:2999,
    oldPrice:4599,
    rating:4.9,
    reviews:320,
    discount:"35%",
  },

  {
    id:4,
    name:"Laptop Backpack",
    image:"/products/bag.png",
    price:1899,
    oldPrice:2899,
    rating:4.6,
    reviews:150,
    discount:"34%",
  },

  {
    id:5,
    name:"Bluetooth Speaker",
    image:"/products/speaker.png",
    price:2199,
    oldPrice:3299,
    rating:4.8,
    reviews:210,
    discount:"33%",
  },


  {
    id:6,
    name:"Gaming Mouse",
    image:"/products/mouse.png",
    price:1499,
    oldPrice:2299,
    rating:4.7,
    reviews:130,
    discount:"35%",
  },

];



export default function FeaturedProducts(){


const [wishlist,setWishlist]=useState<number[]>([]);



const toggleWishlist=(id:number)=>{

setWishlist((prev)=>

prev.includes(id)

?

prev.filter(item=>item!==id)

:

[...prev,id]

)

}




return (

<section className="py-10">


{/* HEADER */}

<div className="
flex
items-center
justify-between
mb-8
">


<div>

<h2 className="
text-3xl
font-black
text-gray-900
">
Featured Products
</h2>


<p className="
text-gray-500
mt-1
">
Premium products specially selected for you
</p>


</div>



<Link

href="/products"

className="
text-[#D4AF37]
font-bold
hover:underline
"

>

View All →

</Link>


</div>





{/* PRODUCTS GRID */}


<div className="
grid
grid-cols-1
sm:grid-cols-2
md:grid-cols-3
xl:grid-cols-6
gap-6
">


{

products.map((product)=>(


<div

key={product.id}

className="
bg-white
rounded-3xl
border
border-gray-200
overflow-hidden
group
hover:shadow-2xl
hover:-translate-y-1
transition-all
duration-300
"


>


{/* IMAGE */}


<Link

href={`/product/dashboard/${product.id}`}

>

<div className="
relative
h-56
bg-gray-50
overflow-hidden
">


<span

className="
absolute
top-3
left-3
bg-red-500
text-white
text-xs
font-bold
px-3
py-1
rounded-full
z-10
"

>

{product.discount} OFF

</span>




<button

onClick={(e)=>{

e.preventDefault();

toggleWishlist(product.id);

}}

className="
absolute
top-3
right-3
z-10
bg-white
w-10
h-10
rounded-full
shadow
flex
items-center
justify-center
"

>


<Heart

size={19}

className={

wishlist.includes(product.id)

?

"fill-red-500 text-red-500"

:

"text-gray-700"

}

/>


</button>




<Image

src={product.image}

alt={product.name}

fill

className="
object-contain
p-6
group-hover:scale-110
transition
duration-500
"

/>



</div>


</Link>





{/* DETAILS */}


<div className="
p-5
">


<Link

href={`/product/dashboard/${product.id}`}

>


<h3 className="
font-bold
text-lg
line-clamp-2
hover:text-[#D4AF37]
transition
">

{product.name}

</h3>


</Link>




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
bg-green-600
text-white
px-2
py-1
rounded-lg
text-sm
font-bold
">


<Star

size={14}

className="fill-white"

/>


{product.rating}


</div>


<span className="
text-sm
text-gray-500
">

({product.reviews})

</span>


</div>





<div className="
flex
items-center
gap-2
mt-4
">


<span className="
text-2xl
font-black
">

₹{product.price}

</span>


<span className="
text-gray-400
line-through
">

₹{product.oldPrice}

</span>


</div>





<button

onClick={()=>{

console.log(
"Add cart",
product.id
)

}}

className="
mt-5
w-full
h-12
rounded-2xl
bg-[#D4AF37]
hover:bg-black
text-white
font-bold
flex
items-center
justify-center
gap-2
transition
"

>


<ShoppingCart size={18}/>

Add To Cart


</button>



</div>


</div>


))


}


</div>



</section>


)

}
