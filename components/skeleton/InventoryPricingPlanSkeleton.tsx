import React from 'react'
import { Skeleton } from '../shadcn/skeleton'

const InventoryPricingPlanSkeleton = () => {
  return (
    <div className="flex w-full border border-gray-100 rounded-xl py-4 px-4 gap-3 flex-col animate-pulse">
    <div className="flex gap-3">
        {/* Radio circle */}
        <Skeleton className="h-4 w-4 rounded-full mt-1" />

        <div className="flex justify-between w-full">
            {/* Title & Description */}
            <div>
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-4 w-40" />
            </div>

            {/* Price */}
            <div className="text-right">
                <Skeleton className="h-6 w-12 mb-1 ml-auto" />
                <Skeleton className="h-6 w-16 ml-auto" />
            </div>
        </div>
    </div>

    {/* Benefits */}
    <div className="pl-[25px] space-y-2 mt-2">
        <Skeleton className="h-3 w-64" />
        <Skeleton className="h-3 w-60" />
        <Skeleton className="h-3 w-56" />
    </div>
</div>
  )
}

export default InventoryPricingPlanSkeleton