import { isNegativeNumber } from "@/lib/utils";
import { FC } from "react";

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
  return (
    <div
      className="shadow-md rounded-lg py-4 px-6 mb-4 w-full"
      style={{ backgroundColor: bgColor }}
    >
      {/* top */}
      <div className="flex justify-between items-center mb-4">
        {/* left */}
        <div>
          <h3 className="text-[#2A2F3D] text-lg font-medium">{title}</h3>
        </div>

        {/* right */}
      </div>

      {/* buttom */}
      <div className="flex justify-between">
        <div>
          <h3 className="text-[#2A2F3D] font-semibold text-3xl">
            {preSign}
            {lastMonthTotal}
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
