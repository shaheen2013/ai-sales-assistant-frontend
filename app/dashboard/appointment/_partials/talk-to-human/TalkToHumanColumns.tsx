import { Checkbox } from '@/components/shadcn/checkbox';
import { TalkToHumanResponseType } from '@/types/appointmentBookingSliceType';
import { ColumnDef } from '@tanstack/react-table';
import moment from 'moment';

export type TalkToHumanColumnDataType = {
  id: number;
  name: string;
  category: { label: string, value: string }[];
  schedule_date: string;
  priority: string;
}

export const talkToHumanColumns = ({ handleChangeTalkStatus }: { handleChangeTalkStatus: (checked: boolean, id: number) => void }): ColumnDef<TalkToHumanResponseType>[] => {
  return [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => row.original.customer,
    },
    {
      accessorKey: "schedule_date",
      header: "Scheduled Date & Time",
      cell: ({ row }) => `${moment(row.original?.created_at).format("MMM DD, YYYY")} | ${moment(row.original?.created_at).format("hh:mm a")}`,
    },
    {
      accessorKey: "action",
      header: () => <div className="text-center">Talked</div>,
      cell: ({ row }) => {
        return (
          <div>
            <Checkbox
              wrapperClassName='border-none flex justify-center items-center'
              checked={row.original?.is_talked}
              onCheckedChange={(checked) => handleChangeTalkStatus(Boolean(checked), row.original?.id)}
            />
          </div>
        );
      }
    }
  ]
}