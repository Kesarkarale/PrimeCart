"use client";


import { useState } from "react";

import { useRouter } from "next/navigation";

import { Eye, EyeOff, ShoppingBag } from "lucide-react";

import { toast } from "sonner";

import {
useForm
} from "react-hook-form";


import {
zodResolver
} from "@hookform/resolvers/zod";


import {
z
} from "zod";


import {
signInUser
} from "@/lib/auth/auth-client";



const schema=z.object({

email:z
.string()
.email("Enter valid email"),


password:z
.string()
.min(
6,
"Password must be minimum 6 characters"
)

});



type LoginData=z.infer<typeof schema>;



export default function LoginForm(){


const router=useRouter();


const [showPassword,setShowPassword]=useState(false);


const [loading,setLoading]=useState(false);



const {

register,

handleSubmit,

formState:{
errors

}

}=useForm<LoginData>({

resolver:zodResolver(schema)

});





async function onSubmit(data:LoginData){


try{


setLoading(true);



const {
error
}=await signInUser(

data.email,

data.password

);



if(error){

toast.error(
error.message
);

return;

}



toast.success(
"Welcome back to PrimeCart"
);



router.push("/dashboard");


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

<div className="w-full max-w-md">


<div className="
rounded-3xl
bg-white/10
backdrop-blur-xl
border
border-white/20
shadow-2xl
p-8
text-white
">


<div className="flex justify-center mb-6">


<div className="
bg-white
text-black
p-4
rounded-2xl
">

<ShoppingBag size={32}/>


</div>


</div>



<h1 className="
text-3xl
font-bold
text-center
">

Welcome Back

</h1>


<p className="
text-center
text-gray-300
mt-2
mb-8
">

Login to your PrimeCart account

</p>





<form
onSubmit={handleSubmit(onSubmit)}
className="space-y-5"
>



<div>


<input

{...register("email")}

placeholder="Email Address"

className="
w-full
rounded-xl
bg-white/10
border
border-white/20
px-4
py-3
outline-none
focus:ring-2
focus:ring-white
"

/>


{
errors.email &&
<p className="text-red-400 text-sm mt-1">
{errors.email.message}
</p>
}



</div>





<div className="relative">


<input

{...register("password")}

type={
showPassword
?
"text"
:
"password"
}

placeholder="Password"

className="
w-full
rounded-xl
bg-white/10
border
border-white/20
px-4
py-3
outline-none
focus:ring-2
focus:ring-white
pr-12
"

/>



<button

type="button"

onClick={()=>setShowPassword(!showPassword)}

className="
absolute
right-4
top-3
"

>


{
showPassword
?
<EyeOff size={20}/>
:
<Eye size={20}/>
}


</button>



{
errors.password &&
<p className="text-red-400 text-sm mt-1">
{errors.password.message}
</p>
}



</div>





<button

disabled={loading}

className="
w-full
bg-white
text-black
font-semibold
rounded-xl
py-3
hover:scale-[1.02]
transition
disabled:opacity-50
"


>


{
loading
?
"Logging in..."
:
"Login"
}



</button>




</form>



<p className="
text-center
text-sm
text-gray-300
mt-6
">


Don't have an account?

<span className="text-white font-semibold cursor-pointer">

 Register

</span>


</p>



</div>

</div>


);


}
