import { PaginatedResponse } from "@/types/paginatedType";
import { apiSlice } from "../api/apiSlice";
import { NotificationDataType } from "@/types/notificationSliceType";

export const dealerSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getNotifications: builder.query<PaginatedResponse<NotificationDataType>, Record<string, any>>({
            query: (queryParams) => ({
                method: "GET",
                url: `/v1/notifications`,
                params: queryParams,
            }),
        }),
        getNotificationunreadCount: builder.query<{ total_count: number }, void>({
            query: () => ({
                method: "GET",
                url: `/v1/notifications/unread-count`,
            }),
        }),
        markAllReadNotification: builder.mutation<void, void>({
            query: () => ({
                method: "POST",
                url: `/v1/notifications/mark-all-read`,
            }),
        }),
    }),
});

export const { useGetNotificationsQuery, useGetNotificationunreadCountQuery, useMarkAllReadNotificationMutation } = dealerSlice;
