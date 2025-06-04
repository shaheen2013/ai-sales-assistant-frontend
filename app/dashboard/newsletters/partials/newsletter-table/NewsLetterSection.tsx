"use client";

import { Send } from 'lucide-react'
import React, { useState } from 'react'
import NewsLetterDataTable from './NewsLetterDataTable';
import { useGetTalkToHumanCallLogsQuery, useUpdateTalkToHumanStatusMutation } from '@/features/appointmentBooking/appointmentBookingSlice';
import Pagination from '@/components/pagination/Pagination';
import SimpleSelect from '@/components/select/SimpleSelect';
import Button from '@/components/button';
import Link from 'next/link';
import { newsLetterColumns } from './NewsLetterColumn';
import { useGetNewsLetterQuery } from '@/features/newsLetter/newsLetterSlice';
import NewsLetterView from './NewsLetterView';
import { NewsLetterResponseType } from '@/types/newsletterType';
import { Input } from '@/components/shadcn/input';
import { debounce } from 'lodash';

const NewsLetterSection = () => {
    /*--React State--*/
    const [page, setPage] = useState(1);
    const [subscription, setSubscription] = useState<string>('');
    const [openViewModal, setOpenViewModal] = useState(false);
    const [selectedNewsLetter, setSelectedNewsLetter] = useState<NewsLetterResponseType | null>(null);
    const [search, setSearch] = useState('');

    /*--RTK Query--*/
    const { data: newsLetterData, isFetching: newsLetterFetching } = useGetNewsLetterQuery({
        limit: 10,
        offset: (page - 1) * 10,
        search,
        ...(subscription && { subscription_name: subscription }),
    });
    const [updateTalkToHumanStatus] = useUpdateTalkToHumanStatusMutation();

    /*--Functions--*/
    const handleDeleteNewsLetter = (id: number) => {
        updateTalkToHumanStatus({
            id, queryParams: {
                limit: 10,
                offset: (page - 1) * 10,
                ...(subscription && { subscription_name: subscription }),
            }
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center gap-3 mb-6">
                <h2 className="text-gray-400 font-semibold text-2xl">Newsletter</h2>

                <Button variant="primary" className="!py-3 h-11">
                    <Link
                        href="/dashboard/newsletters/send"
                        className="flex items-center gap-2"
                    >
                        <Send />
                        Send Newsletter
                    </Link>
                </Button>
            </div>
            <div className="p-4 rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-50 mt-4">
                <div className='flex items-center justify-between'>
                    <div className="flex flex-col items-center gap-3">
                        <Input
                            placeholder='Search...'
                            className='xl:w-96'
                            onChange={debounce((e) => setSearch(e.target.value), 300)}
                        />
                    </div>

                    <SimpleSelect
                        options={[
                            {
                                label: 'Basic',
                                value: 'basic',
                            },
                            {
                                label: 'Enterprise',
                                value: 'enterprise',
                            }
                        ]}
                        placeholder="Subscription"
                        triggerClassName="[&>span]:text-primary-500 [&>div>svg]:text-primary-500"
                        value={subscription}
                        onChange={setSubscription}
                    />
                </div>

                <NewsLetterDataTable columns={newsLetterColumns({ handleDelete: handleDeleteNewsLetter, setSelectedNewsLetter, setOpenViewModal })} data={newsLetterData?.results || []} loading={newsLetterFetching} />

                {
                    typeof newsLetterData?.count === 'number' && newsLetterData?.count > 10 &&
                    <Pagination
                        page={page}
                        onPageChange={setPage}
                        totalPage={Math.ceil(newsLetterData?.count / 10)}
                    />
                }


                {/* Newsletter view */}
                <NewsLetterView
                    open={openViewModal}
                    onOpenChange={setOpenViewModal}
                    data={selectedNewsLetter}
                />
            </div>
        </div>
    )
}

export default NewsLetterSection