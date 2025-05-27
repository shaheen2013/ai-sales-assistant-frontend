import React, { Suspense } from "react";
import DashboardForumsTableUI from "./partials/DashboardForumsTableUI";

// import DashboardForumsUI from "./partials/DashboardForumsUI";

export const metadata = {
  title: "Newsletter | Teez",
  description: "Newsletter",
};

export default function DashboardForumsPage() {
  return (
    <div>
      <Suspense>
        <DashboardForumsTableUI />
      </Suspense>
    </div>
  );
}
