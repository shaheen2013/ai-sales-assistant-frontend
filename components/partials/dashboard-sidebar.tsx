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
        <div className="flex items-center justify-center py-9 mb-9">
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
                          "flex items-center gap-2 py-2 px-4 cursor-pointer",
                          {
                            "bg-[#EEF5F0]": isActive,
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
                          className={classNames(
                            "text-base font-medium text-gray-300",
                            {
                              "text-[#019935]": isActive,
                            }
                          )}
                        >
                          {subItem.label}
                        </span>
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
