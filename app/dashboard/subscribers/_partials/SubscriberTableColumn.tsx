import Badge from '@/components/badge/Badge';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';

export type SubscriberTableColumnDataType = {
    id: number;
    dealer_name: string;
    img?: string;
    created_at: Date;
    plan_name: string;
    total_spend: number;
    status: string;
}

export const subscriberTableColumns: ColumnDef<SubscriberTableColumnDataType>[] = [
    {
        accessorKey: "id",
        header: "Dealer Id",
        size: 80
    },
    {
        accessorKey: "dealer_name",
        header: ({ column }) => {
            return (
                <div
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className='flex items-center gap-1 select-none cursor-pointer justify-center'
                >
                    <p className="text-[#2b3545] text-sm font-medium">Dealer Name</p>
                    <ArrowUpDown className="size-4" />
                </div>
            )
        },
        cell: ({ row }) => {
            const dealerName: string = row.getValue("dealer_name");
            const dealerImg: string = row.getValue("img");
            const dealerCreaterAt: Date = row.getValue("created_at");
            return (
                <div className='flex gap-2'>
                    <Image
                        src={dealerImg || "/images/user-1.png"}
                        alt='user'
                        width={36}
                        height={36}
                        className='size-[36px] rounded-full object-cover'
                    />
                    <div>
                        <h4 className="text-sm font-medium text-gray-700">{dealerName}</h4>
                        <p className='text-xs font-normal text-gray-600'>Member Since<span className='font-medium ml-1'>{moment(dealerCreaterAt).format("MMM, YYYY")}</span></p>
                    </div>
                </div>
            )
        },
        size: 200
    },
    {
        accessorKey: "plan_name",
        header: "Plan Name",
    },
    {
        accessorKey: "total_spend",
        header: () => <div className="text-center">Total Spend</div>,
        cell: ({ row }) => {
            const totalSpend: number = row.getValue("total_spend");
            return (
                <div className="text-[#555d6a] text-sm font-semibold text-center">${totalSpend}</div>
            )
        }
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <div
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className='flex items-center gap-1 select-none cursor-pointer justify-center'
                >
                    <p className="text-[#2b3545] text-sm font-medium">Status</p>
                    <ArrowUpDown className="size-4" />
                </div>
            )
        },
        cell: ({ row }) => {
            const status: string = row.getValue("status");
            const getStatus = (status: string) => {
                if (status.toLowerCase() === "active") {
                    return "green";
                } else {
                    return "red";
                }
            }

            return (
                <div className='flex items-center justify-center'>
                    <Badge
                        text={status}
                        variant={getStatus(status)}
                    />
                </div>
            );
        }
    },
]