"use client";


import Link from "next/link";

 


export default function Footer(){

return (

<footer className="
mt-20
bg-[#050505]
text-white
rounded-t-3xl
">


<div className="
max-w-7xl
mx-auto
px-5
py-12
grid
md:grid-cols-4
gap-10
">


{/* BRAND */}

<div>

<h2 className="
text-3xl
font-black
">

Prime

<span className="text-[#D4AF37]">
Cart
</span>

</h2>


<p className="
mt-4
text-gray-400
">

Premium online shopping marketplace for luxury products.

</p>


<div className="
flex
gap-4
mt-5
">


<div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
<Instagram size={18}/>
</div>


<div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
<Facebook size={18}/>
</div>


<div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
<Twitter size={18}/>
</div>


</div>


</div>





{/* LINKS */}

<div>

<h3 className="font-bold text-lg">
Quick Links
</h3>

<ul className="
mt-4
space-y-3
text-gray-400
">


<li>
<Link href="#">
Home
</Link>
</li>


<li>
<Link href="#">
Products
</Link>
</li>


<li>
<Link href="#">
Categories
</Link>
</li>


<li>
<Link href="#">
Orders
</Link>
</li>


</ul>


</div>





<div>

<h3 className="font-bold text-lg">
Customer Service
</h3>


<ul className="
mt-4
space-y-3
text-gray-400
">

<li>
Help Center
</li>

<li>
Returns
</li>

<li>
Shipping Policy
</li>

<li>
Privacy Policy
</li>


</ul>

</div>





<div>

<h3 className="font-bold text-lg">
Contact
</h3>


<p className="
mt-4
text-gray-400
">

support@primecart.com

</p>


<p className="
mt-2
text-gray-400
">

+91 9876543210

</p>


</div>


</div>





<div className="
border-t
border-white/10
py-5
text-center
text-gray-400
text-sm
">

© 2026 PrimeCart. All Rights Reserved.

</div>


</footer>

)

}
