import { SidebarProvider, SidebarTrigger } from "@/components/shadcn/sidebar";
import { DashboardSidebar } from "@/components/partials/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
