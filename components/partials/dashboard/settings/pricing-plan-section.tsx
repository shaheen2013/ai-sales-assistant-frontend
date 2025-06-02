import { Button } from '@/components/shadcn/button';
import PricingPlanSkeleton from '@/components/skeleton/PricingPlanSkeleton';
import {
  useCreateSubscriptionMutation,
  useGetCurrentSubscriptionPlanQuery,
  useGetDealerPricingPlansQuery,
  useUpgradeSubscriptionMutation,
} from '@/features/dealer/dealerProfileSlice';
import { useToast } from '@/hooks/useToast';
import { handleApiError } from '@/lib/utils';
import Link from 'next/link';
import { useState } from 'react';
import BillingHistoryTable from './billing-history-table';

interface Price {
  id: string;
  unit_amount: number;
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
  const { data: currentPlanResponse } = useGetCurrentSubscriptionPlanQuery();

  const [upgradeSubscription, { isLoading: isUpgrading }] =
    useUpgradeSubscriptionMutation();
  const [
    createSubscription, { isLoading: isLoadingCreateSubscription }
  ] = useCreateSubscriptionMutation();

  const [selectedPriceMap, setSelectedPriceMap] = useState<
    Record<string, string>
  >({});

  const [upgradingPlanId, setUpgradingPlanId] = useState<string | null>(null);
  const currentPlan = pricingPlans?.find(
    (plan: any) => plan.id === currentPlanResponse?.subscription?.product?.id
  );

  const handleUpgradePlan = async (id: string) => {
    if (!currentPlan) {
      try {
        const { data, error } = await createSubscription({
          price_id: id,
          success_url: `${window.location.origin}/dashboard/settings?tab=Your Plan`,
          cancel_url: `${window.location.origin}`,
        });

        if (error) {
          console.error("Error creating subscription:", error);
          return;
        }

        window.location.href = data?.checkout_url;
      } catch (error: any) {
        console.error("Error creating subscription:", error);
      }
    } else {
      try {
        setUpgradingPlanId(id);
        const res = await upgradeSubscription({
          new_price_id: id,
        }).unwrap();
        if (res) {
          toast('success', 'Subscription upgraded successfully');
        }
      } catch (error: any) {
        toast('error', handleApiError(error));
        console.error('Error', error);
      } finally {
        setUpgradingPlanId(null);
      }
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
          <button className="rounded-[48px] px-6 py-2 text-[#707070]">
            Annual billing
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
                className={`border ${isCurrentPlan ? 'border-primary-100' : 'border'
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
                      {plan.description || 'Description Will be Here'}
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
                                      ? 'text-[#019935]'
                                      : 'text-gray-500'
                                      } text-5xl font-semibold`}
                                  >
                                    {selectedPrice?.unit_amount || '0'}
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
                    <Link
                      href="#"
                      className={`${isCurrentPlan
                        ? ' text-[#019935]'
                        : 'text-gray-500 underline'
                        } font-medium`}
                    >
                      Learn more
                    </Link>
                    {isCurrentPlan ? (
                      <p className="text-[#019935] mt-2">
                        This is the current plan
                      </p>
                    ) : (
                      <Button
                        variant={'outline'}
                        onClick={() =>
                          handleUpgradePlan(
                            selectedPriceMap[plan.id] || plan.prices[0].id
                          )
                        }
                        disabled={
                          upgradingPlanId ===
                          (selectedPriceMap[plan.id] || plan.prices[0].id)
                        }
                        className="text-[#019935] text-base shadow-md px-4 py-2.5 font-medium border-primary-100"
                      >
                        {upgradingPlanId ===
                          (selectedPriceMap[plan.id] || plan.prices[0].id)
                          ? 'Upgrading...'
                          : 'Upgrade Plan'}
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
    </div>
  );
}
