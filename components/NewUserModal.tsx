"use client";

import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import Steps from "@/components/Steps";
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogHeader,
  AlertDialogContent,
} from "@/components/shadcn/alert-dialog";

import { Input, InputPhoneNumber } from "@/components/shadcn/input";
import { Button } from "@/components/shadcn/button";
import { useRouter, useSearchParams } from "next/navigation";
import { countryCodes } from "@/static/CountryCodes";

export default function NewUserModal() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const newuser = searchParams.get("newuser");

  const [modals, setModals] = useState({
    basicProfile: false,
  });

  const [step, setStep] = useState<number>(1);

  useEffect(() => {
    if (newuser) {
      setModals({ ...modals, basicProfile: true });
    }
  }, [newuser]);

  const stepData = [
    { title: "1", description: "Personal Information" },
    { title: "2", description: "Business Information" },
    { title: "2", description: "Team Member Setup" },
  ];

  type BasicFormValues = {
    name: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    country: string;
    zip: string;
    about: string;
  };

  const { handleSubmit, control } = useForm<BasicFormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      country: "",
      zip: "",
      about: "",
    },
  });

  const handleBasicPersonalInfo = () => {
    handleSubmit(onSubmit)();

    // setModals({ ...modals, basicProfile: false });
  };

  const onSubmit = async () => {
    try {
      // const payload = {
      //   email: formData.email,
      //   password: formData.password,
      //   user_type: "dealer",
      //   redirect: false,
      // };

      // const loginResponse: any = await signIn("credentials", payload);

      // if (!loginResponse.ok) {
      //   toast("error", loginResponse.error || "Login failed");
      //   return;
      // }

      // toast("success", "Login successful");
      router.push("/dashboard/overview");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AlertDialog
      open={modals.basicProfile}
      onOpenChange={() => setModals({ ...modals, basicProfile: false })}
    >
      <AlertDialogTitle></AlertDialogTitle>
      <AlertDialogContent className="lg:max-w-[1000px] max-w-[400px] max-h-screen overflow-y-auto">
        {/* header */}
        <AlertDialogHeader></AlertDialogHeader>

        {/* body */}
        <ContentSwitcher value="1" currentStep={step}>
          <div className="">
            <h2 className="text-center text-2xl font-bold">
              Basic Profile Setup
            </h2>
            <h3 className="text-center mb-6 text-gray-200 text-sm">
              Quickly set up your profile with essential details to get started
              and personalize your experience.
            </h3>

            {/* steps */}
            <div className="max-w-[800px] mx-auto">
              <Steps steps={stepData} currentStep={step} />
            </div>

            {/* body content */}
            <div className="my-6">
              <div className="flex items-center gap-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 17H15C15.5523 17 16 17.4477 16 18C16 18.5128 15.614 18.9355 15.1166 18.9933L15 19H3C2.44772 19 2 18.5523 2 18C2 17.4872 2.38604 17.0645 2.88338 17.0067L3 17H15H3ZM3 13H21C21.5523 13 22 13.4477 22 14C22 14.5128 21.614 14.9355 21.1166 14.9933L21 15H3C2.44772 15 2 14.5523 2 14C2 13.4872 2.38604 13.0645 2.88338 13.0067L3 13H21H3ZM3 9H21C21.5523 9 22 9.44772 22 10C22 10.5128 21.614 10.9355 21.1166 10.9933L21 11H3C2.44772 11 2 10.5523 2 10C2 9.48716 2.38604 9.06449 2.88338 9.00673L3 9H21H3ZM3 5H21C21.5523 5 22 5.44772 22 6C22 6.51284 21.614 6.93551 21.1166 6.99327L21 7H3C2.44772 7 2 6.55228 2 6C2 5.48716 2.38604 5.06449 2.88338 5.00673L3 5H21H3Z"
                    fill="#1F2A37"
                  />
                </svg>

                <h2 className="text-2xl">Basic Personal Information</h2>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4"
              >
                {/* name */}
                <div className="flex flex-col">
                  <label
                    htmlFor="name"
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
                        type="name"
                        id="name"
                        className="h-10"
                        placeholder="Name here"
                        error={errors?.name?.message}
                        {...field}
                      />
                    )}
                  />
                </div>

                {/* email */}
                <div className="flex flex-col">
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

                {/* phone */}
                <div className="flex flex-col">
                  <label
                    htmlFor="phone"
                    className="text-sm mb-1 text-[#414651] font-medium"
                  >
                    Phone <span className="text-primary-500">*</span>
                  </label>
                  <Controller
                    name="phone"
                    control={control}
                    rules={{ required: "Your phone required" }}
                    render={({ field, formState: { errors } }) => (
                      <InputPhoneNumber
                        type="phone"
                        id="phone"
                        className="h-10"
                        placeholder="Your Phone Number Here"
                        error={errors?.phone?.message}
                        countries={countryCodes}
                        {...field}
                      />
                    )}
                  />
                </div>

                {/* street */}
                <div className="flex flex-col">
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

                {/* city */}
                <div className="flex flex-col">
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

                {/* state */}
                <div className="flex flex-col">
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

                {/* country */}
                <div className="flex flex-col">
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

                {/* zip code */}
                <div className="flex flex-col">
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
              </form>
            </div>

            {/* footer */}
            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="outline"
                className="text-primary-500 border-primary-200"
              >
                Skip for Now
              </Button>

              <Button variant="primary" onClick={handleBasicPersonalInfo}>
                Continue
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.73271 4.20694C8.03263 3.92125 8.50737 3.93279 8.79306 4.23271L13.7944 9.48318C14.0703 9.77285 14.0703 10.2281 13.7944 10.5178L8.79306 15.7682C8.50737 16.0681 8.03263 16.0797 7.73271 15.794C7.43279 15.5083 7.42125 15.0336 7.70694 14.7336L12.2155 10.0005L7.70694 5.26729C7.42125 4.96737 7.43279 4.49264 7.73271 4.20694Z"
                    fill="white"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </ContentSwitcher>

        {/* footer */}
        {/* <AlertDialogFooter>
            <Button variant="primary">
              Continue
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.73271 4.20694C8.03263 3.92125 8.50737 3.93279 8.79306 4.23271L13.7944 9.48318C14.0703 9.77285 14.0703 10.2281 13.7944 10.5178L8.79306 15.7682C8.50737 16.0681 8.03263 16.0797 7.73271 15.794C7.43279 15.5083 7.42125 15.0336 7.70694 14.7336L12.2155 10.0005L7.70694 5.26729C7.42125 4.96737 7.43279 4.49264 7.73271 4.20694Z"
                  fill="white"
                />
              </svg>
            </Button>
          </AlertDialogFooter> */}
      </AlertDialogContent>
    </AlertDialog>
  );
}

type ContentSwitcherProps = {
  value: string;
  currentStep: number | null;
  children: React.ReactNode;
};

function ContentSwitcher({
  value,
  currentStep,
  children,
}: ContentSwitcherProps) {
  if (Number(value) === currentStep) {
    return children;
  }
}
