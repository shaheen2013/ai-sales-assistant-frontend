import React from "react";
import TalkToHumanSection from "./_partials/talk-to-human/TalkToHumanSection";
import TechnicalVisitSection from "./_partials/technical-visit/TechnicalVisitSection";
import AppointBookingSection from "./_partials/appointment-booking/AppointBookingSection";

export const metadata = {
  title: "Appointment Booking | Teez",
  description: "Dealer Overview",
};

export default function DealerAppoinment() {
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="lg:col-span-9 col-span-12">

        <div className="space-y-5">
          <TalkToHumanSection />
          <TechnicalVisitSection />
        </div>
      </div>
      <div className="lg:col-span-3 col-span-12">
          <AppointBookingSection />
      </div>
    </div>
  );
}
