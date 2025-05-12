import { apiSlice } from '../api/apiSlice';

export const dealerProfileSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDealerProfile: builder.query<any, void>({
      query: () => ({
        url: `/dealer-dashboard/profile`,
        method: 'GET',
        credentials: 'include',
      }),
    }),

    updateDealerProfile: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: '/dealer-dashboard/profile',
        method: 'POST',
        body: formData,
        formData: true,
      }),
    }),
  }),
});

export const { useGetDealerProfileQuery, useUpdateDealerProfileMutation } =
  dealerProfileSlice;
