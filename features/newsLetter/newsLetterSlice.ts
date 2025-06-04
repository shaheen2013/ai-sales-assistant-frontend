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
      providesTags: ["getNewsLetter"],
    }),
    deleteNewsLetter: builder.mutation({
      query: ({ id }) => ({
        method: "DELETE",
        url: `/admin-dashboard/news-letter/${id}/`,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        const patchResults = dispatch(
          newsLetter.util.updateQueryData("getNewsLetter", arg?.queryParams, (draft) => {
            if (draft?.results) {
              draft.results = draft.results.filter((item) => item.id !== arg.id)
            }
          })
        )

        try {
          await queryFulfilled;
        } catch (err) {
          patchResults.undo();
        }
      }
    })
  }),
});

export const { useGetNewsLetterQuery, useDeleteNewsLetterMutation } = newsLetter;
