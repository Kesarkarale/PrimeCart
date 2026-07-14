"use client";

import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus
} from "lucide-react";


export default function CartDrawer(){

return (

<div className="
fixed
right-0
top-0
h-screen
w-full
sm:w-[420px]
bg-white
dark:bg-[#0B0B0B]
z-[100]
shadow-2xl
border-l
border-gray-200
dark:border-white/10
">


{/* HEADER */}

<div className="
flex
items-center
justify-between
p-6
border-b
border-gray-200
dark:border-white/10
">


<h2 className="
text-2xl
font-black
flex
items-center
gap-2
">

<ShoppingBag
className="text-[#D4AF37]"
/>

Cart

</h2>


<button>

<X/>

</button>


</div>





{/* PRODUCT */}


<div className="
p-6
space-y-5
">


<div className="
rounded-2xl
bg-gray-100
dark:bg-white/5
p-4
">


<div className="
flex
gap-4
">


<div className="
h-20
w-20
rounded-xl
bg-white
flex
items-center
justify-center
text-4xl
">

📱

</div>



<div className="flex-1">


<h3 className="font-bold">
iPhone 16 Pro Max
</h3>


<p className="
text-[#D4AF37]
font-bold
mt-1
">

₹1,29,999

</p>



<div className="
flex
items-center
gap-3
mt-3
">


<button className="
h-8
w-8
rounded-lg
bg-black
text-white
flex
items-center
justify-center
">

<Minus size={14}/>

</button>


<span>
1
</span>


<button className="
h-8
w-8
rounded-lg
bg-[#D4AF37]
text-black
flex
items-center
justify-center
">

<Plus size={14}/>

</button>


</div>


</div>



<button>

<Trash2
size={18}
className="text-red-500"
/>

</button>


</div>


</div>



</div>





{/* SUMMARY */}


<div className="
absolute
bottom-0
w-full
p-6
border-t
border-gray-200
dark:border-white/10
bg-white
dark:bg-[#0B0B0B]
">


<div className="
flex
justify-between
text-lg
font-bold
">


<span>
Total
</span>


<span className="text-[#D4AF37]">
₹1,29,999
</span>


</div>




<button className="
mt-5
w-full
rounded-xl
bg-[#D4AF37]
py-4
font-black
text-black
hover:scale-105
transition
">

Proceed To Checkout

</button>


</div>


</div>

);

}
