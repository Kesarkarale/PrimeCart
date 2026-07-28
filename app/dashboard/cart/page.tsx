"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ShieldCheck,
  Truck,
  ArrowRight,
  Sparkles
} from "lucide-react";

import { motion } from "framer-motion";


type CartItem = {
  id:number;
  name:string;
  image:string;
  price:number;
  quantity:number;
};



const initialCart:CartItem[] = [

{
id:1,
name:"Wireless Headphones",
image:"/products/headphone.png",
price:2499,
quantity:1
},

{
id:2,
name:"Smart Watch",
image:"/products/watch.png",
price:3499,
quantity:1
},

];



export default function CartPage(){


const [cart,setCart]=useState<CartItem[]>(initialCart);



const increaseQty=(id:number)=>{

setCart(prev=>

prev.map(item=>

item.id===id

?

{
...item,
quantity:item.quantity+1
}

:

item

)

)

}





const decreaseQty=(id:number)=>{

setCart(prev=>

prev.map(item=>

item.id===id && item.quantity>1

?

{
...item,
quantity:item.quantity-1
}

:

item

)

)

}





const removeItem=(id:number)=>{

setCart(prev=>

prev.filter(item=>item.id!==id)

)

}





const subtotal = cart.reduce(

(sum,item)=>

sum+(item.price*item.quantity),

0

);



const delivery = subtotal>1000 ? 0 : 99;


const total=subtotal+delivery;





return(

<main
className="
min-h-screen
bg-[#faf8f3]
px-5
py-10
"
>


<div className="
max-w-7xl
mx-auto
">


{/* TOP HEADER */}

<div className="
flex
justify-between
items-center
mb-10
">


<div>

<h1 className="
text-4xl
font-black
tracking-tight
">

Your Cart

</h1>


<p className="
text-gray-500
mt-2
">

Review your selected premium products

</p>


</div>


<div className="
bg-white
p-4
rounded-2xl
shadow
">

<ShoppingBag
size={35}
className="text-[#D4AF37]"
/>

</div>


</div>






<div className="
grid
lg:grid-cols-3
gap-8
">





{/* PRODUCTS */}


<div className="
lg:col-span-2
space-y-5
">



{
cart.length===0 ?


<div className="
bg-white
rounded-3xl
p-12
text-center
shadow
">


<ShoppingBag
size={70}
className="
mx-auto
text-gray-300
"
/>


<h2 className="
text-2xl
font-black
mt-5
">

Your cart is empty

</h2>


<Link
href="/"
className="
inline-flex
items-center
gap-2
mt-6
bg-black
text-white
px-7
py-3
rounded-xl
font-bold
"
>

Continue Shopping
<ArrowRight size={18}/>

</Link>


</div>



:


cart.map(item=>(


<motion.div

key={item.id}

initial={{opacity:0,y:20}}

animate={{opacity:1,y:0}}

className="
bg-white
rounded-3xl
p-5
shadow-sm
border
flex
gap-5
items-center
"
>


<div className="
relative
w-32
h-32
rounded-2xl
bg-gray-50
"
>


<Image

src={item.image}

alt={item.name}

fill

className="
object-contain
p-4
"

/>


</div>





<div className="
flex-1
">


<h2 className="
text-xl
font-bold
">

{item.name}

</h2>


<p className="
text-gray-400
text-sm
mt-1
">

Premium Quality Product

</p>



<p className="
text-2xl
font-black
mt-3
">

₹{item.price.toLocaleString("en-IN")}

</p>




<div className="
flex
items-center
gap-4
mt-4
">


<button

onClick={()=>decreaseQty(item.id)}

className="
w-9
h-9
rounded-full
border
flex
items-center
justify-center
hover:bg-black
hover:text-white
transition
"
>

<Minus size={16}/>

</button>




<span className="
font-bold
">

{item.quantity}

</span>



<button

onClick={()=>increaseQty(item.id)}

className="
w-9
h-9
rounded-full
border
flex
items-center
justify-center
hover:bg-black
hover:text-white
transition
"
>

<Plus size={16}/>

</button>


</div>


</div>





<div className="
text-right
">


<p className="
font-bold
mb-5
">

₹{(item.price*item.quantity).toLocaleString("en-IN")}

</p>



<button

onClick={()=>removeItem(item.id)}

className="
w-10
h-10
rounded-full
bg-red-50
text-red-500
flex
items-center
justify-center
hover:bg-red-500
hover:text-white
transition
"

>

<Trash2 size={18}/>

</button>



</div>



</motion.div>


))

}


</div>







{/* SUMMARY */}


<div>


<div className="
bg-white
rounded-3xl
p-7
border
shadow-sm
sticky
top-5
">


<div className="
flex
items-center
gap-2
mb-6
">

<Sparkles
className="text-[#D4AF37]"
/>


<h2 className="
text-2xl
font-black
">

Order Summary

</h2>

</div>




<div className="
space-y-4
">


<div className="flex justify-between">

<span>
Subtotal
</span>

<b>
₹{subtotal.toLocaleString("en-IN")}
</b>

</div>



<div className="flex justify-between">

<span>
Delivery
</span>


<b>

{
delivery===0
?
"FREE"
:
`₹${delivery}`
}

</b>


</div>



<div className="
border-t
pt-5
flex
justify-between
text-xl
">


<b>
Total
</b>


<b>
₹{total.toLocaleString("en-IN")}
</b>


</div>


</div>





<Link

href="/checkout"

className="
mt-8
h-14
rounded-2xl
bg-[#D4AF37]
hover:bg-black
transition
text-white
font-bold
flex
items-center
justify-center
gap-2
"

>

Checkout Now

<ArrowRight size={20}/>

</Link>





<div className="
mt-7
space-y-4
text-sm
text-gray-600
">


<div className="
flex
gap-3
items-center
">

<Truck/>

Free & Fast Delivery

</div>


<div className="
flex
gap-3
items-center
">

<ShieldCheck/>

100% Secure Payment

</div>


</div>



</div>

</div>




</div>


</div>


</main>

)

}
