"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import AuthHeader from "@/components/AuthHeader";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/auth-dealer-carousel";

export default function GeneralLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="w-full lg:grid grid-cols-12 h-screen">
      {/* left */}
      <div className="lg:col-span-6 col-span-12 p-4 h-screen flex flex-col">
        {/* header */}
        <div className="mb-36">
          <AuthHeader />
        </div>

        {/* content */}
        <div className="lg:w-[360px] lg:max-w-[360px] w-full h-full mx-auto lg:mb-20 flex items-center">
          {children}
        </div>
      </div>

      {/* right */}
      <div className="lg:col-span-6 col-span-12 p-4 hidden lg:block fixed right-0 top-0 h-screen w-full lg:w-1/2">
        <div className=" h-full rounded-lg relative bg-gray-50 flex justify-center items-center dev">
          {/* right content */}
          <Carousel className="dev">
            <CarouselContent>
              <CarouselItem>1</CarouselItem>
              <CarouselItem>2</CarouselItem>
              <CarouselItem>3</CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
