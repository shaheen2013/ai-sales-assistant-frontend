import React, { useEffect, useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../../dashboard-dropdown';
import { Button } from '@/components/shadcn/button';
import { NotificationDataType } from '@/types/notificationSliceType';
import { useGetNotificationsQuery } from '@/features/notification/notificationSlice';
import NotificationSkeleton from './NotificationSkeleton';
import moment from 'moment';
import { formatShortTimeAgo } from '@/lib/utils';


const Notification = () => {
    /*--React State--*/
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState<NotificationDataType[]>([]);

    /*--RTK Query--*/
    const { data: notificationsData, isLoading: notificationsLoading } = useGetNotificationsQuery({ limit: 5 }, { skip: !open });

    /*--Functions--*/
    const handleOpenChange = (open: boolean) => {
        setOpen(open);

        // create a new div element
        const overlay = document.createElement("div");

        // set unique id for the overlay div
        overlay.id = "overlay";

        // set the class name to the overlay div
        overlay.className = "fixed inset-0 bg-black opacity-50 z-50";

        if (open) {
            // append the overlay div to the body
            document.body.appendChild(overlay);
        } else {
            // remove the overlay div from the body
            const overlayDiv = document.getElementById("overlay");
            if (overlayDiv) {
                document.body.removeChild(overlayDiv);
            }
        }
    };

    /*--UseEffect--*/
    useEffect(() => {
        if (notificationsData?.results) {
            setNotifications(notificationsData.results);
        }
    }, [notificationsData?.results]);

    return (
        <div>
            <DropdownMenu onOpenChange={handleOpenChange}>
                <DropdownMenuTrigger asChild>
                    <div className="cursor-pointer p-2 rounded-lg border relative">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M27.7256 21.9925C27.0319 20.7975 26.0006 17.4163 26.0006 13C26.0006 10.3478 24.9471 7.8043 23.0717 5.92893C21.1963 4.05357 18.6528 3 16.0006 3C13.3485 3 10.8049 4.05357 8.92956 5.92893C7.05419 7.8043 6.00063 10.3478 6.00063 13C6.00063 17.4175 4.96813 20.7975 4.27438 21.9925C4.09721 22.2963 4.00329 22.6415 4.00209 22.9931C4.00088 23.3448 4.09243 23.6906 4.2675 23.9956C4.44257 24.3006 4.69498 24.5541 4.99926 24.7304C5.30354 24.9068 5.64894 24.9997 6.00063 25H11.1019C11.3326 26.1289 11.9462 27.1436 12.8388 27.8722C13.7314 28.6009 14.8483 28.9989 16.0006 28.9989C17.1529 28.9989 18.2698 28.6009 19.1625 27.8722C20.0551 27.1436 20.6687 26.1289 20.8994 25H26.0006C26.3522 24.9995 26.6974 24.9064 27.0016 24.73C27.3057 24.5535 27.5579 24.3 27.7328 23.9951C27.9077 23.6901 27.9992 23.3444 27.9979 22.9928C27.9967 22.6412 27.9027 22.2962 27.7256 21.9925ZM16.0006 27C15.3804 26.9998 14.7755 26.8074 14.2691 26.4492C13.7628 26.0911 13.3799 25.5848 13.1731 25H18.8281C18.6214 25.5848 18.2385 26.0911 17.7321 26.4492C17.2258 26.8074 16.6209 26.9998 16.0006 27ZM6.00063 23C6.96313 21.345 8.00063 17.51 8.00063 13C8.00063 10.8783 8.84348 8.84344 10.3438 7.34315C11.8441 5.84285 13.8789 5 16.0006 5C18.1224 5 20.1572 5.84285 21.6575 7.34315C23.1578 8.84344 24.0006 10.8783 24.0006 13C24.0006 17.5062 25.0356 21.3412 26.0006 23H6.00063Z"
                                fill="#2B3545"
                            />
                        </svg>

                        {/* dot */}
                        <div className="absolute top-[5px] right-[10px] w-2 h-2 bg-red-500 rounded-full border border-white"></div>
                    </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    className="lg:w-[450px] p-4 rounded-xl mt-1"
                    align="end"
                >
                    {/* title */}
                    <h2 className="text-gray-300 text-2xl font-semibold mb-5">
                        Notification
                    </h2>

                    {/* content */}
                    <div className="mb-6">
                        {
                            notificationsLoading ? <div className='flex flex-col h-full gap-6'>
                                <NotificationSkeleton />
                                <NotificationSkeleton />
                                <NotificationSkeleton />
                            </div> : notifications?.map((notification) => (
                                (
                                    <div key={notification?.id} className="flex justify-between gap-2 mb-6">
                                        {/* left */}
                                        <div className="flex gap-3">
                                            {/* icon */}
                                            <div className="flex justify-center items-center">
                                                <div className="bg-blue-50 p-2 rounded-lg ">
                                                    <svg
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M12.0001 1.99609C16.05 1.99609 19.3568 5.19084 19.4959 9.24515L19.5001 9.49609V13.5931L20.8801 16.7491C20.9492 16.907 20.9848 17.0775 20.9848 17.2499C20.9848 17.9402 20.4252 18.4999 19.7348 18.4999L15.0001 18.5014C15.0001 20.1582 13.657 21.5014 12.0001 21.5014C10.4024 21.5014 9.09645 20.2524 9.0052 18.6776L8.99966 18.4991L4.27498 18.4999C4.10364 18.4999 3.93413 18.4646 3.77697 18.3964C3.14377 18.1213 2.85342 17.3851 3.12846 16.7519L4.50011 13.594V9.49599C4.50071 5.3412 7.8522 1.99609 12.0001 1.99609ZM13.4997 18.4991L10.5001 18.5014C10.5001 19.3298 11.1717 20.0014 12.0001 20.0014C12.7798 20.0014 13.4206 19.4065 13.4932 18.6458L13.4997 18.4991ZM12.0001 3.49609C8.67995 3.49609 6.00059 6.17035 6.00011 9.49609V13.9057L4.65613 16.9999H19.3526L18.0001 13.9067L18.0002 9.50895L17.9965 9.28375C17.8854 6.05027 15.2417 3.49609 12.0001 3.49609Z"
                                                            fill="#2196F3"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>

                                            {/* title, content */}
                                            <div>
                                                <p className="font-semibold text-[#8C91A2] text-sm mb-1">
                                                    {notification?.notification_type}
                                                    {/* <span className="font-medium text-[#CED0D8]">
                                                        @john
                                                    </span> */}
                                                </p>

                                                <p className="text-[#8C91A2] text-sm">
                                                    {notification?.message}
                                                </p>
                                            </div>
                                        </div>

                                        {/* right */}
                                        <div className="flex justify-center items-center gap-4 shrink-0">
                                            <p className="text-[#CED0D8] font-semibold text-sm">
                                                {formatShortTimeAgo(notification?.created_at)}
                                            </p>
                                            {/* dot */}
                                            {!notification?.is_read && <div className="w-[10px] h-[10px] bg-success-500 rounded-full border border-white"></div>}
                                        </div>
                                    </div>
                                )
                            ))
                        }
                    </div>

                    {/* see all notification */}
                    <Button
                        variant="outline"
                        className="w-full !py-6 !font-medium text-primary-500 !border !border-gray-100 rounded-lg"
                    >
                        See All Notification
                    </Button>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default Notification