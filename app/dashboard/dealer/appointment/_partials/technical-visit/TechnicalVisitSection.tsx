"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/shadcn/dropdown-menu'
import { ArrowDownUp, ChevronDown } from 'lucide-react'
import React from 'react'
import TechnicalVisitDataTable from './TechnicalVisitDataTable';
import { TechnicalVisitColumnsDataType, technicalVisitsColumns } from './TechnicalVisitColumns';
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs';

const technicalVisitDummyData: TechnicalVisitColumnsDataType[] = [
    {
        id: 1,
        name: 'John Doe',
        schedule_date: 'Dec 1, 2025 | 4.30pm',
        priority: 'High',
    },
    {
        id: 2,
        name: 'Jane Smith',
        schedule_date: 'Dec 1, 2025 | 4.30pm',
        priority: 'Medium',
    },
    {
        id: 3,
        name: 'Mike Brown',
        schedule_date: 'Dec 1, 2025 | 4.30pm',
        priority: 'Low',
    }
]

const TechnicalVisitSection = () => {

    return (
        <div>
            <h4 className="text-gray-400 text-xl font-semibold">Technical Visit</h4>
            <div className="text-gray-300 text-sm font-normal mt-1">AI-generated list of test drive appointments based on customer interactions for seamless scheduling.</div>
            <div className="p-4 rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-50 mt-4">
                <div className='flex items-center justify-between'>
                    {/* <div className="flex flex-col items-center gap-3">
                        <p className="px-2 inline-flex justify-start items-center gap-1 text-gray-400 text-base font-medium">
                            Talk to Human
                        </p>
                        <div className="w-full h-0 outline outline-1 outline-offset-[-0.50px] outline-primary-500" />
                    </div> */}
                    <Tabs defaultValue='store_visit'>
                        <TabsList className='flex items-center gap-4'>
                            <TabsTrigger value="test_drive" className='border-b-2 border-b-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-primary-500 pb-3 transition-all group/technicalVisitTabs'>
                                <div className="flex flex-col items-center gap-3">
                                    <p className="px-2 inline-flex justify-start items-center gap-1 text-gray-300 font-normal group-[&[data-state=active]]/technicalVisitTabs:text-gray-400 text-base group-[&[data-state=active]]/technicalVisitTabs:font-medium">
                                        Test Drive
                                    </p>
                                </div>
                            </TabsTrigger>
                            <TabsTrigger value="store_visit" className='border-b-2 border-b-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-primary-500 pb-3 transition-all group/technicalVisitTabs'>
                                <div className="flex flex-col items-center gap-3">
                                    <p className="px-2 inline-flex justify-start items-center gap-1 text-gray-300 font-normal group-[&[data-state=active]]/technicalVisitTabs:text-gray-400 text-base group-[&[data-state=active]]/technicalVisitTabs:font-medium">
                                        Store Visit
                                    </p>
                                </div>
                            </TabsTrigger>
                        </TabsList>
                        
                    </Tabs>

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

                <TechnicalVisitDataTable columns={technicalVisitsColumns} data={technicalVisitDummyData} />
            </div>
        </div>
    )
}

export default TechnicalVisitSection