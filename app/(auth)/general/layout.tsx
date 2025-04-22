"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import AuthHeader from "@/components/AuthHeader";

export default function GeneralLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const photoMap: Record<string, string> = {
    "/general/signup": "/images/general-signup.svg",
    "/general/login": "/images/general-login.svg",
    "/": "/images/home.jpg",
  };

  const photo = photoMap[pathname] || "/images/general-signup.svg";

  return (
    <div className="w-full lg:grid grid-cols-12 h-screen">
      {/* left */}
      <div className="lg:col-span-6 col-span-12 p-4 h-screen flex flex-col">
        {/* header */}
        <AuthHeader />

        {/* content */}
        <div className="lg:w-[360px] lg:max-w-[360px] w-full mx-auto lg:mb-20 lg:h-screen flex items-center">
          {children}
        </div>
      </div>

      {/* right */}
      <div className="lg:col-span-6 col-span-12 p-4 hidden lg:block fixed right-0 top-0 h-screen w-full lg:w-1/2">
        <div className=" h-full rounded-lg relative">
          {/* right content */}
          <Image
            src={photo}
            alt="auth"
            fill
            className="rounded-lg absolute top-0 bottom-0 left-0 right-0 m-auto object-cover"
            priority={true}
          />
        </div>
      </div>
    </div>
  );
}
