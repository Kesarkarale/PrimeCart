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
  Sparkles
} from "lucide-react";

import {
  FaGoogle,
  FaGithub
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


const {error} = await supabase.auth.signInWithPassword({

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


const {error}=await supabase.auth.signInWithOAuth({

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


const {error}=await supabase.auth.signInWithOAuth({

provider:"github",

options:{
redirectTo:
`${window.location.origin}/auth/callback`
}

});


if(error)
toast.error(error.message);


}






return (

<main className="
min-h-screen
flex
bg-white
overflow-hidden
">


{/* LEFT BRAND SECTION */}


<section className="
hidden
lg:flex
w-1/2
bg-[#050505]
text-white
relative
flex-col
justify-center
px-16
overflow-hidden
">



{/* Gold Glow */}

<div className="
absolute
w-[500px]
h-[500px]
bg-[#D4AF37]
opacity-20
blur-[150px]
rounded-full
top-[-100px]
left-[-100px]
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
text-[#D4AF37]
mb-8
">


<Crown size={30}/>


<h2 className="
text-xl
tracking-[8px]
font-bold
">

PRIME CART

</h2>


</div>





<h1 className="
text-6xl
font-black
leading-tight
">

The Future Of

<br/>

<span className="
text-[#D4AF37]
">

Premium Shopping

</span>

</h1>




<p className="
mt-6
text-gray-400
max-w-md
text-lg
">

Experience a luxury commerce platform
built for modern India with smart shopping
and premium service.

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
p-3
rounded-xl
bg-white/10
">

<ShieldCheck
className="text-[#D4AF37]"
/>

</div>

<span>
Secure Payments
</span>

</div>





<div className="
flex
items-center
gap-4
">

<div className="
p-3
rounded-xl
bg-white/10
">

<Truck
className="text-[#D4AF37]"
/>

</div>

<span>
Fast Delivery
</span>

</div>





<div className="
flex
items-center
gap-4
">

<div className="
p-3
rounded-xl
bg-white/10
">

<Sparkles
className="text-[#D4AF37]"
/>

</div>

<span>
AI Smart Recommendations
</span>

</div>


</div>



<div className="
mt-12
flex
gap-10
">


<div>

<h3 className="
text-3xl
font-bold
text-[#D4AF37]
">

10K+

</h3>

<p className="text-gray-400">
Customers
</p>

</div>



<div>

<h3 className="
text-3xl
font-bold
text-[#D4AF37]
">

99.9%

</h3>

<p className="text-gray-400">
Secure
</p>

</div>


</div>



</motion.div>



</section>







{/* RIGHT LOGIN */}



<section className="
w-full
lg:w-1/2
flex
items-center
justify-center
px-6
bg-gray-50
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
rounded-[32px]
p-10

shadow-[0_30px_80px_rgba(0,0,0,0.12)]

"


>



<div className="
mb-8
">


<h1 className="
text-4xl
font-black
text-black
">

Welcome Back

</h1>


<p className="
text-gray-500
mt-3
">

Login to continue your PrimeCart journey

</p>


</div>







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
text-[#B8860B]
font-medium
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

bg-black

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

loading?

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

flex
justify-center
items-center
gap-3

font-semibold

hover:border-[#D4AF37]

transition

"

>


<FaGoogle/>

Google

</button>






<button

onClick={githubLogin}

className="
mt-3

w-full

py-4

rounded-2xl

bg-black

text-white

flex
justify-center
items-center
gap-3

font-semibold

"

>

<FaGithub/>

Github

</button>







<p className="
text-center
mt-8
text-gray-500
">


Don't have an account?


<Link

href="/register"

className="
ml-2

font-bold

text-[#B8860B]

"

>

Create Account

</Link>


</p>



</motion.div>



</section>


</main>

)

}
