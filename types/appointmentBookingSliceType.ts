type EmployeeType = {
    id: string;
    name: string;
    routing_type: string;
    phone_number: string;
}

export type DepartmentType = {
    id: number;
    department_name: string;
    department_email: string;
    employees: EmployeeType[]
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

export type StoreVisitResponseType = {
    id: number;
    dealer: number;
    customer: number;
    prefered_time: string;
    visit_reason: string;
    is_visited: boolean;
    created_at: string;
    updated_at: string;
};

export type AppointmentResponseType = {
    status: string;
    data: {
        talk_to_human: TalkToHumanResponseType[],
        technical_visits: StoreVisitResponseType[],
        test_drives: TestDriveResponseType[],
    }
}