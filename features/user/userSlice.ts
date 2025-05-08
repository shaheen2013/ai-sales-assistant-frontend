/* eslint-disable @typescript-eslint/no-unused-vars */
import { apiSlice } from '../api/apiSlice';

export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getUserData: builder.query({
    //     query: () => ({
    //         url: `/user`,
    //         credentials: "include"
    //     }),
    //     providesTags: ["getUserData"],
    // })
  }),
});

export const {
  // useGetUserDataQuery
} = userSlice;
