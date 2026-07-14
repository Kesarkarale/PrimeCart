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
  ArrowRight
} from "lucide-react";

import {motion} from "framer-motion";





const categories=[


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
name:"Watches",
slug:"watches",
icon:Watch,
products:"500+ Products",
description:"Luxury watches and smart wearables"
},



{
name:"Fashion",
slug:"fashion",
icon:Shirt,
products:"5000+ Products",
description:"Trendy fashion collections"
},



{
name:"Home & Living",
slug:"home",
icon:Home,
products:"1200+ Products",
description:"Furniture and home essentials"
},



{
name:"Gaming",
slug:"gaming",
icon:Gamepad2,
products:"900+ Products",
description:"Gaming accessories and consoles"
}



];







export default function CategoriesPage(){



return (

<div className="

min-h-screen

bg-gray-50

dark:bg-[#050505]


text-gray-900

dark:text-white


transition-colors

">





<div className="

max-w-7xl

mx-auto

px-5

py-10

">







{/* HEADER */}



<div className="mb-12">



<div className="

inline-flex

items-center

gap-2

bg-[#D4AF37]/10

text-[#D4AF37]

px-4

py-2

rounded-full

text-sm

font-semibold

">


<Sparkles size={16}/>

Premium Categories


</div>






<h1 className="

mt-5

text-5xl

font-black

">

Explore Categories

</h1>






<p className="

mt-4

max-w-2xl

text-gray-600

dark:text-gray-400

text-lg

">

Discover thousands of premium products from carefully selected categories.

</p>




</div>










{/* CATEGORY GRID */}



<div className="

grid

sm:grid-cols-2

lg:grid-cols-3

gap-7

">






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

delay:index*0.1

}}



whileHover={{

y:-8

}}


>



<Link

href={`/dashboard/categories/${category.slug}`}

className="

group

block


rounded-3xl


bg-white

dark:bg-white/5


border

border-gray-200

dark:border-white/10


p-8


hover:border-[#D4AF37]


transition


shadow-sm

dark:shadow-none


"

>







<div className="

flex

items-center

justify-between

">



<div className="

p-4

rounded-2xl


bg-[#D4AF37]/10


text-[#D4AF37]

group-hover:bg-[#D4AF37]

group-hover:text-black


transition

">


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







<h2 className="

mt-6

text-2xl

font-bold

">


{category.name}


</h2>






<p className="

mt-3


text-gray-600

dark:text-gray-400

">

{category.description}

</p>







<div className="

mt-6

inline-flex

px-4

py-2

rounded-full


bg-gray-100

dark:bg-black/30


text-sm


font-semibold

">

{category.products}


</div>






</Link>



</motion.div>



)


})


}







</div>





</div>




</div>


);


}
