 "use client";


import {
X,
Heart
} from "lucide-react";


interface WishlistPanelProps {
close:()=>void;
}



export default function WishlistPanel({
close
}:WishlistPanelProps){


return (

<div
className="
fixed
inset-0
z-[100]
bg-black/50
backdrop-blur-sm
flex
justify-end
"
>


<div
className="
w-full
max-w-md
h-full
bg-white
dark:bg-[#111827]
p-6
shadow-2xl
"
>


<div
className="
flex
justify-between
items-center
border-b
pb-5
dark:border-white/10
"
>


<h2
className="
text-2xl
font-bold
"
>

Wishlist

</h2>



<button
onClick={close}
className="
h-10
w-10
rounded-xl
border
flex
items-center
justify-center
"
>

<X size={20}/>

</button>


</div>



<div
className="
h-[80%]
flex
flex-col
items-center
justify-center
text-gray-500
"
>


<Heart size={55}/>


<p className="mt-4">

Your wishlist is empty

</p>


</div>


</div>


</div>

)

}
