"use client";

import { useState } from "react";
import WavesurferPlayer from "@wavesurfer/react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  // SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";

import { Skeleton } from "@/components/shadcn/skeleton";
// import AdminDashboardOverviewCard from "./AdminDashboardOverviewCard";
import { useGetAdminDashboardOverviewQuery } from "@/features/admin/adminDashboardSlice";
import { Button } from "@/components/shadcn/button";

// const adminDashboardOverviewCardData = [
//   {
//     label: "New Dealers",
//     value: "dealer",
//     bgColor: "#e5d9ff",
//   },
//   {
//     label: "Payment",
//     value: "payment",
//     bgColor: "#ddf2f6",
//   },
//   // {
//   //     label: "Visitors",
//   //     value: "visitor",
//   //     bgColor: "#f0f4a9"
//   // },
//   // {
//   //     label: "AI Talk/Chat",
//   //     value: "call_history",
//   //     bgColor: "#e3e8ef"
//   // },
// ];

const AdminDashboardOverview = () => {
  const [wavesurfer, setWavesurfer] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const onReady = (ws: any) => {
    setWavesurfer(ws);
    setIsPlaying(false);
  };

  const onPlayPause = () => {
    if (wavesurfer) wavesurfer.playPause();
  };

  const {
    // data: adminDashboardOverviewData,
    isFetching: adminDashboardFetching,
  } = useGetAdminDashboardOverviewQuery({
    // ...(isDifferentDate
    //   ? { created_at_before: endDate, created_at_after: startDate }
    //   : {}),
  });

  if (adminDashboardFetching) {
    return (
      <>
        <div className="grid xl:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-3 mb-3">
          <Skeleton className="h-[112px]" />
          <Skeleton className="h-[112px]" />
        </div>

        <div className="flex flex-col gap-5 mt-12">
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
        </div>
      </>
    );
  }

  return (
    <div className="py-2">
      {/* cards section */}
      <div className="grid xl:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-3 mb-4">
        {/* left */}
        <div className="p-4 rounded-xl bg-[#E5DCFA] flex justify-between">
          <div>
            <h3 className="text-sm text-gray-400 mb-1">Remaining for</h3>
            <h3 className="text-gray-500 text-2xl font-semibold">25 Days</h3>
          </div>

          <div>h</div>
        </div>

        {/* right */}
        <div className="p-4 rounded-xl bg-[#DDF2F6] flex justify-between">
          <div>
            <h3 className="text-sm text-gray-400 mb-1">Remaining for</h3>
            <h3 className="text-gray-500 text-2xl font-semibold">25 Days</h3>
          </div>

          <div>h</div>
        </div>
      </div>

      {/* twillio & voice selection section */}
      <div className="gap-4 grid grid-cols-2 mb-4">
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
            For Start chat you have to set a Twilio number!
          </h2>

          <h3 className="text-center text-sm text-gray-300 mb-6">
            You have not add Twilio number yet!
          </h3>

          <div className="flex items-center justify-center">
            <Button
              variant="outline"
              className="text-primary-600 border-primary-100 h-11 rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
              >
                <path
                  d="M10.3834 1.30946L10.5 1.30273C11.0128 1.30273 11.4355 1.68877 11.4933 2.18611L11.5 2.30273V9.30273H18.5C19.0128 9.30273 19.4355 9.68877 19.4933 10.1861L19.5 10.3027C19.5 10.8156 19.114 11.2382 18.6166 11.296L18.5 11.3027H11.5V18.3027C11.5 18.8156 11.114 19.2382 10.6166 19.296L10.5 19.3027C9.98716 19.3027 9.56449 18.9167 9.50673 18.4194L9.5 18.3027V11.3027H2.5C1.98716 11.3027 1.56449 10.9167 1.50673 10.4194L1.5 10.3027C1.5 9.7899 1.88604 9.36723 2.38338 9.30946L2.5 9.30273H9.5V2.30273C9.5 1.7899 9.88604 1.36723 10.3834 1.30946L10.5 1.30273L10.3834 1.30946Z"
                  fill="#019935"
                />
              </svg>
              Add Twilio Number
            </Button>
          </div>
        </div>

        {/* right */}
        <div className="order-1 lg:order-2 border rounded-xl p-4">
          <h2 className="font-bold text-xl text-gray">Set Voice for AI Call</h2>
          <p className="mb-6 text-gray-500 text-sm">
            The AI voice call will be tailored to your preferences.
          </p>

          <Select>
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
            <SelectContent defaultValue="clara">
              <SelectGroup>
                {/* <SelectItem value="apple">Apple</SelectItem> */}
                <SelectItem value="clara">Clara (Default)</SelectItem>

                <SelectItem value="mike">Mike</SelectItem>
                <SelectItem value="jane">Jane</SelectItem>
                <SelectItem value="john">John</SelectItem>
                <SelectItem value="sophia">Sophia</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* audio player */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <WavesurferPlayer
                url="/sounds/sample-audio.mp3"
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

      {/* statistics section */}
      <div className="border rounded-xl p-6">hey</div>
    </div>
  );
};

export default AdminDashboardOverview;
