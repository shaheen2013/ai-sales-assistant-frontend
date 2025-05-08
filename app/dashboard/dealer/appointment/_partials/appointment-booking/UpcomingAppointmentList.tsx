import { Ellipsis } from 'lucide-react'
import React from 'react'
import UpcomingAppointmentItem from './UpcomingAppointmentItem'

const UpcomingAppointmentList = () => {
    return (
        <div>
            <div className='flex items-center justify-between gap-[1.5px]'>
                <h6 className="text-gray-700 text-lg font-medium shrink-0">9 March</h6>
                <div className='grow h-px bg-gray-50' />
                <Ellipsis className='size-5 text-gray-200 shrink-0' />
            </div>
            <div className='mt-4 flex flex-col gap-[19px]'>
                {
                    Array.from({ length: 3 }).map((item, index) => <UpcomingAppointmentItem key={index} index={index} time="10:00 AM" title="Customer Name" topic="Test Drive" />)
                }
            </div>
        </div>
    )
}

export default UpcomingAppointmentList