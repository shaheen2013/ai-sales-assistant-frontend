import { useState } from "react";

import {
  ColumnDef,
  flexRender,
  SortingState,
  VisibilityState,
  useReactTable,
  getCoreRowModel,
  ColumnFiltersState,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import moment from "moment";
import Image from "next/image";
import { MoreVerticalIcon } from "lucide-react";

import {
  Select,
  SelectItem,
  SelectValue,
  SelectGroup,
  SelectTrigger,
  SelectContent,
} from "@/components/shadcn/select";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogHeader,
} from "@/components/shadcn/dialog";

import {
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  TableHeader,
} from "@/components/shadcn/table";
import { useToast } from "@/hooks/useToast";
import { Button } from "@/components/shadcn/button";
import { SupportTicketType } from "@/types/supportTicketType";
import TableSkeleton from "@/components/skeleton/TableSkeleton";

import {
  // useGetAdminAllSupportTicketsQuery,
  useDeleteAdminSupportTicketMutation,
  useUpdateAdminSupportTicketMutation,
} from "@/features/admin/adminSupportSlice";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/shadcn/dropdown-menu";

import { beautifyErrors } from "@/lib/utils";

import Badge from "@/components/badge/Badge";
import { Controller, useForm } from "react-hook-form";
import { Input, InputCopy } from "@/components/shadcn/input";
import { Textarea } from "@/components/shadcn/textarea";

export default function SupportTable({
  data,
  loading,
  sortBy,
  setSortBy,
}: {
  data: SupportTicketType[];
  loading: boolean;
  sortBy: string;
  setSortBy: (sort: string) => void;
}) {
  /*--Custom Hooks--*/
  const toast = useToast();

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      id: "",
      status: "",
      subject: "",
      ticket_id: "",
      description: "",
      dealer: {
        id: "",
        name: "",
        email: "",
        phone: "",
        profile_picture: "",
      },

      created_at: "",
      updated_at: "",
    },
  });

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [openEditModal, setOpenEditModal] = useState(false);

  /*--RTK Query--*/
  const [deleteSupportTicket, { isLoading: deleteTicketLoading }] =
    useDeleteAdminSupportTicketMutation();

  const [updateSupportTicket, { isLoading: updateSupportTicketLoading }] =
    useUpdateAdminSupportTicketMutation();

  /*--Functions--*/
  const handleDeleteTicket = async (id: string) => {
    try {
      await deleteSupportTicket(id);
      toast("success", "Ticket deleted successfully!");
    } catch (err) {
      toast("error", beautifyErrors(err));
    }
  };

  const handleEditClick = (id: string | number) => {
    setOpenEditModal(true);

    const selectedTicket: any = data.find((ticket) => ticket.id === id);

    setValue("id", selectedTicket?.id);
    setValue("status", selectedTicket?.status);
    setValue("subject", selectedTicket?.subject);
    setValue("ticket_id", selectedTicket?.ticket_id);
    setValue("description", selectedTicket?.description);
    setValue("dealer", {
      id: selectedTicket?.dealer?.id || null,
      name: selectedTicket?.dealer?.name || null,
      email: selectedTicket?.dealer?.email || null,
      phone: selectedTicket?.dealer?.phone || null,
      profile_picture: selectedTicket?.dealer?.profile_picture || null,
    });
    setValue("created_at", selectedTicket?.created_at);
    setValue("updated_at", selectedTicket?.updated_at);
  };

  const handleEditSupportTicket = async (formData: any) => {
    try {
      const { error } = await updateSupportTicket({
        ticketId: formData?.ticket_id,
        data: formData,
      });

      if (error) {
        console.log("Error updating ticket:", error);
        toast("error", beautifyErrors(error));
        return;
      }

      //   close modal
      setOpenEditModal(false);
    } catch (err) {
      toast("error", beautifyErrors(err));
    }
  };

  const handleInventoryDelete = async (id: string | number) => {
    const confirm = window.confirm(
      "Are you sure you want to delete? This action cannot be undone."
    );

    if (!confirm) {
      return;
    }

    try {
      const { data, error } = await deleteSupportTicket(String(id));

      if (error) {
        console.log("Error deleting ticket:", error);
        toast("error", beautifyErrors(error));
        return;
      }

      console.log("Ticket deleted successfully:", data);
      toast("success", "Ticket deleted successfully!");
    } catch (error) {
      console.error("Error deleting ticket:", error);
      toast("error", "Something went wrong while deleting the ticket.");
    }
  };

  const columns: ColumnDef<SupportTicketType>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <div className="font-medium text-gray-400">{row.getValue("id")}</div>
      ),
    },

    {
      accessorKey: "dealer_name",
      header: "Dealer Name",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            {row?.original?.dealer?.profile_picture ? (
              <Image
                src={row?.original?.dealer?.profile_picture}
                alt=""
                height="30"
                width="30"
                className="rounded-full h-7 w-7 object-cover"
              />
            ) : (
              <svg
                width="30"
                height="30"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 0C10.4738 0.0047955 8.00356 0.743473 5.89009 2.12606C3.77663 3.50864 2.11118 5.47546 1.09661 7.78695C0.082046 10.0984 -0.237855 12.6548 0.175876 15.1447C0.589607 17.6346 1.71911 19.9506 3.42682 21.8105C4.64648 23.1315 6.12677 24.1857 7.77439 24.9067C9.42202 25.6278 11.2013 26 13 26C14.7987 26 16.578 25.6278 18.2256 24.9067C19.8732 24.1857 21.3535 23.1315 22.5732 21.8105C24.2809 19.9506 25.4104 17.6346 25.8241 15.1447C26.2379 12.6548 25.918 10.0984 24.9034 7.78695C23.8888 5.47546 22.2234 3.50864 20.1099 2.12606C17.9964 0.743473 15.5262 0.0047955 13 0ZM13 23.4242C10.3019 23.4201 7.71054 22.3705 5.77127 20.4962C6.36004 19.0641 7.36163 17.8392 8.64876 16.9772C9.93589 16.1152 11.4505 15.6549 13 15.6549C14.5495 15.6549 16.0641 16.1152 17.3512 16.9772C18.6384 17.8392 19.64 19.0641 20.2287 20.4962C18.2895 22.3705 15.6981 23.4201 13 23.4242ZM10.3951 10.4108C10.3951 9.896 10.5478 9.39279 10.8341 8.96478C11.1203 8.53677 11.5271 8.20318 12.0031 8.00619C12.4791 7.8092 13.0029 7.75766 13.5082 7.85808C14.0135 7.95851 14.4777 8.20639 14.842 8.57038C15.2063 8.93437 15.4544 9.39813 15.5549 9.903C15.6554 10.4079 15.6038 10.9312 15.4067 11.4068C15.2095 11.8823 14.8756 12.2888 14.4472 12.5748C14.0188 12.8608 13.5152 13.0135 13 13.0135C12.3091 13.0135 11.6465 12.7392 11.158 12.2511C10.6695 11.763 10.3951 11.101 10.3951 10.4108ZM22.0001 18.2188C20.8364 16.2301 19.0453 14.6831 16.9074 13.8203C17.5706 13.069 18.0027 12.1424 18.1519 11.1518C18.3011 10.1612 18.161 9.1486 17.7485 8.23556C17.336 7.32251 16.6685 6.54779 15.8262 6.00436C14.984 5.46093 14.0026 5.17187 13 5.17187C11.9974 5.17187 11.016 5.46093 10.1738 6.00436C9.33147 6.54779 8.66403 7.32251 8.2515 8.23556C7.83898 9.1486 7.69891 10.1612 7.8481 11.1518C7.99729 12.1424 8.4294 13.069 9.09258 13.8203C6.9547 14.6831 5.16362 16.2301 3.99991 18.2188C3.07247 16.6404 2.58245 14.8437 2.58021 13.0135C2.58021 10.2523 3.67801 7.60433 5.6321 5.65193C7.58618 3.69954 10.2365 2.60269 13 2.60269C15.7635 2.60269 18.4138 3.69954 20.3679 5.65193C22.322 7.60433 23.4198 10.2523 23.4198 13.0135C23.4176 14.8437 22.9275 16.6404 22.0001 18.2188Z"
                  fill="#019935"
                ></path>
              </svg>
            )}

            <span className="text-gray-400">{row.original.dealer?.name}</span>
          </div>
        );
      },
    },

    {
      accessorKey: "email",
      accessorFn: (row) => row.dealer?.email,
      header: ({ column }) => {
        return (
          <h2
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email & Phone
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.6665 9.99935L7.99984 13.3327L11.3332 9.99935M4.6665 5.99935L7.99984 2.66602L11.3332 5.99935"
                stroke="#111928"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </h2>
        );
      },
      cell: ({ row }) => (
        <div className="text-gray-400">
          <div>{row.original?.dealer?.email}</div>
          <div>{row.original?.dealer?.phone}</div>
        </div>
      ),
    },

    {
      accessorKey: "subject",
      header: ({ column }) => {
        return (
          <h2
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Topic
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.6665 9.99935L7.99984 13.3327L11.3332 9.99935M4.6665 5.99935L7.99984 2.66602L11.3332 5.99935"
                stroke="#111928"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </h2>
        );
      },
      cell: ({ row }) => (
        <div className="text-gray-400">
          <div>{row.original?.subject}</div>
        </div>
      ),
    },

    {
      accessorKey: "created_at",
      header: ({ column }) => {
        return (
          <h2
            className="flex items-center text-center gap-2 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created Date
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.6665 9.99935L7.99984 13.3327L11.3332 9.99935M4.6665 5.99935L7.99984 2.66602L11.3332 5.99935"
                stroke="#111928"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </h2>
        );
      },
      cell: ({ row }) => {
        const date = new Date(row.original?.created_at).toLocaleDateString(
          "en-US",
          {
            day: "2-digit",
            month: "short", // Outputs "Feb"
            year: "numeric",
          }
        );

        const time = new Date(row.original?.created_at).toLocaleTimeString(
          "en-US",
          {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit", // Add seconds
            hour12: true, // Ensures AM/PM format
          }
        );

        return (
          <div className=" font-medium text-gray-400">
            <div>{date}</div>
            <div>{time}</div>
          </div>
        );
      },
    },

    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <h2
            className="flex items-center text-center gap-2 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.6665 9.99935L7.99984 13.3327L11.3332 9.99935M4.6665 5.99935L7.99984 2.66602L11.3332 5.99935"
                stroke="#111928"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </h2>
        );
      },
      cell: ({ row }) => {
        function getStatusColor(status: string) {
          if (status.toLowerCase() === "open") {
            return "green";
          } else if (status.toLowerCase() === "closed") {
            return "red";
          } else if (status.toLowerCase() === "in_progress") {
            return "blue";
          } else if (status.toLowerCase() === "resolved") {
            return "purple";
          }

          return "blue";
        }
        const status = row.original?.status?.split("_").join(" ");

        return <Badge text={status} variant={getStatusColor(status)} />;
      },
    },

    {
      id: "actions",
      header: ({}) => {
        return (
          <h2 className="flex items-center text-center gap-2 cursor-pointer">
            Action
          </h2>
        );
      },
      cell: ({ row }) => {
        return (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreVerticalIcon className="w-10  h-10 " />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => {
                    handleEditClick(row?.original?.id);
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.1813 2.92689C16.0291 1.71505 14.1047 1.69077 12.9222 2.87317L3.54741 12.2475C3.21958 12.5754 2.99204 12.9899 2.89148 13.4424L2.01387 17.3923C1.97678 17.5592 2.02754 17.7335 2.14844 17.8544C2.26934 17.9753 2.44362 18.026 2.6105 17.9889L6.53689 17.1157C7.00432 17.0118 7.43243 16.7767 7.77103 16.4381L17.129 7.08003C18.27 5.939 18.2933 4.09631 17.1813 2.92689ZM13.6293 3.58029C14.4143 2.79538 15.6917 2.8115 16.4566 3.61596C17.1948 4.39225 17.1793 5.61548 16.4219 6.37293L15.7507 7.04418L12.958 4.25155L13.6293 3.58029ZM12.2509 4.95864L15.0436 7.7513L7.06391 15.731C6.85976 15.9352 6.60164 16.0769 6.31982 16.1396L3.1605 16.8421L3.86768 13.6593C3.92698 13.3924 4.06117 13.148 4.2545 12.9547L12.2509 4.95864Z"
                      fill="#333741"
                    />
                  </svg>
                  <span className="text-gray-500">Edit</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => {
                    // confirmation dialog
                    handleInventoryDelete(row?.original?.ticket_id);
                  }}
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
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div>
      {/* top */}
      <div className="flex justify-between mb-4">
        <h2 className="font-semibold text-lg text-gray-300">Support Tickets</h2>

        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger
              className="w-[100px] data-[placeholder]:!text-primary-500 text-primary-500 font-medium"
              postIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M2.21967 6.46967C2.51256 6.17678 2.98744 6.17678 3.28033 6.46967L10 13.1893L16.7197 6.46967C17.0126 6.17678 17.4874 6.17678 17.7803 6.46967C18.0732 6.76256 18.0732 7.23744 17.7803 7.53033L10.5303 14.7803C10.2374 15.0732 9.76256 15.0732 9.46967 14.7803L2.21967 7.53033C1.92678 7.23744 1.92678 6.76256 2.21967 6.46967Z"
                    fill="#019935"
                  />
                </svg>
              }
            >
              <SelectValue placeholder="Sort By" className="" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectGroup>
                <SelectItem value="created_at" className="!text-primary-500">
                  Time
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* table */}
      <div className="">
        <div className="w-full">
          <div>
            <Table>
              <TableHeader className="">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} className="text-[#2B3545]">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="space-y-2">
                      <TableSkeleton />
                    </TableCell>
                  </TableRow>
                ) : (
                  <>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && "selected"}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="h-24 text-center"
                        >
                          No results.
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Support Dialog */}
      <Dialog open={openEditModal} onOpenChange={setOpenEditModal}>
        <DialogContent className="max-w-[700px] max-h-[90vh] overflow-hidden flex flex-col p-4">
          <DialogHeader className="text-[#717882] text-xl font-semibold flex items-center flex-row justify-between border-b border-[#eff4fa] pb-4 mb-4">
            <DialogTitle>Dealer Support Details</DialogTitle>
          </DialogHeader>

          <div className="overflow-auto h-full ">
            <form onSubmit={handleSubmit(handleEditSupportTicket)}>
              <div className="grid grid-cols-12 gap-4">
                {/* Top Info: Dealer ID and Ticket ID */}
                <div className="col-span-12 grid grid-cols-12 gap-4 border-b border-[#eff4fa] pb-4">
                  <Controller
                    name="dealer.id"
                    control={control}
                    rules={{ required: "VIN Number is required" }}
                    render={({ field, formState: { errors } }) => (
                      <InputCopy
                        type="input"
                        id="dealerId"
                        label="Dealer ID"
                        error={errors.dealer?.id?.message}
                        value={field.value}
                        copyText={field.value}
                        disabled
                        wrapperClassName="col-span-12 md:col-span-6"
                      />
                    )}
                    disabled
                  />

                  <Controller
                    name="id"
                    control={control}
                    rules={{ required: "VIN Number is required" }}
                    render={({ field, formState: { errors } }) => (
                      <InputCopy
                        type="input"
                        id="supportTicketId"
                        label="Support Ticket Id"
                        error={errors.id?.message}
                        value={field.value}
                        copyText={field.value}
                        disabled
                        wrapperClassName="col-span-12 md:col-span-6"
                      />
                    )}
                    disabled
                  />
                </div>

                {/* Dealer Name */}
                <Controller
                  name="dealer.name"
                  control={control}
                  render={({ field, formState: { errors } }) => (
                    <Input
                      placeholder="e.g. John Doe"
                      label="Dealer Name"
                      className="rounded-lg h-11"
                      wrapperClassName="col-span-12"
                      disabled
                      value={field.value}
                    />
                  )}
                  disabled
                />

                {/* Email */}
                <Controller
                  name="dealer.email"
                  control={control}
                  render={({ field, formState: { errors } }) => (
                    <Input
                      className="rounded-lg h-11"
                      placeholder="dealer@teez.com"
                      label="Email"
                      wrapperClassName="col-span-12 md:col-span-6"
                      disabled
                      value={field.value || "N/A"}
                    />
                  )}
                  disabled
                />

                {/* Phone */}
                <Controller
                  name="dealer.phone"
                  control={control}
                  rules={{ required: "VIN Number is required" }}
                  render={({ field, formState: { errors } }) => (
                    <Input
                      className="rounded-lg h-11 disabled:!text-[#A4A7AE]"
                      label="Phone"
                      wrapperClassName="col-span-12 md:col-span-6"
                      disabled
                      value={field.value || "N/A"}
                    />
                  )}
                  disabled
                />

                {/* Created Date */}
                <Controller
                  name="created_at"
                  control={control}
                  rules={{ required: "VIN Number is required" }}
                  render={({ field, formState: { errors } }) => (
                    <Input
                      className="rounded-lg h-11"
                      placeholder="Today 22 Oct, 2025"
                      label="Created Date"
                      wrapperClassName="col-span-12 sm:col-span-6"
                      disabled
                      value={moment(field.value).format("DD MMM, YYYY")}
                    />
                  )}
                  disabled
                />

                {/* Created Time */}
                <Controller
                  name="created_at"
                  control={control}
                  rules={{ required: "VIN Number is required" }}
                  render={({ field, formState: { errors } }) => (
                    <Input
                      className="rounded-lg h-11"
                      placeholder="06:00 AM"
                      label="Created Time"
                      wrapperClassName="col-span-12 sm:col-span-6"
                      disabled
                      value={moment(field.value).format("hh:mm A")}
                    />
                  )}
                  disabled
                />

                {/* Problem Summary */}
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: "VIN Number is required" }}
                  render={({ field, formState: { errors } }) => (
                    <Textarea
                      label="Problem Summary"
                      placeholder="Problem description"
                      className="min-h-[98px]"
                      wrapperClassName="col-span-12"
                      value={field.value}
                      helperText="This is the problem description provided by the dealer."
                      disabled
                    />
                  )}
                  disabled
                />

                {/* Status Select */}
                <div className="col-span-12">
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="open">Open</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                            <SelectItem value="in_progress">
                              In Progress
                            </SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              {/* Button Row */}
              <div className="flex flex-col sm:flex-row items-center justify-end gap-4 mt-8 mb-3">
                <Button
                  //   variant="red"
                  className="text-sm !font-medium min-w-[85px] w-full sm:w-auto bg-red-500"
                  loading={deleteTicketLoading}
                  disabled={deleteTicketLoading}
                  type="button"
                  onClick={() => {
                    setOpenEditModal(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  className="text-sm !font-medium min-w-[187px] w-full sm:w-auto"
                  loading={updateSupportTicketLoading}
                  disabled={updateSupportTicketLoading}
                >
                  Update Information
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
