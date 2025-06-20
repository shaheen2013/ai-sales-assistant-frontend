import { Button } from "@/components/shadcn/button";
import PricingPlanSkeleton from "@/components/skeleton/PricingPlanSkeleton";
import {
  useCreateSubscriptionMutation,
  useGetCurrentSubscriptionPlanQuery,
  useGetDealerPricingPlansQuery,
  useUpgradeSubscriptionMutation,
} from "@/features/dealer/dealerProfileSlice";
import { useToast } from "@/hooks/useToast";
import { beautifyErrors, handleApiError } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import BillingHistoryTable from "./billing-history-table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/shadcn/dialog";
import TickIcon from "@/components/icons/TickIcon";

interface Price {
  id: string;
  unit_amount: number;
  convert_amount: number;
  recurring: {
    interval: string;
  };
}

interface PricingPlan {
  id: string;
  name: string;
  description?: string;
  prices: Price[];
}

const plansDetails = [
  {
    name: "Business Plan",
    for: "Mid-size independent dealerships (3-5 reps)",
    api_setup_fee: "$250 one-time (CRM, booking, parts)",
  },
  {
    name: "Enterprise Plan",

    for: "Franchise dealerships with multiple departments/locations",
    api_setup_fee: "$250 one-time (includes full CRM, service calendar, parts inventory, and SIP routing support)",
    extras: "Multi-location call routing, custom AI voice persona, CRM/DMS integration, priority onboarding",
  },
];

const planCommonFeatures = [
  "AI Voice Assistant powered by GPT-4o",
  "Unlimited website chatbot (text)",
  "Call routing via mobile or extension",
  "Dealer branding (custom greetings)",
];

export default function PricingPlanSection() {
  const toast = useToast();
  const { data: pricingPlans, isLoading: isLoadingPlans } =
    useGetDealerPricingPlansQuery();
  const { data: currentPlanResponse } = useGetCurrentSubscriptionPlanQuery();

  const [upgradeSubscription, { isLoading: isUpgrading }] =
    useUpgradeSubscriptionMutation();
  const [createSubscription, { isLoading: isLoadingCreateSubscription }] =
    useCreateSubscriptionMutation();

  const [selectedPriceMap, setSelectedPriceMap] = useState<
    Record<string, string>
  >({});
  const [openLearnMoreModal, setOpenLearnMoreModal] = useState(false);
  const [selectedLearnMorePlan, setSelectedLearnMorePlan] = useState<any>("");
  const selectedPlanDetails = plansDetails.find(
    (plan) => plan?.name === selectedLearnMorePlan?.name
  )

  const [upgradingPlanId, setUpgradingPlanId] = useState<string | null>(null);
  const currentPlan = pricingPlans?.find(
    (plan: any) => plan.id === currentPlanResponse?.subscription?.product?.id
  );

  const handleUpgradePlan = async (id: string) => {
    try {
      setUpgradingPlanId(id);
      const res = await upgradeSubscription({
        new_price_id: id,
      }).unwrap();
      if (res) {
        toast("success", "Subscription upgraded successfully");
      }
    } catch (error: any) {
      toast("error", beautifyErrors(error));
      console.error("Error", error);
    } finally {
      setUpgradingPlanId(null);
    }
  };

  return (
    <div className="rounded-2xl px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-[#2b3545] mb-2">
          Pricing Plans
        </h1>
        <p className="text-[#707070]">
          We believe that all should be accessible to all customers, no matter
          the size.
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex rounded-[48px] border border-[#019935] p-1">
          <button className="rounded-[48px] px-6 py-2 bg-[#019935] text-white">
            Monthly billing
          </button>
        </div>
      </div>

      {/* Pricing Plans */}
      {isLoadingPlans || isUpgrading || isLoadingCreateSubscription ? (
        <PricingPlanSkeleton />
      ) : (
        <div className="space-y-6">
          {pricingPlans?.map((plan: PricingPlan) => {
            const isCurrentPlan = plan.id === currentPlan?.id;
            return (
              <div
                key={plan.id}
                className={`border ${isCurrentPlan ? "border-primary-100" : "border"
                  }  rounded-xl p-6 flex flex-col  md:items-center md:justify-between`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="text-xl font-medium text-[#2b3545]">
                        {plan.name}
                      </h2>
                      <span className="text-xs px-2 py-0.5 rounded bg-[#b0dfc0] text-[#018b30]">
                        Monthly
                      </span>
                    </div>
                    <p className="text-[#707070] mb-4">
                      {plan.description || "Description Will be Here"}
                    </p>
                  </div>
                  {plan.prices.length > 0 && (
                    <div className="py-2">
                      <div className="flex items-start">
                        <span className="text-[#019935] text-2xl font-medium">
                          $
                        </span>
                        <div className="flex gap-2">
                          <div>
                            {(() => {
                              const selectedId =
                                selectedPriceMap[plan.id] || plan.prices[0].id;
                              const selectedPrice = plan.prices.find(
                                (p) => p.id === selectedId
                              );
                              return (
                                <div className="mt-2">
                                  <span
                                    className={`${isCurrentPlan
                                      ? "text-[#019935]"
                                      : "text-gray-500"
                                      } text-5xl font-semibold`}
                                  >
                                    {selectedPrice?.convert_amount || "0"}
                                  </span>
                                </div>
                              );
                            })()}
                          </div>
                          <select
                            className="text-[#2b3545] appearance-none px-2 border rounded-md text-2xl bg-solid-white cursor-pointer font-medium"
                            value={
                              selectedPriceMap[plan.id] || plan.prices[0].id
                            }
                            onChange={(e) => {
                              setSelectedPriceMap((prev) => ({
                                ...prev,
                                [plan.id]: e.target.value,
                              }));
                            }}
                          >
                            {plan.prices.map((price) => (
                              <option
                                key={price.id}
                                value={price.id}
                                className="cursor-pointer bg-solid-white"
                              >
                                per {price.recurring.interval}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="w-full">
                  <hr className="border-t border-[#eaebec] my-4" />
                  <div className="flex justify-between">
                    <div
                      className={`text-gray-500 underline font-medium cursor-pointer select-none`}
                      onClick={() => {
                        setSelectedLearnMorePlan(plan);
                        setOpenLearnMoreModal(true);
                      }}
                    >
                      Learn more
                    </div>
                    {isCurrentPlan ? (
                      <p className="text-[#019935] mt-2">
                        This is the current plan
                      </p>
                    ) : (
                      <Button
                        variant={"outline"}
                        onClick={() =>
                          handleUpgradePlan(
                            selectedPriceMap[plan.id] || plan.prices[0].id
                          )
                        }
                        disabled={
                          upgradingPlanId ===
                          (selectedPriceMap[plan.id] || plan.prices[0].id)
                          || plan.prices[0].convert_amount < (currentPlan?.prices?.[0].convert_amount || 0)
                        }
                        className="text-[#019935] text-base shadow-md px-4 py-2.5 font-medium border-primary-100"
                      >
                        {upgradingPlanId ===
                          (selectedPriceMap[plan.id] || plan.prices[0].id)
                          ? "Upgrading..."
                          : "Upgrade Plan"}
                        {upgradingPlanId !==
                          (selectedPriceMap[plan.id] || plan.prices[0].id) && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                            >
                              <path
                                d="M7.99932 3.75007C7.99932 3.33582 8.33513 3 8.74938 3H16.2499C16.6642 3 17 3.33582 17 3.75007V11.2507C17 11.665 16.6642 12.0008 16.2499 12.0008C15.8357 12.0008 15.4999 11.665 15.4999 11.2507V5.56087L4.28042 16.7803C3.9875 17.0732 3.5126 17.0732 3.21968 16.7803C2.92677 16.4874 2.92677 16.0125 3.21969 15.7196L14.4391 4.50013H8.74938C8.33513 4.50013 7.99932 4.16432 7.99932 3.75007Z"
                                fill="#019935"
                              />
                            </svg>
                          )}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Billing History */}
      <BillingHistoryTable />

      {/* Learn More Dialog */}
      <Dialog open={openLearnMoreModal} onOpenChange={setOpenLearnMoreModal}>

        <DialogContent className="sm:max-w-[700px] max-h-full overflow-auto">
          <DialogHeader>
            <DialogTitle>
              Plan Details
            </DialogTitle>
          </DialogHeader>

          <div
            className="border-2 border-primary-100 rounded-xl p-6 flex flex-col bg-white"
          >
            {/* badge */}
            <div className="flex justify-center mb-4">
              <span className="border bg-primary-400 py-1 px-4 rounded-lg text-white inline-block font-normal">
                {selectedLearnMorePlan?.name}
              </span>
            </div>

            {/* pricing */}
            <div className="flex items-end justify-center mb-6">
              <span className="text-[#555D6A] text-lg font-medium">
                $
              </span>
              <h2 className="text-6xl font-semibold text-gray-900">
                {selectedLearnMorePlan?.prices?.[0]?.convert_amount}
              </h2>
              <span className="text-[#555D6A]">/ {selectedLearnMorePlan.prices?.[0]?.recurring?.interval}</span>
            </div>

            <hr className="mb-9" />

            {/* features */}
            <div className="mb-6">
              {
                Object.entries(selectedPlanDetails || {})?.map(([key, value]) => (key !== "name") && (
                  <div
                    key={key}
                    className="flex text-[#2B3545] mb-2 gap-2"
                  >
                    <div>
                      <TickIcon />
                    </div>

                    <p className="text-[#555D6A] text-base font-normal">
                      <span className="text-[#242424] font-bold capitalize">{key?.split("_")?.join(" ")}: </span> {value}
                    </p>
                  </div>
                ))
              }
              {planCommonFeatures.map((feature, index) => {
                return (
                  <div
                    key={index}
                    className="flex text-[#2B3545] mb-2 gap-2"
                  >
                    <div>
                      <TickIcon />
                    </div>

                    <span className="text-[#555D6A] text-base font-normal">
                      {feature}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
