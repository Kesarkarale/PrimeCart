"use client";


import {
Heart,
X
} from "lucide-react";


export default function WishlistPanel(){

return (

<div className="
fixed
right-0
top-0
h-screen
w-full
sm:w-[400px]
bg-white
dark:bg-[#0B0B0B]
z-[100]
shadow-2xl
">


<div className="
flex
justify-between
items-center
p-6
border-b
dark:border-white/10
">


<h2 className="
text-2xl
font-black
flex
gap-2
items-center
">

<Heart
className="text-red-500"
/>

Wishlist

</h2>


<X/>


</div>



<div className="
p-6
text-center
text-gray-500
">

No favourite products yet ❤️

</div>


</div>

);

}
