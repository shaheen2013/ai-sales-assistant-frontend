import Badge from '@/components/badge/Badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/card';
import { useGetDepartmentsQuery } from '@/features/dealer/dealerManagementSlice';

const ServicesOfferedSection = () => {
  const { data: departmentsData, isLoading, error } = useGetDepartmentsQuery();

  // Available badge variants from the Badge component
  const badgeVariants = ['green', 'purple', 'orange', 'red', 'blue'] as const;

  // Function to assign consistent colors based on department name
  const getDepartmentColor = (departmentName: string) => {
    // Use the sum of character codes to create a deterministic index
    const charSum = departmentName
      .split('')
      .reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const colorIndex = charSum % badgeVariants.length;
    return badgeVariants[colorIndex];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-gray-400">
          Services Offered
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          {departmentsData?.data?.map((department) => (
            <Badge
              key={department.id}
              variant={getDepartmentColor(department.department_name)}
              text={department.department_name}
              isDot={false}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServicesOfferedSection;
