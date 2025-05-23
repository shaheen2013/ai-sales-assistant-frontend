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
import { useRemoveEmployeeFromDepartmentMutation } from '@/features/dealer/dealerManagementSlice';
import { useToast } from '@/hooks/useToast';
import { handleApiError } from '@/lib/utils';
import {
  EmployeeDataType,
  RoutingType,
} from '@/types/dealerManagementSliceType';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { MoreVertical, Pencil, Trash } from 'lucide-react';
import { useState } from 'react';
import EditEmployeeModal from './edit-employee-modal';

interface DepartmentDetailsTableProps {
  departmentEmployees: EmployeeDataType[];
  isLoading: boolean;
  isError: any;
  departmentId: string;
}

const DepartmentDetailsTable = ({
  departmentEmployees = [],
  isLoading,
  isError,
  departmentId,
}: DepartmentDetailsTableProps) => {
  // edit employee modal
  const [openEditEmployeeModal, setOpenEditEmployeeModal] = useState(false);
  const [employeeData, setEmployeeData] = useState<EmployeeDataType | null>(
    null
  );
  const toast = useToast();
  const [removeEmployeeFromDepartment, { isLoading: isDeleting }] =
    useRemoveEmployeeFromDepartmentMutation();

  // Column definitions
  const departmentColumns: ColumnDef<EmployeeDataType>[] = [
    {
      accessorKey: 'name',
      header: 'Employee Name',
      cell: ({ row }) => {
        return (
          <div className="font-medium text-[#374151]">
            {row.getValue('name')}
          </div>
        );
      },
    },
    {
      accessorKey: 'routing_type',
      header: 'Routing Type',
      cell: ({ row }) => {
        const routing_type: RoutingType = row.getValue('routing_type');
        return <div className="text-[#374151]">{routing_type}</div>;
      },
    },
    {
      accessorKey: 'phone_number',
      header: () => <div className="text-center">Phone Number</div>,
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
        const handleRemoveEmployee = async () => {
          try {
            await removeEmployeeFromDepartment({
              id: departmentId,
              employeeId: String(employee.id),
            });
            toast('success', 'Employee removed successfully');
          } catch (error: any) {
            toast('error', handleApiError(error));
          }
        };

        const handleEditEmployee = (emp: EmployeeDataType) => {
          setEmployeeData(emp);
          setOpenEditEmployeeModal(true);
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
                  onClick={() => handleEditEmployee(employee)}
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
                    className={`font-medium text-[#6b7280] border-b border-[#E9EAEB]`}
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
            {isLoading || isDeleting ? (
              <TableRow>
                <TableCell
                  colSpan={departmentColumns.length}
                  className="h-24 text-center space-y-2"
                >
                  <TableSkeleton />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
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
                  {isError ? (
                    <div className="text-red-500 text-sm font-medium">
                      {isError?.data?.message ||
                        'Error Loading Department Details'}
                    </div>
                  ) : (
                    <div className="text-gray-500 text-sm font-medium">
                      No employees found in this department.
                    </div>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* edit employee modal */}
      <EditEmployeeModal
        open={openEditEmployeeModal}
        onOpenChange={setOpenEditEmployeeModal}
        employeeData={employeeData as EmployeeDataType}
        departmentId={departmentId}
      />
    </div>
  );
};

export default DepartmentDetailsTable;
