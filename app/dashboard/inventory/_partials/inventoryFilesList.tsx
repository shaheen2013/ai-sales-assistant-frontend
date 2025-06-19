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
import Pagination from "@/components/pagination/Pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { useDeleteVehicleInventoryFileMutation } from "@/features/inventory/inventorySlice";
import { useToast } from "@/hooks/useToast";
import { beautifyErrors } from "@/lib/utils";

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
  const router = useRouter();
  const toast = useToast();
  const searchParams = useSearchParams();

  const page = searchParams.get("file_page") || 1;

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [deleteInventoryFile, { isLoading: isLoadingDeleteVehicleInventory }] =
    useDeleteVehicleInventoryFileMutation();

  type Inventory = {
    id: number;
    created_date: string;
    file_name: string;
    file: string;
    file_size: string;
  };

  const handleInventoryDelete = async (e: any) => {
    try {
      const { data, error } = await deleteInventoryFile({ id: e });

      if (error) {
        toast("error", beautifyErrors(error));
        return;
      }

      toast("success", "Inventory file deleted successfully");
      refetchGetInventoryFiles?.();

      console.log("Inventory file deleted successfully:", data);
    } catch (error) {
      console.error("Error deleting inventory file:", error);
    }
  };

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

              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  handleInventoryDelete(row?.original?.id);
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
                    d="M8.5 4H11.5C11.5 3.17157 10.8284 2.5 10 2.5C9.17157 2.5 8.5 3.17157 8.5 4ZM7.5 4C7.5 2.61929 8.61929 1.5 10 1.5C11.3807 1.5 12.5 2.61929 12.5 4H17.5C17.7761 4 18 4.22386 18 4.5C18 4.77614 17.7761 5 17.5 5H16.4456L15.2521 15.3439C15.0774 16.8576 13.7957 18 12.2719 18H7.72813C6.20431 18 4.92256 16.8576 4.7479 15.3439L3.55437 5H2.5C2.22386 5 2 4.77614 2 4.5C2 4.22386 2.22386 4 2.5 4H7.5ZM5.74131 15.2292C5.85775 16.2384 6.71225 17 7.72813 17H12.2719C13.2878 17 14.1422 16.2384 14.2587 15.2292L15.439 5H4.56101L5.74131 15.2292ZM8.5 7.5C8.77614 7.5 9 7.72386 9 8V14C9 14.2761 8.77614 14.5 8.5 14.5C8.22386 14.5 8 14.2761 8 14V8C8 7.72386 8.22386 7.5 8.5 7.5ZM12 8C12 7.72386 11.7761 7.5 11.5 7.5C11.2239 7.5 11 7.72386 11 8V14C11 14.2761 11.2239 14.5 11.5 14.5C11.7761 14.5 12 14.2761 12 14V8Z"
                    fill="#D92D21"
                  />
                </svg>
                <span className="font-medium text-red-500">Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const data: Inventory[] = useMemo(
    () => dataGetInventoryFiles?.results,
    [dataGetInventoryFiles?.results]
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
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">Error loading inventory files.</p>
        <Button onClick={refetchGetInventoryFiles} className="ml-4">
          Retry
        </Button>
      </div>
    );
  }

  const onPageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("file_page", page.toString());
    router.push(`?${params.toString()}`);
  };

  const itemsPerPage = 10; // Assuming backend paginates 10 items per page
  const totalPage = Math.ceil(dataGetInventoryFiles?.count / itemsPerPage);

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
          {table?.getRowModel()?.rows?.length ? (
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

      <div className="flex items-end justify-center my-4">
        <Pagination
          page={Number(page)}
          onPageChange={onPageChange}
          totalPage={totalPage}
        />
      </div>
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
