"use client";


import {useState} from "react";

import {useRouter} from "next/navigation";

import {toast} from "sonner";

import {
updatePassword
} from "@/lib/auth/auth-client";



export default function ResetPasswordForm(){


const router=useRouter();


const [password,setPassword]=useState("");

const [loading,setLoading]=useState(false);





async function submit(){


try{


setLoading(true);



const {
error
}=await updatePassword(password);



if(error){

toast.error(error.message);

return;

}



toast.success(
"Password updated"
);



router.push("/login");


}

catch{

toast.error(
"Failed"
);

}

finally{

setLoading(false);

}

}





return(

<div className="
w-full
max-w-md
bg-white/10
border
border-white/20
backdrop-blur-xl
rounded-3xl
p-8
text-white
">


<h1 className="
text-3xl
font-bold
text-center
mb-6
">

Create New Password

</h1>



<input

type="password"

value={password}

onChange={
e=>setPassword(e.target.value)
}

placeholder="New Password"

className="
w-full
bg-white/10
border
border-white/20
rounded-xl
px-4
py-3
mb-5
"

/>



<button

onClick={submit}

disabled={loading}

className="
w-full
bg-white
text-black
rounded-xl
py-3
font-semibold
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


</div>

);


}
