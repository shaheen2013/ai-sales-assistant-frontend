import { FC } from "react";

import { isNegativeNumber } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/shadcn/dropdown-menu";

type AdminDashboardOverviewCardProps = {
  bgColor: string;
  title: string;
  lastMonthTotal: number;
  growth: number;
  preSign?: string; // Optional prop for currency sign or any prefix
};

const AdminDashboardOverviewCard: FC<AdminDashboardOverviewCardProps> = ({
  bgColor,
  growth,
  lastMonthTotal,
  title,
  preSign = "",
}) => {
  const formatMinutes = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}m`;
    } else {
      const hours = (minutes / 60).toFixed(1); // or use Math.round if you prefer
      return `${hours}h`;
    }
  };

  return (
    <div
      className="shadow-md rounded-lg py-4 px-6 mb-4 w-full"
      style={{ backgroundColor: bgColor }}
    >
      {/* top */}
      <div className="flex justify-between items-center mb-4">
        {/* left */}
        <div className="">
          <h3 className="text-[#2A2F3D] text-lg font-medium">{title}</h3>
        </div>

        {/* right */}
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  d="M12 10.5C11.6044 10.5 11.2178 10.6173 10.8889 10.8371C10.56 11.0568 10.3036 11.3692 10.1522 11.7346C10.0009 12.1001 9.96126 12.5022 10.0384 12.8902C10.1156 13.2781 10.3061 13.6345 10.5858 13.9142C10.8655 14.1939 11.2219 14.3844 11.6098 14.4616C11.9978 14.5387 12.3999 14.4991 12.7654 14.3478C13.1308 14.1964 13.4432 13.94 13.6629 13.6111C13.8827 13.2822 14 12.8956 14 12.5C14 11.9696 13.7893 11.4609 13.4142 11.0858C13.0391 10.7107 12.5304 10.5 12 10.5ZM5 10.5C4.60444 10.5 4.21776 10.6173 3.88886 10.8371C3.55996 11.0568 3.30362 11.3692 3.15224 11.7346C3.00087 12.1001 2.96126 12.5022 3.03843 12.8902C3.1156 13.2781 3.30608 13.6345 3.58579 13.9142C3.86549 14.1939 4.22186 14.3844 4.60982 14.4616C4.99778 14.5387 5.39992 14.4991 5.76537 14.3478C6.13082 14.1964 6.44318 13.94 6.66294 13.6111C6.8827 13.2822 7 12.8956 7 12.5C7 11.9696 6.78929 11.4609 6.41421 11.0858C6.03914 10.7107 5.53043 10.5 5 10.5ZM19 10.5C18.6044 10.5 18.2178 10.6173 17.8889 10.8371C17.56 11.0568 17.3036 11.3692 17.1522 11.7346C17.0009 12.1001 16.9613 12.5022 17.0384 12.8902C17.1156 13.2781 17.3061 13.6345 17.5858 13.9142C17.8655 14.1939 18.2219 14.3844 18.6098 14.4616C18.9978 14.5387 19.3999 14.4991 19.7654 14.3478C20.1308 14.1964 20.4432 13.94 20.6629 13.6111C20.8827 13.2822 21 12.8956 21 12.5C21 11.9696 20.7893 11.4609 20.4142 11.0858C20.0391 10.7107 19.5304 10.5 19 10.5Z"
                  fill="#2A2F3D"
                />
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* buttom */}
      <div className="flex justify-between">
        <div>
          <h3 className="text-[#2A2F3D] font-semibold text-3xl">
            {preSign}
            {lastMonthTotal}

            {/* only for talk */}
            {title === "Talk" ? <span className="text-md"> M</span> : null}
          </h3>
        </div>

        <div>
          <div className="bg-white rounded-lg flex p-2 justify-center items-center gap-1">
            <span className="text-[#2A2F3D] text-sm font-medium">
              {Number(growth).toFixed(2)}%
            </span>

            {isNegativeNumber(growth) ? (
              <svg
                width="15"
                height="14"
                viewBox="0 0 15 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="rotate-180"
              >
                <path
                  d="M12.2475 5.41951L8.16415 1.33618C8.10868 1.28307 8.04326 1.24144 7.97165 1.21368C7.82963 1.15534 7.67034 1.15534 7.52832 1.21368C7.45671 1.24144 7.3913 1.28307 7.33582 1.33618L3.25249 5.41951C3.1981 5.4739 3.15495 5.53847 3.12552 5.60953C3.09608 5.6806 3.08093 5.75676 3.08093 5.83368C3.08093 5.98902 3.14264 6.138 3.25249 6.24785C3.36233 6.35769 3.51131 6.4194 3.66665 6.4194C3.822 6.4194 3.97098 6.35769 4.08082 6.24785L7.16665 3.15618V12.2503C7.16665 12.4051 7.22811 12.5534 7.33751 12.6628C7.4469 12.7722 7.59528 12.8337 7.74999 12.8337C7.9047 12.8337 8.05307 12.7722 8.16247 12.6628C8.27186 12.5534 8.33332 12.4051 8.33332 12.2503V3.15618L11.4192 6.24785C11.4734 6.30252 11.5379 6.34592 11.609 6.37553C11.6801 6.40515 11.7563 6.42039 11.8333 6.42039C11.9103 6.42039 11.9866 6.40515 12.0577 6.37553C12.1287 6.34592 12.1933 6.30252 12.2475 6.24785C12.3022 6.19362 12.3456 6.1291 12.3752 6.05802C12.4048 5.98693 12.42 5.91069 12.42 5.83368C12.42 5.75667 12.4048 5.68043 12.3752 5.60934C12.3456 5.53826 12.3022 5.47374 12.2475 5.41951Z"
                  fill="#878787"
                />
              </svg>
            ) : (
              <svg
                width="15"
                height="14"
                viewBox="0 0 15 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.2475 5.41951L8.16415 1.33618C8.10868 1.28307 8.04326 1.24144 7.97165 1.21368C7.82963 1.15534 7.67034 1.15534 7.52832 1.21368C7.45671 1.24144 7.3913 1.28307 7.33582 1.33618L3.25249 5.41951C3.1981 5.4739 3.15495 5.53847 3.12552 5.60953C3.09608 5.6806 3.08093 5.75676 3.08093 5.83368C3.08093 5.98902 3.14264 6.138 3.25249 6.24785C3.36233 6.35769 3.51131 6.4194 3.66665 6.4194C3.822 6.4194 3.97098 6.35769 4.08082 6.24785L7.16665 3.15618V12.2503C7.16665 12.4051 7.22811 12.5534 7.33751 12.6628C7.4469 12.7722 7.59528 12.8337 7.74999 12.8337C7.9047 12.8337 8.05307 12.7722 8.16247 12.6628C8.27186 12.5534 8.33332 12.4051 8.33332 12.2503V3.15618L11.4192 6.24785C11.4734 6.30252 11.5379 6.34592 11.609 6.37553C11.6801 6.40515 11.7563 6.42039 11.8333 6.42039C11.9103 6.42039 11.9866 6.40515 12.0577 6.37553C12.1287 6.34592 12.1933 6.30252 12.2475 6.24785C12.3022 6.19362 12.3456 6.1291 12.3752 6.05802C12.4048 5.98693 12.42 5.91069 12.42 5.83368C12.42 5.75667 12.4048 5.68043 12.3752 5.60934C12.3456 5.53826 12.3022 5.47374 12.2475 5.41951Z"
                  fill="#878787"
                />
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardOverviewCard;
