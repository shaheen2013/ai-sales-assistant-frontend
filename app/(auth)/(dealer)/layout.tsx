"use client";

import React from "react";

import AuthHeader from "@/components/AuthHeader";
import LayoutCarousel from "./layoutCarousel/layoutCarousel";

export default function GeneralLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full lg:grid grid-cols-12 h-screen">
      {/* left */}
      <div className="lg:col-span-6 col-span-12 p-4 lg:h-screen flex flex-col">
        {/* header */}
        <div className="lg:mb-36">
          <AuthHeader />
        </div>

        {/* content */}
        <div className="lg:w-[360px] lg:max-w-[360px] w-full h-full mx-auto lg:mb-20 flex items-center">
          {children}
        </div>
      </div>

      {/* right temp */}
      <div className="lg:col-span-6 col-span-12 p-4 hidden lg:block fixed right-0 top-0 h-screen w-full lg:w-1/2">
        <div className=" h-full rounded-lg relative bg-[#F3F4F5] flex justify-center items-center">
          <LayoutCarousel />
        </div>
      </div>
    </div>
  );
}
