import ProfileHeader from '@/components/partials/dashboard/profile/profile-header';
import SettingsPanelTabs from '@/components/partials/dashboard/settings/settings-panel-tabs';

export const metadata = {
  title: 'Team Management | Teez',
  description: 'Dealer Overview',
};

export default function DashboardSettings() {
  return (
    <div>
      <ProfileHeader />
      {/* Edit Profile, Notifications, Plan, Security Tabs*/}
      <SettingsPanelTabs />
    </div>
  );
}
