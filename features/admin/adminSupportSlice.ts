import { SupportStatusCountType, SupportTicketType } from "@/types/supportTicketType";
import { apiSlice } from "../api/apiSlice";
import { PaginatedResponse } from "@/types/paginatedType";

export const adminSupportSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAdminAllSupportTickets: builder.query({
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
        }),
        deleteAdminSupportTicket: builder.mutation<SupportTicketType, string>({
            query: (ticketId) => ({
                method: "DELETE",
                url: `/admin-dashboard/support-tickets/${ticketId}/delete/`,
            }),
            invalidatesTags: ["getAdminAllSupportTickets"]
        })
    }),
});

export const { useGetAdminAllSupportTicketsQuery, useUpdateAdminSupportTicketMutation, useDeleteAdminSupportTicketMutation } = adminSupportSlice;
