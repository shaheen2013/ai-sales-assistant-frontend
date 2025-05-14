import {
  DealerProfileType,
  DealerUpdatePasswordType,
} from '@/types/dealerProfileSliceType';

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

    updateDealerPassword: builder.mutation<DealerUpdatePasswordType, void>({
      query: (data) => ({
        url: '/password-change',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),
  }),
});

export const {
  useGetDealerProfileQuery,
  useUpdateDealerProfileMutation,
  useUpdateDealerPasswordMutation,
} = dealerProfileSlice;
