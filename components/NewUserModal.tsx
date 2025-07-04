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

    // console.log("selectedPlanData => ", selectedPlanData?.prices?.[0]?.id);

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

                <h2 className="lg:text-2xl text-lg text-[#1F2A37] font-medium">
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
                        className="h-10"
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
                      // <Input
                      //   type="country"
                      //   id="country"
                      //   className="h-10"
                      //   placeholder="country Here"
                      //   error={errors?.country?.message}
                      //   {...field}
                      // />

                      <Select
                        onValueChange={(value) => {
                          // setValue("country", value);
                          field.onChange(value);
                          console.log("Selected country: ", value);
                        }}
                        value={field.value}
                      >
                        <SelectTrigger
                          className="w-full"
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

                <h2 className="text-2xl text-[#1F2A37] font-medium">
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

        <ContentSwitcher value="3 " currentStep={step}>
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

                <h2 className="text-2xl text-[#1F2A37] font-medium">
                  Select your Magic plan!
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-9">
                {/* left */}
                <div className="">
                  <h2 className="text-gray-400 font-bold text-2xl mt-2 mb-2">
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
                      className="p-0 pb-2 rounded-none border-none mb-3"
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
                    return (
                      <label
                        key={index}
                        className="has-[:checked]:border-primary-400 has-[:checked]:text-primary-900 has-[:checked]:ring-indigo-200 flex w-full border border-gray-50 rounded-xl pt-4 px-4 cursor-pointer transition-all gap-3 group flex-col"
                      >
                        <div className="flex gap-3">
                          <input
                            // defaultChecked={index === 0} // Default to the first plan being selected
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
                                Perfect for sell used cars
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
                        <div className="pl-[25px]">
                          {[
                            "Manage up to 20 car listings",
                            "AI-powered customer inquiries via text",
                            "Basic lead generation assistance",
                          ]?.map((benefit, index) => {
                            return (
                              <div
                                key={index}
                                className="text-xs text-gray-300 mb-3 flex gap-2"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <rect
                                    x="16"
                                    y="16"
                                    width="16"
                                    height="16"
                                    rx="8"
                                    transform="rotate(-180 16 16)"
                                    fill="#55BB78"
                                  />
                                  <path
                                    d="M6.98228 10.6663C6.77947 10.6663 6.58738 10.589 6.4643 10.4557L4.79846 8.65701C4.74695 8.60146 4.70935 8.53817 4.68781 8.47074C4.66626 8.40331 4.66118 8.33307 4.67287 8.26404C4.68457 8.195 4.71279 8.12853 4.75594 8.06842C4.79909 8.00831 4.85631 7.95573 4.92434 7.9137C4.99234 7.8715 5.06987 7.84068 5.15248 7.823C5.23509 7.80533 5.32115 7.80115 5.40574 7.8107C5.49033 7.82026 5.57178 7.84336 5.64542 7.87869C5.71906 7.91402 5.78345 7.96087 5.83489 8.01657L6.93099 9.19916L9.68688 5.58282C9.77828 5.46342 9.92389 5.37851 10.0918 5.34673C10.2597 5.31495 10.4362 5.33888 10.5825 5.41328C10.887 5.56796 10.9807 5.89561 10.7904 6.14478L7.53429 10.4157C7.47871 10.4889 7.40209 10.5499 7.3111 10.5935C7.2201 10.637 7.11747 10.6618 7.01212 10.6656C7.00186 10.6663 6.99254 10.6663 6.98228 10.6663Z"
                                    fill="white"
                                  />
                                </svg>
                                {benefit}
                              </div>
                            );
                          })}
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
            <div className="flex justify-between items-center gap-3 mt-6">
              <div>
                <Button
                  variant="outline"
                  className="gap-1 px-3 pl-2"
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

              <div className="flex gap-3 ">
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
