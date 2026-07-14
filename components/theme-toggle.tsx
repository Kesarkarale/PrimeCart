"use client";


import {Moon,Sun} from "lucide-react";

import {useTheme} from "next-themes";

import {useEffect,useState} from "react";



export default function ThemeToggle(){


const {theme,setTheme}=useTheme();


const [mounted,setMounted]=useState(false);



useEffect(()=>{

setMounted(true);

},[]);



if(!mounted) return null;



return (

<button

onClick={()=>{

setTheme(
theme==="dark"
?
"light"
:
"dark"
)

}}

className="
p-3
rounded-xl
bg-white/10
border
border-white/20
hover:border-[#D4AF37]
transition
"

>

{

theme==="dark"

?

<Sun size={20}/>

:

<Moon size={20}/>

}


</button>

)

}
