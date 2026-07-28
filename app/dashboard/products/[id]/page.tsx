"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  Heart,
  Star,
  ShoppingCart,
  Truck,
  ShieldCheck,
  Minus,
  Plus,
  ArrowLeft
} from "lucide-react";

import { useState } from "react";


const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    image: "/products/headphone.png",
    images: [
      "/products/headphone.png",
      "/products/headphone.png",
      "/products/headphone.png",
    ],
    price: 2499,
    oldPrice: 3999,
    rating: 4.8,
    reviews: 245,
    discount: "38%",
    category: "Electronics",
    brand: "PrimeAudio",

    description:
      "Premium wireless headphones with deep bass, noise cancellation and long battery life. Perfect for music, gaming and calls.",

    stock: "In Stock",

    features: [
      "40 Hours Battery Backup",
      "Active Noise Cancellation",
      "Bluetooth 5.3",
      "Fast Charging",
    ],

    specifications: {
      "Connectivity": "Bluetooth",
      "Battery": "40 Hours",
      "Warranty": "1 Year",
      "Color": "Black",
    },
  },


  {
    id: 2,
    name: "Smart Watch",
    image: "/products/watch.png",
    images:[
      "/products/watch.png",
      "/products/watch.png",
      "/products/watch.png",
    ],
    price:3499,
    oldPrice:4999,
    rating:4.7,
    reviews:180,
    discount:"30%",
    category:"Wearables",
    brand:"PrimeTech",

    description:
    "Smart watch with fitness tracking, heart rate monitoring and premium display.",

    stock:"In Stock",

    features:[
      "AMOLED Display",
      "Fitness Tracking",
      "Water Resistant",
      "7 Days Battery",
    ],

    specifications:{
      "Display":"AMOLED",
      "Battery":"7 Days",
      "Warranty":"1 Year",
      "Color":"Black",
    }
  }
];



export default function ProductDetails({
  params,
}:{
  params:{
    id:string;
  }
}) {


  const product = products.find(
    (item)=> item.id === Number(params.id)
  );


  const [activeImage,setActiveImage] = useState(
    product?.image || ""
  );


  const [quantity,setQuantity] = useState(1);


  const [wishlist,setWishlist] = useState(false);



  if(!product){

    return (
      <div className="min-h-screen flex items-center justify-center">

        <h1 className="text-3xl font-bold">
          Product Not Found
        </h1>

      </div>
    );

  }


return (

<main className="
min-h-screen
bg-[#faf8f3]
px-6
py-10
">


<Link
href="/"
className="
flex
items-center
gap-2
text-gray-600
mb-8
"
>

<ArrowLeft size={20}/>
Back

</Link>



<div className="
max-w-7xl
mx-auto
grid
lg:grid-cols-2
gap-12
">


{/* IMAGE SECTION */}


<div>


<div className="
relative
h-[500px]
bg-white
rounded-3xl
border
overflow-hidden
">


<Image

src={activeImage}

alt={product.name}

fill

className="
object-contain
p-10
"

/>


</div>



<div className="
flex
gap-4
mt-5
">


{
product.images.map((img,index)=>(


<button

key={index}

onClick={()=>setActiveImage(img)}

className="
relative
h-20
w-20
rounded-xl
border
bg-white
overflow-hidden
hover:border-[#D4AF37]
"

>


<Image

src={img}

alt="thumbnail"

fill

className="
object-contain
p-2
"

/>


</button>


))

}



</div>


</div>
 {/* PRODUCT DETAILS SECTION */}

<div className="space-y-6">


<div>

<p className="
text-sm
text-gray-500
font-medium
">
{product.category}
</p>


<h1 className="
text-4xl
font-black
mt-2
text-gray-900
">
{product.name}
</h1>


<p className="
text-gray-500
mt-1
">
Brand : {product.brand}
</p>


</div>



{/* RATING */}


<div className="
flex
items-center
gap-3
">


<div className="
flex
items-center
gap-1
bg-green-600
text-white
px-3
py-1
rounded-full
text-sm
font-bold
">

<Star
size={16}
className="fill-white"
/>

{product.rating}

</div>


<span className="text-gray-500">
({product.reviews} Reviews)
</span>


</div>





{/* PRICE */}


<div className="
flex
items-center
gap-4
">


<h2 className="
text-4xl
font-black
">
₹{product.price}
</h2>


<span className="
text-xl
text-gray-400
line-through
">
₹{product.oldPrice}
</span>


<span className="
bg-red-500
text-white
px-3
py-1
rounded-full
font-bold
text-sm
">
{product.discount} OFF
</span>


</div>





{/* DESCRIPTION */}


<div>


<h3 className="
text-xl
font-bold
mb-2
">
Description
</h3>


<p className="
text-gray-600
leading-7
">
{product.description}
</p>


</div>





{/* FEATURES */}


<div>


<h3 className="
text-xl
font-bold
mb-3
">
Highlights
</h3>


<div className="
grid
sm:grid-cols-2
gap-3
">


{
product.features.map((feature,index)=>(


<div

key={index}

className="
bg-white
border
rounded-xl
p-3
text-sm
"
>

✓ {feature}

</div>


))

}


</div>

</div>





{/* QUANTITY */}


<div>


<h3 className="
font-bold
mb-3
">
Quantity
</h3>


<div className="
flex
items-center
gap-4
">


<button

onClick={()=> 
setQuantity(
Math.max(1,quantity-1)
)
}

className="
w-10
h-10
rounded-full
border
flex
items-center
justify-center
hover:bg-gray-100
"

>

<Minus size={18}/>

</button>



<span className="
text-xl
font-bold
">
{quantity}
</span>



<button

onClick={()=>setQuantity(quantity+1)}

className="
w-10
h-10
rounded-full
border
flex
items-center
justify-center
hover:bg-gray-100
"

>

<Plus size={18}/>

</button>



</div>


</div>





{/* ACTION BUTTONS */}


<div className="
flex
gap-4
flex-wrap
">


<button

onClick={()=>setWishlist(!wishlist)}

className="
h-14
w-14
rounded-2xl
border
flex
items-center
justify-center
hover:border-[#D4AF37]
transition
"

>


<Heart

size={25}

className={
wishlist
?
"fill-red-500 text-red-500"
:
""
}

/>


</button>




<button

className="
flex-1
h-14
rounded-2xl
bg-[#D4AF37]
hover:bg-black
text-white
font-bold
flex
items-center
justify-center
gap-2
transition
"

>


<ShoppingCart size={20}/>

Add To Cart


</button>




<button

className="
flex-1
h-14
rounded-2xl
bg-black
hover:bg-[#D4AF37]
text-white
font-bold
transition
"

>

Buy Now

</button>



</div>





{/* DELIVERY INFO */}


<div className="
grid
sm:grid-cols-2
gap-4
mt-6
">


<div className="
bg-white
rounded-2xl
p-5
border
flex
gap-3
items-center
">


<Truck
className="text-[#D4AF37]"
/>


<div>

<h4 className="font-bold">
Free Delivery
</h4>

<p className="text-sm text-gray-500">
Fast delivery available
</p>

</div>


</div>





<div className="
bg-white
rounded-2xl
p-5
border
flex
gap-3
items-center
">


<ShieldCheck
className="text-[#D4AF37]"
/>


<div>

<h4 className="font-bold">
Secure Payment
</h4>

<p className="text-sm text-gray-500">
100% safe checkout
</p>

</div>


</div>



</div>


</div>
 {/* SPECIFICATIONS */}

<div className="
mt-16
bg-white
rounded-3xl
border
p-8
">

<h2 className="
text-2xl
font-black
mb-6
">
Product Specifications
</h2>


<div className="
grid
sm:grid-cols-2
gap-5
">


{
Object.entries(product.specifications).map(
([key,value])=>(

<div

key={key}

className="
flex
justify-between
border-b
pb-3
"

>

<span className="
font-semibold
text-gray-600
">
{key}
</span>


<span className="
font-bold
">
{value}
</span>


</div>

)

)


}


</div>


</div>





{/* CUSTOMER REVIEWS */}


<div className="
mt-10
bg-white
rounded-3xl
border
p-8
">


<h2 className="
text-2xl
font-black
mb-6
">
Customer Reviews
</h2>



<div className="
flex
items-center
gap-4
bg-gray-50
rounded-2xl
p-5
">


<div className="
text-4xl
font-black
">
{product.rating}
</div>


<div>


<div className="
flex
gap-1
">

{
[1,2,3,4,5].map((star)=>(
<Star
key={star}
size={20}
className="
fill-yellow-400
text-yellow-400
"
/>
))
}

</div>


<p className="
text-gray-500
mt-1
">
Based on {product.reviews} verified reviews
</p>


</div>


</div>



<div className="
mt-6
space-y-4
">


<div className="
border
rounded-2xl
p-5
">

<h4 className="font-bold">
Rahul Sharma
</h4>

<p className="text-yellow-500">
★★★★★
</p>

<p className="text-gray-600 mt-2">
Amazing quality product. Delivery was very fast.
</p>


</div>



<div className="
border
rounded-2xl
p-5
">

<h4 className="font-bold">
Priya Patil
</h4>

<p className="text-yellow-500">
★★★★★
</p>

<p className="text-gray-600 mt-2">
Product exactly as shown. Highly recommended.
</p>


</div>



</div>


</div>





{/* RELATED PRODUCTS */}


<div className="
mt-10
">


<h2 className="
text-3xl
font-black
mb-6
">
Related Products
</h2>


<div className="
grid
sm:grid-cols-2
md:grid-cols-4
gap-6
">


{
products
.filter(
(item)=>item.id !== product.id
)
.map((item)=>(


<Link

key={item.id}

href={`/product/dashboard/${item.id}`}

className="
bg-white
rounded-3xl
border
p-5
hover:shadow-xl
transition
"


>


<div className="
relative
h-48
">


<Image

src={item.image}

alt={item.name}

fill

className="
object-contain
"

/>


</div>



<h3 className="
font-bold
mt-4
">
{item.name}
</h3>


<div className="
flex
items-center
gap-2
mt-2
">


<Star

size={16}

className="
fill-yellow-400
text-yellow-400
"

/>


<span>
{item.rating}
</span>


</div>



<p className="
text-xl
font-black
mt-2
">
₹{item.price}
</p>


</Link>


))

}


</div>


</div>





</div>

</div>

</main>

);

}
