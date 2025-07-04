"use client";

import React, { useState } from 'react'
import TestDriveDataTable from './TestDriveDataTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { useGetStoreVisitQuery, useGetTestDriveQuery, useGetTradeInQuery, useUpdateStoreVisitStatusMutation, useUpdateTestDriveBookingStatusMutation, useUpdateTradeInVisitStatusMutation } from '@/features/appointmentBooking/appointmentBookingSlice';
import Pagination from '@/components/pagination/Pagination';
import SimpleSelect from '@/components/select/SimpleSelect';
import StoreVisitDataTable from '../store-visit/StoreVisitDataTable';
import { storeVisitColumns } from '../store-visit/StoreVisitColumns';
import { testDriveVisitsColumns } from './TestDriveVisitColumns';
import TradeInDataTable from '../trade-in/TradeInDataTable';
import { tradeInColumns } from '../trade-in/TradeInColumn';
import { useRouter, useSearchParams } from 'next/navigation';


const technicalVisitSortOptions = [
    {
        label: 'Time',
        value: 'created_at',
    },
    {
        label: 'Preferred Date Time',
        value: 'preferred_date_time',
    }
]

const tradeInSortOptions = [
    {
        label: 'Request Time',
        value: 'created_at',
    },
]


const TechnicalVisitSection = () => {
    /*--Next Hooks--*/
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentTab = searchParams.get("tab");

    /*--React State--*/
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState<string>('');
    const [filterBy, setFilterBy] = useState<string>('');
    const [tab, setTab] = useState(currentTab || 'test_drive');

    /*--RTK Query--*/
    const { data: testDriveData, isFetching: testDriveIsFetching } = useGetTestDriveQuery({
        limit: 10,
        offset: (page - 1) * 10,
        ...(sortBy && { sort_by: sortBy }),
        ...(filterBy && { medium: filterBy })
    }, { skip: tab !== "test_drive" });
    const { data: storeVisitData, isFetching: storeVisitIsFetching } = useGetStoreVisitQuery({
        limit: 10,
        offset: (page - 1) * 10,
        ...(sortBy && { sort_by: sortBy }),
        ...(filterBy && { medium: filterBy })
    }, { skip: tab !== "store_visit" });
    const { data: tradeInData, isFetching: tradeInIsFetching } = useGetTradeInQuery({
        limit: 10,
        offset: (page - 1) * 10,
        ...(sortBy && { sort_by: sortBy }),
        ...(filterBy && { medium: filterBy })
    }, { skip: tab !== "trade_in" });
    const [updateStoreVisitStatus] = useUpdateStoreVisitStatusMutation();
    const [updateTestDriveBookingStatus] = useUpdateTestDriveBookingStatusMutation();
    const [updateTradeInVisitStatus] = useUpdateTradeInVisitStatusMutation();

    /*--Functions--*/
    const handleChangeVisitStatus = (checked: boolean, id: number) => {
        const data = {
            is_visited: checked
        }
        updateStoreVisitStatus({
            id, data, queryParams: {
                limit: 10,
                offset: (page - 1) * 10,
                ...(sortBy && { sort_by: sortBy }),
                ...(filterBy && { medium: filterBy })
            }
        });
    }

    const handleChangeBookingStatus = (status: string, id: number) => {
        const data = {
            booking_status: status
        }
        updateTestDriveBookingStatus({
            id,
            data,
            queryParams: {
                limit: 10,
                offset: (page - 1) * 10,
                ...(sortBy && { sort_by: sortBy }),
                ...(filterBy && { medium: filterBy })
            }
        });
    }

    const handleChangeTradeInVisitStatus = (checked: boolean, id: number) => {
        const data = {
            is_visited: checked
        }
        updateTradeInVisitStatus({
            id, data, queryParams: {
                limit: 10,
                offset: (page - 1) * 10,
                ...(sortBy && { sort_by: sortBy }),
                ...(filterBy && { medium: filterBy })
            }
        });
    }


    return (
        <div>
            <h4 className="text-gray-400 text-xl font-semibold">Technical Visit</h4>
            <div className="text-gray-300 text-sm font-normal mt-1">AI-generated list of test drive appointments based on customer interactions for seamless scheduling.</div>
            <div className="p-4 rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-50 mt-4">
                <Tabs value={tab} onValueChange={(value) => {
                    setTab(value);
                    setPage(1);
                    router.push(`/dashboard/appointment?tab=${value}`);
                }} defaultValue='test_drive'>
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
                            <TabsTrigger value="trade_in" className='border-b-2 border-b-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-primary-500 pb-3 transition-all group/technicalVisitTabs'>
                                <div className="flex flex-col items-center gap-3">
                                    <p className="px-2 inline-flex justify-start items-center gap-1 text-gray-300 font-normal group-[&[data-state=active]]/technicalVisitTabs:text-gray-400 text-base group-[&[data-state=active]]/technicalVisitTabs:font-medium">
                                        Trade In
                                    </p>
                                </div>
                            </TabsTrigger>
                        </div>
                        <div className='flex items-end gap-4'>
                            <SimpleSelect
                                options={[
                                    {
                                        label: 'Text',
                                        value: 'text',
                                    },
                                    {
                                        label: 'Call',
                                        value: 'call',
                                    }
                                ]}
                                placeholder="Filter By"
                                triggerClassName="[&>span]:text-primary-500 [&>div>svg]:text-primary-500"
                                value={filterBy}
                                onChange={setFilterBy}
                                label={filterBy && "Filter By"}
                            />
                            <SimpleSelect
                                options={tab === "trade_in" ? tradeInSortOptions : technicalVisitSortOptions}
                                placeholder="Sort By"
                                triggerClassName="[&>span]:text-primary-500 [&>div>svg]:text-primary-500"
                                value={sortBy}
                                onChange={setSortBy}
                                label={sortBy && "Sort By"}
                            />
                        </div>
                    </TabsList>


                    <TabsContent value='store_visit'>
                        <StoreVisitDataTable columns={storeVisitColumns({ handleChangeVisitStatus })} data={storeVisitData?.results || []} loading={storeVisitIsFetching} />
                    </TabsContent>
                    <TabsContent value='test_drive'>
                        <TestDriveDataTable columns={testDriveVisitsColumns({ handleChangeBookingStatus })} data={testDriveData?.results || []} loading={testDriveIsFetching} />
                    </TabsContent>
                    <TabsContent value='trade_in'>
                        <TradeInDataTable columns={tradeInColumns({ handleChangeVisitStatus: handleChangeTradeInVisitStatus })} data={tradeInData?.results || []} loading={tradeInIsFetching} />
                    </TabsContent>
                </Tabs>

                {
                    tab === "test_drive" && typeof testDriveData?.count === 'number' && testDriveData?.count > 10 &&
                    <Pagination
                        page={page}
                        onPageChange={setPage}
                        totalPage={Math.ceil(testDriveData?.count / 10)}
                        className='mt-4 justify-end'
                    />
                }

                {
                    tab === "store_visit" && typeof storeVisitData?.count === 'number' && storeVisitData?.count > 10 &&
                    <Pagination
                        page={page}
                        onPageChange={setPage}
                        totalPage={Math.ceil(storeVisitData?.count / 10)}
                        className='mt-4 justify-end'
                    />
                }

                {
                    tab === "trade_in" && typeof tradeInData?.count === 'number' && tradeInData?.count > 10 &&
                    <Pagination
                        page={page}
                        onPageChange={setPage}
                        totalPage={Math.ceil(tradeInData?.count / 10)}
                        className='mt-4 justify-end'
                    />
                }
            </div>
        </div>
    )
}

export default TechnicalVisitSection