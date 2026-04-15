"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  Dialog,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "@/components/ui/table";
import { Prisma } from "@/lib/generated/prisma/client";
import { Edit2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { updateUserAction } from "@/app/action/user-actions";
import { toast } from "sonner";

type Student = Prisma.UserGetPayload<{ include: { student: true } }>;
type Teacher = Prisma.UserGetPayload<{
  include: { teacher: { include: { classes: true } } };
}>;

interface UserManagementClientProps {
  students: Student[];
  teachers: Teacher[];
}

export function UserManagementClient({
  students,
  teachers,
}: UserManagementClientProps) {
  const [editingUser, setEditingUser] = useState<Student | Teacher | null>(
    null,
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const commonFields = [
    { id: "name", label: "Full Name", type: "text" },
    { id: "email", label: "Email Address", type: "email" },
    { id: "phone", label: "Phone Number", type: "tel" },
    {
      id: "gender",
      label: "Gender",
      component: "select",
      options: [
        { label: "Male", value: "MALE" },
        { label: "Female", value: "FEMALE" },
      ],
    },
    {
      id: "role",
      label: "Role",
      component: "select",
      options: [
        { label: "Student", value: "STUDENT" },
        { label: "Teacher", value: "TEACHER" },
      ],
    },
  ];

  const getRoleFields = (user: Student | Teacher) => {
    if ("student" in user) {
      return [
        {
          id: "currentJuz",
          label: "Current Juz",
          type: "number",
          path: "student",
        },
      ];
    }
    if ("teacher" in user) {
      return [];
    }
    return [];
  };

  const studentColumns = [
    { header: "Name", getValue: (s: Student) => s.name || "N/A" },
    { header: "Email", getValue: (s: Student) => s.email || "N/A" },
    { header: "Phone", getValue: (s: Student) => s.phone || "N/A" },
    { header: "Gender", getValue: (s: Student) => s.gender || "N/A" },
    { header: "Role", getValue: (s: Student) => s.role || "N/A" },
    {
      header: "Current Juz",
      getValue: (s: Student) => s.student?.currentJuz || "N/A",
    },
  ];

  const teacherColumns = [
    { header: "Name", getValue: (t: Teacher) => t.name || "N/A" },
    { header: "Email", getValue: (t: Teacher) => t.email || "N/A" },
    { header: "Phone", getValue: (t: Teacher) => t.phone || "N/A" },
    { header: "Gender", getValue: (t: Teacher) => t.gender || "N/A" },
    { header: "Role", getValue: (t: Teacher) => t.role || "N/A" },
  ];

  const renderTable = <T extends Student | Teacher>(
    title: string,
    data: T[],
    columns: { header: string; getValue: (item: T) => any }[],
  ) => (
    <div className="space-y-4 mb-8">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead className="text-center" key={col.header}>
                  {col.header}
                </TableHead>
              ))}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                {columns.map((col) => (
                  <TableCell className="text-center" key={col.header}>
                    {col.getValue(item)}
                  </TableCell>
                ))}
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Edit user"
                    onClick={() => {
                      setEditingUser(item);
                      setIsDialogOpen(true);
                    }}
                  >
                    <Edit2 className="h-4 w-4" />
                    <span className="sr-only"> Edit user </span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    if (!editingUser) return;

    try {
      const result = await updateUserAction(editingUser.id, editingUser);

      if (result.success) {
        toast.success("User updated successfully");
        setIsDialogOpen(false);
        setEditingUser(null);
      } else {
        toast.error(result.error || "Something went wrong");
      }
    } catch (error) {
      toast.error("A network error occurred");
      console.error("Failed to update user:", error);
    }
  }

  return (
    <div className="p-4">
      {renderTable("Students Management", students, studentColumns)}
      {renderTable("Teachers Management", teachers, teacherColumns)}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              Edit {editingUser?.role === "STUDENT" ? "Student" : "Teacher"}
            </DialogTitle>
            <DialogDescription>
              Make changes to users' profiles here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          {editingUser && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4">
                {commonFields.map((field) => (
                  <div key={field.id} className="space-y-2">
                    <Label htmlFor={field.id}>{field.label}</Label>
                    {field.component === "select" ? (
                      <select
                        id={field.id}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={(editingUser as any)[field.id] || ""}
                        onChange={(e) =>
                          setEditingUser({
                            ...editingUser,
                            [field.id]: e.target.value,
                          })
                        }
                      >
                        <option value=""> Select {field.label} </option>
                        {field.options?.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <Input
                        id={field.id}
                        type={field.type}
                        value={(editingUser as any)[field.id] || ""}
                        onChange={(e) =>
                          setEditingUser({
                            ...editingUser,
                            [field.id]: e.target.value,
                          })
                        }
                      />
                    )}
                  </div>
                ))}

                {/* Map through Role-Specific Fields (The Nested Data) */}
                {getRoleFields(editingUser).map((field) => (
                  <div key={field.id} className="space-y-2">
                    <Label htmlFor={field.id}>{field.label}</Label>
                    <Input
                      id={field.id}
                      type={field.type}
                      // Logic: editingUser['student']['currentJuz']
                      value={(editingUser as any)[field.path]?.[field.id] ?? ""}
                      onChange={(e) => {
                        const val =
                          field.type === "number"
                            ? e.target.value === ""
                              ? undefined
                              : Number(e.target.value)
                            : e.target.value;
                        setEditingUser({
                          ...editingUser,
                          [field.path]: {
                            ...(editingUser as any)[field.path],
                            [field.id]: val,
                          },
                        });
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
