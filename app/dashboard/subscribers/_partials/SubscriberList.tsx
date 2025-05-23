"use client";

import { Input } from '@/components/shadcn/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/shadcn/select'
import { ChevronDown, Search } from 'lucide-react'
import React, { useState } from 'react'
import SubscriberTable from './SubscriberTable';
import { subscriberTableColumns } from './SubscriberTableColumn';
import Pagination from '@/components/pagination/Pagination';
import { useGetDealersQuery } from '@/features/dealer/dealerSlice';
import { Skeleton } from '@/components/shadcn/skeleton';
import { debounce } from 'lodash';

const SubscriberList = () => {
    /*--React State--*/
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState<string>('');
    const [subscriberType, setSubscriberType] = useState<string>('all_subscribers');

    /*--RTK Query--*/
    const { data: dealersData, isLoading: dealersLoading, isFetching: dealersFetching } = useGetDealersQuery({
        offset: (page - 1) * 10,
        limit: 10,
        search,
        ...(subscriberType !== 'all_subscribers' && { subscription_name: subscriberType })
    });

    /*--Funcions--*/
    const handleDebounceSearch = debounce((value: string) => {
        setSearch(value);
    }, 400);

    console.log("dealersData?.results ", dealersData?.results)

    return (
        <div className='p-4 rounded-2xl outline outline-1 outline-offset-[-1px] outline-[#eaebec]'>
            <div className='flex items-center justify-between'>
                <h4 className="text-gray-500 text-2xl font-semibold">Subscribers</h4>
                <Select defaultValue='all_subscribers' value={subscriberType} onValueChange={setSubscriberType}>
                    <SelectTrigger
                        className='max-w-fit [&>svg]:hidden [&>span]:pointer-events-auto [&>span]:text-primary-500 [&>span]:text-sm [&>span]:font-medium gap-1.5'
                    >
                        <SelectValue placeholder='All Subscribers' />
                        <div>
                            <ChevronDown className='size-5 text-primary-500' />
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="all_subscribers">
                                All Subscribers
                            </SelectItem>
                            <SelectItem value="basic">
                                Basic Subscribers
                            </SelectItem>
                            <SelectItem value="enterprise">
                                Premium Subscribers
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {
                dealersLoading ? <div className='h-full flex flex-col gap-4 justify-center items-center mt-6'>
                    <Skeleton className="w-full h-6" />
                    <Skeleton className="w-full h-6" />
                    <Skeleton className="w-full h-6" />
                    <Skeleton className="w-full h-6" />
                </div> : <div className='p-4 bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-[#eaebec] mt-4'>
                    <div className='flex items-center justify-between pb-4 border-b border-b-[#EAEBEC] mb-4'>
                        <p className="text-lg font-medium text-gray-600">All Premium Subscribers</p>
                        <Input
                            preIcon={<Search className='size-5 text-[#a2a1a7]' />}
                            placeholder='Search'
                            className='xl:min-w-[320px] rounded-lg'
                            onChange={(e) => handleDebounceSearch(e.target.value)}
                        />
                        <div className='flex items-center gap-0.5'>
                            <p className="text-gray-600 text-lg font-medium ">Total -</p>
                            <div className='px-2 py-[6.5px] rounded-md shadow-[0px_1.125px_2.25px_0px_rgba(10,13,18,0.05)] outline outline-[1.12px] outline-offset-[-1.12px] outline-[#D5D7DA] text-base font-medium text[#414651] min-w-[36px] flex items-center justify-center'>
                                {dealersData?.count || 0}
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl mt-4">
                        <SubscriberTable
                            columns={subscriberTableColumns}
                            data={dealersData?.results || []}
                            loading={dealersFetching}
                        />

                        {typeof dealersData?.count === 'number' && dealersData?.count > 10 && <Pagination
                            page={page}
                            onPageChange={setPage}
                            className='justify-end mt-4'
                            totalPage={Math.ceil((dealersData?.count || 0) / 10)}
                        />}
                    </div>
                </div>
            }
        </div>
    )
}

export default SubscriberList