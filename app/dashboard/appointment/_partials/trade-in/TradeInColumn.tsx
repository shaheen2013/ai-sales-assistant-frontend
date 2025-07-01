import { TradeInResponseType } from '@/types/appointmentBookingSliceType';
import { ColumnDef } from '@tanstack/react-table';
import moment from 'moment';

export const tradeInColumns = (): ColumnDef<TradeInResponseType>[] => {
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
  ]
}