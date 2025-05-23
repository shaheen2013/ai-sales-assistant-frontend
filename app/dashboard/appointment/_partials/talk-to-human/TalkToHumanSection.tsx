"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/shadcn/dropdown-menu'
import { ArrowDownUp, ChevronDown } from 'lucide-react'
import React, { useState } from 'react'
import TalkToHumanDataTable from './TalkToHumanDataTable';
import { TalkToHumanColumnDataType, talkToHumanColumns } from './TalkToHumanColumns';
import { useGetTalkToHumanCallLogsQuery, useUpdateTalkToHumanStatusMutation } from '@/features/appointmentBooking/appointmentBookingSlice';
import Pagination from '@/components/pagination/Pagination';
import SimpleSelect from '@/components/select/SimpleSelect';

const talkToHumanDummyData: TalkToHumanColumnDataType[] = [
    {
        id: 1,
        name: 'John Doe',
        category: [
            {
                label: 'Car Buying',
                value: 'car_buying'
            },
            {
                label: 'Car Information',
                value: 'car_information'
            }
        ],
        schedule_date: 'Dec 1, 2025 | 4.30pm',
        priority: 'High',
    },
    {
        id: 2,
        name: 'Jane Smith',
        category: [
            {
                label: 'Suggestions',
                value: 'suggestions'
            },
            {
                label: 'Suggestions',
                value: 'suggestions'
            }
        ],
        schedule_date: 'Dec 1, 2025 | 4.30pm',
        priority: 'Medium',
    },
    {
        id: 3,
        name: 'Mike Brown',
        category: [
            {
                label: 'Car Buying',
                value: 'car_buying'
            },
            {
                label: 'Car Information',
                value: 'car_information'
            }
        ],
        schedule_date: 'Dec 1, 2025 | 4.30pm',
        priority: 'Low',
    }
]

const TalkToHumanSection = () => {
    /*--React State--*/
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState<string>('');

    /*--RTK Query--*/
    const { data: talkToHumanCallLogsData, isFetching: talkToHumanCallLogsIsFetching } = useGetTalkToHumanCallLogsQuery({
        limit: 10,
        offset: (page - 1) * 10,
        ...(sortBy && { sort_by: sortBy, order: "asc" }),
    });
    const [updateTalkToHumanStatus] = useUpdateTalkToHumanStatusMutation();

    /*--Functions--*/
    const handleChangeTalkStatus = (checked: boolean, id: number) => {
        const data = {
            is_talked: checked
        }
        updateTalkToHumanStatus({
            id, data, queryParams: {
                limit: 10,
                offset: (page - 1) * 10,
                ...(sortBy && { sort_by: sortBy, order: "asc" }),
            }
        });
    };

    return (
        <div>
            <h4 className="text-gray-400 text-xl font-semibold">Chat & Talk Appointment</h4>
            <div className="text-gray-300 text-sm font-normal mt-1">Automatically generated customer list based on AI-driven chats and calls for seamless follow-ups.</div>
            <div className="p-4 rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-50 mt-4">
                <div className='flex items-center justify-between'>
                    <div className="flex flex-col items-center gap-3">
                        <p className="px-2 inline-flex justify-start items-center gap-1 text-gray-400 text-base font-medium">
                            Talk to Human
                        </p>
                        <div className="w-full h-0 outline outline-1 outline-offset-[-0.50px] outline-primary-500" />
                    </div>

                    <SimpleSelect
                        options={[
                            {
                                label: 'Time',
                                value: 'created_at',
                            },
                            {
                                label: 'Preferred Date Time',
                                value: 'preferred_date_time',
                            }
                        ]}
                        placeholder="Sort By"
                        triggerClassName="[&>span]:text-primary-500 [&>div>svg]:text-primary-500"
                        value={sortBy}
                        onChange={setSortBy}
                    />
                </div>

                <TalkToHumanDataTable columns={talkToHumanColumns({ handleChangeTalkStatus })} data={talkToHumanCallLogsData?.results || []} loading={talkToHumanCallLogsIsFetching} />

                {
                    typeof talkToHumanCallLogsData?.count === 'number' && talkToHumanCallLogsData?.count > 10 &&
                    <Pagination
                        page={page}
                        onPageChange={setPage}
                        totalPage={Math.ceil(talkToHumanCallLogsData?.count / 10)}
                    />
                }
            </div>
        </div>
    )
}

export default TalkToHumanSection