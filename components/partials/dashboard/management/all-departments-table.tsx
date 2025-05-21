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
import TableSkeleton from '@/components/skeleton/TableSkeleton';
import { useGetDepartmentsQuery } from '@/features/dealer/dealerManagementSlice';
import { DepartmentDataType } from '@/types/dealerManagementSliceType';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Eye, MoreVertical, Trash } from 'lucide-react';
import Link from 'next/link';

// Column definitions
export const departmentColumns: ColumnDef<DepartmentDataType>[] = [
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
    accessorKey: 'employees',
    header: 'Number of Employees',
    headerClassName: 'text-center ',
    cell: ({ row }) => {
      return (
        <div className="text-[#374151] text-center">
          {row.getValue('employees').length}
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: () => <div className="text-right">Action</div>,
    cell: ({ row }) => {
      const department = row.original;

      const handleRemoveDeptInfo = () => {
        console.log(`Remove department ${department.id}`);
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
              <Link href={`/dashboard/management/${department.id}`}>
                <DropdownMenuItem className="cursor-pointer text-sm font-semibold">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                onClick={handleRemoveDeptInfo}
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

const AllDepartmentsTable = () => {
  const { data: departmentsData, isLoading, error } = useGetDepartmentsQuery();
  console.log('departments', departmentsData);
  //   const [departments, setDepartments] = useState<DepartmentData[]>([
  //     {
  //       id: 1,
  //       department_name: 'Sales',
  //       department_email: 'sales@gmail.com',
  //       number_of_employees: '2',
  //     },
  //     {
  //       id: 2,
  //       department_name: 'Finance',
  //       department_email: 'finance@gmail.com',
  //       number_of_employees: '20',
  //     },
  //     {
  //       id: 3,
  //       department_name: 'Customer Support',
  //       department_email: 'customer_support@gmail.com',
  //       number_of_employees: '12',
  //     },
  //     {
  //       id: 4,
  //       department_name: 'Technical',
  //       department_email: 'technical@gmail.com',
  //       number_of_employees: '10',
  //     },
  //   ]);

  const table = useReactTable({
    data: departmentsData?.data || [],
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
            {/* if loading */}
            {isLoading && (
              <TableRow>
                <TableCell colSpan={7} className="space-y-2">
                  <TableSkeleton />
                </TableCell>
              </TableRow>
            )}
            {/* if data found */}
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
                {/* if error || no data found */}
                <TableCell
                  colSpan={departmentColumns.length}
                  className="h-24 text-center animate-pulse text-red-500 font-medium"
                >
                  {error?.data?.message}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AllDepartmentsTable;
