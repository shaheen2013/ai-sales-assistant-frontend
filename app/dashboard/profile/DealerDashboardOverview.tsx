"use client";

import { useEffect, useState } from "react";
import WavesurferPlayer from "@wavesurfer/react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogHeader,
} from "@/components/shadcn/dialog";

import StatisticsSection from "./StatisticsSection";
import { Button } from "@/components/shadcn/button";
import { Skeleton } from "@/components/shadcn/skeleton";

import { useGetDealerDashboardOverviewQuery, useGetDealerMinutePlansQuery, useUpdateDealerAssistantVoiceMutation } from "@/features/dealer/dealerSlice";
import { useToast } from "@/hooks/useToast";
import { beautifyErrors, formateDate } from "@/lib/utils";
import { Checkbox } from "@/components/shadcn/checkbox";
import classNames from "classnames";
import Image from "next/image";
import DealerDashboardOverviewSkeleton from "@/components/skeleton/DealerDashboardOverviewSkeleton";
import DealerMinutePlanSkeleton from "@/components/skeleton/DealerMinutePlanSkeleton";
import { useCreateMinuteSubscriptionMutation, useGetCurrentSubscriptionPlanQuery } from "@/features/dealer/dealerProfileSlice";

const defaultPlans: { [key: string]: { minutes: number; description: string } } = {
  "Quick Boost": {
    minutes: 150,
    description: "For occasional overage",
  },
  "Dealer Max": {
    minutes: 600,
    description: "For busier dealerships mid-month",
  },
  "Power Pack": {
    minutes: 2000,
    description: "For high-volume operators",
  },
}

type PlanType = {
  id: string;
  name: string;
  price: string | number;
  minutes: number;
  description: string;
}

const AdminDashboardOverview = () => {
  /*--Custom Hooks--*/
  const toast = useToast();

  /*--React State--*/
  const [wavesurfer, setWavesurfer] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [modals, setModals] = useState({
    addMoreMinute: false,
    billingSummery: false,
  });
  const [voice, setVoice] = useState("alloy");

  const [minutePlans, setMinutePlans] = useState<PlanType[]>([]);
  const [selectedMinutePlan, setSelectedMinutePlan] = useState<PlanType | null>(null);

  const [creditCards, setCreditCards] = useState([
    { name: "Stripe", selected: true },
    { name: "PayPal", selected: false },
    { name: "Bank Transfer", selected: false },
  ]);

  /*--RTK Query--*/
  const { data: dealerDashboardOverviewData, isLoading: dealerDashboardOverviewLoading } = useGetDealerDashboardOverviewQuery();
  const [updateDealerAssitantVoice] = useUpdateDealerAssistantVoiceMutation();
  const { data: dealerMinutePlans, isLoading: dealerMinutePlansLoading } = useGetDealerMinutePlansQuery(undefined, { skip: !modals.addMoreMinute });
  const { data: dealerCurrentSubscription, isLoading: dealerCurrentSubscriptionLoading } = useGetCurrentSubscriptionPlanQuery(undefined, { skip: !modals.addMoreMinute });
  const [createMinuteSubscription, { isLoading: createMinuteSubscriptionLoading }] = useCreateMinuteSubscriptionMutation();

  const onReady = (ws: any) => {
    setWavesurfer(ws);
    setIsPlaying(false);
  };

  const onPlayPause = () => {
    if (wavesurfer) wavesurfer.playPause();
  };

  const handleChangeDealerAssistanceVoice = async (voice: string) => {
    setVoice(voice);
    try {
      const data = await updateDealerAssitantVoice({ voice }).unwrap();
      if (data) {
        toast("success", "Voice updated successfully!");
      }
    } catch (error) {
      toast("error", beautifyErrors(error));
    }
  };

  const handleBuyMinutes = async () => {
    if (!selectedMinutePlan?.id) {
      toast("error", "Please select a plan to buy minutes");
      return;
    }

    try {
      const data = await createMinuteSubscription({
        price_id: selectedMinutePlan?.id,
        success_url: `${window.location.origin}/dashboard/overview`,
        cancel_url: `${window.location.origin}/dashboard/overview`,
      }).unwrap();

      window.location.href = data?.checkout_url;
    } catch (err) {
      toast("error", beautifyErrors(err));
    }
  }

  useEffect(() => {
    if (dealerDashboardOverviewData) {
      setVoice(dealerDashboardOverviewData.voice || "alloy");
    }
  }, [dealerDashboardOverviewData]);

  useEffect(() => {
    if (dealerMinutePlans) {
      const formattedPricingPlans = dealerMinutePlans.map((plan) => ({
        id: plan?.prices?.[0]?.id,
        name: plan?.name,
        price: plan?.prices?.[0]?.convert_amount?.toFixed(2) || 0,
        minutes: defaultPlans[plan?.name]?.minutes || 0,
        description: defaultPlans[plan?.name]?.description,
      }));
      setMinutePlans(formattedPricingPlans);
      setSelectedMinutePlan(formattedPricingPlans[0]);
    }
  }, [dealerMinutePlans]);

  return (
    <div className="py-2">
      {
        dealerDashboardOverviewLoading ? <DealerDashboardOverviewSkeleton /> : (
          <>
            {/* cards */}
            <div className="grid xl:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-3 mb-4">
              {/* left */}
              <div className="p-4 rounded-xl bg-[#E5DCFA] flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-400 mb-1">Remaining for</h3>
                  <h3 className="text-gray-500 text-2xl font-semibold">{dealerDashboardOverviewData?.subscription?.remain_days ? `${dealerDashboardOverviewData?.subscription?.remain_days} Days` : "NA"}</h3>
                </div>

                <div className="flex items-center gap-3">
                  <div className="border-r-2 border-white pr-3">
                    <h2 className="text-gray-400 text-xs text-right">Start Date</h2>
                    <h2 className="text-lg font-semibold">{dealerDashboardOverviewData?.subscription?.start_date ? formateDate(dealerDashboardOverviewData?.subscription?.start_date, "Do MMM, YYYY") : "NA"}</h2>
                  </div>

                  <div>
                    <h2 className="text-gray-400 text-xs">End Date</h2>
                    <h2 className="text-lg font-semibold">{dealerDashboardOverviewData?.subscription?.end_date ? formateDate(dealerDashboardOverviewData?.subscription?.end_date, "Do MMM, YYYY") : "NA"}</h2>
                  </div>
                </div>
              </div>

              {/* right */}
              <div className="p-4 rounded-xl bg-[#DDF2F6] flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-400 mb-1">AI Talk Remaining</h3>
                  <h3 className="text-gray-500 text-2xl font-semibold">{dealerDashboardOverviewData?.talk_time?.remaining ? `${dealerDashboardOverviewData?.talk_time?.remaining} m` : "NA"}</h3>
                </div>

                <div className="flex items-center gap-3">
                  <div className="border-r-2 border-white pr-3">
                    <h2 className="text-gray-400 text-xs text-right">Used</h2>
                    <h2 className="text-lg font-semibold">{dealerDashboardOverviewData?.talk_time?.used ?? "NA"}/{dealerDashboardOverviewData?.talk_time?.total ?? "NA"} {dealerDashboardOverviewData?.talk_time && "m"}</h2>
                  </div>

                  <div>
                    <button
                      className="flex justify-center items-center gap-2"
                      onClick={() => {
                        setModals((prev) => ({
                          ...prev,
                          addMoreMinute: true,
                        }));
                      }}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.5 0.75C6.5 0.335786 6.16421 0 5.75 0C5.33579 0 5 0.335786 5 0.75V5H0.75C0.335786 5 0 5.33579 0 5.75C0 6.16421 0.335786 6.5 0.75 6.5H5V10.75C5 11.1642 5.33579 11.5 5.75 11.5C6.16421 11.5 6.5 11.1642 6.5 10.75V6.5H10.75C11.1642 6.5 11.5 6.16421 11.5 5.75C11.5 5.33579 11.1642 5 10.75 5H6.5V0.75Z"
                          fill="#019935"
                        />
                      </svg>

                      <span className="text-sm text-primary-500">Add Minutes</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* audio & voice section */}
            {
              dealerDashboardOverviewData?.details ? (
                <div className="bg-[url('/images/no_subscription_plan.png')] bg-no-repeat bg-cover py-[53px] flex flex-col justify-center items-center rounded-xl">
                  <Image
                    src={"/icons/dashboard/premium.svg"}
                    alt="premium"
                    width={48}
                    height={48}
                    className="size-12"
                  />
                  <div className="text-[#2b3545] text-xl font-semibold mt-1">Select your perfect plan to unlock exclusive access!</div>
                </div>
              ) : <div className="gap-4 grid lg:grid-cols-2 mb-4">
                {/* left */}
                <div className="order-2 lg:order-1 border rounded-xl p-4">
                  <h2 className="font-bold text-xl text-gray">Number for AI Call</h2>
                  <p className="text-gray-300 mb-3">
                    All transactions are secure and encrypted
                  </p>

                  <hr className="mb-6" />

                  <div className="flex items-center justify-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="121"
                      height="37"
                      viewBox="0 0 121 37"
                      fill="none"
                      className="mb-6"
                    >
                      <path
                        d="M17.9597 13.8627C17.9597 15.9027 16.2797 17.5827 14.2397 17.5827C12.1997 17.5827 10.5197 15.9027 10.5197 13.8627C10.5197 11.8227 12.1997 10.1427 14.2397 10.1427C16.2797 10.1427 17.9597 11.8227 17.9597 13.8627ZM14.2397 19.0227C12.1997 19.0227 10.5197 20.7027 10.5197 22.7427C10.5197 24.7827 12.1997 26.4627 14.2397 26.4627C16.2797 26.4627 17.9597 24.7827 17.9597 22.7427C17.9597 20.7027 16.2797 19.0227 14.2397 19.0227ZM36.6797 18.3027C36.6797 28.2627 28.6397 36.3027 18.6797 36.3027C8.71969 36.3027 0.679688 28.2627 0.679688 18.3027C0.679688 8.34273 8.71969 0.302734 18.6797 0.302734C28.6397 0.302734 36.6797 8.34273 36.6797 18.3027ZM31.8797 18.3027C31.8797 10.9827 25.9997 5.10273 18.6797 5.10273C11.3597 5.10273 5.47969 10.9827 5.47969 18.3027C5.47969 25.6227 11.3597 31.5027 18.6797 31.5027C25.9997 31.5027 31.8797 25.6227 31.8797 18.3027ZM23.1197 19.0227C21.0797 19.0227 19.3997 20.7027 19.3997 22.7427C19.3997 24.7827 21.0797 26.4627 23.1197 26.4627C25.1597 26.4627 26.8397 24.7827 26.8397 22.7427C26.8397 20.7027 25.1597 19.0227 23.1197 19.0227ZM23.1197 10.1427C21.0797 10.1427 19.3997 11.8227 19.3997 13.8627C19.3997 15.9027 21.0797 17.5827 23.1197 17.5827C25.1597 17.5827 26.8397 15.9027 26.8397 13.8627C26.8397 11.8227 25.1597 10.1427 23.1197 10.1427ZM85.0397 7.38273C85.1597 7.38273 85.2797 7.50273 85.3997 7.62273V11.4627C85.3997 11.7027 85.1597 11.8227 85.0397 11.8227H78.6797C78.4397 11.8227 78.3197 11.5827 78.3197 11.4627V7.74273C78.3197 7.50273 78.5597 7.38273 78.6797 7.38273H85.0397ZM84.9197 12.7827H72.6797C72.5597 12.7827 72.3197 12.9027 72.3197 13.1427L70.7597 19.1427L70.6397 19.5027L68.7197 13.1427C68.7197 13.0227 68.4797 12.7827 68.3597 12.7827H63.5597C63.4397 12.7827 63.1997 12.9027 63.1997 13.1427L61.3997 19.1427L61.2797 19.5027L61.1597 19.1427L60.4397 16.1427L59.7197 13.1427C59.7197 13.0227 59.4797 12.7827 59.3597 12.7827H49.7597V7.62273C49.7597 7.50273 49.5197 7.26273 49.2797 7.38273L43.2797 9.30273C43.0397 9.30273 42.9197 9.42273 42.9197 9.66273V12.9027H41.3597C41.2397 12.9027 40.9997 13.0227 40.9997 13.2627V17.8227C40.9997 17.9427 41.1197 18.1827 41.3597 18.1827H42.9197V23.8227C42.9197 27.7827 45.0797 29.5827 49.0397 29.5827C50.7197 29.5827 52.2797 29.2227 53.3597 28.6227V23.8227C53.3597 23.5827 53.1197 23.4627 52.9997 23.5827C52.3997 23.8227 51.7997 23.9427 51.3197 23.9427C50.2397 23.9427 49.6397 23.4627 49.6397 22.2627V18.1827H53.1197C53.2397 18.1827 53.4797 18.0627 53.4797 17.8227V13.9827L58.0397 29.1027C58.0397 29.2227 58.2797 29.4627 58.3997 29.4627H63.4397C63.5597 29.4627 63.7997 29.3427 63.7997 29.1027L65.9597 22.3827L67.0397 25.8627L67.9997 29.1027C67.9997 29.2227 68.2397 29.4627 68.3597 29.4627H73.3997C73.5197 29.4627 73.7597 29.3427 73.7597 29.1027L78.3197 13.9827V29.1027C78.3197 29.2227 78.4397 29.4627 78.6797 29.4627H84.7997C84.9197 29.4627 85.1597 29.3427 85.1597 29.1027V13.1427C85.1597 13.0227 85.0397 12.7827 84.9197 12.7827ZM92.9597 7.38273H86.8397C86.7197 7.38273 86.4797 7.50273 86.4797 7.74273V28.9827C86.4797 29.1027 86.5997 29.3427 86.8397 29.3427H92.9597C93.0797 29.3427 93.3197 29.2227 93.3197 28.9827V7.62273C93.3197 7.50273 93.1997 7.38273 92.9597 7.38273ZM101.12 7.38273H94.7597C94.6397 7.38273 94.3997 7.50273 94.3997 7.74273V11.4627C94.3997 11.5827 94.5197 11.8227 94.7597 11.8227H101.12C101.24 11.8227 101.48 11.7027 101.48 11.4627V7.62273C101.48 7.50273 101.36 7.38273 101.12 7.38273ZM101 12.7827H94.8797C94.7597 12.7827 94.5197 12.9027 94.5197 13.1427V28.8627C94.5197 28.9827 94.6397 29.2227 94.8797 29.2227H101C101.12 29.2227 101.36 29.1027 101.36 28.8627V13.1427C101.36 13.0227 101.24 12.7827 101 12.7827ZM120.32 20.9427C120.32 25.5027 116.48 29.4627 111.08 29.4627C105.8 29.4627 101.96 25.5027 101.96 20.9427C101.96 16.3827 105.8 12.4227 111.2 12.4227C116.48 12.4227 120.32 16.3827 120.32 20.9427ZM113.84 21.0627C113.84 19.3827 112.64 18.0627 111.2 18.1827C109.64 18.1827 108.56 19.5027 108.56 21.0627C108.56 22.6227 109.76 23.9427 111.2 23.9427C112.76 23.9427 113.84 22.6227 113.84 21.0627Z"
                        fill="#F22F46"
                      />
                    </svg>
                  </div>

                  <h2 className="text-center text-lg font-semibold text-gray-500">
                    {dealerDashboardOverviewData?.phone_number || "You don't have a Twilio number yet!"}
                  </h2>

                  {
                    dealerDashboardOverviewData?.phone_number && (
                      <h3 className="text-center text-sm text-gray-300 mb-6">
                        This is your Twilio number!
                      </h3>
                    )
                  }
                </div>

                {/* right */}
                <div className="order-1 lg:order-2 border rounded-xl p-4">
                  <h2 className="font-bold text-xl text-gray">Set Voice for AI Call</h2>
                  <p className="mb-6 text-gray-500 text-sm">
                    The AI voice call will be tailored to your preferences.
                  </p>

                  <Select
                    defaultValue={"alloy"}
                    value={voice}
                    onValueChange={handleChangeDealerAssistanceVoice}
                  >
                    <SelectTrigger
                      className="w-full"
                      postIcon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="21"
                          viewBox="0 0 20 21"
                          fill="none"
                        >
                          <path
                            d="M15.8527 8.14582C16.0484 8.34073 16.0489 8.65731 15.854 8.85292L10.389 14.3374C10.1741 14.5531 9.82477 14.5531 9.60982 14.3374L4.14484 8.85292C3.94993 8.65731 3.95049 8.34073 4.1461 8.14582C4.34171 7.9509 4.65829 7.95147 4.85321 8.14708L9.99942 13.3117L15.1456 8.14708C15.3406 7.95147 15.6571 7.9509 15.8527 8.14582Z"
                            fill="#5D6679"
                          />
                        </svg>
                      }
                    >
                      <SelectValue placeholder="Select a voice" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="alloy">Alloy</SelectItem>
                        <SelectItem value="echo">Echo</SelectItem>
                        <SelectItem value="shimmer">Shimmer</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  {/* audio player */}
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <WavesurferPlayer
                        url={`/sounds/${voice}.wav`}
                        onReady={onReady}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        cursorWidth={0}
                        //

                        height={100}
                        //   width={383}
                        //   splitChannels={false}
                        normalize={false}
                        waveColor="#b9cbbf"
                        progressColor="#019935"
                        cursorColor="#ddd5e9"
                        barWidth={5}
                        barGap={10}
                        barRadius={5}
                        barHeight={1.5}
                        minPxPerSec={1}
                        fillParent={true}
                        autoplay={false}
                        interact={true}
                        dragToSeek={false}
                        hideScrollbar={false}
                        audioRate={1}
                        autoScroll={true}
                        autoCenter={true}
                        sampleRate={8000}
                      />
                    </div>
                    <button
                      onClick={onPlayPause}
                      className="bg-primary-400 text-[#202223] rounded-full h-12 w-12 flex items-center justify-center"
                    >
                      {isPlaying ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-7 h-7"
                          viewBox="0 0 24 24"
                          fill="#fff"
                          stroke="#fff"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="14" y="4" width="4" height="16" rx="1" />
                          <rect x="6" y="4" width="4" height="16" rx="1" />
                        </svg>
                      ) : (
                        <svg
                          //   width="24"
                          //   height="24"
                          className="w-7 h-7"
                          viewBox="0 0 24 24"
                          fill="#fff"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5 19.1684V4.83171C5 4.04055 5.87525 3.56271 6.54076 3.99054L17.6915 11.1589C18.3038 11.5525 18.3038 12.4476 17.6915 12.8412L6.54076 20.0096C5.87525 20.4374 5 19.9595 5 19.1684Z"
                            stroke="#fff"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      )}
                    </button>
                  </div>

                  <p className="text-sm text-[#202223]">
                    Tap the play button to hear an exciting demo of the voice in action!
                  </p>
                </div>
              </div>
            }
          </>
        )
      }

      {/* statistics section */}
      <StatisticsSection />

      {/* modals */}
      <Dialog
        open={modals.addMoreMinute}
        onOpenChange={() => {
          setModals((prev) => ({
            ...prev,
            addMoreMinute: !prev.addMoreMinute,
          }));
        }}
      >
        <DialogContent className="sm:max-w-[1000px] max-h-full overflow-auto">
          <DialogHeader>
            <DialogTitle className="mb-9">
              <p className="text-gray-900 text-2xl font-bold text-center">
                Add More Minute
              </p>

              <p className="text-sm text-gray-400 text-center font-normal">
                Purchase additional minutes for your system to enhance its
                capabilities and ensure seamless operation.
              </p>
            </DialogTitle>
          </DialogHeader>

          {
            dealerMinutePlansLoading ? <DealerMinutePlanSkeleton /> : (
              <div className="grid lg:grid-cols-3 gap-4">
                {minutePlans.map((plan, index) => {
                  return (
                    <div
                      key={index}
                      className={classNames(
                        `border rounded-xl p-4 cursor-pointer`,
                        { "border-primary-500": selectedMinutePlan?.id === plan?.id }
                      )}
                      onClick={() => setSelectedMinutePlan(plan)}
                    >
                      {/* top */}
                      <div className="flex justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <svg
                            width="20"
                            height="18"
                            viewBox="0 0 20 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16 0C16.3367 0 16.6477 0.169088 16.8316 0.444602L16.8944 0.552786L19.8944 6.55279C20.0579 6.87968 20.0287 7.26588 19.827 7.5623L19.7433 7.66896L10.7699 17.6418C10.5903 17.861 10.3336 17.9796 10.0707 17.9976C10.0081 18.0019 9.94555 18.0005 9.88352 17.9932L9.77108 17.9743C9.56976 17.9284 9.38105 17.821 9.23871 17.6521L0.256722 7.66896C0.0122342 7.39731 -0.0623057 7.01725 0.0532894 6.67786L0.105589 6.55279L3.10559 0.552786C3.25616 0.251645 3.54648 0.0490966 3.87516 0.00780368L4.00002 0H16ZM12.576 8H7.423L10 14.342L12.576 8ZM16.753 8H14.735L13.074 12.088L16.753 8ZM5.264 8H3.246L6.924 12.087L5.264 8ZM6.622 2H4.61802L2.618 6H5.322L6.622 2ZM11.273 2H8.726L7.427 6H12.572L11.273 2ZM15.381 2H13.377L14.677 6H17.381L15.381 2Z"
                              fill="#FAAE22"
                            />
                          </svg>
                          <span>{plan?.name}</span>
                        </div>

                        <div>
                          <Checkbox id="terms" checked={Boolean(selectedMinutePlan?.id === plan?.id)} />
                        </div>
                      </div>

                      <div className="mb-4">
                        <span className="text-2xl font-bold text-primary-500">
                          ${plan?.price}
                        </span>{" "}
                        <span className="text-sm text-gray-500">
                          / {plan?.minutes} Mins
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.70112 0.0219504C4.76863 0.0449158 4.83458 0.0722335 4.89856 0.103732L5.6682 0.482659C5.87708 0.585501 6.12188 0.585501 6.33077 0.482659L7.10041 0.103732C7.91796 -0.298785 8.90702 0.0376683 9.30954 0.855221L9.35363 0.952615L9.39132 1.05266L9.66759 1.86482C9.74258 2.08524 9.91568 2.25834 10.1361 2.33332L10.9483 2.6096C11.811 2.90307 12.2724 3.84036 11.979 4.70307C11.956 4.77059 11.9287 4.83654 11.8972 4.90051L11.5183 5.67015C11.4154 5.87904 11.4154 6.12384 11.5183 6.33272L11.8972 7.10236C12.2997 7.91991 11.9633 8.90897 11.1457 9.31149C11.0817 9.34299 11.0158 9.37031 10.9483 9.39327L10.1361 9.66955C9.91568 9.74453 9.74258 9.91763 9.66759 10.1381L9.39132 10.9502C9.09784 11.8129 8.16056 12.2744 7.29784 11.9809C7.23033 11.958 7.16438 11.9306 7.10041 11.8991L6.33077 11.5202C6.12188 11.4174 5.87708 11.4174 5.6682 11.5202L4.89856 11.8991C4.08101 12.3017 3.09194 11.9652 2.68943 11.1477C2.65793 11.0837 2.63061 11.0177 2.60765 10.9502L2.33137 10.1381C2.25639 9.91763 2.08329 9.74453 1.86287 9.66955L1.05071 9.39327C0.187987 9.0998 -0.273478 8.16252 0.0199973 7.2998C0.0429627 7.23229 0.0702804 7.16633 0.101779 7.10236L0.480706 6.33272C0.583548 6.12384 0.583548 5.87904 0.480706 5.67015L0.101779 4.90051C-0.300738 4.08296 0.0357151 3.0939 0.853268 2.69138C0.917244 2.65988 0.983196 2.63257 1.05071 2.6096L1.86287 2.33332C2.08329 2.25834 2.25639 2.08524 2.33137 1.86482L2.60765 1.05266C2.90112 0.18994 3.8384 -0.271524 4.70112 0.0219504ZM8.08128 4.18324L4.82972 7.4348L3.64518 6.01335C3.48608 5.82243 3.20232 5.79663 3.0114 5.95574C2.82048 6.11484 2.79468 6.39859 2.95378 6.58952L4.45378 8.38952C4.62319 8.5928 4.93057 8.60674 5.11768 8.41963L8.71768 4.81963C8.89342 4.6439 8.89342 4.35897 8.71768 4.18324C8.54195 4.0075 8.25702 4.0075 8.08128 4.18324Z"
                            fill="#019935"
                          />
                        </svg>

                        <p className="text-sm text-gray-400 ">
                          {plan?.description}
                        </p>
                      </div>

                      {
                        dealerCurrentSubscriptionLoading ? <Skeleton className="h-5 w-24" /> :
                          <div className="text-sm text-gray-400">
                            Your Current Plan{" "}
                            <span className="text-green-500 underline">{dealerCurrentSubscription?.subscription?.product?.name}</span>
                          </div>

                      }
                    </div>
                  );
                })}
              </div>
            )
          }

          {/* footer */}
          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="primary"
              onClick={handleBuyMinutes}
              loading={createMinuteSubscriptionLoading}
              disabled={dealerMinutePlansLoading}
              className="min-w-[117px]"
            >
              Buy Minutes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={modals.billingSummery}
        onOpenChange={() => {
          setModals((prev) => ({
            ...prev,
            billingSummery: !prev.billingSummery,
          }));
        }}
      >
        <DialogContent className="sm:max-w-[1000px] max-h-full overflow-auto">
          <DialogHeader>
            <DialogTitle className="mb-9">
              <p className="text-gray-900 text-2xl font-bold text-center">
                Pay for your Minute Pack
              </p>

              <p className="text-sm text-gray-400 text-center font-normal">
                Purchase additional minutes for your system to enhance its
                capabilities and ensure seamless operation.
              </p>
            </DialogTitle>
          </DialogHeader>

          <div className="grid lg:grid-cols-2 gap-4 ">
            {/* left */}
            <div className="border rounded-xl p-6 flex flex-col gap-4 ">
              {creditCards.map((creditCard, index) => {
                return (
                  <div
                    key={index}
                    className="border rounded-xl p-4 flex justify-between items-center cursor-pointer"
                    onClick={() => {
                      setCreditCards((prev) =>
                        prev.map((cc) =>
                          cc.name === creditCard.name
                            ? { ...cc, selected: !cc.selected }
                            : { ...cc, selected: false }
                        )
                      );
                    }}
                  >
                    <div className="flex items-center gap-3">
                      {/* check */}
                      <div>
                        {creditCard.selected ? (
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z"
                              fill="#019935"
                            />
                            <path
                              d="M6 10C6 7.79086 7.79086 6 10 6C12.2091 6 14 7.79086 14 10C14 12.2091 12.2091 14 10 14C7.79086 14 6 12.2091 6 10Z"
                              fill="white"
                            />
                          </svg>
                        ) : (
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10 0.5C15.2467 0.5 19.5 4.7533 19.5 10C19.5 15.2467 15.2467 19.5 10 19.5C4.7533 19.5 0.5 15.2467 0.5 10C0.5 4.7533 4.7533 0.5 10 0.5Z"
                              stroke="#D5D7DA"
                            />
                          </svg>
                        )}
                      </div>

                      <div className="flex">
                        <div className="bg-gray-50 rounded-lg p-2 flex items-center gap-2">
                          <Image
                            src={`https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg`}
                            alt="Credit Card"
                            width={40}
                            height={30}
                          />
                        </div>
                      </div>

                      <div>
                        <p className="text-gray-900 font-semibold">
                          {creditCard.name}
                        </p>
                        <p className="text-gray-300 text-sm">
                          Expires Apr 2028
                        </p>
                      </div>
                    </div>

                    <div className="flex">
                      {/* edit */}
                      <svg
                        width="38"
                        height="38"
                        viewBox="0 0 38 38"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.667 26.3343H15.3337L24.9587 16.7093C25.9712 15.6967 25.9712 14.0551 24.9587 13.0426C23.9461 12.0301 22.3045 12.0301 21.292 13.0426L11.667 22.6676V26.3343"
                          stroke="#A8AAAE"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M20.375 13.959L24.0417 17.6257"
                          stroke="#A8AAAE"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      {/* delete */}
                      <svg
                        width="38"
                        height="38"
                        viewBox="0 0 38 38"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.667 14.4173H26.3337"
                          stroke="#A8AAAE"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M17.1663 18.084V23.584"
                          stroke="#A8AAAE"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M20.8333 18.084V23.584"
                          stroke="#A8AAAE"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12.583 14.416L13.4997 25.416C13.4997 26.4285 14.3205 27.2493 15.333 27.2493H22.6663C23.6789 27.2493 24.4997 26.4285 24.4997 25.416L25.4163 14.416"
                          stroke="#A8AAAE"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16.25 14.4167V11.6667C16.25 11.1604 16.6604 10.75 17.1667 10.75H20.8333C21.3396 10.75 21.75 11.1604 21.75 11.6667V14.4167"
                          stroke="#A8AAAE"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* right */}
            <div className="">
              <div
                className={classNames(
                  `border rounded-xl p-4 cursor-pointer mb-6`,
                  {
                    "border-primary-500": true,
                  }
                )}
              >
                {/* top */}
                <div className="flex justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <svg
                      width="20"
                      height="18"
                      viewBox="0 0 20 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16 0C16.3367 0 16.6477 0.169088 16.8316 0.444602L16.8944 0.552786L19.8944 6.55279C20.0579 6.87968 20.0287 7.26588 19.827 7.5623L19.7433 7.66896L10.7699 17.6418C10.5903 17.861 10.3336 17.9796 10.0707 17.9976C10.0081 18.0019 9.94555 18.0005 9.88352 17.9932L9.77108 17.9743C9.56976 17.9284 9.38105 17.821 9.23871 17.6521L0.256722 7.66896C0.0122342 7.39731 -0.0623057 7.01725 0.0532894 6.67786L0.105589 6.55279L3.10559 0.552786C3.25616 0.251645 3.54648 0.0490966 3.87516 0.00780368L4.00002 0H16ZM12.576 8H7.423L10 14.342L12.576 8ZM16.753 8H14.735L13.074 12.088L16.753 8ZM5.264 8H3.246L6.924 12.087L5.264 8ZM6.622 2H4.61802L2.618 6H5.322L6.622 2ZM11.273 2H8.726L7.427 6H12.572L11.273 2ZM15.381 2H13.377L14.677 6H17.381L15.381 2Z"
                        fill="#FAAE22"
                      />
                    </svg>
                    <span>Quick Boost</span>
                  </div>

                  <div>
                    <Checkbox id="terms" checked={true} />
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-2xl font-bold text-primary-500">
                    $30
                  </span>{" "}
                  <span className="text-sm text-gray-500">/150</span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.70112 0.0219504C4.76863 0.0449158 4.83458 0.0722335 4.89856 0.103732L5.6682 0.482659C5.87708 0.585501 6.12188 0.585501 6.33077 0.482659L7.10041 0.103732C7.91796 -0.298785 8.90702 0.0376683 9.30954 0.855221L9.35363 0.952615L9.39132 1.05266L9.66759 1.86482C9.74258 2.08524 9.91568 2.25834 10.1361 2.33332L10.9483 2.6096C11.811 2.90307 12.2724 3.84036 11.979 4.70307C11.956 4.77059 11.9287 4.83654 11.8972 4.90051L11.5183 5.67015C11.4154 5.87904 11.4154 6.12384 11.5183 6.33272L11.8972 7.10236C12.2997 7.91991 11.9633 8.90897 11.1457 9.31149C11.0817 9.34299 11.0158 9.37031 10.9483 9.39327L10.1361 9.66955C9.91568 9.74453 9.74258 9.91763 9.66759 10.1381L9.39132 10.9502C9.09784 11.8129 8.16056 12.2744 7.29784 11.9809C7.23033 11.958 7.16438 11.9306 7.10041 11.8991L6.33077 11.5202C6.12188 11.4174 5.87708 11.4174 5.6682 11.5202L4.89856 11.8991C4.08101 12.3017 3.09194 11.9652 2.68943 11.1477C2.65793 11.0837 2.63061 11.0177 2.60765 10.9502L2.33137 10.1381C2.25639 9.91763 2.08329 9.74453 1.86287 9.66955L1.05071 9.39327C0.187987 9.0998 -0.273478 8.16252 0.0199973 7.2998C0.0429627 7.23229 0.0702804 7.16633 0.101779 7.10236L0.480706 6.33272C0.583548 6.12384 0.583548 5.87904 0.480706 5.67015L0.101779 4.90051C-0.300738 4.08296 0.0357151 3.0939 0.853268 2.69138C0.917244 2.65988 0.983196 2.63257 1.05071 2.6096L1.86287 2.33332C2.08329 2.25834 2.25639 2.08524 2.33137 1.86482L2.60765 1.05266C2.90112 0.18994 3.8384 -0.271524 4.70112 0.0219504ZM8.08128 4.18324L4.82972 7.4348L3.64518 6.01335C3.48608 5.82243 3.20232 5.79663 3.0114 5.95574C2.82048 6.11484 2.79468 6.39859 2.95378 6.58952L4.45378 8.38952C4.62319 8.5928 4.93057 8.60674 5.11768 8.41963L8.71768 4.81963C8.89342 4.6439 8.89342 4.35897 8.71768 4.18324C8.54195 4.0075 8.25702 4.0075 8.08128 4.18324Z"
                      fill="#019935"
                    />
                  </svg>

                  <p className="text-sm text-gray-400 ">
                    For occasional overage
                  </p>
                </div>

                <div className="text-sm text-gray-400">
                  Your Current Plan{" "}
                  <span className="text-green-500 underline">Basic</span>
                </div>
              </div>

              {/* billing summery */}
              <div className="border rounded-xl p-6">
                <h2 className="font-bold text-2xl ">Billing Summery</h2>

                <hr className="my-6" />

                <div className="mb-2 flex justify-between">
                  <p className="text-gray-300">Price</p>
                  <p className="text-gray-300">$30.00</p>
                </div>

                <div className="mb-2 flex justify-between">
                  <p className="text-gray-300">Taxes</p>
                  <p className="text-gray-300">$0.00</p>
                </div>

                <hr className="my-6" />

                <div className="mb-6 flex justify-between font-semibold">
                  <p className="text-gray-300">Total</p>
                  <p className="text-gray-300">$30.00</p>
                </div>

                <Button
                  variant="primary"
                  className="rounded-lg w-full h-11 mb-6"
                  onClick={() => {
                    setModals((prev) => ({
                      ...prev,
                      billingSummery: false,
                      paymentSuccess: false,
                    }));
                  }}
                >
                  Pay & Continue
                </Button>

                <div className="flex gap-2">
                  <Checkbox id="terms" checked={true} />
                  <label
                    htmlFor="terms"
                    className="text-sm text-gray-400 cursor-pointer"
                  >
                    I agree to the{" "}
                    <span className="text-primary-500 underline">
                      Terms of Service
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboardOverview;
