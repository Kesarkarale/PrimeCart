"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Eye,
  EyeOff,
  ArrowRight,
  Crown,
  ShieldCheck,
  Truck,
  Sparkles,
} from "lucide-react";

import {
  FaGoogle,
  FaGithub,
} from "react-icons/fa";

import { toast } from "sonner";
import { motion } from "framer-motion";

import { createClient } from "@/lib/supabase/client";


export default function LoginPage(){

const router = useRouter();

const supabase = createClient();


const [email,setEmail] = useState("");

const [password,setPassword] = useState("");

const [show,setShow] = useState(false);

const [loading,setLoading] = useState(false);





async function login(){

try{

setLoading(true);


const {error} =
await supabase.auth.signInWithPassword({

email,
password

});


if(error){

toast.error(error.message);
return;

}


toast.success("Welcome back to PrimeCart 👑");

router.push("/dashboard");


}

catch{

toast.error("Login failed");

}

finally{

setLoading(false);

}

}





async function googleLogin(){

const {error} =
await supabase.auth.signInWithOAuth({

provider:"google",

options:{
redirectTo:
`${window.location.origin}/auth/callback`
}

});


if(error)
toast.error(error.message);

}





async function githubLogin(){

const {error} =
await supabase.auth.signInWithOAuth({

provider:"github",

options:{
redirectTo:
`${window.location.origin}/auth/callback`
}

});


if(error)
toast.error(error.message);

}





return(

<main className="
min-h-screen
flex
bg-[#F8FAFC]
">


{/* LEFT BRAND AREA */}


<section className="
hidden
lg:flex
w-1/2

bg-[#111827]

text-white

relative

overflow-hidden

items-center

px-16
">


<div className="
absolute

w-[450px]

h-[450px]

bg-[#D4AF37]

opacity-20

blur-[150px]

rounded-full

top-[-150px]

left-[-150px]
"/>




<motion.div

initial={{
opacity:0,
x:-50
}}

animate={{
opacity:1,
x:0
}}

transition={{
duration:.7
}}

className="
relative
z-10
"

>



<div className="
flex
items-center
gap-3
mb-8
">


<div className="
p-3
rounded-xl

bg-[#D4AF37]

text-[#111827]
">

<Crown/>

</div>


<h2 className="
text-2xl

font-black

tracking-[5px]
">

PRIME CART

</h2>


</div>





<h1 className="
text-6xl

font-black

leading-tight
">


Premium Shopping

<br/>


<span className="
text-[#D4AF37]
">

Experience

</span>


</h1>




<p className="
mt-6

text-gray-300

text-lg

max-w-lg
">

A modern ecommerce platform designed
for premium products, secure payments
and smarter shopping.

</p>






<div className="
mt-10

space-y-5
">


<div className="
flex
items-center
gap-4
">

<div className="
bg-white/10

p-3

rounded-xl
">

<ShieldCheck
className="text-[#D4AF37]"
/>

</div>

Secure Payments

</div>





<div className="
flex
items-center
gap-4
">

<div className="
bg-white/10

p-3

rounded-xl
">

<Truck
className="text-[#D4AF37]"
/>

</div>

Fast Delivery

</div>





<div className="
flex
items-center
gap-4
">

<div className="
bg-white/10

p-3

rounded-xl
">

<Sparkles
className="text-[#D4AF37]"
/>

</div>

AI Smart Recommendations

</div>


</div>





</motion.div>


</section>









{/* LOGIN SECTION */}


<section className="
w-full

lg:w-1/2

flex

items-center

justify-center

px-6

">


<motion.div

initial={{
opacity:0,
y:40
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:.6
}}

className="
w-full

max-w-md

bg-white

rounded-3xl

p-10

shadow-[0_25px_70px_rgba(17,24,39,0.12)]

border

border-gray-100
"

>



<h1 className="
text-4xl

font-black

text-[#1F2937]
">

Welcome Back

</h1>



<p className="
mt-3

text-gray-500

mb-8
">

Login to your PrimeCart account

</p>






<input

value={email}

onChange={
e=>setEmail(e.target.value)
}

placeholder="Email Address"

className="
w-full

px-5

py-4

rounded-2xl

border

border-gray-200

outline-none

focus:border-[#D4AF37]

mb-4

"

/>






<div className="
relative
">


<input

value={password}

onChange={
e=>setPassword(e.target.value)
}

type={
show?
"text":
"password"
}

placeholder="Password"

className="
w-full

px-5

py-4

pr-14

rounded-2xl

border

border-gray-200

outline-none

focus:border-[#D4AF37]
"

/>



<button

onClick={()=>setShow(!show)}

className="
absolute

right-5

top-4

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






<div className="
flex
justify-end
mt-3
">


<Link

href="/forgot-password"

className="
text-sm

text-[#D4AF37]

font-semibold
">

Forgot Password?

</Link>


</div>







<button

onClick={login}

disabled={loading}

className="
mt-7

w-full

py-4

rounded-2xl

bg-[#111827]

text-white

font-bold

flex

justify-center

items-center

gap-3

hover:bg-[#D4AF37]

hover:text-black

transition
"


>


{

loading ?

"Logging in..."

:

<>
Login
<ArrowRight size={20}/>
</>

}


</button>






<div className="
flex

items-center

gap-3

my-7
">

<div className="
h-px

bg-gray-200

flex-1
"/>


<span className="
text-gray-400

text-sm
">

OR

</span>


<div className="
h-px

bg-gray-200

flex-1
"/>

</div>








<button

onClick={googleLogin}

className="
w-full

py-4

rounded-2xl

border

border-gray-200

font-semibold

flex

items-center

justify-center

gap-3

hover:border-[#D4AF37]

transition
"

>

<FaGoogle/>

Continue with Google

</button>







<button

onClick={githubLogin}

className="
mt-3

w-full

py-4

rounded-2xl

bg-[#111827]

text-white

font-semibold

flex

items-center

justify-center

gap-3
"

>

<FaGithub/>

Continue with Github

</button>







<p className="
text-center

mt-8

text-gray-500
">

Don't have account?


<Link

href="/register"

className="
ml-2

text-[#D4AF37]

font-bold
">

Create Account

</Link>


</p>



</motion.div>


</section>


</main>

)

}
