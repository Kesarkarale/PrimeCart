"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Image from "next/image";

import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Loader2,
} from "lucide-react";

import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";

import { createClient } from "@/lib/supabase/client";


export default function LoginPage() {


const supabase = createClient();

const router = useRouter();



const [formData,setFormData] = useState({

email:"",
password:"",
remember:false

});



const [showPassword,setShowPassword] =
useState(false);


const [loading,setLoading] =
useState(false);






const handleChange = (
e:React.ChangeEvent<HTMLInputElement>
)=>{


const {
name,
value,
type,
checked
}=e.target;



setFormData(prev=>({

...prev,

[name]:
type==="checkbox"
?
checked
:
value

}));

};







async function login(
e:React.FormEvent
){


e.preventDefault();


const {
email,
password,
remember
}=formData;



if(!email || !password){

toast.error(
"Please fill all fields"
);

return;

}



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




if(remember){

localStorage.setItem(
"rememberEmail",
email
);

}




toast.success(
"Login Successful ✨"
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








return (

<div className="
min-h-screen
bg-gradient-to-br
from-[#f8f5ef]
via-[#ffffff]
to-[#efe5cf]
flex
items-center
justify-center
p-5
">





<div className="
w-full
max-w-[1400px]
min-h-[850px]
bg-white
rounded-[40px]
shadow-2xl
overflow-hidden
grid
lg:grid-cols-2
">







{/* LEFT BANNER */}


<div className="
hidden
lg:block
relative
">


<Image

src="/login-banner.png"

alt="Banner"

fill

priority

className="
object-cover
"

/>


</div>









{/* RIGHT LOGIN */}



<div className="
flex
items-center
justify-center
px-6
py-10
">





<div className="
w-full
max-w-md
">







{/* LOGO */}


<div className="
mb-8
">


<Image

src="/logo.png"

alt="PrimeCart"

width={180}

height={50}

priority

/>


</div>







<h1 className="
text-4xl
font-bold
text-gray-900
">


Welcome


<span className="
text-[#D4AF37]
">

 Back ✨

</span>


</h1>





<p className="
mt-3
text-gray-500
">


Continue your premium shopping journey.


</p>








<form

onSubmit={login}

className="
mt-8
space-y-5
"

>










{/* EMAIL */}



<div className="
relative
">


<Mail

size={20}

className="
absolute
left-4
top-1/2
-translate-y-1/2
text-gray-400
"

/>




<input

type="email"

name="email"

value={formData.email}

onChange={handleChange}

placeholder="Email Address"

className="
w-full
h-14
rounded-2xl
bg-gray-50
border
border-gray-200
pl-12
outline-none
focus:border-[#D4AF37]
focus:ring-4
focus:ring-[#D4AF37]/10
transition
"

/>


</div>









{/* PASSWORD */}



<div className="
relative
">


<Lock

size={20}

className="
absolute
left-4
top-1/2
-translate-y-1/2
text-gray-400
"

/>





<input

type={
showPassword
?
"text"
:
"password"
}

name="password"

value={formData.password}

onChange={handleChange}

placeholder="Password"

className="
w-full
h-14
rounded-2xl
bg-gray-50
border
border-gray-200
pl-12
pr-12
outline-none
focus:border-[#D4AF37]
focus:ring-4
focus:ring-[#D4AF37]/10
transition
"

/>







<button

type="button"

onClick={()=>setShowPassword(!showPassword)}

className="
absolute
right-4
top-1/2
-translate-y-1/2
text-gray-400
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



</div>









{/* REMEMBER */}



<div className="
flex
justify-between
items-center
text-sm
">


<label className="
flex
items-center
gap-2
text-gray-600
">


<input

type="checkbox"

name="remember"

checked={formData.remember}

onChange={handleChange}

className="
accent-[#D4AF37]
"

/>


Remember me


</label>





<Link

href="/forgot-password"

className="
text-[#D4AF37]
font-semibold
hover:underline
"

>

Forgot Password?

</Link>


</div>









<button

disabled={loading}

className="
w-full
h-14
rounded-2xl
bg-gradient-to-r
from-[#B8860B]
to-[#D4AF37]
text-white
font-semibold
text-lg
flex
items-center
justify-center
gap-3
shadow-lg
hover:scale-[1.02]
transition
disabled:opacity-70
"

>


{

loading

?

<>

<Loader2
className="animate-spin"
/>

Logging in...

</>


:

<>

Login Now

<ArrowRight size={20}/>

</>


}


</button>






</form>








<div className="
flex
items-center
gap-4
my-8
">


<div className="
flex-1
h-px
bg-gray-200
"/>



<span className="
text-gray-400
text-sm
">

OR

</span>



<div className="
flex-1
h-px
bg-gray-200
"/>


</div>









<button

className="
w-full
h-14
rounded-2xl
border
border-gray-200
flex
items-center
justify-center
gap-3
font-semibold
hover:bg-gray-50
transition
"

>


<FcGoogle size={24}/>

Continue With Google


</button>








<p className="
text-center
text-gray-500
mt-8
">


Don't have an account?


<Link

href="/register"

className="
ml-2
text-[#D4AF37]
font-semibold
hover:underline
"

>

Create Account →

</Link>


</p>







</div>



</div>





</div>



</div>


);

}
