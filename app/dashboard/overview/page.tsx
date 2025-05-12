"use client";

import { useSession } from "next-auth/react";
import AdminDashboardOverview from "./_partials/admin/AdminDashboardOverview";
import DealerProfile from "./_partials/dealer/DealerProfile";


function DashboardOverview() {
  const { data: session } = useSession();

  return (
    <>
      {
        session?.user?.user_type === "admin" ? <AdminDashboardOverview /> : <DealerProfile />
      }
    </>
  );
}

export default DashboardOverview;
