"use client";

import {
  ColumnDef,
  flexRender,
  SortingState,
  VisibilityState,
  useReactTable,
  getCoreRowModel,
  ColumnFiltersState,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useState } from "react";
import Image from "next/image";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table";
import { MoreHorizontal, MoreVertical, MoreVerticalIcon } from "lucide-react";

import Badge from "@/components/badge/Badge";
import { Button } from "@/components/shadcn/button";
import SimpleSelect from "@/components/select/SimpleSelect";
import Pagination from "@/components/pagination/Pagination";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/DashboardTabs";

import {
  useGetAdminAllSupportTicketsQuery,
  useDeleteAdminSupportTicketMutation,
} from "@/features/admin/adminSupportSlice";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/shadcn/dropdown-menu";

import { useToast } from "@/hooks/useToast";
import { beautifyErrors, cn } from "@/lib/utils";
import Spinner from "@/components/spinner/Spinner";
import { SupportTicketType } from "@/types/supportTicketType";
import AdminSupportDialog from "./_partials/AdminSupportDialog";

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
        onValueChange={setStatus}
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

function SupportTable({
  data,
  loading,
  sortBy,
  setSortBy,
}: {
  data: SupportTicketType[];
  loading: boolean;
  sortBy: string;
  setSortBy: (sort: string) => void;
}) {
  /*--Custom Hooks--*/
  const toast = useToast();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentTicket, setCurrentTicket] = useState<SupportTicketType | null>(
    null
  );
  const [openActionDropdown, setOpenActionDropdown] = useState<number | null>(
    null
  );

  /*--RTK Query--*/
  const [deleteSupportTicket, { isLoading: deleteTicketLoading }] =
    useDeleteAdminSupportTicketMutation();

  /*--Functions--*/
  const handleDeleteTicket = async (id: string) => {
    try {
      await deleteSupportTicket(id);
      toast("success", "Ticket deleted successfully!");
    } catch (err) {
      toast("error", beautifyErrors(err));
    }
  };

  const columns: ColumnDef<SupportTicketType>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <div className="font-medium text-gray-400">{row.getValue("id")}</div>
      ),
    },

    {
      accessorKey: "dealer_name",
      header: "Dealer Name",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            {row?.original?.dealer?.profile_picture ? (
              <Image
                src={row?.original?.dealer?.profile_picture}
                alt=""
                height="30"
                width="30"
                className="rounded-full"
              />
            ) : (
              <svg
                width="30"
                height="30"
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

            <span className="text-gray-400">{row.original.dealer?.name}</span>
          </div>
        );
      },
    },

    {
      accessorKey: "email",
      accessorFn: (row) => row.dealer?.email,
      header: ({ column }) => {
        return (
          <h2
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email & Phone
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.6665 9.99935L7.99984 13.3327L11.3332 9.99935M4.6665 5.99935L7.99984 2.66602L11.3332 5.99935"
                stroke="#111928"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </h2>
        );
      },
      cell: ({ row }) => (
        <div className="text-gray-400">
          <div>{row.original?.dealer?.email}</div>
          <div>{row.original?.dealer?.phone}</div>
        </div>
      ),
    },

    {
      accessorKey: "subject",
      header: ({ column }) => {
        return (
          <h2
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Topic
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.6665 9.99935L7.99984 13.3327L11.3332 9.99935M4.6665 5.99935L7.99984 2.66602L11.3332 5.99935"
                stroke="#111928"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </h2>
        );
      },
      cell: ({ row }) => (
        <div className="text-gray-400">
          <div>{row.original?.subject}</div>
        </div>
      ),
    },

    {
      accessorKey: "created_at",
      header: ({ column }) => {
        return (
          <h2
            className="flex items-center text-center gap-2 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created Date
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.6665 9.99935L7.99984 13.3327L11.3332 9.99935M4.6665 5.99935L7.99984 2.66602L11.3332 5.99935"
                stroke="#111928"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </h2>
        );
      },
      cell: ({ row }) => {
        const date = new Date(row.original?.created_at).toLocaleDateString(
          "en-US",
          {
            day: "2-digit",
            month: "short", // Outputs "Feb"
            year: "numeric",
          }
        );

        const time = new Date(row.original?.created_at).toLocaleTimeString(
          "en-US",
          {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit", // Add seconds
            hour12: true, // Ensures AM/PM format
          }
        );

        return (
          <div className=" font-medium text-gray-400">
            <div>{date}</div>
            <div>{time}</div>
          </div>
        );
      },
    },

    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <h2
            className="flex items-center text-center gap-2 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.6665 9.99935L7.99984 13.3327L11.3332 9.99935M4.6665 5.99935L7.99984 2.66602L11.3332 5.99935"
                stroke="#111928"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </h2>
        );
      },
      cell: ({ row }) => {
        function getStatusColor(status: string) {
          if (status.toLowerCase() === "open") {
            return "green";
          } else if (status.toLowerCase() === "closed") {
            return "red";
          } else if (status.toLowerCase() === "in_progress") {
            return "blue";
          } else if (status.toLowerCase() === "resolved") {
            return "purple";
          }

          return "blue";
        }
        const status = row.original?.status?.split("_").join(" ");

        return <Badge text={status} variant={getStatusColor(status)} />;
      },
    },

    {
      id: "actions",
      header: ({}) => {
        return (
          <h2 className="flex items-center text-center gap-2 cursor-pointer">
            Action
          </h2>
        );
      },
      cell: ({ row }) => {
        return (
          <DropdownMenu
            open={openActionDropdown === row.original.id}
            onOpenChange={(open) =>
              setOpenActionDropdown(open ? row.original.id : null)
            }
          >
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0"
                onClick={() => setOpenActionDropdown(row.original.id)}
              >
                <span className="sr-only">Open menu</span>
                <MoreVerticalIcon className="w-10  h-10 " />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  setCurrentTicket(row.original);
                  setOpenEditModal(true);
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.1813 2.92689C16.0291 1.71505 14.1047 1.69077 12.9222 2.87317L3.54741 12.2475C3.21958 12.5754 2.99204 12.9899 2.89148 13.4424L2.01387 17.3923C1.97678 17.5592 2.02754 17.7335 2.14844 17.8544C2.26934 17.9753 2.44362 18.026 2.6105 17.9889L6.53689 17.1157C7.00432 17.0118 7.43243 16.7767 7.77103 16.4381L17.129 7.08003C18.27 5.939 18.2933 4.09631 17.1813 2.92689ZM13.6293 3.58029C14.4143 2.79538 15.6917 2.8115 16.4566 3.61596C17.1948 4.39225 17.1793 5.61548 16.4219 6.37293L15.7507 7.04418L12.958 4.25155L13.6293 3.58029ZM12.2509 4.95864L15.0436 7.7513L7.06391 15.731C6.85976 15.9352 6.60164 16.0769 6.31982 16.1396L3.1605 16.8421L3.86768 13.6593C3.92698 13.3924 4.06117 13.148 4.2545 12.9547L12.2509 4.95864Z"
                    fill="#333741"
                  />
                </svg>
                <span className="text-gray-500">Edit</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDeleteTicket(row.original.ticket_id);
                }}
                className={cn(
                  deleteTicketLoading &&
                    "cursor-not-allowed opacity-70 pointer-events-none"
                )}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.5 4H11.5C11.5 3.17157 10.8284 2.5 10 2.5C9.17157 2.5 8.5 3.17157 8.5 4ZM7.5 4C7.5 2.61929 8.61929 1.5 10 1.5C11.3807 1.5 12.5 2.61929 12.5 4H17.5C17.7761 4 18 4.22386 18 4.5C18 4.77614 17.7761 5 17.5 5H16.4456L15.2521 15.3439C15.0774 16.8576 13.7957 18 12.2719 18H7.72813C6.20431 18 4.92256 16.8576 4.7479 15.3439L3.55437 5H2.5C2.22386 5 2 4.77614 2 4.5C2 4.22386 2.22386 4 2.5 4H7.5ZM5.74131 15.2292C5.85775 16.2384 6.71225 17 7.72813 17H12.2719C13.2878 17 14.1422 16.2384 14.2587 15.2292L15.439 5H4.56101L5.74131 15.2292ZM8.5 7.5C8.77614 7.5 9 7.72386 9 8V14C9 14.2761 8.77614 14.5 8.5 14.5C8.22386 14.5 8 14.2761 8 14V8C8 7.72386 8.22386 7.5 8.5 7.5ZM12 8C12 7.72386 11.7761 7.5 11.5 7.5C11.2239 7.5 11 7.72386 11 8V14C11 14.2761 11.2239 14.5 11.5 14.5C11.7761 14.5 12 14.2761 12 14V8Z"
                    fill="#D92D21"
                  />
                </svg>
                <span className="font-medium text-red-500">Delete</span>
                {deleteTicketLoading && (
                  <Spinner className="size-3 text-red-500" />
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div>
      {/* top */}
      <div className="flex justify-between mb-4">
        <h2 className="font-semibold text-lg text-gray-300">Support Tickets</h2>

        <div className="flex gap-2">
          <SimpleSelect
            options={[
              {
                label: "Time",
                value: "created_at",
              },
            ]}
            placeholder="Sort By"
            triggerClassName="[&>span]:text-primary-500 [&>div>svg]:text-primary-500"
            value={sortBy}
            onChange={setSortBy}
          />
        </div>
      </div>

      {/* table */}
      <div className="">
        <div className="w-full">
          <div>
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="space-y-2">
                      <TableSkeleton />
                    </TableCell>
                  </TableRow>
                ) : (
                  <>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && "selected"}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="h-24 text-center"
                        >
                          No results.
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Support Dialog */}
      <AdminSupportDialog
        open={openEditModal}
        onOpenChange={setOpenEditModal}
        data={currentTicket}
      />
    </div>
  );
}
