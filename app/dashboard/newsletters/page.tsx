import { Suspense } from "react";
import NewsLetterSection from "./partials/newsletter-table/NewsLetterSection";

// import DashboardForumsUI from "./partials/DashboardForumsUI";

export const metadata = {
  title: "Newsletter | Teez",
  description: "Newsletter",
};

export default function DashboardForumsPage() {
  return (
    <Suspense>
      <NewsLetterSection />
    </Suspense>
  );
}
