"use client";


import { useTheme } from "next-themes";


export default function Home(){


const {
theme,
setTheme
}=useTheme();



return (

<div className="min-h-screen flex items-center justify-center">


<button

onClick={()=>setTheme(
theme==="dark"
?"light"
:"dark"
)}

className="px-6 py-3 rounded-xl bg-black text-white"

>

Change Theme

</button>


</div>

);


}
