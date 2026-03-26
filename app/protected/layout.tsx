import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Hero } from "@/components/hero";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <SidebarInset>
          <Hero />
          <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
              {children}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
}
