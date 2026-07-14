 "use client";

import Link from "next/link";

import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
} from "react-icons/fa";


export default function Footer(){

return (

<footer
className="
mt-20
bg-[#050505]
text-white
rounded-t-3xl
"
>


<div
className="
max-w-7xl
mx-auto
px-5
py-12
grid
md:grid-cols-4
gap-10
"
>


{/* BRAND */}

<div>


<h2
className="
text-3xl
font-black
"
>

Prime

<span className="text-[#D4AF37]">
Cart
</span>

</h2>



<p
className="
mt-4
text-gray-400
"
>

Premium online shopping marketplace for luxury products.

</p>




{/* SOCIAL ICONS */}

<div
className="
flex
gap-4
mt-5
"
>


<div
className="
h-10
w-10
rounded-full
bg-white/10
flex
items-center
justify-center
hover:bg-[#D4AF37]
transition
cursor-pointer
"
>

<FaInstagram size={18}/>

</div>




<div
className="
h-10
w-10
rounded-full
bg-white/10
flex
items-center
justify-center
hover:bg-[#D4AF37]
transition
cursor-pointer
"
>

<FaFacebook size={18}/>

</div>




<div
className="
h-10
w-10
rounded-full
bg-white/10
flex
items-center
justify-center
hover:bg-[#D4AF37]
transition
cursor-pointer
"
>

<FaTwitter size={18}/>

</div>


</div>


</div>





{/* QUICK LINKS */}

<div>


<h3
className="
font-bold
text-lg
"
>

Quick Links

</h3>



<ul
className="
mt-4
space-y-3
text-gray-400
"
>


<li>

<Link
href="/dashboard"
className="hover:text-[#D4AF37]"
>

Home

</Link>

</li>



<li>

<Link
href="/products"
className="hover:text-[#D4AF37]"
>

Products

</Link>

</li>



<li>

<Link
href="/categories"
className="hover:text-[#D4AF37]"
>

Categories

</Link>

</li>



<li>

<Link
href="/orders"
className="hover:text-[#D4AF37]"
>

Orders

</Link>

</li>


</ul>


</div>







{/* CUSTOMER SERVICE */}

<div>


<h3
className="
font-bold
text-lg
"
>

Customer Service

</h3>



<ul
className="
mt-4
space-y-3
text-gray-400
"
>


<li className="hover:text-[#D4AF37] cursor-pointer">

Help Center

</li>



<li className="hover:text-[#D4AF37] cursor-pointer">

Returns

</li>



<li className="hover:text-[#D4AF37] cursor-pointer">

Shipping Policy

</li>



<li className="hover:text-[#D4AF37] cursor-pointer">

Privacy Policy

</li>


</ul>


</div>







{/* CONTACT */}

<div>


<h3
className="
font-bold
text-lg
"
>

Contact

</h3>



<p
className="
mt-4
text-gray-400
"
>

support@primecart.com

</p>



<p
className="
mt-2
text-gray-400
"
>

+91 9876543210

</p>



<p
className="
mt-2
text-gray-400
"
>

Mumbai, Maharashtra

</p>


</div>



</div>







{/* COPYRIGHT */}

<div
className="
border-t
border-white/10
py-5
text-center
text-gray-400
text-sm
"
>

© 2026 PrimeCart. All Rights Reserved.

</div>



</footer>

)

}
