import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import { FC } from "react";

type AdminDashboardOverviewCardProps = {
  bgColor: string;
  title: string;
  lastMonthTotal: number;
  growth: number;
};

const AdminDashboardOverviewCard: FC<AdminDashboardOverviewCardProps> = ({
  bgColor,
  growth,
  lastMonthTotal,
  title,
}) => {
  return (
    <div
      className="rounded-lg py-4 px-6 w-full"
      style={{ backgroundColor: bgColor }}
    >
      {/* top */}
      <div className="flex justify-between items-center mb-4">
        {/* left */}
        <div>
          <h3 className="text-[#2A2F3D] text-lg font-medium">{title}</h3>
        </div>

        {/* right */}
        <div className="">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="outline-none">
              <button className="flex">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.75 10.5C12.3544 10.5 11.9678 10.6173 11.6389 10.8371C11.31 11.0568 11.0536 11.3692 10.9022 11.7346C10.7509 12.1001 10.7113 12.5022 10.7884 12.8902C10.8656 13.2781 11.0561 13.6345 11.3358 13.9142C11.6155 14.1939 11.9719 14.3844 12.3598 14.4616C12.7478 14.5387 13.1499 14.4991 13.5154 14.3478C13.8808 14.1964 14.1932 13.94 14.4129 13.6111C14.6327 13.2822 14.75 12.8956 14.75 12.5C14.75 11.9696 14.5393 11.4609 14.1642 11.0858C13.7891 10.7107 13.2804 10.5 12.75 10.5ZM5.75 10.5C5.35444 10.5 4.96776 10.6173 4.63886 10.8371C4.30996 11.0568 4.05362 11.3692 3.90224 11.7346C3.75087 12.1001 3.71126 12.5022 3.78843 12.8902C3.8656 13.2781 4.05608 13.6345 4.33579 13.9142C4.61549 14.1939 4.97186 14.3844 5.35982 14.4616C5.74778 14.5387 6.14992 14.4991 6.51537 14.3478C6.88082 14.1964 7.19318 13.94 7.41294 13.6111C7.6327 13.2822 7.75 12.8956 7.75 12.5C7.75 11.9696 7.53929 11.4609 7.16421 11.0858C6.78914 10.7107 6.28043 10.5 5.75 10.5ZM19.75 10.5C19.3544 10.5 18.9678 10.6173 18.6389 10.8371C18.31 11.0568 18.0536 11.3692 17.9022 11.7346C17.7509 12.1001 17.7113 12.5022 17.7884 12.8902C17.8656 13.2781 18.0561 13.6345 18.3358 13.9142C18.6155 14.1939 18.9719 14.3844 19.3598 14.4616C19.7478 14.5387 20.1499 14.4991 20.5154 14.3478C20.8808 14.1964 21.1932 13.94 21.4129 13.6111C21.6327 13.2822 21.75 12.8956 21.75 12.5C21.75 11.9696 21.5393 11.4609 21.1642 11.0858C20.7891 10.7107 20.2804 10.5 19.75 10.5Z"
                    fill="#2A2F3D"
                  />
                </svg>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-20" align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem>Action #1</DropdownMenuItem>
                <DropdownMenuItem>Action #2</DropdownMenuItem>
                <DropdownMenuItem>Action #3</DropdownMenuItem>
                <DropdownMenuItem>Action #4</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* buttom */}
      <div className="flex justify-between">
        <div>
          <h3 className="text-[#2A2F3D] font-semibold text-3xl">
            {lastMonthTotal}
          </h3>
        </div>

        <div>
          <div className="bg-white rounded-lg flex p-2 justify-center items-center gap-1">
            <span className="text-[#2A2F3D] text-sm font-medium">
              {Number(growth).toFixed(2)}%
            </span>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardOverviewCard;
