import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Hero } from "@/components/hero";
import { getDbUser } from "@/lib/auth/db-user";
import UserProvider from "@/components/providers/user-provider";
import { Suspense } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userPromise = getDbUser();
  return (
    <main className="min-h-screen flex flex-col items-center mr-7.5">
      <UserProvider userPromise={userPromise}>
        <SidebarProvider>
          <Suspense>
            <AppSidebar />
          </Suspense>
          <SidebarTrigger />
          <SidebarInset>
            <Hero />
            <div className="flex-1 w-full flex flex-col gap-20 ">
              <div className="flex-1 flex flex-col gap-20 w-auto ">
                {children}
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </UserProvider>
    </main>
  );
}
