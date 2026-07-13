 "use client";


import { useEffect, useState } from "react";

import {
  ShoppingBag,
  Package,
  Users,
  DollarSign,
  LogOut,
  TrendingUp,
  Star
} from "lucide-react";


import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";



export default function Dashboard(){



const router = useRouter();

const supabase = createClient();



const [user,setUser]=useState<any>(null);

const [loading,setLoading]=useState(true);






useEffect(()=>{


async function getUser(){


const {

data

}=await supabase.auth.getUser();



if(!data.user){

router.push("/login");

return;

}



setUser(data.user);

setLoading(false);



}



getUser();


},[]);








async function logout(){


await supabase.auth.signOut();


toast.success(
"Logged out successfully"
);


router.push("/login");


}







if(loading){


return(

<div className="
min-h-screen
bg-[#050505]
flex
items-center
justify-center
text-white
">

Loading PrimeCart Dashboard...

</div>

)

}








return(


<main className="
min-h-screen
bg-[#050505]
text-white
p-6
md:p-10
">





{/* Header */}


<div className="
flex
justify-between
items-center
mb-10
">


<div>


<p className="
text-[#D4AF37]
">

Welcome Back 👋

</p>


<h1 className="
text-4xl
font-bold
">

PrimeCart Dashboard

</h1>



<p className="
text-gray-400
mt-2
">

{user?.email}

</p>


</div>





<button

onClick={logout}

className="
bg-red-500/20
border
border-red-500/30
text-red-400
px-5
py-3
rounded-xl
flex
items-center
gap-2
hover:bg-red-500/30
transition
"

>


<LogOut size={18}/>

Logout


</button>



</div>









{/* Stats */}


<div className="
grid
md:grid-cols-4
gap-6
">



{

[

[
"Total Orders",
"1,240",
ShoppingBag
],


[
"Products",
"856",
Package
],


[
"Customers",
"12.5K",
Users
],


[
"Revenue",
"₹8.5L",
DollarSign
]



].map(([title,value,Icon]:any)=>(



<div

key={title}

className="
bg-white/10
backdrop-blur-xl
border
border-white/10
rounded-3xl
p-6
hover:border-[#D4AF37]
transition
"


>


<Icon

className="
text-[#D4AF37]
mb-4
"

size={30}

/>



<p className="
text-gray-400
">

{title}

</p>


<h2 className="
text-3xl
font-bold
mt-2
">

{value}

</h2>



</div>



))


}



</div>









{/* Main Sections */}



<div className="
grid
lg:grid-cols-2
gap-6
mt-10
">





{/* Recent Orders */}



<div className="
bg-white/10
border
border-white/10
rounded-3xl
p-6
">


<h2 className="
text-2xl
font-bold
mb-5
">

Recent Orders

</h2>




{

[

"iPhone 16 Pro",

"MacBook Air",

"Premium Watch"

].map((item)=>(


<div

key={item}

className="
flex
justify-between
border-b
border-white/10
py-4
"


>


<span>

{item}

</span>


<span className="
text-[#D4AF37]
">

Completed

</span>



</div>


))


}



</div>









{/* Performance */}



<div className="
bg-white/10
border
border-white/10
rounded-3xl
p-6
">



<h2 className="
text-2xl
font-bold
mb-5
">

Store Performance

</h2>



<div className="
flex
items-center
gap-4
mb-5
">


<TrendingUp

className="
text-[#D4AF37]
"

/>


<div>

<p>
Sales Growth
</p>


<h3 className="
text-2xl
font-bold
">

+42%

</h3>


</div>


</div>





<div className="
flex
items-center
gap-4
">


<Star

className="
text-[#D4AF37]
"

/>


<div>

<p>
Customer Rating
</p>


<h3 className="
text-2xl
font-bold
">

4.9/5

</h3>


</div>


</div>





</div>




</div>







</main>


);


}
