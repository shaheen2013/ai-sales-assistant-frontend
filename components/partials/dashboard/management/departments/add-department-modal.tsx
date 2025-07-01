import { Button } from "@/components/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/shadcn/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/form";
import { Input } from "@/components/shadcn/input";
import { useAddDepartmentMutation } from "@/features/dealer/dealerManagementSlice";
import { useToast } from "@/hooks/useToast";
import { handleApiError } from "@/lib/utils";
import { DepartmentDataType } from "@/types/dealerManagementSliceType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Define form schema with validation
const formSchema = z.object({
  department_name: z.string().min(1, "Department name is required"),
  department_email: z.union([
    z.literal(""),
    z.string().email("Invalid email address"),
  ]),
});

// Type for form data
type FormData = z.infer<typeof formSchema>;

const AddNewDepartmentModal = ({
  open,
  onOpenChange,
  allDepartments,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  allDepartments: DepartmentDataType[];
}) => {
  const toast = useToast();

  // const [customDepartment, setCustomDepartment] = useState('');
  // const [departments, setDepartments] = useState<string[]>([]);

  // Update departments list when allDepartments changes
  useEffect(() => {
    // const dynamicDepartmentNames =
    //   allDepartments?.map((dept: DepartmentDataType) => dept.department_name) ||
    //   [];

    // Combine all department names, removing duplicates
    // const allNames = [...new Set([...dynamicDepartmentNames])];

    // setDepartments(allNames);
  }, [allDepartments]);

  const [addDepartment, { isLoading }] = useAddDepartmentMutation();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      department_name: "",
      department_email: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    const payload = {
      department_name: data.department_name,
      department_email: data.department_email,
      employees: [],
    } as DepartmentDataType;
    try {
      await addDepartment(payload).unwrap();
      toast("success", "Department added successfully");
    } catch (error: any) {
      toast("error", handleApiError(error));
    }
    form.reset();
    onOpenChange(false);
  };

  // Reset custom input when modal closes
  useEffect(() => {
    if (!open) {
      // setCustomDepartment('');
      form.reset();
    }
  }, [open, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-4">
        <DialogHeader>
          <DialogTitle className="text-gray-300">Add Department</DialogTitle>
        </DialogHeader>
        <DialogDescription className="hidden"></DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col gap-4 border-t border-b border-[#EFF4FA] py-4">
              {/* Department name & email */}
              <div className="flex flex-col  gap-3 items-start md:items-center w-full justify-between">
                <FormField
                  control={form.control}
                  name="department_name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-sm text-gray-700 font-medium">
                        Department Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <Input
                        {...field}
                        placeholder="Enter new department name"
                        className="border-[#d5d7da] rounded-md focus:border-[#019935] focus:ring-[#019935]"
                      />
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
                        Department Email <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
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
                {isLoading ? "Adding..." : "Add Department"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewDepartmentModal;
