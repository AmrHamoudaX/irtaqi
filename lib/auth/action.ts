"use server"

import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";

export async function logoutAction(){
    const supabase = await createClient()
    const {error} = await supabase.auth.signOut();
    if(error){
        console.error(error)
        return null
    }
    redirect('/auth/login')
}
