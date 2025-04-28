"use client";

import Link from "next/link";
import Image from "next/image";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/shadcn/sidebar";
import { Progress } from "@/components/shadcn/progress";

import { dashboardSidebar } from "@/static/dashboard";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { Skeleton } from "@/components/shadcn/skeleton";

export function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  return (
    <Sidebar>
      <SidebarContent className="">
        {/* brand */}
        <div className="flex items-center justify-center py-9 mb-6">
          <Link href="/">
            <Image
              src="/icons/homepage/footer-brand.svg"
              alt="Logo"
              width={140}
              height={32}
            />
          </Link>
        </div>

        {/* menu items */}
        <div>
          {status !== "loading" &&
            dashboardSidebar.map((item, index) => {
              return (
                <div key={index}>
                  {/* label */}
                  <div className="px-4 py-2 text-sm font-medium text-gray-200 flex items-center gap-2">
                    {item.label}{" "}
                    <div className="w-full border-b border-gray-50"></div>
                  </div>

                  {/* items */}
                  <div className="flex flex-col gap-2 py-2">
                    {item.items.map((subItem, subIndex) => {
                      const isActive = pathname === subItem.href;

                      return (
                        <Link
                          href={subItem.href}
                          key={subIndex}
                          className={classNames(
                            "flex items-center gap-2 py-3 px-4 cursor-pointer relative",
                            {
                              "bg-[#EEF5F0] border-t border-b border-primary-100":
                                isActive,
                            }
                          )}
                        >
                          {/* icon */}
                          <div
                            className={classNames("", {
                              "text-[#019935] fill-primary-500": isActive,
                              "fill-gray-300": !isActive,
                            })}
                          >
                            {subItem.icon}
                          </div>

                          <span
                            className={classNames("text-base font-medium", {
                              "text-[#019935]": isActive,
                              "text-gray-300": !isActive,
                            })}
                          >
                            {subItem.label}
                          </span>

                          {/* indicator */}
                          {isActive && (
                            // <div className="absolute left-0 h-[18px] w-[4px] bg-primary-400 rounded-r-sm  shadow-[0px_5px_0px_-15px_rgba(0,0,0,0.3)]"></div>

                            <svg
                              width="20"
                              height="44"
                              viewBox="0 0 20 44"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="absolute left-0"
                            >
                              <g
                                opacity="0.4"
                                filter="url(#filter0_f_1306_166)"
                              >
                                <rect
                                  y="10.4375"
                                  width="10"
                                  height="23.123"
                                  fill="#019935"
                                />
                              </g>
                              <path
                                d="M0 12.998H2C3.10457 12.998 4 13.8935 4 14.998V28.998C4 30.1026 3.10457 30.998 2 30.998H0V12.998Z"
                                fill="#019935"
                              />
                              <defs>
                                <filter
                                  id="filter0_f_1306_166"
                                  x="-10"
                                  y="0.4375"
                                  width="30"
                                  height="43.123"
                                  filterUnits="userSpaceOnUse"
                                  colorInterpolationFilters="sRGB"
                                >
                                  <feFlood
                                    floodOpacity="0"
                                    result="BackgroundImageFix"
                                  />
                                  <feBlend
                                    mode="normal"
                                    in="SourceGraphic"
                                    in2="BackgroundImageFix"
                                    result="shape"
                                  />
                                  <feGaussianBlur
                                    stdDeviation="5"
                                    result="effect1_foregroundBlur_1306_166"
                                  />
                                </filter>
                              </defs>
                            </svg>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}

          {status == "loading" && (
            <div className="h-[calc(100vh-140px)] flex flex-col gap-5 justify-center items-center px-2">
              <Skeleton className="w-full h-10" />
              <Skeleton className="w-full h-10" />
              <Skeleton className="w-full h-10" />
              <Skeleton className="w-full h-10" />
              <Skeleton className="w-full h-10" />
              <Skeleton className="w-full h-10" />
              <Skeleton className="w-full h-10" />
              <Skeleton className="w-full h-10" />
            </div>
          )}
        </div>

        {/* user widget */}
        <div className="absolute bg-white bottom-0 left-[16px] right-[16px] p-3 border rounded-lg mb-4">
          <div className="flex justify-between mb-1">
            <div className="flex items-center justify-center gap-2 mb-[6px]">
              <svg
                width="15"
                height="16"
                viewBox="0 0 15 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.7983 6.21503C14.7592 6.09857 14.6887 5.99516 14.5946 5.91623C14.5005 5.83729 14.3864 5.78589 14.2649 5.76769L10.0103 5.11769L8.10094 1.05103C8.0471 0.936497 7.96177 0.839655 7.85494 0.771823C7.7481 0.70399 7.62416 0.667969 7.4976 0.667969C7.37105 0.667969 7.24711 0.70399 7.14027 0.771823C7.03343 0.839655 6.94811 0.936497 6.89427 1.05103L4.98494 5.11769L0.73027 5.76769C0.609084 5.78617 0.495337 5.8377 0.401534 5.91662C0.307731 5.99554 0.237505 6.09879 0.198574 6.21503C0.159644 6.33127 0.153517 6.45599 0.180867 6.57549C0.208218 6.69499 0.267987 6.80463 0.353603 6.89236L3.45427 10.067L2.72094 14.559C2.70092 14.6823 2.71594 14.8087 2.76428 14.9239C2.81262 15.039 2.89234 15.1383 2.99434 15.2104C3.09635 15.2824 3.21655 15.3244 3.34124 15.3314C3.46593 15.3385 3.5901 15.3104 3.6996 15.2504L7.4996 13.1517L11.2996 15.2504C11.4091 15.3109 11.5334 15.3395 11.6584 15.3327C11.7833 15.3259 11.9039 15.2841 12.0062 15.2121C12.1085 15.14 12.1884 15.0406 12.2369 14.9252C12.2854 14.8099 12.3004 14.6832 12.2803 14.5597L11.5469 10.0677L14.6456 6.89236C14.7308 6.80438 14.7901 6.69462 14.8171 6.57514C14.844 6.45565 14.8375 6.33106 14.7983 6.21503Z"
                  fill="url(#paint0_linear_1353_7212)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_1353_7212"
                    x1="7.49873"
                    y1="0.667969"
                    x2="15.2555"
                    y2="0.667969"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#019935" />
                    <stop offset="1" stopColor="#55BB78" />
                  </linearGradient>
                </defs>
              </svg>

              <span className="text-gray-400 text-xs">Goal</span>
            </div>

            <div className="text-gray-400 text-xs">20/45</div>
          </div>

          <Progress value={50} className="mb-5" />

          <hr className="mb-5" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex justify-between cursor-pointer">
                <div className="flex">
                  <div className="w-9 h-9 border-2 border-primary-500 p-[2px] rounded-full overflow-hidden">
                    <Image
                      src="https://dummyimage.com/500x500"
                      alt="user"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>

                  <div className="grid ml-1">
                    <div className="text-gray-400 font-medium text-sm">
                      John Doe
                    </div>
                    <div className="text-[10px] text-gray-300">
                      john@example.com
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <svg
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.14645 3.14645C5.95118 3.34171 5.95118 3.65829 6.14645 3.85355L10.2929 8L6.14645 12.1464C5.95118 12.3417 5.95118 12.6583 6.14645 12.8536C6.34171 13.0488 6.65829 13.0488 6.85355 12.8536L11.3536 8.35355C11.5488 8.15829 11.5488 7.84171 11.3536 7.64645L6.85355 3.14645C6.65829 2.95118 6.34171 2.95118 6.14645 3.14645Z"
                      fill="#717882"
                    />
                  </svg>
                </div>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Keyboard shortcuts</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => {
                  signOut({ callbackUrl: "/dealer/login?fromLogout=true" });

                  // router.push(`/dealer/login`);
                }}
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
