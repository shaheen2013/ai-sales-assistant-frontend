"use client";

import React from "react";
import classNames from "classnames";

import { isNegativeNumber } from "@/lib/utils";
import { useGetDealerStatisticsQuery } from "@/features/dealer/dealerSlice";

const DealerStatistics = () => {
  /*--RTK Query--*/
  const { data: dealerStatistics } = useGetDealerStatisticsQuery();

  return (
    <div>
      {/* conversions */}
      <div className="border p-4 rounded-xl mb-5 ">
        <h3 className="mb-2 text-[#535862] font-medium text-sm ">
          Total Dealers
        </h3>

        <div className="flex items-center mb-5 gap-4">
          <span className="text-gray-400 font-semibold text-3xl">
            {dealerStatistics?.total_dealers?.count}
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
                  dealerStatistics?.total_dealers?.growth
                ),
                // "text-red-500": isNegativeNumber(
                //   dealerStatistics?.total_dealers?.growth
                // ),
              })}
            >
              <path
                d="M6 10V3M6 3L2.5 6.5M6 3L9.5 6.5"
                // stroke="#079455"
                stroke={
                  isNegativeNumber(dealerStatistics?.total_dealers?.growth)
                    ? "#F04438"
                    : "#079455"
                }
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="text-[#414651] text-sm font-medium">
              {dealerStatistics?.total_dealers?.growth}%
            </span>
          </span>
        </div>

        <h3 className="mb-2 text-[#535862] font-medium text-sm ">
          Paid Dealers
        </h3>

        <div className="flex items-center mb-5 gap-4">
          <span className="text-gray-400 font-semibold text-3xl">
            {dealerStatistics?.paid_dealers?.count}
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
                  dealerStatistics?.paid_dealers?.growth
                ),
              })}
            >
              <path
                d="M6 10V3M6 3L2.5 6.5M6 3L9.5 6.5"
                // stroke="#079455"
                stroke={
                  isNegativeNumber(dealerStatistics?.paid_dealers?.growth)
                    ? "#F04438"
                    : "#079455"
                }
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="text-[#414651] text-sm font-medium">
              {dealerStatistics?.paid_dealers?.growth}%
            </span>
          </span>
        </div>

        <h3 className="mb-2 text-[#535862] font-medium text-sm ">
          Paid Conversion Rate
        </h3>

        <div className="flex items-center gap-4">
          <span className="text-gray-400 font-semibold text-3xl">
            {dealerStatistics?.paid_conversion_rate?.count}
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
                  dealerStatistics?.paid_conversion_rate?.growth
                ),
              })}
            >
              <path
                d="M6 10V3M6 3L2.5 6.5M6 3L9.5 6.5"
                // stroke="#079455"
                stroke={
                  isNegativeNumber(
                    dealerStatistics?.paid_conversion_rate?.growth
                  )
                    ? "#F04438"
                    : "#079455"
                }
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="text-[#414651] text-sm font-medium">
              {dealerStatistics?.paid_conversion_rate?.growth}%
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default DealerStatistics;
