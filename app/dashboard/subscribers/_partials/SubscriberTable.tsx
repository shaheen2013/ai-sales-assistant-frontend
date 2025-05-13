"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/shadcn/table';
import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import React from 'react';
import { SubscriberTableColumnDataType } from './SubscriberTableColumn';
import ReactPaginate from 'react-paginate';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SubscriberTableProps {
    columns: ColumnDef<SubscriberTableColumnDataType, unknown>[];
    data: SubscriberTableColumnDataType[];
}

const SubscriberTable = ({
    columns,
    data,
}: SubscriberTableProps) => {
    const [sorting, setSorting] = React.useState<SortingState>([])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
    });

    return (
        <div className="rounded-2xl mt-4">
            <Table className='rounded-2xl'>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead
                                    key={header.id}
                                    className='rounded-tl-2xl rounded-tr-2xl text-[#2b3545]'
                                    style={{
                                        minWidth: header.column.columnDef.size,
                                        maxWidth: header.column.columnDef.size,
                                    }}
                                >
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
                                    <TableCell
                                        key={cell.id}
                                        className='text-[#555d6a] text-sm font-medium'
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

            <ReactPaginate
                pageCount={100}
                pageRangeDisplayed={2}
                marginPagesDisplayed={2}
                className='flex items-center mt-4 justify-end'
                pageClassName=' flex items-center justify-center rounded-lg text-gray-300 font-medium'
                pageLinkClassName='px-3.5 py-1'
                previousLabel={<ChevronLeft className='size-5 text-inherit' />}
                previousClassName='cursor-pointer text-gray-500 hover:text-gray-700 mr-2'
                nextLabel={<ChevronRight className='size-5 text-inherit' />}
                nextClassName='cursor-pointer text-gray-500 hover:text-gray-700'
                activeClassName='bg-primary-500 text-white'
            />
        </div>
    );
};

export default SubscriberTable;
