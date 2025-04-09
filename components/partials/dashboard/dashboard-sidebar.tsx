"use client";

import Link from "next/link";
import Image from "next/image";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/shadcn/sidebar";
import { dashboardSidebar } from "@/static/dashboard";
import { usePathname } from "next/navigation";
import classNames from "classnames";

export function DashboardSidebar() {
  // console.log("dashboardSidebar => ", dashboardSidebar);

  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        {/* brand */}
        <div className="flex items-center justify-center py-9 mb-6">
          <Image
            src="/icons/homepage/footer-brand.svg"
            alt="Logo"
            width={140}
            height={32}
          />
        </div>

        {/* menu items */}
        <div>
          {dashboardSidebar.map((item, index) => {
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
                            <g opacity="0.4" filter="url(#filter0_f_1306_166)">
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
        </div>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
