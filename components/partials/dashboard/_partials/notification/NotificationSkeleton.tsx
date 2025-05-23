import { Skeleton } from '@/components/shadcn/skeleton'
import React from 'react'


const NotificationSkeleton = () => {
  return (
    <div className='flex items-center gap-4 w-full'>
        <div>
            <Skeleton className='w-10 h-10 rounded-full' />
        </div>
        <div className='flex flex-col gap-2 grow'>
            <Skeleton className='w-1/2 h-4' />
            <Skeleton className='w-full h-4' />
        </div>
    </div>
  )
}

export default NotificationSkeleton