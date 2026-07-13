"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Eye,
  EyeOff,
  ShoppingBag,
  ArrowRight
} from "lucide-react";

import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";



export default function RegisterPage(){


const supabase = createClient();

const router = useRouter();



const [name,setName]=useState("");

const [email,setEmail]=useState("");

const [password,setPassword]=useState("");

const [confirmPassword,setConfirmPassword]=useState("");

const [show,setShow]=useState(false);

const [loading,setLoading]=useState(false);





async function register(){



if(!name || !email || !password){

toast.error(
"Please fill all fields"
);

return;

}



if(password !== confirmPassword){

toast.error(
"Passwords do not match"
);

return;

}




try{


setLoading(true);



const {

data,

error

}=await supabase.auth.signUp({

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
"Account created! Check your email for verification"
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
bg-[#050505]
flex
items-center
justify-center
px-5
text-white
overflow-hidden
">



<div className="
absolute
w-[450px]
h-[450px]
bg-[#D4AF37]
opacity-20
blur-[160px]
rounded-full
">


</div>





<div className="
relative
w-full
max-w-md
bg-white/10
backdrop-blur-2xl
border
border-white/10
rounded-3xl
p-8
shadow-2xl
">





<div className="
flex
justify-center
mb-6
">


<div className="
bg-gradient-to-r
from-yellow-300
to-yellow-700
text-black
p-4
rounded-2xl
shadow-lg
">


<ShoppingBag size={35}/>


</div>


</div>






<h1 className="
text-4xl
font-bold
text-center
">


Create Account


</h1>




<p className="
text-gray-400
text-center
mt-2
mb-8
">

Join PrimeCart Premium Shopping

</p>






<input

type="text"

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
rounded-xl
px-4
py-3
mb-4
outline-none
focus:border-[#D4AF37]
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
rounded-xl
px-4
py-3
mb-4
outline-none
focus:border-[#D4AF37]
"

/>







<div className="
relative
">


<input

type={
show
?
"text"
:
"password"
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
rounded-xl
px-4
py-3
pr-12
mb-4
outline-none
focus:border-[#D4AF37]
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

show

?

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
rounded-xl
px-4
py-3
outline-none
focus:border-[#D4AF37]
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
items-center
justify-center
gap-2
hover:scale-105
transition
"


>

{

loading

?

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
text-gray-400
mt-7
">


Already have an account?


<Link

href="/login"

className="
text-[#D4AF37]
font-semibold
ml-2
"

>

Login

</Link>


</p>






</div>



</main>

);


}
