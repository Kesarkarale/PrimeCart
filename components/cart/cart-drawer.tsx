 "use client";

import {
  X,
  ShoppingCart
} from "lucide-react";


interface CartDrawerProps {
  close: () => void;
}


export default function CartDrawer({
  close
}: CartDrawerProps){


return (

<div
className="
fixed
inset-0
z-50
bg-black/50
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
dark:bg-[#111]
shadow-2xl
p-6
"
>


<div
className="
flex
items-center
justify-between
mb-8
"
>


<h2
className="
text-2xl
font-bold
"
>

Shopping Cart

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

<X size={22}/>

</button>


</div>





<div
className="
flex
flex-col
items-center
justify-center
h-[70%]
text-gray-500
"
>


<ShoppingCart size={50}/>


<p className="mt-4">

Your cart is empty

</p>


</div>



</div>



</div>

)

}
