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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn/select';
import { useAddDepartmentMutation } from '@/features/dealer/dealerManagementSlice';
import { useToast } from '@/hooks/useToast';
import { beautifyErrors } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { PhoneInput } from '../settings/phone-input-with-country-list';

// Define form schema with validation
const formSchema = z.object({
  department_name: z.string().min(1, 'Department name is required'),
  department_email: z
    .string()
    .email('Invalid email format')
    .min(1, 'Department email is required'),
  employee_name: z.string().min(1, 'Employee name is required'),
  employee_phone: z.string().min(1, 'Employee phone is required'),
});

// Type for form data
type FormData = z.infer<typeof formSchema>;

const AddNewPeopleModal = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const toast = useToast();
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customDepartment, setCustomDepartment] = useState('');
  const [departments, setDepartments] = useState([
    'Sales Representative',
    'Technical Advisor',
    'Customer Support Agent',
    'Finance Advisor',
  ]);

  const [addDepartment, { isLoading }] = useAddDepartmentMutation();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      department_name: '',
      department_email: '',
      employee_name: '',
      employee_phone: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    const payload = {
      department_name: data.department_name,
      department_email: data.department_email,
      employees: [
        {
          name: data.employee_name,
          phone_number: data.employee_phone,
        },
      ],
    };
    try {
      await addDepartment(payload).unwrap();
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
            ? 'An error occurred while adding the department.'
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
    form.reset();
    onOpenChange(false);
  };

  // Handle custom department input
  const handleAddCustomDepartment = () => {
    if (customDepartment && !departments.includes(customDepartment)) {
      setDepartments([...departments, customDepartment]);
      form.setValue('department_name', customDepartment);
      setCustomDepartment('');
      setShowCustomInput(false);
    }
  };

  // Reset custom input when modal closes
  useEffect(() => {
    if (!open) {
      setShowCustomInput(false);
      setCustomDepartment('');
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-4">
        <DialogHeader>
          <DialogTitle className="text-gray-300">
            Add Department & Assign People
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="hidden"></DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col gap-4 border-t border-b border-[#EFF4FA] py-4">
              {/* Department name & email */}
              <div className="flex flex-col md:flex-row gap-3 items-start md:items-center w-full justify-between">
                <FormField
                  control={form.control}
                  name="department_name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-sm text-gray-700 font-medium">
                        Department Name
                      </FormLabel>
                      {showCustomInput ? (
                        <div className="flex gap-2">
                          <Input
                            value={customDepartment}
                            onChange={(e) =>
                              setCustomDepartment(e.target.value)
                            }
                            placeholder="Enter custom department"
                            className="border-[#d5d7da] rounded-md focus:border-[#019935] focus:ring-[#019935]"
                          />
                          <Button
                            type="button"
                            onClick={handleAddCustomDepartment}
                            className="bg-[#019935] hover:bg-[#018a30] text-white"
                            disabled={!customDepartment}
                          >
                            Add
                          </Button>
                        </div>
                      ) : (
                        <Select
                          onValueChange={(value) => {
                            if (value === 'custom') {
                              setShowCustomInput(true);
                            } else {
                              field.onChange(value);
                            }
                          }}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border-[#d5d7da] focus:ring-[#019935] focus:border-[#019935]">
                              <SelectValue placeholder="Choose Department" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              {departments.map((dept) => (
                                <SelectItem
                                  key={dept}
                                  value={dept}
                                  className="flex items-center justify-between"
                                >
                                  {dept}
                                </SelectItem>
                              ))}
                              <SelectItem
                                value="custom"
                                className="text-[#019935]"
                              >
                                Add Yours
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="department_email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-sm text-gray-700 font-medium">
                        Department Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          {...field}
                          placeholder="Enter department email"
                          className="border-[#d5d7da] rounded-md focus:border-[#019935] focus:ring-[#019935]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Employee email & phone */}
              <div className="flex flex-col md:flex-row gap-3 items-start md:items-center w-full justify-between">
                <FormField
                  control={form.control}
                  name="employee_name"
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
                  name="employee_phone"
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

export default AddNewPeopleModal;
