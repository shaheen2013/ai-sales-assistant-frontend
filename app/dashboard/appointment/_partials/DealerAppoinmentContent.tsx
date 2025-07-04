"use client";

import { useGetCurrentSubscriptionPlanQuery } from "@/features/dealer/dealerProfileSlice";
import AppointBookingSection from "./appointment-booking/AppointBookingSection";
import TalkToHumanSection from "./talk-to-human/TalkToHumanSection";
import TechnicalVisitSection from "./technical-visit/TechnicalVisitSection";

export default function DealerAppoinmentContent() {
  const { data } = useGetCurrentSubscriptionPlanQuery();

  return (
    <div className="grid grid-cols-12 gap-5 relative rounded-lg">
      <div className="xl:col-span-8 lg:col-span-7 col-span-12">
        <div className="space-y-5">
          <TalkToHumanSection />
          <TechnicalVisitSection />
        </div>
      </div>

      <div className="xl:col-span-4 lg:col-span-5 col-span-12">
        <AppointBookingSection />
      </div>

      {!data?.subscription && (
        <div className="absolute left-0 right-0 top-0 bottom-0 inset-0 z-50 backdrop-blur-sm">
          <div className="lg:h-[calc(100vh-70px)] h-[calc(100vh-70px)]  w-full flex flex-col justify-center items-center">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="49"
                height="49"
                viewBox="0 0 49 49"
                fill="none"
              >
                <path
                  d="M11 6.5C10.281 6.5 9.62538 6.91113 9.31222 7.55832L3.68722 19.1833C3.3708 19.8373 3.4606 20.6151 3.91768 21.1797L23.0427 44.8047C23.3987 45.2445 23.9342 45.5 24.5 45.5C25.0658 45.5 25.6014 45.2445 25.9574 44.8047L45.0824 21.1797C45.5394 20.6151 45.6292 19.8373 45.3128 19.1833L39.6878 7.55832C39.3747 6.91113 38.719 6.5 38 6.5H11ZM8.54669 17.75L12.1757 10.25H17.7075L15.3637 17.75H8.54669ZM9.00167 21.5H15.1486L19.4514 34.4085L9.00167 21.5ZM19.1014 21.5H29.8987L24.5001 37.6958L19.1014 21.5ZM33.8515 21.5H39.9984L29.5487 34.4084L33.8515 21.5ZM40.4533 17.75H33.6364L31.2926 10.25H36.8243L40.4533 17.75ZM29.7076 17.75H19.2926L21.6363 10.25H27.3638L29.7076 17.75Z"
                  fill="#019935"
                />
              </svg>
            </div>

            <h2 className="text-[#2b3545] lg:text-xl font-semibold mt-1 px-3 text-center">
              Select your perfect plan to unlock exclusive access!
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}
