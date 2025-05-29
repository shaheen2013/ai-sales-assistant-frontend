import { Suspense } from "react";

import AdminDashboardOverview from "./partials/AdminDashboardOverview";

export default function page() {
  return (
    <Suspense>
      <AdminDashboardOverview />
    </Suspense>
  );
}
