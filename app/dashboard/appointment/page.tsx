import { Suspense } from "react";

import DealerAppoinmentContent from "./_partials/DealerAppoinmentContent";

export const metadata = {
  title: "Appointment Booking | Teez",
  description: "Dealer Overview",
};

export default function DealerAppoinment() {
  return (
    <Suspense>
      <DealerAppoinmentContent />
    </Suspense>
  );
}
