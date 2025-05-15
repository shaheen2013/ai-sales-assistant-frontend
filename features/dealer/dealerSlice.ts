import { PaginatedResponse } from "@/types/paginatedType";
import { apiSlice } from "../api/apiSlice";
import { Dealer, DealerStatisticsResponseType } from "@/types/dealerType";

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
        })
    }),
});

export const { useGetDealersQuery, useGetDealerStatisticsQuery } = dealerSlice;
