import React from 'react'
import { Skeleton } from '../shadcn/skeleton'


const DealerCallHistoryStatsSkeleton = () => {
  return (
    <div className="border rounded-xl p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <Skeleton className="h-6 w-40 mb-2" />
          <Skeleton className="h-4 w-80" />
        </div>
      </div>

      <hr />

      {/* Content */}
      <div className="grid grid-cols-12 items-center mt-6 gap-4">
        {/* Left Summary Section */}
        <div className="col-span-12 xl:col-span-2 space-y-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-40" />
          <div className="flex gap-2 items-start mt-4">
            <Skeleton className="h-3 w-3 rounded-full mt-1" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-5 w-28" />
            </div>
          </div>
        </div>

        {/* Right Chart Section */}
        <div className="col-span-12 xl:col-span-10">
          <Skeleton className="w-full h-[347px] rounded-md" />
        </div>
      </div>
    </div>
  )
}

export default DealerCallHistoryStatsSkeleton