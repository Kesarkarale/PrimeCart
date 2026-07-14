import type { Metadata } from "next";
import "./globals.css";

import Providers from "@/components/providers";


export const metadata: Metadata = {

title:"PrimeCart",

description:"Premium Shopping Experience"

};



export default function RootLayout({

children,

}:{

children:React.ReactNode;

}){


return (

<html lang="en" suppressHydrationWarning>

<body>

<Providers>

{children}

</Providers>

</body>

</html>

);


}
