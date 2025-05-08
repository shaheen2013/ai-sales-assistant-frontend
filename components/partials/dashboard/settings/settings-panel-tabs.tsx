'use client';

import { useState } from 'react';
import EditProfileSection from './edit-profile-section';
import NotificationSection from './notification-section';
import PasswordAndSecuritySection from './password-security-section';
import PricingPlanSection from './pricing-plan-section';

const tabs = [
  'Edit Profile',
  'Notifications',
  'Your Plan',
  'Password & Security',
];

export default function SettingsPanelTabs() {
  const [activeTab, setActiveTab] = useState('Edit Profile');

  return (
    <div className="flex items-start gap-5 mt-6">
      {/* Tabs */}
      <div className="flex  flex-col  gap-2 mb-4 px-4 py-6 rounded-2xl border border-[#EAEBEC]">
        {tabs.map((tab) => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`${
              activeTab === tab ? 'bg-primary-500 text-white' : 'text-gray-600'
            } flex items-center justify-start gap-2 rounded-[10px] px-4 py-3 my-1 text-sm font-medium  cursor-pointer`}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Content based on active tab */}
      <div className="flex-1">
        {activeTab === 'Edit Profile' && <EditProfileSection />}
        {activeTab === 'Notifications' && <NotificationSection />}
        {activeTab === 'Your Plan' && <PricingPlanSection />}
        {activeTab === 'Password & Security' && <PasswordAndSecuritySection />}
      </div>
    </div>
  );
}
