"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "./shadcn/accordion";
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
import {
  useGetCurrentSubscriptionPlanQuery,
  useGetDealerPricingPlansQuery,
  useUpdateDealerBusinessProfileMutation,
  useUpdateDealerProfileMutation,
} from "@/features/dealer/dealerProfileSlice";
import { useToast } from "@/hooks/useToast";
import { beautifyErrors } from "@/lib/utils";

export default function NewUserModal() {
  const toast = useToast();
  const router = useRouter();
  const [number, setNumber] = useState<string>("");

  const [modals, setModals] = useState({
    basicProfile: false,
  });

  const [step, setStep] = useState<number>(1);

  const { data: pricingPlans, isLoading: isLoadingPlans } =
    useGetDealerPricingPlansQuery();

  console.log("pricingPlans => ", pricingPlans);

  // const { data: dataCurrentPlan } = useGetCurrentSubscriptionPlanQuery();

  const [updateProfile, { isLoading: isLoadingUpdateProfile }] =
    useUpdateDealerProfileMutation();

  const [updateDealerProfile, { isLoading: isLoadingUpdateDealerProfile }] =
    useUpdateDealerBusinessProfileMutation();

  useEffect(() => {
    if (window.localStorage.getItem("onboarding") == "true") {
      setModals({ ...modals, basicProfile: true });

      window.localStorage.removeItem("onboarding");
    }
  }, []);

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

  const { handleSubmit: handleSubmitDealer, control: controlDealer } = useForm({
    defaultValues: {
      business_name: "",
      business_email: "",
    },
  });

  // const handleBasicPersonalInfo = () => {
  //   handleSubmit(onSubmit)();
  // };

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

  const plans = [
    {
      name: "Pro Plan",
      price: "150",
      benefits: [
        "500 voice minutes",
        "$0.15 per minute",
        "Small to mid-size independent dealerships",
        "Optional $250 one-time if integrations are needed",
      ],
    },
    { name: "Business Plan", price: "300" },
    { name: "Enterprise Plan", price: "999" },
  ];

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
                onSubmit={handleSubmit(handleBasicProfile)}
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

                <h2 className="text-2xl">Your Business Information</h2>
              </div>

              <form
                onSubmit={handleSubmitDealer(handleDealerProfile)}
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

                {/* email */}
                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className="text-sm mb-1 text-[#414651] font-medium"
                  >
                    Email <span className="text-primary-500">*</span>
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
              </form>
            </div>

            {/* footer */}
            <div className="flex justify-end gap-3 mt-6">
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

                <h2 className="text-2xl">Select your Magic plan!</h2>
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
                      <AccordionTrigger className="text-xs font-semibold text-gray-400">
                        What&&apos;s included in the monthly voice minutes?
                      </AccordionTrigger>
                      <AccordionContent className="text-xs font-normal text-gray-300">
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
                      <AccordionTrigger className="text-xs font-semibold text-gray-400">
                        What happens if we exceed our included voice minutes?
                      </AccordionTrigger>
                      <AccordionContent className="text-xs font-normal text-gray-300">
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
                      <AccordionTrigger className="text-xs font-semibold text-gray-400">
                        Is there a contract or can I cancel anytime?
                      </AccordionTrigger>
                      <AccordionContent className="text-xs font-normal text-gray-300">
                        There is no long-term contract required. You can cancel
                        your subscription at any time through your account
                        settings. Your plan will remain active until the end of
                        the current billing cycle.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                {/* right */}
                <div className="flex flex-col gap-3">
                  {plans.map((plan, index) => {
                    return (
                      <label
                        key={index}
                        className="has-[:checked]:border-primary-400 has-[:checked]:text-primary-900 has-[:checked]:ring-indigo-200 flex w-full border border-gray-50 rounded-xl pt-4 px-4 cursor-pointer transition-all gap-3 group flex-col"
                      >
                        <div className="flex gap-3">
                          <input
                            defaultChecked={index === 0} // Default to the first plan being selected
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
                                {plan.price}
                              </span>
                              /month
                            </div>
                          </div>
                        </div>

                        {/* benefits  */}
                        <div className="pl-[25px]">
                          {plan?.benefits?.map((benefit, index) => {
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

                  <span className="underline text-xs font-medium text-primary-400 flex items-end justify-end cursor-pointer">
                    Show all plan Detail View
                  </span>
                </div>
              </div>
            </div>

            {/* footer */}
            <div className="flex justify-end gap-3 mt-6">
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
                onClick={() => {
                  // handleSubmit(onSubmit)();
                }}
              >
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
