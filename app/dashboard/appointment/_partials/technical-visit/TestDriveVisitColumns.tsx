import Badge from '@/components/badge/Badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/shadcn/dropdown-menu';
import { cn } from '@/lib/utils';
import { TestDriveResponseType } from '@/types/appointmentBookingSliceType';
import { ColumnDef } from '@tanstack/react-table';
import { MoreVertical, Phone } from 'lucide-react';
import moment from 'moment';

export type TechnicalVisitColumnsDataType = {
  id: number;
  name: string;
  schedule_date: string;
  priority: string;
}

export const testDriveVisitsColumns: ColumnDef<TestDriveResponseType>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => row.original?.name || "N/A",
  },
  {
    accessorKey: "schedule_date",
    header: "Scheduled Date & Time",
    cell: ({ row }) => `${moment(row.original?.starts_at).format("MMM DD, YYYY")} | ${moment(row.original?.starts_at).format("hh:mm a")}`,
  },
  {
    accessorKey: "Booking Status",
    header: () => <div className="text-center">Booking Status</div>,
    cell: ({ row }) => {
      // const priority: string = row.getValue("priority");
      const getCategoryVariant = (priority: string) => {
        // if (priority?.toLowerCase() === "high") {
        //   return "green";
        // } else if (priority?.toLowerCase() === "medium") {
        //   return "blue";
        // } else if (priority?.toLowerCase() === "low") {
        //   return "red";
        // }

        return "blue";
      }

      return (
        <div className='flex items-center justify-center'>
          {/* <Badge
            text={priority}
            variant={getCategoryVariant(priority)}
          /> */}
        </div>
      );
    }
  },
  {
    accessorKey: "action",
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className='flex items-center justify-center cursor-pointer'>
              <MoreVertical className='w-4 h-4' />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <div className='flex flex-col gap-2'>
              {
                ["Approved", "Failed", "Completed"].map((item, index) => (
                  <DropdownMenuItem key={index} onClick={() => console.log(item)} className={
                    cn(
                      item === row.original.starts_at && "bg-primary-50",
                    )
                  }>
                    {item}
                  </DropdownMenuItem>
                ))
              }
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
]