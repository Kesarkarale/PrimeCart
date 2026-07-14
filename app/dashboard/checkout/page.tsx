"use client";


import {useEffect,useState} from "react";

import {useRouter} from "next/navigation";

import {createClient} from "@/lib/supabase/client";

import {toast} from "sonner";

import {
CreditCard,
ShoppingBag
} from "lucide-react";



export default function CheckoutPage(){


const supabase=createClient();

const router=useRouter();



const [cart,setCart]=useState<any[]>([]);


const [name,setName]=useState("");

const [address,setAddress]=useState("");

const [phone,setPhone]=useState("");

const [loading,setLoading]=useState(false);





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




useEffect(()=>{

getCart();

},[]);





const total = cart.reduce(

(sum,item)=>

sum + item.price * item.quantity,

0

);






async function placeOrder(){



if(!name || !address || !phone){

toast.error(
"Please fill all details"
);

return;

}



try{


setLoading(true);



const {

data:{
user

}

}=await supabase.auth.getUser();



if(!user)return;





const {error}=await supabase

.from("orders")

.insert({

user_id:user.id,

customer_name:name,

address,

phone,

items:cart,

total,

status:"Pending"

});





if(error){

throw error;

}





// clear cart

await supabase

.from("cart")

.delete()

.eq(
"user_id",
user.id
);





toast.success(
"Order placed successfully 🎉"
);



router.push(
"/dashboard/orders"
);



}


catch(error:any){


toast.error(
error.message
);


}


finally{

setLoading(false);

}


}







return (

<div className="
text-white
max-w-5xl
mx-auto
">


<h1 className="
text-4xl
font-bold
mb-8
">

Checkout

</h1>





<div className="
grid
md:grid-cols-2
gap-8
">



{/* FORM */}


<div className="
bg-white/5
border
border-white/10
rounded-3xl
p-6
">


<h2 className="
text-xl
font-bold
mb-5
">

Delivery Details

</h2>



<input

placeholder="Full Name"

value={name}

onChange={
e=>setName(e.target.value)
}

className="
w-full
bg-black/40
border
border-white/20
rounded-xl
p-3
mb-4
"

/>



<input

placeholder="Phone Number"

value={phone}

onChange={
e=>setPhone(e.target.value)
}

className="
w-full
bg-black/40
border
border-white/20
rounded-xl
p-3
mb-4
"

/>




<textarea

placeholder="Full Address"

value={address}

onChange={
e=>setAddress(e.target.value)
}

className="
w-full
bg-black/40
border
border-white/20
rounded-xl
p-3
h-32
"

/>



</div>







{/* SUMMARY */}


<div className="
bg-white/5
border
border-white/10
rounded-3xl
p-6
">


<div className="
flex
items-center
gap-3
mb-5
">

<ShoppingBag
className="text-[#D4AF37]"
/>

<h2 className="
text-xl
font-bold
">

Order Summary

</h2>


</div>




{

cart.map(item=>(

<div

key={item.id}

className="
flex
justify-between
py-3
border-b
border-white/10
"

>

<span>

{item.name}

× {item.quantity}

</span>


<span>

₹{item.price*item.quantity}

</span>


</div>


))


}



<h2 className="
text-3xl
font-black
mt-6
text-[#D4AF37]
">

₹{total.toLocaleString()}

</h2>




<button

onClick={placeOrder}

disabled={loading}

className="
mt-6
w-full
bg-[#D4AF37]
text-black
py-4
rounded-xl
font-bold
flex
justify-center
gap-2
"

>


<CreditCard/>

{

loading?

"Processing..."

:

"Place Order"

}


</button>



</div>



</div>


</div>

)

}
