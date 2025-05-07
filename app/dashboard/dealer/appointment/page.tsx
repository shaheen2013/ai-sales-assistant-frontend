import React from "react";
import TalkToHumanSection from "./_partials/talk-to-human/TalkToHumanSection";

export const metadata = {
  title: "Team Management | Teez",
  description: "Dealer Overview",
};

export default function DealerAppoinment() {
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="lg:col-span-8 col-span-12">
        <h4 className="text-gray-400 text-xl font-semibold">Chat & Talk Appointment</h4>
        <div className="text-gray-300 text-sm font-normal mt-1">Automatically generated customer list based on AI-driven chats and calls for seamless follow-ups.</div>

        <TalkToHumanSection />
      </div>
      <div className="lg:col-span-4 col-span-12">

      </div>
    </div>
  );
}
