"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useForm, Controller } from "react-hook-form";

// components
import Button from "@/components/button";

import { beautifyErrors } from "@/lib/utils";
import { useToast } from "@/hooks/useToast";
import { Input } from "@/components/shadcn/input";
import { useForgotPasswordMutation } from "@/features/auth/authSlice";
import { useRouter } from "next/navigation";

export default function ForgotPasswordForm() {
  const toast = useToast();
  const router = useRouter();
  const { status } = useSession();

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const loading = status === "loading";

  type FormValues = {
    name: string;
    email: string;
    password: string;
    terms: boolean;
  };

  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      terms: true,
    },
  });

  const onSubmit = async (formData: FormValues) => {
    try {
      const payload = {
        email: formData.email,
        // password: formData.password,
        // user_type: "dealer",
        // redirect: false,
      };

      // const loginResponse: any = await signIn("credentials", payload);

      // if (!loginResponse.ok) {
      //   toast("error", loginResponse.error || "Login failed");
      //   return;
      // }

      const { error, data } = await forgotPassword(payload);

      if (error) {
        toast("error", beautifyErrors(error));
        console.log("error", error);

        return;
      }

      if (data) {
        toast("success", "Password reset link sent to your email");
        if (data?.detail == "Password reset link sent to your email address") {
          reset();
          router.push(`/account-created?email=${formData.email}`);
        }
      }
    } catch (error) {
      console.log(error);
      toast("error", "Something went wrong");
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-[#2B3545] font-semibold text-3xl text-center mb-2">
        Forgot password?
      </h2>

      <p className="text-[#555D6A] text-center mb-6">
        No worries! Just enter your email and we&apos;ll send you a reset
        password link.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* email */}
        <div className="flex flex-col mb-3">
          <label
            htmlFor="email"
            className="text-sm mb-1 text-[#414651] font-medium"
          >
            Email Address <span className="text-primary-500">*</span>
          </label>
          <Controller
            name="email"
            control={control}
            rules={{ required: "Email is required" }}
            render={({ field, formState: { errors } }) => (
              <Input
                type="email"
                id="email"
                className="h-10"
                placeholder="Email Here"
                error={errors?.email?.message}
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
          Send Recovery Email
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
