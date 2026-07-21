"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Loader2,
} from "lucide-react";

import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };


  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }


    setLoading(true);

    try {

      const res = await fetch(
        "/api/auth/login",
        {
          method: "POST",
          headers:{
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email:
              formData.email,
            password:
              formData.password,
          }),
        }
      );


      const data =
        await res.json();


      if(res.ok){

        toast.success(
          "Welcome back to PrimeCart ✨"
        );

        router.push("/dashboard");

      }else{

        toast.error(
          data.message ||
          "Invalid credentials"
        );

      }


    } catch(error){

      toast.error(
        "Something went wrong"
      );

    } finally{

      setLoading(false);

    }

  };


  return (

<div className="
min-h-screen
bg-gradient-to-br
from-[#f8f3e8]
via-[#fff]
to-[#eee2c8]
flex
items-center
justify-center
p-4
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


{/* LEFT IMAGE */}

<div className="
relative
hidden
lg:block
">

<Image
src="/login-banner.png"
alt="PrimeCart"
fill
priority
className="
object-cover
"
/>


<div className="
absolute
inset-0
bg-black/30
"/>


<div className="
absolute
bottom-16
left-12
text-white
max-w-md
">



<p className="
mt-5
text-lg
text-white/80
">
Discover premium products,
exclusive offers and seamless
shopping experience.
</p>


</div>


</div>




{/* RIGHT SIDE */}


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
mb-10
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
text-5xl
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
mt-4
text-gray-500
text-lg
">
Login to manage your orders,
wishlist and premium deals.
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
relative
mt-2
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
pr-4
outline-none
focus:border-[#D4AF37]
focus:ring-4
focus:ring-[#D4AF37]/10
transition
"
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
relative
mt-2
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
?"text"
:"password"
}
name="password"
value={formData.password}
onChange={handleChange}
placeholder="Enter your password"
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
focus:ring-4
focus:ring-[#D4AF37]/10
transition
"
/>



<button
type="button"
onClick={()=>
setShowPassword(!showPassword)
}
className="
absolute
right-4
top-1/2
-translate-y-1/2
text-gray-400
hover:text-gray-700
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





<div className="
flex
justify-end
">


<Link
href="/forgot-password"
className="
text-[#D4AF37]
font-medium
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
hover:shadow-xl
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
className="
animate-spin
"
/>
Signing In...
</>
:
<>
Sign In
<ArrowRight size={20}/>
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
flex-1
border-t
"/>


<span className="
text-gray-400
text-sm
">
OR
</span>


<div className="
flex-1
border-t
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
font-medium
hover:bg-gray-50
transition
"
>

<FcGoogle size={25}/>

Continue with Google

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
