import React from 'react'
import { Skeleton } from '../shadcn/skeleton'

const DealerMinutePlanSkeleton = () => {
    return (
        <div className="grid lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, index) => (
                <div
                    key={index}
                    className="border rounded-xl p-4 animate-pulse space-y-4"
                >
                    {/* top row */}
                    <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-5 w-5 rounded-full" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                        <Skeleton className="h-5 w-5 rounded-sm" />
                    </div>

                    {/* price row */}
                    <div className="flex items-end gap-2">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-4 w-12" />
                    </div>

                    {/* description row */}
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-3 w-3 rounded-full" />
                        <Skeleton className="h-4 w-40" />
                    </div>

                    {/* footer row */}
                    <Skeleton className="h-4 w-32" />
                </div>
            ))}
        </div>
    )
}

export default DealerMinutePlanSkeleton