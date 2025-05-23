"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/shadcn/table';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React from 'react';
import { TalkToHumanColumnDataType } from './TalkToHumanColumns';
import { TalkToHumanResponseType } from '@/types/appointmentBookingSliceType';
import TableSkeleton from '@/components/skeleton/TableSkeleton';

interface TalkToHumanDataTableProps {
  columns: ColumnDef<TalkToHumanResponseType, unknown>[];
  data: TalkToHumanResponseType[];
  loading: boolean;
}

const TalkToHumanDataTable = ({
  columns,
  data,
  loading,
}: TalkToHumanDataTableProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-2xl mt-4">
      <Table className='rounded-2xl'>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className='rounded-tl-2xl rounded-tr-2xl border-b border-[#E9EAEB]'>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {
            loading ? <TableRow>
              <TableCell colSpan={3} className="space-y-2">
                <TableSkeleton />
              </TableCell>
            </TableRow> : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className='bg-white border-b border-[#E9EAEB]'>
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
            )
          }
        </TableBody>
      </Table>

      {/* <div className="text-primary-500 text-base font-medium mt-5 select-none underline flex justify-end mr-4">View all</div> */}
    </div>
  );
};

export default TalkToHumanDataTable;
