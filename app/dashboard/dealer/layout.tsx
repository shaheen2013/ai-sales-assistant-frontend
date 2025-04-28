import { SidebarProvider } from "@/components/shadcn/sidebar";
import DashboardHeader from "@/components/partials/dashboard/dashboard-header";
import { DashboardSidebar } from "@/components/partials/dashboard/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="w-full">
        <DashboardHeader />
        {/* <SidebarTrigger /> */}

        <div className="p-6">{children}</div>
      </main>
    </SidebarProvider>
  );
}
