"use client";

import { useSession } from "next-auth/react";
import AdminDashboardOverview from "./_partials/admin/AdminDashboardOverview";
import DealerDashboardOverview from "../profile/DealerDashboardOverview";

function DashboardOverview() {
  const { data: session } = useSession();

  return (
    <>
      {session?.user?.user_type === "admin" ? (
        <AdminDashboardOverview />
      ) : (
        <DealerDashboardOverview />
      )}
    </>
  );
}

export default DashboardOverview;
