import { PaginatedResponse } from "@/types/paginatedType";
import { apiSlice } from "../api/apiSlice";
import { AppointmentResponseType, StoreVisitResponseType, TalkToHumanResponseType, TestDriveResponseType } from "@/types/appointmentBookingSliceType";

export const appointmentBookingSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTalkToHumanCallLogs: builder.query<PaginatedResponse<TalkToHumanResponseType>, Record<string, any>>({
            query: (queryParams) => ({
                method: "GET",
                url: `/call-logs/`,
                params: queryParams,
            }),
            providesTags: ["getTalkToHumanCallLogs"],
        }),
        getTestDrive: builder.query<PaginatedResponse<TestDriveResponseType>, Record<string, any>>({
            query: (queryParams) => ({
                method: "GET",
                url: `/bookings/test-drive/`,
                params: queryParams,
            }),
            providesTags: ["getTestDrive"],
        }),
        getStoreVisit: builder.query<PaginatedResponse<StoreVisitResponseType>, Record<string, any>>({
            query: (queryParams) => ({
                method: "GET",
                url: `/dealer-dashboard/technical-visits/`,
                params: queryParams,
            }),
            providesTags: ["getStoreVisit"],
        }),
        updateStoreVisitStatus: builder.mutation<StoreVisitResponseType, Record<string, any>>({
            query: ({ id, data }) => ({
                method: "PATCH",
                url: `/dealer-dashboard/technical-visits/${id}/status/`,
                body: data,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const patchResults = dispatch(
                    appointmentBookingSlice.util.updateQueryData("getStoreVisit", arg?.queryParams, (draft) => {
                        const item = draft.results?.find((visit) => visit.id === arg.id);
                        if (item) {
                            Object.assign(item, { ...item, ...arg.data });
                        }
                    })
                )

                try {
                    await queryFulfilled;
                } catch (err) {
                    patchResults.undo();
                }
            }
        }),
        updateTalkToHumanStatus: builder.mutation<StoreVisitResponseType, Record<string, any>>({
            query: ({ id, data }) => ({
                method: "PATCH",
                url: `/talk-to-human-bookings/${id}/update/`,
                body: data,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const patchResults = dispatch(
                    appointmentBookingSlice.util.updateQueryData("getTalkToHumanCallLogs", arg?.queryParams, (draft) => {
                        const item = draft.results?.find((visit) => visit.id === arg.id);
                        console.log("item--->", item);
                        if (item) {
                            Object.assign(item, { ...item, ...arg.data });
                        }
                    })
                )

                try {
                    await queryFulfilled;
                } catch (err) {
                    patchResults.undo();
                }
            }
        }),
        updateTestDriveBookingStatus: builder.mutation<StoreVisitResponseType, Record<string, any>>({
            query: ({ id, data }) => ({
                method: "PATCH",
                url: `/dealer-dashboard/test-drive/${id}/status/`,
                body: data,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const patchResults = dispatch(
                    appointmentBookingSlice.util.updateQueryData("getTestDrive", arg?.queryParams, (draft) => {
                        const item = draft.results?.find((visit) => visit.id === arg.id);
                        if (item) {
                            Object.assign(item, { ...item, ...arg.data });
                        }
                    })
                )

                try {
                    await queryFulfilled;
                } catch (err) {
                    patchResults.undo();
                }
            }
        }),
        getAppoinments: builder.query<AppointmentResponseType, Record<string, any>>({
            query: (queryParams) => ({
                method: "GET",
                url: `/dealer-dashboard/bookings/by-date/`,
                params: queryParams,
            }),
        })
    }),
});

export const { useGetTalkToHumanCallLogsQuery, useGetTestDriveQuery, useGetStoreVisitQuery, useUpdateStoreVisitStatusMutation, useGetAppoinmentsQuery, useUpdateTalkToHumanStatusMutation, useUpdateTestDriveBookingStatusMutation } = appointmentBookingSlice;
