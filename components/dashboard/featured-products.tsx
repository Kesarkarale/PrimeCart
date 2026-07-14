"use client";

import ProductCard from "@/components/products/product-card";

import {
  ArrowRight
} from "lucide-react";

import Link from "next/link";



const products = [

{
id:1,
name:"iPhone 16 Pro Max",
price:129999,
oldPrice:139999,
rating:4.9,
category:"Electronics",
image:"/products/iphone.png"
},


{
id:2,
name:"MacBook Pro M4",
price:189999,
oldPrice:199999,
rating:4.8,
category:"Laptops",
image:"/products/macbook.png"
},


{
id:3,
name:"Apple Watch Ultra",
price:79999,
oldPrice:89999,
rating:4.7,
category:"Watches",
image:"/products/watch.png"
},


{
id:4,
name:"Premium Sneakers",
price:12999,
oldPrice:15999,
rating:4.6,
category:"Fashion",
image:"/products/shoes.png"
},


];


export default function FeaturedProducts(){


return (

<section className="mt-14">


{/* Header */}

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
text-white
">

Featured Products

</h2>


<p className="
text-gray-400
mt-2
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







{/* Product Grid */}


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
