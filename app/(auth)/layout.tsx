import Image from "next/image";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full grid grid-cols-12">
      {/* left */}
      <div className="lg:col-span-6 col-span-12 flex flex-col justify-center">
        <div className="dev">header</div>
        <div className="w-[360px] max-w-[360px] mx-auto">
          <div className="">{children}</div>
        </div>
      </div>

      {/* right */}
      <div className="hidden lg:block col-span-6">
        <div className="mx-2 mt-2 h-[calc(100vh-15px)] rounded-lg relative">
          {/* right content */}
          <Image
            src="https://dummyimage.com/800x1200"
            alt="auth"
            height={1200}
            width={800}
            className="rounded-lg h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
