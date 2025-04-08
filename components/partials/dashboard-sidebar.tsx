import Image from "next/image";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/shadcn/sidebar";
import { dashboardSidebar } from "@/static/dashboard";
import Link from "next/link";

export function DashboardSidebar() {
  console.log("dashboardSidebar => ", dashboardSidebar);
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
            console.log("item => ", item);

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
                    return (
                      <Link
                        href={subItem.href}
                        key={subIndex}
                        className="flex items-center gap-2 p-2 cursor-pointer"
                      >
                        {/* icon */}
                        <div className="flex items-center justify-center w-6 h-6 text-gray-300">
                          {subItem.icon}
                        </div>

                        <span className="text-base font-medium text-gray-300">
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
