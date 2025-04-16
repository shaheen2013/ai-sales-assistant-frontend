import { apiSlice } from "../api/apiSlice";
import { PricingResponseType } from "./pricingSlice";

export const pricingSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBillingPrices: builder.query({
      query: (queryParams) => ({
        method: "GET",
        url: `/billing/plans`,
        params: queryParams,
      }),
      transformResponse: (response: PricingResponseType) => {
        const { prices, products, tax_rates } = response;

        const mergedProducts = products.map((product) => ({
          ...product,
          price: prices?.find((price) => price?.product === product?.id),
        }));

        return { products: mergedProducts, tax_rates };
      },
    }),

    validatePromoCode: builder.query({
      query: (queryParams) => ({
        method: "GET",
        url: `/billing/validate_promo_code`,
        params: queryParams,
      }),
    }),
  }),
});

export const { useGetBillingPricesQuery, useLazyValidatePromoCodeQuery } = pricingSlice;
