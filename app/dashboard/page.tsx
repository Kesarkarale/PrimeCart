 "use client";


import Hero from "@/components/dashboard/hero";

import CategorySection 
from "@/components/dashboard/category-section";


import FeaturedProducts 
from "@/components/dashboard/featured-products";



export default function DashboardPage(){


return (

<main className="

min-h-screen

bg-gray-50
text-gray-900

dark:bg-[#050505]
dark:text-white

transition-colors
duration-300

">



<div className="

max-w-7xl

mx-auto

px-5

py-8

space-y-12

">





{/* HERO */}

<Hero />







{/* CATEGORY */}

<CategorySection />







{/* PRODUCTS */}

<FeaturedProducts />







{/* Extra Banner */}



<section className="

mt-16

rounded-3xl

bg-gradient-to-r

from-[#D4AF37]

via-yellow-500

to-yellow-700

p-10

text-black

text-center

overflow-hidden

">



<h2 className="

text-4xl

font-black

">

Premium Shopping Experience

</h2>




<p className="

mt-3

text-lg

">

Discover luxury products with PrimeCart

</p>





<button


className="

mt-6

bg-black

text-white

px-8

py-3

rounded-xl

font-bold

hover:scale-105

transition

"

>

Start Shopping

</button>



</section>







</div>



</main>


);


}
