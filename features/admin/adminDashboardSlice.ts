import { AdminDashboardDealerOverviewResponseType, AdminDashboardResponseType } from "@/types/adminDashboardSliceType";
import { apiSlice } from "../api/apiSlice";

export const adminDashboardSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminDashboardOverview: builder.query<AdminDashboardResponseType, void>({
      query: () => ({
        method: "GET",
        url: `/admin-dashboard/admin`,
      }),
    }),
    getAdminDashboardDealerOverview: builder.query<AdminDashboardDealerOverviewResponseType, void>({
      query: () => ({
        method: "GET",
        url: `/admin-dashboard/dealer/dealer-overview/`,
      }),
    })
  }),
});

export const { useGetAdminDashboardOverviewQuery, useGetAdminDashboardDealerOverviewQuery } = adminDashboardSlice;
