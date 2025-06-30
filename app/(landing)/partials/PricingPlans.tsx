import { useState } from "react";
import { useSession } from "next-auth/react";

import {
  plansCommonBenefits,
  pricingPlanForHomepage,
  pricingPlansForSettingPlan,
} from "@/static/homepage";

import {
  useCreateSubscriptionMutation,
  useGetCurrentSubscriptionPlanQuery,
  useGetDealerPricingPlansQuery,
  useUpgradeSubscriptionMutation,
} from "@/features/dealer/dealerProfileSlice";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogHeader,
} from "@/components/shadcn/dialog";

import { beautifyErrors } from "@/lib/utils";
import { useToast } from "@/hooks/useToast";
import TickIcon from "@/components/icons/TickIcon";
import { Button } from "@/components/shadcn/button";
import { Tabs, TabsContent } from "@/components/shadcn/tabs";
import SomethingWentWrong from "@/components/SomethingWentWrong";
import Link from "next/link";

export default function PricingPlans() {
  const toast = useToast();
  const { data: session } = useSession();

  const { data: dataGetCurrentSubscription } =
    useGetCurrentSubscriptionPlanQuery();

  const {
    isError,
    isFetching,
    data: dataGetDealerPricing,
  } = useGetDealerPricingPlansQuery();

  const [
    createSubscription,
    { isLoading: isLoadingCreateSubscription, originalArgs },
  ] = useCreateSubscriptionMutation();

  const [modals, setModals] = useState({
    notAuthenticated: false,
  });

  const handleCreateSubscription = async (priceId: string) => {
    // check if user is authenticated otherwise show modal
    if (!session?.user) {
      setModals((prev) => ({
        ...prev,
        notAuthenticated: true,
      }));
      return;
    }

    // if user already has a subscription, redirect to settings page
    if (dataGetCurrentSubscription?.subscription) {
      // redirect
      window.location.href = `${window.location.origin}/dashboard/settings?tab=Your+Plan`;
      return;
    }

    try {
      const data = await createSubscription({
        price_id: priceId,
        success_url: `${window.location.origin}/dashboard/settings?tab=Your+Plan`,
        cancel_url: `${window.location.origin}/dashboard/settings?tab=Your+Plan`,
      }).unwrap();

      window.location.href = data?.checkout_url;
    } catch (error: any) {
      toast("error", beautifyErrors(error));
    }
  };

  if (isError) {
    return <SomethingWentWrong />;
  }

  return (
    <section className="text-gray-600" id="plans">
      <div className="container px-5 py-12 mx-auto">
        <div className="flex flex-col justify-center text-center">
          {/* badge */}
          <div className="">
            <span className="border border-primary-600 py-2 px-6 rounded-lg text-primary-600 mb-9 inline-flex font-medium">
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
            <TabsContent value="monthly">
              {isFetching ? (
                <div className="h-[500px] grid grid-cols-3 gap-6">
                  <div className="h-[500px] col-span-3 lg:col-span-1 bg-gray-50 rounded-xl shadow" />
                  <div className="h-[500px] col-span-3 lg:col-span-1 bg-gray-50 rounded-xl shadow" />
                  <div className="h-[500px] col-span-3 lg:col-span-1 bg-gray-50 rounded-xl shadow" />
                </div>
              ) : (
                <div className="flex flex-wrap justify-center gap-6">
                  {dataGetDealerPricing?.map((plan: any, index: any) => {
                    const price = plan?.prices?.[0];

                    const isLoading =
                      isLoadingCreateSubscription &&
                      price?.id === originalArgs?.price_id;

                    const currentPlanDetails = pricingPlanForHomepage.find(
                      (e) => e?.name === plan?.name
                    );

                    return (
                      <div
                        className="border-2 border-primary-100 rounded-2xl p-6 m-1 flex flex-col bg-white max-w-md w-full h-auto"
                        key={index}
                      >
                        {/* badge */}
                        <div className="flex justify-center mb-4">
                          <span className="border bg-primary-400 py-1 px-4 rounded-lg text-white inline-block font-normal">
                            {plan?.name}
                          </span>
                        </div>

                        {/* pricing */}
                        <div className="flex items-end justify-center mb-2">
                          <span className="text-[#555D6A] text-lg font-medium">
                            $
                          </span>
                          <h2 className="text-6xl font-semibold text-gray-900">
                            {price?.convert_amount}
                          </h2>
                          <span className="text-[#555D6A]">/month</span>
                        </div>

                        {/* subtitle */}
                        <p className="text-center text-[#2B3545] mb-6 capitalize">
                          {currentPlanDetails?.description ||
                            "Perfect for sell used cars"}
                        </p>

                        <hr className="mb-6" />

                        {/* features */}
                        <div className="space-y-3 mb-8">
                          {currentPlanDetails?.benefits?.map((key, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <div>
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="mt-[3px]"
                                >
                                  <g id="Checkmark Starburst">
                                    <path
                                      id="Shape"
                                      d="M8.461 1.89751L9.45065 2.28698C9.80368 2.42592 10.1962 2.42592 10.5493 2.28698L11.5389 1.89751C12.7503 1.42078 14.1216 1.9888 14.6411 3.18245L15.0654 4.15764C15.2168 4.50551 15.4944 4.7831 15.8423 4.93449L16.8175 5.35888C18.0111 5.87833 18.5792 7.24966 18.1024 8.461L17.7129 9.45065C17.574 9.80368 17.574 10.1962 17.7129 10.5493L18.1024 11.5389C18.5792 12.7503 18.0111 14.1216 16.8175 14.6411L15.8423 15.0654C15.4944 15.2168 15.2168 15.4944 15.0654 15.8423L14.6411 16.8175C14.1216 18.0111 12.7503 18.5792 11.5389 18.1024L10.5493 17.7129C10.1962 17.574 9.80368 17.574 9.45065 17.7129L8.461 18.1024C7.24966 18.5792 5.87833 18.0111 5.35888 16.8175L4.93449 15.8423C4.7831 15.4944 4.50551 15.2168 4.15764 15.0654L3.18245 14.6411C1.9888 14.1216 1.42078 12.7503 1.89751 11.5389L2.28698 10.5493C2.42592 10.1962 2.42592 9.80368 2.28698 9.45065L1.89751 8.461C1.42078 7.24966 1.9888 5.87833 3.18245 5.35888L4.15764 4.93449C4.50551 4.7831 4.7831 4.50551 4.93449 4.15764L5.35888 3.18245C5.87833 1.9888 7.24966 1.42078 8.461 1.89751ZM11.9051 2.82804L10.9155 3.21752C10.3271 3.44908 9.67283 3.44908 9.08444 3.21752L8.09479 2.82804C7.3845 2.54851 6.5804 2.88157 6.27581 3.58148L5.85143 4.55668C5.59911 5.13647 5.13647 5.59911 4.55668 5.85143L3.58148 6.27581C2.88157 6.5804 2.54851 7.3845 2.82804 8.09479L3.21752 9.08444C3.44908 9.67283 3.44908 10.3271 3.21752 10.9155L2.82804 11.9051C2.54851 12.6154 2.88157 13.4195 3.58148 13.7241L4.55668 14.1485C5.13647 14.4008 5.59911 14.8635 5.85143 15.4433L6.27581 16.4185C6.5804 17.1184 7.3845 17.4514 8.09479 17.1719L9.08444 16.7824C9.67283 16.5509 10.3271 16.5509 10.9155 16.7824L11.9051 17.1719C12.6154 17.4514 13.4195 17.1184 13.7241 16.4185L14.1485 15.4433C14.4008 14.8635 14.8635 14.4008 15.4433 14.1485L16.4185 13.7241C17.1184 13.4195 17.4514 12.6154 17.1719 11.9051L16.7824 10.9155C16.5509 10.3271 16.5509 9.67283 16.7824 9.08444L17.1719 8.09479C17.4514 7.3845 17.1184 6.5804 16.4185 6.27581L15.4433 5.85143C14.8635 5.59911 14.4008 5.13647 14.1485 4.55668L13.7241 3.58148C13.4195 2.88157 12.6154 2.54851 11.9051 2.82804ZM8.97856 11.7715L12.6263 7.66779C12.8097 7.46139 13.1258 7.4428 13.3321 7.62626C13.5156 7.78934 13.5507 8.05716 13.4274 8.25962L13.3737 8.33215L9.37367 12.8321C9.20378 13.0233 8.92203 13.0522 8.71864 12.9134L8.64641 12.8535L6.64641 10.8535C6.45115 10.6583 6.45115 10.3417 6.64641 10.1464C6.81998 9.97285 7.0894 9.95356 7.28427 10.0886L7.35352 10.1464L8.97856 11.7715L12.6263 7.66779L8.97856 11.7715Z"
                                      // fill="#2B3545"
                                      className="fill-primary-500"
                                    />
                                  </g>
                                </svg>
                              </div>

                              <p className="text-[#555D6A] text-base leading-relaxed">
                                {key}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-col justify-between h-full mt-auto">
                          <hr className="mb-6 mt-auto  items-end " />

                          <div className="">
                            {/* button */}
                            <Button
                              loading={isLoading}
                              onClick={() => {
                                handleCreateSubscription(price.id);
                              }}
                              variant="primary"
                              className="w-full !font-normal bg-primary-400 mt-auto rounded-lg h-11"
                            >
                              Choose Plan
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* modals */}
      <Dialog
        open={modals.notAuthenticated}
        onOpenChange={() => {
          setModals((prev) => ({
            ...prev,
            notAuthenticated: !prev.notAuthenticated,
          }));
        }}
      >
        <DialogContent className="sm:max-w-[700px] max-h-full overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-center">
              Authentication Required
            </DialogTitle>
          </DialogHeader>

          {/* body */}
          <div>
            <hr className="pb-8" />

            <div className="flex flex-col items-center justify-center py-6">
              <span className="text-gray-700 text-lg mb-2 text-center">
                You must be logged in to continue.
              </span>
              <span className="text-gray-500 text-sm text-center mb-4">
                Please{" "}
                <Link href="/login" className="text-primary-400">
                  log in{" "}
                </Link>
                or{" "}
                <Link href="/signup" className="text-primary-400">
                  create an account
                </Link>{" "}
                to access the pricing plans.
              </span>
              {/* You can add a login button here if needed */}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
