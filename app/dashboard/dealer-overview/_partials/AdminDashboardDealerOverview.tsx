"use client";

import moment from "moment";
import Image from "next/image";
import classNames from "classnames";
import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

import {
  Select,
  SelectItem,
  SelectValue,
  SelectGroup,
  SelectTrigger,
  SelectContent,
} from "@/components/shadcn/select";

import MapChart from "../_components/MapChart";
import Spinner from "@/components/spinner/Spinner";
import { getCountryLocation, getYears, isNegativeNumber } from "@/lib/utils";
import { Progress } from "@/components/shadcn/progress";
import { useGetDealerRegistrationCountQuery } from "@/features/dealer/dealerSlice";
import { useGetAdminDashboardDealerOverviewQuery } from "@/features/admin/adminDashboardSlice";
import DashboardDealerOverviewChart from "@/components/partials/dashboard/dashboard-dealer-overview-chart";
import DashboardDealerOverviewPieChart from "@/components/partials/dashboard/dashboard-dealer-overview-pie-chart";

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

  const progressColors = [
    {
      color: "#2196F3",
      bgColor: "#C2E4FF",
    },
    {
      color: "#FFB056",
      bgColor: "#FFE0C2",
    },
    {
      color: "#654CE6",
      bgColor: "#CCC0FC",
    },
    {
      color: "#13C56B",
      bgColor: "#c0fde0",
    },
    {
      color: "#ED5E5E",
      bgColor: "#fcc0c0",
    },

    {
      color: "#6A1B9A",
      bgColor: "#E1BEE7",
    },

    {
      color: "#F57C00",
      bgColor: "#FFF3E0",
    },
    {
      color: "#0288D1",
      bgColor: "#E3F2FD",
    },
    {
      color: "#388E3C",
      bgColor: "#E8F5E9",
    },
  ];

  const chartData = data?.country?.map((item: any) => ({
    country: item.country,
    lon: getCountryLocation(item.country)?.longitude || "",
    lat: getCountryLocation(item.country)?.latitude || "",
    percentage: item.percentage,
    bgColor:
      progressColors[item.country.length % progressColors.length]?.bgColor,
    color: progressColors[item.country.length % progressColors.length]?.color,
    gradientId: `grad${item.country.replace(/\s+/g, "")}`,
  }));

  if (isLoading) {
    return (
      <div className="h-full flex justify-center items-center">
        <Spinner className="size-12" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-5">
      {/* left */}
      <div className="lg:col-span-8 col-span-12 pt-2">
        <h2 className="text-xl font-semibold text-gray-400 mb-1">
          Dealer Acquisition Overview
        </h2>

        <h4 className="text-sm text-[#707070] mb-4">
          Track and analyze how dealers are joining your platform, identify top
          acquisition sources, and measure growth over time.
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
              <MapChart data={chartData} />
            </div>

            {/* right */}
            <div className="xl:w-[300px] mx-auto w-full">
              <h3 className="text-display-md font-semibold mb-5">
                {totalActiveUser}
              </h3>

              {chartData?.map((item, index) => (
                <div className="mb-3" key={index}>
                  <div className="text-gray-700 font-medium text-sm mb-2">
                    {item?.country || "N/A"}
                  </div>

                  <div className="flex items-center gap-2">
                    <Progress
                      value={item?.percentage}
                      className="h-[10px]"
                      progressColor={item?.color}
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
                className={classNames({
                  "rotate-180": isNegativeNumber(
                    data?.dealer_statistics?.total_dealers?.growth
                  ),
                })}
              >
                <path
                  className={classNames({
                    "stroke-red-500": isNegativeNumber(
                      data?.dealer_statistics?.total_dealers?.growth
                    ),
                    "stroke-green-500": !isNegativeNumber(
                      data?.dealer_statistics?.total_dealers?.growth
                    ),
                  })}
                  d="M6 10V3M6 3L2.5 6.5M6 3L9.5 6.5"
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
                className={classNames({
                  "rotate-180": isNegativeNumber(
                    data?.dealer_statistics?.paid_dealers?.growth
                  ),
                })}
              >
                <path
                  d="M6 10V3M6 3L2.5 6.5M6 3L9.5 6.5"
                  className={classNames({
                    "stroke-red-500": isNegativeNumber(
                      data?.dealer_statistics?.paid_dealers?.growth
                    ),
                    "stroke-green-600": !isNegativeNumber(
                      data?.dealer_statistics?.paid_dealers?.growth
                    ),
                  })}
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
                className={classNames({
                  "rotate-180": isNegativeNumber(
                    data?.dealer_statistics?.paid_conversion_rate?.growth
                  ),
                })}
              >
                <path
                  d="M6 10V3M6 3L2.5 6.5M6 3L9.5 6.5"
                  className={classNames({
                    "stroke-red-500": isNegativeNumber(
                      data?.dealer_statistics?.paid_conversion_rate?.growth
                    ),
                    "stroke-green-600": !isNegativeNumber(
                      data?.dealer_statistics?.paid_conversion_rate?.growth
                    ),
                  })}
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
                  <div className="flex items-center">
                    {dealer?.image ? (
                      <Image
                        src={dealer?.image || "https://dummyimage.com/36x36"}
                        alt="avatar"
                        width={36}
                        height={36}
                        className="rounded-full h-9 w-9"
                      />
                    ) : (
                      <svg
                        width="36"
                        height="36"
                        viewBox="0 0 26 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13 0C10.4738 0.0047955 8.00356 0.743473 5.89009 2.12606C3.77663 3.50864 2.11118 5.47546 1.09661 7.78695C0.082046 10.0984 -0.237855 12.6548 0.175876 15.1447C0.589607 17.6346 1.71911 19.9506 3.42682 21.8105C4.64648 23.1315 6.12677 24.1857 7.77439 24.9067C9.42202 25.6278 11.2013 26 13 26C14.7987 26 16.578 25.6278 18.2256 24.9067C19.8732 24.1857 21.3535 23.1315 22.5732 21.8105C24.2809 19.9506 25.4104 17.6346 25.8241 15.1447C26.2379 12.6548 25.918 10.0984 24.9034 7.78695C23.8888 5.47546 22.2234 3.50864 20.1099 2.12606C17.9964 0.743473 15.5262 0.0047955 13 0ZM13 23.4242C10.3019 23.4201 7.71054 22.3705 5.77127 20.4962C6.36004 19.0641 7.36163 17.8392 8.64876 16.9772C9.93589 16.1152 11.4505 15.6549 13 15.6549C14.5495 15.6549 16.0641 16.1152 17.3512 16.9772C18.6384 17.8392 19.64 19.0641 20.2287 20.4962C18.2895 22.3705 15.6981 23.4201 13 23.4242ZM10.3951 10.4108C10.3951 9.896 10.5478 9.39279 10.8341 8.96478C11.1203 8.53677 11.5271 8.20318 12.0031 8.00619C12.4791 7.8092 13.0029 7.75766 13.5082 7.85808C14.0135 7.95851 14.4777 8.20639 14.842 8.57038C15.2063 8.93437 15.4544 9.39813 15.5549 9.903C15.6554 10.4079 15.6038 10.9312 15.4067 11.4068C15.2095 11.8823 14.8756 12.2888 14.4472 12.5748C14.0188 12.8608 13.5152 13.0135 13 13.0135C12.3091 13.0135 11.6465 12.7392 11.158 12.2511C10.6695 11.763 10.3951 11.101 10.3951 10.4108ZM22.0001 18.2188C20.8364 16.2301 19.0453 14.6831 16.9074 13.8203C17.5706 13.069 18.0027 12.1424 18.1519 11.1518C18.3011 10.1612 18.161 9.1486 17.7485 8.23556C17.336 7.32251 16.6685 6.54779 15.8262 6.00436C14.984 5.46093 14.0026 5.17187 13 5.17187C11.9974 5.17187 11.016 5.46093 10.1738 6.00436C9.33147 6.54779 8.66403 7.32251 8.2515 8.23556C7.83898 9.1486 7.69891 10.1612 7.8481 11.1518C7.99729 12.1424 8.4294 13.069 9.09258 13.8203C6.9547 14.6831 5.16362 16.2301 3.99991 18.2188C3.07247 16.6404 2.58245 14.8437 2.58021 13.0135C2.58021 10.2523 3.67801 7.60433 5.6321 5.65193C7.58618 3.69954 10.2365 2.60269 13 2.60269C15.7635 2.60269 18.4138 3.69954 20.3679 5.65193C22.322 7.60433 23.4198 10.2523 23.4198 13.0135C23.4176 14.8437 22.9275 16.6404 22.0001 18.2188Z"
                          fill="#019935"
                        ></path>
                      </svg>
                    )}
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
  );
}

export default AdminDashboardDealerOverview;
