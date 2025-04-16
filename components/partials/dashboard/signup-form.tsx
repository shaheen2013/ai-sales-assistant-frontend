"use client";

import React from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useForm, Controller } from "react-hook-form";

// components
import Button from "@/components/button";
import { Input } from "@/components/shadcn/input";
import { Checkbox } from "@/components/shadcn/checkbox";
import { useRegisterMutation } from "@/features/auth/authSlice";
import { beautifyErrors } from "@/lib/utils";

export default function SignupForm() {
  const [register, result] = useRegisterMutation();

  type FormValues = {
    name: string;
    email: string;
    password: string;
    terms: boolean;
  };

  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      name: "John",
      email: "",
      password: "",
      terms: true,
    },
  });

  const onSubmit = async (formData: FormValues) => {
    console.log(formData);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        terms: formData.terms,
      };
      const { error, data } = await register(payload);

      if (error) {
        console.log("error", beautifyErrors(error));

        toast.error("Event has been created.", {});

        return;
      }

      console.log("data", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2 className="text-[#2B3545] font-semibold text-3xl text-center mb-2">
        Sign up
      </h2>

      <p className="text-[#555D6A] text-center mb-6">
        Welcome to Teez. Car Community
      </p>

      <Button
        variant="outline-gray"
        className="w-full mb-4 !py-2 !border !font-medium"
      >
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_1424_4777)">
            <path
              d="M24.2663 12.7763C24.2663 11.9605 24.2001 11.1404 24.059 10.3379H12.7402V14.9589H19.222C18.953 16.4492 18.0888 17.7676 16.8233 18.6054V21.6037H20.6903C22.9611 19.5137 24.2663 16.4272 24.2663 12.7763Z"
              fill="#4285F4"
            />
            <path
              d="M12.74 24.5013C15.9764 24.5013 18.7058 23.4387 20.6944 21.6044L16.8274 18.606C15.7516 19.338 14.3626 19.7525 12.7444 19.7525C9.61376 19.7525 6.95934 17.6404 6.00693 14.8008H2.01648V17.8917C4.05359 21.9439 8.20278 24.5013 12.74 24.5013Z"
              fill="#34A853"
            />
            <path
              d="M6.00277 14.8007C5.50011 13.3103 5.50011 11.6965 6.00277 10.2062V7.11523H2.01674C0.314734 10.506 0.314734 14.5009 2.01674 17.8916L6.00277 14.8007Z"
              fill="#FBBC04"
            />
            <path
              d="M12.74 5.24966C14.4508 5.2232 16.1043 5.86697 17.3433 7.04867L20.7694 3.62262C18.6 1.5855 15.7207 0.465534 12.74 0.500809C8.20277 0.500809 4.05359 3.05822 2.01648 7.11481L6.00252 10.2058C6.95052 7.36173 9.60935 5.24966 12.74 5.24966Z"
              fill="#EA4335"
            />
          </g>
          <defs>
            <clipPath id="clip0_1424_4777">
              <rect
                width="24"
                height="24"
                fill="white"
                transform="translate(0.5 0.5)"
              />
            </clipPath>
          </defs>
        </svg>

        <span>Sign in with Google</span>
      </Button>

      {/* or */}
      <div className="text-center mb-4 max-w-[150px] mx-auto">
        <span className="text-[#AFA8A8] px-4 text-center mb-2 bg-white inline-block text-sm">
          or
        </span>

        <div className="w-full border-t border-[#D5D7DA] mt-[-20px]" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* name */}
        <div className="flex flex-col mb-3">
          <label
            htmlFor="email"
            className="text-sm mb-1 text-[#414651] font-medium"
          >
            Name <span className="text-primary-500">*</span>
          </label>

          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field, formState: { errors } }) => (
              <Input
                type="text"
                id="name"
                className="h-10"
                placeholder="Name Here"
                error={errors?.name?.message}
                {...field}
              />
            )}
          />
        </div>

        {/* email */}
        <div className="flex flex-col mb-3">
          <label
            htmlFor="email"
            className="text-sm mb-1 text-[#414651] font-medium"
          >
            Email <span className="text-primary-500">*</span>
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
                {...field}
              />
            )}
          />
        </div>

        {/* password */}
        <div className="flex flex-col mb-6">
          <label
            htmlFor="email"
            className="text-sm mb-1 text-[#414651] font-medium"
          >
            Password <span className="text-primary-500">*</span>
          </label>

          <Controller
            name="password"
            control={control}
            rules={{ required: "Password is required" }}
            render={({ field, formState: { errors } }) => (
              <Input
                type="password"
                className=" h-10"
                placeholder="Create Password"
                error={errors?.password?.message}
                {...field}
              />
            )}
          />
        </div>

        {/* remember me */}
        <div className="mb-6 flex items-start gap-2">
          <Controller
            name="terms"
            control={control}
            rules={{ required: true }}
            render={({ field, formState: { errors } }) => (
              <Checkbox
                id="remember"
                checked={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
                error={Boolean(errors?.terms)}
                ref={field.ref}
              />
            )}
          />

          <label htmlFor="remember" className="text-xs text-gray-300">
            By clicking Create account, I agree that I have read and accepted
            the Terms of Use and Privacy Policy.
          </label>
        </div>

        {/* sign up button */}
        <Button variant="primary" className="w-full mb-4">
          Sign Up
        </Button>
      </form>

      <div className="text-center text-sm text-gray-400">
        <span>Already have an account?</span>{" "}
        <Link href="/login" className="text-primary-500 font-semibold">
          Log in
        </Link>
      </div>
    </div>
  );
}
