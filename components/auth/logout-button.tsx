"use client";


import {
useRouter
}
from "next/navigation";


import {
toast
}
from "sonner";


import {
signOutUser
}
from "@/lib/auth/auth-client";



export default function LogoutButton(){


const router = useRouter();




async function logout(){


const {
error
}=await signOutUser();



if(error){

toast.error(
error.message
);

return;

}



toast.success(
"Logged out successfully"
);



router.push("/login");

router.refresh();


}



return(

<button

onClick={logout}

className="
bg-white
text-black
px-6
py-3
rounded-xl
font-semibold
hover:scale-105
transition
"

>

Logout

</button>

);


}
