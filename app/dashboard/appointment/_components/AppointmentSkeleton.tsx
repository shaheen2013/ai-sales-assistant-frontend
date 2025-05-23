import { Skeleton } from '@/components/shadcn/skeleton'
import React from 'react'

const AppointmentSkeleton = () => {
    return (
        <div>
            <div className='flex items-center justify-between gap-[1.5px]'>
                <Skeleton className='w-1/4 h-5' />
                <div className='grow h-px bg-gray-50' />
            </div>
            <div className='mt-4 flex flex-col gap-3'>
                {
                    Array.from({ length: 2 }).map((_, index) => (
                        <div className='flex items-center gap-4' key={index}>
                            <Skeleton className='w-[120px] h-[28px]' />
                            <Skeleton className={`w-2 h-14`} />
                            <div className='flex flex-col grow gap-2'>
                                <Skeleton className='w-full h-6' />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default AppointmentSkeleton