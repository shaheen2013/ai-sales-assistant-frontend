enum RoutingType {
  MOBILE = 'MOBILE',
  OFFICE = 'OFFICE',
}

interface EmployeeDataType {
  id: number;
  name: string;
  routing_type: RoutingType;
  phone_number: string;
}

export interface DepartmentDataType {
  id: number;
  department_name: string;
  department_email: string;
  employees: EmployeeDataType[];
}
