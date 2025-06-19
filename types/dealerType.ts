import { UserDataType } from "./user";

export interface Dealer {
  id: number;
  status: string;
  profile_picture: string;
  created_at: string;
  updated_at: string;
  business_name: string | null;
  business_email: string | null;
  business_summary: string | null;
  user: number;
  total_spend: number;
}

interface DealerStatisticType {
  count: number;
  growth: number;
}

export interface DealerStatisticsResponseType {
  total_dealers: DealerStatisticType;
  paid_dealers: DealerStatisticType;
  paid_conversion_rate: DealerStatisticType
}

export interface DealerRegistrationSourceMonthlyData {
  month: string;
  organic: number;
  by_ai: number;
}

export interface DealerRegistrationSourceCount {
  year: number;
  counts: DealerRegistrationSourceMonthlyData[];
}

export interface CardInfo {
  brand: string;
  last4: string;
  exp_month: number;
  exp_year: number;
  display_brand: string;
}

interface Subscription {
  start_date: string;
  end_date: string;
  status: 'active' | 'inactive' | 'cancelled';
  remain_days: number;
}

interface TalkTime {
  remaining: number;
  used: number;
  total: number;
}

export interface DealerOverviewResponseType {
  subscription: Subscription;
  phone_number: string | null;
  voice: string;
  talk_time: TalkTime;
  details: string;
}

export interface DealerCallStatsResponseType {
  current_month: {
    total_calls: number;
    total_duration: number;
    growth_percentage: number;
  };
  last_month: {
    total_calls: number;
    total_duration: number;
  };
  call_history: {
    Jan: number;
    Feb: number;
    Mar: number;
    Apr: number;
    May: number;
    Jun: number;
    Jul: number;
    Aug: number;
    Sep: number;
    Oct: number;
    Nov: number;
    Dec: number;
  };
}

interface ProductPrice {
  id: string;
  nickname: string;
  unit_amount: number;
  convert_amount: number;
  currency: string;
  recurring: null | {
    interval: string;
    interval_count: number;
  };
}

export interface ProductResponseType {
  id: string;
  name: string;
  description: string;
  prices: ProductPrice[];
}