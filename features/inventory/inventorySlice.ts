import { apiSlice } from "../api/apiSlice";

export const inventorySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVehicles: builder.query({
      query: (data) => ({
        url: `/dealers/vehicles`,
        method: "GET",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetVehiclesQuery } = inventorySlice;
