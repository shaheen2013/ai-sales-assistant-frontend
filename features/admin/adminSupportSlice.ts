import { SupportTicketType } from "@/types/supportTicketType";
import { apiSlice } from "../api/apiSlice";

export const adminSupportSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAdminAllSupportTickets: builder.query<SupportTicketType[], Record<string, any>>({
            query: (queryParams) => ({
                method: "GET",
                url: `/admin-dashboard/support-tickets`,
                params: queryParams,
            }),
            providesTags: ["getAdminAllSupportTickets"],
        }),
        updateAdminSupportTicket: builder.mutation<SupportTicketType, Record<string, any>>({
            query: ({ticketId, data}) => ({
                method: "PUT",
                url: `/admin-dashboard/support-tickets/${ticketId}/status/`,
                body: data,
            }),
            invalidatesTags: ["getAdminAllSupportTickets"]
        })
    }),
});

export const { useGetAdminAllSupportTicketsQuery, useUpdateAdminSupportTicketMutation } = adminSupportSlice;
