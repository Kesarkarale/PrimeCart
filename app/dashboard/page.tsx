"use client";

import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  DollarSign,
  TrendingUp,
  Star,
  Truck,
  Menu,
  Bell,
  Search,
  Plus,
  ArrowUpRight
} from "lucide-react";

import { motion } from "framer-motion";
import { useState } from "react";



export default function Dashboard(){


const [open,setOpen]=useState(false);



const stats=[

{
title:"Total Revenue",
value:"₹12,45,800",
icon:DollarSign,
growth:"+18%"
},

{
title:"Total Orders",
value:"8,942",
icon:ShoppingBag,
growth:"+12%"
},

{
title:"Products",
value:"1,240",
icon:Package,
growth:"+9%"
},

{
title:"Customers",
value:"5,680",
icon:Users,
growth:"+15%"
}

];



const orders=[

{
id:"#PC1024",
customer:"Rahul Sharma",
product:"iPhone 16 Pro",
amount:"₹1,29,999",
status:"Delivered"
},

{
id:"#PC1025",
customer:"Sneha Patil",
product:"MacBook Air",
amount:"₹99,999",
status:"Processing"
},

{
id:"#PC1026",
customer:"Amit Joshi",
product:"AirPods Pro",
amount:"₹24,999",
status:"Shipped"
}

];





return (

<main className="
min-h-screen
bg-[#050505]
text-white
flex
">





{/* SIDEBAR */}



<aside className={`
fixed
md:static
top-0
left-0
h-screen
w-72
bg-black/80
backdrop-blur-xl
border-r
border-white/10
p-6
z-50
transition
${open?"translate-x-0":"-translate-x-full md:translate-x-0"}
`}>



<h1 className="
text-3xl
font-bold
mb-10
">

Prime
<span className="
text-[#D4AF37]
">

Cart

</span>

</h1>





<div className="
space-y-3
">


{
[

["Dashboard",LayoutDashboard],
["Products",Package],
["Orders",ShoppingBag],
["Customers",Users],
["Analytics",TrendingUp]

].map(([name,Icon]:any)=>(


<div

key={name}

className="
flex
items-center
gap-4
p-3
rounded-xl
hover:bg-[#D4AF37]/20
hover:text-[#D4AF37]
cursor-pointer
transition
"

>


<Icon size={22}/>

{name}

</div>


))

}



</div>






</aside>








{/* MAIN */}



<section className="
flex-1
p-5
md:p-8
">






{/* TOP BAR */}



<div className="
flex
justify-between
items-center
mb-8
">


<button

onClick={()=>setOpen(!open)}

className="
md:hidden
"

>

<Menu/>

</button>




<div>

<h1 className="
text-3xl
font-bold
">

Dashboard

</h1>


<p className="
text-gray-400
">

Welcome back, Admin 👑

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
px-4
py-2
rounded-xl
gap-2
">


<Search size={18}/>

Search

</div>



<Bell

className="
text-[#D4AF37]
"

/>



</div>


</div>










{/* STATS */}



<div className="
grid
sm:grid-cols-2
xl:grid-cols-4
gap-6
">


{

stats.map((item)=>{


const Icon=item.icon;


return (

<motion.div

whileHover={{
y:-8
}}

key={item.title}

className="
bg-white/10
backdrop-blur-xl
border
border-white/10
rounded-3xl
p-6
"


>


<div className="
flex
justify-between
">


<div className="
bg-[#D4AF37]
text-black
p-3
rounded-xl
">


<Icon/>

</div>


<span className="
text-green-400
text-sm
">

{item.growth}

</span>


</div>



<h3 className="
text-gray-400
mt-5
">

{item.title}

</h3>


<h2 className="
text-3xl
font-bold
mt-2
">

{item.value}

</h2>



</motion.div>

)

})

}


</div>









{/* CONTENT GRID */}



<div className="
grid
lg:grid-cols-3
gap-6
mt-8
">






{/* SALES CHART MOCK */}



<div className="
lg:col-span-2
bg-white/10
border
border-white/10
rounded-3xl
p-6
">


<div className="
flex
justify-between
">

<h2 className="
text-xl
font-bold
">

Sales Analytics

</h2>


<TrendingUp className="
text-[#D4AF37]
"/>


</div>




<div className="
h-56
flex
items-end
gap-5
mt-8
">


{
[40,70,50,90,65,100,80].map((h,i)=>(


<div

key={i}

className="
bg-gradient-to-t
from-[#D4AF37]
to-yellow-200
rounded-t-xl
flex-1
"

style={{

height:`${h}%`

}}

>

</div>


))

}


</div>



</div>









{/* INVENTORY */}



<div className="
bg-white/10
border
border-white/10
rounded-3xl
p-6
">


<h2 className="
font-bold
text-xl
mb-5
">

Inventory

</h2>



<div className="
space-y-5
">


{

[

["iPhone 16 Pro","25"],
["MacBook Air","12"],
["AirPods Pro","45"]

].map((p)=>(


<div className="
flex
justify-between
"

key={p[0]}

>


<span>{p[0]}</span>

<span className="
text-[#D4AF37]
">

{p[1]} left

</span>


</div>


))

}



</div>



</div>






</div>









{/* ORDERS */}



<div className="
mt-8
bg-white/10
border
border-white/10
rounded-3xl
p-6
overflow-x-auto
">


<div className="
flex
justify-between
mb-6
">


<h2 className="
text-xl
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





<table className="
w-full
text-left
">


<thead className="
text-gray-400
">

<tr>

<th className="p-3">ID</th>

<th>Customer</th>

<th>Product</th>

<th>Amount</th>

<th>Status</th>

</tr>

</thead>




<tbody>

{

orders.map(order=>(


<tr

key={order.id}

className="
border-t
border-white/10
"


>


<td className="p-3">

{order.id}

</td>


<td>

{order.customer}

</td>


<td>

{order.product}

</td>


<td>

{order.amount}

</td>


<td className="
text-[#D4AF37]
">

{order.status}

</td>



</tr>


))


}


</tbody>



</table>




</div>







</section>






</main>

);


}
