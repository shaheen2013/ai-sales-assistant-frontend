import { apiSlice } from '../api/apiSlice';

interface DealerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  shortBio: string;
  services: string[];
  subscription: {
    type: string;
    price: number;
  };
  cards: Array<{
    id: string;
    type: string;
    number: string;
    expiryDate: string;
    name: string;
    billingPhone: string;
    email: string;
    origin: string;
    issuer: string;
    isPrimary: boolean;
    address?: string;
  }>;
}

export const dealerProfileSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDealerProfile: builder.query<DealerProfile, void>({
      query: () => ({
        url: `/dealer-dashboard/profile`,
        method: 'GET',
        credentials: 'include',
      }),
    }),
  }),
});

export const { useGetDealerProfileQuery } = dealerProfileSlice;
