'use client';
import AddPeopleInDepartmentModal from '@/components/partials/dashboard/management/department-details/add-people-in-department-modal';
import DepartmentDetailsTable from '@/components/partials/dashboard/management/department-details/department-details-table';
import { Button } from '@/components/shadcn/button';
import { useGetDepartmentByIdQuery } from '@/features/dealer/dealerManagementSlice';
import { ChevronLeft, Mail, Plus } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

const DepartmentDetailsPage = () => {
  const params = useParams();
  const id = params.id as string;
  const { data: department, isLoading, error } = useGetDepartmentByIdQuery(id);
  const [openAddEmployeeModal, setOpenAddEmployeeModal] = useState(false);
  return (
    <div className="flex flex-col gap-6 border rounded-2xl p-4 border-[#EAEBEC]">
      {/* back button and add employee button */}
      <div className="flex items-center justify-between">
        <Link href="/dashboard/management">
          <Button variant="outline" className="text-gray-500 text-base">
            <ChevronLeft className="size-4" />
            Back
          </Button>
        </Link>
        <Button
          variant="outline"
          onClick={() => {
            setOpenAddEmployeeModal(!openAddEmployeeModal);
          }}
          className="text-gray-500 text-base"
        >
          <Plus className="size-4" />
          Add Employee
        </Button>
      </div>
      {/* department name and email */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl text-gray-500 font-semibold">
            {department?.data?.department_name || 'Department Name'}
          </h2>
          <p className="text-gray-500 text-sm flex items-center gap-1">
            <Mail className="size-4" />
            {department?.data?.department_email || 'Department Email'}
          </p>
        </div>
        <p className="text-gray-600 text-[18px] font-medium flex items-center gap-2">
          Total Employees:{' '}
          <span className="size-9 flex items-center justify-center rounded-xl border border-[#D5D7DA] bg-white">
            {isLoading ? '0' : department?.data?.employees?.length || 0}
          </span>
        </p>
      </div>
      {/* department details table */}
      <DepartmentDetailsTable
        isLoading={isLoading}
        isError={error}
        departmentEmployees={department?.data?.employees || []}
      />
      {/* add people in department modal */}
      <AddPeopleInDepartmentModal
        open={openAddEmployeeModal}
        onOpenChange={setOpenAddEmployeeModal}
        departmentId={id}
      />
    </div>
  );
};

export default DepartmentDetailsPage;
