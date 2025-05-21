import DepartmentDetailsTable from '@/components/partials/dashboard/management/department-details-table';

const DepartmentDetailsPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { id } = await params;
  console.log({ id });
  return (
    <div className="flex flex-col gap-4 border rounded-2xl p-4 border-[#EAEBEC]">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl text-gray-500 font-semibold">
          All the departments
        </h2>
        <p className="text-gray-500 text-[18px] font-medium flex items-center gap-2">
          Total Employees:{' '}
          <span className=" size-8 flex items-center justify-center rounded-xl border border-gray-200 bg-slate-100">
            {id}
          </span>
        </p>
      </div>
      <div className="">
        <DepartmentDetailsTable />
      </div>
    </div>
  );
};

export default DepartmentDetailsPage;
