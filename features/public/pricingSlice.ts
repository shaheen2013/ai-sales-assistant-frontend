import { apiSlice } from "../api/apiSlice";

type DescriptionDataType = {
  en?: string;
  fr?: string;
  de?: string;
  nl?: string;
  el?: string;
  es?: string;
  pt?: string;
  it?: string;
  fi?: string;
  pl?: string;
  sv?: string;
  tr?: string;
  ar?: string;
  zh?: string;
  zh_yue?: string;
  hi?: string;
  ur?: string;
  ja?: string;
  ko?: string;
};

type RecurringDataType = {
  interval: "day" | "week" | "month" | "year";
  interval_count: number;
};

export type TaxDataType = {
  id: string;
  object: "tax_rate";
  active: boolean;
  country: string;
  created_at: number;
  description: string | null;
  inclusive: boolean;
  individual_only: boolean;
  live_mode: boolean;
  percentage: number;
  type: "vat" | "sales_tax" | "gst" | "other";
  display_name : string;
};

type TierDataType = {
  up_to: number;
  unit_amount: number;
};

type PriceDataType = {
  id: string;
  object: "price";
  active: boolean;
  billing_scheme: "per_unit" | "tiered";
  created_at: number;
  currency: string;
  live_mode: boolean;
  product: string;
  recurring: RecurringDataType;
  saving_percent: number | null;
  tiers: TierDataType[];
  tiers_mode: string | null;
  type: "one_time" | "recurring";
  unit_amount: number;
};

type ProductDataType = {
  id: string;
  object: "product";
  active: boolean;
  allow_discount: boolean;
  billing_type: string | null;
  code: string;
  created_at: number;
  description: DescriptionDataType[];
  level: number;
  live_mode: boolean;
  name: string;
  sub_type: string;
  type: string;
  unit_label: string | null;
  price: PriceDataType;
};

export type PricingResponseType = {
  products: ProductDataType[];
  prices: PriceDataType[];
  tax_rates: TaxDataType[];
};

export const pricingSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPrices: builder.query({
      query: (queryParams) => ({
        method: "GET",
        url: `/billing_plans`,
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
  }),
});

export const { useGetPricesQuery } = pricingSlice;
