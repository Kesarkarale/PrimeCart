import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";


export async function middleware(
request: NextRequest
){

let response = NextResponse.next({

request,

});


const supabase =
createServerClient(

process.env.NEXT_PUBLIC_SUPABASE_URL!,

process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,

{

cookies:{

getAll(){

return request.cookies.getAll();

},


setAll(cookies){

cookies.forEach(
({name,value})=>
request.cookies.set(
name,
value
)
);


response =
NextResponse.next({

request

});


cookies.forEach(
({name,value,options})=>
response.cookies.set(
name,
value,
options
)
);

}

}

}

);



const {
data:{session}

}= await supabase.auth.getSession();



const protectedRoutes=[

"/dashboard",

"/profile",

"/orders",

"/checkout"

];


const isProtected =
protectedRoutes.some(
(route)=>
request.nextUrl.pathname.startsWith(route)
);



if(
isProtected &&
!session
){

return NextResponse.redirect(

new URL(
"/login",
request.url
)

);

}



return response;

}



export const config={

matcher:[

"/dashboard/:path*",

"/profile/:path*",

"/orders/:path*",

"/checkout/:path*"

]

};
