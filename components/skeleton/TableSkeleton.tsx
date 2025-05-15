import React from 'react'
import { Skeleton } from '../shadcn/skeleton'


const TableSkeleton = () => {
    return (
        <>
            <Skeleton className='h-8 w-full' />
            <Skeleton className='h-8 w-full' />
            <Skeleton className='h-8 w-full' />
        </>
    )
}

export default TableSkeleton