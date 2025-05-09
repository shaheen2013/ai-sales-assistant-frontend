export interface UserDataType {
    id: number;
    last_login: string;
    created_at: string;
    updated_at: string;
    street_address?: string;
    zip_code?: string;
    city?: string;
    state?: string;
    country?: string;
    lat?: string;
    lng?: string;
    county?: string;
    email: string;
    name: string;
    phone_number?: string | null;
    about?: string | null;
    profile_picture?: string | null;
    is_active: boolean;
    is_verified: boolean;
    uuid: string;
    user_type: 'admin' | 'user';
    groups: string[];
    user_permissions: string[];
}