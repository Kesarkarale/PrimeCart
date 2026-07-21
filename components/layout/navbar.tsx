"use client";

import Link from "next/link";
import { 
  Search,
  Heart,
  ShoppingCart,
  User,
  ChevronDown,
  Menu,
  X
} from "lucide-react";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Navbar(){

const router = useRouter();

const [openCategory,setOpenCategory] = useState(false);
const [mobile,setMobile] = useState(false);
const [search,setSearch] = useState("");



const categories=[
 "Electronics",
 "Fashion",
 "Mobiles",
 "Beauty",
 "Home & Living",
 "Kitchen",
 "Sports"
];


const nav=[
 {
  name:"Home",
  link:"/"
 },
 {
  name:"Categories",
  link:"/categories"
 },
 {
  name:"Deals",
  link:"/deals"
 },
 {
  name:"New Arrivals",
  link:"/products/new"
 },
 {
  name:"Best Sellers",
  link:"/products/best"
 },
 {
  name:"Electronics",
  link:"/category/electronics"
 },
 {
  name:"Fashion",
  link:"/category/fashion"
 },
 {
  name:"Home & Living",
  link:"/category/home"
 },
 {
  name:"Beauty",
  link:"/category/beauty"
 }
];




function handleSearch(){

if(search.trim()){

router.push(`/search?q=${search}`);

}

}



return(

<header className="
bg-white
border-b
sticky
top-0
z-50
">


{/* MAIN NAV */}


<div className="
max-w-[1400px]
mx-auto
px-6
h-[75px]
flex
items-center
gap-8
">



{/* LOGO */}

<Link
href="/"
className="min-w-[210px]"
>

<h1 className="
text-3xl
font-black
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
">
Shop More. Pay Less.
</p>

</Link>







{/* SEARCH */}


<div className="
hidden
lg:flex
flex-1
h-11
">


<div className="relative">


<button

onClick={()=>setOpenCategory(!openCategory)}

className="
h-11
px-5
border
rounded-l-xl
bg-gray-50
flex
items-center
gap-2
text-sm
font-semibold
">

All Categories

<ChevronDown size={16}/>


</button>



{
openCategory &&

<div className="
absolute
top-12
left-0
bg-white
shadow-xl
rounded-xl
w-56
border
p-3
z-50
">

{
categories.map(cat=>(

<Link

key={cat}

href={`/category/${cat.toLowerCase().replaceAll(" ","-")}`}

className="
block
px-4
py-3
rounded-lg
hover:bg-[#D4AF37]
hover:text-white
"

>

{cat}

</Link>

))
}


</div>

}



</div>





<input

value={search}

onChange={(e)=>setSearch(e.target.value)}

onKeyDown={(e)=>{

if(e.key==="Enter")
handleSearch()

}}

placeholder="
Search for products, brands and more...
"

className="
flex-1
border-y
px-5
outline-none
text-sm
"
/>





<button

onClick={handleSearch}

className="
w-12
bg-[#D4AF37]
text-white
rounded-r-xl
flex
justify-center
items-center
hover:bg-black
transition
">

<Search size={20}/>

</button>



</div>









{/* RIGHT */}


<div className="
flex
items-center
gap-6
">





<Link
href="/login"
className="
flex
items-center
gap-2
"
>

<User/>

<div>

<p className="text-sm font-semibold">
Account
</p>

<p className="text-xs text-gray-500">
Sign in / Register
</p>


</div>

</Link>





<Link
href="/wishlist"
className="relative"
>

<Heart size={26}/>

<span
className="
absolute
-top-2
-right-2
bg-[#D4AF37]
text-white
text-xs
w-5
h-5
rounded-full
flex
items-center
justify-center
"
>
0
</span>


</Link>







<Link
href="/cart"
className="relative"
>

<ShoppingCart size={27}/>


<span
className="
absolute
-top-2
-right-2
bg-[#D4AF37]
text-white
text-xs
w-5
h-5
rounded-full
flex
items-center
justify-center
"
>
0
</span>


</Link>




<button

onClick={()=>setMobile(!mobile)}

className="
lg:hidden
"
>

{
mobile?
<X/>:
<Menu/>
}


</button>



</div>


</div>









{/* SECOND MENU */}


<div className="
border-t
">


<div className="
max-w-[1400px]
mx-auto
px-6
h-14
flex
items-center
gap-8
overflow-x-auto
">



<button

onClick={()=>setOpenCategory(!openCategory)}

className="
bg-[#D4AF37]
text-white
px-7
py-2
rounded-lg
font-semibold
flex
items-center
gap-2
"
>

<Menu size={18}/>

All Categories

</button>




{
nav.map((item,index)=>(

<Link

key={item.name}

href={item.link}

className={`
text-sm
font-semibold
whitespace-nowrap

${index===0?
"text-[#D4AF37]"
:
"text-gray-800"
}

`}

>

{item.name}

</Link>

))
}


</div>


</div>









{/* MOBILE */}

{
mobile &&

<div className="
lg:hidden
p-5
border-t
bg-white
">

{
nav.map(item=>(

<Link

key={item.name}

href={item.link}

className="
block
py-3
font-semibold
"

>

{item.name}

</Link>

))
}


</div>

}



</header>

)


}
