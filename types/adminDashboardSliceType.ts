type MonthlyData = {
  month: string;
  reach: number;
  engagement: number;
}

type GrowthData = {
  last_month_total: number;
  growth: number;
}


export type AdminDashboardResponseType = {
  dealer: GrowthData;
  payment: GrowthData;
  visitor: GrowthData;
  call_history: GrowthData;
  graph_data: MonthlyData[];

  [key: string]: any;
}

interface CountryData {
  country: string;
  percentage: number;
  count: number;
}

interface DealerData {
  last_month_total: number;
  growth: number;
}

interface TopDealer {
  business_name: string | null;
  created_at: string;
  image: string;
}

export type AdminDashboardDealerOverviewResponseType = {
  country: CountryData[];
  dealer: DealerData;
  paid_dealer: DealerData;
  top_dealer: TopDealer[];
}