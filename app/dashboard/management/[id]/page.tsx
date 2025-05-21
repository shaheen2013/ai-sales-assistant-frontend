'use client';
import DepartmentDetailsTable from '@/components/partials/dashboard/management/department-details-table';
import { Button } from '@/components/shadcn/button';
import { useGetDepartmentByIdQuery } from '@/features/dealer/dealerManagementSlice';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const DepartmentDetailsPage = () => {
  const params = useParams();
  const id = params.id as string;

  const { data: department, isLoading, error } = useGetDepartmentByIdQuery(id);

  console.log('department', department);
  console.log('error', error);
  return (
    <div className="flex flex-col gap-6 border rounded-2xl p-4 border-[#EAEBEC]">
      <Link href="/dashboard/management">
        <Button variant="outline" className="text-gray-500 text-base">
          <ChevronLeft className="size-4" />
          Back
        </Button>
      </Link>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl text-gray-500 font-semibold">
          {isLoading
            ? 'Loading...'
            : department?.data?.department_name || 'Department Name'}
        </h2>
        <p className="text-gray-600 text-[18px] font-medium flex items-center gap-2">
          Total Employees:{' '}
          <span className="size-9 flex items-center justify-center rounded-xl border border-[#D5D7DA] bg-white">
            {isLoading ? '-' : department?.data?.employees?.length || 0}
          </span>
        </p>
      </div>
      <div className="">
        {isLoading ? (
          <div>Loading department details...</div>
        ) : error ? (
          <div className="text-red-500 text-sm font-medium">
            {error.data.message + '!!' || 'Error Loading Department Details'}
          </div>
        ) : (
          <DepartmentDetailsTable
            departmentEmployees={department?.data?.employees || []}
          />
        )}
      </div>
    </div>
  );
};

export default DepartmentDetailsPage;
