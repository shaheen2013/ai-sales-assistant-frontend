enum RoutingType {
  MOBILE = 'MOBILE',
  OFFICE = 'OFFICE',
}

interface Employee {
  id: number;
  name: string;
  routing_type: RoutingType;
  phone_number: string;
}

export interface DepartmentType {
  id: number;
  department_name: string;
  department_email: string;
  employees: Employee[];
}
