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
import { useEditEmployeeInDepartmentMutation } from '@/features/dealer/dealerManagementSlice';
import { useToast } from '@/hooks/useToast';
import { beautifyErrors } from '@/lib/utils';
import { EmployeeDataType } from '@/types/dealerManagementSliceType';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { PhoneInput } from '../../settings/phone-input-with-country-list';

// Define form schema with validation
const formSchema = z.object({
  employee_name: z.string().min(1, 'Employee name is required'),
  employee_phone: z.string().min(1, 'Employee phone is required'),
});

// Type for form data
type FormData = z.infer<typeof formSchema>;

const EditPeopleModal = ({
  open,
  onOpenChange,
  departmentId,
  employeeData,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  departmentId: string;
  employeeData: EmployeeDataType | null;
}) => {
  const toast = useToast();

  const [editEmployeeInDepartment, { isLoading }] =
    useEditEmployeeInDepartmentMutation();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employee_name: '',
      employee_phone: '',
    },
  });

  // Populate form with employee data when it's available
  useEffect(() => {
    if (employeeData && open) {
      form.reset({
        employee_name: employeeData.name || '',
        employee_phone: employeeData.phone_number || '',
      });
    }
  }, [employeeData, form, open]);

  const onSubmit = async (data: FormData) => {
    if (!employeeData || !departmentId) {
      toast('error', 'Missing employee data');
      return;
    }

    const payload = {
      name: data.employee_name,
      phone_number: data.employee_phone,
    };

    try {
      await editEmployeeInDepartment({
        dept_id: departmentId,
        emp_id: employeeData.id,
        data: payload,
      }).unwrap();
      toast('success', 'Employee updated successfully');
      onOpenChange(false);
    } catch (error: any) {
      console.log(error, 'error >');
      // server error response
      if (error?.data?.status === 500) {
        toast('error', 'Unexpected Server Error');
      }
      // handle errors for bad request and other cases
      // Enhanced error handling for nested error structures
      let errorMessage = '';

      if (error?.data?.message) {
        // Handle top-level message if it's a string
        if (typeof error.data.message === 'string') {
          errorMessage = error.data.message;
        } else if (
          error.data.message.employees &&
          Array.isArray(error.data.message.employees)
        ) {
          // Handle employee-specific errors
          error.data.message.employees.forEach((employeeError: any) => {
            if (typeof employeeError === 'object') {
              Object.entries(employeeError).forEach(([field, fieldErrors]) => {
                if (Array.isArray(fieldErrors)) {
                  fieldErrors.forEach((fieldError: string) => {
                    errorMessage += `${field}: ${fieldError}\n`;
                  });
                }
              });
            }
          });
        }
      } else if (error?.data) {
        // Handle other field errors in data
        Object.entries(error.data).forEach(([key, value]) => {
          if (key !== 'status') {
            if (Array.isArray(value)) {
              value.forEach((msg: string) => {
                errorMessage += `${key}: ${msg}\n`;
              });
            } else if (typeof value === 'string') {
              errorMessage += `${key}: ${value}\n`;
            }
          }
        });
      }

      // Fallback if no specific error message was constructed
      if (!errorMessage) {
        errorMessage =
          error?.data?.status === 'error'
            ? 'An error occurred while updating the employee.'
            : beautifyErrors(error) || 'Unknown error occurred.';
      }

      // Ensure errorMessage is a string before trimming
      toast(
        'error',
        typeof errorMessage === 'string'
          ? errorMessage.trim()
          : String(errorMessage)
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-4">
        <DialogHeader>
          <DialogTitle className="text-gray-300">
            Edit Employee: {employeeData?.name || 'Employee'}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="hidden"></DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col gap-4 border-t border-b border-[#EFF4FA] py-4">
              {/* Employee name & phone */}
              <div className="flex flex-col md:flex-row gap-3 items-start md:items-center w-full justify-between">
                <FormField
                  control={form.control}
                  name="employee_name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-sm text-gray-700 font-medium">
                        Employee Name <span className="text-red-500">*</span>
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
                  name="employee_phone"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-sm text-gray-700 font-medium">
                        Employee Phone <span className="text-red-500">*</span>
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
                  onOpenChange(false);
                }}
                variant="outline"
                className="bg-red-500 text-white"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-[#019935] hover:bg-[#018a30] text-white"
              >
                {isLoading ? 'Updating...' : 'Update Employee'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPeopleModal;
