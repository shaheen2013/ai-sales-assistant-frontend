import Badge from '@/components/badge/Badge';
import { Button } from '@/components/shadcn/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/shadcn/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Phone } from 'lucide-react';

export type TalkToHumanColumnDataType = {
  id: number;
  name: string;
  category: { label: string, value: string }[];
  schedule_date: string;
  priority: string;
}

export const talkToHumanColumns: ColumnDef<TalkToHumanColumnDataType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category",
    header: () => <div className="text-center">Category</div>,
    cell: ({ row }) => {
      const categories = row.getValue("category");
      const getCategoryVariant = (category: string) => {
        if (category === "car_buying") {
          return "blue";
        } else if (category === "car_information") {
          return "purple";
        } else if (category === "suggestions") {
          return "orange";
        }

        return "blue";
      }

      return (
        <div className="flex flex-col gap-1 items-center">
          {Array.isArray(categories) ? categories?.map((category, index) => (
            <Badge
              text={category.label}
              variant={getCategoryVariant(category?.value)}
              key={index}
            />
          )) : "N/A"}
        </div>
      );
    }
  },
  {
    accessorKey: "schedule_date",
    header: "Scheduled Date & Time",
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority: string = row.getValue("priority");
      const getCategoryVariant = (priority: string) => {
        if (priority.toLowerCase() === "high") {
          return "green";
        } else if (priority.toLowerCase() === "medium") {
          return "blue";
        } else if (priority.toLowerCase() === "low") {
          return "red";
        }

        return "blue";
      }

      return (
        <div className='flex items-center justify-center'>
          <Badge
          text={priority}
          variant={getCategoryVariant(priority)}
        />
        </div>
      );
    }
  },
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