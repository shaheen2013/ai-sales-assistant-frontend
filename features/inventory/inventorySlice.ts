import { apiSlice } from "../api/apiSlice";

export const inventorySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    inventoryUpload: builder.mutation({
      query: (data) => ({
        url: `/v1/dealer-vehicle-inventory-upload`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    

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
