"use client";

import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

import Steps from "@/components/Steps";

import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogHeader,
  AlertDialogContent,
} from "@/components/shadcn/alert-dialog";
import { countryCodes } from "@/static/CountryCodes";
import { Button } from "@/components/shadcn/button";
import { Input, InputPhoneNumber } from "@/components/shadcn/input";

export default function NewUserModal() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const newuser = searchParams.get("newuser");

  const [modals, setModals] = useState({
    basicProfile: false,
  });

  const [step] = useState<number>(1);

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
                        id="phone"
                        className="h-10"
                        placeholder="Your Phone Number Here"
                        error={errors?.phone?.message}
                        countries={countryCodes}
                        {...field}
                      />

                      // <PhoneInput />
                    )}
                  />
                </div>

                {/* street */}
                <div className="flex flex-col">
                  <label
                    htmlFor="street"
                    className="text-sm mb-1 text-[#414651] font-medium"
                  >
                    Street <span className="text-primary-500">*</span>
                  </label>
                  <Controller
                    name="street"
                    control={control}
                    rules={{ required: "Street is required" }}
                    render={({ field, formState: { errors } }) => (
                      <Input
                        type="street"
                        id="street"
                        className="h-10"
                        placeholder="Street Here"
                        error={errors?.street?.message}
                        {...field}
                      />
                    )}
                  />
                </div>

                {/* city */}
                <div className="flex flex-col">
                  <label
                    htmlFor="city"
                    className="text-sm mb-1 text-[#414651] font-medium"
                  >
                    City <span className="text-primary-500">*</span>
                  </label>
                  <Controller
                    name="city"
                    control={control}
                    rules={{ required: "City is required" }}
                    render={({ field, formState: { errors } }) => (
                      <Input
                        type="city"
                        id="city"
                        className="h-10"
                        placeholder="City Here"
                        error={errors?.city?.message}
                        {...field}
                      />
                    )}
                  />
                </div>

                {/* state */}
                <div className="flex flex-col">
                  <label
                    htmlFor="state"
                    className="text-sm mb-1 text-[#414651] font-medium"
                  >
                    State <span className="text-primary-500">*</span>
                  </label>
                  <Controller
                    name="state"
                    control={control}
                    rules={{ required: "State is required" }}
                    render={({ field, formState: { errors } }) => (
                      <Input
                        type="state"
                        id="state"
                        className="h-10"
                        placeholder="State Here"
                        error={errors?.state?.message}
                        {...field}
                      />
                    )}
                  />
                </div>

                {/* country */}
                <div className="flex flex-col">
                  <label
                    htmlFor="country"
                    className="text-sm mb-1 text-[#414651] font-medium"
                  >
                    Country <span className="text-primary-500">*</span>
                  </label>
                  <Controller
                    name="country"
                    control={control}
                    rules={{ required: "country is required" }}
                    render={({ field, formState: { errors } }) => (
                      <Input
                        type="country"
                        id="country"
                        className="h-10"
                        placeholder="country Here"
                        error={errors?.country?.message}
                        {...field}
                      />
                    )}
                  />
                </div>

                {/* zip code */}
                <div className="flex flex-col">
                  <label
                    htmlFor="zip"
                    className="text-sm mb-1 text-[#414651] font-medium"
                  >
                    Zip <span className="text-primary-500">*</span>
                  </label>
                  <Controller
                    name="zip"
                    control={control}
                    rules={{ required: "zip is required" }}
                    render={({ field, formState: { errors } }) => (
                      <Input
                        type="zip"
                        id="zip"
                        className="h-10"
                        placeholder="zip Here"
                        error={errors?.zip?.message}
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
