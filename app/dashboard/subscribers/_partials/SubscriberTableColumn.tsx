import Badge from "@/components/badge/Badge";
import { Dealer } from "@/types/dealerType";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import moment from "moment";
import Image from "next/image";

export const subscriberTableColumns: ColumnDef<Dealer>[] = [
  {
    accessorKey: "id",
    header: "Id",
    size: 80,
  },
  {
    accessorKey: "business_name",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1 select-none cursor-pointer"
        >
          <p className="text-[#2b3545] text-sm font-medium">Dealer Name</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M4.66663 9.99935L7.99996 13.3327L11.3333 9.99935M4.66663 5.99935L7.99996 2.66602L11.3333 5.99935"
              stroke="#111928"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      );
    },
    cell: ({ row }) => {
      const dealerName: string = row.getValue("business_name");
      const dealerImg = row.original.profile_picture;
      const dealerCreaterAt = row.original.created_at;

      return (
        <div className="flex gap-2">
          {dealerImg ? (
            <Image
              src={dealerImg || "/images/user-1.png"}
              alt="user"
              width={36}
              height={36}
              className="size-[36px] rounded-full object-cover"
            />
          ) : (
            <svg
              width="36"
              height="36"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 0C10.4738 0.0047955 8.00356 0.743473 5.89009 2.12606C3.77663 3.50864 2.11118 5.47546 1.09661 7.78695C0.082046 10.0984 -0.237855 12.6548 0.175876 15.1447C0.589607 17.6346 1.71911 19.9506 3.42682 21.8105C4.64648 23.1315 6.12677 24.1857 7.77439 24.9067C9.42202 25.6278 11.2013 26 13 26C14.7987 26 16.578 25.6278 18.2256 24.9067C19.8732 24.1857 21.3535 23.1315 22.5732 21.8105C24.2809 19.9506 25.4104 17.6346 25.8241 15.1447C26.2379 12.6548 25.918 10.0984 24.9034 7.78695C23.8888 5.47546 22.2234 3.50864 20.1099 2.12606C17.9964 0.743473 15.5262 0.0047955 13 0ZM13 23.4242C10.3019 23.4201 7.71054 22.3705 5.77127 20.4962C6.36004 19.0641 7.36163 17.8392 8.64876 16.9772C9.93589 16.1152 11.4505 15.6549 13 15.6549C14.5495 15.6549 16.0641 16.1152 17.3512 16.9772C18.6384 17.8392 19.64 19.0641 20.2287 20.4962C18.2895 22.3705 15.6981 23.4201 13 23.4242ZM10.3951 10.4108C10.3951 9.896 10.5478 9.39279 10.8341 8.96478C11.1203 8.53677 11.5271 8.20318 12.0031 8.00619C12.4791 7.8092 13.0029 7.75766 13.5082 7.85808C14.0135 7.95851 14.4777 8.20639 14.842 8.57038C15.2063 8.93437 15.4544 9.39813 15.5549 9.903C15.6554 10.4079 15.6038 10.9312 15.4067 11.4068C15.2095 11.8823 14.8756 12.2888 14.4472 12.5748C14.0188 12.8608 13.5152 13.0135 13 13.0135C12.3091 13.0135 11.6465 12.7392 11.158 12.2511C10.6695 11.763 10.3951 11.101 10.3951 10.4108ZM22.0001 18.2188C20.8364 16.2301 19.0453 14.6831 16.9074 13.8203C17.5706 13.069 18.0027 12.1424 18.1519 11.1518C18.3011 10.1612 18.161 9.1486 17.7485 8.23556C17.336 7.32251 16.6685 6.54779 15.8262 6.00436C14.984 5.46093 14.0026 5.17187 13 5.17187C11.9974 5.17187 11.016 5.46093 10.1738 6.00436C9.33147 6.54779 8.66403 7.32251 8.2515 8.23556C7.83898 9.1486 7.69891 10.1612 7.8481 11.1518C7.99729 12.1424 8.4294 13.069 9.09258 13.8203C6.9547 14.6831 5.16362 16.2301 3.99991 18.2188C3.07247 16.6404 2.58245 14.8437 2.58021 13.0135C2.58021 10.2523 3.67801 7.60433 5.6321 5.65193C7.58618 3.69954 10.2365 2.60269 13 2.60269C15.7635 2.60269 18.4138 3.69954 20.3679 5.65193C22.322 7.60433 23.4198 10.2523 23.4198 13.0135C23.4176 14.8437 22.9275 16.6404 22.0001 18.2188Z"
                fill="#019935"
              ></path>
            </svg>
          )}
          <div>
            <h4 className="text-sm font-medium text-gray-700">
              {dealerName || "N/A"}
            </h4>
            <p className="text-xs font-normal text-gray-600">
              Member Since
              <span className="font-medium ml-1">
                {moment(dealerCreaterAt).format("MMM, YYYY")}
              </span>
            </p>
          </div>
        </div>
      );
    },
    size: 200,
  },
  {
    accessorKey: "subscription_name",
    header: () => <div className="text-center">Plan Name</div>,
    cell: ({ row }) => {
      const planName: string = row.getValue("subscription_name");
      return (
        <div className="text-[#555d6a] text-sm font-semibold text-center">
          {planName || "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "total_spend",
    header: () => <div className="text-center">Total Spend</div>,
    cell: ({ row }) => {
      const totalSpend: number = row.getValue("total_spend");
      return (
        <div className="text-[#555d6a] text-sm font-semibold text-center">
          ${totalSpend}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1 select-none cursor-pointer justify-center"
        >
          <p className="text-[#2b3545] text-sm font-medium">Status</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M4.66663 9.99935L7.99996 13.3327L11.3333 9.99935M4.66663 5.99935L7.99996 2.66602L11.3333 5.99935"
              stroke="#111928"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      );
    },
    cell: ({ row }) => {
      const status: string = row.getValue("status");
      const getStatus = (status: string) => {
        if (status.toLowerCase() === "active") {
          return "green";
        } else {
          return "red";
        }
      };

      return (
        <div className="flex items-center justify-center">
          <Badge text={status} variant={getStatus(status)} />
        </div>
      );
    },
  },
];
