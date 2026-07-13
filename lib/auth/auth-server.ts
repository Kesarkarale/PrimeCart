import { createClient } from "@/lib/supabase/server";



// Get Server User

export async function getServerUser(){


const supabase = await createClient();


const {

data:{user}

}=await supabase.auth.getUser();



return user;


}




// Server Logout

export async function logout(){


const supabase = await createClient();


await supabase.auth.signOut();


}
