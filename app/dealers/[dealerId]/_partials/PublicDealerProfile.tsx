"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/shadcn/dropdown-menu'
import { languages } from '@/static/dashboard'
import Image from 'next/image'
import React from 'react'
import PublciProfileHeader from './PublciProfileHeader'
import ShortBioSection from '@/app/dashboard/overview/_partials/dealer/short-bio-section'
import ServicesOfferedSection from '@/app/dashboard/overview/_partials/dealer/services-offered-section'
import ContactInformationCard from '@/app/dashboard/overview/_partials/dealer/contact-information-card'
import { useGetDealerPublicProfileQuery } from '@/features/dealer/dealerSlice'
import { useParams } from 'next/navigation'
import DealerProfileOverviewSkeleton from '@/components/partials/dashboard/skeleton/dealer-profile-overview-skeleton'
import PublicProfileServiceOfferSection from './PublicProfileServiceOfferSection';

const PublicDealerProfile = () => {
    /*--Next Hooks--*/
    const { dealerId } = useParams();

    /*--RTK Query--*/
    const { data: dealerProfile, isLoading } = useGetDealerPublicProfileQuery(Number(dealerId));

    if (isLoading) return (
        <div className='p-6'>
            <DealerProfileOverviewSkeleton />
        </div>
    );

    return (
        <div className='p-6'>
            <div className='px-6 py-4 md:py-8 bg-white rounded-2xl shadow-[0px_0px_8px_0px_rgba(0,0,0,0.08)] border-b border-[#eaebed] flex flex-row items-center justify-between'>
                <Image
                    src="/icons/homepage/footer-brand.svg"
                    alt="Logo"
                    width={140}
                    height={32}
                    className='w-[100px] md:w-[140px]'
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="cursor-pointer md:px-3 md:py-2 rounded-lg border relative flex gap-3 justify-center items-center h-[42px]">
                            {/* image  */}
                            <div className="rounded-full h-5 w-5 overflow-hidden">
                                <Image
                                    src="/flags/us.png"
                                    alt="flag"
                                    width={24}
                                    height={24}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            <span className="text-gray-300 text-lg">Eng (US)</span>

                            {/* arrow  */}
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M11.9978 14.5002L11.997 14.5002C11.9312 14.5006 11.866 14.488 11.8051 14.4631C11.7444 14.4383 11.6892 14.4018 11.6426 14.3558C11.6424 14.3556 11.6422 14.3554 11.6421 14.3552L7.64349 10.3566C7.54896 10.2621 7.49585 10.1339 7.49585 10.0002C7.49585 9.86649 7.54896 9.73827 7.64349 9.64374C7.73803 9.5492 7.86625 9.49609 7.99994 9.49609C8.13353 9.49609 8.26166 9.54912 8.35617 9.64352C8.35624 9.64359 8.35632 9.64367 8.35639 9.64374L11.6459 12.9432L11.9994 13.2978L12.3535 12.9437L15.6275 9.66974C15.7213 9.5945 15.8392 9.55545 15.9597 9.5601C16.0855 9.56496 16.2049 9.61713 16.294 9.70618C16.383 9.79522 16.4352 9.91459 16.44 10.0404C16.4447 10.1609 16.4056 10.2789 16.3304 10.3726L12.3478 14.3552C12.3476 14.3554 12.3474 14.3556 12.3472 14.3558C12.2542 14.4478 12.1287 14.4996 11.9978 14.5002Z"
                                    fill="#A3A3A3"
                                    stroke="#A3A3A3"
                                />
                            </svg>
                        </div>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        className="w-[200px] p-2 rounded-xl mt-1"
                        align="end"
                    >
                        {/* content */}
                        <div className="">
                            {languages.map((language, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 mb-2 last:mb-0 p-2 cursor-pointer hover:bg-gray-50 rounded-lg"
                                >
                                    <div className="rounded-full h-5 w-5 overflow-hidden">
                                        {/* image  */}
                                        <Image
                                            src={language.flag}
                                            alt="flag"
                                            width={24}
                                            height={24}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <span className="text-gray-500">{language.name}</span>
                                </div>
                            ))}
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className='mt-6'>
                <PublciProfileHeader />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    {/* left side */}
                    <div className="md:col-span-2 space-y-6">
                        <ShortBioSection bio={dealerProfile?.about || ""} />
                        <PublicProfileServiceOfferSection />
                    </div>
                    {/* right side */}
                    <div className="space-y-6">
                        <ContactInformationCard data={dealerProfile} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PublicDealerProfile