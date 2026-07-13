"use client";


import {useState} from "react";

import Link from "next/link";

import {useRouter} from "next/navigation";


import {
Eye,
EyeOff,
ShoppingBag
} from "lucide-react";


import {toast} from "sonner";


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
signUpUser
} from "@/lib/auth/auth-client";





const registerSchema=z.object({

name:z
.string()
.min(3,"Name must contain 3 characters"),


email:z
.string()
.email("Enter valid email"),


password:z
.string()
.min(
6,
"Password must be minimum 6 characters"
),


confirmPassword:z
.string()


})
.refine(

(data)=>data.password===data.confirmPassword,

{

message:"Passwords do not match",

path:["confirmPassword"]

}

);




type RegisterData=z.infer<typeof registerSchema>;





export default function RegisterForm(){


const router=useRouter();


const [showPassword,setShowPassword]=useState(false);


const [loading,setLoading]=useState(false);




const {

register,

handleSubmit,

formState:{
errors
}

}=useForm<RegisterData>({

resolver:zodResolver(registerSchema)

});






async function onSubmit(
data:RegisterData
){


try{


setLoading(true);



const {

error

}=await signUpUser(

data.email,

data.password,

data.name

);



if(error){

toast.error(error.message);

return;

}



toast.success(
"Check your email for verification"
);



router.push("/login");



}


catch{

toast.error(
"Registration failed"
);

}


finally{

setLoading(false);

}


}






return (

<div className="
w-full
max-w-md
">


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



<div className="
flex
justify-center
mb-6
">


<div className="
bg-white
text-black
p-4
rounded-2xl
">


<ShoppingBag size={34}/>


</div>


</div>





<h1 className="
text-3xl
font-bold
text-center
">

Create Account

</h1>



<p className="
text-center
text-gray-300
mt-2
mb-8
">

Join PrimeCart today

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

placeholder="Full Name"

{...register("name")}

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
errors.name &&
<p className="
text-red-400
text-sm
">

{errors.name.message}

</p>
}





<input

placeholder="Email Address"

{...register("email")}

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
<p className="
text-red-400
text-sm
">

{errors.email.message}

</p>
}





<div className="
relative
">


<input


placeholder="Password"


type={
showPassword
?
"text"
:
"password"
}



{...register("password")}



className="
w-full
rounded-xl
bg-white/10
border
border-white/20
px-4
py-3
pr-12
outline-none
focus:ring-2
focus:ring-white
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
<EyeOff/>
:
<Eye/>
}


</button>



</div>





<input

placeholder="Confirm Password"

type="password"


{...register("confirmPassword")}


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
errors.confirmPassword &&
<p className="
text-red-400
text-sm
">

{errors.confirmPassword.message}

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
hover:scale-[1.02]
transition
"


>

{

loading
?
"Creating Account..."
:
"Register"

}


</button>






</form>







<p className="
text-center
text-sm
text-gray-300
mt-6
">


Already have account?


<Link

href="/login"

className="
text-white
font-semibold
ml-1
"

>

Login

</Link>



</p>






</div>

</div>

);


}
