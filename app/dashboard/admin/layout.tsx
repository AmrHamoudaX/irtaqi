import { Suspense } from "react";
import { requireRole } from "@/lib/auth/guards";

async function Guard({ children }: { children: React.ReactNode }) {
  await requireRole("ADMIN");
  return <>{children}</>;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <Guard>{children}</Guard>
    </Suspense>
  );
}
