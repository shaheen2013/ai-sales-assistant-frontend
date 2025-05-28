"use client";
import React, { useState } from 'react'
import { useGetAdminDashboardOverviewQuery } from '@/features/admin/adminDashboardSlice';
import AdminDashboardOverviewCard from './AdminDashboardOverviewCard';
import Spinner from '@/components/spinner/Spinner';
import AdminDashboardOverviewChart from './AdminDashboardOverviewChart';
import DateRange from '@/components/date-range/DateRange';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/shadcn/dropdown-menu';
import { Range } from 'react-date-range';
import { ChevronDown } from 'lucide-react';
import moment from 'moment';

const adminDashboardOverviewCardData = [
    {
        label: "New Dealers",
        value: "dealer",
        bgColor: "#e5d9ff"
    },
    {
        label: "Payment",
        value: "payment",
        bgColor: "#ddf2f6"
    },
    {
        label: "Visitors",
        value: "visitor",
        bgColor: "#f0f4a9"
    },
    {
        label: "AI Talk/Chat",
        value: "call_history",
        bgColor: "#e3e8ef"
    },
]

const AdminDashboardOverview = () => {
    /*--React State--*/
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [selection, setSelection] = useState<Range[]>([{
        startDate: moment().toDate(),
        endDate: moment().toDate(),
        key: 'selection'
    }])

    const today = moment().format("YYYY-MM-DD");
    const startDate = moment(selection?.[0]?.startDate).format("YYYY-MM-DD");
    const endDate = moment(selection?.[0]?.endDate).format("YYYY-MM-DD");
    const isDifferentDate = startDate !== today || endDate !== today;

    const displayText = !isDifferentDate
            ? "Choose Date Range"
            : `${moment(selection?.[0]?.startDate).format("DD MMM, YYYY")} - ${moment(selection?.[0]?.endDate).format("DD MMM, YYYY")}`;

    /*--RTK Query--*/
    const { data: adminDashboardOverviewData, isLoading: adminDashboardOverviewLoading } = useGetAdminDashboardOverviewQuery({
        ...(isDifferentDate ? { created_at_before: endDate, created_at_after: startDate } : {})
    });
    return (
        <>
            {
                adminDashboardOverviewLoading ? (
                    <div className='h-full flex justify-center items-center'>
                        <Spinner className='size-12' />
                    </div>
                ) : (
                    <div className="py-2">
                        {/* Choose Year */}
                        <DropdownMenu open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                            <DropdownMenuTrigger asChild className='w-full'>
                                <div className='px-3.5 py-2.5 bg-white max-w-fit text-sm font-medium gap-1.5 rounded-lg shadow-[inset_0px_0px_0px_1px_rgba(10,13,18,0.18)] outline outline-1 outline-offset-[-1px] outline-[#D5D7DA] text-primary-500 flex items-center select-none cursor-pointer justify-end ml-auto mb-4'>
                                    { displayText }
                                    <ChevronDown className='size-5 text-inherit' />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end'>
                                <div>
                                    <DateRange
                                        date={selection}
                                        onChange={(date) => {
                                            setSelection(date);
                                            if (date?.[0]?.startDate && date?.[0]?.endDate && date?.[0]?.startDate !== date?.[0]?.endDate) {
                                                setIsCalendarOpen(false);
                                            }
                                        }}
                                    />
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* cards */}
                        <div className="grid xl:grid-cols-4 lg:grid-cols-2 grid-cols-1 gap-3 mb-3">
                            {
                                adminDashboardOverviewCardData?.map((item, index) => (
                                    <AdminDashboardOverviewCard
                                        key={index}
                                        bgColor={item?.bgColor}
                                        growth={adminDashboardOverviewData?.[item?.value]?.growth}
                                        lastMonthTotal={adminDashboardOverviewData?.[item?.value]?.last_month_total}
                                        title={item?.label}
                                    />
                                ))
                            }
                        </div>

                        {/* chart */}
                        <div className="">
                            {adminDashboardOverviewData?.graph_data && <AdminDashboardOverviewChart data={adminDashboardOverviewData?.graph_data} />}
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default AdminDashboardOverview