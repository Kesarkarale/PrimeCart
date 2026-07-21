"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Image from "next/image";

import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  ArrowRight,
  Loader2,
} from "lucide-react";

import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";


export default function RegisterPage() {


const supabase = createClient();

const router = useRouter();


const [formData,setFormData] = useState({
name:"",
email:"",
password:"",
confirmPassword:""
});


const [showPassword,setShowPassword] = useState(false);
const [showConfirm,setShowConfirm] = useState(false);

const [loading,setLoading] = useState(false);



const handleChange = (
e:React.ChangeEvent<HTMLInputElement>
)=>{

setFormData(prev=>({
...prev,
[e.target.name]:e.target.value
}));

};





async function register(){


const {
name,
email,
password,
confirmPassword
}=formData;



if(!name || !email || !password || !confirmPassword){

toast.error(
"Please fill all fields"
);

return;

}



if(password.length < 6){

toast.error(
"Password must be at least 6 characters"
);

return;

}




if(password !== confirmPassword){

toast.error(
"Passwords do not match"
);

return;

}





try{


setLoading(true);



const {error}=await supabase.auth.signUp({

email,

password,


options:{

data:{
name
}

}

});




if(error){

toast.error(error.message);

return;

}



toast.success(
"Account created successfully ✨"
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
          className="object-cover"
        />
      </div>


{/* RIGHT REGISTER */}



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


Create

<span className="
text-[#D4AF37]
">

 Account ✨

</span>


</h1>



<p className="
mt-3
text-gray-500
">

Start your premium shopping journey.

</p>






<div className="
mt-8
space-y-5
">






{/* NAME */}


<div className="
relative
">

<User

className="
absolute
left-4
top-1/2
-translate-y-1/2
text-gray-400
"

size={20}

/>


<input

name="name"

placeholder="Full Name"

value={formData.name}

onChange={handleChange}

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







{/* EMAIL */}


<div className="
relative
">


<Mail

className="
absolute
left-4
top-1/2
-translate-y-1/2
text-gray-400
"

size={20}

/>



<input

name="email"

type="email"

placeholder="Email Address"

value={formData.email}

onChange={handleChange}

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

className="
absolute
left-4
top-1/2
-translate-y-1/2
text-gray-400
"

size={20}

/>


<input

name="password"

type={
showPassword
?
"text"
:
"password"
}

placeholder="Password"

value={formData.password}

onChange={handleChange}

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

showPassword ?

<EyeOff size={20}/>

:

<Eye size={20}/>

}


</button>


</div>







{/* CONFIRM */}


<div className="
relative
">


<Lock

className="
absolute
left-4
top-1/2
-translate-y-1/2
text-gray-400
"

size={20}

/>


<input

name="confirmPassword"

type={
showConfirm
?
"text"
:
"password"
}

placeholder="Confirm Password"

value={formData.confirmPassword}

onChange={handleChange}

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

onClick={()=>setShowConfirm(!showConfirm)}

className="
absolute
right-4
top-1/2
-translate-y-1/2
text-gray-400
"

>


{

showConfirm ?

<EyeOff size={20}/>

:

<Eye size={20}/>

}


</button>


</div>









<button

onClick={register}

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

loading ?

<>

<Loader2 className="animate-spin"/>

Creating...

</>

:

<>

Create Account

<ArrowRight size={20}/>

</>

}


</button>







</div>







<p className="
text-center
text-gray-500
mt-8
">


Already have an account?


<Link

href="/login"

className="
ml-2
text-[#D4AF37]
font-semibold
hover:underline
"

>

Login →

</Link>


</p>





</div>


</div>



</div>


</div>


);


}
