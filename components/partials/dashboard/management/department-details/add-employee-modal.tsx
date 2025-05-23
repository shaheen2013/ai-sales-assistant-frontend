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
import { useAddEmployeeToDepartmentMutation } from '@/features/dealer/dealerManagementSlice';
import { useToast } from '@/hooks/useToast';
import { beautifyErrors } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
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

const AddEmployeeModal = ({
  open,
  onOpenChange,
  departmentId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  departmentId: string;
}) => {
  const toast = useToast();

  const [addEmployeeToDepartment, { isLoading }] =
    useAddEmployeeToDepartmentMutation();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone_number: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    const payload = {
      name: data.name,
      phone_number: data.phone_number,
    };
    try {
      await addEmployeeToDepartment({
        id: departmentId,
        data: payload,
      }).unwrap();
      toast('success', 'Department added successfully');
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
            ? beautifyErrors(error) || 'Unknown error occurred.'
            : 'Unknown error occurred.';
      }

      // Ensure errorMessage is a string before trimming
      toast(
        'error',
        typeof errorMessage === 'string'
          ? errorMessage.trim()
          : String(errorMessage)
      );
    }
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-4">
        <DialogHeader>
          <DialogTitle className="text-gray-300">Add Employee</DialogTitle>
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
                disabled={isLoading}
                className="bg-[#019935] hover:bg-[#018a30] text-white"
              >
                {isLoading ? 'Adding...' : 'Add Department'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEmployeeModal;
