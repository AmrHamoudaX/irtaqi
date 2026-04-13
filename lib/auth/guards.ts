import { redirect } from "next/navigation";
import { getDbUser } from "./db-user"

type Role = "STUDENT" | "TEACHER" | "ADMIN"

export async function requireRole(role:Role){
  const user = await getDbUser();

  if(!user) redirect("/auth/login")

  if(user.role !== role) redirect(`/dashboard/${user.role.toLowerCase()}`)

  return user;
}
