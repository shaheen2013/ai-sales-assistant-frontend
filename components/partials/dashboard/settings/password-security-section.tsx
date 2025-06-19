"use client";

import Button from "@/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/shadcn/form";
import { InputPassword } from "@/components/shadcn/input";
import { useUpdateDealerPasswordMutation } from "@/features/dealer/dealerProfileSlice";
import { useToast } from "@/hooks/useToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Password validation schema
const passwordSchema = z
  .object({
    old_password: z.string().min(1, "Old password is required"),
    new_password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(
        /[\d\W\s]/,
        "Password must contain at least one number, symbol, or whitespace"
      ),
    confirm_password: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function PasswordAndSecuritySection() {
  const toast = useToast();
  const [updateDealerPassword, { isLoading }] =
    useUpdateDealerPasswordMutation();

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (data: PasswordFormValues) => {
    try {
      const response = await updateDealerPassword({
        old_password: data.old_password,
        new_password: data.new_password,
      }).unwrap();

      if (response) {
        toast("success", "Password updated successfully");
        form.reset();
      }
    } catch (error: any) {
      toast("error", error.data?.detail || "Failed to update password");
    }
  };

  return (
    <div className="w-full p-6 border border-gray-50 rounded-2xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[#2b3545] text-3xl font-medium">
          Password and Security
        </h1>
        {/* <p className="text-[#9da2a9]">Last update: May, 14</p> */}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <h2 className="text-[#555d6a] text-xl font-medium mb-2">
              Change Password
            </h2>
            <div className="border-b border-[#eaebec] pb-2"></div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="old_password"
                className="text-[#555d6a] font-normal"
              >
                Old Password <span className="text-red-500">*</span>
              </label>
              <FormField
                control={form.control}
                name="old_password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputPassword
                        {...field}
                        id="old_password"
                        className="border-[#d5d7da] rounded-md p-3 h-14"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="new_password"
                  className="text-[#555d6a] font-normal"
                >
                  New Password <span className="text-red-500">*</span>
                </label>
                <FormField
                  control={form.control}
                  name="new_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputPassword
                          {...field}
                          id="new_password"
                          className="border-[#d5d7da] rounded-md p-3 h-14"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="confirm_password"
                  className="text-[#555d6a] font-normal"
                >
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <FormField
                  control={form.control}
                  name="confirm_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputPassword
                          {...field}
                          id="confirm_password"
                          className="border-[#d5d7da] rounded-md p-3 h-14"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-[#555d6a] font-medium">
                Password Requirements:
              </h3>
              <ul className="space-y-2 list-disc pl-6 text-[#555d6a]">
                <li>Minimum 8 characters long - the more, the better</li>
                <li>At least one lowercase character</li>
                <li>At least one number, symbol, or whitespace character</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#eaebec] pt-4"></div>

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline-gray"
              className="!border text-[#555d6a] px-6 rounded-md h-12"
              onClick={() => form.reset()}
            >
              Discard
            </Button>
            <Button
              type="submit"
              className=""
              variant="primary"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
