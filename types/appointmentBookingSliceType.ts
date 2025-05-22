export type DepartmentType = {
    id: number;
    department_name: string;
    department_email: string;
};

export type TalkToHumanResponseType = {
    id: number;
    dealer: string;
    customer: string;
    preferred_date_time: string;
    department: DepartmentType;
    is_talked: boolean;
    created_at: string;
};

export type TestDriveResponseType = {
    id: string;
    name: string;
    starts_at: string;
}