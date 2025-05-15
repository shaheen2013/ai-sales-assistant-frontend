import React, { Suspense } from "react";

import AdminDashboardDealerOverview from "./_partials/AdminDashboardDealerOverview";

export const metadata = {
  title: "Dealer Overview | Teez",
  description: "Dealer Overview",
};

const DealerOverviewPage = () => {
  return (
    <Suspense>
      <AdminDashboardDealerOverview />
    </Suspense>
  );
};

export default DealerOverviewPage;
