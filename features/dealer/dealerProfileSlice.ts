import {
  DealerNotificationSettingsType,
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

    updateNotificationSettings: builder.mutation<
      any,
      DealerNotificationSettingsType
    >({
      query: (data) => ({
        url: '/notification-settings-configuration',
        method: 'PATCH',
        body: data,
        credentials: 'include',
      }),
    }),
    updateDealerPassword: builder.mutation<any, DealerUpdatePasswordType>({
      query: (data) => ({
        url: '/password-change',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),
    getDealerPricingPlans: builder.query<any, void>({
      query: () => ({
        url: '/stripe/subscriptions/available_plans/',
        method: 'GET',
      }),
    }),
    getCurrentSubscriptionPlan: builder.query<any, void>({
      query: () => ({
        url: '/stripe/subscriptions/current_subscription/',
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['pricingPlans'],
    }),
    upgradeSubscription: builder.mutation<any, any>({
      query: (data) => ({
        url: '/stripe/subscriptions/upgrade_subscription/',
        method: 'PATCH',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['pricingPlans'],
    }),
  }),
});

export const {
  useGetDealerProfileQuery,
  useUpdateDealerProfileMutation,
  useUpdateNotificationSettingsMutation,
  useUpdateDealerPasswordMutation,
  useGetDealerPricingPlansQuery,
  useGetCurrentSubscriptionPlanQuery,
  useUpgradeSubscriptionMutation,
} = dealerProfileSlice;
