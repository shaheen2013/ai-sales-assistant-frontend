"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";

import { languages } from "@/static/dashboard";
import { useSidebar } from "@/components/shadcn/sidebar";
import Notification from "./_partials/notification/Notification";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/partials/dashboard/dashboard-dropdown";
import { Skeleton } from "@/components/shadcn/skeleton";

export default function DashboardHeader() {
  const { data: session, status } = useSession();

  const isLoading = status === "loading";

  const { toggleSidebar } = useSidebar();

  const handleOpenChange = (open: boolean) => {
    // black screen on body with tailwind

    // create a new div element
    const overlay = document.createElement("div");

    // set unique id for the overlay div
    overlay.id = "overlay";

    // set the class name to the overlay div
    overlay.className = "fixed inset-0 bg-black opacity-50 z-50";

    if (open) {
      // append the overlay div to the body
      document.body.appendChild(overlay);
    } else {
      // remove the overlay div from the body
      const overlayDiv = document.getElementById("overlay");
      if (overlayDiv) {
        document.body.removeChild(overlayDiv);
      }
    }
  };

  return (
    <div className="top-0 sticky bg-white flex justify-between px-6 py-5 shadow">
      {/* left */}
      <div className="flex gap-4 items-center">
        <div className="md:hidden">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => toggleSidebar()}
          >
            <path
              d="M5 7H19M5 12H19M5 17H19"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </div>

        <div>
          {isLoading ? (
            <>
              <Skeleton className="w-[260px] h-[26px] mb-2" />
              <Skeleton className="w-[180px] h-[25px]" />
            </>
          ) : (
            <>
              <h2 className="text-gray-500 font-semibold lg:text-2xl text-xl mb-1">
                Hello,{" "}
                <span className="capitalize">
                  {session?.user?.name || "Anonymous"}!
                </span>
              </h2>

              <p className="text-gray-300 lg:text-base text-sm">
                {session?.user?.user_type == "admin" ? (
                  "Let's get started."
                ) : (
                  <span>Welcome back, let&apos;s explore now!</span>
                )}
              </p>
            </>
          )}
        </div>
      </div>

      {/* right   */}
      <div className="flex justify-center items-center gap-4">
        {/* notification */}
        <Notification />

        {/* language  */}
        <div className="block">
          <DropdownMenu onOpenChange={handleOpenChange}>
            <DropdownMenuTrigger asChild>
              <div className="cursor-pointer px-3 py-2 rounded-lg border relative flex lg:gap-3 justify-center items-center h-[42px]">
                {/* image  */}
                <div className="rounded-full h-5 w-5 overflow-hidden">
                  <Image
                    src="/flags/us.png"
                    alt="flag"
                    width={24}
                    height={24}
                    className="h-full w-full object-cover"
                  />
                </div>

                <span className="text-gray-300 text-lg hidden lg:block">
                  Eng (US)
                </span>

                {/* arrow  */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.9978 14.5002L11.997 14.5002C11.9312 14.5006 11.866 14.488 11.8051 14.4631C11.7444 14.4383 11.6892 14.4018 11.6426 14.3558C11.6424 14.3556 11.6422 14.3554 11.6421 14.3552L7.64349 10.3566C7.54896 10.2621 7.49585 10.1339 7.49585 10.0002C7.49585 9.86649 7.54896 9.73827 7.64349 9.64374C7.73803 9.5492 7.86625 9.49609 7.99994 9.49609C8.13353 9.49609 8.26166 9.54912 8.35617 9.64352C8.35624 9.64359 8.35632 9.64367 8.35639 9.64374L11.6459 12.9432L11.9994 13.2978L12.3535 12.9437L15.6275 9.66974C15.7213 9.5945 15.8392 9.55545 15.9597 9.5601C16.0855 9.56496 16.2049 9.61713 16.294 9.70618C16.383 9.79522 16.4352 9.91459 16.44 10.0404C16.4447 10.1609 16.4056 10.2789 16.3304 10.3726L12.3478 14.3552C12.3476 14.3554 12.3474 14.3556 12.3472 14.3558C12.2542 14.4478 12.1287 14.4996 11.9978 14.5002Z"
                    fill="#A3A3A3"
                    stroke="#A3A3A3"
                  />
                </svg>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-[200px] p-2 rounded-xl mt-1"
              align="end"
            >
              {/* content */}
              <div className="">
                {languages.map((language, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 mb-2 last:mb-0 p-2 cursor-pointer hover:bg-gray-50 rounded-lg"
                  >
                    <div className="rounded-full h-5 w-5 overflow-hidden">
                      {/* image  */}
                      <Image
                        src={language.flag}
                        alt="flag"
                        width={24}
                        height={24}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="text-gray-500">{language.name}</span>
                  </div>
                ))}
              </div>

              {/* see all notification */}
              {/* <Button
                variant="outline"
                className="w-full !py-6 !font-medium text-primary-500 !border !border-gray-100 rounded-lg"
              >
                See All Notification
              </Button> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
