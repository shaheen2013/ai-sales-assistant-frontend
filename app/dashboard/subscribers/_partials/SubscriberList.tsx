"use client";

import { Input } from '@/components/shadcn/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/shadcn/select'
import { ChevronDown, Search } from 'lucide-react'
import React from 'react'
import SubscriberTable from './SubscriberTable';
import { SubscriberTableColumnDataType, subscriberTableColumns } from './SubscriberTableColumn';

const subscriberTableData: SubscriberTableColumnDataType[] = [
    {
        id: 1,
        dealer_name: "Phoenix Baker 1",
        img: "/images/user-1.png",
        plan_name: "Premium",
        total_spend: 1000,
        status: "Active",
        created_at: new Date(),
    },
    {
        id: 2,
        dealer_name: "Phoenix Baker 2",
        img: "/images/user-1.png",
        plan_name: "Premium",
        total_spend: 1000,
        status: "Active",
        created_at: new Date(),
    },
    {
        id: 3,
        dealer_name: "Phoenix Baker 3",
        img: "/images/user-1.png",
        plan_name: "Premium",
        total_spend: 1000,
        status: "Deactivate",
        created_at: new Date(),
    },
]

const SubscriberList = () => {
    return (
        <div className='p-4 rounded-2xl outline outline-1 outline-offset-[-1px] outline-[#eaebec]'>
            <div className='flex items-center justify-between'>
                <h4 className="text-gray-500 text-2xl font-semibold">Subscribers</h4>
                <Select>
                    <SelectTrigger
                        className='max-w-fit [&>svg]:hidden [&>span]:pointer-events-auto [&>span]:text-primary-500 [&>span]:text-sm [&>span]:font-medium gap-1.5'
                    >
                        <SelectValue placeholder='Premium Subscribers' />
                        <div>
                            <ChevronDown className='size-5 text-primary-500' />
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="continental-motors">
                                Continental Motors
                            </SelectItem>
                            <SelectItem value="skyline-autohaus">
                                Skyline Autohaus
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className='p-4 bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-[#eaebec] mt-4'>
                <div className='flex items-center justify-between pb-4 border-b border-b-[#EAEBEC] mb-4'>
                    <p className="text-lg font-medium text-gray-600">All Premium Subscribers</p>
                    <Input
                        preIcon={<Search className='size-5 text-[#a2a1a7]' />}
                        placeholder='Search'
                        className='xl:min-w-[320px] rounded-lg'
                    />
                    <div className='flex items-center gap-0.5'>
                        <p className="text-gray-600 text-lg font-medium ">Total -</p>
                        <div className='px-2 py-[6.5px] rounded-md shadow-[0px_1.125px_2.25px_0px_rgba(10,13,18,0.05)] outline outline-[1.12px] outline-offset-[-1.12px] outline-[#D5D7DA] text-base font-medium text[#414651]'>
                            52
                        </div>
                    </div>
                </div>

                <SubscriberTable columns={subscriberTableColumns} data={subscriberTableData} />
            </div>
        </div>
    )
}

export default SubscriberList