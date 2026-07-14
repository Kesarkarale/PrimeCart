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
bg-[#050505]
text-white
">


{/* Sidebar */}

<Sidebar />



{/* Main Area */}

<div className="
md:ml-72
min-h-screen
flex
flex-col
">



{/* Navbar */}

<Navbar />



{/* Page Content */}

<main className="
flex-1
p-5
md:p-8
">

{children}


</main>



</div>



</div>

);


}
