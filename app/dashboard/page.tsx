 "use client";

import Hero from "@/components/dashboard/hero";
import CategorySection from "@/components/dashboard/category-section";
import FeaturedProducts from "@/components/dashboard/featured-products";
 import Navbar from "@/components/layout/navbar";
import TopBar from "@/components/layout/top-bar";
 
import Services from "@/components/dashboard/services";
import Footer from "@/components/layout/footer";
export default function DashboardPage() {

return (

<main
className="
min-h-screen
bg-gradient-to-b
from-white
via-[#fffdf8]
to-[#f8f4ea]
text-gray-900
dark:bg-[#050505]
dark:text-white
transition-all
duration-300
"
>

<Navbar />
 <TopBar />


 

<div
className="
max-w-7xl
mx-auto
px-5
py-8
space-y-16
"
>


{/* HERO */}

<div
className="
rounded-[32px]
overflow-hidden
shadow-[0_15px_50px_rgba(212,175,55,0.15)]
"
>

<Hero />

</div>



{/* CATEGORY */}

<section
className="
bg-white
dark:bg-[#0d0d0d]
rounded-[32px]
p-6
border
border-[#D4AF37]/20
shadow-lg
"
>

<CategorySection />

</section>





{/* PRODUCTS */}

<section
className="
bg-white
dark:bg-[#0d0d0d]
rounded-[32px]
p-6
border
border-[#D4AF37]/20
shadow-lg
"
>

<FeaturedProducts />

</section>






{/* SERVICES */}

<Services />






{/* PREMIUM BANNER */}

<section
className="
relative
overflow-hidden
rounded-[32px]
p-12
text-center
bg-gradient-to-r
from-[#fff7d6]
via-[#ffffff]
to-[#f7e4a3]
border
border-[#D4AF37]/30
shadow-[0_20px_60px_rgba(212,175,55,0.18)]
"
>


<div className="absolute inset-0 opacity-10">

<div
className="
w-full
h-full
bg-[radial-gradient(circle_at_center,#D4AF37,transparent_70%)]
"
/>

</div>



<div className="relative z-10">


<span
className="
inline-block
px-5
py-2
rounded-full
bg-[#D4AF37]
text-white
font-semibold
"
>

PRIMECART PREMIUM

</span>



<h2
className="
mt-5
text-4xl
md:text-5xl
font-black
text-[#111]
"
>

Premium Shopping Experience

</h2>



<p
className="
mt-4
text-lg
text-gray-700
max-w-2xl
mx-auto
"
>

Discover luxury products, exclusive deals and a seamless
shopping experience with PrimeCart.

</p>



<button
className="
mt-8
px-8
py-4
rounded-2xl
font-bold
bg-gradient-to-r
from-[#D4AF37]
to-[#F5D76E]
text-black
hover:scale-105
transition-all
duration-300
shadow-lg
"
>

Start Shopping

</button>



</div>


</section>



</div>




<Footer />


</main>

);

}
