"use client";

import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import {
  Sidebar,
  SidebarFooter,
  SidebarContent,
} from "@/components/shadcn/sidebar";
import { dashboardDealerMenu, dashboardUserMenu } from "@/static/dashboard";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/shadcn/dropdown-menu";
import { Skeleton } from "@/components/shadcn/skeleton";

export function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const isAdmin = session?.user?.user_type == "admin";
  const isDashboardReady = status !== "loading" && status == "authenticated";
  const dashboardMenu = isAdmin ? dashboardUserMenu : dashboardDealerMenu;

  return (
    <Sidebar>
      <SidebarContent className="pb-[150px]">
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
          {isDashboardReady &&
            dashboardMenu.map((item, index) => {
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
                      const isActive = pathname.startsWith(subItem.href);

                      console.log("pathname", pathname);
                      console.log("subItem.href", subItem.href);

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
            <div className=" flex flex-col gap-5 justify-center items-center px-2">
              <Skeleton className="w-full h-10" />
              <Skeleton className="w-full h-10" />
              <Skeleton className="w-full h-10" />
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
          {/* <div className="flex justify-between mb-1">
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
          </div> */}

          {/* <Progress value={50} className="mb-5" /> */}

          {/* <hr className="mb-5" /> */}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex justify-between cursor-pointer">
                <div className="flex">
                  {session?.user?.profile_picture ? (
                    <div className="w-9 h-9 border-2 border-primary-500 p-[2px] rounded-full overflow-hidden">
                      {/* image */}
                      <Image
                        src="https://dummyimage.com/500x500"
                        alt="user"
                        width={40}
                        height={40}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  ) : (
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 26 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-1"
                    >
                      <path
                        d="M13 0C10.4738 0.0047955 8.00356 0.743473 5.89009 2.12606C3.77663 3.50864 2.11118 5.47546 1.09661 7.78695C0.082046 10.0984 -0.237855 12.6548 0.175876 15.1447C0.589607 17.6346 1.71911 19.9506 3.42682 21.8105C4.64648 23.1315 6.12677 24.1857 7.77439 24.9067C9.42202 25.6278 11.2013 26 13 26C14.7987 26 16.578 25.6278 18.2256 24.9067C19.8732 24.1857 21.3535 23.1315 22.5732 21.8105C24.2809 19.9506 25.4104 17.6346 25.8241 15.1447C26.2379 12.6548 25.918 10.0984 24.9034 7.78695C23.8888 5.47546 22.2234 3.50864 20.1099 2.12606C17.9964 0.743473 15.5262 0.0047955 13 0ZM13 23.4242C10.3019 23.4201 7.71054 22.3705 5.77127 20.4962C6.36004 19.0641 7.36163 17.8392 8.64876 16.9772C9.93589 16.1152 11.4505 15.6549 13 15.6549C14.5495 15.6549 16.0641 16.1152 17.3512 16.9772C18.6384 17.8392 19.64 19.0641 20.2287 20.4962C18.2895 22.3705 15.6981 23.4201 13 23.4242ZM10.3951 10.4108C10.3951 9.896 10.5478 9.39279 10.8341 8.96478C11.1203 8.53677 11.5271 8.20318 12.0031 8.00619C12.4791 7.8092 13.0029 7.75766 13.5082 7.85808C14.0135 7.95851 14.4777 8.20639 14.842 8.57038C15.2063 8.93437 15.4544 9.39813 15.5549 9.903C15.6554 10.4079 15.6038 10.9312 15.4067 11.4068C15.2095 11.8823 14.8756 12.2888 14.4472 12.5748C14.0188 12.8608 13.5152 13.0135 13 13.0135C12.3091 13.0135 11.6465 12.7392 11.158 12.2511C10.6695 11.763 10.3951 11.101 10.3951 10.4108ZM22.0001 18.2188C20.8364 16.2301 19.0453 14.6831 16.9074 13.8203C17.5706 13.069 18.0027 12.1424 18.1519 11.1518C18.3011 10.1612 18.161 9.1486 17.7485 8.23556C17.336 7.32251 16.6685 6.54779 15.8262 6.00436C14.984 5.46093 14.0026 5.17187 13 5.17187C11.9974 5.17187 11.016 5.46093 10.1738 6.00436C9.33147 6.54779 8.66403 7.32251 8.2515 8.23556C7.83898 9.1486 7.69891 10.1612 7.8481 11.1518C7.99729 12.1424 8.4294 13.069 9.09258 13.8203C6.9547 14.6831 5.16362 16.2301 3.99991 18.2188C3.07247 16.6404 2.58245 14.8437 2.58021 13.0135C2.58021 10.2523 3.67801 7.60433 5.6321 5.65193C7.58618 3.69954 10.2365 2.60269 13 2.60269C15.7635 2.60269 18.4138 3.69954 20.3679 5.65193C22.322 7.60433 23.4198 10.2523 23.4198 13.0135C23.4176 14.8437 22.9275 16.6404 22.0001 18.2188Z"
                        fill="#019935"
                      />
                    </svg>
                  )}

                  <div className="grid ml-1">
                    <div className="text-gray-400 font-medium text-sm">
                      {session?.user?.name}
                    </div>
                    <div className="text-[10px] text-gray-300">
                      {session?.user?.email}
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
                  signOut({ callbackUrl: "/login" });
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
