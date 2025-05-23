import { Button } from '@/components/shadcn/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shadcn/form';
import { Input } from '@/components/shadcn/input';
import { useUpdateEmployeeInDepartmentMutation } from '@/features/dealer/dealerManagementSlice';
import { useToast } from '@/hooks/useToast';
import { handleApiError } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { PhoneInput } from '../../settings/phone-input-with-country-list';

// Define form schema with validation
const formSchema = z.object({
  name: z.string().min(1, 'Employee name is required'),
  phone_number: z.string().min(1, 'Employee phone is required'),
});

// Type for form data
type FormData = z.infer<typeof formSchema>;

// Type for employee data
interface EmployeeDataType {
  id: number;
  name: string;
  routing_type: string;
  phone_number: string;
}

const EditEmployeeModal = ({
  open,
  onOpenChange,
  departmentId,
  employeeData,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  departmentId: string;
  employeeData?: EmployeeDataType;
}) => {
  const toast = useToast();

  const [updateEmployeeInDepartment, { isLoading: isUpdatingEmployee }] =
    useUpdateEmployeeInDepartmentMutation();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone_number: '',
    },
  });

  // Update form values when employeeData changes
  useEffect(() => {
    if (employeeData) {
      form.reset({
        name: employeeData.name,
        phone_number: employeeData.phone_number,
      });
    }
  }, [employeeData, form]);

  const onSubmit = async (data: FormData) => {
    const payload = {
      name: data.name,
      phone_number: data.phone_number,
    };
    try {
      await updateEmployeeInDepartment({
        id: departmentId,
        employeeId: employeeData?.id,
        data: payload,
      }).unwrap();
      toast('success', 'Employee updated successfully');
    } catch (error: any) {
      console.log(error, 'error >');
      toast('error', handleApiError(error));
    }
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-4">
        <DialogHeader>
          <DialogTitle className="text-gray-300">
            {employeeData ? 'Edit Employee' : 'Add Employee'}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="hidden"></DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col gap-4 border-t border-b border-[#EFF4FA] py-4">
              <div className="flex flex-col md:flex-row gap-3 items-start md:items-center w-full justify-between">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-sm text-gray-700 font-medium">
                        Employee Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Write employee name"
                          className="border-[#d5d7da] rounded-md focus:border-[#019935] focus:ring-[#019935]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-sm text-gray-700 font-medium">
                        Employee Phone
                      </FormLabel>
                      <FormControl>
                        <PhoneInput
                          defaultCountry="US"
                          {...field}
                          placeholder="Enter phone number"
                          className="border-[#d5d7da] rounded-md focus:border-[#019935] focus:ring-[#019935]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                onClick={() => {
                  form.reset();
                  onOpenChange(false);
                }}
                variant="outline"
                className="bg-red-500 text-white"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isUpdatingEmployee}
                className="bg-[#019935] hover:bg-[#018a30] text-white"
              >
                {isUpdatingEmployee
                  ? employeeData
                    ? 'Updating...'
                    : 'Adding...'
                  : employeeData
                  ? 'Update Employee'
                  : 'Add Employee'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditEmployeeModal;
