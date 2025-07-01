"use client";

import { Skeleton } from "@/components/shadcn/skeleton";

export default function EditProfileSectionSkeleton() {
  return (
    <div className="p-6 bg-[#ffffff] rounded-lg border border-[#EAEBEC] shadow-sm">
      {/* Title */}
      <Skeleton className="h-8 w-48 mb-6" />

      <div className="flex flex-col space-y-6">
        {/* Profile Image Upload */}
        <div className="flex items-center space-x-4">
          <Skeleton className="flex-1 h-[120px] rounded-lg" />
        </div>

        {/* Form Fields - First Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        {/* Form Fields - Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        {/* Form Fields - Third Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        {/* Form Fields - Fourth Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        {/* Form Fields - Fifth Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-[120px] w-full" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <div className="border border-[#d5d7da] rounded-md p-2 min-h-[120px]">
              <div className="flex flex-wrap gap-2 mb-2">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-32" />
              </div>
            </div>
            <Skeleton className="h-4 w-48" />
          </div>
        </div>

        {/* Card Information */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-10 w-28" />
          </div>

          {/* Mastercard */}
          <div className="border-t border-[#d5d7da] py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="w-10 h-6 mx-3" />
                <div>
                  <Skeleton className="h-5 w-24 mb-2" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Visa */}
          <div className="border-t border-[#d5d7da] py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="w-10 h-6 mx-3" />
                <div>
                  <Skeleton className="h-5 w-24 mb-2" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-start space-x-4 mt-4">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
}
