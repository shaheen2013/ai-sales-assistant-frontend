'use client';

import { Separator } from '@/components/shadcn/separator';
import { Skeleton } from '@/components/shadcn/skeleton';

export default function NotificationSectionSkeleton() {
  return (
    <div className="mx-auto p-6 bg-white rounded-2xl border border-gray-50">
      {/* Header */}
      <Skeleton className="h-8 w-48 mb-6" />

      {/* Email Notifications Section */}
      <div className="mb-8">
        <Skeleton className="h-6 w-36 mb-2" />
        <Skeleton className="h-4 w-[80%] mb-6" />
        <Skeleton className="h-4 w-[60%] mb-6" />

        <div className="mb-4">
          <Skeleton className="h-5 w-64 mb-4" />
          <div className="space-y-3">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-40" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Email News & Updates Section */}
      <div className="mb-8">
        <Skeleton className="h-6 w-44 mb-2" />
        <Skeleton className="h-4 w-[70%] mb-6" />
        <Skeleton className="h-4 w-[50%] mb-6" />

        <div className="space-y-3">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-[60%]" />
            </div>
          ))}
        </div>
      </div>

      {/* Sign-in Notifications Section */}
      <div className="mb-8">
        <Skeleton className="h-6 w-44 mb-2" />
        <Skeleton className="h-4 w-[65%] mb-6" />
        <Skeleton className="h-4 w-[55%] mb-6" />

        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex items-start space-x-2">
              <Skeleton className="h-4 w-4 rounded-full mt-1" />
              <div>
                <Skeleton className="h-4 w-32 mb-1" />
                <Skeleton className="h-3 w-[80%]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Text */}
      <Skeleton className="h-4 w-[90%] mb-6" />
      <div className="mb-8">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-4 w-64" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>

      <Separator className="my-6 bg-[#eaebec]" />

      {/* Buttons */}
      <div className="flex justify-start gap-4">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
}
