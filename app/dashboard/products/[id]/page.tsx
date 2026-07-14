import Image from "next/image";
import Link from "next/link";

import {
  Star,
  ShoppingCart,
  Zap,
  ArrowLeft,
  PackageCheck
} from "lucide-react";



const products = [

{
id:"1",
name:"iPhone 16 Pro Max",
price:129999,
oldPrice:139999,
rating:4.9,
category:"Electronics",
image:"/products/iphone.png",
description:
"iPhone 16 Pro Max with advanced camera, powerful processor and premium titanium design.",
stock:20
},


{
id:"2",
name:"MacBook Pro M4",
price:189999,
oldPrice:199999,
rating:4.8,
category:"Laptop",
image:"/products/macbook.png",
description:
"Professional laptop with M4 chip for creators and developers.",
stock:15
},


];



export default async function ProductDetailsPage({

params,

}:{

params:{
id:string
}

}){


const product =
products.find(
(item)=>item.id===params.id
);



if(!product){

return (

<div className="
min-h-screen
bg-[#050505]
text-white
flex
items-center
justify-center
">

<h1 className="text-3xl font-bold">
Product Not Found
</h1>

</div>

)

}




return (

<main className="
min-h-screen
bg-[#050505]
text-white
p-5
md:p-10
">


<Link
href="/dashboard/products"
className="
flex
items-center
gap-2
text-gray-400
hover:text-[#D4AF37]
mb-8
"
>

<ArrowLeft size={18}/>

Back To Products

</Link>



<div className="
grid
md:grid-cols-2
gap-10
max-w-7xl
mx-auto
">



{/* IMAGE */}


<div className="
rounded-3xl
bg-white/5
border
border-white/10
p-10
flex
items-center
justify-center
">


<Image

src={product.image}

alt={product.name}

width={500}

height={500}

className="
object-contain
hover:scale-110
transition
"

/>


</div>





{/* DETAILS */}


<div>


<p className="
text-[#D4AF37]
font-semibold
">

{product.category}

</p>


<h1 className="
text-5xl
font-black
mt-3
">

{product.name}

</h1>



<div className="
flex
items-center
gap-3
mt-5
">


<div className="
bg-[#D4AF37]
text-black
px-3
py-1
rounded-lg
flex
items-center
gap-1
font-bold
">

<Star size={16}
fill="black"
/>

{product.rating}

</div>


<span className="text-gray-400">
120 Reviews
</span>


</div>





<p className="
text-gray-300
mt-6
text-lg
leading-relaxed
">

{product.description}

</p>




<div className="
flex
items-center
gap-4
mt-8
">


<h2 className="
text-4xl
font-bold
text-[#D4AF37]
">

₹{product.price.toLocaleString()}

</h2>


<p className="
line-through
text-gray-500
">

₹{product.oldPrice.toLocaleString()}

</p>


</div>





<div className="
mt-6
flex
items-center
gap-2
text-green-400
">

<PackageCheck/>

{product.stock} Items Available

</div>





<div className="
grid
md:grid-cols-2
gap-4
mt-10
">


<button
className="
bg-white/10
border
border-white/20
rounded-xl
py-4
flex
items-center
justify-center
gap-2
hover:border-[#D4AF37]
transition
"
>

<ShoppingCart/>

Add To Cart

</button>




<button
className="
bg-[#D4AF37]
text-black
font-bold
rounded-xl
py-4
flex
items-center
justify-center
gap-2
hover:scale-105
transition
"
>

<Zap/>

Buy Now

</button>



</div>



</div>


</div>


</main>

)

}
