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
max-w-[1200px]
bg-white/90
backdrop-blur-xl
rounded-[40px]
shadow-2xl
overflow-hidden
grid
grid-cols-1
lg:grid-cols-2
border border-white/30
">



{/* LEFT BANNER */}


<div className="
hidden md:block lg:block
relative
">

   {/* GOLD GLOW TOP LEFT */}
  <div
    className="
    absolute
    top-10
    left-10
    w-52
    h-52
    bg-[#D4AF37]/20
    blur-[120px]
    rounded-full
    z-10
    "
  />

  {/* GOLD GLOW BOTTOM RIGHT */}
  <div
    className="
    absolute
    bottom-10
    right-10
    w-64
    h-64
    bg-[#D4AF37]/15
    blur-[140px]
    rounded-full
    z-10
    "
  />


<div className="block md:hidden mb-6">
  <Image
    src="/login-banner.png"
     
    width={600}
    height={350}
    priority
    className="
      w-full
      h-auto
      rounded-3xl
      object-cover
      shadow-lg
    "
  />
</div>


</div>









{/* RIGHT LOGIN */}



<div className="
flex
items-center
justify-center
px-5 py-8 sm:px-8 lg:px-10
">





<div className="
w-full
max-w-md mx-auto
">







{/* LOGO */}


<div className="
mb-8
flex
items-center
gap-3
  -ml-6
">

<Image
src="/logo.png"
alt="PrimeCart Logo"
width={100}
height={50}
priority
className="object-contain"
/>


<div>

<h2 className="
text-3xl sm:text-4xl lg:text-5xl
font-bold
text-black
">

Prime
<span className="text-[#D4AF37]">
Cart
</span>

</h2>

</div>


</div>







<h1 className="
text-2xl sm:text-3xl lg:text-4xl
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

<div className="
mt-5
inline-flex
items-center
gap-2
px-4
py-2
rounded-full
bg-[#D4AF37]/10
border
border-[#D4AF37]/20
">

<span className="text-[#D4AF37]">
⭐
</span>

<span className="
text-sm
font-medium
text-gray-700
">
10,000+ Happy Customers
</span>

</div>






<form

onSubmit={login}

className="
mt-6
space-y-4
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
h-12 sm:h-14
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
h-12 sm:h-14
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
text-base sm:text-lg
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
