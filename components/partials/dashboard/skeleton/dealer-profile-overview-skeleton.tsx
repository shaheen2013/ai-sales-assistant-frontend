'use client';

import { Card, CardContent, CardHeader } from '@/components/shadcn/card';
import { Skeleton } from '@/components/shadcn/skeleton';

export default function DealerProfileOverviewSkeleton() {
  return (
    <div className="mx-auto bg-white rounded-lg shadow-sm overflow-hidden flex flex-col gap-6">
      {/* Header Section */}
      <Skeleton className="h-40 w-full" />

      {/* Main Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Short Bio Section */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>

          {/* Services Offered Section */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {[...Array(9)].map((_, index) => (
                  <Skeleton key={index} className="h-8 w-24 rounded-full" />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Card Information Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-8 w-24" />
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Mastercard */}
              <div className="flex items-center justify-between py-3 border-b border-[#eaebec]">
                <div className="flex items-center">
                  <Skeleton className="w-5 h-5 mr-3" />
                  <Skeleton className="w-10 h-6 mr-3" />
                  <div>
                    <Skeleton className="h-5 w-24 mb-2" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                </div>
              </div>

              {/* American Express - Expanded */}
              <div className="border-b border-[#eaebec]">
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center">
                    <Skeleton className="w-5 h-5 mr-3" />
                    <Skeleton className="w-10 h-6 mr-3" />
                    <div className="flex items-center">
                      <div>
                        <Skeleton className="h-5 w-32 mb-2" />
                        <Skeleton className="h-4 w-40" />
                      </div>
                      <Skeleton className="ml-3 h-6 w-16 rounded-full" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                </div>

                {/* Card Details */}
                <div className="grid grid-cols-2 gap-4 py-4 px-12">
                  {[...Array(10)].map((_, index) => (
                    <div key={index}>
                      <Skeleton className="h-4 w-20 mb-2" />
                      <Skeleton className="h-5 w-32" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Visa */}
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center">
                  <Skeleton className="w-5 h-5 mr-3" />
                  <Skeleton className="w-10 h-6 mr-3" />
                  <div>
                    <Skeleton className="h-5 w-24 mb-2" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Premium Section */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start">
                <div>
                  <Skeleton className="h-6 w-20 rounded-full mb-2" />
                  <Skeleton className="h-7 w-28 mt-2" />
                  <Skeleton className="h-4 w-48 mt-2" />
                </div>
                <Skeleton className="h-8 w-24" />
              </div>
              <div className="mt-6 flex justify-between items-center gap-6">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex items-start">
                  <Skeleton className="w-8 h-8 rounded-full mr-3" />
                  <Skeleton className="h-5 w-48" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Invite Your Friends */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center text-center p-2">
                <Skeleton className="w-12 h-12 rounded-full mb-4" />
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-48 mb-4" />
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>

          {/* Public Embed Code */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-16 w-full rounded" />
              <div className="flex justify-between items-center mt-4">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-10 w-24" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
