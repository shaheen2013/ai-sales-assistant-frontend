"use client";

import { useSession } from "next-auth/react";
import DealerDashboardOverview from "../profile/DealerDashboardOverview";
import AdminDashboardOverview from "./_partials/admin/AdminDashboardOverview";

function DashboardOverview() {
  const { data: session } = useSession();

  if (session?.user?.user_type == "admin") {
    return <AdminDashboardOverview />;
  }

  return <DealerDashboardOverview />;
}

export default DashboardOverview;
