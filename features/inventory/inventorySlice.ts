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
        const params = createQueryParams(data);

        return {
          url: `/v1/dealer/vehicle-inventory?=${params}`,
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

    editVehicleInventory: builder.mutation({
      query: (data) => {
        const { id, ...rest } = data;
        return {
          url: `/v1/dealer/vehicle-inventory${id}/`,
          method: "PATCH",
          body: rest,
          credentials: "include",
        };
      },
    }),

    deleteVehicleInventory: builder.mutation({
      query: (params) => {
        const { id } = params;
        return {
          url: `/v1/dealer/vehicle-inventory${id}/`,
          method: "DELETE",
          credentials: "include",
        };
      },
    }),

    getVehicles: builder.query({
      query: (data) => ({
        url: `/dealers/vehicles`,
        method: "GET",
        body: data,
        credentials: "include",
      }),
    }),

    // inventory files
    getInventoryFiles: builder.query({
      query: () => {
        return {
          url: `/dealers/vehicles`,
          method: "GET",
          credentials: "include",
        };
      },
    }),
  }),
});

export const {
  useVehicleInventoryUploadMutation,
  useGetVehicleInventoryQuery,
  useCreateVehicleInventoryMutation,
  useEditVehicleInventoryMutation,
  useDeleteVehicleInventoryMutation,

  useGetVehiclesQuery,

  useGetInventoryFilesQuery,
} = inventorySlice;
