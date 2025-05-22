import { PaginatedResponse } from "@/types/paginatedType";
import { apiSlice } from "../api/apiSlice";
import { TalkToHumanResponseType } from "@/types/appointmentBookingSliceType";

export const appointmentBookingSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTalkToHumanCallLogs: builder.query<PaginatedResponse<TalkToHumanResponseType>, Record<string, any>>({
            query: (queryParams) => ({
                method: "GET",
                url: `/call-logs/`,
                params: queryParams,
            }),
        }),
    }),
});

export const { useGetTalkToHumanCallLogsQuery } = appointmentBookingSlice;
