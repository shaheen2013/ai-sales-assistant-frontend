"use client";

import {
  flexRender,
  ColumnDef,
  SortingState,
  VisibilityState,
  useReactTable,
  getCoreRowModel,
  ColumnFiltersState,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

import { useMemo, useState } from "react";

import Image from "next/image";
import { MoreHorizontal } from "lucide-react";

import {
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  TableHeader,
} from "@/components/shadcn/table";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/shadcn/dropdown-menu";
import { Button } from "@/components/shadcn/button";
import { Skeleton } from "@/components/shadcn/skeleton";
import Link from "next/link";

export default function InventoryFilesList({
  isLoading,
  isError,
  refetchGetInventoryFiles,
  dataGetInventoryFiles,
}: {
  isLoading?: boolean;
  isError?: boolean;
  refetchGetInventoryFiles?: () => void;
  dataGetInventoryFiles?: any;
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  type Inventory = {
    created_date: string;
    file_name: string;
    file: string;
    file_size: string;
    // stockId: string;
    // createdDate: string;
    // brand: string;
    // vin: string;
    // model: string;
    // mileage: string;
    // year: string;
  };

  // const inventoryData: Inventory[] = [
  //   {
  //     stockId: "STK-001",
  //     createdDate: "2023-10-01",
  //     brand: "Toyota",
  //     vin: "1HGCM82633A004352",
  //     model: "Camry",
  //     mileage: "45000",
  //     year: "2020",
  //   },
  //   {
  //     stockId: "STK-002",
  //     createdDate: "2023-10-02",
  //     brand: "Honda",
  //     vin: "2HGFB2F59CH512345",
  //     model: "Civic",
  //     mileage: "38000",
  //     year: "2019",
  //   },
  //   {
  //     stockId: "STK-003",
  //     createdDate: "2023-10-03",
  //     brand: "Ford",
  //     vin: "1FAHP3FN8AW123456",
  //     model: "Focus",
  //     mileage: "51000",
  //     year: "2018",
  //   },
  // ];

  const columns: ColumnDef<Inventory>[] = [
    {
      accessorKey: "createdDate",
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
        const date = new Date(row.original?.created_date).toLocaleDateString(
          "en-US",
          {
            day: "2-digit",
            month: "short", // Outputs "Feb"
            year: "numeric",
          }
        );
        const time = new Date(row.original?.created_date).toLocaleTimeString(
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
      accessorKey: "file_name",
      header: ({ column }) => {
        return (
          <h2
            className="flex items-center text-center gap-2 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            File Name
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
        <div className="flex items-center gap-2">
          {/* <Image
            src="https://dummyimage.com/40x40"
            alt=""
            height="30"
            width="30"
            className="rounded-full"
          /> */}
          <Link
            href={row.original?.file}
            target="_blank"
            className="text-gray-400 underline hover:text-gray-600 cursor-pointer"
          >
            {row.original?.file_name}
          </Link>
        </div>
      ),
    },

    {
      accessorKey: "file_size",
      header: ({ column }) => {
        return (
          <h2
            className="flex items-center text-center gap-2 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            File Size
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
        <div className="flex items-center gap-2">
          {/* <Image
            src="https://dummyimage.com/40x40"
            alt=""
            height="30"
            width="30"
            className="rounded-full"
          /> */}
          <Link
            href={row.original?.file}
            target="_blank"
            className="text-gray-400"
          >
            {row.original?.file_size}
          </Link>
        </div>
      ),
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              onClick={(e) => {
                e.stopPropagation();

                // download file
                const fileUrl = row.original?.file;
                if (fileUrl) {
                  const link = document.createElement("a");
                  link.target = "_blank";
                  link.href = fileUrl;
                  link.download = row.original?.file_name || "download";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }
              }}
            >
              <DropdownMenuItem>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 14V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V14M12 2V16M12 16L7 10.5555M12 16L17 10.5556"
                    stroke="#333741"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>

                <span className="text-gray-500">Download</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const data: Inventory[] = useMemo(
    () => dataGetInventoryFiles?.results || [],
    []
  );

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

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (isError) {
    console.error("Error loading inventory files");
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">Error loading inventory files.</p>
        <Button onClick={refetchGetInventoryFiles} className="ml-4">
          Retry
        </Button>
      </div>
    );
  }

  console.log("dataGetInventoryFiles => ", dataGetInventoryFiles?.results);

  return (
    <>
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
          {table && table?.getRowModel()?.rows?.length ? (
            table?.getRowModel()?.rows?.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row?.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

function TableSkeleton() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto ">
        <tbody>
          {[...Array(5)].map((_, i) => (
            <tr key={i} className="border-t">
              <td className="px-4 py-4">
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
              </td>
              <td className="px-4 py-4">
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
              </td>
              <td className="px-4 py-4">
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
              </td>
              <td className="px-4 py-4">
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
              </td>
              <td className="px-4 py-4">
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
              </td>
              <td className="px-4 py-4">
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
              </td>
              <td className="px-4 py-2 text-r4ght">
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
