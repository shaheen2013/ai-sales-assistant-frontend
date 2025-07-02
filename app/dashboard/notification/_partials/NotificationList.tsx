"use client";

import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  useGetNotificationsQuery,
  useMarkAllReadNotificationMutation,
} from "@/features/notification/notificationSlice";

import { useToast } from "@/hooks/useToast";
import Pagination from "@/components/pagination/Pagination";
import { beautifyErrors, formatShortTimeAgo } from "@/lib/utils";
import { NotificationDataType } from "@/types/notificationSliceType";
import { setTotalUnreadNotification } from "@/features/notification/notificationStateSlice";
import NotificationSkeleton from "@/components/partials/dashboard/_partials/notification/NotificationSkeleton";
import { getNotificationSvgIcon } from "@/components/partials/dashboard/_partials/notification/Notification";

const NotificationList = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const pageParam = searchParams.get("page");

  /*--Session--*/
  const { data: session } = useSession();

  /*--Custom Hooks--*/
  const toast = useToast();

  /*--React State--*/
  const [page, setPage] = useState(1);
  const [notifications, setNotifications] = useState<NotificationDataType[]>(
    []
  );

  const socketRef = useRef<WebSocket | null>(null);

  /*--Redux--*/
  const dispatch = useDispatch();

  /*--RTK Query--*/
  const { data: notificationsData, isFetching: notificationsFetching } =
    useGetNotificationsQuery(
      { limit: 10, offset: (page - 1) * 10 },
      { refetchOnReconnect: true }
    );

  const [markAllReadNotification] = useMarkAllReadNotificationMutation();

  /*--Function--*/
  const handleClickMarkAllReadNotification = async () => {
    try {
      dispatch(setTotalUnreadNotification(0));
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) => ({
          ...notification,
          is_read: true,
        }))
      );
      await markAllReadNotification().unwrap();
    } catch (err) {
      toast("error", beautifyErrors(err));
    }
  };

  const onPageChange = (newPage: number) => {
    setPage(newPage);
    router.push(`/dashboard/notification?page=${newPage}`);
  };

  /*--UseEffect--*/
  useEffect(() => {
    if (notificationsData?.results) {
      setNotifications(notificationsData.results);
    }
  }, [notificationsData?.results]);

  useEffect(() => {
    if (session?.access && !socketRef.current) {
      const socket = new WebSocket(
        `wss://${process.env.NEXT_PUBLIC_API_BASE_DOMAIN}/ws/notification?token=${session?.access}`
      );

      socketRef.current = socket;

      socket.onopen = () => {
        // console.log('WebSocket connected');
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (!data?.error) {
          setNotifications((prevNotifications) => [
            data,
            ...prevNotifications?.slice(0, 9),
          ]);
        } else {
          toast("error", data?.error);
        }
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      socket.onclose = () => {
        // console.log('WebSocket closed:', event);
      };
    }

    return () => {
      if (
        socketRef.current &&
        socketRef.current.readyState === WebSocket.OPEN
      ) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.access]);

  useEffect(() => {
    if (pageParam) {
      const pageNumber = parseInt(pageParam, 10);
      if (!isNaN(pageNumber)) {
        setPage(pageNumber);
      }
    } else {
      setPage(1);
      router.push("/dashboard/notification?page=1");
    }
  }, [pageParam]);

  return (
    <div className="">
      {/* top */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-400 font-semibold text-xl">
          All Notification
        </h3>

        <div
          className="justify-start text-gray-300 text-sm font-medium select-none cursor-pointer"
          onClick={handleClickMarkAllReadNotification}
        >
          Mark all as read
        </div>
      </div>

      {/* notifications */}
      <div className="border border-gray-50 rounded-lg p-4 lg:h-[calc(100vh-300px)] overflow-y-auto">
        {notificationsFetching ? (
          <div className="flex flex-col h-full gap-8">
            {[...Array(12)].map((_, index) => (
              <NotificationSkeleton key={index} />
            ))}
          </div>
        ) : (
          <>
            {notifications?.map((notification) => (
              <div key={notification?.id} className="mb-6 flex justify-between">
                {/* left */}
                <div className="flex gap-2 items-center">
                  {getNotificationSvgIcon(notification?.notification_type)}

                  <div>
                    <h3 className="text-gray-300 text-sm font-semibold flex gap-1 items-center">
                      {notification?.notification_type}
                    </h3>

                    <h4 className="text-sm text-[#8C91A2]">
                      {notification?.message}
                    </h4>
                  </div>
                </div>

                {/* right */}
                <div className="flex items-center justify-center gap-4">
                  <div className="text-[#CED0D8] text-sm font-semibold">
                    {formatShortTimeAgo(notification?.created_at)}
                  </div>
                  {!notification?.is_read && (
                    <div className="h-3 w-3 bg-primary-500 rounded-full"></div>
                  )}
                </div>
              </div>
            ))}

            {notifications?.length === 0 && (
              <div className="text-gray-400 text-center h-full flex items-center justify-center">
                No notifications found.
              </div>
            )}
          </>
        )}
      </div>

      {typeof notificationsData?.count === "number" &&
        notificationsData?.count > 10 && (
          <Pagination
            page={page}
            isEnd={notificationsData?.next === null}
            totalPage={(notificationsData?.count || 0) / 10}
            onPageChange={onPageChange}
            className="justify-center mt-12 mb-6"
          />
        )}
    </div>
  );
};

export default NotificationList;
