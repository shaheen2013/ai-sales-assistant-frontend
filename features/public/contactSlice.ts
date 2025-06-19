import { apiSlice } from "../api/apiSlice";

export const contactFormSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    contact: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: `/contact_form`,
        body: data,
      }),
      transformErrorResponse: (response) => {
        return response.data;
      },
    }),
  }),
});

export const { useContactMutation } = contactFormSlice;
