import { apiSlice } from '../api/apiSlice';

export const dealerProfileSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDealerProfile: builder.query({
      query: () => ({
        url: `/dealer-dashboard/profile`,
        method: 'GET',
        credentials: 'include',
      }),
    }),
  }),
});

export const { useGetDealerProfileQuery } = dealerProfileSlice;
