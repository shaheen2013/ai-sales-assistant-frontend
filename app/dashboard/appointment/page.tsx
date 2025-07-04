import { Suspense } from "react";
import TalkToHumanSection from "./_partials/talk-to-human/TalkToHumanSection";
import TechnicalVisitSection from "./_partials/technical-visit/TechnicalVisitSection";
import AppointBookingSection from "./_partials/appointment-booking/AppointBookingSection";

export const metadata = {
  title: "Appointment Booking | Teez",
  description: "Dealer Overview",
};

export default function DealerAppoinment() {
  return (
    <Suspense>
      <div className="grid grid-cols-12 gap-5 relative">
        <div className="lg:col-span-8 col-span-12">
          <div className="space-y-5">
            <TalkToHumanSection />
            <TechnicalVisitSection />
          </div>
        </div>
        <div className="lg:col-span-4 col-span-12">
          <AppointBookingSection />
        </div>

        {/* overlay */}
        <div className="absolute left-0 right-0 top-0 bottom-0 inset-0 z-50 backdrop-blur-sm"></div>
      </div>
    </Suspense>
  );
}
