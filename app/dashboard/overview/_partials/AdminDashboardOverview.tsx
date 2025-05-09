"use client";
import React from 'react'
import DashboardOverviewChart from "@/components/partials/dashboard/dashboard-overview-chart";
import { useGetAdminDashboardOverviewQuery } from '@/features/admin/adminDashboardSlice';
import AdminDashboardOverviewCard from './AdminDashboardOverviewCard';

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
    const { data: adminDashboardOverviewData, isLoading: adminDashboardOverviewLoading } = useGetAdminDashboardOverviewQuery();

    return (
        <>
            {
                adminDashboardOverviewLoading ? (
                    <p>loading...</p>
                ) : (
                    <div className="py-2">
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
                            <DashboardOverviewChart />
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default AdminDashboardOverview