"use client";

import { useRef, useState } from "react";
import WavesurferPlayer, { useWavesurfer } from "@wavesurfer/react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";

import { Skeleton } from "@/components/shadcn/skeleton";
import AdminDashboardOverviewCard from "./AdminDashboardOverviewCard";
import { useGetAdminDashboardOverviewQuery } from "@/features/admin/adminDashboardSlice";

const adminDashboardOverviewCardData = [
  {
    label: "New Dealers",
    value: "dealer",
    bgColor: "#e5d9ff",
  },
  {
    label: "Payment",
    value: "payment",
    bgColor: "#ddf2f6",
  },
  // {
  //     label: "Visitors",
  //     value: "visitor",
  //     bgColor: "#f0f4a9"
  // },
  // {
  //     label: "AI Talk/Chat",
  //     value: "call_history",
  //     bgColor: "#e3e8ef"
  // },
];

const AdminDashboardOverview = () => {
  const [wavesurfer, setWavesurfer] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const onReady = (ws: any) => {
    setWavesurfer(ws);
    setIsPlaying(false);
  };

  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause();
  };

  const {
    data: adminDashboardOverviewData,
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
      <div className="grid xl:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-3 mb-3">
        {adminDashboardOverviewCardData?.map((item, index) => (
          <AdminDashboardOverviewCard
            key={index}
            bgColor={item?.bgColor}
            growth={adminDashboardOverviewData?.[item?.value]?.growth}
            lastMonthTotal={
              adminDashboardOverviewData?.[item?.value]?.last_month_total
            }
            title={item?.label}
          />
        ))}
      </div>

      <div className="border rounded-xl p-6 gap-11 flex">
        {/* left */}
        <div className="w-[60%]">
          <h2 className="font-bold text-xl text-gray">Alloy</h2>

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
                //   cursorWidth={0}
                barWidth={5}
                barGap={10}
                barRadius={5}
                barHeight={1.5}
                //   barAlign=""
                minPxPerSec={1}
                fillParent={true}
                //   url="/wavesurfer-code/examples/audio/audio.wav"
                //   mediaControls={true}
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
              className="bg-primary-400 text-[#202223] px-4 py-2 rounded-full h-12 w-12 flex items-center justify-center"
            >
              {isPlaying ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  //   width="48"
                  //   height="48"
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
                  xmlns="http://www.w3.org/2000/svg"
                  //   width="48"
                  //   height="48"
                  className="h-12 w-12"
                  viewBox="0 0 24 24"
                  fill="#fff"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="6 3 20 12 6 21 6 3" />
                </svg>
              )}
            </button>
          </div>

          <p className="text-sm text-[#202223]">
            Tap the play button to hear an exciting demo of the voice in action!
          </p>
        </div>

        {/* right */}
        <div className="w-[40%]">
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
            <SelectContent>
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
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardOverview;
