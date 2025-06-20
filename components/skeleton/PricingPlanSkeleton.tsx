import { Skeleton } from "@/components/shadcn/skeleton";

const PricingPlanSkeleton = () => {
  return (
    <div className="space-y-6">
      {[1, 2].map((item) => (
        <div
          key={item}
          className="border rounded-xl p-6 flex flex-col md:items-center md:justify-between"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-4 w-3/4 mb-4 mt-2" />
            </div>
            <div className="py-2">
              <div className="flex items-start">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-32 ml-2" />
              </div>
            </div>
          </div>
          <div className="w-full">
            <hr className="border-t border-[#eaebec] my-4" />
            <div className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PricingPlanSkeleton;
