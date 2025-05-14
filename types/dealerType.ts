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
