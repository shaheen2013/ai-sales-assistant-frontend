import { cn } from '@/lib/utils'
import { LoaderCircle } from 'lucide-react'
import React, { FC } from 'react'

type SpinnerPropsType = {
    className: string;
}

const Spinner:FC<SpinnerPropsType> = ({className}) => {
  return (
    <LoaderCircle className={
        cn(
            'animate-spin text-primary-500 size-6',
            className
        )
    } />
  )
}

export default Spinner