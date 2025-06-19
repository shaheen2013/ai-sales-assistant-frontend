import { apiSlice } from "../api/apiSlice";

export const chatSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    startChat: builder.mutation({
      query: (data) => ({
        url: `/admin-dashboard/sales-agent-admin-to-dealer/`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    dealerChat: builder.mutation({
      query: (data) => ({
        url: `/v1/chat/`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    })
  }),
});

export const { useStartChatMutation, useDealerChatMutation } = chatSlice;
