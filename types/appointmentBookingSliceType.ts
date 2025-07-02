type EmployeeType = {
  id: string;
  name: string;
  routing_type: string;
  phone_number: string;
};

export type DepartmentType = {
  id: number;
  department_name: string;
  department_email: string;
  employees: EmployeeType[];
};

type CustomerType = {
  id: number;
  name: string;
  email: string;
  phone_number: string;
};

export type TalkToHumanResponseType = {
  id: number;
  dealer: string;
  customer: CustomerType;
  preferred_date_time: string;
  department: DepartmentType;
  is_talked: boolean;
  created_at: string;
};

export type TestDriveResponseType = {
  id: number;
  start_at: string;
  booking_status: string;
  customer: {
    id: number;
    name: string;
    email: string;
    phone_number: string;
  };
};

export type StoreVisitResponseType = {
  id: number;
  dealer: number;
  customer: CustomerType;
  prefered_time: string;
  visit_reason: string;
  is_visited: boolean;
  created_at: string;
  updated_at: string;
};

export type TradeInResponseType = {
  id: number;
  model_name: string;
  manufacturing_date: string;
  buying_date: string;
  defects: string;
  purchase_price: string;
  medium: string;
  is_visited: boolean;
  ai_suggested_trade_in_price: string;
  created_at: string;
};

export type AppointmentResponseType = {
  status: string;
  data: {
    talk_to_human: TalkToHumanResponseType[];
    technical_visits: StoreVisitResponseType[];
    test_drives: TestDriveResponseType[];
  };
};
