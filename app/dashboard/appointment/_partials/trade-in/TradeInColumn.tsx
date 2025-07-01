import { Checkbox } from '@/components/shadcn/checkbox';
import { TradeInResponseType } from '@/types/appointmentBookingSliceType';
import { ColumnDef } from '@tanstack/react-table';
import moment from 'moment';

export const tradeInColumns = ({ handleChangeVisitStatus }: { handleChangeVisitStatus: (checked: boolean, id: number) => void }): ColumnDef<TradeInResponseType>[] => {
  return [
    {
      accessorKey: "model_name",
      header: "Model Name",
      cell: ({ row }) => row.original?.model_name || "N/A",
    },
    {
      accessorKey: "manufacturing_date",
      header: "Manufacturing Date",
      cell: ({ row }) => `${moment.utc(row.original?.manufacturing_date).format("YYYY")}`,
    },
    {
      accessorKey: "buying_date",
      header: "Buying Date",
      cell: ({ row }) => `${moment.utc(row.original?.buying_date).format("MMM DD, YYYY")}`,
    },
    {
      accessorKey: "defects",
      header: "Defects",
      cell: ({ row }) => row.original?.defects || "N/A",
    },
    {
      accessorKey: "purchase_price",
      header: "Price",
      cell: ({ row }) => `$${row.original?.purchase_price}` || "N/A",
    },
    {
      accessorKey: "ai_suggested_trade_in_price",
      header: "AI Suggested Trade In Price",
      cell: ({ row }) => `$${row.original?.ai_suggested_trade_in_price}` || "N/A",
    },
    {
      accessorKey: "created_at",
      header: "Date",
      cell: ({ row }) => `${moment.utc(row.original?.buying_date).format("MMM DD, YYYY") || "N/A"}`,
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