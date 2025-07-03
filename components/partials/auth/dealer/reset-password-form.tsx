"use client";

import React from "react";
import Link from "next/link";

import { useSession } from "next-auth/react";
import { useForm, Controller } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

// components
import Button from "@/components/button";

import { beautifyErrors } from "@/lib/utils";
import { useToast } from "@/hooks/useToast";
import { InputPassword } from "@/components/shadcn/input";
import { useResetPasswordMutation } from "@/features/auth/authSlice";

export default function ResetPasswordForm() {
  const toast = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status } = useSession();

  const uid = searchParams.get("uid");
  const token = searchParams.get("token");

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const loading = status === "loading";

  type FormValues = {
    password: string;
    cpassword: string;
  };

  const { handleSubmit, control, getValues } = useForm<FormValues>({
    defaultValues: {
      password: "",
      cpassword: "",
    },
  });

  const onSubmit = async (formData: FormValues) => {
    try {
      const payload = {
        uid: uid,
        token: token,
        new_password: formData.password,
      };

      const { error, data } = await resetPassword(payload);

      if (error) {
        toast("error", beautifyErrors(error));
        console.log("error", error);

        return;
      }

      if (data) {
        toast("success", data?.detail || "Password reset successful");
        router.push("/login");
        console.log("data", data);
      }

      // const loginResponse: any = await signIn("credentials", payload);

      // if (!loginResponse.ok) {
      //   toast("error", loginResponse.error || "Login failed");
      //   return;
      // }

      // toast("success", "Login successful");
      // router.push("/dashboard/overview");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-[#2B3545] font-semibold text-3xl text-center mb-2">
        New Password
      </h2>

      <p className="text-[#555D6A] text-center mb-6">
        Please create a new password that you don&apos;t use on any other site.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* password */}
        <div className="flex flex-col mb-3">
          <label
            htmlFor="password"
            className="text-sm mb-1 text-[#414651] font-medium"
          >
            Password<span className="text-primary-500">*</span>
          </label>
          <Controller
            name="password"
            control={control}
            rules={{ required: "Password is required" }}
            render={({ field, formState: { errors } }) => (
              <InputPassword
                id="password"
                className="h-10"
                placeholder="Enter new password"
                error={errors?.password?.message}
                preIcon={
                  <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.85355 8.64645C7.65829 8.45118 7.34171 8.45118 7.14645 8.64645L6.5 9.29289L5.85355 8.64645C5.65829 8.45118 5.34171 8.45118 5.14645 8.64645C4.95118 8.84171 4.95118 9.15829 5.14645 9.35355L5.79289 10L5.14645 10.6464C4.95118 10.8417 4.95118 11.1583 5.14645 11.3536C5.34171 11.5488 5.65829 11.5488 5.85355 11.3536L6.5 10.7071L7.14645 11.3536C7.34171 11.5488 7.65829 11.5488 7.85355 11.3536C8.04882 11.1583 8.04882 10.8417 7.85355 10.6464L7.20711 10L7.85355 9.35355C8.04882 9.15829 8.04882 8.84171 7.85355 8.64645ZM11.1464 8.64645C11.3417 8.45118 11.6583 8.45118 11.8536 8.64645C12.0488 8.84171 12.0488 9.15829 11.8536 9.35355L11.2071 10L11.8536 10.6464C12.0488 10.8417 12.0488 11.1583 11.8536 11.3536C11.6583 11.5488 11.3417 11.5488 11.1464 11.3536L10.5 10.7071L9.85355 11.3536C9.65829 11.5488 9.34171 11.5488 9.14645 11.3536C8.95118 11.1583 8.95118 10.8417 9.14645 10.6464L9.79289 10L9.14645 9.35355C8.95118 9.15829 8.95118 8.84171 9.14645 8.64645C9.34171 8.45118 9.65829 8.45118 9.85355 8.64645L10.5 9.29289L11.1464 8.64645ZM13.5 10.5C13.2239 10.5 13 10.7239 13 11C13 11.2761 13.2239 11.5 13.5 11.5H15.5C15.7761 11.5 16 11.2761 16 11C16 10.7239 15.7761 10.5 15.5 10.5H13.5ZM4.75 4.5C3.23122 4.5 2 5.73122 2 7.25V12.75C2 14.2688 3.23122 15.5 4.75 15.5H15.25C16.7688 15.5 18 14.2688 18 12.75V7.25C18 5.73122 16.7688 4.5 15.25 4.5H4.75ZM3 7.25C3 6.2835 3.7835 5.5 4.75 5.5H15.25C16.2165 5.5 17 6.2835 17 7.25V12.75C17 13.7165 16.2165 14.5 15.25 14.5H4.75C3.7835 14.5 3 13.7165 3 12.75V7.25Z"
                      fill="#5D6679"
                    />
                  </svg>
                }
                {...field}
              />
            )}
          />
        </div>

        {/* cpassword */}
        <div className="flex flex-col mb-3">
          <label
            htmlFor="password2"
            className="text-sm mb-1 text-[#414651] font-medium"
          >
            Confirm Password<span className="text-primary-500">*</span>
          </label>
          <Controller
            name="cpassword"
            control={control}
            rules={{
              required: "Confirm Password is required",

              validate: (value) => {
                if (value !== getValues("password")) {
                  return "Passwords do not match";
                }
                return true;
              },
            }}
            render={({ field, formState: { errors } }) => (
              <InputPassword
                id="password2"
                className="h-10"
                placeholder="Enter confirm password"
                error={errors?.cpassword?.message}
                preIcon={
                  <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.5 4.5C16.8807 4.5 18 5.61929 18 7V15C18 16.3807 16.8807 17.5 15.5 17.5H4.5C3.11929 17.5 2 16.3807 2 15V7C2 5.61929 3.11929 4.5 4.5 4.5H15.5ZM17 8.461L10.2535 12.431C10.1231 12.5077 9.96661 12.5205 9.82751 12.4693L9.74649 12.431L3 8.463V15C3 15.8284 3.67157 16.5 4.5 16.5H15.5C16.3284 16.5 17 15.8284 17 15V8.461ZM15.5 5.5H4.5C3.67157 5.5 3 6.17157 3 7V7.302L10 11.4199L17 7.301V7C17 6.17157 16.3284 5.5 15.5 5.5Z"
                      fill="#5D6679"
                    />
                  </svg>
                }
                {...field}
              />
            )}
          />
        </div>

        {/* sign up button */}
        <Button
          variant="primary"
          className="w-full mb-3 !font-medium"
          loading={loading || isLoading}
          disabled={loading || isLoading}
        >
          Setup New Password
        </Button>
      </form>

      <div className="text-center text-sm text-gray-400">
        <span>Just remember?</span>{" "}
        <Link href="/login" className="text-primary-500 font-semibold">
          Log In
        </Link>
      </div>
    </div>
  );
}
