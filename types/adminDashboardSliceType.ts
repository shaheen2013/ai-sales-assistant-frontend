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