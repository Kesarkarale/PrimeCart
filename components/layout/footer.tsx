"use client";

import Link from "next/link";
import Image from "next/image";

import {
  Mail,
  Phone,
  MapPin,
  Globe,
  ShieldCheck,
  Truck,
  CreditCard,
} from "lucide-react";


export default function Footer() {
  return (
    <footer className="
    bg-[#faf8f3]
    text-gray-900
    mt-20
    border-t
    border-[#ece7db]
    ">


      <div className="
      max-w-7xl
      mx-auto
      px-6
      py-16
      ">


        <div className="
        grid
        gap-10
        md:grid-cols-2
        lg:grid-cols-4
        ">



{/* LOGO */}


<div>


<div className="
flex
items-center
gap-3
">


<Image

src="/logo.png"

alt="PrimeCart Logo"

width={60}

height={60}

className="object-contain"

/>



<div>


<h2 className="
text-2xl
font-bold
text-black
">

Prime
<span className="text-[#D4AF37]">
Cart
</span>

</h2>


<p className="
text-gray-500
text-sm
">

Premium Shopping

</p>


</div>


</div>





<p className="
mt-6
text-gray-600
leading-7
">

Discover premium quality products at the best prices with
secure payments, fast delivery and trusted customer support.

</p>






<div className="
flex
gap-4
mt-8
">


<div className="
w-11
h-11
rounded-xl
bg-white
border
border-[#ece7db]
flex
items-center
justify-center
text-gray-700
hover:bg-[#D4AF37]
hover:text-white
transition
">

<Globe size={20}/>

</div>



<div className="
w-11
h-11
rounded-xl
bg-white
border
border-[#ece7db]
flex
items-center
justify-center
text-gray-700
hover:bg-[#D4AF37]
hover:text-white
transition
">

<ShieldCheck size={20}/>

</div>




<div className="
w-11
h-11
rounded-xl
bg-white
border
border-[#ece7db]
flex
items-center
justify-center
text-gray-700
hover:bg-[#D4AF37]
hover:text-white
transition
">

<Truck size={20}/>

</div>




<div className="
w-11
h-11
rounded-xl
bg-white
border
border-[#ece7db]
flex
items-center
justify-center
text-gray-700
hover:bg-[#D4AF37]
hover:text-white
transition
">

<CreditCard size={20}/>

</div>


</div>


</div>






{/* QUICK LINKS */}


<div>


<h3 className="
text-xl
font-bold
mb-6
text-black
">

Quick Links

</h3>



<div className="
space-y-4
text-gray-600
">


<Link
href="/"
className="block hover:text-[#D4AF37] transition"
>
Home
</Link>


<Link
href="/login"
className="block hover:text-[#D4AF37] transition"
>
Shop
</Link>


<Link
href="/login"
className="block hover:text-[#D4AF37] transition"
>
Categories
</Link>


<Link
href="/login"
className="block hover:text-[#D4AF37] transition"
>
Deals
</Link>


<Link
href="/login"
className="block hover:text-[#D4AF37] transition"
>
Contact
</Link>


</div>


</div>









{/* CATEGORIES */}


<div>


<h3 className="
text-xl
font-bold
mb-6
text-black
">

Categories

</h3>




<div className="
space-y-4
text-gray-600
">


<p>Electronics</p>

<p>Fashion</p>

<p>Mobiles</p>

<p>Furniture</p>

<p>Accessories</p>

<p>Beauty</p>


</div>


</div>









{/* CONTACT */}


<div>


<h3 className="
text-xl
font-bold
mb-6
text-black
">

Contact Us

</h3>



<div className="
space-y-5
text-gray-600
">


<div className="flex items-center gap-3">

<MapPin
size={18}
className="text-[#D4AF37]"
/>

<span>
Mumbai, Maharashtra, India
</span>

</div>



<div className="flex items-center gap-3">

<Phone
size={18}
className="text-[#D4AF37]"
/>

<span>
+91 98765 43210
</span>

</div>




<div className="flex items-center gap-3">

<Mail
size={18}
className="text-[#D4AF37]"
/>

<span>
support@primecart.com
</span>

</div>



</div>


</div>



</div>


</div>







{/* BOTTOM */}


<div className="
border-t
border-[#ece7db]
">


<div className="
max-w-7xl
mx-auto
px-6
py-6
flex
flex-col
md:flex-row
items-center
justify-between
">


<p className="
text-gray-600
text-sm
">

© 2026 PrimeCart. All Rights Reserved.

</p>



<div className="
flex
gap-6
mt-4
md:mt-0
text-gray-600
text-sm
">


<Link
href="/login"
className="hover:text-[#D4AF37]"
>
Privacy Policy
</Link>


<Link
href="/login"
className="hover:text-[#D4AF37]"
>
Terms
</Link>


<Link
href="/login"
className="hover:text-[#D4AF37]"
>
Refund Policy
</Link>



</div>



</div>


</div>



</footer>
  );
}
