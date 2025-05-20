import Button from '@/components/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import AddDepartmentModal from './add-department-modal';
import ManageOwnershipTable from './manage-ownership-table';

const ManageOwnershipSection = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-[#EAEBEC] p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl text-gray-500 font-semibold">
          Add member and role
        </h2>
        <Button
          variant="outline-gray"
          size="sm"
          className="text-gray-400"
          onClick={() => setOpenModal(true)}
        >
          <Plus className="font-light text-gray-400" />
          Add Department
        </Button>
      </div>
      <div>
        <ManageOwnershipTable />
      </div>
      {/* Action Buttons */}
      <div className="flex justify-start space-x-3 sm:space-x-4 mt-4">
        <Button
          type="button"
          variant="outline-gray"
          className="border-[#d5d7da] text-gray-500 text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2"
          onClick={() => {
            // form.reset();
            // toast('success', 'Changes removed!');
            console.log('discard');
          }}
        >
          Discard
        </Button>
        <Button
          type="submit"
          className="bg-[#019935] hover:bg-[#018a30] text-white text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2"
        >
          {isUpdating ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
      {/* Dialog */}
      <AddDepartmentModal open={openModal} onOpenChange={setOpenModal} />
    </div>
  );
};

export default ManageOwnershipSection;
