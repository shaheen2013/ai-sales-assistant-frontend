import React from "react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/tabs";
import { Button } from "@/components/shadcn/button";
import { useGetDealerPricingPlansQuery } from "@/features/dealer/dealerProfileSlice";

interface PricingPlan {
  name?: string;
  type?: string;
  price?: number;
  description?: string;
  prices?: any[];
  subtitle?: string;
  features?: string[];
}

const pricingPlans: { monthly: PricingPlan[]; annually: PricingPlan[] } = {
  monthly: [
    {
      type: "Basic",
      price: 10,
      subtitle: "Perfect for sell used cars",
      features: [
        "Manage up to 20 car listings",
        "AI-powered customer inquiries via text",
        "Basic lead generation assistance",
        "24/7 automated customer responses",
        "Essential inventory management",
      ],
    },

    {
      type: "Enterprise",
      price: 20,
      subtitle: "Perfect for brands who sale new cars",
      features: [
        "Manage up to 100 car listings",
        "AI-driven lead generation & customer matching",
        "Voice & text AI customer support",
        "Automated follow-ups & appointment scheduling",
        "Performance analytics & insights",
      ],
    },

    {
      type: "Executive Assistant",
      price: 40,
      subtitle: "Perfect for Team with multiple member",
      features: [
        "Multi-user access for teams",
        "AI-powered task management & scheduling",
        "Seamless customer support via text & voice",
        "Shared dashboard for collaboration",
        "Advanced analytics & reporting",
      ],
    },
  ],
  annually: [
    {
      type: "Basic",
      price: 5,
      subtitle: "Perfect for sell used cars",
      features: [
        "Manage up to 20 car listings",
        "AI-powered customer inquiries via text",
        "Basic lead generation assistance",
        "24/7 automated customer responses",
        "Essential inventory management",
      ],
    },

    {
      type: "Enterprise",
      price: 10,
      subtitle: "Perfect for brands who sale new cars",
      features: [
        "Manage up to 100 car listings",
        "AI-driven lead generation & customer matching",
        "Voice & text AI customer support",
        "Automated follow-ups & appointment scheduling",
        "Performance analytics & insights",
      ],
    },

    {
      type: "Executive Assistant",
      price: 30,
      subtitle: "Perfect for Team with multiple member",
      features: [
        "Multi-user access for teams",
        "AI-powered task management & scheduling",
        "Seamless customer support via text & voice",
        "Shared dashboard for collaboration",
        "Advanced analytics & reporting",
      ],
    },
  ],
};

export default function PricingPlans() {
  const {
    isError,
    isFetching,
    data: dataGetDealerPricing,
  } = useGetDealerPricingPlansQuery();

  console.log("dataGetDealerPricing => ", dataGetDealerPricing);

  if (isError) {
    return "Something went wrong while fetching the data. Please try again later.";
  }

  if (isFetching) {
    return "Loading...";
  }

  return (
    <section className="text-gray-600">
      <div className="container px-5 py-12 mx-auto">
        <div className="flex flex-col justify-center text-center">
          {/* badge */}
          <div>
            <span className="border border-primary-600 py-2 px-6 rounded-lg text-primary-600 mb-9 inline-flex ">
              The Plans
            </span>
          </div>

          <h2 className="text-center text-[#3B3B3B] font-semibold text-5xl mb-4">
            Pricing Plans
          </h2>

          <p className="text-center text-[#707070] mb-6">
            We belive that all should be accecible to all customers, no matter
            the size.
          </p>
        </div>

        <div>
          <Tabs defaultValue="monthly" className="">
            {/* <TabsList className="grid grid-cols-2 w-[270px] mb-11 mx-auto">
                <TabsTrigger value="monthly">Monthly billing</TabsTrigger>
                <TabsTrigger value="annually">Annually billing</TabsTrigger>
              </TabsList> */}

            <TabsContent value="monthly">
              <div className="w-full grid lg:grid-cols-3 gap-6">
                {dataGetDealerPricing.map(
                  (plan: PricingPlan, index: number) => {
                    const price = plan?.prices?.[0];

                    console.log("plan => ", plan);

                    return (
                      <div
                        key={index}
                        className="border-2 border-primary-100 rounded-xl p-6 flex flex-col bg-white"
                      >
                        {/* badge */}
                        <div className="flex justify-center mb-4">
                          <span className="border bg-primary-400 py-1 px-4 rounded-lg text-white inline-block font-normal">
                            {plan?.name}
                          </span>
                        </div>

                        {/* pricing */}
                        <div className="flex items-end justify-center mb-1">
                          <span className="text-[#555D6A] text-lg font-medium">
                            $
                          </span>
                          <h2 className="text-6xl font-semibold text-gray-900">
                            {price?.convert_amount}
                          </h2>
                          <span className="text-[#555D6A]">/month</span>
                        </div>

                        {/* subtitle */}

                        <p className="text-center text-[#2B3545] mb-9">
                          {plan?.description || "Perfect for sell used cars"}
                        </p>

                        <hr className="mb-9" />

                        {/* features */}
                        <div className="mb-6">
                          {[
                            "Manage up to 20 car listings",
                            "AI-powered customer inquiries via text",
                            "Basic lead generation assistance",
                            "24/7 automated customer responses",
                            "Essential inventory management",
                          ].map((feature, index) => {
                            return (
                              <div
                                key={index}
                                className="flex items-center text-[#2B3545] mb-2 gap-2"
                              >
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="mt-[1px]"
                                >
                                  <g id="Checkmark Starburst">
                                    <path
                                      id="Shape"
                                      d="M8.461 1.89751L9.45065 2.28698C9.80368 2.42592 10.1962 2.42592 10.5493 2.28698L11.5389 1.89751C12.7503 1.42078 14.1216 1.9888 14.6411 3.18245L15.0654 4.15764C15.2168 4.50551 15.4944 4.7831 15.8423 4.93449L16.8175 5.35888C18.0111 5.87833 18.5792 7.24966 18.1024 8.461L17.7129 9.45065C17.574 9.80368 17.574 10.1962 17.7129 10.5493L18.1024 11.5389C18.5792 12.7503 18.0111 14.1216 16.8175 14.6411L15.8423 15.0654C15.4944 15.2168 15.2168 15.4944 15.0654 15.8423L14.6411 16.8175C14.1216 18.0111 12.7503 18.5792 11.5389 18.1024L10.5493 17.7129C10.1962 17.574 9.80368 17.574 9.45065 17.7129L8.461 18.1024C7.24966 18.5792 5.87833 18.0111 5.35888 16.8175L4.93449 15.8423C4.7831 15.4944 4.50551 15.2168 4.15764 15.0654L3.18245 14.6411C1.9888 14.1216 1.42078 12.7503 1.89751 11.5389L2.28698 10.5493C2.42592 10.1962 2.42592 9.80368 2.28698 9.45065L1.89751 8.461C1.42078 7.24966 1.9888 5.87833 3.18245 5.35888L4.15764 4.93449C4.50551 4.7831 4.7831 4.50551 4.93449 4.15764L5.35888 3.18245C5.87833 1.9888 7.24966 1.42078 8.461 1.89751ZM11.9051 2.82804L10.9155 3.21752C10.3271 3.44908 9.67283 3.44908 9.08444 3.21752L8.09479 2.82804C7.3845 2.54851 6.5804 2.88157 6.27581 3.58148L5.85143 4.55668C5.59911 5.13647 5.13647 5.59911 4.55668 5.85143L3.58148 6.27581C2.88157 6.5804 2.54851 7.3845 2.82804 8.09479L3.21752 9.08444C3.44908 9.67283 3.44908 10.3271 3.21752 10.9155L2.82804 11.9051C2.54851 12.6154 2.88157 13.4195 3.58148 13.7241L4.55668 14.1485C5.13647 14.4008 5.59911 14.8635 5.85143 15.4433L6.27581 16.4185C6.5804 17.1184 7.3845 17.4514 8.09479 17.1719L9.08444 16.7824C9.67283 16.5509 10.3271 16.5509 10.9155 16.7824L11.9051 17.1719C12.6154 17.4514 13.4195 17.1184 13.7241 16.4185L14.1485 15.4433C14.4008 14.8635 14.8635 14.4008 15.4433 14.1485L16.4185 13.7241C17.1184 13.4195 17.4514 12.6154 17.1719 11.9051L16.7824 10.9155C16.5509 10.3271 16.5509 9.67283 16.7824 9.08444L17.1719 8.09479C17.4514 7.3845 17.1184 6.5804 16.4185 6.27581L15.4433 5.85143C14.8635 5.59911 14.4008 5.13647 14.1485 4.55668L13.7241 3.58148C13.4195 2.88157 12.6154 2.54851 11.9051 2.82804ZM8.97856 11.7715L12.6263 7.66779C12.8097 7.46139 13.1258 7.4428 13.3321 7.62626C13.5156 7.78934 13.5507 8.05716 13.4274 8.25962L13.3737 8.33215L9.37367 12.8321C9.20378 13.0233 8.92203 13.0522 8.71864 12.9134L8.64641 12.8535L6.64641 10.8535C6.45115 10.6583 6.45115 10.3417 6.64641 10.1464C6.81998 9.97285 7.0894 9.95356 7.28427 10.0886L7.35352 10.1464L8.97856 11.7715L12.6263 7.66779L8.97856 11.7715Z"
                                      fill="#2B3545"
                                    />
                                  </g>
                                </svg>

                                <span className="text-[#555D6A] text-base font-normal">
                                  {feature}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        <hr className="mb-6" />

                        <div className="h-full flex flex-col items-end">
                          {/* button */}
                          <Button
                            variant="primary"
                            className="w-full !font-normal bg-primary-400 mt-auto"
                          >
                            Choose Plan
                          </Button>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* <div className="flex flex-wrap -m-4">
            <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
              <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
                <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
                  START
                </h2>
                <h1 className="text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">
                  Free
                </h1>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Vexillologist pitchfork
                </p>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Tumeric plaid portland
                </p>
                <p className="flex items-center text-gray-600 mb-6">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Mixtape chillwave tumeric
                </p>
                <button className="flex items-center mt-auto text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded">
                  Button
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-auto"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
                <p className="text-xs text-gray-500 mt-3">
                  Literally you probably haven&apos;t heard of them jean shorts.
                </p>
              </div>
            </div>
            <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
              <div className="h-full p-6 rounded-lg border-2 border-primary-500 flex flex-col relative overflow-hidden">
                <span className="bg-primary-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">
                  POPULAR
                </span>
                <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
                  PRO
                </h2>
                <h1 className="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                  <span>$38</span>
                  <span className="text-lg ml-1 font-normal text-gray-500">
                    /mo
                  </span>
                </h1>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Vexillologist pitchfork
                </p>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Tumeric plaid portland
                </p>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Hexagon neutra unicorn
                </p>
                <p className="flex items-center text-gray-600 mb-6">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Mixtape chillwave tumeric
                </p>
                <button className="flex items-center mt-auto text-white bg-primary-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-primary-600 rounded">
                  Button
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-auto"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
                <p className="text-xs text-gray-500 mt-3">
                  Literally you probably haven&apos;t heard of them jean shorts.
                </p>
              </div>
            </div>
            <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
              <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
                <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
                  BUSINESS
                </h2>
                <h1 className="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                  <span>$56</span>
                  <span className="text-lg ml-1 font-normal text-gray-500">
                    /mo
                  </span>
                </h1>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Vexillologist pitchfork
                </p>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Tumeric plaid portland
                </p>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Hexagon neutra unicorn
                </p>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Vexillologist pitchfork
                </p>
                <p className="flex items-center text-gray-600 mb-6">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Mixtape chillwave tumeric
                </p>
                <button className="flex items-center mt-auto text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded">
                  Button
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-auto"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
                <p className="text-xs text-gray-500 mt-3">
                  Literally you probably haven&apos;t heard of them jean shorts.
                </p>
              </div>
            </div>
            <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
              <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
                <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
                  SPECIAL
                </h2>
                <h1 className="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                  <span>$72</span>
                  <span className="text-lg ml-1 font-normal text-gray-500">
                    /mo
                  </span>
                </h1>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Vexillologist pitchfork
                </p>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Tumeric plaid portland
                </p>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Hexagon neutra unicorn
                </p>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Vexillologist pitchfork
                </p>
                <p className="flex items-center text-gray-600 mb-6">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Mixtape chillwave tumeric
                </p>
                <button className="flex items-center mt-auto text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded">
                  Button
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-auto"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
                <p className="text-xs text-gray-500 mt-3">
                  Literally you probably haven&apos;t heard of them jean shorts.
                </p>
              </div>
            </div>
          </div> */}
      </div>
    </section>
  );
}
