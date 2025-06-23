"use client";

import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import { useGetDealerProfileQuery } from "@/features/dealer/dealerProfileSlice";

const ProfileHeader = () => {
  const { data } = useGetDealerProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const dealerProfileData = data?.data;

  return (
    <div className="relative border rounded-2xl min-h-[252px] md:h-[252px]">
      <div className="w-full bg-[#2b3545] overflow-hidden rounded-t-2xl h-[100px]">
        <Image
          src={"/images/dashboard/profile/cover-img.png"}
          alt="BMW Car House Cover"
          width={1000}
          height={300}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute bottom-2.5 left-4 md:bottom-9 md:left-9 right-4 md:right-auto">
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="rounded-lg overflow-hidden border-2 border-white bg-white shadow w-[120px] h-[120px] md:w-[160px] md:h-[160px] mx-auto md:mx-0">
            <Image
              src={
                dealerProfileData?.profile_picture ||
                "https://dummyimage.com/160x160/000/fff"
              }
              alt="BMW Logo"
              width={160}
              height={160}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-xl md:text-2xl font-semibold text-[#2b3545]">
              {dealerProfileData?.dealer_details?.business_name || "N/A"}
            </h1>
            <div className="mt-2 space-y-1">
              <div className="flex items-center text-[#555d6a] justify-center md:justify-start">
                <Mail className="w-4 h-4 text-[#018b30] mr-2" />
                <span className="text-sm md:text-base">
                  {dealerProfileData?.dealer_details?.business_email || "N/A"}
                </span>
              </div>
              <div className="flex items-center text-[#555d6a] justify-center md:justify-start">
                <MapPin className="w-4 h-4 text-[#018b30] mr-2" />
                <span className="text-sm md:text-base">
                  {dealerProfileData?.city || "Your Business City"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
