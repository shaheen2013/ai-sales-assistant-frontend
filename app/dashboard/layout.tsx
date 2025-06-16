"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { SidebarProvider } from "@/components/shadcn/sidebar";
import { DashboardSidebar } from "@/components/partials/dashboard/dashboard-sidebar";

import Spinner from "@/components/spinner/Spinner";
import NewUserModal from "@/components/NewUserModal";
import DashboardHeader from "@/components/partials/dashboard/dashboard-header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";

  if (!isAuthenticated && !isLoading) {
    router.push(`/login`);
    return null;
  }

  return (
    <Suspense>
      <SidebarProvider>
        <DashboardSidebar />
        <main className="md:w-[calc(100%-257px)] w-full h-screen flex flex-col">
          <DashboardHeader />

          <div className="p-6 grow">
            {/* loading */}
            {isLoading ? (
              <div className="h-full flex justify-center items-center">
                <Spinner className="size-12" />
              </div>
            ) : (
              session?.access && children
            )}
          </div>
        </main>

        {/* additional modals information */}
        <NewUserModal />
      </SidebarProvider>
    </Suspense>
  );
}
