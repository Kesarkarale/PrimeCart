"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Eye,
  EyeOff,
  ShoppingBag,
  ArrowRight,
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



const {

error

}=await supabase.auth.signInWithPassword({

email,

password

});



if(error){

toast.error(error.message);

return;

}



toast.success(
"Welcome back to PrimeCart"
);


router.push("/dashboard");


}


catch{

toast.error(
"Login failed"
);

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


if(error){

toast.error(error.message);

}


}





async function githubLogin(){


const {error}=await supabase.auth.signInWithOAuth({

provider:"github",

options:{

redirectTo:
`${window.location.origin}/auth/callback`

}

});


if(error){

toast.error(error.message);

}


}





return (


<main className="
min-h-screen
bg-[#050505]
text-white
flex
items-center
justify-center
px-5
overflow-hidden
">


{/* Glow */}

<div className="
absolute
w-[500px]
h-[500px]
bg-[#D4AF37]
opacity-20
blur-[150px]
rounded-full
">

</div>




<motion.div

initial={{
opacity:0,
y:40
}}

animate={{
opacity:1,
y:0
}}

className="
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
"

>




{/* Logo */}

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


Welcome Back


</h1>



<p className="
text-center
text-gray-400
mt-2
mb-8
">


Login to your PrimeCart account


</p>





{/* Email */}

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
rounded-xl
px-4
py-3
outline-none
focus:border-[#D4AF37]
mb-4
"

/>





{/* Password */}


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
bg-black/40
border
border-white/20
rounded-xl
px-4
py-3
pr-12
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
justify-center
items-center
gap-2
hover:scale-105
transition
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
font-semibold
flex
justify-center
items-center
gap-3
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
py-3
rounded-xl
font-semibold
flex
justify-center
items-center
gap-3
"


>

<FaGithub/>

Continue with Github


</button>







<p className="
text-center
text-gray-400
mt-7
">


Don't have account?


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



</main>


);


}
