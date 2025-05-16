'use client';
import { useGetDealerProfileQuery } from '@/features/dealer/dealerProfileSlice';
import { Mail, MapPin } from 'lucide-react';
import Image from 'next/image';

const ProfileHeader = () => {
  const { data } = useGetDealerProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const dealerProfileData = data?.data;
  return (
    <div className="relative  border rounded-2xl h-[252px] ">
      <div className=" w-full bg-[#2b3545] overflow-hidden rounded-t-2xl h-[100px]">
        <Image
          src={'/images/dashboard/profile/cover-img.png'}
          alt="BMW Car House Cover"
          width={1000}
          height={300}
          className="w-full object-cover"
        />
      </div>
      <div className="absolute bottom-9 left-9">
        <div className=" flex items-end gap-4 flex-row ">
          <div className="rounded-lg overflow-hidden border-2 border-white shadow-sm w-[160px] h-[160px]">
            <Image
              src={
                dealerProfileData?.profile_picture ||
                'https://dummyimage.com/160x160/000/fff'
              }
              alt="BMW Logo"
              width={160}
              height={160}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="">
            <h1 className="text-2xl font-semibold text-[#2b3545]">
              {dealerProfileData?.name || 'Your Business Name'}
            </h1>
            <div className="mt-2 space-y-1">
              <div className="flex items-center text-[#555d6a]">
                <Mail className="w-4 h-4 text-[#018b30] mr-2" />
                <span>{dealerProfileData?.email || 'Your Business Email'}</span>
              </div>
              <div className="flex items-center text-[#555d6a]">
                <MapPin className="w-4 h-4 text-[#018b30] mr-2" />
                <span>{dealerProfileData?.city || 'Your Business City'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
