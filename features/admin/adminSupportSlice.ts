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
        }),
    }),
});

export const { useGetAdminAllSupportTicketsQuery } = adminSupportSlice;
