"use client";

import Link from "next/link";

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

bg-white
dark:bg-black/80

backdrop-blur-xl

border-r
border-gray-200
dark:border-white/10

p-6

text-gray-900
dark:text-white

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
shadow-lg
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
text-gray-500
dark:text-gray-400
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


text-gray-600
dark:text-gray-300


hover:bg-[#D4AF37]/20

hover:text-[#D4AF37]

transition

"


>


<Icon size={21}/>


<span className="
font-medium
">

{item.name}

</span>


</Link>


)


})

}



</div>






{/* LOGOUT */}


<button

className="

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

border-gray-200
dark:border-white/10


text-gray-600
dark:text-gray-300


hover:border-[#D4AF37]

hover:text-[#D4AF37]


transition

"

>


<LogOut size={20}/>


Logout


</button>






</aside>

);


}
