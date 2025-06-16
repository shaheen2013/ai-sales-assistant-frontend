"use client";

import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/shadcn/badge";
import { Button } from "@/components/shadcn/button";
import { Card, CardContent } from "@/components/shadcn/card";
import { useGetCurrentSubscriptionPlanQuery } from "@/features/dealer/dealerProfileSlice";
import { Skeleton } from "@/components/shadcn/skeleton";

const UpgradePlanCtaCard = () => {
  const {
    data: dataGetCurrentSubscription,
    error: errorGetCurrentSubscription,
    isLoading: isLoadingGetCurrentSubscription,
    isFetching: isFetchingGetCurrentSubscription,
  } = useGetCurrentSubscriptionPlanQuery();


  if (isFetchingGetCurrentSubscription) {
    return <Skeleton className="h-[220px] w-full" />;
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start">
          <div>
            <Badge className="bg-[#e7f6ef] text-[#13c56b] hover:bg-[#e7f6ef]/80 rounded-full px-3 py-0.5 mb-2 capitalize">
              {dataGetCurrentSubscription?.subscription?.status}
            </Badge>

            <h2 className="text-[20px] font-semibold text-gray-400 mt-2">
              {dataGetCurrentSubscription?.subscription?.product?.name}
            </h2>
            <p className="text-gray-300 text-sm mt-2">
              Perfect for brands who sale new cars
            </p>
          </div>
          <h3 className="text-2xl font-semibold text-gray-400 flex items-baseline">
            <span className="text-gray-400 text-3xl">
              $
              {
                dataGetCurrentSubscription?.subscription?.product?.prices?.[0]
                    ?.convert_amount
              }
            </span>
            <span className=" text-gray-400 text-sm ml-1">/month</span>
          </h3>
        </div>
        <div className="mt-6 flex justify-between items-center gap-6">
          <Button variant="link" className="text-[#2196f3] p-0 h-auto">
            Learn more
          </Button>

          <Button className="w-full  bg-white text-primary-600 border border-primary-100 hover:bg-gray-50">
            Upgrade plan
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpgradePlanCtaCard;
