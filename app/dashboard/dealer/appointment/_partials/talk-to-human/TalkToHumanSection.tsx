"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/shadcn/dropdown-menu'
import { ArrowDownUp, ChevronDown } from 'lucide-react'
import React from 'react'
import TalkToHumanDataTable from './TalkToHumanDataTable';
import { TalkToHumanColumnDataType, talkToHumanColumns } from './TalkToHumanColumns';

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

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className='p-2 rounded-lg shadow-[0px_1px_1px_0px_rgba(229,229,229,1.00)] outline outline-1 outline-offset-[-1px] outline-gray-20 text-gray-400 flex items-center gap-2 cursor-pointer'>
                                <ArrowDownUp className='text-inherit size-5' />
                                <p className="text-sm font-normal select-none">Sort by: Date Uploaded</p>
                                <ChevronDown className='text-inherit size-4' />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <p>Sort by</p>
                            <p>Sort by Date Uploaded</p>
                            <p>Sort by Date Created</p>
                            <p>Sort by Date Modified</p>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <TalkToHumanDataTable columns={talkToHumanColumns} data={talkToHumanDummyData} />

            </div>
        </div>
    )
}

export default TalkToHumanSection