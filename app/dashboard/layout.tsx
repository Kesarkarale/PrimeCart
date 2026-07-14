 import type { ReactNode } from "react";

import Sidebar from "@/components/layout/sidebar";
import Navbar from "@/components/layout/navbar";


export default function DashboardLayout({

children,

}:{

children:ReactNode;

}){


return (

<div className="
min-h-screen

bg-gray-50
dark:bg-[#050505]

text-gray-900
dark:text-white

transition-colors
duration-300
">


<Sidebar />



<div className="
md:ml-72
min-h-screen
flex
flex-col
">



<Navbar />



<main className="
flex-1

p-5
md:p-8

bg-gray-50
dark:bg-[#050505]

transition-colors
duration-300
">


{children}


</main>



</div>



</div>

);

}
