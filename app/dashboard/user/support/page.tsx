"use client";

import { Button } from "@/components/shadcn/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/DashboardTabs";

export default function DashboardSupport() {
  return (
    <div>
      <Tabs defaultValue="all" className="">
        <TabsList>
          <TabsTrigger value="all">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.85355 4.35355C6.04882 4.15829 6.04882 3.84171 5.85355 3.64645C5.65829 3.45118 5.34171 3.45118 5.14645 3.64645L3.5 5.29289L2.85355 4.64645C2.65829 4.45118 2.34171 4.45118 2.14645 4.64645C1.95118 4.84171 1.95118 5.15829 2.14645 5.35355L3.14645 6.35355C3.34171 6.54882 3.65829 6.54882 3.85355 6.35355L5.85355 4.35355ZM8.75 4.5C8.33579 4.5 8 4.83579 8 5.25C8 5.66421 8.33579 6 8.75 6H17.25C17.6642 6 18 5.66421 18 5.25C18 4.83579 17.6642 4.5 17.25 4.5H8.75ZM8.75 9.5C8.33579 9.5 8 9.83579 8 10.25C8 10.6642 8.33579 11 8.75 11H17.25C17.6642 11 18 10.6642 18 10.25C18 9.83579 17.6642 9.5 17.25 9.5H8.75ZM8 15.25C8 14.8358 8.33579 14.5 8.75 14.5H17.25C17.6642 14.5 18 14.8358 18 15.25C18 15.6642 17.6642 16 17.25 16H8.75C8.33579 16 8 15.6642 8 15.25ZM5.85355 9.85355C6.04882 9.65829 6.04882 9.34171 5.85355 9.14645C5.65829 8.95118 5.34171 8.95118 5.14645 9.14645L3.5 10.7929L2.85355 10.1464C2.65829 9.95118 2.34171 9.95118 2.14645 10.1464C1.95118 10.3417 1.95118 10.6583 2.14645 10.8536L3.14645 11.8536C3.34171 12.0488 3.65829 12.0488 3.85355 11.8536L5.85355 9.85355ZM5.85355 14.1464C6.04882 14.3417 6.04882 14.6583 5.85355 14.8536L3.85355 16.8536C3.65829 17.0488 3.34171 17.0488 3.14645 16.8536L2.14645 15.8536C1.95118 15.6583 1.95118 15.3417 2.14645 15.1464C2.34171 14.9512 2.65829 14.9512 2.85355 15.1464L3.5 15.7929L5.14645 14.1464C5.34171 13.9512 5.65829 13.9512 5.85355 14.1464Z"
                fill="white"
              />
            </svg>

            <span className="font-medium">All</span>

            <div className="bg-white text-primary-400 text-xs rounded-xl px-1.5 py-0.5 font-medium ml-auto">
              1.5k
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
                fill="#019935"
              />
            </svg>
            <span className="text-primary-400 ">Open</span>
            <div className="bg-green-50 text-primary-400 border border-primary-400 text-xs rounded-xl px-1.5 py-0.5 font-medium ml-auto">
              1.5k
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

            <span className="text-red-400 ">Closed</span>
            <div className="text-red-400 border border-red-400 bg-red-50 text-xs rounded-xl px-1.5 py-0.5 font-medium ml-auto">
              15
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <SupportTable />
        </TabsContent>

        <TabsContent value="open">open</TabsContent>

        <TabsContent value="closed">closed</TabsContent>
      </Tabs>
    </div>
  );
}

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table";
import { useMemo } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";

export type Tickets = {
  id: string;
  dealer: string;
  email: string;
  topic: string;
  type: "Call" | "Email" | "Chat";
  assign: string;
  createdDate: string;
  status: "Open" | "Closed";
};

export const columns: ColumnDef<Tickets>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },

  {
    accessorKey: "dealer",
    header: "Dealer Name",
  },

  {
    accessorKey: "",
    header: "Email & Phone",
  },

  {
    accessorKey: "topic",
    header: "Topic",
  },

  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "assign",
    header: "Assign",
  },
  {
    accessorKey: "createdDate",
    header: "Created Date",
  },

  {
    accessorKey: "status",
    header: "Status",
  },

  {
    accessorKey: "action",
    header: "Action",
  },
];

function SupportTable() {
  const rawData: Tickets[] = [
    {
      id: "1",
      dealer: "John Doe",
      email: "john@example.com",
      topic: "Issue with product",
      type: "Call",
      assign: "Alice Smith",
      createdDate: "2023-10-01",
      status: "Open",
    },
    {
      id: "2",
      dealer: "Jane Smith",
      email: "jane@example.com",
      topic: "Payment not processed",
      type: "Email",
      assign: "Bob Johnson",
      createdDate: "2023-10-02",
      status: "Closed",
    },
    {
      id: "3",
      dealer: "Mike Brown",
      email: "mike@example.com",
      topic: "Account locked",
      type: "Chat",
      assign: "Alice Smith",
      createdDate: "2023-10-03",
      status: "Closed",
    },
    {
      id: "4",
      dealer: "Emily White",
      email: "emily@example.com",
      topic: "Request refund",
      type: "Call",
      assign: "Charlie King",
      createdDate: "2023-10-04",
      status: "Open",
    },
    {
      id: "5",
      dealer: "Chris Green",
      email: "chris@example.com",
      topic: "Delayed shipment",
      type: "Email",
      assign: "Alice Smith",
      createdDate: "2023-10-05",
      status: "Closed",
    },
    {
      id: "6",
      dealer: "Patricia Black",
      email: "patricia@example.com",
      topic: "Cannot apply discount code",
      type: "Chat",
      assign: "Bob Johnson",
      createdDate: "2023-10-06",
      status: "Open",
    },
    {
      id: "7",
      dealer: "Robert Gray",
      email: "robert@example.com",
      topic: "Login error",
      type: "Email",
      assign: "Charlie King",
      createdDate: "2023-10-07",
      status: "Closed",
    },
    {
      id: "8",
      dealer: "Laura Scott",
      email: "laura@example.com",
      topic: "Wrong item received",
      type: "Call",
      assign: "Alice Smith",
      createdDate: "2023-10-08",
      status: "Open",
    },
    {
      id: "9",
      dealer: "Steven Hall",
      email: "steven@example.com",
      topic: "Need invoice",
      type: "Email",
      assign: "Bob Johnson",
      createdDate: "2023-10-09",
      status: "Closed",
    },
    {
      id: "10",
      dealer: "Rachel Lee",
      email: "rachel@example.com",
      topic: "Change delivery address",
      type: "Chat",
      assign: "Charlie King",
      createdDate: "2023-10-10",
      status: "Open",
    },
    {
      id: "11",
      dealer: "Daniel Young",
      email: "daniel@example.com",
      topic: "Product damaged",
      type: "Call",
      assign: "Alice Smith",
      createdDate: "2023-10-11",
      status: "Closed",
    },
    {
      id: "12",
      dealer: "Olivia King",
      email: "olivia@example.com",
      topic: "Warranty inquiry",
      type: "Email",
      assign: "Bob Johnson",
      createdDate: "2023-10-12",
      status: "Open",
    },
    {
      id: "13",
      dealer: "Henry Adams",
      email: "henry@example.com",
      topic: "Reset password",
      type: "Chat",
      assign: "Charlie King",
      createdDate: "2023-10-13",
      status: "Closed",
    },
    {
      id: "14",
      dealer: "Sophia Lewis",
      email: "sophia@example.com",
      topic: "Item not as described",
      type: "Call",
      assign: "Alice Smith",
      createdDate: "2023-10-14",
      status: "Open",
    },
    {
      id: "15",
      dealer: "Liam Turner",
      email: "liam@example.com",
      topic: "Tracking number not working",
      type: "Email",
      assign: "Bob Johnson",
      createdDate: "2023-10-15",
      status: "Closed",
    },
    {
      id: "16",
      dealer: "Grace Parker",
      email: "grace@example.com",
      topic: "Feedback on support",
      type: "Chat",
      assign: "Charlie King",
      createdDate: "2023-10-16",
      status: "Closed",
    },
    {
      id: "17",
      dealer: "Noah Bennett",
      email: "noah@example.com",
      topic: "Cancel subscription",
      type: "Call",
      assign: "Alice Smith",
      createdDate: "2023-10-17",
      status: "Open",
    },
    {
      id: "18",
      dealer: "Emma Hughes",
      email: "emma@example.com",
      topic: "Billing issue",
      type: "Email",
      assign: "Bob Johnson",
      createdDate: "2023-10-18",
      status: "Closed",
    },
    {
      id: "19",
      dealer: "James Foster",
      email: "james@example.com",
      topic: "Upgrade plan",
      type: "Chat",
      assign: "Charlie King",
      createdDate: "2023-10-19",
      status: "Open",
    },
    {
      id: "20",
      dealer: "Ava Morgan",
      email: "ava@example.com",
      topic: "Inquiry about features",
      type: "Call",
      assign: "Alice Smith",
      createdDate: "2023-10-20",
      status: "Closed",
    },
  ];

  const data: Tickets[] = useMemo(() => rawData, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      {/* top */}
      <div className="flex justify-between mb-4">
        <h2 className="font-semibold text-lg text-gray-300">Support Tickets</h2>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="border flex justify-center items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-300 cursor-pointer hover:bg-gray-100 transition-colors">
                <span>Sort by</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.21967 6.46967C2.51256 6.17678 2.98744 6.17678 3.28033 6.46967L10 13.1893L16.7197 6.46967C17.0126 6.17678 17.4874 6.17678 17.7803 6.46967C18.0732 6.76256 18.0732 7.23744 17.7803 7.53033L10.5303 14.7803C10.2374 15.0732 9.76256 15.0732 9.46967 14.7803L2.21967 7.53033C1.92678 7.23744 1.92678 6.76256 2.21967 6.46967Z"
                    fill="#019935"
                  />
                </svg>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="primary" className="px-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.75008 1C10.1298 1 10.4436 1.28201 10.4934 1.64808L10.5002 1.74985L10.5014 9H17.7545C18.1687 9 18.5045 9.33579 18.5045 9.75C18.5045 10.1297 18.2224 10.4435 17.8563 10.4932L17.7545 10.5H10.5014L10.5035 17.7491C10.5036 18.1633 10.1679 18.4993 9.75364 18.4993C9.37394 18.4993 9.06009 18.2173 9.01035 17.8512L9.00349 17.7494L9.00144 10.5H1.75244C1.33823 10.5 1.00244 10.1642 1.00244 9.75C1.00244 9.3703 1.2846 9.05651 1.65067 9.00685L1.75244 9H9.00144L9.00024 1.75015C9.00015 1.33594 9.33587 1 9.75008 1Z"
                fill="white"
              />
            </svg>
            Ask for Support
          </Button>
        </div>
      </div>

      {/* table */}
      <div className="">
        <Table>
          <TableHeader className="">
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
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
