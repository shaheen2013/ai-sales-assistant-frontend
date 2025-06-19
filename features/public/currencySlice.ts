import { apiSlice } from "../api/apiSlice";

export const currencySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurrency: builder.query({
      query: () => ({
        method: "GET",
        url: `/get_currency`,
      }),
      transformErrorResponse: (response) => {
        return response.data;
      },
    }),
  }),
});

export const { useGetCurrencyQuery } = currencySlice;
