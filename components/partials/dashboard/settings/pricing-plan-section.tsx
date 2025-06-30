"use client";

import { useState } from "react";
import classNames from "classnames";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
} from "@/components/shadcn/dialog";

import {
  useCreateSubscriptionMutation,
  useGetDealerPricingPlansQuery,
  useUpgradeSubscriptionMutation,
  useGetCurrentSubscriptionPlanQuery,
} from "@/features/dealer/dealerProfileSlice";

import { beautifyErrors } from "@/lib/utils";
import { useToast } from "@/hooks/useToast";
import { Button } from "@/components/shadcn/button";

import TickIcon from "@/components/icons/TickIcon";
import BillingHistoryTable from "./billing-history-table";
import PricingPlanSkeleton from "@/components/skeleton/PricingPlanSkeleton";
import {
  plansCommonBenefits,
  pricingPlansForSettingPlan,
} from "@/static/homepage";

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

export default function PricingPlanSection() {
  const toast = useToast();

  const { data: pricingPlans, isLoading: isLoadingPlans } =
    useGetDealerPricingPlansQuery();

  const { data: dataCurrentPlan } = useGetCurrentSubscriptionPlanQuery();

  const [
    upgradeSubscription,
    {
      isLoading: isLoadingUpgradeSubscription,
      originalArgs: originalArgsUpgradeSubscription,
    },
  ] = useUpgradeSubscriptionMutation();

  const [
    createSubscription,
    {
      isLoading: isLoadingCreateSubscription,
      originalArgs: originalArgsCreateSubscription,
    },
  ] = useCreateSubscriptionMutation();

  const [selectedPriceMap, setSelectedPriceMap] = useState<
    Record<string, string>
  >({});

  const [openLearnMoreModal, setOpenLearnMoreModal] = useState(false);
  const [selectedLearnMorePlan, setSelectedLearnMorePlan] = useState<any>("");

  const currentPlan = pricingPlans?.find(
    (plan: any) => plan.id === dataCurrentPlan?.subscription?.product?.id
  );

  const currentPlanDetails = pricingPlansForSettingPlan.find(
    (plan) => plan?.name === selectedLearnMorePlan?.name
  );

  const handleUpgradePlan = async (id: string) => {
    try {
      const { data, error } = await upgradeSubscription({
        new_price_id: id,
      });

      if (error) {
        console.error("Error upgrading subscription", error);
        toast("error", beautifyErrors(error));
        return;
      }

      console.log("Subscription upgraded successfully", data);
    } catch (error: any) {
      toast("error", beautifyErrors(error));
      console.error("Error", error);
    }
  };

  const handleCreateSubscription = async (priceId: string) => {
    try {
      const { data, error } = await createSubscription({
        price_id: priceId,
        success_url: `${window.location.origin}/dashboard/settings?tab=Your Plan`,
        cancel_url: `${window.location.origin}/dashboard/settings?tab=Your Plan`,
      });

      if (error) {
        console.error("Error creating subscription", error);
        toast("error", beautifyErrors(error));
        return;
      }

      console.log("Subscription created successfully", data);

      window.location.href = data?.checkout_url;
    } catch (error: any) {
      toast("error", beautifyErrors(error));
      console.error("Error", error);
    }
  };

  const handlePurchasePlan = async (priceId: string) => {
    console.log("currentPlan => ", currentPlan);
    if (currentPlan) {
      // If current plan exists, upgrade it
      await handleUpgradePlan(priceId);
    } else {
      // If no current plan, create a new subscription
      await handleCreateSubscription(priceId);
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
      {isLoadingPlans ? (
        <PricingPlanSkeleton />
      ) : (
        <div className="space-y-6">
          {pricingPlans?.map((plan: PricingPlan) => {
            const isCurrentPlan = plan.id === currentPlan?.id;

            const isUpgradable =
              currentPlan?.prices?.[0]?.convert_amount >
              plan?.prices?.[0]?.convert_amount;

            return (
              <div
                key={plan.id}
                className={`border ${
                  isCurrentPlan ? "border-primary-100" : "border"
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
                                    className={`${
                                      isCurrentPlan
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
                      <>
                        {currentPlan ? (
                          <Button
                            variant={"outline"}
                            disabled={isUpgradable}
                            onClick={() =>
                              handlePurchasePlan(plan.prices[0].id)
                            }
                            className={classNames(
                              `text-[#019935] text-base shadow-md px-4 py-2.5 font-medium border-primary-100`,
                              {
                                "!cursor-not-allowed": isUpgradable,
                              }
                            )}
                          >
                            {isLoadingUpgradeSubscription &&
                            originalArgsUpgradeSubscription?.new_price_id ===
                              plan.prices[0].id
                              ? "Upgrading..."
                              : "Upgrade Plan"}

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
                          </Button>
                        ) : (
                          <Button
                            variant={"outline"}
                            onClick={() =>
                              handlePurchasePlan(plan.prices[0].id)
                            }
                            className="text-[#019935] text-base shadow-md px-4 py-2.5 font-medium border-primary-100"
                          >
                            {isLoadingCreateSubscription &&
                            originalArgsCreateSubscription?.price_id ===
                              plan.prices[0].id
                              ? "Purchasing..."
                              : "Purchase Plan"}
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
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {pricingPlans?.length === 0 && (
            <p className="text-center text-gray-500 mt-6">
              No pricing plans available at the moment.
            </p>
          )}
        </div>
      )}

      {/* Billing History */}
      <BillingHistoryTable />

      {/* Learn More Dialog */}
      <Dialog open={openLearnMoreModal} onOpenChange={setOpenLearnMoreModal}>
        <DialogContent className="sm:max-w-[550px] max-h-full overflow-auto">
          <DialogHeader>
            <DialogTitle>Plan Details</DialogTitle>
          </DialogHeader>

          <div className="bg-white border-2 border-primary-100 rounded-2xl p-6 md:p-8 w-full max-w-lg mx-auto flex flex-col gap-8 text-[#2B3545]">
            {/* Plan Name & Pricing */}
            <div className="flex flex-col items-center text-center gap-3">
              <h2 className="text-xl font-semibold text-primary-400 tracking-wide uppercase">
                {selectedLearnMorePlan?.name}
              </h2>

              <div className="flex items-baseline gap-1">
                <span className="text-[#555D6A] text-lg font-medium">$</span>
                <span className="text-5xl font-bold text-gray-900 leading-none">
                  {selectedLearnMorePlan?.prices?.[0]?.convert_amount}
                </span>
                <span className="text-[#555D6A] text-base font-medium">
                  / {selectedLearnMorePlan?.prices?.[0]?.recurring?.interval}
                </span>
              </div>
            </div>

            <hr className="border-t border-gray-200" />

            {/* Plan Details */}
            <div className="space-y-4">
              <h3 className="text-[#242424] text-sm font-semibold uppercase tracking-wider">
                Plan Details
              </h3>
              <div className="space-y-3">
                {Object.entries(currentPlanDetails || {}).map(
                  ([key, value]) =>
                    key !== "name" && (
                      <div key={key} className="flex items-start gap-3">
                        <TickIcon />
                        <p className="text-[#555D6A] text-sm leading-relaxed">
                          <span className="text-[#242424] font-semibold capitalize">
                            {key.replace(/_/g, " ")}:
                          </span>{" "}
                          {value}
                        </p>
                      </div>
                    )
                )}
              </div>
            </div>

            {/* Common Features */}
            <div className="space-y-4">
              <h3 className="text-[#242424] text-sm font-semibold uppercase tracking-wider">
                Included Features
              </h3>
              <div className="space-y-3">
                {plansCommonBenefits.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <TickIcon />
                    <span className="text-[#555D6A] text-sm leading-relaxed">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
