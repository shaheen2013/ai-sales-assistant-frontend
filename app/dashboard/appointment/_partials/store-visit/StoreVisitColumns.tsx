import Badge from '@/components/badge/Badge';
import { Checkbox } from '@/components/shadcn/checkbox';
import { StoreVisitResponseType } from '@/types/appointmentBookingSliceType';
import { ColumnDef } from '@tanstack/react-table';
import { Phone } from 'lucide-react';
import moment from 'moment';

export const storeVisitColumns = ({ handleChangeVisitStatus }: { handleChangeVisitStatus: (checked: boolean, id: number) => void }): ColumnDef<StoreVisitResponseType>[] => {
  return [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => row.original?.customer?.name || "N/A",
    },
    {
      accessorKey: "schedule_date",
      header: "Scheduled Date & Time",
      cell: ({ row }) => `${moment(row.original?.created_at).format("MMM DD, YYYY")} | ${moment(row.original?.created_at).format("hh:mm a")}`,
    },
    {
      accessorKey: "visit_reason",
      header: "Visit Reason",
      cell: ({ row }) => row.original?.visit_reason || "N/A",
    },
    {
      accessorKey: "Visited",
      header: () => <div className="text-center">Visited</div>,
      cell: ({ row }) => {
        return (
          <div>
            <Checkbox
              wrapperClassName='border-none flex justify-center items-center'
              checked={row.original?.is_visited}
              onCheckedChange={(checked) => handleChangeVisitStatus(Boolean(checked), row.original?.id)}
            />
          </div>
        );
      }
    }
  ]
}