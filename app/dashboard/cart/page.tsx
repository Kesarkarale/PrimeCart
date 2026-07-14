"use client";


import {useEffect,useState} from "react";

import {createClient} from "@/lib/supabase/client";

import {
Trash2
} from "lucide-react";



export default function CartPage(){


const [cart,setCart]=useState<any[]>([]);



const supabase=createClient();



async function getCart(){


const {
data:{
user
}

}=await supabase.auth.getUser();



if(!user)return;



const {data}=await supabase
.from("cart")
.select("*")
.eq(
"user_id",
user.id
);



setCart(data || []);

}



async function removeItem(id:string){


await supabase
.from("cart")
.delete()
.eq(
"id",
id
);


getCart();


}



useEffect(()=>{

getCart();

},[]);




const total =
cart.reduce(
(sum,item)=>
sum+(item.price*item.quantity),
0
);



return (

<div className="
text-white
">


<h1 className="
text-4xl
font-bold
mb-8
">

My Cart

</h1>



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
rounded-2xl
p-5
flex
justify-between
items-center
"


>


<div>

<h2 className="
font-bold
text-xl
">

{item.name}

</h2>


<p className="
text-[#D4AF37]
">

₹{item.price}

</p>

</div>



<button

onClick={()=>
removeItem(item.id)
}

className="
text-red-500
"

>

<Trash2/>

</button>



</div>


))


}



</div>





<div className="
mt-10
text-3xl
font-bold
">

Total:
<span className="text-[#D4AF37]">
 ₹{total}
</span>

</div>



</div>

)

}
