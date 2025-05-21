import { PaginatedResponse } from "@/types/paginatedType";
import { apiSlice } from "../api/apiSlice";
import { Dealer, DealerRegistrationSourceCount, DealerStatisticsResponseType } from "@/types/dealerType";

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
        })
    }),
});

export const { useGetDealersQuery, useGetDealerStatisticsQuery, useGetDealerRegistrationCountQuery } = dealerSlice;
