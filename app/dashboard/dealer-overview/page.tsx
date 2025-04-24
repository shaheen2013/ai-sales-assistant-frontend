import React from "react";
import Image from "next/image";

import withAuth from "@/hooks/useAuth";
import { Progress } from "@/components/shadcn/progress";
import DashboardDealerOverviewChart from "@/components/partials/dashboard/dashboard-dealer-overview-chart";
import DashboardDealerOverviewPieChart from "@/components/partials/dashboard/dashboard-dealer-overview-pie-chart";

export const metadata = {
  title: "Dealer Overview | Teez",
  description: "Dealer Overview",
};

function DashboardDealerOverview() {
  return (
    <div className="grid grid-cols-12 gap-5">
      {/* left */}
      <div className="lg:col-span-8 col-span-12 pt-2">
        <h2 className="text-xl font-semibold text-gray-400 mb-1">
          Dealers Accusation
        </h2>

        <h4 className="text-sm text-[#707070] mb-4">
          Track and analyze user accusations to identify sources and ensure fair
          resolution.
        </h4>

        {/* dealers chart section */}
        <div className="border rounded-lg p-4 mb-4">
          <h4 className="text-[#181D27] text-sm font-semibold mb-4">
            How do you acquire Dealers?
          </h4>
          <hr className="mb-4" />

          {/* charts */}
          <div className="xl:flex-row flex-col-reverse flex overflow-x-auto">
            {/* left */}
            <div className="flex-1">
              <DashboardDealerOverviewChart />
            </div>

            {/* right */}
            <div className="col-span-4 lg:w-[280px] mx-auto w-full">
              <DashboardDealerOverviewPieChart />
            </div>
          </div>
        </div>

        {/* active users */}
        <h2 className="text-xl font-semibold text-gray-400 mb-1">
          Active users
        </h2>

        <h4 className="text-sm text-[#707070] mb-4">
          AI-generated list of test drive appointments based on customer
          interactions for seamless scheduling.
        </h4>

        <div className="border rounded-lg p-4 mb-4">
          <h4 className="text-[#181D27] text-sm font-semibold mb-4">
            Active users right now
          </h4>
          <hr className="mb-4" />

          {/* charts */}
          <div className="xl:flex-row flex-col flex overflow-x-auto">
            {/* left */}
            <div className="flex-1">map coming soon</div>

            {/* right */}
            <div className="xl:w-[300px] mx-auto w-full">
              <h3 className="text-display-md font-semibold mb-5">10.8k</h3>

              <div className="mb-3">
                <div className="text-gray-700 font-medium text-sm mb-2">
                  United States
                </div>

                <div className="flex items-center gap-2">
                  <Progress
                    value={50}
                    className="h-[10px]"
                    progressColor="#2196F3"
                  />{" "}
                  <span className="text-gray-700 text-sm font-medium">50%</span>
                </div>
              </div>

              <div className="mb-3">
                <div className="text-gray-700 font-medium text-sm mb-2">
                  Canada
                </div>

                <div className="flex items-center gap-2">
                  <Progress
                    value={50}
                    className="h-[10px]"
                    progressColor="#FFB056"
                  />{" "}
                  <span className="text-gray-700 text-sm font-medium">50%</span>
                </div>
              </div>

              <div className="mb-3">
                <div className="text-gray-700 font-medium text-sm mb-2">UK</div>

                <div className="flex items-center gap-2">
                  <Progress
                    value={50}
                    className="h-[10px]"
                    progressColor="#654CE6"
                  />{" "}
                  <span className="text-gray-700 text-sm font-medium">50%</span>
                </div>
              </div>

              <div className="mb-3">
                <div className="text-gray-700 font-medium text-sm mb-2">
                  Germany
                </div>

                <div className="flex items-center gap-2">
                  <Progress
                    value={50}
                    className="h-[10px]"
                    progressColor="#13C56B"
                  />{" "}
                  <span className="text-gray-700 text-sm font-medium">50%</span>
                </div>
              </div>

              <div className="mb-3">
                <div className="text-gray-700 font-medium text-sm mb-2">
                  Bangladesh
                </div>

                <div className="flex items-center gap-2">
                  <Progress
                    value={50}
                    className="h-[10px]"
                    progressColor="#ED5E5E"
                  />{" "}
                  <span className="text-gray-700 text-sm font-medium">50%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* right */}
      <div className="lg:col-span-4 col-span-12">
        {/* conversions */}
        <div className="border p-4 rounded-xl mb-5 ">
          <h3 className="mb-2 text-[#535862] font-medium text-sm ">
            Total Dealers
          </h3>

          <div className="flex items-center mb-5 gap-4">
            <span className="text-gray-400 font-semibold text-3xl">4,862</span>

            {/* badge  */}
            <span className="flex border items-center rounded-lg shadow px-2 py-1 gap-1">
              <svg
                width="16"
                height="16"
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 10V3M6 3L2.5 6.5M6 3L9.5 6.5"
                  stroke="#079455"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="text-[#414651] text-sm font-medium">9.2%</span>
            </span>
          </div>

          <h3 className="mb-2 text-[#535862] font-medium text-sm ">
            Paid Dealers
          </h3>

          <div className="flex items-center mb-5 gap-4">
            <span className="text-gray-400 font-semibold text-3xl">4,862</span>

            {/* badge  */}
            <span className="flex border items-center rounded-lg shadow px-2 py-1 gap-1">
              <svg
                width="16"
                height="16"
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 10V3M6 3L2.5 6.5M6 3L9.5 6.5"
                  stroke="#079455"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="text-[#414651] text-sm font-medium">9.2%</span>
            </span>
          </div>

          <h3 className="mb-2 text-[#535862] font-medium text-sm ">
            Paid Conversion Rate
          </h3>

          <div className="flex items-center gap-4">
            <span className="text-gray-400 font-semibold text-3xl">4,862</span>

            {/* badge  */}
            <span className="flex border items-center rounded-lg shadow px-2 py-1 gap-1">
              <svg
                width="16"
                height="16"
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 10V3M6 3L2.5 6.5M6 3L9.5 6.5"
                  stroke="#079455"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="text-[#414651] text-sm font-medium">9.2%</span>
            </span>
          </div>
        </div>

        {/* top dealers */}
        <div className="border p-4 rounded-xl mb-5">
          <h3 className="mb-6 text-[#535862] font-medium text-sm ">
            Total Dealers
          </h3>

          <div>
            {Array.from({ length: 5 }).map((_, index) => {
              return (
                <div className="flex mb-6 last:mb-0 gap-2" key={index}>
                  <div className="flex items-center">
                    <svg
                      width="12"
                      height="13"
                      viewBox="0 0 12 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 10V3M6 3L2.5 6.5M6 3L9.5 6.5"
                        stroke="#10A760"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <div className="flex items-center">
                    <Image
                      src="https://dummyimage.com/36x36"
                      alt="avatar"
                      width={36}
                      height={36}
                      className="rounded-full h-9 w-9"
                    />
                  </div>

                  <div>
                    <div className="text-[#414651 font-medium text-sm">
                      John Doe
                      <span className="font-normal text-xs ml-1">Just now</span>
                    </div>

                    <div className="text-xs text-[#535862] font-normal">
                      Member since
                      <span className="font-medium text-[#535862] ml-1">
                        Feb 2025
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {Array.from({ length: 5 }).map((_, index) => {
              return (
                <div className="flex mb-6 last:mb-0 gap-2" key={index}>
                  <div className="flex items-center">
                    <svg
                      width="12"
                      height="13"
                      viewBox="0 0 12 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 3L6 10M6 10L9.5 6.5M6 10L2.5 6.5"
                        stroke="#D92D21"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <div className="flex items-center">
                    <Image
                      src="https://dummyimage.com/36x36"
                      alt="avatar"
                      width={36}
                      height={36}
                      className="rounded-full h-9 w-9"
                    />
                  </div>

                  <div>
                    <div className="text-[#414651 font-medium text-sm">
                      John Doe
                      <span className="font-normal text-xs ml-1">Just now</span>
                    </div>

                    <div className="text-xs text-[#535862] font-normal">
                      Member since
                      <span className="font-medium text-[#535862] ml-1">
                        Feb 2025
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardDealerOverview;
