import { Skeleton } from "../shadcn/skeleton";

export default function DealerDashboardOverviewSkeleton() {
  return (
    <div>
      {/* cards */}
      <div className="grid xl:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-3 mb-4">
        {/* left card */}
        <div className="p-4 rounded-xl bg-[#E5DCFA] flex justify-between">
          <div>
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="flex items-center gap-3">
            <div className="border-r-2 border-white pr-3">
              <Skeleton className="h-3 w-20 mb-1" />
              <Skeleton className="h-5 w-24" />
            </div>
            <div>
              <Skeleton className="h-3 w-20 mb-1" />
              <Skeleton className="h-5 w-24" />
            </div>
          </div>
        </div>

        {/* right card */}
        <div className="p-4 rounded-xl bg-[#DDF2F6] flex justify-between">
          <div>
            <Skeleton className="h-4 w-36 mb-2" />
            <Skeleton className="h-6 w-20" />
          </div>
          <div className="flex items-center gap-3">
            <div className="border-r-2 border-white pr-3">
              <Skeleton className="h-3 w-20 mb-1" />
              <Skeleton className="h-5 w-24" />
            </div>
            <div>
              <Skeleton className="h-8 w-24 rounded-md" />
            </div>
          </div>
        </div>
      </div>

      {/* audio & voice section */}
      <div className="gap-4 grid lg:grid-cols-2 mb-4">
        {/* Number for AI Call */}
        <div className="order-2 lg:order-1 border rounded-xl p-4">
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-4 w-64 mb-4" />
          <Skeleton className="h-px w-full mb-6 bg-gray-300" />
          <div className="flex items-center justify-center gap-2 mb-2">
            <Skeleton className="h-10 w-40" />
          </div>
          <Skeleton className="h-5 w-36 mx-auto mb-2" />
          <Skeleton className="h-4 w-48 mx-auto" />
        </div>

        {/* Set Voice for AI Call */}
        <div className="order-1 lg:order-2 border rounded-xl p-4">
          <Skeleton className="h-6 w-52 mb-2" />
          <Skeleton className="h-4 w-64 mb-6" />
          <Skeleton className="h-10 w-full mb-4 rounded-md" />
          <div className="flex items-center gap-4 mb-2">
            <Skeleton className="h-20 flex-1" />
            <Skeleton className="h-12 w-12 rounded-full" />
          </div>
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
    </div>
  );
}
