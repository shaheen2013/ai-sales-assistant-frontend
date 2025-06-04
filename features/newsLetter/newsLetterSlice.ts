import { NewsLetterResponseType } from "@/types/newsletterType";
import { apiSlice } from "../api/apiSlice";
import { PaginatedResponse } from "@/types/paginatedType";

export const newsLetter = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNewsLetter: builder.query<PaginatedResponse<NewsLetterResponseType>, Record<string, any>>({
      query: (queryParams) => ({
        method: "GET",
        url: `/admin-dashboard/news-letter/`,
        params: queryParams,
      }),
    }),
  }),
});

export const { useGetNewsLetterQuery } = newsLetter;
