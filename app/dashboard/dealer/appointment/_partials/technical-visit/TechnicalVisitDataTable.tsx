"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/shadcn/table';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React from 'react';
import { TechnicalVisitColumnsDataType } from './TechnicalVisitColumns';

interface TechnicalVisitDataTableProps {
  columns: ColumnDef<TechnicalVisitColumnsDataType, unknown>[];
  data: TechnicalVisitColumnsDataType[];
}

const TechnicalVisitDataTable = ({
  columns,
  data,
}: TechnicalVisitDataTableProps) => {
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
          {table.getRowModel().rows?.length ? (
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
          )}
        </TableBody>
      </Table>

      <div className="text-primary-500 text-base font-medium mt-5 select-none underline flex justify-end mr-4">View all</div>
    </div>
  );
};

export default TechnicalVisitDataTable;
