import {
  DealerProfileType,
  DealerUpdatePasswordType,
} from "@/types/dealerProfileSliceType";

import { apiSlice } from "../api/apiSlice";

export const dealerProfileSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDealerProfile: builder.query<DealerProfileType, void>({
      query: () => ({
        url: "/dealer-dashboard/profile/",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["dealerProfile"],
    }),

    updateDealerProfile: builder.mutation<DealerProfileType, FormData>({
      query: (formData) => ({
        url: "/update-profile",
        method: "PATCH",
        body: formData,
        formData: true,
        credentials: "include",
      }),
      invalidatesTags: ["dealerProfile"],
    }),

    getNotificationSettings: builder.query({
      query: () => ({
        url: "/notification-settings-configuration",
        method: "GET",
        credentials: "include",
      }),
    }),

    updateNotificationSettings: builder.mutation({
      query: (data) => ({
        url: "/notification-settings-configuration",
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
    }),

    updateDealerPassword: builder.mutation<any, DealerUpdatePasswordType>({
      query: (data) => ({
        url: "/password-change",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    getDealerPricingPlans: builder.query<any, void>({
      query: () => ({
        url: "/stripe/subscriptions/available_plans/",
        method: "GET",
      }),
    }),

    getCurrentSubscriptionPlan: builder.query<any, void>({
      query: () => ({
        url: "/stripe/subscriptions/current_subscription/",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["pricingPlans"],
    }),

    createSubscription: builder.mutation<any, any>({
      query: (data) => ({
        url: "/stripe/subscriptions/create_subscription/",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["pricingPlans"],
    }),

    upgradeSubscription: builder.mutation<any, any>({
      query: (data) => ({
        url: "/stripe/subscriptions/upgrade_subscription/",
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["pricingPlans"],
    }),

    getBillingHistory: builder.query<any, void>({
      query: () => ({
        url: "/dealer-dashboard/invoices/",
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetDealerProfileQuery,
  useUpdateDealerProfileMutation,
  useGetNotificationSettingsQuery,
  useUpdateNotificationSettingsMutation,
  useUpdateDealerPasswordMutation,
  useGetDealerPricingPlansQuery,
  useGetCurrentSubscriptionPlanQuery,
  useCreateSubscriptionMutation,
  useUpgradeSubscriptionMutation,
  useGetBillingHistoryQuery,
} = dealerProfileSlice;
