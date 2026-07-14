"use client";

import {
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
} from "lucide-react";

import { motion } from "framer-motion";


const services = [

{
icon:Truck,
title:"Free Delivery",
description:"Fast & safe delivery across India"
},

{
icon:ShieldCheck,
title:"Secure Payment",
description:"100% protected transactions"
},

{
icon:RotateCcw,
title:"Easy Returns",
description:"7 days hassle free returns"
},

{
icon:Headphones,
title:"24/7 Support",
description:"Always here to help you"
}

];



export default function Services(){

return (

<section className="mt-16">


<div className="
grid
sm:grid-cols-2
lg:grid-cols-4
gap-6
">


{
services.map((item,index)=>{

const Icon=item.icon;


return (

<motion.div

key={item.title}

initial={{
opacity:0,
y:30
}}

whileInView={{
opacity:1,
y:0
}}

transition={{
delay:index*0.1
}}

viewport={{
once:true
}}


className="
rounded-3xl
border
border-gray-200
dark:border-white/10
bg-white
dark:bg-[#111827]
p-6
text-center
hover:-translate-y-2
transition
shadow-sm
hover:shadow-xl
"

>


<div className="
mx-auto
h-16
w-16
rounded-2xl
bg-[#D4AF37]
text-black
flex
items-center
justify-center
">


<Icon size={30}/>


</div>



<h3 className="
mt-5
font-bold
text-lg
text-gray-900
dark:text-white
">

{item.title}

</h3>


<p className="
mt-2
text-sm
text-gray-500
dark:text-gray-400
">

{item.description}

</p>



</motion.div>


)

})

}


</div>


</section>

)

}
