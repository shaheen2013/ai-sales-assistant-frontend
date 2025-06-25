import ProfileHeader from "@/components/partials/dashboard/profile/profile-header";
import SettingsPanelTabs from "@/components/partials/dashboard/settings/settings-panel-tabs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile Settings | Teez",
  description: "Manage your profile settings and preferences.",
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
