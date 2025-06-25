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
import { useAddEmployeeToDepartmentMutation } from "@/features/dealer/dealerManagementSlice";
import { useToast } from "@/hooks/useToast";
import { beautifyErrors, handleApiError } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { PhoneInput } from "../../settings/phone-input-with-country-list";
import { isValidPhoneNumber } from "react-phone-number-input";

// Define form schema with validation
// const formSchema = z.object({
//   name: z.string().min(1, "Employee name is required"),
//   phone_number: z
//     .string()
//     .min(1, "Phone number is required")
//     .refine(
//       (value) => {
//         return isValidPhoneNumber(value);
//       },
//       { message: "Invalid phone number" }
//     ),
// });

// Type for form data
// type FormData = z.infer<typeof formSchema>;

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
  const form = useForm({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone_number: "+1",
    },
  });

  const onSubmit = async (data: any) => {
    const payload = {
      name: data.name,
      phone_number: data.phone_number,
    };

    try {
      const { data, error }: any = await addEmployeeToDepartment({
        id: departmentId,
        data: payload,
      });

      if (error) {
        console.error(
          "Error adding employee:",
          error?.data?.message?.employees
        );

        toast(
          "error",
          error?.data?.message?.employees || "Failed to add employee"
        );
        return;
      }

      console.log("Employee added successfully:", data);

      form.reset();
      onOpenChange(false);
    } catch (error: any) {
      console.log("Error adding employee:", error);
    }
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
              <div className="flex flex-col md:flex-row gap-3 items-start w-full justify-between">
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
                          {...field}
                          defaultCountry="US"
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
                {isLoading ? "Adding..." : "Add Employee"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEmployeeModal;
