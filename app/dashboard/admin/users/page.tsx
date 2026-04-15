import prisma from "@/lib/prisma";
import { Role } from "@/lib/generated/prisma/enums";
import { connection } from "next/server";
import { UserManagementClient } from "@/components/user-management-client";

export default async function UserManagementPage() {
  // Signals dynamic request to avoid the Date error
  await connection();

  const [students, teachers] = await Promise.all([
    prisma.user.findMany({
      where: { role: Role.STUDENT },
      include: { student: true },
    }),
    prisma.user.findMany({
      where: { role: Role.TEACHER },
      include: {
        teacher: { include: { classes: true } },
      },
    }),
  ]);

  return (
    <div className="p-6">
      <UserManagementClient students={students} teachers={teachers} />
    </div>
  );
}
