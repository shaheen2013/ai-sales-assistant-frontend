"use client";

import React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";

// components
import Button from "@/components/button";

// import {  } from "@/features/auth/authSlice";

import { beautifyErrors } from "@/lib/utils";
import { useToast } from "@/hooks/useToast";

import { Input } from "@/components/shadcn/input";

export default function EnterCodeForm() {
  const toast = useToast();
  const router = useRouter();

  const searchParams = useSearchParams();

  const uid = searchParams.get("search");
  const token = searchParams.get("token");

  // const [emailConfirmation, { isLoading }] = useEmailConfirmedMutation({});

  type FormValues = {
    code: string;
  };

  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (formData: FormValues) => {
    try {
      const payload = {
        uid: uid,
        token: token,
      };
      // const { error, data } = await emailConfirmation(payload);

      // if (error) {
      //   toast("error", beautifyErrors(error));
      //   console.log("error", beautifyErrors(error));

      //   return;
      // }

      // console.log("data", data);

      toast("success", "Account created successfully!");

      return;
      router.push("/dashboard/overview");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2 className="text-[#2B3545] font-semibold text-3xl text-center mb-2">
        Enter Code
      </h2>

      <p className="text-[#555D6A] text-center mb-6">
        We send a code to the email address you gave us.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* name */}
        <div className="flex flex-col mb-3">
          <label
            htmlFor="email"
            className="text-sm mb-1 text-[#414651] font-medium"
          >
            Code <span className="text-primary-500">*</span>
          </label>

          <Controller
            name="code"
            control={control}
            rules={{ required: "Code is required" }}
            render={({ field, formState: { errors } }) => (
              <Input
                type="text"
                id="name"
                className="h-10"
                placeholder="Code Here"
                error={errors?.code?.message}
                preIcon={
                  <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 2.5C7.79086 2.5 6 4.29086 6 6.5C6 8.70914 7.79086 10.5 10 10.5C12.2091 10.5 14 8.70914 14 6.5C14 4.29086 12.2091 2.5 10 2.5ZM7 6.5C7 4.84315 8.34315 3.5 10 3.5C11.6569 3.5 13 4.84315 13 6.5C13 8.15685 11.6569 9.5 10 9.5C8.34315 9.5 7 8.15685 7 6.5ZM5.00873 11.5C3.90315 11.5 3 12.3869 3 13.5C3 15.1912 3.83281 16.4663 5.13499 17.2966C6.41697 18.114 8.14526 18.5 10 18.5C11.8547 18.5 13.583 18.114 14.865 17.2966C16.1672 16.4663 17 15.1912 17 13.5C17 12.3956 16.1045 11.5 15 11.5L5.00873 11.5ZM4 13.5C4 12.9467 4.44786 12.5 5.00873 12.5L15 12.5C15.5522 12.5 16 12.9478 16 13.5C16 14.8088 15.3777 15.7837 14.3274 16.4534C13.2568 17.136 11.7351 17.5 10 17.5C8.26489 17.5 6.74318 17.136 5.67262 16.4534C4.62226 15.7837 4 14.8088 4 13.5Z"
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
          className="w-full mb-4 !font-medium"
          // loading={isLoading}
          // disabled={isLoading}
        >
          Submit Code
        </Button>
      </form>

      <div className="text-center text-sm text-gray-400">
        <span>Already have an account?</span>{" "}
        <Link href="/user/login" className="text-primary-500 font-semibold">
          Log in
        </Link>
      </div>
    </div>
  );
}
