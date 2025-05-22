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
import { useDeleteDepartmentMutation } from '@/features/dealer/dealerManagementSlice';
import { useToast } from '@/hooks/useToast';
import { DepartmentDataType } from '@/types/dealerManagementSliceType';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { MoreVertical, Pencil, Trash } from 'lucide-react';
import Link from 'next/link';

const AllDepartmentsTable = ({
  departmentsData,
  isLoading,
  error,
}: {
  departmentsData: DepartmentDataType[];
  isLoading: boolean;
  error: any;
}) => {
  const toast = useToast();
  const [deleteDepartment, { isLoading: isDeleting }] =
    useDeleteDepartmentMutation();

  // Column definitions
  const departmentColumns: ColumnDef<DepartmentDataType>[] = [
    {
      accessorKey: 'department_name',
      header: 'Department Name',
      cell: ({ row }) => {
        return (
          <div className="font-medium text-[#374151]">
            <Link href={`/dashboard/management/${row.original.id}`}>
              {row.getValue('department_name')}
            </Link>
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

        const handleRemoveDeptInfo = async () => {
          try {
            await deleteDepartment(department.id).unwrap();
            toast('success', 'Department deleted successfully');
          } catch (error) {
            toast('error', 'Failed to delete department');
            console.error('Delete error:', error);
          }
        };

        const handleEditDeptInfo = () => {
          alert(`edit department info ${department.id}`);
        };
        // actions dropdown
        return (
          <div className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  disabled={isDeleting}
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={handleEditDeptInfo}
                  className="cursor-pointer text-sm font-semibold"
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={handleRemoveDeptInfo}
                  className="cursor-pointer text-red-500 text-sm font-semibold"
                  disabled={isDeleting}
                >
                  <Trash className="h-4 w-4 mr-2" />
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  // initialize table
  const table = useReactTable({
    data: departmentsData || [],
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
            {/* handle loading state */}
            {isLoading || isDeleting ? (
              <TableRow>
                <TableCell colSpan={7} className="space-y-2">
                  <TableSkeleton />
                </TableCell>
              </TableRow>
            ) : (
              <>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      className="border-b border-[#E9EAEB]"
                    >
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
              </>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AllDepartmentsTable;
