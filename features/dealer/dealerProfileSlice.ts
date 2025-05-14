import { DealerProfileType } from '@/types/dealer-profile';
import { apiSlice } from '../api/apiSlice';

export const dealerProfileSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDealerProfile: builder.query<DealerProfileType, void>({
      query: () => ({
        url: '/dealer-dashboard/profile/',
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['dealerProfile'],
    }),

    updateDealerProfile: builder.mutation<DealerProfileType, FormData>({
      query: (formData) => ({
        url: '/update-profile',
        method: 'PATCH',
        body: formData,
        formData: true,
        credentials: 'include',
      }),
      invalidatesTags: ['dealerProfile'],
    }),
  }),
});

export const { useGetDealerProfileQuery, useUpdateDealerProfileMutation } =
  dealerProfileSlice;
