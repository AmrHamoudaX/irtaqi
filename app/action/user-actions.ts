"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Gender } from "@/lib/generated/prisma/client";
import { getDbUser } from "@/lib/auth/db-user";

export async function updateUserAction(userId: string, data: any) {
  try {

    const currentUser = await getDbUser();
    if (!currentUser || currentUser.role !== "ADMIN") {
      return { success: false, error: "Unauthorized" };
    }

    const { name, email, phone, gender, role, student, teacher } = data;

    await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
        phone,
        role,
        gender: gender as Gender,
        // Nested update for Student data
        ...(role === "STUDENT" && student ? {
          student: {
            update: {
              currentJuz: Number(student.currentJuz),
            }
          }
        } : {}),
        // Nested update for Teacher data
        ...(role === "TEACHER" && teacher ? {
          teacher: {
            update: {
              // Add teacher-specific fields here if they exist in schema
            }
          }
        } : {}),
      },
    });
    // Purge the Next.js Data Cache for this route.
    // This ensures the UI reflects the DB changes immediately without a manual page reload.
    revalidatePath("/dashboard/admin/users");
    return { success: true };
  } catch (error) {
    console.error("Database Update Error:", error);
    return { success: false, error: "Failed to update user" };
  }
}
