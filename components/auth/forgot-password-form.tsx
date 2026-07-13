"use client";


import {useState} from "react";

import Link from "next/link";

import {toast} from "sonner";

import {
useForm
} from "react-hook-form";


import {
z
} from "zod";


import {
zodResolver
} from "@hookform/resolvers/zod";


import {
Mail
} from "lucide-react";


import {
resetPasswordRequest
} from "@/lib/auth/auth-client";



const schema=z.object({

email:z
.string()
.email("Enter valid email")

});



type Data=z.infer<typeof schema>;




export default function ForgotPasswordForm(){


const [loading,setLoading]=useState(false);



const {

register,

handleSubmit,

formState:{
errors

}

}=useForm<Data>({

resolver:zodResolver(schema)

});





async function onSubmit(data:Data){


try{


setLoading(true);



const {
error
}=await resetPasswordRequest(
data.email
);



if(error){

toast.error(error.message);

return;

}



toast.success(
"Password reset link sent"
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





return(

<div className="
w-full
max-w-md
bg-white/10
backdrop-blur-xl
border
border-white/20
rounded-3xl
p-8
text-white
">


<div className="
flex
justify-center
mb-5
">

<div className="
bg-white
text-black
p-4
rounded-xl
">

<Mail/>

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
text-gray-300
text-center
my-5
">

Enter your email to reset password

</p>




<form

onSubmit={
handleSubmit(onSubmit)
}

className="
space-y-4
"

>


<input

placeholder="Email"

{...register("email")}


className="
w-full
bg-white/10
border
border-white/20
rounded-xl
px-4
py-3
"

/>


{
errors.email &&
<p className="
text-red-400
text-sm
">

{errors.email.message}

</p>
}



<button

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
"Sending..."
:
"Send Reset Link"
}


</button>


</form>



<Link

href="/login"

className="
block
text-center
mt-5
text-gray-300
"

>

Back to Login

</Link>


</div>

);


}
