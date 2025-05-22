import { PaginatedResponse } from "@/types/paginatedType";
import { apiSlice } from "../api/apiSlice";
import { StoreVisitResponseType, TalkToHumanResponseType, TestDriveResponseType } from "@/types/appointmentBookingSliceType";

export const appointmentBookingSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTalkToHumanCallLogs: builder.query<PaginatedResponse<TalkToHumanResponseType>, Record<string, any>>({
            query: (queryParams) => ({
                method: "GET",
                url: `/call-logs/`,
                params: queryParams,
            }),
        }),
        getTestDrive: builder.query<PaginatedResponse<TestDriveResponseType>, Record<string, any>>({
            query: (queryParams) => ({
                method: "GET",
                url: `/bookings/test-drive/`,
                params: queryParams,
            }),
        }),
        getStoreVisit: builder.query<PaginatedResponse<StoreVisitResponseType>, Record<string, any>>({
            query: (queryParams) => ({
                method: "GET",
                url: `/dealer-dashboard/technical-visits/`,
                params: queryParams,
            }),
        }),
    }),
});

export const { useGetTalkToHumanCallLogsQuery, useGetTestDriveQuery, useGetStoreVisitQuery } = appointmentBookingSlice;
