import {
  AdminDashboardDealerOverviewResponseType,
  AdminDashboardResponseType,
} from '@/types/adminDashboardSliceType';
import { apiSlice } from '../api/apiSlice';

export const adminDashboardSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminDashboardOverview: builder.query<AdminDashboardResponseType, Record<string, any>>({
      query: (queryParams) => ({
        method: 'GET',
        url: `/admin-dashboard/admin`,
        params: queryParams,
      }),
    }),
    getAdminDashboardDealerOverview: builder.query<
      AdminDashboardDealerOverviewResponseType,
      void
    >({
      query: () => ({
        method: 'GET',
        url: `/admin-dashboard/dealer/dealer-overview/`,
      }),
    }),
    sendNewsletter: builder.mutation<void, FormData>({
      query: (formData) => ({
        method: 'POST',
        url: `/admin-dashboard/news-letter/`,
        body: formData,
        formData: true,
        credentials: 'include',
      }),
      invalidatesTags: ['getNewsLetter']
    }),
  }),
});

export const {
  useGetAdminDashboardOverviewQuery,
  useGetAdminDashboardDealerOverviewQuery,
  useSendNewsletterMutation,
} = adminDashboardSlice;
