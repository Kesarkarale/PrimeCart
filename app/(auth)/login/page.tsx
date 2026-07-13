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

import {
  FaGoogle,
  FaGithub,
} from "react-icons/fa";

import { toast } from "sonner";
import { motion } from "framer-motion";

import {
  createClient
} from "@/lib/supabase/client";



export default function LoginPage(){


const router = useRouter();

const supabase = createClient();


const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [show,setShow]=useState(false);
const [loading,setLoading]=useState(false);



async function login(){

try{

setLoading(true);


const {error}=await supabase.auth.signInWithPassword({

email,
password

});


if(error){

toast.error(error.message);
return;

}


toast.success("Welcome back to PrimeCart ✨");


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
bg-gradient-to-br
from-[#050505]
via-[#111827]
to-[#F8F1E7]
flex
items-center
justify-center
p-5
overflow-hidden
relative
">



{/* GOLD GLOW */}

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





{/* LEFT BRAND SECTION */}


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
tracking-wide
">

PrimeCart

</h1>


</div>




<h2 className="
text-4xl
font-semibold
leading-tight
">

Premium Shopping
<br/>
Experience

</h2>



<p className="
text-gray-300
mt-5
max-w-md
text-lg
">

Discover luxury products,
exclusive deals and a
shopping experience crafted
for modern lifestyle.

</p>



<div className="
flex
items-center
gap-3
mt-8
text-[#D4AF37]
">


<Sparkles/>

Luxury • Quality • Trust


</div>



</motion.div>








{/* LOGIN CARD */}



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
text-white
text-center
">

Welcome Back

</h1>



<p className="
text-gray-300
text-center
mt-2
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
show?"text":"password"
}

placeholder="Password"


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
outline-none
focus:border-[#D4AF37]
transition
"

/>


<button

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





<div className="
flex
justify-end
mt-3
">


<Link

href="/forgot-password"

className="
text-[#D4AF37]
text-sm
hover:underline
"

>

Forgot Password?

</Link>


</div>






<button

onClick={login}

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
shadow-lg
"


>


{

loading?

"Logging in..."

:

<>
Login
<ArrowRight size={18}/>
</>

}


</button>






<div className="
flex
items-center
gap-3
my-6
">


<div className="
h-px
bg-white/20
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
bg-white/20
flex-1
"/>


</div>







<button

onClick={googleLogin}

className="
w-full
bg-white
text-black
py-3
rounded-xl
flex
justify-center
items-center
gap-3
font-semibold
hover:scale-105
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
bg-black
border
border-white/20
text-white
py-3
rounded-xl
flex
justify-center
items-center
gap-3
font-semibold
hover:scale-105
transition
"

>

<FaGithub/>

Continue with Github

</button>







<p className="
text-center
text-gray-300
mt-7
">


Don't have an account?


<Link

href="/register"

className="
text-[#D4AF37]
font-semibold
ml-2
"

>

Create Account

</Link>


</p>




</motion.div>


</div>


</main>

);

}
