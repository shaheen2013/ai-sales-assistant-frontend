"use client";

import React from "react";
import { Button } from "@/components/shadcn/button";
import { shortenFilename } from "@/lib/utils";
import { Skeleton } from "@/components/shadcn/skeleton";

export default function RecentFiles({
  isError = false,
  isFetching = false,
  dataGetInventoryFiles = [],
}: any) {
  if (isFetching) {
    return (
      <div className="grid lg:grid-cols-3 gap-4">
        <div>
          <Skeleton className="h-20 w-full" />
        </div>

        <div>
          <Skeleton className="h-20 w-full" />
        </div>

        <div>
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h3 className="text-base font-semibold flex items-center gap-2 mb-1">
          Error fetching data
        </h3>
        <p className="text-gray-600 text-sm">Please try again later</p>
      </div>
    );
  }

  if (dataGetInventoryFiles?.results?.length == 0) {
    return null;
  }

  const maxThreeResults = dataGetInventoryFiles?.results?.slice(0, 3);

  return (
    <div>
      <h2 className="mb-4">Recent files</h2>

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        {maxThreeResults?.map((inventoryFile: any, index: any) => (
          <div
            key={index}
            className="bg-[#F3F4F5] border border-gray-100 rounded-lg p-4 flex justify-between items-center gap-2"
          >
            <div>
              <h3
                className="text-base font-semibold flex items-center gap-2 mb-1"
                title={inventoryFile?.file_name}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.28082 10.6092L10.5848 5.30516C10.8402 5.0498 11.1435 4.84725 11.4772 4.70908C11.8109 4.57091 12.1685 4.49982 12.5297 4.49986C12.8909 4.49991 13.2485 4.5711 13.5821 4.70935C13.9158 4.84761 14.219 5.05024 14.4743 5.30566C14.7297 5.56108 14.9322 5.86429 15.0704 6.19799C15.2086 6.53169 15.2797 6.88934 15.2796 7.25051C15.2796 7.61168 15.2084 7.96931 15.0701 8.30297C14.9319 8.63664 14.7292 8.9398 14.4738 9.19516L8.10982 15.5592C7.87524 15.7937 7.55708 15.9255 7.22532 15.9255C6.89357 15.9255 6.57541 15.7937 6.34082 15.5592C6.10624 15.3246 5.97445 15.0064 5.97445 14.6747C5.97445 14.3429 6.10624 14.0247 6.34082 13.7902L11.9978 8.13316C12.1303 7.99098 12.2024 7.80294 12.199 7.60863C12.1956 7.41433 12.1169 7.22895 11.9794 7.09153C11.842 6.95412 11.6566 6.87541 11.4623 6.87198C11.268 6.86855 11.08 6.94068 10.9378 7.07316L5.28082 12.7302C4.76498 13.246 4.47518 13.9456 4.47518 14.6752C4.47518 15.4047 4.76498 16.1043 5.28082 16.6202C5.79667 17.136 6.49631 17.4258 7.22582 17.4258C7.95534 17.4258 8.65498 17.136 9.17082 16.6202L15.5338 10.2552C16.3155 9.45503 16.7503 8.37898 16.7438 7.26041C16.7372 6.14183 16.29 5.07092 15.499 4.27995C14.7081 3.48899 13.6371 3.04174 12.5186 3.03523C11.4 3.02871 10.3239 3.46345 9.52382 4.24516L4.22082 9.54816C4.08834 9.69033 4.01622 9.87838 4.01965 10.0727C4.02308 10.267 4.10179 10.4524 4.2392 10.5898C4.37661 10.7272 4.562 10.8059 4.7563 10.8093C4.9506 10.8128 5.13865 10.7406 5.28082 10.6082"
                    fill="#2196F3"
                  />
                </svg>
                {shortenFilename(inventoryFile?.file_name)}
              </h3>
              <p className="text-gray-600 text-sm">20 MB</p>
            </div>

            <div className="">
              <Button
                onClick={() => {
                  window.alert("Functionality not available yet");
                }}
                className=" bg-white border-gray-50 !p-1 border rounded-lg mr-3 h-10 w-10"
                variant="icon"
              >
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="!h-5 !w-5"
                >
                  <path
                    d="M12.5003 10.4993C12.5003 11.8801 11.381 12.9993 10.0003 12.9993C8.61957 12.9993 7.50029 11.8801 7.50029 10.4993C7.50029 9.11864 8.61957 7.99935 10.0003 7.99935C11.381 7.99935 12.5003 9.11864 12.5003 10.4993Z"
                    stroke="#717882"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.04883 10.4993C3.11072 7.11841 6.26929 4.66602 10.0007 4.66602C13.732 4.66602 16.8906 7.11844 17.9525 10.4994C16.8906 13.8803 13.732 16.3327 10.0007 16.3327C6.26929 16.3327 3.11071 13.8803 2.04883 10.4993Z"
                    stroke="#717882"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>

              <Button
                variant="icon"
                onClick={() => {
                  if (inventoryFile?.file) {
                    window.open(inventoryFile?.file);
                  }
                }}
                className="mt-auto bg-white border-gray-50 !p-1 border rounded-lg h-10 w-10"
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="!h-5 !w-5"
                >
                  <path
                    d="M3.33301 13.8327L3.33301 14.666C3.33301 16.0467 4.4523 17.166 5.83301 17.166L14.1663 17.166C15.5471 17.166 16.6663 16.0467 16.6663 14.666L16.6663 13.8327M13.333 10.4993L9.99967 13.8327M9.99967 13.8327L6.66634 10.4993M9.99967 13.8327L9.99967 3.83268"
                    stroke="#717882"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </div>
          </div>
        ))}

        {/* no results */}
      </div>
    </div>
  );
}
