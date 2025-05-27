import { apiSlice } from "../api/apiSlice";

export const newsLetter = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNewsLetter: builder.query({
      query: (queryParams) => ({
        method: "GET",
        url: `/admin-dashboard/news-letter/`,
        params: queryParams,
      }),
    }),
  }),
});

export const { useGetNewsLetterQuery } = newsLetter;
