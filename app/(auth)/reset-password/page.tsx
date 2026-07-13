"use client";


import { useState } from "react";

import { useRouter } from "next/navigation";

import Link from "next/link";

import { Lock } from "lucide-react";

import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";



export default function ResetPassword(){


const supabase = createClient();


const router = useRouter();


const [password,setPassword]=useState("");

const [confirm,setConfirm]=useState("");

const [loading,setLoading]=useState(false);





async function updatePassword(){


if(password !== confirm){

toast.error(
"Passwords do not match"
);

return;

}



try{


setLoading(true);



const {

error

}=await supabase.auth.updateUser({

password

});



if(error){

toast.error(error.message);

return;

}



toast.success(
"Password updated successfully"
);



router.push("/login");


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





return(

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

<Lock size={35}/>

</div>

</div>




<h1 className="
text-3xl
font-bold
text-center
">

Create New Password

</h1>



<p className="
text-gray-400
text-center
mt-3
mb-8
">

Enter your new secure password

</p>






<input

type="password"

placeholder="New Password"

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
mb-4
"

/>





<input

type="password"

placeholder="Confirm Password"

value={confirm}

onChange={
e=>setConfirm(e.target.value)
}

className="
w-full
bg-black/40
border
border-white/20
rounded-xl
px-4
py-3
"

/>







<button

onClick={updatePassword}

disabled={loading}

className="
mt-6
w-full
bg-[#D4AF37]
text-black
py-3
rounded-xl
font-bold
"

>

{

loading
?

"Updating..."

:

"Update Password"

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
