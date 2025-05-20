'use client';

import { useState } from 'react';
import EditProfileSection from './edit-profile-section';
import ManageOwnershipSection from './manage-ownership-section';
import NotificationSection from './notification-section';
import PasswordAndSecuritySection from './password-security-section';
import PricingPlanSection from './pricing-plan-section';

const tabs = [
  'Edit Profile',
  'Notifications',
  'Your Plan',
  'Password & Security',
  'Manage Ownership',
];

export default function SettingsPanelTabs() {
  const [activeTab, setActiveTab] = useState('Edit Profile');

  return (
    <div className="flex flex-col sm:flex-row items-start gap-5 mt-6 ">
      {/* Tabs */}
      <div className="flex flex-wrap sm:flex-col  gap-2 mb-4 px-4 py-3  sm:py-4 rounded-2xl border border-[#EAEBEC]">
        {tabs.map((tab) => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`${
              activeTab === tab ? 'bg-primary-500 text-white' : 'text-gray-600'
            } flex items-center justify-start  rounded-[10px] px-2 sm:px-4 py-2 sm:py-3 my-0 sm:my-2 font-medium  cursor-pointer text-[12px] sm:text-base w-full`}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Content based on active tab */}
      <div className="w-full sm:flex-1">
        {activeTab === 'Edit Profile' && <EditProfileSection />}
        {activeTab === 'Notifications' && <NotificationSection />}
        {activeTab === 'Your Plan' && <PricingPlanSection />}
        {activeTab === 'Password & Security' && <PasswordAndSecuritySection />}
        {activeTab === 'Manage Ownership' && <ManageOwnershipSection />}
      </div>
    </div>
  );
}
