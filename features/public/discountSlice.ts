import { apiSlice } from "../api/apiSlice";

type CouponDataType = {
  id: string;
  object: "coupon";
  amount_off: number | null;
  created_at: number;
  currency_options: any | null;
  duration: "forever" | "once" | "repeating";
  duration_in_months: number | null;
  live_mode: boolean;
  max_redemptions: number | null;
  name: string;
  names: string[];
  percent_off: number;
  products: string[];
  redeem_by: number | null;
  retention: boolean;
  special_code: string;
  valid: boolean;
};

type PromoCodeDataType = {
  id: string;
  object: "promo_code";
  active: boolean;
  code: string;
  coupon: CouponDataType;
  created_at: number;
  expires_at: number;
  live_mode: boolean;
  max_redemptions: number | null;
  user: string | null;
};

type GetDiscountDataResponseType = {
  promo_codes: PromoCodeDataType[];
};

export const discountSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDiscount: builder.query<
      GetDiscountDataResponseType,
      Record<string, any>
    >({
      query: (queryParams) => ({
        method: "GET",
        url: `/billing_discounts`,
        params: queryParams,
      }),
    }),
  }),
});

export const { useGetDiscountQuery } = discountSlice;
