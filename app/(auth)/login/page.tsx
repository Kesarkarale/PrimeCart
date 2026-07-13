 "use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Eye,
  EyeOff,
  ShoppingBag,
  ArrowRight,
  Crown,
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




return(

<main className="
min-h-screen
relative
overflow-hidden
bg-[#050816]
flex
items-center
justify-center
px-5
text-white
">


{/* Luxury Glow */}

<div className="
absolute
top-[-150px]
left-[-150px]
w-[500px]
h-[500px]
bg-[#D4AF37]
opacity-20
blur-[160px]
rounded-full
"/>


<div className="
absolute
bottom-[-150px]
right-[-100px]
w-[400px]
h-[400px]
bg-[#F59E0B]
opacity-10
blur-[140px]
rounded-full
"/>




<motion.div

initial={{
opacity:0,
scale:0.9,
y:40
}}

animate={{
opacity:1,
scale:1,
y:0
}}

transition={{
duration:0.6
}}


className="
relative
w-full
max-w-md
rounded-[32px]
p-8

bg-white/5
backdrop-blur-3xl

border
border-white/10

shadow-[0_25px_80px_rgba(0,0,0,0.5)]
"


>



{/* Logo */}

<div className="
flex
justify-center
mb-7
">


<div className="
relative
">

<div className="
absolute
inset-0
bg-[#D4AF37]
blur-xl
opacity-40
rounded-full
"/>



<div className="
relative
w-20
h-20

rounded-3xl

bg-gradient-to-br
from-yellow-200
via-yellow-500
to-yellow-800

flex
items-center
justify-center

text-black

shadow-xl
">

<ShoppingBag size={38}/>


</div>


</div>



</div>





<div className="
flex
justify-center
items-center
gap-2
text-[#D4AF37]
mb-3
">


<Crown size={18}/>

<span className="
uppercase
tracking-[5px]
text-sm
">

PrimeCart

</span>


</div>





<h1 className="
text-4xl
font-bold
text-center
tracking-tight
">

Welcome Back

</h1>



<p className="
text-center
text-gray-400
mt-3
mb-8
">

Enter your details to access your premium shopping experience

</p>







<input

value={email}

onChange={
e=>setEmail(e.target.value)
}

placeholder="Email Address"

className="
w-full
rounded-2xl
px-5
py-4

bg-black/30

border
border-white/10

outline-none

transition

focus:border-[#D4AF37]

placeholder:text-gray-500

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
rounded-2xl
px-5
py-4
pr-14

bg-black/30

border
border-white/10

outline-none

focus:border-[#D4AF37]

placeholder:text-gray-500

"


/>



<button

onClick={()=>setShow(!show)}

className="
absolute
right-5
top-4
text-gray-400
hover:text-[#D4AF37]
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
mt-4
">


<Link

href="/forgot-password"

className="
text-sm
text-[#D4AF37]
hover:text-yellow-300
"

>

Forgot Password?

</Link>


</div>







<motion.button


whileHover={{
scale:1.03
}}

whileTap={{
scale:0.97
}}


onClick={login}

disabled={loading}


className="
mt-7
w-full

py-4

rounded-2xl

font-bold

text-black

bg-gradient-to-r
from-yellow-300
via-yellow-500
to-yellow-700

flex
justify-center
items-center
gap-3

shadow-lg

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


</motion.button>







<div className="
flex
items-center
gap-3
my-7
">


<div className="h-px bg-white/20 flex-1"/>

<span className="
text-gray-500
text-sm
">

OR

</span>

<div className="h-px bg-white/20 flex-1"/>


</div>







<button

onClick={googleLogin}

className="
w-full
py-4

rounded-2xl

bg-white
text-black

font-semibold

flex
justify-center
items-center
gap-3

hover:scale-[1.02]

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

bg-black

border
border-white/20

font-semibold

flex
justify-center
items-center
gap-3

hover:border-[#D4AF37]

transition

"


>

<FaGithub/>

Continue with Github


</button>








<p className="
text-center
text-gray-400
mt-8
">


Don't have an account?


<Link

href="/register"

className="
ml-2
text-[#D4AF37]
font-semibold
"

>

Create Account

</Link>


</p>




</motion.div>


</main>

)


}
