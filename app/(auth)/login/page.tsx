"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { motion } from "framer-motion";

import {
  ShoppingBag,
  Eye,
  EyeOff,
  Mail,
  Lock,
  Truck,
  RotateCcw,
  ShieldCheck,
  Headphones,
  ArrowRight
} from "lucide-react";

import { FcGoogle } from "react-icons/fc";

import { toast } from "sonner";


export default function LoginPage(){

const router = useRouter();


const [showPassword,setShowPassword] = useState(false);

const [loading,setLoading] = useState(false);


const [formData,setFormData] = useState({

email:"",
password:"",
remember:false

});



const handleChange = (
e:React.ChangeEvent<HTMLInputElement>
)=>{

const {name,value,type,checked}=e.target;


setFormData((prev)=>({

...prev,

[name]:
type==="checkbox"
? checked
: value

}));

};




const handleSubmit = async(
e:React.FormEvent
)=>{

e.preventDefault();

setLoading(true);


try{


const res = await fetch("/api/auth/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
email:formData.email,
password:formData.password
})

});


const data = await res.json();


if(res.ok){

toast.success("Login Successful");

router.push("/dashboard");

}
else{

toast.error(data.message);

}


}
catch(error){

toast.error("Something went wrong");


}
finally{

setLoading(false);

}


};




return (

<main className="
min-h-screen
bg-[#faf8f3]
flex
items-center
justify-center
p-6
">


<motion.div

initial={{
opacity:0,
y:40
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:0.6
}}


className="
w-full
max-w-7xl
bg-white
rounded-[40px]
overflow-hidden
shadow-2xl
grid
lg:grid-cols-2
"


>



{/* ================= LEFT SIDE ================= */}



<div className="
relative
overflow-hidden
bg-gradient-to-br
from-[#f8f1e5]
via-[#fffaf2]
to-[#ead8b8]
p-10
lg:p-14
">



{/* Background Glow */}


<div className="
absolute
w-80
h-80
bg-[#D4AF37]/20
blur-[120px]
rounded-full
-translate-y-0
top-[-80px]
left-[-80px]
"/>



<div className="
absolute
w-72
h-72
bg-[#D4AF37]/10
blur-[100px]
rounded-full
bottom-0
right-0
"/>




{/* LOGO */}


<div className="
flex
items-center
gap-4
relative
z-10
">


<div className="
w-14
h-14
rounded-2xl
bg-[#D4AF37]
flex
items-center
justify-center
shadow-lg
">


<ShoppingBag
className="
text-white
w-7
h-7
"
/>


</div>



<div>


<h2 className="
text-3xl
font-black
text-gray-900
">

PrimeCart

</h2>


<p className="
text-gray-500
">

Luxury Shopping

</p>


</div>


</div>





{/* TEXT */}



<div className="
mt-14
relative
z-10
">


<p className="
text-[#B68B2C]
tracking-[6px]
font-semibold
text-sm
">

WELCOME BACK

</p>



<h1 className="
mt-5
text-5xl
lg:text-6xl
font-black
leading-tight
text-gray-900
">


Continue Your

<br/>

Luxury Shopping

<br/>

Journey


</h1>




<p className="
mt-6
text-gray-600
text-lg
leading-8
max-w-md
">


Discover premium fashion,
exclusive products and
luxury collections made
for your lifestyle.


</p>



</div>







{/* PRODUCT IMAGE AREA */}



<div className="
relative
mt-12
h-[360px]
">



<Image

src="/login/bag.png"

alt="Luxury Bag"

width={260}

height={260}

className="
absolute
left-0
top-5
drop-shadow-2xl
hover:scale-105
transition
"

/>




<Image

src="/login/shoes.png"

alt="Luxury Shoes"

width={250}

height={250}

className="
absolute
right-0
top-0
drop-shadow-2xl
hover:scale-105
transition
"

/>




<Image

src="/login/perfume.png"

alt="Perfume"

width={150}

height={150}

className="
absolute
left-36
bottom-0
drop-shadow-xl
"

/>





<Image

src="/login/watch.png"

alt="Watch"

width={170}

height={170}

className="
absolute
right-16
bottom-0
drop-shadow-xl
"

/>



</div>





{/* FEATURES */}



<div className="
grid
grid-cols-2
gap-4
mt-6
">


<div className="
flex
items-center
gap-2
text-sm
text-gray-700
">

<Truck
size={18}
className="text-[#D4AF37]"
/>

Free Delivery

</div>



<div className="
flex
items-center
gap-2
text-sm
text-gray-700
">

<ShieldCheck
size={18}
className="text-[#D4AF37]"
/>

Secure Payment

</div>



<div className="
flex
items-center
gap-2
text-sm
text-gray-700
">

<RotateCcw
size={18}
className="text-[#D4AF37]"
/>

Easy Return

</div>




<div className="
flex
items-center
gap-2
text-sm
text-gray-700
">


<Headphones
size={18}
className="text-[#D4AF37]"
/>


24/7 Support


</div>


</div>





</div>





{/* RIGHT SIDE CONTINUE IN PART 2 */}



<div className="
p-10
lg:p-14
">




{/* Part 2 Here */}
{/* LOGIN CONTENT */}


<div className="max-w-md mx-auto">


<p className="
text-[#D4AF37]
uppercase
tracking-[5px]
text-sm
font-semibold
">

Welcome Back

</p>



<h2 className="
mt-4
text-4xl
font-black
text-gray-900
">

Login To Your Account

</h2>



<p className="
mt-3
text-gray-500
">

Enter your details to continue shopping

</p>





<form
onSubmit={handleSubmit}
className="
mt-10
space-y-6
"
>




{/* EMAIL */}



<div>


<label className="
text-sm
font-semibold
text-gray-700
">

Email Address

</label>



<div className="
mt-2
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

type="email"

name="email"

value={formData.email}

onChange={handleChange}

placeholder="Enter your email"

className="
w-full
h-14
rounded-2xl
border
border-gray-200
bg-gray-50
pl-12
pr-5
outline-none
focus:border-[#D4AF37]
focus:ring-2
focus:ring-[#D4AF37]/20
transition
"

required

/>


</div>


</div>






{/* PASSWORD */}




<div>


<label className="
text-sm
font-semibold
text-gray-700
">

Password

</label>



<div className="
mt-2
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


type={
showPassword
?
"password"
:
"text"
}



name="password"


value={formData.password}


onChange={handleChange}



placeholder="Enter password"



className="
w-full
h-14
rounded-2xl
border
border-gray-200
bg-gray-50
pl-12
pr-12
outline-none
focus:border-[#D4AF37]
focus:ring-2
focus:ring-[#D4AF37]/20
transition
"



required


/>




<button

type="button"

onClick={()=>setShowPassword(!showPassword)}

className="
absolute
right-4
top-1/2
-translate-y-1/2
text-gray-500
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



</div>







{/* REMEMBER + FORGOT */}




<div className="
flex
items-center
justify-between
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
w-4
h-4
accent-[#D4AF37]
"

/>



Remember me


</label>





<button

type="button"

className="
text-[#B68B2C]
font-semibold
hover:underline
"

>

Forgot Password?

</button>



</div>







{/* LOGIN BUTTON */}



<button

disabled={loading}

type="submit"

className="
w-full
h-14
rounded-2xl
bg-[#D4AF37]
text-white
font-bold
text-lg
flex
items-center
justify-center
gap-3
hover:bg-[#b89225]
transition
shadow-lg
shadow-[#D4AF37]/30
"

>


{

loading

?

"Logging in..."

:

<>

Login Now

<ArrowRight size={22}/>

</>

}



</button>





</form>








{/* DIVIDER */}




<div className="
flex
items-center
gap-4
my-8
">


<div className="
h-px
bg-gray-200
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
bg-gray-200
flex-1
"/>


</div>







{/* GOOGLE BUTTON */}



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
text-gray-700
hover:bg-gray-50
transition
"

>


<FcGoogle size={24}/>


Continue With Google


</button>







{/* REGISTER */}




<p className="
text-center
mt-8
text-gray-500
">


Don't have an account?


<span className="
text-[#B68B2C]
font-bold
ml-2
cursor-pointer
">


Create Account


</span>



</p>




{/* EXTRA SECURITY NOTE */}


<div className="
mt-10
p-5
rounded-3xl
bg-[#faf8f3]
border
border-[#D4AF37]/20
">


<div className="
flex
items-center
gap-3
">


<div className="
w-10
h-10
rounded-xl
bg-[#D4AF37]/20
flex
items-center
justify-center
">

<ShieldCheck

className="
text-[#B68B2C]
"

/>

</div>



<div>

<h4 className="
font-bold
text-gray-900
">

Secure Shopping

</h4>


<p className="
text-sm
text-gray-500
">

Your information is protected

</p>
</div>
</div>
</div>
</div>
</div>

</motion.div>

</main>
);

}
