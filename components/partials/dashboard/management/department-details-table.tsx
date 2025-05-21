'use client';

import { Button } from '@/components/shadcn/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shadcn/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shadcn/table';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { MoreVertical, Pencil, Trash } from 'lucide-react';

interface Employee {
  id: number;
  name: string;
  routing_type: 'MOBILE' | 'OFFICE';
  phone_number: string;
}

export type DepartmentData = {
  id: number;
  name: string;
  routing_type: 'MOBILE' | 'OFFICE';
  phone_number: string;
};

// Column definitions
export const departmentColumns: ColumnDef<DepartmentData>[] = [
  {
    accessorKey: 'name',
    header: 'Employee Name',
    cell: ({ row }) => {
      return (
        <div className="font-medium text-[#374151]">{row.getValue('name')}</div>
      );
    },
  },
  {
    accessorKey: 'routing_type',
    header: 'Routing Type',
    cell: ({ row }) => {
      const routing_type: string = row.getValue('routing_type');
      return <div className="text-[#374151]">{routing_type}</div>;
    },
  },
  {
    accessorKey: 'phone_number',
    header: 'Phone Number',
    headerClassName: 'text-center',
    cell: ({ row }) => {
      return (
        <div className="text-[#374151] text-center">
          {row.getValue('phone_number')}
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: () => <div className="text-right">Action</div>,
    cell: ({ row }) => {
      const employee = row.original;

      // These functions would be passed as props in a real implementation
      const handleEditEmployee = () => {
        console.log(`Edit employee ${employee.id}`);
      };

      const handleRemoveEmployee = () => {
        console.log(`Remove employee ${employee.id}`);
      };

      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={handleEditEmployee}
                className="cursor-pointer text-sm font-semibold"
              >
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleRemoveEmployee}
                className="cursor-pointer text-red-500 text-sm font-semibold"
              >
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

interface DepartmentDetailsTableProps {
  departmentEmployees: Employee[];
}

const DepartmentDetailsTable = ({
  departmentEmployees = [],
}: DepartmentDetailsTableProps) => {
  const table = useReactTable({
    data: departmentEmployees,
    columns: departmentColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full">
      <div className="rounded-2xl overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-[#f9fafb]">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={`font-medium text-[#6b7280] border-b border-[#E9EAEB] ${
                      header.column.columnDef.headerClassName || ''
                    }`}
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
          <TableBody className="bg-white">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="border-b border-[#E9EAEB]">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-sm bg-white">
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
                  colSpan={departmentColumns.length}
                  className="h-24 text-center"
                >
                  No employees found in this department.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DepartmentDetailsTable;
