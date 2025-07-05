import Badge from "@/components/badge/Badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import { cn } from "@/lib/utils";
import { TestDriveResponseType } from "@/types/appointmentBookingSliceType";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";
import moment from "moment";

export type TechnicalVisitColumnsDataType = {
  id: number;
  name: string;
  schedule_date: string;
  priority: string;
};

export const testDriveVisitsColumns = ({
  handleChangeBookingStatus,
}: {
  handleChangeBookingStatus: (status: string, id: number) => void;
}): ColumnDef<TestDriveResponseType>[] => {
  return [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => row.original?.customer?.name || "N/A",
    },
    {
      accessorKey: "schedule_date",
      header: "Scheduled Date & Time",
      cell: ({ row }) =>
        row.original?.start_at
          ? `${moment
              .utc(row.original?.start_at)
              .format("MMM DD, YYYY")} | ${moment
              .utc(row.original?.start_at)
              .format("hh:mm a")}`
          : "N/A",
    },
    {
      accessorKey: "Booking Status",
      header: () => <div className="text-center">Booking Status</div>,
      cell: ({ row }) => {
        const status: string = row.original.booking_status;
        const getCategoryVariant = (priority: string) => {
          if (priority?.toLowerCase() === "completed") {
            return "green";
          } else if (priority?.toLowerCase() === "approved") {
            return "blue";
          } else if (priority?.toLowerCase() === "failed") {
            return "red";
          }

          return "blue";
        };

        return (
          <div className="flex items-center justify-center">
            <Badge text={status} variant={getCategoryVariant(status)} />
          </div>
        );
      },
    },
    {
      accessorKey: "action",
      header: () => <div className="text-center">Action</div>,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center justify-center cursor-pointer">
                <MoreVertical className="w-4 h-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <div className="flex flex-col gap-2">
                {["approved", "failed", "completed"].map((item, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={() =>
                      handleChangeBookingStatus(item, row.original.id)
                    }
                    className={cn(
                      item === row.original.booking_status && "bg-primary-50",
                      "capitalize"
                    )}
                  >
                    {item}
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
