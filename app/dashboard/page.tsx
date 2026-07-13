"use client";

import { useEffect, useState } from "react";

import {
  Search,
  ShoppingCart,
  Heart,
  Package,
  User,
  MapPin,
  CreditCard,
  Settings,
  LogOut,
  Gift,
  Star,
  Menu,
  X
} from "lucide-react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";



export default function Dashboard(){


const router = useRouter();

const supabase = createClient();


const [user,setUser]=useState<any>(null);

const [menu,setMenu]=useState(false);





useEffect(()=>{


async function loadUser(){


const {data}=await supabase.auth.getUser();


if(!data.user){

router.push("/login");

return;

}


setUser(data.user);


}


loadUser();


},[]);






async function logout(){


await supabase.auth.signOut();

toast.success("Logout successful");

router.push("/login");


}







const menuItems=[

["My Profile",User],

["My Orders",Package],

["Wishlist",Heart],

["My Cart",ShoppingCart],

["Addresses",MapPin],

["Payments",CreditCard],

["Settings",Settings]


];







const products=[

{
name:"iPhone 16 Pro",
price:"₹1,29,999",
rating:"4.9",
emoji:"📱"
},

{
name:"MacBook Air M4",
price:"₹99,999",
rating:"4.8",
emoji:"💻"
},

{
name:"Apple Watch",
price:"₹45,000",
rating:"4.7",
emoji:"⌚"
},

{
name:"Premium Sneakers",
price:"₹6,999",
rating:"4.6",
emoji:"👟"
}


];







return(

<main className="
min-h-screen
bg-gray-100
text-gray-900
">






{/* HEADER */}


<header className="
bg-white
shadow-sm
sticky
top-0
z-50
">


<div className="
max-w-7xl
mx-auto
px-5
py-4
flex
items-center
justify-between
">



<div className="
flex
items-center
gap-3
">


<button

onClick={()=>setMenu(!menu)}

className="
md:hidden
"

>

{
menu?
<X/>
:
<Menu/>
}

</button>





<div className="
bg-[#D4AF37]
p-3
rounded-xl
text-black
">


<ShoppingCart/>

</div>



<h1 className="
text-2xl
font-bold
">


Prime<span className="
text-[#D4AF37]
">

Cart

</span>


</h1>


</div>








<div className="
hidden
md:flex
items-center
bg-gray-100
rounded-xl
px-4
py-3
w-[450px]
gap-3
">


<Search size={20}/>


<input

placeholder="Search products, brands and more"

className="
bg-transparent
outline-none
w-full
"

/>


</div>






<div className="
flex
gap-5
items-center
">


<Heart/>

<ShoppingCart/>


<User/>

</div>




</div>



</header>









<div className="
max-w-7xl
mx-auto
px-5
py-8
flex
gap-6
">







{/* SIDEBAR */}



<aside className={`

fixed
md:static
top-20
left-0
w-72
bg-white
rounded-2xl
p-6
shadow-sm
h-fit
z-40

${menu?
"block":
"hidden md:block"}

`}>




<div className="
mb-6
">


<h2 className="
font-bold
text-xl
">

Hello 👋

</h2>


<p className="
text-gray-500
text-sm
">

{user?.email}

</p>


</div>





{

menuItems.map(([name,Icon]:any)=>(


<button

key={name}

className="
flex
items-center
gap-4
w-full
p-3
rounded-xl
hover:bg-yellow-50
hover:text-[#D4AF37]
transition
"


>


<Icon size={20}/>

{name}


</button>


))


}






<button

onClick={logout}

className="
mt-6
flex
items-center
gap-3
text-red-500
"

>

<LogOut/>

Logout

</button>



</aside>









{/* CONTENT */}


<section className="
flex-1
">






<h1 className="
text-3xl
font-bold
mb-6
">

My Dashboard

</h1>









{/* QUICK CARDS */}



<div className="
grid
grid-cols-2
md:grid-cols-4
gap-5
">



<div className="
bg-white
rounded-2xl
p-5
shadow-sm
">

<Package
className="text-[#D4AF37]"
/>

<p className="
mt-3
">

Orders

</p>

<h2 className="
text-2xl
font-bold
">

12

</h2>


</div>





<div className="
bg-white
rounded-2xl
p-5
shadow-sm
">

<Heart
className="text-red-500"
/>


<p className="mt-3">
Wishlist
</p>


<h2 className="text-2xl font-bold">

8

</h2>


</div>







<div className="
bg-white
rounded-2xl
p-5
shadow-sm
">

<Gift
className="text-[#D4AF37]"
/>


<p className="mt-3">
Coupons
</p>


<h2 className="text-2xl font-bold">

25

</h2>


</div>








<div className="
bg-white
rounded-2xl
p-5
shadow-sm
">


<CreditCard
className="text-green-500"
/>


<p className="mt-3">
Wallet
</p>


<h2 className="text-2xl font-bold">

₹5000

</h2>



</div>




</div>











{/* ORDER */}



<div className="
mt-8
bg-white
rounded-2xl
p-6
shadow-sm
">


<h2 className="
text-xl
font-bold
mb-5
">

Recent Orders

</h2>



<div className="
flex
justify-between
border-b
py-4
">


<span>
iPhone 16 Pro
</span>


<span className="
text-green-600
">

Delivered

</span>


</div>



<div className="
flex
justify-between
py-4
">

<span>

MacBook Air

</span>


<span className="
text-orange-500
">

Shipping

</span>


</div>


</div>









{/* PRODUCTS */}



<h2 className="
text-2xl
font-bold
mt-10
mb-5
">

Recommended For You

</h2>





<div className="
grid
md:grid-cols-4
gap-5
">


{

products.map(product=>(


<div

key={product.name}

className="
bg-white
rounded-2xl
p-5
shadow-sm
hover:shadow-lg
transition
"


>


<div className="
text-6xl
text-center
">

{product.emoji}

</div>


<h3 className="
font-bold
mt-4
">

{product.name}

</h3>


<div className="
flex
items-center
gap-1
text-yellow-500
mt-2
">

<Star size={16}/>

{product.rating}

</div>


<p className="
font-bold
mt-2
">

{product.price}

</p>


<button className="
mt-4
w-full
bg-[#D4AF37]
py-2
rounded-xl
font-semibold
">

Add Cart

</button>



</div>


))


}



</div>





</section>




</div>




</main>

);


}
