import {
getServerUser
}
from "@/lib/auth/auth-server";


import LogoutButton
from "@/components/auth/logout-button";



export default async function Dashboard(){


const user = await getServerUser();



return(

<div className="
min-h-screen
bg-slate-950
text-white
p-10
">


<h1 className="
text-4xl
font-bold
">

PrimeCart Dashboard

</h1>



<div className="
mt-8
bg-white/10
border
border-white/20
rounded-2xl
p-6
max-w-xl
">


<h2 className="
text-xl
font-semibold
mb-3
">

User Information

</h2>



<p>

Email:

<span className="ml-2 text-gray-300">

{user?.email}

</span>

</p>



<p className="mt-2">

User ID:

<span className="ml-2 text-gray-300">

{user?.id}

</span>

</p>



</div>



<div className="mt-6">

<LogoutButton/>

</div>



</div>

);


}
