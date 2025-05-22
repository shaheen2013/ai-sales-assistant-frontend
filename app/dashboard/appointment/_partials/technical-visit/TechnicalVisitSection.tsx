"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/shadcn/dropdown-menu'
import { ArrowDownUp, ChevronDown } from 'lucide-react'
import React, { useState } from 'react'
import TechnicalVisitDataTable from './TechnicalVisitDataTable';
import { TechnicalVisitColumnsDataType, technicalVisitsColumns } from './TechnicalVisitColumns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { useGetTalkToHumanCallLogsQuery, useGetTestDriveQuery } from '@/features/appointmentBooking/appointmentBookingSlice';
import Pagination from '@/components/pagination/Pagination';
import SimpleSelect from '@/components/select/SimpleSelect';

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
    /*--React State--*/
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState<string>('');

    /*--RTK Query--*/
    const { data: testDriveData, isFetching: testDriveIsFetching } = useGetTestDriveQuery({
        limit: 10,
        offset: (page - 1) * 10,
        ...(sortBy && { sort_by: sortBy }),
    });
    return (
        <div>
            <h4 className="text-gray-400 text-xl font-semibold">Technical Visit</h4>
            <div className="text-gray-300 text-sm font-normal mt-1">AI-generated list of test drive appointments based on customer interactions for seamless scheduling.</div>
            <div className="p-4 rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-50 mt-4">
                <Tabs defaultValue='test_drive'>
                    <TabsList className='flex items-center justify-between gap-4'>
                        <div>
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
                    </TabsList>


                    <TabsContent value='store_visit'>
                        {/* <TechnicalVisitDataTable columns={technicalVisitsColumns} data={technicalVisitDummyData} /> */}
                    </TabsContent>
                    <TabsContent value='test_drive'>
                        <TechnicalVisitDataTable columns={technicalVisitsColumns} data={testDriveData?.results || []} loading={testDriveIsFetching} />
                    </TabsContent>
                </Tabs>

                {
                    testDriveData?.count && testDriveData?.count > 12 &&
                    <Pagination
                        page={page}
                        onPageChange={setPage}
                        totalPage={Math.ceil(testDriveData?.count / 10)}
                    />
                }
            </div>
        </div>
    )
}

export default TechnicalVisitSection