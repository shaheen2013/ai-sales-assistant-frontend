'use client';
import ProfileHeader from '@/components/partials/dashboard/profile/profile-header';
import DealerProfileOverviewSkeleton from '@/components/partials/dashboard/skeleton/dealer-profile-overview-skeleton';
import { useGetDealerProfileQuery } from '@/features/dealer/dealerProfileSlice';
import CardInformationSection from './card-information-section';
import ContactInformationCard from './contact-information-card';
import PublicEmbedCodeCard from './embeded-code-card';
import InviteFreindsCard from './invite-freinds-card';
import ServicesOfferedSection from './services-offered-section';
import ShortBioSection from './short-bio-section';
import UpgradePlanCtaCard from './upgrade-plan-cta-card';

export default function DealerProfile() {
  const { data, isLoading } = useGetDealerProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const dealerProfileData = data?.data;
  if (isLoading) return <DealerProfileOverviewSkeleton />;
  return (
    <div className="mx-auto bg-white rounded-lg shadow-sm overflow-hidden flex flex-col gap-6">
      {/* Header Section */}
      <ProfileHeader />
      {/* Main Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        {/* left side */}
        <div className="md:col-span-2 space-y-6">
          <ShortBioSection bio={dealerProfileData?.about || ''} />
          <ServicesOfferedSection />
          <CardInformationSection />
        </div>
        {/* right side */}
        <div className="space-y-6">
          <UpgradePlanCtaCard />
          <ContactInformationCard data={dealerProfileData} />
          <InviteFreindsCard />
          <PublicEmbedCodeCard />
        </div>
      </div>
    </div>
  );
}
