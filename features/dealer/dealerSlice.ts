import { PaginatedResponse } from "@/types/paginatedType";
import { apiSlice } from "../api/apiSlice";
import { CardInfo, Dealer, DealerOverviewResponseType, DealerRegistrationSourceCount, DealerStatisticsResponseType } from "@/types/dealerType";
import { SupportStatusCountType, SupportTicketType } from "@/types/supportTicketType";
import { DealerProfileType, DealerPublicProfileType } from "@/types/dealerProfileSliceType";

export const dealerSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDealers: builder.query<PaginatedResponse<Dealer>, Record<string, any>>({
            query: (queryParams) => ({
                method: "GET",
                url: `/admin-dashboard/dealer`,
                params: queryParams,
            }),
        }),
        getDealerDashboardOverview: builder.query<DealerOverviewResponseType, void>({
            query: () => ({
                method: "GET",
                url: `/dealer-dashboard/overview/`,
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
        }),
        updateDealerSupportTicket: builder.mutation<SupportTicketType, Record<string, any>>({
            query: ({ ticketId, data }) => ({
                method: "PUT",
                url: `/dealer-dashboard/tickets/${ticketId}/update/`,
                body: data
            }),
            invalidatesTags: ["getDealerAllSupportTickets"]
        }),
        deleteDealerSupportTicker: builder.mutation<SupportTicketType, string>({
            query: (ticketId) => ({
                method: "DELETE",
                url: `/dealer-dashboard/tickets/${ticketId}/delete/`,
            }),
            invalidatesTags: ["getDealerAllSupportTickets"]
        }),
        getDealerPublicProfile: builder.query<DealerPublicProfileType, number>({
            query: (id) => ({
                method: "GET",
                url: `/dealer-dashboard/public/${id}/profile/`,
            }),
        }),
        getDealerCards: builder.query<CardInfo[], void>({
            query: () => ({
                method: "GET",
                url: `/dealer-dashboard/cards/`,
            })
        }),
        getPublicDealers: builder.query<Dealer[], void>({
            query: () => ({
                method: "GET",
                url: `/dealer-dashboard/public/profile/`,
            })
        }),
        updateDealerAssistantVoice: builder.mutation({
            query: (data) => ({
                method: "PATCH",
                url: `/dealer-dashboard/voice-change/`,
                body: data
            })
        }),
    }),
});

export const { useGetDealersQuery, useGetDealerStatisticsQuery, useGetDealerRegistrationCountQuery, useGetDealerAllSupportTicketsQuery, useCreateSupportTicketMutation, useUpdateDealerSupportTicketMutation, useDeleteDealerSupportTickerMutation, useGetDealerPublicProfileQuery, useGetDealerCardsQuery, useGetPublicDealersQuery, useUpdateDealerAssistantVoiceMutation, useGetDealerDashboardOverviewQuery } = dealerSlice;
