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
import { useState } from 'react';

export type DepartmentData = {
  id: number;
  name: string;
  role: any;
  phone: string;
};

// todo: fix type here for role and color

// Function to determine badge color based on role
const getRoleBadgeColor = (role: any): any => {
  switch (role) {
    case 'Finance Advisor':
      return 'orange';
    case 'Sales Representative':
      return 'blue';
    case 'Technical Advisor':
      return 'purple';
    case 'Customer Support Agent':
      return 'green';
    default:
      return 'gray';
  }
};

// Column definitions
export const departmentColumns: ColumnDef<DepartmentData>[] = [
  {
    accessorKey: 'department_name',
    header: 'Department Name',
    cell: ({ row }) => {
      return (
        <div className="font-medium text-[#374151]">
          {row.getValue('department_name')}
        </div>
      );
    },
  },
  {
    accessorKey: 'department_email',
    header: 'Department Email',
    cell: ({ row }) => {
      const department_email: string = row.getValue('department_email');
      return <div className="text-[#374151]">{department_email}</div>;
    },
  },
  {
    accessorKey: 'number_of_employees',
    header: 'Number of Employees',
    headerClassName: 'text-center',
    cell: ({ row }) => {
      return (
        <div className="text-[#374151] text-center">
          {row.getValue('number_of_employees')}
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: () => <div className="text-right">Action</div>,
    cell: ({ row }) => {
      const owner = row.original;

      // These functions would be passed as props in a real implementation
      const handleEditOwner = () => {
        console.log(`Edit owner ${owner.id}`);
      };

      const handleRemoveOwner = () => {
        console.log(`Remove owner ${owner.id}`);
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
                onClick={handleEditOwner}
                className="cursor-pointer text-sm font-semibold"
              >
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleRemoveOwner}
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

const DepartmentDetailsTable = () => {
  const [departments, setDepartments] = useState<DepartmentData[]>([
    {
      id: 1,
      department_name: 'Sales',
      department_email: 'sales@gmail.com',
      number_of_employees: '2',
    },
    {
      id: 2,
      department_name: 'Finance',
      department_email: 'finance@gmail.com',
      number_of_employees: '20',
    },
    {
      id: 3,
      department_name: 'Customer Support',
      department_email: 'customer_support@gmail.com',
      number_of_employees: '12',
    },
    {
      id: 4,
      department_name: 'Technical',
      department_email: 'technical@gmail.com',
      number_of_employees: '10',
    },
  ]);

  const table = useReactTable({
    data: departments,
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
                  No results.
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
