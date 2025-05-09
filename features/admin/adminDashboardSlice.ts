import { AdminDashboardResponseType } from "@/types/adminDashboardSliceType";
import { apiSlice } from "../api/apiSlice";

export const adminDashboardSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminDashboard: builder.query<AdminDashboardResponseType, void>({
      query: () => ({
        method: "GET",
        url: `/admin-dashboard/admin`,
      }),
    }),
  }),
});

export const { useGetAdminDashboardQuery } = adminDashboardSlice;
