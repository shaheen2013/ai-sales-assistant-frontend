import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    mode: "cors",
    credentials: "include",
    prepareHeaders: async (headers) => {
      try {
        const { access } = (await getSession()) ?? {};
        if (access) {
          headers.set("Authorization", `Bearer ${access}`);
        }
        headers.set("Accept", "application/json");
      } catch (error) {
        console.log(error);
      }
      return headers;
    },
  }),
  tagTypes: [
    "user",
    "dealerProfile",
    "getAdminAllSupportTickets",
    "departmentsData",
    "pricingPlans",
    "getDealerAllSupportTickets",
    "getStoreVisit",
    "getTalkToHumanCallLogs",
    "getTestDrive",
    "getNewsLetter",
    "getVehicleInventory",
  ],
  endpoints: () => ({}),
});
