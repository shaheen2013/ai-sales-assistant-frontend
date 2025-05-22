import { PaginatedResponse } from "@/types/paginatedType";
import { apiSlice } from "../api/apiSlice";
import { Dealer, DealerRegistrationSourceCount, DealerStatisticsResponseType } from "@/types/dealerType";
import { SupportStatusCountType, SupportTicketType } from "@/types/supportTicketType";

export const dealerSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDealers: builder.query<PaginatedResponse<Dealer>, Record<string, any>>({
            query: (queryParams) => ({
                method: "GET",
                url: `/admin-dashboard/dealer`,
                params: queryParams,
            }),
        }),
        getDealerStatistics: builder.query<DealerStatisticsResponseType, void>({
            query: () => ({
                method: "GET",
                url: `/admin-dashboard/dealer/subscription/statistics/`,
            }),
        }),
        getDealerRegistrationCount: builder.query<DealerRegistrationSourceCount, Record<string, any>>({
            query: (queryParams) => ({
                method: "GET",
                url: `/admin-dashboard/dealer-registration-source-count/`,
                params: queryParams,
            })
        }),
        getDealerAllSupportTickets: builder.query<PaginatedResponse<SupportTicketType> & SupportStatusCountType, Record<string, any>>({
            query: (queryParams) => ({
                method: "GET",
                url: `/dealer-dashboard/tickets/`,
                params: queryParams,
            }),
            providesTags: ["getDealerAllSupportTickets"],
        }),
        createSupportTicket: builder.mutation<SupportTicketType, Record<string, any>>({
            query: (data) => ({
                method: "POST",
                url: `/dealer-dashboard/tickets/create/`,
                body: data
            }),
            invalidatesTags: ["getDealerAllSupportTickets"],
        })
    }),
});

export const { useGetDealersQuery, useGetDealerStatisticsQuery, useGetDealerRegistrationCountQuery, useGetDealerAllSupportTicketsQuery, useCreateSupportTicketMutation } = dealerSlice;
