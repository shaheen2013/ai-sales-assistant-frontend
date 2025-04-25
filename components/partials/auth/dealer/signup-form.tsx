"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";

// components
import Button from "@/components/button";

import {
  useRegisterMutation,
  useRegisterWithGoogleMutation,
} from "@/features/auth/authSlice";

import { beautifyErrors } from "@/lib/utils";
import { useToast } from "@/hooks/useToast";
import { Checkbox } from "@/components/shadcn/checkbox";

import { Input, InputPassword } from "@/components/shadcn/input";
import DealerRegistration from "@/components/partials/auth/dealer/dealer-registration";

export default function SignupForm() {
  const toast = useToast();
  const router = useRouter();

  const [registerGoogle] = useRegisterWithGoogleMutation();
  const [register, { isLoading: isLoadingRegister }] = useRegisterMutation();

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

  const handleGoogleRegister = async () => {
    toast("error", "Google Authentication coming soon");
    return;

    const { error, data } = await registerGoogle({ token: "123" });

    if (error) {
      toast("error", beautifyErrors(error));
      console.log("error", beautifyErrors(error));

      return;
    }

    console.log("data", data);
  };

  const onSubmit = async (formData: FormValues) => {
    // console.log(formData);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        terms: formData.terms,
      };
      const { error } = await register(payload);

      if (error) {
        toast("error", beautifyErrors(error));
        console.log("error", beautifyErrors(error));

        return;
      }

      toast("success", "Account created successfully!");
      router.push("/dealer/login");
    } catch (error) {
      console.log(error);
    }
  };

  return <DealerRegistration progress={100} />;

  return (
    <div className="w-full">
      <h2 className="text-[#2B3545] font-semibold text-3xl text-center mb-2">
        Sign up
      </h2>

      <p className="text-[#555D6A] text-center mb-6">
        Welcome to Teez. Car Community
      </p>

      <Button
        variant="outline-gray"
        className="w-full mb-4 !py-2 !border !font-medium"
        onClick={handleGoogleRegister}
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

        <span>Sign up with Google</span>
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
              <InputPassword
                className=" h-10"
                placeholder="Create Password"
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
        <Button
          variant="primary"
          className="w-full mb-4 !font-medium"
          loading={isLoadingRegister}
          disabled={isLoadingRegister}
        >
          Sign Up
        </Button>
      </form>

      <Link
        href="/terms-and-privacy"
        className="text-center block text-xs underline mb-2"
      >
        Terms of Use & Privacy Policy
      </Link>

      <div className="text-center text-sm text-gray-400">
        <span>Already have an account?</span>{" "}
        <Link href="/dealer/login" className="text-primary-500 font-semibold">
          Log in
        </Link>
      </div>
    </div>
  );
}
