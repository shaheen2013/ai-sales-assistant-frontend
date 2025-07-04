"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import SupportTable from "./_partials/AdminSupportTable";
import Pagination from "@/components/pagination/Pagination";
import { Tabs, TabsList, TabsTrigger } from "@/components/DashboardTabs";
import { useGetAdminAllSupportTicketsQuery } from "@/features/admin/adminSupportSlice";

export default function DashboardSupport() {
  /*--React State--*/
  const [status, setStatus] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const [page, setPage] = useState(1);

  /*--RTK Query--*/
  const { data: supportTicketsData, isFetching: supportTicketsIsFetching } =
    useGetAdminAllSupportTicketsQuery({
      status,
      ...(sortBy && { sort_by: sortBy }),
      page,
      page_size: 10,
    });

  return (
    <div>
      <Tabs
        defaultValue=""
        className=""
        value={status}
        onValueChange={(e) => {
          setPage(1); // Reset page to 1 when status changes
          setStatus(e);
        }}
      >
        <TabsList>
          <TabsTrigger value="">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.85355 4.35355C6.04882 4.15829 6.04882 3.84171 5.85355 3.64645C5.65829 3.45118 5.34171 3.45118 5.14645 3.64645L3.5 5.29289L2.85355 4.64645C2.65829 4.45118 2.34171 4.45118 2.14645 4.64645C1.95118 4.84171 1.95118 5.15829 2.14645 5.35355L3.14645 6.35355C3.34171 6.54882 3.65829 6.54882 3.85355 6.35355L5.85355 4.35355ZM8.75 4.5C8.33579 4.5 8 4.83579 8 5.25C8 5.66421 8.33579 6 8.75 6H17.25C17.6642 6 18 5.66421 18 5.25C18 4.83579 17.6642 4.5 17.25 4.5H8.75ZM8.75 9.5C8.33579 9.5 8 9.83579 8 10.25C8 10.6642 8.33579 11 8.75 11H17.25C17.6642 11 18 10.6642 18 10.25C18 9.83579 17.6642 9.5 17.25 9.5H8.75ZM8 15.25C8 14.8358 8.33579 14.5 8.75 14.5H17.25C17.6642 14.5 18 14.8358 18 15.25C18 15.6642 17.6642 16 17.25 16H8.75C8.33579 16 8 15.6642 8 15.25ZM5.85355 9.85355C6.04882 9.65829 6.04882 9.34171 5.85355 9.14645C5.65829 8.95118 5.34171 8.95118 5.14645 9.14645L3.5 10.7929L2.85355 10.1464C2.65829 9.95118 2.34171 9.95118 2.14645 10.1464C1.95118 10.3417 1.95118 10.6583 2.14645 10.8536L3.14645 11.8536C3.34171 12.0488 3.65829 12.0488 3.85355 11.8536L5.85355 9.85355ZM5.85355 14.1464C6.04882 14.3417 6.04882 14.6583 5.85355 14.8536L3.85355 16.8536C3.65829 17.0488 3.34171 17.0488 3.14645 16.8536L2.14645 15.8536C1.95118 15.6583 1.95118 15.3417 2.14645 15.1464C2.34171 14.9512 2.65829 14.9512 2.85355 15.1464L3.5 15.7929L5.14645 14.1464C5.34171 13.9512 5.65829 13.9512 5.85355 14.1464Z"
                fill="currentColor"
              />
            </svg>

            <span className="font-medium">All</span>

            <div className="bg-white text-primary-400 text-xs rounded-xl px-1.5 py-0.5 font-medium ml-auto">
              {
                Object.values(supportTicketsData?.status_counter || {}).reduce(
                  (acc, cur) => (acc as number) + (cur as number),
                  0
                ) as React.ReactNode
              }
            </div>
          </TabsTrigger>

          <TabsTrigger value="open">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.7964 2.09808C1.57549 1.93239 1.26208 1.97716 1.0964 2.19808C0.930714 2.41899 0.975485 2.73239 1.1964 2.89808L3.1984 4.39958C3.41932 4.56527 3.73272 4.5205 3.8984 4.29958C4.06409 4.07867 4.01932 3.76527 3.7984 3.59958L1.7964 2.09808ZM1 6.9996C0.723858 6.9996 0.5 7.22346 0.5 7.4996C0.5 7.77574 0.723858 7.9996 1 7.9996H2.5C2.77614 7.9996 3 7.77574 3 7.4996C3 7.22346 2.77614 6.9996 2.5 6.9996H1ZM9.99766 1.99957C13.1466 1.99957 15.7416 4.33445 15.9821 7.35498L15.9955 7.57719L16 7.80171L15.999 11.3976L16.9244 13.6197C16.947 13.6739 16.9647 13.7298 16.9774 13.7867L16.9926 13.8729L17.0013 14.0041C17.0013 14.4522 16.7048 14.8383 16.2521 14.9673L16.1358 14.9941L16.0013 15.0041L12.4996 15.0036L12.4946 15.1649C12.4095 16.4685 11.3252 17.4996 10 17.4996C8.67453 17.4996 7.58998 16.468 7.50533 15.1639L7.49962 15.0036L3.99891 15.0041C3.91096 15.0041 3.82358 14.9925 3.73902 14.9698L3.61456 14.9273C3.20378 14.7563 2.96181 14.3388 3.01221 13.8752L3.0333 13.7478L3.07572 13.6198L3.99902 11.4006L4.0001 7.79238L4.0044 7.56781C4.12702 4.45072 6.77104 1.99957 9.99766 1.99957ZM11.4996 15.0036H8.49962L8.50697 15.145C8.57552 15.8576 9.14275 16.4246 9.85556 16.4927L10 16.4996C10.7797 16.4996 11.4205 15.9047 11.4931 15.144L11.4996 15.0036ZM9.99766 2.99957C7.37511 2.99957 5.22717 4.92329 5.01715 7.38455L5.00393 7.5968L5.00002 7.80171V11.4996L4.96161 11.6917L3.9989 14.0041L15.9566 14.0061L16.0019 14.0041L15.0384 11.6918L15 11.4996L15.0001 7.81199L14.996 7.60788C14.8909 5.03448 12.6947 2.99957 9.99766 2.99957ZM18.9036 2.19808C18.7379 1.97716 18.4245 1.93239 18.2036 2.09808L16.2016 3.59958C15.9807 3.76527 15.9359 4.07867 16.1016 4.29958C16.2673 4.5205 16.5807 4.56527 16.8016 4.39958L18.8036 2.89808C19.0245 2.73239 19.0693 2.41899 18.9036 2.19808ZM19.5 7.4996C19.5 7.22346 19.2761 6.9996 19 6.9996H17.5C17.2239 6.9996 17 7.22346 17 7.4996C17 7.77574 17.2239 7.9996 17.5 7.9996H19C19.2761 7.9996 19.5 7.77574 19.5 7.4996Z"
                fill={status === "open" ? "white" : "#019935"}
              />
            </svg>
            <span
              className={cn(
                "text-primary-400",
                status === "open" && "text-white"
              )}
            >
              Open
            </span>
            <div
              className={cn(
                "bg-green-50 text-primary-400 border border-primary-400 text-xs rounded-xl px-2.5 py-0.5 font-medium ml-auto"
              )}
            >
              {supportTicketsData?.status_counter?.open_count || 0}
            </div>
          </TabsTrigger>

          <TabsTrigger value="in_progress">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.7964 2.09808C1.57549 1.93239 1.26208 1.97716 1.0964 2.19808C0.930714 2.41899 0.975485 2.73239 1.1964 2.89808L3.1984 4.39958C3.41932 4.56527 3.73272 4.5205 3.8984 4.29958C4.06409 4.07867 4.01932 3.76527 3.7984 3.59958L1.7964 2.09808ZM1 6.9996C0.723858 6.9996 0.5 7.22346 0.5 7.4996C0.5 7.77574 0.723858 7.9996 1 7.9996H2.5C2.77614 7.9996 3 7.77574 3 7.4996C3 7.22346 2.77614 6.9996 2.5 6.9996H1ZM9.99766 1.99957C13.1466 1.99957 15.7416 4.33445 15.9821 7.35498L15.9955 7.57719L16 7.80171L15.999 11.3976L16.9244 13.6197C16.947 13.6739 16.9647 13.7298 16.9774 13.7867L16.9926 13.8729L17.0013 14.0041C17.0013 14.4522 16.7048 14.8383 16.2521 14.9673L16.1358 14.9941L16.0013 15.0041L12.4996 15.0036L12.4946 15.1649C12.4095 16.4685 11.3252 17.4996 10 17.4996C8.67453 17.4996 7.58998 16.468 7.50533 15.1639L7.49962 15.0036L3.99891 15.0041C3.91096 15.0041 3.82358 14.9925 3.73902 14.9698L3.61456 14.9273C3.20378 14.7563 2.96181 14.3388 3.01221 13.8752L3.0333 13.7478L3.07572 13.6198L3.99902 11.4006L4.0001 7.79238L4.0044 7.56781C4.12702 4.45072 6.77104 1.99957 9.99766 1.99957ZM11.4996 15.0036H8.49962L8.50697 15.145C8.57552 15.8576 9.14275 16.4246 9.85556 16.4927L10 16.4996C10.7797 16.4996 11.4205 15.9047 11.4931 15.144L11.4996 15.0036ZM9.99766 2.99957C7.37511 2.99957 5.22717 4.92329 5.01715 7.38455L5.00393 7.5968L5.00002 7.80171V11.4996L4.96161 11.6917L3.9989 14.0041L15.9566 14.0061L16.0019 14.0041L15.0384 11.6918L15 11.4996L15.0001 7.81199L14.996 7.60788C14.8909 5.03448 12.6947 2.99957 9.99766 2.99957ZM18.9036 2.19808C18.7379 1.97716 18.4245 1.93239 18.2036 2.09808L16.2016 3.59958C15.9807 3.76527 15.9359 4.07867 16.1016 4.29958C16.2673 4.5205 16.5807 4.56527 16.8016 4.39958L18.8036 2.89808C19.0245 2.73239 19.0693 2.41899 18.9036 2.19808ZM19.5 7.4996C19.5 7.22346 19.2761 6.9996 19 6.9996H17.5C17.2239 6.9996 17 7.22346 17 7.4996C17 7.77574 17.2239 7.9996 17.5 7.9996H19C19.2761 7.9996 19.5 7.77574 19.5 7.4996Z"
                fill={status === "in_progress" ? "white" : "#2196f3"}
              />
            </svg>
            <span
              className={cn(
                "text-[#2196f3]",
                status === "in_progress" && "text-white"
              )}
            >
              In Progress
            </span>
            <div
              className={cn(
                "bg-blue-50 text-blue-400 border border-blue-400 text-xs rounded-xl px-2.5 py-0.5 font-medium ml-auto"
              )}
            >
              {supportTicketsData?.status_counter?.in_progress_count || 0}
            </div>
          </TabsTrigger>

          <TabsTrigger value="resolved">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.7964 2.09808C1.57549 1.93239 1.26208 1.97716 1.0964 2.19808C0.930714 2.41899 0.975485 2.73239 1.1964 2.89808L3.1984 4.39958C3.41932 4.56527 3.73272 4.5205 3.8984 4.29958C4.06409 4.07867 4.01932 3.76527 3.7984 3.59958L1.7964 2.09808ZM1 6.9996C0.723858 6.9996 0.5 7.22346 0.5 7.4996C0.5 7.77574 0.723858 7.9996 1 7.9996H2.5C2.77614 7.9996 3 7.77574 3 7.4996C3 7.22346 2.77614 6.9996 2.5 6.9996H1ZM9.99766 1.99957C13.1466 1.99957 15.7416 4.33445 15.9821 7.35498L15.9955 7.57719L16 7.80171L15.999 11.3976L16.9244 13.6197C16.947 13.6739 16.9647 13.7298 16.9774 13.7867L16.9926 13.8729L17.0013 14.0041C17.0013 14.4522 16.7048 14.8383 16.2521 14.9673L16.1358 14.9941L16.0013 15.0041L12.4996 15.0036L12.4946 15.1649C12.4095 16.4685 11.3252 17.4996 10 17.4996C8.67453 17.4996 7.58998 16.468 7.50533 15.1639L7.49962 15.0036L3.99891 15.0041C3.91096 15.0041 3.82358 14.9925 3.73902 14.9698L3.61456 14.9273C3.20378 14.7563 2.96181 14.3388 3.01221 13.8752L3.0333 13.7478L3.07572 13.6198L3.99902 11.4006L4.0001 7.79238L4.0044 7.56781C4.12702 4.45072 6.77104 1.99957 9.99766 1.99957ZM11.4996 15.0036H8.49962L8.50697 15.145C8.57552 15.8576 9.14275 16.4246 9.85556 16.4927L10 16.4996C10.7797 16.4996 11.4205 15.9047 11.4931 15.144L11.4996 15.0036ZM9.99766 2.99957C7.37511 2.99957 5.22717 4.92329 5.01715 7.38455L5.00393 7.5968L5.00002 7.80171V11.4996L4.96161 11.6917L3.9989 14.0041L15.9566 14.0061L16.0019 14.0041L15.0384 11.6918L15 11.4996L15.0001 7.81199L14.996 7.60788C14.8909 5.03448 12.6947 2.99957 9.99766 2.99957ZM18.9036 2.19808C18.7379 1.97716 18.4245 1.93239 18.2036 2.09808L16.2016 3.59958C15.9807 3.76527 15.9359 4.07867 16.1016 4.29958C16.2673 4.5205 16.5807 4.56527 16.8016 4.39958L18.8036 2.89808C19.0245 2.73239 19.0693 2.41899 18.9036 2.19808ZM19.5 7.4996C19.5 7.22346 19.2761 6.9996 19 6.9996H17.5C17.2239 6.9996 17 7.22346 17 7.4996C17 7.77574 17.2239 7.9996 17.5 7.9996H19C19.2761 7.9996 19.5 7.77574 19.5 7.4996Z"
                fill={status === "resolved" ? "white" : "#654ce6"}
              />
            </svg>
            <span
              className={cn(
                "text-[#654ce6]",
                status === "resolved" && "text-white"
              )}
            >
              Resolved
            </span>
            <div
              className={cn(
                "bg-purple-50 text-purple-400 border border-purple-400 text-xs rounded-xl px-2.5 py-0.5 font-medium ml-auto"
              )}
            >
              {supportTicketsData?.status_counter?.resolved_count || 0}
            </div>
          </TabsTrigger>

          <TabsTrigger value="closed">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5 4C15.7761 4 16 4.22386 16 4.5V15.5C16 15.7761 15.7761 16 15.5 16H4.5C4.22386 16 4 15.7761 4 15.5V4.5C4 4.22386 4.22386 4 4.5 4H15.5ZM4.5 3C3.67157 3 3 3.67157 3 4.5V15.5C3 16.3284 3.67157 17 4.5 17H15.5C16.3284 17 17 16.3284 17 15.5V4.5C17 3.67157 16.3284 3 15.5 3H4.5Z"
                fill="#E1574D"
              />
            </svg>

            <span
              className={cn(
                "text-red-400",
                status === "closed" && "text-white"
              )}
            >
              Closed
            </span>
            <div className="text-red-400 border border-red-400 bg-red-50 text-xs rounded-xl px-2.5 py-0.5 font-medium ml-auto">
              {supportTicketsData?.status_counter?.closed_count || 0}
            </div>
          </TabsTrigger>
        </TabsList>

        <div className="p-4 rounded-xl outline outline-1 outline-[#eaebec] mt-4">
          <SupportTable
            data={supportTicketsData?.results || []}
            loading={supportTicketsIsFetching}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          {typeof supportTicketsData?.count === "number" &&
            supportTicketsData?.count > 10 && (
              <Pagination
                page={page}
                onPageChange={setPage}
                totalPage={Math.ceil((supportTicketsData?.count || 0) / 10)}
                className="mt-4 justify-end"
              />
            )}
        </div>
      </Tabs>
    </div>
  );
}
