import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Hero } from "@/components/hero";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center mr-7.5">
      <SidebarProvider>
        <AppSidebar />
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
    </main>
  );
}
