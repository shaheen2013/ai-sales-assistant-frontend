"use client";

import React from "react";

import {
  flexRender,
  ColumnDef,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  TableHeader,
} from "@/components/shadcn/table";

import TableSkeleton from "@/components/skeleton/TableSkeleton";
import { NewsLetterResponseType } from "@/types/newsletterType";

interface NewsLetterDataTableProps {
  columns: ColumnDef<NewsLetterResponseType, unknown>[];
  data: NewsLetterResponseType[];
  loading: boolean;
}

const NewsLetterDataTable = ({
  columns,
  data,
  loading,
}: NewsLetterDataTableProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className=" mt-4">
      <Table className="">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="border-b border-[#E9EAEB]"
                  style={{
                    minWidth: header.column.columnDef.size,
                    maxWidth: header.column.columnDef.size,
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={6} className="space-y-2">
                <TableSkeleton />
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="bg-white border-b border-[#E9EAEB]"
                    style={{
                      minWidth: cell.column.columnDef.size,
                      maxWidth: cell.column.columnDef.size,
                    }}
                  >
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

      {/* <div className="text-primary-500 text-base font-medium mt-5 select-none underline flex justify-end mr-4">View all</div> */}
    </div>
  );
};

export default NewsLetterDataTable;
