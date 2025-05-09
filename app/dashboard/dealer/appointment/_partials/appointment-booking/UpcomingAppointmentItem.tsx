import React, { FC } from 'react'

const barColors = ["#2196f3", "#ffb056", "#654ce6"];

type UpcomingAppointmentItemPropsType = {
    index: number;
    time: string;
    topic: string;
    title: string;
}

const UpcomingAppointmentItem: FC<UpcomingAppointmentItemPropsType> = ({ index, time, title, topic }) => {
    return (
        <div className='flex items-center gap-6'>
            <div className="text-gray-200 text-lg font-medium">{time}</div>
            <div className={`w-0 h-10 outline outline-4 outline-offset-[-2px]`} style={{ outlineColor: barColors[index % barColors.length] }} />
            <div className='flex flex-col'>
                <p className="text-gray-200 text-sm">{topic}</p>
                <p className="text-gray-700 text-base font-medium">{title}</p>
            </div>
        </div>
    )
}

export default UpcomingAppointmentItem