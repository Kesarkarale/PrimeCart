"use client";

import { useEffect, useState } from "react";
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
  FaGithub
} from "react-icons/fa";

import { motion } from "framer-motion";

import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";



export default function LoginPage(){


const router = useRouter();

const supabase = createClient();



const [email,setEmail]=useState("");

const [password,setPassword]=useState("");

const [showPassword,setShowPassword]=useState(false);

const [loading,setLoading]=useState(false);





// already logged user check

useEffect(()=>{


async function checkUser(){


const {data}=await supabase.auth.getUser();


if(data.user){

router.push("/dashboard");

}


}


checkUser();


},[]);







async function login(){



if(!email || !password){

toast.error(
"Please enter email and password"
);

return;

}



if(!email.includes("@")){

toast.error(
"Enter valid email address"
);

return;

}



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
"Welcome to PrimeCart 👑"
);



setTimeout(()=>{

router.push("/dashboard");

},800);





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


const {

error

}=await supabase.auth.signInWithOAuth({

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



const {

error

}=await supabase.auth.signInWithOAuth({

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







return(


<main className="
min-h-screen
bg-black
text-white
flex
items-center
justify-center
px-5
relative
overflow-hidden
">





{/* Background Glow */}


<div className="
absolute
w-[600px]
h-[600px]
bg-yellow-500/20
blur-[180px]
rounded-full
">

</div>








<motion.div


initial={{
opacity:0,
y:50
}}


animate={{
opacity:1,
y:0
}}


transition={{
duration:0.6
}}



className="
relative
w-full
max-w-md
bg-white/10
backdrop-blur-2xl
border
border-white/20
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
relative
bg-gradient-to-br
from-yellow-300
to-yellow-700
text-black
p-5
rounded-2xl
shadow-xl
">


<ShoppingBag size={40}/>


<div className="
absolute
-right-2
-top-2
bg-black
rounded-full
p-1
">

<Sparkles
size={15}
className="text-yellow-400"
/>


</div>


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
mt-3
mb-8
">

Login to your PrimeCart account

</p>









{/* Email */}



<label className="
text-sm
text-gray-300
">

Email

</label>


<input

type="email"

value={email}

onChange={
e=>setEmail(e.target.value)
}


placeholder="Enter your email"


className="
mt-2
mb-5
w-full
bg-black/40
border
border-white/20
rounded-xl
px-4
py-3
outline-none
focus:border-yellow-500
transition
"

/>









{/* Password */}



<label className="
text-sm
text-gray-300
">

Password

</label>



<div className="
relative
mt-2
">


<input


type={
showPassword
?
"text"
:
"password"
}


value={password}

onChange={
e=>setPassword(e.target.value)
}


placeholder="Enter password"


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
focus:border-yellow-500
transition
"

/>



<button

type="button"

onClick={()=>setShowPassword(!showPassword)}

className="
absolute
right-4
top-3
text-gray-400
"

>


{

showPassword

?

<EyeOff/>

:

<Eye/>

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
text-yellow-400
hover:text-yellow-300
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
disabled:opacity-50
"


>


{

loading

?

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
text-gray-400
mt-7
">


Don't have account?


<Link

href="/register"

className="
text-yellow-400
font-bold
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
