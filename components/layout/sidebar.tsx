"use client";

import Link from "next/link";
import Image from "next/image";

import {
  Home,
  ShoppingBag,
  Grid,
  Heart,
  Package,
  User,
  Settings,
  LogOut
} from "lucide-react";


export default function Sidebar(){


const menu=[

{
name:"Home",
icon:Home,
link:"/dashboard"
},

{
name:"Categories",
icon:Grid,
link:"/dashboard/categories"
},

{
name:"Products",
icon:ShoppingBag,
link:"/dashboard/products"
},

{
name:"Wishlist",
icon:Heart,
link:"/dashboard/wishlist"
},

{
name:"Orders",
icon:Package,
link:"/dashboard/orders"
},

{
name:"Profile",
icon:User,
link:"/dashboard/profile"
},

{
name:"Settings",
icon:Settings,
link:"/dashboard/settings"
},

];


return (

<aside className="
h-screen
w-72
fixed
left-0
top-0
bg-black/80
backdrop-blur-xl
border-r
border-white/10
p-6
text-white
hidden
md:block
">



{/* LOGO */}

<div className="
flex
items-center
gap-3
mb-10
">


<div className="
bg-gradient-to-br
from-yellow-300
to-yellow-700
p-3
rounded-xl
text-black
">

<ShoppingBag size={28}/>

</div>



<div>

<h1 className="
text-2xl
font-bold
">

Prime
<span className="
text-[#D4AF37]
">
Cart
</span>

</h1>


<p className="
text-xs
text-gray-400
">

Luxury Shopping

</p>


</div>


</div>





{/* MENU */}


<div className="
space-y-2
">


{
menu.map((item)=>{


const Icon=item.icon;


return (

<Link

href={item.link}

key={item.name}

className="
flex
items-center
gap-4
px-4
py-3
rounded-xl
text-gray-300
hover:bg-[#D4AF37]/20
hover:text-[#D4AF37]
transition
"


>


<Icon size={21}/>


<span>

{item.name}

</span>


</Link>


)


})

}


</div>







{/* LOGOUT */}


<button className="
absolute
bottom-8
left-6
right-6
flex
items-center
gap-3
px-4
py-3
rounded-xl
border
border-white/10
hover:border-[#D4AF37]
transition
text-gray-300
">


<LogOut size={20}/>

Logout


</button>





</aside>

);


}
