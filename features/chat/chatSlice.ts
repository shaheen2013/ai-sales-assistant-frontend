import { apiSlice } from "../api/apiSlice";

export const chatSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    startCarSaleChat: builder.mutation({
      query: (data) => ({
        url: `/admin-dashboard/sales-agent-admin-to-dealer/`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    startChat: builder.mutation({
      query: (data) => ({
        url: `/v1/chat/`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: [],
    }),
  }),
});

export const { useStartChatMutation, useStartCarSaleChatMutation } = chatSlice;
