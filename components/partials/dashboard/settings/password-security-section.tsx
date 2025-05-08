'use client';

import Button from '@/components/button';
import { Input } from '@/components/shadcn/input';

import { useState } from 'react';

export default function PasswordAndSecuritySection() {
  const [oldPassword, setOldPassword] = useState('********');
  const [newPassword, setNewPassword] = useState('********');
  const [confirmPassword, setConfirmPassword] = useState('********');

  return (
    <div className=" w-full p-6 border border-gray-50 rounded-2xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[#2b3545] text-3xl font-medium">
          Password and Security
        </h1>
        <p className="text-[#9da2a9]">Last update December, 24</p>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-[#555d6a] text-xl font-medium mb-2">
            Change Password
          </h2>
          <div className="border-b border-[#eaebec] pb-2"></div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="old-password"
              className="text-[#555d6a] font-normal"
            >
              Old Password <span className="text-[#555d6a]">*</span>
            </label>
            <Input
              id="old-password"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="border-[#d5d7da] rounded-md p-3 h-14"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="new-password"
                className="text-[#555d6a] font-normal"
              >
                New Password <span className="text-[#555d6a]">*</span>
              </label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border-[#d5d7da] rounded-md p-3 h-14"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="confirm-password"
                className="text-[#555d6a] font-normal"
              >
                Enter New Password Again
              </label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border-[#d5d7da] rounded-md p-3 h-14"
              />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-[#555d6a] font-medium">
              Password Requirements:
            </h3>
            <ul className="space-y-2 list-disc pl-6 text-[#555d6a]">
              <li>Minimum 8 characters long - the more, the better</li>
              <li>At least one lowercase character</li>
              <li>At least one number, symbol, or whitespace character</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#eaebec] pt-4"></div>

        <div className="flex gap-4">
          <Button
            variant="outline-gray"
            className="!border text-[#555d6a] px-6 rounded-md h-12"
          >
            Discard
          </Button>
          <Button className="" variant="primary">
            Update Password
          </Button>
        </div>
      </div>
    </div>
  );
}
