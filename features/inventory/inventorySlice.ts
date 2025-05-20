import { createQueryParams } from "@/lib/utils";
import { apiSlice } from "../api/apiSlice";

export const inventorySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // v1
    vehicleInventoryUpload: builder.mutation({
      query: (data) => ({
        url: `/v1/dealer-vehicle-inventory-upload`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    getVehicleInventory: builder.query({
      query: (data) => {
        const { page, limit, ...rest } = data;

        const params = createQueryParams(data, { removeNullish: true });

        console.log(params);

        return {
          url: `/v1/dealer/vehicle-inventory`,
          method: "GET",
          credentials: "include",
        };
      },
    }),

    createVehicleInventory: builder.mutation({
      query: (data) => ({
        url: `/v1/dealer/vehicle-inventory`,
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

export const {
  useVehicleInventoryUploadMutation,
  useGetVehicleInventoryQuery,
  useCreateVehicleInventoryMutation,

  useGetVehiclesQuery,
} = inventorySlice;
