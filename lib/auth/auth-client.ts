"use client";


import { createClient } from "@/lib/supabase/client";



// Register User

export async function signUpUser(
email:string,
password:string,
name:string
){

const supabase=createClient();


const {
data,
error
}=await supabase.auth.signUp({

email,

password,

options:{

data:{

name

}

}

});


return {

data,

error

};

}





// Login User

export async function signInUser(

email:string,

password:string

){

const supabase=createClient();


const {

data,

error

}=await supabase.auth.signInWithPassword({

email,

password

});


return {

data,

error

};


}





// Google Login

export async function signInWithGoogle(){


const supabase=createClient();


return await supabase.auth.signInWithOAuth({

provider:"google",

options:{

redirectTo:

`${window.location.origin}/auth/callback`

}

});


}





// Github Login

export async function signInWithGithub(){


const supabase=createClient();


return await supabase.auth.signInWithOAuth({

provider:"github",

options:{

redirectTo:

`${window.location.origin}/auth/callback`

}

});


}





// Forgot Password

export async function resetPasswordRequest(

email:string

){


const supabase=createClient();


const {

error

}=await supabase.auth.resetPasswordForEmail(

email,

{

redirectTo:

`${window.location.origin}/reset-password`

}

);


return {

error

};


}





// Update Password

export async function updatePassword(

password:string

){


const supabase=createClient();


const {

error

}=await supabase.auth.updateUser({

password

});


return {

error

};


}





// Logout

export async function signOutUser(){


const supabase=createClient();


return await supabase.auth.signOut();


}





// Current User

export async function getCurrentUser(){


const supabase=createClient();


const {

data

}=await supabase.auth.getUser();


return data.user;


}
