import { cache } from "react";
import { createClient } from "../supabase/server";

export const getAuthClaims = cache(async ()=> {
  const supabase = await createClient();

  try{
  const {data , error} = await supabase.auth.getClaims();

  if (error) {
    if(error?.status === 401 ) return null;

  console.error("Supabase Auth Error: ", error.message)
    return null;
  }

    if(!data?.claims) return null

return data.claims
} catch(e) {
    console.error("Unexpected Auth Crash: ", e);
  return null;
  }
})
