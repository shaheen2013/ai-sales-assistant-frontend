import { apiSlice } from "../api/apiSlice";

export const authSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerDealer: builder.mutation({
      query: ({ data, queryParams }) => ({
        url: `/dealer-registration`,
        method: "POST",
        body: data,
        params: queryParams,
      }),
      invalidatesTags: ["user"],
    }),

    registerWithGoogle: builder.mutation({
      query: (data) => ({
        url: `/user-google-login`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["user"],
    }),

    login: builder.mutation({
      query: (data) => ({
        url: `/access-token`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["user"],
    }),

    loginSocial: builder.mutation({
      query: ({ source, method }) => ({
        url: `/auth/url?source=${source}&method=${method}`,
        method: "GET",
      }),
      invalidatesTags: ["user"],
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: `/request-reset-password`,
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: `/reset-password`,
        method: "POST",
        body: data,
      }),
    }),

    emailConfirmed: builder.query({
      query: (data) => ({
        url: `/email_confirmation`,
        method: "POST",
        body: data,
      }),
    }),

    emailVerification: builder.query({
      query: (data) => ({
        url: `/email-verify`,
        method: "POST",
        body: data,
      }),
    }),

    resendEmailVerification: builder.mutation({
      query: (data) => ({
        url: `/resend-email-verification`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    })
  }),
});

export const {
  useLoginMutation,
  useRegisterDealerMutation,
  useRegisterWithGoogleMutation,

  useEmailConfirmedQuery,
  useLoginSocialMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useEmailVerificationQuery,
  useResendEmailVerificationMutation,
} = authSlice;
