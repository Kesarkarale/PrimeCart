import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import Providers from "@/components/providers";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});



export const metadata: Metadata = {

title: "PrimeCart | Premium Online Shopping",

description:
"PrimeCart is a luxury e-commerce marketplace with premium products, secure payments and fast delivery.",

icons:{
icon:"/favicon.ico",
},

};



export default function RootLayout({

children,

}: Readonly<{

children: React.ReactNode;

}>) {


return (

<html lang="en">

<body
className={`
${inter.variable}
antialiased
bg-[#050505]
text-white
`}
>

<Providers>

{children}

</Providers>


</body>


</html>

);

}
