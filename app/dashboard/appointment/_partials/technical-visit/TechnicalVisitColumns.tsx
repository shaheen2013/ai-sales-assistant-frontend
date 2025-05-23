import Badge from '@/components/badge/Badge';
import { TestDriveResponseType } from '@/types/appointmentBookingSliceType';
import { ColumnDef } from '@tanstack/react-table';
import { Phone } from 'lucide-react';
import moment from 'moment';

export type TechnicalVisitColumnsDataType = {
  id: number;
  name: string;
  schedule_date: string;
  priority: string;
}

export const technicalVisitsColumns: ColumnDef<TestDriveResponseType>[] = [
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
  // {
  //   accessorKey: "priority",
  //   header: () => <div className="text-center">Priority</div>,
  //   cell: ({ row }) => {
  //     const priority: string = row.getValue("priority");
  //     const getCategoryVariant = (priority: string) => {
  //       if (priority?.toLowerCase() === "high") {
  //         return "green";
  //       } else if (priority?.toLowerCase() === "medium") {
  //         return "blue";
  //       } else if (priority?.toLowerCase() === "low") {
  //         return "red";
  //       }

  //       return "blue";
  //     }

  //     return (
  //       <div className='flex items-center justify-center'>
  //         <Badge
  //         text={priority}
  //         variant={getCategoryVariant(priority)}
  //       />
  //       </div>
  //     );
  //   }
  // },
  {
    accessorKey: "action",
    header: () => <div className="text-center">Action</div>,
    cell: ({ }) => {
      return (
        <div className='p-1.5 bg-primary-500 rounded-lg outline outline-1 outline-offset-[-1px] outline-gray-50 max-w-fit mx-auto'>
          <Phone className='size-5 text-white' />
        </div>
      );
    }
  }
]