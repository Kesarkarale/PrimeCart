import { createClient } from "@/lib/supabase/client";



export async function addToCart(product:any){


const supabase=createClient();



const {

data:{
user

}

}=await supabase.auth.getUser();



if(!user){

throw new Error(
"Please login first"
);

}



const {error}=await supabase
.from("cart")
.insert({

user_id:user.id,

product_id:product.id,

name:product.name,

price:product.price,

image:product.image,

quantity:1

});



if(error){

throw error;

}



}
