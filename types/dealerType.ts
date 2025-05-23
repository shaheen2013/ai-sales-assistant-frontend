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