"use client";

import { useState } from "react";
import Link from "next/link";

import { Mail, ArrowRight } from "lucide-react";
import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";


export default function ForgotPassword(){


const supabase = createClient();


const [email,setEmail] = useState("");

const [loading,setLoading] = useState(false);




async function sendResetLink(){


try{


setLoading(true);



const {

error

}=await supabase.auth.resetPasswordForEmail(

email,

{

redirectTo:

`${window.location.origin}/reset-password`

}

);



if(error){

toast.error(error.message);

return;

}



toast.success(
"Password reset link sent to your email"
);



}


catch{

toast.error(
"Something went wrong"
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
">


<div className="
absolute
w-[400px]
h-[400px]
bg-[#D4AF37]
opacity-20
blur-[150px]
rounded-full
">


</div>




<div className="
relative
w-full
max-w-md
bg-white/10
backdrop-blur-xl
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
">

<Mail size={35}/>

</div>


</div>





<h1 className="
text-3xl
font-bold
text-center
">

Forgot Password

</h1>



<p className="
text-gray-400
text-center
mt-3
mb-8
">

Enter your email to reset your password

</p>






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
outline-none
focus:border-[#D4AF37]
"

/>






<button

onClick={sendResetLink}

disabled={loading}

className="
mt-6
w-full
bg-[#D4AF37]
text-black
py-3
rounded-xl
font-bold
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

"Sending..."

:

<>
Send Reset Link
<ArrowRight size={18}/>
</>

}


</button>






<Link

href="/login"

className="
block
text-center
mt-6
text-[#D4AF37]
"

>

Back to Login

</Link>




</div>


</main>

);


}
