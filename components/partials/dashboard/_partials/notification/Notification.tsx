import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
// import { useDispatch } from "react-redux";

import {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "../../dashboard-dropdown";

import {
  useGetNotificationsQuery,
  useGetNotificationunreadCountQuery,
  useMarkAllReadNotificationMutation,
} from "@/features/notification/notificationSlice";

// import { RootState } from "@/store/store";
import { useToast } from "@/hooks/useToast";
import { Button } from "@/components/shadcn/button";
import NotificationSkeleton from "./NotificationSkeleton";
import { beautifyErrors, formatShortTimeAgo } from "@/lib/utils";
import { NotificationDataType } from "@/types/notificationSliceType";
// import { setTotalUnreadNotification } from "@/features/notification/notificationStateSlice";

const Notification = () => {
  /*--Session--*/
  const { data: session } = useSession();

  /*--Custom Hooks--*/
  const toast = useToast();

  /*--React State--*/
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationDataType[]>(
    []
  );

  const socketRef = useRef<WebSocket | null>(null);

  /*--Redux--*/
  // const dispatch = useDispatch();

  // const totalUnread = useSelector(
  //   (state: RootState) => state.notificationState
  // ).totalUnread;

  /*--RTK Query--*/
  const { data: notificationsData, isLoading: notificationsLoading } =
    useGetNotificationsQuery({ limit: 5 }, { skip: !open });

  const { data: notificationUnreadCountData } =
    useGetNotificationunreadCountQuery();

  const [markAllReadNotification] = useMarkAllReadNotificationMutation();

  /*--UseEffect--*/
  useEffect(() => {
    if (notificationsData?.results) {
      setNotifications(notificationsData.results);
    }
  }, [notificationsData?.results]);

  // useEffect(() => {
  //   if (notificationUnreadCountData) {
  //     dispatch(
  //       setTotalUnreadNotification(notificationUnreadCountData?.total_count)
  //     );
  //   }
  // }, [notificationUnreadCountData, dispatch]);

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
          toast("success", data?.message);
          // dispatch(setTotalUnreadNotification(data?.unread_count));
          setNotifications((prevNotifications) => [
            data,
            ...prevNotifications?.slice(0, 4),
          ]);
        } else {
          console.log("WebSocket error data:", data);
          // toast("error", data?.error);
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

  /*--Function--*/
  const handleClickMarkAllReadNotification = async () => {
    try {
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) => ({
          ...notification,
          is_read: true,
        }))
      );
      // dispatch(setTotalUnreadNotification(0));
      await markAllReadNotification().unwrap();
    } catch (err) {
      toast("error", beautifyErrors(err));
    }
  };

  return (
    <div>
      <DropdownMenu open={open} onOpenChange={setOpen}>
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
            {(notificationUnreadCountData?.total_count ?? 0) > 0 && (
              <div className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full border border-white text-[10px] text-white flex items-center justify-center">
                {notificationUnreadCountData?.total_count ?? 0}
              </div>
            )}
          </div>
        </DropdownMenuTrigger>

        {open && (
          <DropdownMenuPortal>
            <div
              className="fixed inset-0 bg-black opacity-50 z-50"
              onClick={() => setOpen(false)}
            />
          </DropdownMenuPortal>
        )}

        <DropdownMenuContent
          className="lg:w-[480px] md:w-[350px] w-[300px] left-0 right-0 p-4 rounded-xl mt-1"
          align="end"
        >
          {/* title */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-gray-300 text-2xl font-semibold">
              Notification
            </h2>
            <div
              className="justify-start text-gray-200 text-sm font-medium select-none cursor-pointer"
              onClick={handleClickMarkAllReadNotification}
            >
              Mark all as read
            </div>
          </div>

          {/* content */}
          <div className="mb-6">
            {notificationsLoading ? (
              <div className="flex flex-col h-full gap-6">
                <NotificationSkeleton />
                <NotificationSkeleton />
                <NotificationSkeleton />
              </div>
            ) : (
              <>
                {notifications?.map((notification, index) => {
                  return (
                    <div
                      key={index}
                      className="flex justify-between lg:gap-2 gap-3 mb-6"
                    >
                      {/* left */}
                      <div className="flex gap-3">
                        {/* icon */}
                        <div className="flex justify-center items-center">
                          {getNotificationSvgIcon(
                            notification?.notification_type
                          )}
                        </div>

                        {/* title, content */}
                        <div>
                          <p className="font-semibold text-[#8C91A2] text-sm mb-1">
                            {notification?.notification_type}
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
                        {!notification?.is_read && (
                          <div className="w-[10px] h-[10px] bg-success-500 rounded-full border border-white"></div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {notifications?.length === 0 && (
                  <div className="text-center text-gray-400 py-12">
                    No notifications found.
                  </div>
                )}
              </>
            )}
          </div>

          {/* see all notification */}
          <Link href={"/dashboard/notification"} onClick={() => setOpen(false)}>
            <Button
              variant="outline"
              className="w-full !py-6 !font-medium text-primary-500 !border !border-gray-100 !text-lg rounded-lg"
            >
              See All Notification
            </Button>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export function getNotificationSvgIcon(notificationType: string) {
  switch (notificationType) {
    case "New Dealer Registration":
      return (
        <div className="bg-green-50 p-2 rounded-lg ">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.5 8C5.5 6.61929 6.61929 5.5 8 5.5C9.38071 5.5 10.5 6.61929 10.5 8C10.5 9.38071 9.38071 10.5 8 10.5C6.61929 10.5 5.5 9.38071 5.5 8ZM8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4ZM15.5 9C15.5 8.17157 16.1716 7.5 17 7.5C17.8284 7.5 18.5 8.17157 18.5 9C18.5 9.82843 17.8284 10.5 17 10.5C16.1716 10.5 15.5 9.82843 15.5 9ZM17 6C15.3431 6 14 7.34315 14 9C14 10.6569 15.3431 12 17 12C18.6569 12 20 10.6569 20 9C20 7.34315 18.6569 6 17 6ZM14.2484 19.0377C14.9507 19.3232 15.8517 19.5 17.001 19.5C19.2833 19.5 20.5867 18.8027 21.2979 17.9421C21.643 17.5244 21.8186 17.1027 21.9077 16.7795C21.9521 16.6181 21.9754 16.48 21.9875 16.377C21.9936 16.3254 21.997 16.2821 21.9988 16.2487C21.9997 16.232 22.0003 16.2177 22.0006 16.2059L22.0009 16.1903L22.001 16.1839L22.001 16.1811L22.001 16.1786C22.001 14.9754 21.0256 14 19.8224 14H14.1796C14.1521 14 14.1248 14.0005 14.0977 14.0015C14.4916 14.4126 14.7787 14.927 14.914 15.5H19.8224C20.194 15.5 20.4958 15.7986 20.5009 16.1689C20.5006 16.1746 20.4997 16.1855 20.4979 16.2011C20.4934 16.2387 20.4835 16.3015 20.4615 16.3812C20.4177 16.5402 20.3277 16.7613 20.1416 16.9865C19.7903 17.4116 18.9687 18 17.001 18C16.0209 18 15.3252 17.854 14.8302 17.655C14.7231 18.0551 14.5452 18.5378 14.2484 19.0377ZM4.25 14C3.00736 14 2 15.0074 2 16.25V16.5011L2 16.5022L2.00001 16.5048L2.00007 16.5111L2.00035 16.5277C2.00064 16.5406 2.00117 16.5571 2.0021 16.5771C2.00396 16.6169 2.00745 16.6705 2.01398 16.7358C2.02701 16.8661 2.05233 17.045 2.10165 17.2564C2.19995 17.6776 2.39654 18.2404 2.79183 18.8051C3.61066 19.9749 5.17178 21 8 21C10.8282 21 12.3893 19.9749 13.2082 18.8051C13.6035 18.2404 13.8001 17.6776 13.8983 17.2564C13.9477 17.045 13.973 16.8661 13.986 16.7358C13.9926 16.6705 13.996 16.6169 13.9979 16.5771C13.9988 16.5571 13.9994 16.5406 13.9996 16.5277L13.9999 16.5111L14 16.5048L14 16.5022L14 16.25C14 15.0074 12.9926 14 11.75 14H4.25ZM3.50047 16.5072L3.5 16.4947V16.25C3.5 15.8358 3.83579 15.5 4.25 15.5H11.75C12.1642 15.5 12.5 15.8358 12.5 16.25V16.4946L12.4995 16.5072C12.4988 16.5222 12.4972 16.5493 12.4935 16.5865C12.486 16.6612 12.4703 16.7753 12.4376 16.9155C12.3718 17.1974 12.2403 17.5721 11.9793 17.9449C11.4857 18.6501 10.4218 19.5 8 19.5C5.57822 19.5 4.51434 18.6501 4.02067 17.9449C3.75971 17.5721 3.62818 17.1974 3.56241 16.9155C3.5297 16.7753 3.514 16.6612 3.50653 16.5865C3.50281 16.5493 3.50117 16.5222 3.50047 16.5072Z"
              fill="#13C56B"
            />
          </svg>
        </div>
      );

    case "Support Ticket":
      return (
        <div className="bg-purple-50 p-2 rounded-lg ">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.144 6.30723C8.57804 6.07535 9.04511 6.00076 9.49986 6.00073C10.0263 6.0007 10.6377 6.17363 11.1315 6.57829C11.6485 7.00192 11.9999 7.65186 11.9999 8.5C11.9999 9.47459 11.3112 10.0037 10.9229 10.302C10.8927 10.3252 10.8644 10.347 10.8383 10.3675C10.4137 10.7012 10.2499 10.8795 10.2499 11.25C10.2499 11.6642 9.91411 12 9.4999 12C9.08569 12 8.7499 11.6642 8.7499 11.25C8.7499 10.116 9.46115 9.54195 9.9115 9.18806C10.4248 8.78469 10.4999 8.69484 10.4999 8.5C10.4999 8.10296 10.3513 7.87825 10.1808 7.73853C9.98714 7.57985 9.72352 7.50072 9.49994 7.50073C9.20469 7.50075 9.00176 7.54962 8.8508 7.63027C8.70735 7.7069 8.55557 7.84146 8.40923 8.11137C8.21181 8.47551 7.75657 8.61066 7.39244 8.41324C7.0283 8.21582 6.89315 7.76058 7.09057 7.39644C7.35423 6.91012 7.70245 6.54311 8.144 6.30723ZM9.50007 15.0001C10.0524 15.0001 10.5001 14.5524 10.5001 14.0001C10.5001 13.4477 10.0524 13 9.50007 13C8.94775 13 8.5 13.4477 8.5 14.0001C8.5 14.5524 8.94775 15.0001 9.50007 15.0001ZM9.50005 3C5.35792 3 2.00005 6.35786 2.00005 10.5C2.00005 11.6329 2.25172 12.7088 2.70271 13.6734C2.44867 14.6714 2.16486 15.7842 1.97847 16.5147C1.74544 17.428 2.56787 18.2588 3.48221 18.039C4.23244 17.8587 5.38546 17.5819 6.41294 17.337C7.35525 17.7631 8.40089 18 9.50005 18C13.6422 18 17.0001 14.6421 17.0001 10.5C17.0001 6.35786 13.6422 3 9.50005 3ZM3.50005 10.5C3.50005 7.18629 6.18634 4.5 9.50005 4.5C12.8138 4.5 15.5001 7.18629 15.5001 10.5C15.5001 13.8137 12.8138 16.5 9.50005 16.5C8.53932 16.5 7.63335 16.2748 6.83009 15.8749L6.58667 15.7537L6.32216 15.8167C5.39943 16.0363 4.33336 16.2919 3.5344 16.4838C3.73315 15.7047 3.99632 14.6724 4.22448 13.7757L4.29467 13.4998L4.16415 13.2468C3.73993 12.4246 3.50005 11.4914 3.50005 10.5ZM14.5001 21.0001C12.5307 21.0001 10.7386 20.241 9.40039 18.9995C9.43359 18.9999 9.46683 19.0001 9.50011 19.0001C10.2181 19.0001 10.9152 18.911 11.5812 18.7434C12.4451 19.2254 13.4405 19.5001 14.5001 19.5001C15.4608 19.5001 16.3668 19.2748 17.17 18.8749L17.4135 18.7537L17.678 18.8167C18.5995 19.0361 19.6431 19.2625 20.4171 19.4262C20.2422 18.6757 20.0035 17.6711 19.7756 16.7757L19.7055 16.4999L19.836 16.2469C20.2602 15.4247 20.5001 14.4915 20.5001 13.5001C20.5001 11.3853 19.4061 9.52617 17.7531 8.45761C17.5747 7.73435 17.3038 7.04756 16.9535 6.41052C19.8908 7.42684 22.0001 10.2171 22.0001 13.5001C22.0001 14.6332 21.7483 15.7094 21.2971 16.6741C21.5501 17.6821 21.8064 18.774 21.9689 19.4773C22.1733 20.3623 21.3939 21.1633 20.5014 20.9768C19.7743 20.8248 18.6318 20.581 17.588 20.3367C16.6455 20.763 15.5996 21.0001 14.5001 21.0001Z"
              fill="#654CE6"
            />
          </svg>
        </div>
      );

    case "Test Drive":
      return (
        <div className="bg-orange-50 p-2 rounded-lg ">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="4" y="4" width="40" height="40" rx="8" fill="#FFF5EB" />
            <path
              d="M29.75 15C31.5449 15 33 16.4551 33 18.25V29.75C33 31.5449 31.5449 33 29.75 33H18.25C16.4551 33 15 31.5449 15 29.75V18.25C15 16.4551 16.4551 15 18.25 15H29.75ZM31.5 20.5H16.5V29.75C16.5 30.7165 17.2835 31.5 18.25 31.5H29.75C30.7165 31.5 31.5 30.7165 31.5 29.75V20.5ZM19.75 26.5C20.4404 26.5 21 27.0596 21 27.75C21 28.4404 20.4404 29 19.75 29C19.0596 29 18.5 28.4404 18.5 27.75C18.5 27.0596 19.0596 26.5 19.75 26.5ZM24 26.5C24.6904 26.5 25.25 27.0596 25.25 27.75C25.25 28.4404 24.6904 29 24 29C23.3096 29 22.75 28.4404 22.75 27.75C22.75 27.0596 23.3096 26.5 24 26.5ZM19.75 22.5C20.4404 22.5 21 23.0596 21 23.75C21 24.4404 20.4404 25 19.75 25C19.0596 25 18.5 24.4404 18.5 23.75C18.5 23.0596 19.0596 22.5 19.75 22.5ZM24 22.5C24.6904 22.5 25.25 23.0596 25.25 23.75C25.25 24.4404 24.6904 25 24 25C23.3096 25 22.75 24.4404 22.75 23.75C22.75 23.0596 23.3096 22.5 24 22.5ZM28.25 22.5C28.9404 22.5 29.5 23.0596 29.5 23.75C29.5 24.4404 28.9404 25 28.25 25C27.5596 25 27 24.4404 27 23.75C27 23.0596 27.5596 22.5 28.25 22.5ZM29.75 16.5H18.25C17.2835 16.5 16.5 17.2835 16.5 18.25V19H31.5V18.25C31.5 17.2835 30.7165 16.5 29.75 16.5Z"
              fill="#FFB056"
            />
          </svg>
        </div>
      );

    default:
      return (
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
      );
  }
}

export default Notification;
