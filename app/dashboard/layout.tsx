import DashboardHeader from "@/components/partials/dashboard/dashboard-header";
import { DashboardSidebar } from "@/components/partials/dashboard/dashboard-sidebar";
import { SidebarProvider } from "@/components/shadcn/sidebar";

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
