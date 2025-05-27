import { Suspense } from "react";
import DashboardForumsTableUI from "./partials/DashboardForumsTableUI";

// import DashboardForumsUI from "./partials/DashboardForumsUI";

export const metadata = {
  title: "Newsletter | Teez",
  description: "Newsletter",
};

export default function DashboardForumsPage() {
  return (
    <Suspense>
      <DashboardForumsTableUI />
    </Suspense>
  );
}
