"use client";

import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  DollarSign,
  TrendingUp,
  Star,
  Bell,
  Search,
  LogOut,
  Menu,
  X,
  Plus,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";


export default function Dashboard(){


const router = useRouter();

const supabase = createClient();


const [user,setUser]=useState<any>(null);

const [sidebar,setSidebar]=useState(false);



useEffect(()=>{


async function getUser(){


const {data}=await supabase.auth.getUser();


if(!data.user){

router.push("/login");

return;

}


setUser(data.user);


}


getUser();


},[]);





async function logout(){


await supabase.auth.signOut();


toast.success(
"Logged out successfully"
);


router.push("/login");


}





const stats=[

{
title:"Total Revenue",
value:"₹12,45,000",
icon:DollarSign,
growth:"+24%"
},

{
title:"Total Orders",
value:"8,540",
icon:ShoppingBag,
growth:"+18%"
},

{
title:"Products",
value:"1,240",
icon:Package,
growth:"+12%"
},

{
title:"Customers",
value:"25.8K",
icon:Users,
growth:"+32%"
}

];





return(

<main className="
min-h-screen
bg-[#050505]
text-white
flex
">



{/* Sidebar */}


<aside className={`
fixed
md:static
z-40
h-screen
w-72
bg-black
border-r
border-white/10
p-6
transition
${sidebar?"left-0":"-left-full md:left-0"}

`}>



<div className="
flex
items-center
gap-3
mb-10
">


<div className="
bg-[#D4AF37]
text-black
p-3
rounded-xl
">


<ShoppingBag/>


</div>



<h1 className="
text-2xl
font-bold
">

Prime<span className="text-[#D4AF37]">
Cart
</span>

</h1>


</div>






<nav className="
space-y-3
">


{
[
["Dashboard",LayoutDashboard],
["Products",Package],
["Orders",ShoppingBag],
["Customers",Users],
]

.map(([name,Icon]:any)=>(


<button

key={name}

className="
w-full
flex
items-center
gap-4
p-4
rounded-xl
text-gray-300
hover:bg-white/10
hover:text-[#D4AF37]
transition
"

>


<Icon size={20}/>

{name}


</button>


))


}


</nav>







<button

onClick={logout}

className="
mt-10
w-full
flex
items-center
gap-3
p-4
rounded-xl
bg-red-500/10
text-red-400
"

>


<LogOut size={20}/>

Logout


</button>




</aside>










{/* MAIN */}


<section className="
flex-1
p-6
md:p-10
">





{/* Topbar */}


<div className="
flex
justify-between
items-center
mb-10
">


<button

onClick={()=>setSidebar(!sidebar)}

className="
md:hidden
"

>

{

sidebar?

<X/>:

<Menu/>

}


</button>





<div>


<h1 className="
text-4xl
font-bold
">

Good Morning 👋

</h1>


<p className="
text-gray-400
">

Welcome back to your PrimeCart store

</p>


</div>




<div className="
flex
gap-4
items-center
">


<div className="
hidden
md:flex
bg-white/10
rounded-xl
px-4
py-3
gap-2
">


<Search size={18}/>

Search...


</div>



<Bell
className="
text-[#D4AF37]
"
/>


</div>



</div>









{/* Stats */}


<div className="
grid
md:grid-cols-4
gap-6
">



{

stats.map((item)=>(


<div

key={item.title}

className="
bg-white/10
border
border-white/10
rounded-3xl
p-6
hover:border-[#D4AF37]
transition
"

>


<item.icon

className="
text-[#D4AF37]
mb-5
"

/>



<p className="
text-gray-400
">

{item.title}

</p>


<h2 className="
text-3xl
font-bold
mt-2
">

{item.value}

</h2>


<p className="
text-green-400
mt-3
">

{item.growth}

</p>


</div>



))


}


</div>









{/* Analytics */}


<div className="
grid
lg:grid-cols-3
gap-6
mt-10
">





<div className="
lg:col-span-2
bg-white/10
border
border-white/10
rounded-3xl
p-8
">


<div className="
flex
justify-between
mb-6
">


<h2 className="
text-2xl
font-bold
">

Sales Analytics

</h2>


<TrendingUp
className="
text-[#D4AF37]
"/>


</div>





<div className="
h-60
flex
items-end
gap-5
">


{

[40,70,50,90,65,85,100].map((h,i)=>(


<div

key={i}

style={{
height:`${h}%`
}}

className="
flex-1
bg-[#D4AF37]/80
rounded-t-xl
"

/>


))


}



</div>


</div>







<div className="
bg-white/10
border
border-white/10
rounded-3xl
p-8
">


<h2 className="
text-xl
font-bold
mb-6
">

Store Rating

</h2>



<div className="
flex
items-center
gap-3
">


<Star
className="
text-[#D4AF37]
fill-[#D4AF37]
"
/>


<h3 className="
text-4xl
font-bold
">

4.9

</h3>


</div>


<p className="
text-gray-400
mt-4
">

Excellent customer satisfaction

</p>



</div>




</div>







{/* Recent Orders */}


<div className="
mt-10
bg-white/10
border
border-white/10
rounded-3xl
p-8
">


<div className="
flex
justify-between
mb-6
">


<h2 className="
text-2xl
font-bold
">

Recent Orders

</h2>



<button className="
bg-[#D4AF37]
text-black
px-4
py-2
rounded-xl
flex
gap-2
items-center
">


<Plus size={18}/>

Add Product


</button>


</div>






{

[
"iPhone 16 Pro",
"MacBook Air M4",
"Apple Watch",
"Gaming Laptop"

].map(product=>(


<div

key={product}

className="
flex
justify-between
border-b
border-white/10
py-4
"


>


<span>
{product}
</span>


<span className="
text-[#D4AF37]
">

Completed

</span>


</div>


))


}



</div>







</section>


</main>

);


}
