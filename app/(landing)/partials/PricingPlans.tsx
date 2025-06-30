import { useSession } from "next-auth/react";

import {
  plansCommonBenefits,
  pricingPlanForHomepage,
  pricingPlansForSettingPlan,
} from "@/static/homepage";

import {
  useCreateSubscriptionMutation,
  useGetDealerPricingPlansQuery,
} from "@/features/dealer/dealerProfileSlice";

import { beautifyErrors } from "@/lib/utils";
import { useToast } from "@/hooks/useToast";
import TickIcon from "@/components/icons/TickIcon";
import { Button } from "@/components/shadcn/button";
import { Tabs, TabsContent } from "@/components/shadcn/tabs";

export default function PricingPlans() {
  const toast = useToast();
  const { data: session } = useSession();

  const {
    isError,
    isFetching,
    data: dataGetDealerPricing,
  } = useGetDealerPricingPlansQuery();

  const [
    createSubscription,
    { isLoading: isLoadingCreateSubscription, originalArgs },
  ] = useCreateSubscriptionMutation();

  const handleCreateSubscription = async (priceId: string) => {
    if (!session?.user) {
      alert("Please login to upgrade your subscription.");
      return;
    }

    try {
      const data = await createSubscription({
        price_id: priceId,
        success_url: `${window.location.origin}/dashboard/overview`,
        cancel_url: `${window.location.origin}`,
      }).unwrap();

      window.location.href = data?.checkout_url;
    } catch (error: any) {
      toast("error", beautifyErrors(error));
    }
  };

  if (isError) {
    return "Something went wrong while fetching the data. Please try again later.";
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

                    console.log("plan => ", plan);

                    return (
                      <div key={index} className="bg-white rounded-2xl py-2">
                        <div className="border-2 border-primary-100 rounded-2xl p-6 m-1 flex flex-col bg-white max-w-md w-full h-full">
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
                          <p className="text-center text-[#2B3545] mb-9 capitalize">
                            {currentPlanDetails?.description ||
                              "Perfect for sell used cars"}
                          </p>

                          <hr className="mb-9" />

                          {/* features */}
                          <div className="space-y-3 mb-8">
                            {currentPlanDetails?.benefits?.map((key, index) => (
                              <div
                                key={index}
                                className="flex items-start gap-2"
                              >
                                <div>
                                  <TickIcon />
                                </div>

                                <p className="text-[#555D6A] text-base leading-relaxed">
                                  {key}
                                </p>
                              </div>
                            ))}
                          </div>

                          <div className="flex flex-col justify-between h-full">
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
                      </div>
                    );
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
