 "use client";


import Image from "next/image";
import Link from "next/link";

import {
  Star,
  ShoppingCart,
  Zap,
  ArrowLeft,
  Heart
} from "lucide-react";

import { addToCart } from "@/lib/cart";

import {toast} from "sonner";

import {useParams} from "next/navigation";





const products=[


{
id:"1",
name:"iPhone 16 Pro Max",
price:129999,
oldPrice:139999,
rating:4.9,
category:"Electronics",
image:"/products/iphone.png",

description:
"iPhone 16 Pro Max with powerful A18 chip, premium titanium design, advanced camera system and long battery life.",

reviews:120

},



{
id:"2",
name:"MacBook Pro M4",
price:189999,
oldPrice:199999,
rating:4.8,
category:"Laptops",
image:"/products/macbook.png",

description:
"Professional laptop with Apple M4 chip, stunning display and extreme performance.",

reviews:95

},



{
id:"3",
name:"Apple Watch Ultra",
price:79999,
oldPrice:89999,
rating:4.7,
category:"Watches",
image:"/products/watch.png",

description:
"Premium smartwatch designed for fitness, adventure and daily lifestyle.",

reviews:80

},



{
id:"4",
name:"Premium Sneakers",
price:12999,
oldPrice:15999,
rating:4.6,
category:"Fashion",
image:"/products/shoes.png",

description:
"Comfortable premium sneakers with modern design and all day support.",

reviews:65

}



];





export default function ProductDetails(){



const params=useParams();


const product=products.find(

item=>item.id===params.id

);





if(!product){


return (

<div className="
p-10
text-center
text-gray-500
">

Product Not Found

</div>

)


}







return (


<div className="

max-w-7xl

mx-auto

">






<Link

href="/dashboard"

className="
flex
items-center
gap-2
mb-8
text-gray-500
hover:text-[#D4AF37]
"

>

<ArrowLeft size={18}/>

Back To Shopping

</Link>









<div className="

grid

md:grid-cols-2

gap-10

">





{/* IMAGE */}



<div className="

bg-white

dark:bg-white/5

border

border-gray-200

dark:border-white/10

rounded-3xl

p-10

flex

items-center

justify-center

relative

">


<Image

src={product.image}

alt={product.name}

width={500}

height={500}

className="
object-contain
"

/>


</div>









{/* DETAILS */}



<div className="

space-y-5

">





<p className="
text-[#D4AF37]
uppercase
font-semibold
">

{product.category}

</p>





<h1 className="

text-5xl

font-bold

text-gray-900

dark:text-white

">


{product.name}


</h1>






<div className="

flex

items-center

gap-3

">


<div className="

flex

items-center

gap-1

bg-[#D4AF37]

text-black

px-3

py-1

rounded-lg

font-bold

">


<Star

size={16}

fill="currentColor"

/>


{product.rating}


</div>



<span className="
text-gray-500
">

{product.reviews} Reviews

</span>


</div>








<h2 className="
text-4xl
font-bold
text-[#D4AF37]
">

₹{product.price.toLocaleString()}

</h2>





<p className="
text-gray-600
dark:text-gray-400
leading-relaxed
">

{product.description}

</p>










<div className="
flex
gap-4
pt-5
">





<button

onClick={async()=>{


await addToCart(product);


toast.success(
"Added to cart 🛒"
);


}}

className="

flex

items-center

gap-2


px-8

py-4


rounded-xl


bg-gray-100

dark:bg-white/10


border

border-gray-200

dark:border-white/10


font-semibold

"


>


<ShoppingCart/>

Add Cart


</button>









<button


className="

flex

items-center

gap-2


px-8

py-4


rounded-xl


bg-[#D4AF37]


text-black


font-bold


hover:scale-105


transition

"


>


<Zap/>


Buy Now


</button>








<button

className="

p-4

rounded-xl

border

border-gray-200

dark:border-white/10

"


>


<Heart/>


</button>





</div>





</div>





</div>







{/* REVIEWS */}



<div className="

mt-16

bg-white

dark:bg-white/5

border

border-gray-200

dark:border-white/10

rounded-3xl

p-8

">


<h2 className="

text-3xl

font-bold

mb-5

">


Customer Reviews


</h2>



<p className="
text-gray-500
">

⭐⭐⭐⭐⭐

Premium quality product. Fast delivery and excellent experience.

</p>


</div>





</div>



)



}
