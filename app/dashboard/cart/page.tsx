"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ShieldCheck,
  Truck
} from "lucide-react";

import { useState } from "react";



const initialCart = [
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
  }

];



export default function CartPage(){


const [cart,setCart]=useState(initialCart);



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

(total,item)=>

total + item.price * item.quantity,

0

);


const delivery = subtotal > 1000 ? 0 : 99;


const total = subtotal + delivery;



return (

<main
className="
min-h-screen
bg-[#faf8f3]
px-5
py-10
"
>



<div
className="
max-w-7xl
mx-auto
"
>



{/* HEADER */}


<div className="
flex
items-center
justify-between
mb-10
">


<div>

<h1
className="
text-4xl
font-black
"
>

Shopping Cart

</h1>


<p
className="
text-gray-500
mt-2
"
>

Review your products before checkout

</p>


</div>



<ShoppingBag
size={40}
className="text-[#D4AF37]"
/>


</div>






<div
className="
grid
lg:grid-cols-3
gap-8
"
>





{/* CART ITEMS */}


<div
className="
lg:col-span-2
space-y-5
"
>


{
cart.length===0

?

<div
className="
bg-white
rounded-3xl
p-10
text-center
"
>

<h2
className="
text-2xl
font-bold
"
>
Your cart is empty
</h2>


<Link
href="/"
className="
inline-block
mt-5
bg-[#D4AF37]
px-6
py-3
rounded-xl
text-white
font-bold
"
>

Continue Shopping

</Link>


</div>


:


cart.map(item=>(


<div

key={item.id}

className="
bg-white
rounded-3xl
p-5
border
flex
gap-5
items-center
"


>


<div
className="
relative
w-32
h-32
bg-gray-50
rounded-2xl
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





<div
className="
flex-1
"
>


<h2
className="
text-xl
font-bold
"
>

{item.name}

</h2>


<p
className="
text-2xl
font-black
mt-2
"
>

₹{item.price}

</p>



<div
className="
flex
items-center
gap-4
mt-4
"
>


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
"

>

<Minus size={16}/>

</button>



<span
className="
font-bold
"
>

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
"

>

<Plus size={16}/>

</button>



</div>



</div>






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
"

>

<Trash2 size={18}/>

</button>



</div>


))


}



</div>








{/* SUMMARY */}


<div>


<div
className="
bg-white
rounded-3xl
p-7
border
sticky
top-5
"
>


<h2
className="
text-2xl
font-black
mb-6
"
>

Order Summary

</h2>




<div
className="
space-y-4
"
>


<div
className="
flex
justify-between
"
>

<span>
Subtotal
</span>

<b>
₹{subtotal}
</b>

</div>



<div
className="
flex
justify-between
"
>

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



<div
className="
border-t
pt-4
flex
justify-between
text-xl
"
>

<span
className="font-bold"
>
Total
</span>


<b>
₹{total}
</b>


</div>


</div>





<Link

href="/checkout"

className="
mt-8
w-full
h-14
rounded-2xl
bg-[#D4AF37]
hover:bg-black
text-white
font-bold
flex
items-center
justify-center
transition
"

>

Proceed To Checkout

</Link>





<div
className="
mt-6
space-y-3
text-sm
text-gray-600
"
>


<div className="
flex
gap-3
items-center
"
>

<Truck size={20}/>

Free delivery available

</div>



<div className="
flex
gap-3
items-center
"
>

<ShieldCheck size={20}/>

Secure payment

</div>


</div>



</div>


</div>




</div>



</main>

)

}
