import { Ellipsis } from 'lucide-react'
import React, { FC } from 'react'
import UpcomingAppointmentItem from './UpcomingAppointmentItem'
import { StoreVisitResponseType, TalkToHumanResponseType, TestDriveResponseType } from '@/types/appointmentBookingSliceType';
import moment from 'moment';

type UpcomingAppointmentListPropsType = {
    title: string;
    data: TalkToHumanResponseType[] | TestDriveResponseType[] | StoreVisitResponseType[];
}

const UpcomingAppointmentList: FC<UpcomingAppointmentListPropsType> = ({ data, title }) => {
    /*--Functions--*/
    const getAppoinmentTime = (item: TalkToHumanResponseType | TestDriveResponseType | StoreVisitResponseType) => {
        if ("preferred_date_time" in item) {
            return moment.utc(item?.preferred_date_time || "").format("hh:mm A");
        } else if ("prefered_time" in item) {
            return moment.utc(item?.prefered_time || "").format("hh:mm A");
        } else if ("start_at" in item) {
            return moment.utc(item?.start_at || "").format("hh:mm A");
        }
        return "";
    }

    const getCustomerName = (item: TalkToHumanResponseType | TestDriveResponseType | StoreVisitResponseType) => {
        if ("customer" in item) {
            return item?.customer?.name || "N/A";
        } else if ("name" in item) {
            return item?.name || "N/A";
        }
        return "N/A";
    }

    return (
        <div>
            <div className='flex items-center justify-between gap-[1.5px]'>
                <h6 className="text-gray-700 text-lg font-medium shrink-0 capitalize">{title}</h6>
                <div className='grow h-px bg-gray-50' />
            </div>
            <div className='mt-4 flex flex-col gap-[19px]'>
                {
                    data?.map((item, index) => <UpcomingAppointmentItem key={index} index={index} time={getAppoinmentTime(item)} title={getCustomerName(item)} />)
                }
            </div>
        </div>
    )
}

export default UpcomingAppointmentList