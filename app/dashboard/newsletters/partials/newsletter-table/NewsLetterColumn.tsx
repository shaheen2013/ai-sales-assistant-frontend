import Badge from '@/components/badge/Badge';
import { DropdownMenu } from '@/components/partials/dashboard/dashboard-dropdown';
import { Button } from '@/components/shadcn/button';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/shadcn/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/shadcn/tooltip';
import { shortenFileName } from '@/lib/utils';
import { NewsLetterResponseType } from '@/types/newsletterType';
import { ColumnDef } from '@tanstack/react-table';
import { Eye, MoreHorizontal } from 'lucide-react';
import moment from 'moment';
import Link from 'next/link';

type NewsLetterColumnPropsType = { 
  handleDelete: (id: number) => void;
  setSelectedNewsLetter: (data: NewsLetterResponseType | null) => void;
  setOpenViewModal: (open: boolean) => void;
}

export const newsLetterColumns = ({ handleDelete, setSelectedNewsLetter, setOpenViewModal }: NewsLetterColumnPropsType): ColumnDef<NewsLetterResponseType>[] => {
  return [
    // {
    //   accessorKey: "name",
    //   header: "Name",
    //   cell: ({ row }) => row.original?.name || "N/A",
    //   size: 70,
    // },
    {
      accessorKey: "subject",
      header: "Subject",
      cell: ({ row }) => `${row.original?.subject || "N/A"}`,
      size: 100,
    },
    {
      accessorKey: "summary",
      header: "Summary",
      cell: ({ row }) => (
        <>
          {
            row.original?.summary?.length > 150 ? <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className='line-clamp-2 max-w-fit'>{row.original?.summary || "N/A"}</div>
                </TooltipTrigger>
                <TooltipContent className='max-w-sm' align='center' side='top'>
                  <p className='text-gray-50 font-normal text-sm'>{row.original?.summary || "N/A"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider> : <div>{row.original?.summary || "N/A"}</div>
          }
        </>

      ),
      size: 300,
    },
    {
      accessorKey: "files",
      header: "Files",
      cell: ({ row }) => {
        const variants = ['green', 'purple', 'orange', 'red', 'blue']
        return (
          <div className='flex gap-2 flex-wrap'>
            {
              row?.original?.files?.map((item, index) => (
                <Link href={item} key={index} target='_blank'>
                  <Badge
                    variant={variants[index] as any}
                    text={shortenFileName(item?.split("/")[item?.split("/").length - 1])}
                    isDot={false}
                  />
                </Link>
              ))
            }
          </div>
        )
      },
      size: 200,
    },
    {
      accessorKey: "created_at",
      header: "Date",
      cell: ({ row }) => `${moment.utc(row.original?.created_at).format("MMM DD, YYYY | hh:mm A") || "N/A"}`,
      size: 120,
    },
    {
      id: 'actions',
      header: ({ }) => {
        return (
          <h2 className="flex items-center text-center gap-2 cursor-pointer">
            Action
          </h2>
        );
      },
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  setSelectedNewsLetter(row.original);
                  setOpenViewModal(true);
                }}
              >
                <Eye className="h-5 w-5" />
                <span className="text-gray-500">View</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDelete(row.original.id)}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.5 4H11.5C11.5 3.17157 10.8284 2.5 10 2.5C9.17157 2.5 8.5 3.17157 8.5 4ZM7.5 4C7.5 2.61929 8.61929 1.5 10 1.5C11.3807 1.5 12.5 2.61929 12.5 4H17.5C17.7761 4 18 4.22386 18 4.5C18 4.77614 17.7761 5 17.5 5H16.4456L15.2521 15.3439C15.0774 16.8576 13.7957 18 12.2719 18H7.72813C6.20431 18 4.92256 16.8576 4.7479 15.3439L3.55437 5H2.5C2.22386 5 2 4.77614 2 4.5C2 4.22386 2.22386 4 2.5 4H7.5ZM5.74131 15.2292C5.85775 16.2384 6.71225 17 7.72813 17H12.2719C13.2878 17 14.1422 16.2384 14.2587 15.2292L15.439 5H4.56101L5.74131 15.2292ZM8.5 7.5C8.77614 7.5 9 7.72386 9 8V14C9 14.2761 8.77614 14.5 8.5 14.5C8.22386 14.5 8 14.2761 8 14V8C8 7.72386 8.22386 7.5 8.5 7.5ZM12 8C12 7.72386 11.7761 7.5 11.5 7.5C11.2239 7.5 11 7.72386 11 8V14C11 14.2761 11.2239 14.5 11.5 14.5C11.7761 14.5 12 14.2761 12 14V8Z"
                    fill="#D92D21"
                  />
                </svg>
                <span className="font-medium text-red-500">Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      size: 60,
    },
  ]
}