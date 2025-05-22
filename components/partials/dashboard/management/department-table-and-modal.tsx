'use client';
import { Button } from '@/components/shadcn/button';
import { useGetDepartmentsQuery } from '@/features/dealer/dealerManagementSlice';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import AddNewDepartmentModal from './add-new-department-modal';
import AllDepartmentsTable from './all-departments-table';

const DepartmentTableAndModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const { data: departmentsData, isLoading, error } = useGetDepartmentsQuery();
  console.log(departmentsData, 'departmentsData >');
  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-[#EAEBEC] p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl text-gray-500 font-semibold">
          All the departments
        </h2>
        <Button
          variant="outline"
          className="text-gray-400"
          onClick={() => setOpenModal(true)}
        >
          <Plus className="font-light text-gray-400" />
          Add Department
        </Button>
      </div>
      <div>
        <AllDepartmentsTable
          departmentsData={departmentsData?.data || []}
          isLoading={isLoading}
          error={error}
        />
      </div>
      {/* Dialog */}
      <AddNewDepartmentModal
        open={openModal}
        onOpenChange={setOpenModal}
        allDepartments={departmentsData?.data || []}
      />
    </div>
  );
};

export default DepartmentTableAndModal;
