import { PaginatedResponse } from "@/types/paginatedType";
import { apiSlice } from "../api/apiSlice";
import { Dealer } from "@/types/dealerType";

export const dealerSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDealers: builder.query<PaginatedResponse<Dealer>, Record<string, any>>({
            query: (queryParams) => ({
                method: "GET",
                url: `/admin-dashboard/dealer`,
                params: queryParams,
            }),
        }),
    }),
});

export const { useGetDealersQuery } = dealerSlice;
