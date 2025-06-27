"use client";

import Image from "next/image";
import { Progress } from "@/components/shadcn/progress";
import DashboardDealerOverviewChart from "@/components/partials/dashboard/dashboard-dealer-overview-chart";
import DashboardDealerOverviewPieChart from "@/components/partials/dashboard/dashboard-dealer-overview-pie-chart";
import { useGetAdminDashboardDealerOverviewQuery } from "@/features/admin/adminDashboardSlice";
import Spinner from "@/components/spinner/Spinner";
import MapChart from "../_components/MapChart";
import moment from "moment";
import { useMemo, useState } from "react";
import { useGetDealerRegistrationCountQuery } from "@/features/dealer/dealerSlice";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";
import { ChevronDown } from "lucide-react";
import { getYears } from "@/lib/utils";

const progressColors = ["#2196F3", "#FFB056", "#654CE6", "#13C56B", "#ED5E5E"];

function AdminDashboardDealerOverview() {
  /*--React State--*/
  const [year, setYear] = useState(String(moment().year()));

  /*--RTK Query--*/
  const { data, isLoading } = useGetAdminDashboardDealerOverviewQuery();
  const { data: dealerRegistrationCount } = useGetDealerRegistrationCountQuery({
    year,
  });

  const totalActiveUser = useMemo(
    () => data?.country?.reduce((acc, curr) => acc + curr.count, 0),
    [data?.country]
  );
  const totalOrganicUser = useMemo(
    () =>
      dealerRegistrationCount?.counts?.reduce(
        (acc, curr) => acc + curr.organic,
        0
      ),
    [dealerRegistrationCount?.counts]
  );
  const totalAiUser = useMemo(
    () =>
      dealerRegistrationCount?.counts?.reduce(
        (acc, curr) => acc + curr.by_ai,
        0
      ),
    [dealerRegistrationCount?.counts]
  );

  return (
    <>
      {isLoading ? (
        <div className="h-full flex justify-center items-center">
          <Spinner className="size-12" />
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-5">
          {/* left */}
          <div className="lg:col-span-8 col-span-12 pt-2">
            <h2 className="text-xl font-semibold text-gray-400 mb-1">
              Dealer Acquisition Overview
            </h2>

            <h4 className="text-sm text-[#707070] mb-4">
              Track and analyze how dealers are joining your platform, identify
              top acquisition sources, and measure growth over time.
            </h4>

            {/* dealers chart section */}
            <div className="border rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-[#181D27] text-sm font-semibold mb-1">
                    How Dealers Were Acquired
                  </h4>

                  <p className="text-xs text-gray-300 font-medium">
                    A visual breakdown of dealer signups by source — referrals,
                    direct signups, sales team, etc.
                  </p>
                </div>
                <Select
                  value={year}
                  onValueChange={setYear}
                  defaultValue={String(moment().year())}
                >
                  <SelectTrigger className="max-w-fit [&>svg]:hidden [&>span]:pointer-events-auto [&>span]:text-primary-500 [&>span]:text-sm [&>span]:font-medium gap-1.5">
                    <SelectValue placeholder="All Subscribers" />
                    <div>
                      <ChevronDown className="size-5 text-primary-500" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {getYears().map((year) => (
                        <SelectItem key={year} value={String(year)}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <hr className="mb-4" />

              {/* charts */}
              <div className="xl:flex-row flex-col-reverse flex overflow-x-auto">
                {/* left */}
                <div className="flex-1">
                  <DashboardDealerOverviewChart
                    data={dealerRegistrationCount?.counts || []}
                  />
                </div>

                {/* right */}
                <div className="col-span-4 lg:w-[280px] mx-auto w-full">
                  <DashboardDealerOverviewPieChart
                    data={[
                      {
                        name: "organic",
                        visitors: totalOrganicUser || 0,
                        fill: "#34AD5D",
                      },
                      {
                        name: "byAi",
                        visitors: totalAiUser || 0,
                        fill: "#55BB78",
                      },
                    ]}
                  />
                </div>
              </div>
            </div>

            {/* active users */}
            <h2 className="text-xl font-semibold text-gray-400 mb-1">
              Active users
            </h2>

            {/* <h4 className="text-sm text-[#707070] mb-4">
              Real-time view of dealer activity — test drive bookings, live
              calls, and customer interactions powered by AI.
            </h4> */}

            <div className="border rounded-lg p-4 mb-4">
              <div>
                <h4 className="text-[#181D27] text-sm font-semibold mb-1">
                  Active users right now
                </h4>

                <p className="text-xs text-gray-300 font-medium mb-4">
                  Real-time view of dealer activity — test drive bookings, live
                  calls, and customer interactions powered by AI.
                </p>
              </div>
              <hr className="mb-4" />

              {/* charts */}
              <div className="xl:flex-row flex-col flex overflow-x-auto">
                {/* left */}
                <div className="flex-1">
                  <MapChart />
                </div>

                {/* right */}
                <div className="xl:w-[300px] mx-auto w-full">
                  <h3 className="text-display-md font-semibold mb-5">
                    {totalActiveUser}
                  </h3>

                  {data?.country?.map((item, index) => (
                    <div className="mb-3" key={index}>
                      <div className="text-gray-700 font-medium text-sm mb-2">
                        {item?.country || "N/A"}
                      </div>

                      <div className="flex items-center gap-2">
                        <Progress
                          value={item?.percentage}
                          className="h-[10px]"
                          progressColor={progressColors[index % 5]}
                        />{" "}
                        <span className="text-gray-700 text-sm font-medium">
                          {item?.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
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
                <span className="text-gray-400 font-semibold text-3xl">
                  {data?.dealer_statistics?.total_dealers?.count}
                </span>

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

                  <span className="text-[#414651] text-sm font-medium">
                    {data?.dealer_statistics?.total_dealers?.growth}%
                  </span>
                </span>
              </div>

              <h3 className="mb-2 text-[#535862] font-medium text-sm ">
                Paid Dealers
              </h3>

              <div className="flex items-center mb-5 gap-4">
                <span className="text-gray-400 font-semibold text-3xl">
                  {data?.dealer_statistics?.paid_dealers?.count}
                </span>

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

                  <span className="text-[#414651] text-sm font-medium">
                    {data?.dealer_statistics?.paid_dealers?.growth}%
                  </span>
                </span>
              </div>

              <h3 className="mb-2 text-[#535862] font-medium text-sm ">
                Paid Conversion Rate
              </h3>

              <div className="flex items-center gap-4">
                <span className="text-gray-400 font-semibold text-3xl">
                  {data?.dealer_statistics?.paid_conversion_rate?.count}
                </span>

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

                  <span className="text-[#414651] text-sm font-medium">
                    {data?.dealer_statistics?.paid_conversion_rate?.growth}%
                  </span>
                </span>
              </div>
            </div>

            {/* top dealers */}
            <div className="border p-4 rounded-xl mb-5">
              <h3 className="mb-6 text-[#535862] font-medium text-sm ">
                Top Dealers
              </h3>

              <div>
                {data?.top_dealer?.map((dealer, index) => {
                  return (
                    <div className="flex mb-6 last:mb-0 gap-2" key={index}>
                      {/* <div className="flex items-center">
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
                      </div> */}

                      <div className="flex items-center">
                        <Image
                          src={dealer?.image || "https://dummyimage.com/36x36"}
                          alt="avatar"
                          width={36}
                          height={36}
                          className="rounded-full h-9 w-9"
                        />
                      </div>

                      <div>
                        <div className="text-[#414651 font-medium text-sm">
                          {dealer?.business_name || "N/A"}
                        </div>

                        <div className="text-xs text-[#535862] font-normal">
                          Member since
                          <span className="font-medium text-[#535862] ml-1">
                            {moment(dealer?.created_at).format("MMM YYYY")}
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
      )}
    </>
  );
}

export default AdminDashboardDealerOverview;
