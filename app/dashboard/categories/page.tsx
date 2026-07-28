"use client";

import Link from "next/link";

import {
  Smartphone,
  Laptop,
  Watch,
  Shirt,
  Home,
  Gamepad2,
  Sparkles,
  ArrowRight,
  ShoppingBag,
  Dumbbell,
  Baby,
  Utensils,
  Sofa,
  Search
} from "lucide-react";

import { motion } from "framer-motion";


const categories = [

{
name:"Electronics",
slug:"electronics",
icon:Smartphone,
products:"2500+ Products",
description:"Smartphones, gadgets and latest technology"
},


{
name:"Laptops",
slug:"laptops",
icon:Laptop,
products:"800+ Products",
description:"Premium laptops and professional devices"
},


{
name:"Fashion",
slug:"fashion",
icon:Shirt,
products:"5000+ Products",
description:"Latest fashion trends and collections"
},


{
name:"Watches",
slug:"watches",
icon:Watch,
products:"500+ Products",
description:"Luxury watches and smart wearables"
},


{
name:"Home & Living",
slug:"home-living",
icon:Sofa,
products:"1200+ Products",
description:"Furniture and home essentials"
},


{
name:"Gaming",
slug:"gaming",
icon:Gamepad2,
products:"900+ Products",
description:"Gaming accessories and consoles"
},


{
name:"Beauty",
slug:"beauty",
icon:Sparkles,
products:"1500+ Products",
description:"Premium beauty and personal care"
},


{
name:"Sports & Fitness",
slug:"sports",
icon:Dumbbell,
products:"700+ Products",
description:"Fitness equipment and sports gear"
},


{
name:"Toys & Kids",
slug:"kids",
icon:Baby,
products:"600+ Products",
description:"Toys and kids collection"
},


{
name:"Kitchen",
slug:"kitchen",
icon:Utensils,
products:"1000+ Products",
description:"Modern kitchen essentials"
},


{
name:"Accessories",
slug:"accessories",
icon:ShoppingBag,
products:"2000+ Products",
description:"Premium bags and accessories"
},


{
name:"Furniture",
slug:"furniture",
icon:Home,
products:"900+ Products",
description:"Modern furniture collection"
}


];





export default function CategoriesPage(){


return (

<main
className="
min-h-screen
bg-gradient-to-b
from-white
via-[#fffdf8]
to-[#f8f4ea]
dark:from-[#050505]
dark:via-[#050505]
dark:to-black
text-gray-900
dark:text-white
transition
"
>



<div
className="
max-w-7xl
mx-auto
px-5
py-12
"
>



{/* HERO */}


<motion.section

initial={{
opacity:0,
y:30
}}

animate={{
opacity:1,
y:0
}}

className="
relative
overflow-hidden
rounded-[35px]
bg-black
text-white
p-10
md:p-16
mb-12
"

>


<div
className="
absolute
right-0
top-0
w-72
h-72
bg-[#D4AF37]
opacity-20
blur-3xl
rounded-full
"
/>



<div className="
relative
z-10
max-w-3xl
">


<div
className="
inline-flex
items-center
gap-2
bg-[#D4AF37]/20
text-[#D4AF37]
px-5
py-2
rounded-full
font-semibold
"
>

<Sparkles size={18}/>

Premium Shopping Categories

</div>



<h1
className="
mt-6
text-4xl
md:text-6xl
font-black
"
>

Explore All Categories

</h1>



<p
className="
mt-5
text-gray-300
text-lg
"
>

Discover thousands of premium products from electronics,
fashion, lifestyle and more.

</p>



</div>


</motion.section>





{/* SEARCH */}


<div
className="
bg-white
dark:bg-white/5
border
border-gray-200
dark:border-white/10
rounded-3xl
p-4
mb-10
flex
items-center
gap-3
shadow-sm
"
>


<Search
className="text-[#D4AF37]"
/>


<input

placeholder="Search categories..."

className="
w-full
outline-none
bg-transparent
text-lg
"

/>


</div>






{/* CATEGORY GRID */}



<div
className="
grid
sm:grid-cols-2
lg:grid-cols-3
gap-7
"
>



{

categories.map((category,index)=>{


const Icon=category.icon;


return (


<motion.div

key={category.slug}

initial={{
opacity:0,
y:30
}}

animate={{
opacity:1,
y:0
}}

transition={{
delay:index*0.05
}}

whileHover={{
y:-10
}}

>


<Link

href={`/dashboard/categories/${category.slug}`}

className="
group
block
bg-white
dark:bg-white/5
rounded-[30px]
border
border-gray-200
dark:border-white/10
p-8
hover:border-[#D4AF37]
hover:shadow-2xl
transition
"

>


<div
className="
flex
justify-between
items-center
"
>


<div
className="
w-16
h-16
rounded-2xl
bg-[#D4AF37]/10
text-[#C99718]
flex
items-center
justify-center
group-hover:bg-[#D4AF37]
group-hover:text-black
transition
"
>

<Icon size={35}/>

</div>



<ArrowRight

className="
text-gray-400
group-hover:text-[#D4AF37]
group-hover:translate-x-2
transition
"

/>


</div>





<h2
className="
mt-6
text-2xl
font-black
"
>

{category.name}

</h2>



<p
className="
mt-3
text-gray-600
dark:text-gray-400
"
>

{category.description}

</p>



<div
className="
mt-6
inline-flex
bg-gray-100
dark:bg-black/30
px-5
py-2
rounded-full
font-bold
text-sm
"
>

{category.products}

</div>





<div
className="
mt-6
text-[#D4AF37]
font-bold
flex
items-center
gap-2
"
>

View Products

<ArrowRight size={18}/>

</div>




</Link>


</motion.div>


)


})

}


</div>





</div>


</main>

)

}
