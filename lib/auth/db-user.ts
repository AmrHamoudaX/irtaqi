import { cache } from "react";
import prisma from "../prisma";
import { getUserId } from "./session";

export const getDbUser = cache(async ()=> {
  const userId = await getUserId()
  if (!userId) return null

return prisma.user.findUnique({
    where: {id: userId}
  })
})
