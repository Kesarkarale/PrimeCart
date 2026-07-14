import { getProducts } from "@/lib/products";

import ProductCard from "@/components/products/product-card";


export default async function ProductsPage(){


const products = await getProducts();



return (

<div className="space-y-8">


<div>

<h1 className="
text-4xl
font-bold
text-white
">

All Products

</h1>


<p className="
text-gray-400
mt-2
">

Explore premium collections

</p>


</div>




<div className="
grid
sm:grid-cols-2
lg:grid-cols-4
gap-6
">


{
products.map((product:any)=>(

<ProductCard

key={product.id}

product={product}

/>


))
}



</div>


</div>

);


}
