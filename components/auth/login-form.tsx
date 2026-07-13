"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Eye,
  EyeOff,
  ShoppingBag,
  Github,
} from "lucide-react";

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
  signInUser,
  signInWithGoogle,
  signInWithGithub,
} from "@/lib/auth/auth-client";



const loginSchema = z.object({

  email: z
    .string()
    .email("Please enter valid email"),


  password: z
    .string()
    .min(6,"Password must be at least 6 characters"),

});



type LoginFormData = z.infer<typeof loginSchema>;



export default function LoginForm(){


  const router = useRouter();


  const [showPassword,setShowPassword] = useState(false);


  const [loading,setLoading] = useState(false);


  const [socialLoading,setSocialLoading] = useState(false);




  const {

    register,

    handleSubmit,

    formState:{
      errors

    }

  } = useForm<LoginFormData>({

    resolver:zodResolver(loginSchema)

  });






  async function onSubmit(
    data:LoginFormData
  ){


    try{


      setLoading(true);



      const {

        error

      } = await signInUser(

        data.email,

        data.password

      );



      if(error){

        toast.error(error.message);

        return;

      }




      toast.success(
        "Welcome back to PrimeCart"
      );



      router.push("/dashboard");



    }

    catch(error){

      toast.error(
        "Login failed. Try again."
      );

    }

    finally{

      setLoading(false);

    }


  }





  async function handleGoogleLogin(){


    try{


      setSocialLoading(true);


      const {

        error

      } = await signInWithGoogle();



      if(error){

        toast.error(error.message);

      }


    }

    catch{

      toast.error(
        "Google login failed"
      );

    }

    finally{

      setSocialLoading(false);

    }


  }







  async function handleGithubLogin(){


    try{


      setSocialLoading(true);


      const {

        error

      } = await signInWithGithub();



      if(error){

        toast.error(error.message);

      }


    }

    catch{

      toast.error(
        "Github login failed"
      );

    }

    finally{

      setSocialLoading(false);

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

onSubmit={
handleSubmit(onSubmit)
}

className="
space-y-5
"

>





<div>


<input

type="email"

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
mt-1
">

{errors.email.message}

</p>

}



</div>








<div className="
relative
">


<input


type={
showPassword
?
"text"
:
"password"
}


placeholder="Password"


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
text-gray-300
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

<p className="
text-red-400
text-sm
mt-1
">

{errors.password.message}

</p>

}



</div>






<div className="
flex
justify-end
">


<Link

href="/forgot-password"

className="
text-sm
text-gray-300
hover:text-white
"

>

Forgot Password?

</Link>


</div>







<button

disabled={loading}

className="
w-full
bg-white
text-black
rounded-xl
py-3
font-semibold
transition
hover:scale-[1.02]
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








<div className="
flex
items-center
gap-3
my-6
">


<div className="
h-px
bg-white/20
flex-1
"/>


<span className="
text-gray-300
text-sm
">

OR

</span>



<div className="
h-px
bg-white/20
flex-1
"/>


</div>







<button

onClick={handleGoogleLogin}

disabled={socialLoading}

className="
w-full
bg-white
text-black
rounded-xl
py-3
font-semibold
transition
hover:scale-[1.02]
"

>


🌐 Continue with Google


</button>






<button

onClick={handleGithubLogin}

disabled={socialLoading}

className="
mt-3
w-full
bg-black
border
border-white/20
rounded-xl
py-3
font-semibold
flex
items-center
justify-center
gap-2
transition
hover:scale-[1.02]
"

>


<Github size={20}/>


Continue with Github


</button>







<p className="
text-center
text-sm
text-gray-300
mt-6
">


Don't have an account?


<Link

href="/register"

className="
text-white
font-semibold
ml-1
"

>

Create Account

</Link>



</p>






</div>

</div>


);

}
