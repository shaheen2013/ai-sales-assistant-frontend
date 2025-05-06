"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { SidebarProvider } from "@/components/shadcn/sidebar";
import DashboardHeader from "@/components/partials/dashboard/dashboard-header";
import { DashboardSidebar } from "@/components/partials/dashboard/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { data: session, status } = useSession();

  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";
  const isUser = session?.user?.user_type == "user";

  if (!isUser && !isAuthenticated && !isLoading) {
    router.push(`/user/login`);
    return null;
  }

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
