 "use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

import { toast } from "sonner";



export default function CartPage(){


const supabase = createClient();


const [cart,setCart]=useState<any[]>([]);



async function fetchCart(){


const {

data:{
user

}

}=await supabase.auth.getUser();



if(!user) return;



const {data,error}=await supabase

.from("cart")

.select("*")

.eq(
"user_id",
user.id
);



if(error){

toast.error(error.message);

return;

}


setCart(data || []);


}





async function updateQuantity(
id:string,
quantity:number
){


if(quantity < 1) return;



await supabase

.from("cart")

.update({
quantity
})

.eq(
"id",
id
);



fetchCart();


}





async function removeItem(id:string){


await supabase

.from("cart")

.delete()

.eq(
"id",
id
);



toast.success(
"Removed from cart"
);


fetchCart();


}





useEffect(()=>{

fetchCart();

},[]);





const total = cart.reduce(

(sum,item)=>

sum + item.price * item.quantity,

0

);




return (

<div className="
text-white
">


<div className="
flex
items-center
justify-between
mb-8
">


<div>

<h1 className="
text-4xl
font-bold
">

Shopping Cart

</h1>


<p className="
text-gray-400
mt-2
">

Your selected premium products

</p>


</div>



<ShoppingBag
className="text-[#D4AF37]"
size={40}
/>



</div>





{

cart.length===0 ?


(

<div className="
bg-white/5
border
border-white/10
rounded-3xl
p-10
text-center
">


<h2 className="
text-2xl
font-bold
">

Your cart is empty

</h2>


<Link

href="/dashboard/products"

className="
inline-block
mt-5
bg-[#D4AF37]
text-black
px-6
py-3
rounded-xl
font-bold
"

>

Continue Shopping

</Link>


</div>

)



:

(

<div className="
space-y-5
">


{
cart.map(item=>(


<div

key={item.id}

className="
bg-white/5
border
border-white/10
rounded-3xl
p-5
flex
flex-col
md:flex-row
gap-5
items-center
"


>



<Image

src={item.image}

alt={item.name}

width={120}

height={120}

className="
rounded-2xl
object-contain
bg-black/30
p-3
"

/>





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
text-[#D4AF37]
font-bold
mt-2
">

₹{item.price}

</p>



<div className="
flex
items-center
gap-3
mt-4
">


<button

onClick={()=>updateQuantity(
item.id,
item.quantity-1
)}

className="
bg-white/10
p-2
rounded-lg
"

>

<Minus size={16}/>

</button>



<span>

{item.quantity}

</span>



<button

onClick={()=>updateQuantity(
item.id,
item.quantity+1
)}

className="
bg-white/10
p-2
rounded-lg
"

>

<Plus size={16}/>

</button>


</div>


</div>





<button

onClick={()=>removeItem(item.id)}

className="
text-red-500
hover:scale-110
transition
"

>

<Trash2/>

</button>



</div>


))

}



<div className="
bg-[#D4AF37]
text-black
rounded-3xl
p-6
flex
justify-between
items-center
">


<h2 className="
text-2xl
font-black
">

Total

</h2>


<h2 className="
text-3xl
font-black
">

₹{total.toLocaleString()}

</h2>


</div>



<Link

href="/dashboard/checkout"

className="
block
text-center
bg-black
border
border-[#D4AF37]
text-[#D4AF37]
py-4
rounded-xl
font-bold
hover:bg-[#D4AF37]
hover:text-black
transition
"

>

Proceed To Checkout

</Link>



</div>

)


}


</div>

)

}
