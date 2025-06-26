"use client";

import { useSession } from "next-auth/react";
import AdminDashboardOverview from "./_partials/admin/AdminDashboardOverview";
import DealerDashboardOverview from "../profile/DealerDashboardOverview";

function DashboardOverview() {
  const { data: session } = useSession();

  if (session?.user?.user_type == "admin") {
    return <AdminDashboardOverview />;
  }

  return <DealerDashboardOverview />;
}

export default DashboardOverview;
