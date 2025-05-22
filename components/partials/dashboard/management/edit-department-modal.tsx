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
import { useUpdateDepartmentMutation } from '@/features/dealer/dealerManagementSlice';
import { useToast } from '@/hooks/useToast';
import { DepartmentDataType } from '@/types/dealerManagementSliceType';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Define form schema with validation
const formSchema = z.object({
  department_name: z.string().min(1, 'Department name is required'),
  department_email: z
    .string()
    .email('Invalid email format')
    .min(1, 'Department email is required'),
});

// Type for form data
type FormData = z.infer<typeof formSchema>;

const EditDepartmentModal = ({
  open,
  onOpenChange,
  departmentId,
  allDepartments,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  departmentId: string | null;
  allDepartments: DepartmentDataType[];
}) => {
  const toast = useToast();
  const [updateDepartment, { isLoading: isUpdating }] =
    useUpdateDepartmentMutation();

  // Find the current department from allDepartments
  const currentDepartment = allDepartments?.find(
    (dept: DepartmentDataType) => dept.id === departmentId
  );

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      department_name: '',
      department_email: '',
    },
  });

  // Update form values when department data is loaded
  useEffect(() => {
    if (currentDepartment) {
      form.reset({
        department_name: currentDepartment.department_name || '',
        department_email: currentDepartment.department_email || '',
      });
    }
  }, [currentDepartment, form, open]);

  // Update department
  const onSubmit = async (data: FormData) => {
    if (!departmentId) return;
    const payload = {
      id: departmentId,
      data: {
        department_name: data.department_name,
        department_email: data.department_email,
      },
    };

    try {
      await updateDepartment(payload).unwrap();
      toast('success', 'Department updated successfully');
      onOpenChange(false);
    } catch (error: any) {
      console.error('Update error:', error);
      toast('error', error?.data?.message || 'Failed to update department');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-4">
        <DialogHeader>
          <DialogTitle className="text-gray-300">Edit Department</DialogTitle>
        </DialogHeader>
        <DialogDescription className="hidden"></DialogDescription>

        {!currentDepartment ? (
          <div className="py-4 text-center text-red-500">
            Department not found
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col gap-4 border-t border-b border-[#EFF4FA] py-4">
                {/* Department name & email */}
                <div className="flex flex-col gap-3 items-start md:items-center w-full justify-between">
                  <FormField
                    control={form.control}
                    name="department_name"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-sm text-gray-700 font-medium">
                          Department Name{' '}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            placeholder="Enter department name"
                            className="border-[#d5d7da] rounded-md focus:border-[#019935] focus:ring-[#019935]"
                          />
                        </FormControl>
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
                          Department Email{' '}
                          <span className="text-red-500">*</span>
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
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <Button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  variant="outline"
                  className="bg-red-500 text-white"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isUpdating}
                  className="bg-[#019935] hover:bg-[#018a30] text-white"
                >
                  {isUpdating ? 'Updating...' : 'Update Department'}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditDepartmentModal;
