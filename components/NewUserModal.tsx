"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Controller, useForm } from "react-hook-form";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./shadcn/accordion";

import Steps from "@/components/Steps";

import {
  Select,
  SelectItem,
  SelectValue,
  SelectGroup,
  SelectTrigger,
  SelectContent,
} from "@/components/shadcn/select";

import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogHeader,
  AlertDialogContent,
} from "@/components/shadcn/alert-dialog";

import {
  useCreateSubscriptionMutation,
  useGetDealerPricingPlansQuery,
  useUpdateDealerProfileMutation,
  useUpdateDealerBusinessProfileMutation,
} from "@/features/dealer/dealerProfileSlice";

import { beautifyErrors } from "@/lib/utils";
import { Textarea } from "./shadcn/textarea";
import { useToast } from "@/hooks/useToast";
import { countryCodes } from "@/static/CountryCodes";
import { Button } from "@/components/shadcn/button";
import { Input, InputPhoneNumber } from "@/components/shadcn/input";
import { pricingPlanForHomepage } from "@/static/homepage";

export default function NewUserModal() {
  const toast = useToast();
  const { data: session } = useSession();

  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [number, setNumber] = useState<string>("");

  const [modals, setModals] = useState({
    basicProfile: true, // false by default, true for onboarding
  });

  const [step, setStep] = useState<number>(3); // 1 for first step

  const { data: pricingPlans } = useGetDealerPricingPlansQuery();

  useEffect(() => {
    if (pricingPlans && pricingPlans.length > 0) {
      // Set the first plan as selected by default
      setSelectedPlan(pricingPlans[0]?.id || "");
    }
  }, [pricingPlans]);

  const [updateProfile, { isLoading: isLoadingUpdateProfile }] =
    useUpdateDealerProfileMutation();

  const [updateDealerProfile, { isLoading: isLoadingUpdateDealerProfile }] =
    useUpdateDealerBusinessProfileMutation();

  const [createSubscription, { isLoading: isLoadingCreateSubscription }] =
    useCreateSubscriptionMutation();

  // onboarding modal
  useEffect(() => {
    if (window.localStorage.getItem("onboarding") == "true") {
      setModals({ ...modals, basicProfile: true });

      window.localStorage.removeItem("onboarding");
    }
  }, [modals]);

  // setting default values for form fields
  useEffect(() => {
    if (session) {
      setValue("name", session?.user?.name || "");
      setValue("email", session?.user?.email || "");
    }
  }, [session]);

  const stepData = [
    { title: "1", description: "Personal Information" },
    { title: "2", description: "Business Information" },
    { title: "2", description: "Your Plan Setup" },
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

  const { handleSubmit, control, setValue } = useForm<BasicFormValues>({
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

  const { handleSubmit: handleSubmitDealer, control: controlDealer } = useForm({
    defaultValues: {
      business_name: "",
      business_email: "",
      business_summary: "",
    },
  });

  const handleBasicProfile = async (params: any) => {
    const userPhone = countryCodes.find((e: any) => e.code === number);

    try {
      const payload: any = {
        name: params.name,
        email: params.email,
        phone: `${userPhone?.dial_code}${params.phone}`,
        street: params.street,
        city: params.city,
        state: params.state,
        country: params.country,
        zip: params.zip,
        about: params.about,
      };

      const { error, data } = await updateProfile(payload);

      if (error) {
        console.log("error => ", error);
        toast("error", beautifyErrors(toast) || "Profile update failed");
        return;
      }

      if (data) {
        console.log("data => ", data);
        toast("success", data?.detail || "Profile updated successfully");
      }

      setStep(2);

      // router.push("/dashboard/overview");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDealerProfile = async (params: any) => {
    try {
      const payload: any = {
        business_name: params.business_name,
        business_email: params.business_email,
        business_summary: params.business_summary,
      };

      const { data, error } = await updateDealerProfile(payload);

      if (error) {
        console.log("error => ", error);
        toast(
          "error",
          beautifyErrors(toast) || "Failed to update dealer profile"
        );
        return;
      }

      if (data) {
        console.log("data => ", data);
        toast("success", data?.detail || "Dealer profile updated successfully");

        setStep(3);
      }
    } catch (error) {
      console.log(error);
      toast("error", "Failed to update dealer profile");
    }
  };

  const handlePlanPurchase = async () => {
    const selectedPlanData = pricingPlans?.find(
      (plan: any) => plan.id === selectedPlan
    );

    try {
      const { data, error } = await createSubscription({
        price_id: selectedPlanData?.prices?.[0]?.id,
        success_url: `${window.location.origin}/dashboard/overview`,
        cancel_url: `${window.location.origin}/dashboard/overview`,
      });

      if (error) {
        console.log("error => ", error);
        toast(
          "error",
          beautifyErrors(error) || "Failed to create subscription"
        );
        return;
      }

      if (data) {
        console.log("data => ", data);
        toast("success", data?.detail || "Subscription created successfully");

        // Redirect to the checkout URL
        if (data.checkout_url) {
          window.location.href = data.checkout_url;
        }
      }
    } catch (error) {
      console.log("Error creating subscription: ", error);
      toast("error", "Failed to create subscription");
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
        <AlertDialogHeader>
          {/* cross icon */}
          <div>
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setModals({ ...modals, basicProfile: false })}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4.2097 4.3871L4.29289 4.29289C4.65338 3.93241 5.22061 3.90468 5.6129 4.2097L5.70711 4.29289L12 10.585L18.2929 4.29289C18.6834 3.90237 19.3166 3.90237 19.7071 4.29289C20.0976 4.68342 20.0976 5.31658 19.7071 5.70711L13.415 12L19.7071 18.2929C20.0676 18.6534 20.0953 19.2206 19.7903 19.6129L19.7071 19.7071C19.3466 20.0676 18.7794 20.0953 18.3871 19.7903L18.2929 19.7071L12 13.415L5.70711 19.7071C5.31658 20.0976 4.68342 20.0976 4.29289 19.7071C3.90237 19.3166 3.90237 18.6834 4.29289 18.2929L10.585 12L4.29289 5.70711C3.93241 5.34662 3.90468 4.77939 4.2097 4.3871L4.29289 4.29289L4.2097 4.3871Z"
                  fill="#4B5563"
                />
              </svg>
            </button>
          </div>
        </AlertDialogHeader>

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

                <h2 className="lg:text-2xl text-xl text-[#1F2A37] font-medium">
                  Basic Personal Information
                </h2>
              </div>

              <form
                onSubmit={handleSubmit(handleBasicProfile)}
                className="grid grid-cols-12 gap-4 mt-4"
              >
                {/* name */}
                <div className="flex flex-col col-span-12 lg:col-span-6">
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
                <div className="flex flex-col col-span-12 lg:col-span-6">
                  <label
                    htmlFor="email"
                    className="text-sm mb-1 text-[#414651] font-medium"
                  >
                    Email <span className="text-primary-500">*</span>
                  </label>
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: "Email is required",

                      validate: {
                        email: (value) =>
                          /^\S+@\S+\.\S+$/.test(value) ||
                          "Invalid email format",
                      },
                    }}
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
                <div className="flex flex-col col-span-12 lg:col-span-6">
                  <label
                    htmlFor="phone"
                    className="text-sm mb-1 text-[#414651] font-medium"
                  >
                    Phone Number <span className="text-primary-500">*</span>
                  </label>
                  <Controller
                    name="phone"
                    control={control}
                    rules={{ required: "Phone number required" }}
                    render={({ field, formState: { errors } }) => (
                      <InputPhoneNumber
                        id="phone"
                        className="h-10 shadow-none"
                        placeholder="Your Phone Number Here"
                        error={errors?.phone?.message}
                        countries={countryCodes}
                        onCountryChange={(countryCode) => {
                          setNumber(countryCode);
                        }}
                        {...field}
                      />

                      // <PhoneInput />
                    )}
                  />
                </div>

                {/* street */}
                <div className="flex flex-col col-span-12 lg:col-span-6">
                  <label
                    htmlFor="street"
                    className="text-sm mb-1 text-[#414651] font-medium"
                  >
                    Street
                  </label>
                  <Controller
                    name="street"
                    control={control}
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
                <div className="flex flex-col col-span-12 lg:col-span-6">
                  <label
                    htmlFor="city"
                    className="text-sm mb-1 text-[#414651] font-medium"
                  >
                    City
                  </label>
                  <Controller
                    name="city"
                    control={control}
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
                <div className="flex flex-col col-span-12 lg:col-span-6">
                  <label
                    htmlFor="state"
                    className="text-sm mb-1 text-[#414651] font-medium"
                  >
                    State
                  </label>
                  <Controller
                    name="state"
                    control={control}
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
                <div className="flex flex-col col-span-12 lg:col-span-6">
                  <label
                    htmlFor="country"
                    className="text-sm mb-1 text-[#414651] font-medium"
                  >
                    Country
                  </label>
                  <Controller
                    name="country"
                    control={control}
                    render={({ field, formState: { errors } }) => (
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                        value={field.value}
                      >
                        <SelectTrigger
                          className="w-full h-10 shadow-none border-[#D5D7DA]"
                          postIcon={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                            >
                              <path
                                d="M15.8527 7.64582C16.0484 7.84073 16.0489 8.15731 15.854 8.35292L10.389 13.8374C10.1741 14.0531 9.82477 14.0531 9.60982 13.8374L4.14484 8.35292C3.94993 8.15731 3.95049 7.84073 4.1461 7.64582C4.34171 7.4509 4.65829 7.45147 4.85321 7.64708L9.99942 12.8117L15.1456 7.64708C15.3406 7.45147 15.6571 7.4509 15.8527 7.64582Z"
                                fill="#5D6679"
                              />
                            </svg>
                          }
                        >
                          <SelectValue placeholder="Choose Country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {countryCodes.map((country) => (
                              <SelectItem
                                key={country.code}
                                value={country.name}
                              >
                                {country.name}
                              </SelectItem>
                            ))}

                            {/* <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="banana">Banana</SelectItem>
                            <SelectItem value="blueberry">Blueberry</SelectItem>
                            <SelectItem value="grapes">Grapes</SelectItem>
                            <SelectItem value="pineapple">Pineapple</SelectItem> */}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                {/* zip code */}
                <div className="flex flex-col col-span-12 lg:col-span-6">
                  <label
                    htmlFor="zip"
                    className="text-sm mb-1 text-[#414651] font-medium"
                  >
                    Zip
                  </label>
                  <Controller
                    name="zip"
                    control={control}
                    render={({ field, formState: { errors } }) => (
                      <Input
                        type="zip"
                        id="zip"
                        className="h-10"
                        placeholder="Zip Code"
                        error={errors?.zip?.message}
                        {...field}
                      />
                    )}
                  />
                </div>

                {/* about */}
                <div className="flex flex-col col-span-12">
                  <Controller
                    control={control}
                    name="about"
                    render={({ field, fieldState: { error } }) => (
                      <Textarea
                        {...field}
                        error={error?.message}
                        helperText="This is a brief description about yourself."
                        label="About Yourself"
                        placeholder="Enter a description..."
                        className="min-h-[98px] placeholder:text-gray-100"
                      />
                    )}
                  />
                </div>
              </form>
            </div>

            {/* footer */}
            <div className="flex lg:flex-row flex-col justify-end gap-3 mt-6">
              <Button
                variant="outline"
                className="text-primary-500 border-primary-200"
                onClick={() => {
                  setModals({ ...modals, basicProfile: false });
                }}
              >
                Skip for Now
              </Button>

              <Button
                variant="primary"
                loading={isLoadingUpdateProfile}
                onClick={() => {
                  handleSubmit(handleBasicProfile)();
                }}
              >
                Save & Continue
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

        <ContentSwitcher value="2" currentStep={step}>
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

                <h2 className="lg:text-2xl text-xl text-[#1F2A37] font-medium">
                  Your Business Information
                </h2>
              </div>

              <form
                onSubmit={handleSubmitDealer(handleDealerProfile)}
                className="grid grid-cols-12 gap-4 mt-4"
              >
                {/* business name */}
                <div className="flex flex-col col-span-12 lg:col-span-6">
                  <label
                    htmlFor="name"
                    className="text-sm mb-1 text-[#414651] font-medium"
                  >
                    Business Name <span className="text-primary-500">*</span>
                  </label>
                  <Controller
                    name="business_name"
                    control={controlDealer}
                    rules={{ required: "Business Name is required" }}
                    render={({ field, formState: { errors } }) => (
                      <Input
                        type="name"
                        id="name"
                        className="h-10"
                        placeholder="Business Name here"
                        error={errors?.business_name?.message}
                        {...field}
                      />
                    )}
                  />
                </div>

                {/* business email */}
                <div className="flex flex-col col-span-12 lg:col-span-6">
                  <label
                    htmlFor="email"
                    className="text-sm mb-1 text-[#414651] font-medium"
                  >
                    Business Email <span className="text-primary-500">*</span>
                  </label>
                  <Controller
                    name="business_email"
                    control={controlDealer}
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email address",
                      },
                    }}
                    render={({ field, formState: { errors } }) => (
                      <Input
                        type="email"
                        id="email"
                        className="h-10"
                        placeholder="Business Email Here"
                        error={errors?.business_email?.message}
                        {...field}
                      />
                    )}
                  />
                </div>

                <div className="flex flex-col col-span-12">
                  <Controller
                    control={controlDealer}
                    name="business_summary"
                    render={({ field, fieldState: { error } }) => (
                      <Textarea
                        {...field}
                        error={error?.message}
                        helperText="This is a brief description about your business."
                        label="Business Summary & Objective"
                        placeholder="Enter a business objective..."
                        className="min-h-[98px] col-span-2 placeholder:text-gray-100"
                      />
                    )}
                  />
                </div>
              </form>

              <p className="text-sm text-[#535862] mt-1">
                Give a summary for your business.
              </p>
            </div>

            {/* footer */}
            <div className="flex lg:flex-row flex-col lg:justify-between lg:items-center gap-3 mt-6">
              {/* back button */}
              <div className="">
                <Button
                  variant="outline"
                  className="gap-1 px-3 pl-2 lg:w-auto w-full"
                  onClick={() => {
                    setStep(1);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M12.2676 15.794C11.9677 16.0797 11.493 16.0681 11.2073 15.7682L6.20597 10.5178C5.93004 10.2281 5.93004 9.77284 6.20597 9.48318L11.2073 4.23271C11.493 3.93279 11.9677 3.92125 12.2676 4.20694C12.5676 4.49264 12.5791 4.96737 12.2934 5.26729L7.78483 10.0005L12.2934 14.7336C12.5791 15.0336 12.5676 15.5083 12.2676 15.794Z"
                      fill="#5D6679"
                    />
                  </svg>
                  Back
                </Button>
              </div>

              <div className="flex lg:flex-row flex-col gap-3">
                <Button
                  variant="outline"
                  className="text-primary-500 border-primary-200"
                  onClick={() => {
                    setModals({ ...modals, basicProfile: false });
                  }}
                >
                  Skip for Now
                </Button>

                <Button
                  variant="primary"
                  loading={isLoadingUpdateDealerProfile}
                  onClick={() => {
                    handleSubmitDealer(handleDealerProfile)();
                  }}
                >
                  Save & Continue
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
          </div>
        </ContentSwitcher>

        <ContentSwitcher value="3" currentStep={step}>
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
              <div className="flex items-center gap-2 mb-8">
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

                <h2 className="lg:text-2xl text-xl text-[#1F2A37] font-medium">
                  Select your Magic plan!
                </h2>
              </div>

              <div className="grid lg:grid-cols-2 grid-cols-1 gap-9">
                {/* left */}
                <div className="">
                  <h2 className="text-gray-400 font-bold text-2xl mt-2 mb-6">
                    FAQ&apos;s
                  </h2>

                  <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                    defaultValue="item-1"
                  >
                    <AccordionItem
                      value="item-1"
                      className="p-0 pb-2 rounded-none mb-3"
                    >
                      <AccordionTrigger className="text-sm font-semibold text-gray-400">
                        What&&apos;s included in the monthly voice minutes?
                      </AccordionTrigger>

                      <AccordionContent className="text-sm font-normal text-gray-300 pr-6">
                        Your plan&apos;s included minutes apply to all voice
                        conversations handled by the AI assistant on behalf of
                        your dealership. This includes inbound buyer inquiries,
                        appointment bookings, trade-in discussions, and more.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="item-2"
                      className="p-0 pb-2 rounded-none mb-3"
                    >
                      <AccordionTrigger className="text-sm font-semibold text-gray-400">
                        What happens if we exceed our included voice minutes?
                      </AccordionTrigger>
                      <AccordionContent className="text-sm font-normal text-gray-300 pr-6">
                        If you exceed your included voice minutes, you will be
                        charged for additional minutes at the rate specified in
                        your plan. You can monitor your usage through the
                        dashboard to avoid unexpected charges.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="item-3"
                      className="p-0 pb-2 rounded-none mb-3"
                    >
                      <AccordionTrigger className="text-sm font-semibold text-gray-400">
                        Is there a contract or can I cancel anytime?
                      </AccordionTrigger>
                      <AccordionContent className="text-sm font-normal text-gray-300 pr-6">
                        There is no long-term contract required. You can cancel
                        your subscription at any time through your account
                        settings. Your plan will remain active until the end of
                        the current billing cycle.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="item-4"
                      className="p-0 pb-2 rounded-none border-none mb-3"
                    >
                      <AccordionTrigger className="text-sm font-semibold text-gray-400">
                        Can Teez transfer callers to a real person?
                      </AccordionTrigger>
                      <AccordionContent className="text-sm font-normal text-gray-300 pr-6">
                        Yes, Teez can transfer callers to a real person at any
                        time during the conversation. If the AI assistant is
                        unable to handle a specific request or if the caller
                        requests to speak with a human, the call can be
                        seamlessly transferred to a designated team member.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                {/* right */}
                <div className="flex flex-col gap-3">
                  {pricingPlans?.map((plan: any, index: any) => {
                    const currentPlanDetails = pricingPlanForHomepage.find(
                      (e) => e?.name === plan?.name
                    );

                    return (
                      <label
                        key={index}
                        className="has-[:checked]:border-primary-400 has-[:checked]:text-primary-900 has-[:checked]:ring-indigo-200 flex w-full border border-gray-50 rounded-xl pt-4 px-4 cursor-pointer transition-all gap-3 pb-3 group flex-col"
                      >
                        <div className="flex gap-3">
                          <input
                            onChange={() => {
                              setSelectedPlan(plan.id);
                            }}
                            checked={selectedPlan === plan.id}
                            value={plan.id}
                            name="plan"
                            type="radio"
                            className="box-content h-2 w-2 appearance-none rounded-full border-[5px] border-white bg-white bg-clip-padding outline-none ring-1 ring-gray-950/10 checked:border-primary-500 checked:ring-primary-500 mt-1"
                          />
                          <div className="flex justify-between w-full">
                            {/* title, description */}
                            <div className="">
                              <h2 className="text-gray-400 font-semibold text-lg mb-1">
                                {plan.name}
                              </h2>
                              <h4 className="text-xs text-gray-400">
                                {currentPlanDetails?.description}
                              </h4>
                            </div>

                            {/* pricing */}
                            <div className="">
                              <span className="group-has-[:checked]:text-primary-400 text-gray-400">
                                $
                              </span>
                              <span className="group-has-[:checked]:text-primary-400 text-gray-400 font-bold text-3xl">
                                {plan.prices?.[0]?.convert_amount}
                              </span>
                              <span className="text-gray-400">/month</span>
                            </div>
                          </div>
                        </div>

                        {/* benefits  */}
                        <div className="flex flex-col gap-3 pl-[25px] group-has-[input:not(:checked)]:hidden">
                          {currentPlanDetails?.benefits?.map(
                            (benefit, index) => {
                              return (
                                <div
                                  key={index}
                                  className="text-xs text-gray-300 flex gap-2"
                                >
                                  <div>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                    >
                                      <path
                                        d="M11.335 2.06544L11.4114 2.21801L11.9879 3.75099C12.0332 3.87171 12.1284 3.96697 12.2492 4.01226L13.7292 4.56753C14.3787 4.81121 14.7278 5.50524 14.5547 6.1619L14.5131 6.29259L13.8245 7.81541C13.7712 7.9328 13.7712 8.06751 13.8245 8.1849L14.4784 9.62411C14.7654 10.2557 14.5214 10.9932 13.9347 11.3352L13.7822 11.4116L12.2492 11.9881C12.1284 12.0333 12.0332 12.1286 11.9879 12.2493L11.4326 13.7294C11.189 14.3789 10.4949 14.7279 9.83826 14.5549L9.70758 14.5132L8.18475 13.8246C8.06736 13.7713 7.93265 13.7713 7.81526 13.8246L6.37605 14.4786C5.74448 14.7655 5.00693 14.5216 4.66498 13.9349L4.58856 13.7823L4.01211 12.2493C3.96682 12.1286 3.87156 12.0333 3.75084 11.9881L2.27076 11.4328C1.62126 11.1891 1.27224 10.4951 1.44531 9.83842L1.48695 9.70773L2.17552 8.1849C2.22886 8.06751 2.22886 7.9328 2.17552 7.81541L1.52159 6.3762C1.23462 5.74463 1.47858 5.00708 2.06529 4.66513L2.21786 4.58871L3.75084 4.01226C3.87156 3.96697 3.96682 3.87171 4.01211 3.75099L4.56738 2.27092C4.81105 1.62141 5.50509 1.27239 6.16175 1.44546L6.29243 1.48711L7.81526 2.17567C7.93265 2.22901 8.06736 2.22901 8.18475 2.17567L9.62396 1.52174C10.2555 1.23477 10.9931 1.47874 11.335 2.06544ZM5.40367 2.58466L4.84839 4.06474C4.71252 4.4269 4.42675 4.71267 4.06458 4.84855L2.58451 5.40382L2.48653 5.45513C2.31249 5.57574 2.24409 5.8071 2.33479 6.00671L2.98872 7.44592C3.14873 7.79809 3.14873 8.20223 2.98872 8.55439L2.32878 10.0074L2.30178 10.0992C2.264 10.3075 2.37924 10.5195 2.58451 10.5965L4.06458 11.1518C4.42675 11.2876 4.71252 11.5734 4.84839 11.9356L5.40367 13.4157L5.45497 13.5136C5.57558 13.6877 5.80695 13.7561 6.00656 13.6654L7.44577 13.0114C7.79793 12.8514 8.20207 12.8514 8.55424 13.0114L10.0073 13.6714L10.099 13.6984C10.3074 13.7362 10.5193 13.6209 10.5963 13.4157L11.1516 11.9356C11.2875 11.5734 11.5733 11.2876 11.9354 11.1518L13.4155 10.5965L13.5135 10.5452C13.6875 10.4246 13.7559 10.1932 13.6652 9.9936L13.0113 8.55439C12.8513 8.20223 12.8513 7.79809 13.0113 7.44592L13.6712 5.99287L13.6982 5.90115C13.736 5.6928 13.6208 5.48083 13.4155 5.40382L11.9354 4.84855C11.5733 4.71267 11.2875 4.4269 11.1516 4.06474L10.5963 2.58466L10.545 2.48668C10.4244 2.31265 10.1931 2.24424 9.99345 2.33494L8.55424 2.98887C8.20207 3.14888 7.79793 3.14888 7.44577 2.98887L6.00656 2.33494L5.97869 2.32339C5.74775 2.23675 5.49031 2.35373 5.40367 2.58466ZM6.97825 9.34681L10.1639 5.70607C10.3263 5.52044 10.6085 5.50163 10.7941 5.66405C10.9565 5.80617 10.9912 6.03996 10.8885 6.22054L10.8361 6.29425L7.33611 10.2942C7.18725 10.4644 6.93965 10.4933 6.75769 10.3754L6.68421 10.316L5.18421 8.81595C5.0098 8.64154 5.0098 8.35877 5.18421 8.18436C5.33682 8.03175 5.57239 8.01268 5.74574 8.12713L5.8158 8.18436L6.97825 9.34681L10.1639 5.70607L6.97825 9.34681Z"
                                        fill="#34AD5D"
                                      />
                                    </svg>
                                  </div>
                                  {benefit}
                                </div>
                              );
                            }
                          )}
                        </div>
                      </label>
                    );
                  })}

                  <Link
                    target="_blank"
                    href="/#plans"
                    className="underline text-xs font-medium text-primary-400 flex items-end justify-end cursor-pointer"
                  >
                    Show all plan Detail View
                  </Link>
                </div>
              </div>
            </div>

            {/* footer */}
            <div className="flex lg:flex-row flex-col lg:justify-between lg:items-center gap-3 mt-6">
              <div className="">
                <Button
                  variant="outline"
                  className="gap-1 px-3 pl-2 lg:w-auto w-full"
                  onClick={() => {
                    setStep(2);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M12.2676 15.794C11.9677 16.0797 11.493 16.0681 11.2073 15.7682L6.20597 10.5178C5.93004 10.2281 5.93004 9.77284 6.20597 9.48318L11.2073 4.23271C11.493 3.93279 11.9677 3.92125 12.2676 4.20694C12.5676 4.49264 12.5791 4.96737 12.2934 5.26729L7.78483 10.0005L12.2934 14.7336C12.5791 15.0336 12.5676 15.5083 12.2676 15.794Z"
                      fill="#5D6679"
                    />
                  </svg>
                  Back
                </Button>
              </div>

              <div className="flex gap-3 lg:flex-row flex-col">
                <Button
                  variant="outline"
                  className="text-primary-500 border-primary-200"
                  onClick={() => {
                    setModals({ ...modals, basicProfile: false });
                  }}
                >
                  Skip for Now
                </Button>

                <Button
                  variant="primary"
                  loading={isLoadingCreateSubscription}
                  onClick={() => {
                    handlePlanPurchase();
                  }}
                >
                  Choose & Continue
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
