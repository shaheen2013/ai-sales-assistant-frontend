import { createQueryParams } from "@/lib/utils";
import { apiSlice } from "../api/apiSlice";

export const inventorySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    vehicleInventoryUpload: builder.mutation({
      query: (data) => ({
        url: `/v1/dealer-vehicle-inventory-upload`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    deleteVehicleInventoryFile: builder.mutation({
      query: (params) => {
        const { id } = params;
        return {
          url: `/v1/dealer-vehicle-inventory-delete/${id}/`,
          method: "DELETE",
          credentials: "include",
        };
      },
    }),

    getVehicleInventory: builder.query({
      query: (data) => {
        const params = createQueryParams(data);

        return {
          url: `/v1/dealer/vehicle-inventory${params}`,
          method: "GET",
          credentials: "include",
        };
      },

      providesTags: ["getVehicleInventory"],
    }),

    createVehicleInventory: builder.mutation({
      query: (data) => ({
        url: `/v1/dealer/vehicle-inventory`,
        method: "POST",
        body: data,
        credentials: "include",
      }),

      invalidatesTags: ["getVehicleInventory"],
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

      invalidatesTags: ["getVehicleInventory"],
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

      invalidatesTags: ["getVehicleInventory"],
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
          url: `/inventory/files`,
          method: "GET",
          credentials: "include",
        };
      },
    }),
  }),
});

export const {
  useVehicleInventoryUploadMutation,
  useDeleteVehicleInventoryFileMutation,
  useGetVehicleInventoryQuery,
  useCreateVehicleInventoryMutation,
  useEditVehicleInventoryMutation,
  useDeleteVehicleInventoryMutation,

  useGetVehiclesQuery,

  useGetInventoryFilesQuery,
} = inventorySlice;
