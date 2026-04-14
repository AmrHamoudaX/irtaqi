import { cache } from "react";
import prisma from "../prisma";
import { getAuthClaims} from "./session";

export const getDbUser = cache(async ()=> {
  const authClaims = await getAuthClaims()
  if(!authClaims) return null;


return await prisma.user.findUnique({
    where: {id: authClaims.sub}
  })
})
