"use client";

import { useSession } from "next-auth/react";
// import { useSearchParams } from "next/navigation";

import { SidebarProvider } from "@/components/shadcn/sidebar";
import { DashboardSidebar } from "@/components/partials/dashboard/dashboard-sidebar";

import Spinner from "@/components/spinner/Spinner";
import NewUserModal from "@/components/NewUserModal";
import DashboardHeader from "@/components/partials/dashboard/dashboard-header";
import { Suspense } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  // const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  // const newuser = searchParams.get("newuser");

  const isLoading = status === "loading";
  // const isAuthenticated = status === "authenticated";

  // if (!isDealer && !isAuthenticated && !isLoading) {
  //   router.push(`/login`);
  //   return null;
  // }

  return (
    <Suspense>
      <SidebarProvider>
        <DashboardSidebar />
        <main className="w-full h-screen flex flex-col">
          <DashboardHeader />

          <div className="p-6 grow">
            {/* loading */}
            {isLoading && (
              <div className="h-full flex justify-center items-center">
                <Spinner className="size-12" />
              </div>
            )}

            {/* content */}
            {/* {!isLoading && isAuthenticated && children} */}
            {session?.access && children}
          </div>
        </main>

        {/* additional modals information */}
        <NewUserModal />
      </SidebarProvider>
    </Suspense>
  );
}
