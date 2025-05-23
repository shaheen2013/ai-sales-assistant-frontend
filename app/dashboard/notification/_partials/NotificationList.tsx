"use client";

import Pagination from '@/components/pagination/Pagination';
import NotificationSkeleton from '@/components/partials/dashboard/_partials/notification/NotificationSkeleton';
import { useGetNotificationsQuery, useMarkAllReadNotificationMutation } from '@/features/notification/notificationSlice';
import { setTotalUnreadNotification } from '@/features/notification/notificationStateSlice';
import { useToast } from '@/hooks/useToast';
import { beautifyErrors, formatShortTimeAgo } from '@/lib/utils';
import { NotificationDataType } from '@/types/notificationSliceType';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

const NotificationList = () => {
    /*--Session--*/
    const { data: session } = useSession();

    /*--Custom Hooks--*/
    const toast = useToast();

    /*--React State--*/
    const [page, setPage] = useState(1);
    const [notifications, setNotifications] = useState<NotificationDataType[]>([]);

    /*--Redux--*/
    const dispatch = useDispatch();

    /*--RTK Query--*/
    const { data: notificationsData, isFetching: notificationsFetching } = useGetNotificationsQuery({ limit: 10, offset: (page - 1) * 10 });
    const [markAllReadNotification] = useMarkAllReadNotificationMutation();

    /*--Function--*/
    const handleClickMarkAllReadNotification = async () => {
        try {
            dispatch(setTotalUnreadNotification(0));
            setNotifications((prevNotifications) => prevNotifications.map((notification) => ({ ...notification, is_read: true })));
            await markAllReadNotification().unwrap();
        } catch (err) {
            toast("error", beautifyErrors(err));
        }
    }

    /*--UseEffect--*/
    useEffect(() => {
        if (notificationsData?.results) {
            setNotifications(notificationsData.results);
        }
    }, [notificationsData?.results]);

    useEffect(() => {
        const socketRef = { current: null as WebSocket | null };
        if (session?.access && !socketRef.current) {
            const socket = new WebSocket(`wss://${process.env.NEXT_PUBLIC_API_BASE_DOMAIN}/ws/notification?token=${session?.access}`);

            socketRef.current = socket;

            socket.onopen = () => {
                console.log('WebSocket connected');
            };

            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (!data?.error) {
                    setNotifications((prevNotifications) => [data, ...prevNotifications?.slice(0, 9)]);
                } else {
                    toast("error", data?.error);
                }
            };

            socket.onerror = (error) => {
                console.error('WebSocket error:', error);
            };

            socket.onclose = (event) => {
                // console.log('WebSocket closed:', event);
            };
        }

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
                console.log('WebSocket cleaned up');
            }
        };
    }, [session?.access, toast])

    return (
        <div className="">
            {/* top */}
            <div className='flex items-center justify-between mb-4'>
                <h3 className="text-gray-400 font-semibold text-xl">
                    All Notification
                </h3>

                <div className="justify-start text-gray-200 text-sm font-medium select-none cursor-pointer" onClick={handleClickMarkAllReadNotification}>Mark all as read</div>
            </div>

            {/* notifications */}
            <div className="border border-gray-50 rounded-lg p-4">
                {
                    notificationsFetching ? <div className='flex flex-col h-full gap-8'>
                        {
                            [...Array(12)].map((_, index) => (
                                <NotificationSkeleton key={index} />
                            ))
                        }
                    </div> : notifications?.map((notification) => (
                        <div key={notification?.id} className="mb-6 flex justify-between">
                            {/* left */}
                            <div className="flex gap-2 items-center">
                                <svg
                                    width="48"
                                    height="48"
                                    viewBox="0 0 48 48"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect
                                        x="4"
                                        y="4"
                                        width="40"
                                        height="40"
                                        rx="8"
                                        fill="#ECF6FE"
                                    />
                                    <path
                                        d="M24.0001 13.9961C28.05 13.9961 31.3568 17.1908 31.4959 21.2451L31.5001 21.4961V25.5931L32.8801 28.7491C32.9492 28.907 32.9848 29.0775 32.9848 29.2499C32.9848 29.9402 32.4252 30.4999 31.7348 30.4999L27.0001 30.5014C27.0001 32.1582 25.657 33.5014 24.0001 33.5014C22.4024 33.5014 21.0965 32.2524 21.0052 30.6776L20.9997 30.4991L16.275 30.4999C16.1036 30.4999 15.9341 30.4646 15.777 30.3964C15.1438 30.1213 14.8534 29.3851 15.1285 28.7519L16.5001 25.594V21.496C16.5007 17.3412 19.8522 13.9961 24.0001 13.9961ZM25.4997 30.4991L22.5001 30.5014C22.5001 31.3298 23.1717 32.0014 24.0001 32.0014C24.7798 32.0014 25.4206 31.4065 25.4932 30.6458L25.4997 30.4991ZM24.0001 15.4961C20.6799 15.4961 18.0006 18.1703 18.0001 21.4961V25.9057L16.6561 28.9999H31.3526L30.0001 25.9067L30.0002 21.5089L29.9965 21.2837C29.8854 18.0503 27.2417 15.4961 24.0001 15.4961Z"
                                        fill="#2196F3"
                                    />
                                </svg>

                                <div>
                                    <h3 className="text-gray-300 text-sm font-semibold flex gap-1 items-center">
                                        {notification?.notification_type}
                                    </h3>

                                    <h4 className="text-sm text-[#8C91A2]">
                                        {
                                            notification?.message
                                        }
                                    </h4>
                                </div>
                            </div>

                            {/* right */}
                            <div className="flex items-center justify-center gap-4">
                                <div className="text-[#CED0D8] text-sm font-semibold">{formatShortTimeAgo(notification?.created_at)}</div>
                                {!notification?.is_read && <div className="h-3 w-3 bg-primary-500 rounded-full"></div>}
                            </div>
                        </div>
                    ))
                }
            </div>

            {
                notificationsData?.count && notificationsData?.count > 10 && <Pagination
                    page={page}
                    totalPage={(notificationsData?.count || 0) / 10}
                    onPageChange={(page) => setPage(page)}
                    className='justify-center mt-12 mb-6'
                />
            }
        </div>
    )
}

export default NotificationList