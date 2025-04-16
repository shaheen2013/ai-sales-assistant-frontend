import { apiSlice } from "../api/apiSlice";

export const authSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `/user-registration`,
        method: "POST",
        body: data,
        credentials: "include",
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
        url: `/login`,
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
        url: `/forgot_password`,
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: `/reset_password`,
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
  }),
});

export const {
  useRegisterMutation,
  useRegisterWithGoogleMutation,

  useEmailConfirmedQuery,
  useLoginMutation,
  useLoginSocialMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authSlice;
