"use client";

import ProductCard from "@/components/products/product-card";

import {
  ArrowRight
} from "lucide-react";

import Link from "next/link";



const products = [

{
id:"1",
name:"iPhone 16 Pro Max",
price:129999,
oldPrice:139999,
rating:4.9,
category:"Electronics",
image:"/products/iphone.png",
description:"Premium Apple smartphone with advanced technology",
stock:20
},


{
id:"2",
name:"MacBook Pro M4",
price:189999,
oldPrice:199999,
rating:4.8,
category:"Laptops",
image:"/products/macbook.png",
description:"Powerful laptop for professionals",
stock:15
},


{
id:"3",
name:"Apple Watch Ultra",
price:79999,
oldPrice:89999,
rating:4.7,
category:"Watches",
image:"/products/watch.png",
description:"Luxury smartwatch with health features",
stock:25
},


{
id:"4",
name:"Premium Sneakers",
price:12999,
oldPrice:15999,
rating:4.6,
category:"Fashion",
image:"/products/shoes.png",
description:"Comfortable premium sneakers",
stock:50
},


];



export default function FeaturedProducts(){


return (

<section className="mt-14">



{/* HEADER */}


<div className="
flex
items-center
justify-between
mb-7
">


<div>


<h2 className="
text-3xl
font-bold

text-gray-900
dark:text-white

">

Featured Products

</h2>



<p className="
mt-2

text-gray-600
dark:text-gray-400

">

Handpicked premium products for you

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

hover:gap-3

transition-all

"

>

View All

<ArrowRight size={18}/>

</Link>



</div>






{/* PRODUCT GRID */}


<div className="

grid

sm:grid-cols-2

lg:grid-cols-4

gap-6

">


{

products.map((product)=>(


<ProductCard

key={product.id}

product={product}

/>


))


}



</div>





</section>

);


}
