 "use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Eye,
  EyeOff,
  ShoppingBag,
  ArrowRight,
  Sparkles
} from "lucide-react";

import { toast } from "sonner";
import { motion } from "framer-motion";

import { createClient } from "@/lib/supabase/client";



export default function RegisterPage(){


const supabase=createClient();

const router=useRouter();


const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [confirmPassword,setConfirmPassword]=useState("");

const [show,setShow]=useState(false);

const [loading,setLoading]=useState(false);





async function register(){


if(!name || !email || !password){

toast.error("Please fill all fields");
return;

}



if(password !== confirmPassword){

toast.error("Passwords do not match");
return;

}




try{


setLoading(true);



const {error}=await supabase.auth.signUp({

email,

password,


options:{

data:{

name:name

}

}

});



if(error){

toast.error(error.message);
return;

}



toast.success(
"Account created successfully ✨"
);


router.push("/login");


}

catch{

toast.error(
"Registration failed"
);

}

finally{

setLoading(false);

}


}





return (

<main className="
min-h-screen
bg-gradient-to-br
from-[#050505]
via-[#111827]
to-[#F8F1E7]
flex
items-center
justify-center
p-5
relative
overflow-hidden
">





<div className="
absolute
w-[600px]
h-[600px]
bg-[#D4AF37]
opacity-20
blur-[180px]
rounded-full
">

</div>






<div className="
relative
max-w-6xl
w-full
grid
md:grid-cols-2
gap-10
items-center
">






{/* LEFT SIDE */}



<motion.div

initial={{
opacity:0,
x:-50
}}

animate={{
opacity:1,
x:0
}}

className="
hidden
md:block
text-white
"

>


<div className="
flex
items-center
gap-3
mb-8
">


<div className="
bg-gradient-to-br
from-yellow-300
to-yellow-700
text-black
p-4
rounded-2xl
">

<ShoppingBag size={40}/>

</div>



<h1 className="
text-5xl
font-bold
">

PrimeCart

</h1>


</div>





<h2 className="
text-4xl
font-semibold
leading-tight
">


Create Your
<br/>
Premium Account


</h2>



<p className="
text-gray-300
mt-5
text-lg
max-w-md
">


Join PrimeCart and experience
luxury shopping with exclusive
products and offers.

</p>





<div className="
flex
gap-3
items-center
mt-8
text-[#D4AF37]
">


<Sparkles/>


Premium • Secure • Elegant


</div>



</motion.div>









{/* REGISTER CARD */}



<motion.div


initial={{
opacity:0,
y:50
}}

animate={{
opacity:1,
y:0
}}


className="
bg-white/10
backdrop-blur-3xl
border
border-white/20
rounded-3xl
p-8
shadow-2xl
w-full
max-w-md
mx-auto
"

>




<div className="
flex
justify-center
mb-6
">


<div className="
bg-gradient-to-br
from-yellow-300
to-yellow-700
text-black
p-5
rounded-2xl
shadow-xl
">


<ShoppingBag size={38}/>


</div>


</div>






<h1 className="
text-3xl
font-bold
text-center
text-white
">


Create Account


</h1>





<p className="
text-gray-300
text-center
mt-2
mb-8
">


Join PrimeCart Premium Shopping


</p>







<input

placeholder="Full Name"

value={name}

onChange={
e=>setName(e.target.value)
}


className="
w-full
bg-black/40
border
border-white/20
text-white
placeholder-gray-400
rounded-xl
px-4
py-3
mb-4
outline-none
focus:border-[#D4AF37]
transition
"

/>






<input

type="email"

placeholder="Email Address"

value={email}

onChange={
e=>setEmail(e.target.value)
}


className="
w-full
bg-black/40
border
border-white/20
text-white
placeholder-gray-400
rounded-xl
px-4
py-3
mb-4
outline-none
focus:border-[#D4AF37]
transition
"

/>






<div className="
relative
">


<input

type={
show?"text":"password"
}


placeholder="Password"

value={password}

onChange={
e=>setPassword(e.target.value)
}


className="
w-full
bg-black/40
border
border-white/20
text-white
placeholder-gray-400
rounded-xl
px-4
py-3
pr-12
mb-4
outline-none
focus:border-[#D4AF37]
transition
"

/>



<button

type="button"

onClick={()=>setShow(!show)}

className="
absolute
right-4
top-3
text-gray-400
"

>

{

show?

<EyeOff size={20}/>

:

<Eye size={20}/>

}


</button>


</div>







<input

type="password"

placeholder="Confirm Password"

value={confirmPassword}

onChange={
e=>setConfirmPassword(e.target.value)
}


className="
w-full
bg-black/40
border
border-white/20
text-white
placeholder-gray-400
rounded-xl
px-4
py-3
outline-none
focus:border-[#D4AF37]
transition
"

/>







<button

onClick={register}

disabled={loading}


className="
mt-6
w-full
bg-gradient-to-r
from-yellow-300
via-yellow-500
to-yellow-700
text-black
font-bold
py-3
rounded-xl
flex
justify-center
items-center
gap-2
hover:scale-105
transition
shadow-lg
"

>


{

loading?

"Creating Account..."

:

<>

Create Account

<ArrowRight size={18}/>

</>

}


</button>






<p className="
text-center
text-gray-300
mt-7
">


Already have an account?


<Link

href="/login"

className="
text-[#D4AF37]
font-semibold
ml-2
hover:underline
"

>

Login

</Link>


</p>






</motion.div>


</div>


</main>

);


}
