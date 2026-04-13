import { cache } from "react";
import { createClient } from "../supabase/server";

export const getAuthClaims = cache(async ()=> {
  const supabase = await createClient()
  const {data, error} = await supabase.auth.getClaims()

  if (error || !data?.claims) return null;

return data.claims
})

export const getUserId = cache(async ()=> {
  const claims = await getAuthClaims()
  return claims?.sub ?? null
})
