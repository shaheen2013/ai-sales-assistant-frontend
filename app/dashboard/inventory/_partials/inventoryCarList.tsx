"use client";

import {
  flexRender,
  ColumnDef,
  SortingState,
  VisibilityState,
  useReactTable,
  getCoreRowModel,
  ColumnFiltersState,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

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

import { useMemo, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  TableHeader,
} from "@/components/shadcn/table";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/shadcn/dropdown-menu";

import { beautifyErrors } from "@/lib/utils";
import { useToast } from "@/hooks/useToast";
import { Button } from "@/components/shadcn/button";
import { Skeleton } from "@/components/shadcn/skeleton";
import { Input, InputCopy } from "@/components/shadcn/input";
import { useEditVehicleInventoryMutation } from "@/features/inventory/inventorySlice";

import Pagination from "@/components/pagination/Pagination";

export default function InventoryCarList({
  refetchGetVehicle,
  isLoading = false,
  getVehicleList,
  handleInventoryDelete,
}: any) {
  const toast = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [selectedInventory, setSelectedInventory] = useState<any>(null);

  const { control, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      vin: "",
      brand: "",
      model: "",

      mileage: "",
      year: "",
      series: "",
      trim: "",
      odometer: "",
      odometer_unit: "km",
      exterior_color: "",
      interior_color: "",
      options: "",
    },
  });

  const [editVehicle, { isLoading: isLoadingEditVehicle }] =
    useEditVehicleInventoryMutation();

  const handleEditClick = (id: number) => {
    setSelectedInventory(id);
    setModals((prev) => ({
      ...prev,
      addInventory: !prev.addInventory,
    }));

    const selectedInventory = getVehicleList?.results?.find(
      (item: any) => item.id === id
    );

    // @deprecared values
    // setValue("stockId", String(selectedInventory?.id));
    // setValue("vin", selectedInventory?.vin);
    // setValue("brand", selectedInventory?.brand);
    // setValue("model", selectedInventory?.model);
    // setValue("year", selectedInventory?.year);
    // setValue("mileage", selectedInventory?.mileage);
    // setValue("numberPlate", selectedInventory?.number_plate);
    // setValue("bodyStyle", selectedInventory?.body_style);
    // setValue("engineType", selectedInventory?.engine_type);
    // setValue("fuelType", selectedInventory?.fuel_type);
    // setValue("odometer", selectedInventory?.odometer);
    // setValue("color", selectedInventory?.color);
    // setValue("consign", selectedInventory?.consign);
    // setValue("price", selectedInventory?.price);
    // setValue("dateIn", selectedInventory?.date_in);
    // setValue("dateOut", selectedInventory?.date_out);

    // @ new values
    //     vin: "",
    // brand: "",
    // model: "",

    // mileage: "",
    // year: "",
    // series: "",
    // trim: "",
    // odometer: "",
    // odometer_unit: "km",
    // exterior_color: "",
    // interior_color: "",
    // options: "",
    setValue("vin", selectedInventory?.vin || "");
    setValue("brand", selectedInventory?.brand || "");
    setValue("model", selectedInventory?.model || "");

    setValue("mileage", selectedInventory?.mileage || "");
    setValue("year", selectedInventory?.year || "");
    setValue("series", selectedInventory?.series || "");
    setValue("trim", selectedInventory?.trim || "");
    setValue("odometer", selectedInventory?.odometer || "");
    setValue("odometer_unit", selectedInventory?.odometer_unit || "km");
    setValue("exterior_color", selectedInventory?.exterior_color || "");
    setValue("interior_color", selectedInventory?.interior_color || "");
    setValue("options", selectedInventory?.options || "");

    console.log("selectedInventory", selectedInventory);
  };

  const handleEditInventory = async (formData: any) => {
    try {
      const payload = {
        id: selectedInventory,
        vin: formData.vin,
        brand: formData.brand,
        model: formData.model,

        ...(formData.mileage && { mileage: formData.mileage }),
        ...(formData.year && { year: formData.year }),
        series: formData.series,
        trim: formData.trim,
        odometer: formData.odometer,
        odometer_unit: formData.odometer_unit,
        exterior_color: formData.exterior_color,
        interior_color: formData.interior_color,
        options: formData.options,
      };

      const { data, error } = await editVehicle(payload);

      if (error) {
        console.log(error);
        toast("error", beautifyErrors(error));
        return;
      }

      setModals({ ...modals, addInventory: false });
      reset();
      await refetchGetVehicle();

      console.log("data => ", data);
    } catch (error) {
      console.log("error => ", error);
      toast("error", "Something went wrong");
    }
  };

  const [modals, setModals] = useState({
    addInventory: false,
    addPdf: false,
  });

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <h2
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Stock Id
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
          <div>{row.original?.id || "-"}</div>
        </div>
      ),
    },

    {
      accessorKey: "createdDate",
      header: ({ column }) => {
        return (
          <h2
            className="flex items-center text-center gap-2 cursor-pointer"
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === "asc");
            }}
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
      accessorFn: (row) => new Date(row.created_at),
      sortingFn: "datetime",
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
      accessorKey: "vin",
      header: ({ column }) => {
        return (
          <h2
            className="flex items-center text-center gap-2 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            VIN Number
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
        return (
          <div className=" font-medium text-gray-400">
            {row.original?.vin || "-"}
          </div>
        );
      },
    },

    {
      accessorKey: "brand",
      header: ({ column }) => {
        return (
          <h2
            className="flex items-center text-center gap-2 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Brand
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
        <div className="flex items-center gap-2">
          {/* <Image
            src={`https://picsum.photos/40/40`}
            alt=""
            height="30"
            width="30"
            className="rounded-full"
          /> */}
          <span className="text-gray-400">{row.original?.brand || "-"}</span>
        </div>
      ),
    },

    {
      accessorKey: "model",
      header: ({ column }) => {
        return (
          <h2
            className="flex items-center text-center gap-2 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Model Number
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
        return (
          <div className=" font-medium text-gray-400">
            {row.original?.model || "-"}
          </div>
        );
      },
    },

    {
      accessorKey: "mileage",
      header: ({ column }) => {
        return (
          <h2
            className="flex items-center text-center gap-2 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Mileage
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
        return (
          <div className=" font-medium text-gray-400">
            {row.original?.mileage || "-"}
          </div>
        );
      },
    },

    {
      accessorKey: "year",
      header: ({ column }) => {
        return (
          <h2
            className="flex items-center text-center gap-2 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Year
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
        return (
          <div className=" font-medium text-gray-400">
            {row.original?.year || "-"}
          </div>
        );
      },
    },

    {
      accessorKey: "series",
      header: ({ column }) => {
        return (
          <h2
            className="flex items-center text-center gap-2 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Series
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
        return (
          <div className=" font-medium text-gray-400">
            {row.original?.series || "-"}
          </div>
        );
      },
    },

    {
      accessorKey: "trim",
      header: ({ column }) => {
        return (
          <h2
            className="flex items-center text-center gap-2 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Trim
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
        return (
          <div className=" font-medium text-gray-400">
            {row.original?.trim || "-"}
          </div>
        );
      },
    },

    {
      accessorKey: "odometer",
      header: ({ column }) => {
        return (
          <h2
            className="flex items-center text-center gap-2 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Odometer
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
        return (
          <div className=" font-medium text-gray-400">
            {row.original?.odometer || "-"}
          </div>
        );
      },
    },

    {
      accessorKey: "odometer_unit",
      header: ({ column }) => {
        return (
          <h2
            className="flex items-center text-center gap-2 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Odometer Unit
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
        return (
          <div className=" font-medium text-gray-400">
            {row.original?.odometer_unit || "-"}
          </div>
        );
      },
    },

    {
      accessorKey: "exterior_color",
      header: ({ column }) => {
        return (
          <h2
            className="flex items-center text-center gap-2 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Exterior Color
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
        return (
          <div className=" font-medium text-gray-400">
            {row.original?.exterior_color ? (
              <div
                className="h-8 w-8 rounded-lg border cursor-pointer"
                style={{
                  backgroundColor: row.original?.exterior_color,
                }}
              ></div>
            ) : (
              "-"
            )}
          </div>
        );
      },
    },

    {
      accessorKey: "interior_color",
      header: ({ column }) => {
        return (
          <h2
            className="flex items-center text-center gap-2 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Interior Color
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
        return (
          <div className=" font-medium text-gray-400">
            {row.original?.interior_color ? (
              <div
                className="h-8 w-8 rounded-lg border cursor-pointer"
                style={{
                  backgroundColor: row.original?.interior_color,
                }}
              ></div>
            ) : (
              "-"
            )}
          </div>
        );
      },
    },

    {
      accessorKey: "options",
      header: ({ column }) => {
        return (
          <h2
            className="flex items-center text-center gap-2 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Options
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
        return (
          <div className=" font-medium text-gray-400">
            {row.original?.options || "-"}
          </div>
        );
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
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
                  handleInventoryDelete(row?.original?.id);
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
        );
      },
    },
  ];

  const onPageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  const data: any[] = useMemo(
    () => getVehicleList?.results,
    [getVehicleList?.results]
  );

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

  if (isLoading) {
    return <TableSkeleton />;
  }

  const itemsPerPage = 10; // Assuming backend paginates 10 items per page
  const totalPage = Math.ceil(getVehicleList?.count / itemsPerPage);

  return (
    <>
      <Table>
        <TableHeader>
          {table?.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
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
          {table?.getRowModel()?.rows?.length ? (
            table?.getRowModel()?.rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-end justify-center my-4">
        <Pagination
          page={Number(page)}
          onPageChange={onPageChange}
          totalPage={totalPage}
        />
      </div>

      <Dialog
        open={modals.addInventory}
        onOpenChange={() => {
          setModals((prev) => ({
            ...prev,
            addInventory: !prev.addInventory,
          }));
        }}
      >
        <DialogContent className="sm:max-w-[700px] max-h-full overflow-auto">
          <DialogHeader>
            <DialogTitle>Edit Inventory Details</DialogTitle>
          </DialogHeader>

          {/* body */}
          <div>
            <hr className="pb-8" />

            {/* search */}
            <div className="max-w-[320px] mx-auto mb-6">
              <Input
                className="h-11 rounded-xl"
                placeholder="Search"
                preIcon={
                  <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.58366 18.8743C4.87533 18.8743 1.04199 15.041 1.04199 10.3327C1.04199 5.62435 4.87533 1.79102 9.58366 1.79102C14.292 1.79102 18.1253 5.62435 18.1253 10.3327C18.1253 15.041 14.292 18.8743 9.58366 18.8743ZM9.58366 3.04102C5.55866 3.04102 2.29199 6.31602 2.29199 10.3327C2.29199 14.3493 5.55866 17.6243 9.58366 17.6243C13.6087 17.6243 16.8753 14.3493 16.8753 10.3327C16.8753 6.31602 13.6087 3.04102 9.58366 3.04102Z"
                      fill="#A2A1A7"
                    />
                    <path
                      d="M18.3335 19.7076C18.1752 19.7076 18.0169 19.6492 17.8919 19.5242L16.2252 17.8576C15.9835 17.6159 15.9835 17.2159 16.2252 16.9742C16.4669 16.7326 16.8669 16.7326 17.1085 16.9742L18.7752 18.6409C19.0169 18.8826 19.0169 19.2826 18.7752 19.5242C18.6502 19.6492 18.4919 19.7076 18.3335 19.7076Z"
                      fill="#A2A1A7"
                    />
                  </svg>
                }
              />
            </div>

            <hr className="pb-8" />

            {/* form */}
            <form onSubmit={handleSubmit(handleEditInventory)} className="">
              <div className="grid grid-cols-2 gap-x-4 mb-6 ">
                {/* vin number */}
                <div className="flex flex-col mb-3">
                  <label
                    htmlFor="email"
                    className="text-sm mb-1 text-[#414651] font-medium"
                  >
                    VIN Number
                  </label>
                  <Controller
                    name="vin"
                    control={control}
                    rules={{ required: "VIN Number is required" }}
                    render={({ field, formState: { errors } }) => (
                      <InputCopy
                        type="vin"
                        id="vin"
                        error={errors.vin?.message}
                        copyText={field.value}
                        {...field}
                      />
                    )}
                  />
                </div>

                {/* brand */}
                <div className="flex flex-col mb-3">
                  <label
                    htmlFor="brand"
                    className="text-sm mb-1 text-[#414651] font-medium"
                  >
                    Brand
                  </label>
                  <Controller
                    name="brand"
                    control={control}
                    rules={{ required: "Brand is required" }}
                    render={({ field, formState: { errors } }) => (
                      <Input
                        type="brand"
                        id="brand"
                        className="h-11"
                        placeholder="Brand"
                        error={errors?.brand?.message}
                        {...field}
                      />
                    )}
                  />
                </div>

                {/* model */}
                <div className="flex flex-col mb-3">
                  <label
                    htmlFor="model"
                    className="text-sm mb-1 text-[#414651] font-medium"
                  >
                    Model
                  </label>
                  <Controller
                    name="model"
                    control={control}
                    rules={{ required: "Model is required" }}
                    render={({ field, formState: { errors } }) => (
                      <Input
                        type="model"
                        id="model"
                        className="h-11"
                        placeholder="Model"
                        error={errors?.model?.message}
                        {...field}
                      />
                    )}
                  />
                </div>

                {/* mileage */}
                <div className="flex flex-col mb-3">
                  <label
                    htmlFor="mileage"
                    className="text-sm mb-1 text-[#414651] font-medium"
                  >
                    Mileage
                  </label>
                  <Controller
                    name="mileage"
                    control={control}
                    render={({ field, formState: { errors } }) => (
                      <Input
                        type="number"
                        id="mileage"
                        className="h-11"
                        placeholder="Mileage"
                        error={errors?.mileage?.message}
                        {...field}
                      />
                    )}
                  />
                </div>

                {/* year */}
                <div className="flex flex-col mb-3">
                  <label
                    htmlFor="year"
                    className="text-sm mb-1 text-[#414651] font-medium"
                  >
                    Year
                  </label>
                  <Controller
                    name="year"
                    control={control}
                    render={({ field, formState: { errors } }) => (
                      <Input
                        type="number"
                        min="1900"
                        max={new Date().getFullYear()}
                        id="year"
                        className="h-11 !w-full block"
                        placeholder="Year"
                        error={errors?.year?.message}
                        {...field}
                      />
                    )}
                  />
                </div>

                {/* series */}
                <div className="flex flex-col mb-3">
                  <label
                    htmlFor="series"
                    className="text-sm mb-1 text-[#414651] font-medium"
                  >
                    Series
                  </label>
                  <Controller
                    name="series"
                    control={control}
                    render={({ field, formState: { errors } }) => (
                      <Input
                        type="series"
                        id="series"
                        className="h-11"
                        placeholder="Series"
                        error={errors?.series?.message}
                        {...field}
                      />
                    )}
                  />
                </div>

                {/* trim */}
                <div className="flex flex-col mb-3">
                  <label
                    htmlFor="trim"
                    className="text-sm mb-1 text-[#414651] font-medium"
                  >
                    Trim
                  </label>
                  <Controller
                    name="trim"
                    control={control}
                    render={({ field, formState: { errors } }) => (
                      <Input
                        type="trim"
                        id="trim"
                        className="h-11"
                        placeholder="Trim"
                        error={errors?.trim?.message}
                        {...field}
                      />
                    )}
                  />
                </div>

                {/* odometer */}
                <div className="flex flex-col mb-3">
                  <label
                    htmlFor="odometer"
                    className="text-sm mb-1 text-[#414651] font-medium"
                  >
                    Odometer
                  </label>
                  <Controller
                    name="odometer"
                    control={control}
                    render={({ field, formState: { errors } }) => (
                      <Input
                        type="odometer"
                        id="odometer"
                        className="h-11"
                        placeholder="Odometer"
                        error={errors?.odometer?.message}
                        {...field}
                      />
                    )}
                  />
                </div>

                {/* odometer_unit */}
                <div className="flex flex-col mb-3">
                  <label
                    htmlFor="odometer_unit"
                    className="text-sm mb-1 text-[#414651] font-medium"
                  >
                    Odometer Unit
                  </label>
                  <Controller
                    name="odometer_unit"
                    control={control}
                    render={({ field, formState: { errors } }) => (
                      // <Input
                      //   type="odometer_unit"
                      //   id="odometer_unit"
                      //   className="h-11"
                      //   placeholder="odometer_unit"
                      //   error={errors?.odometer_unit?.message}
                      //   {...field}
                      // />

                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        // className="h-11 w-full !border-[#D5D7DA]"
                        // defaultValue="km"
                      >
                        <SelectTrigger className="h-11 w-full !border-[#D5D7DA]">
                          <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="km">KM</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                {/* exterior_color */}
                <div className="flex flex-col mb-3">
                  <label
                    htmlFor="exterior_color"
                    className="text-sm mb-1 text-[#414651] font-medium"
                  >
                    Exterior Color
                  </label>
                  <Controller
                    name="exterior_color"
                    control={control}
                    render={({ field, formState: { errors } }) => (
                      <Input
                        type="color"
                        id="exterior_color"
                        className="h-11 p-[6px]"
                        placeholder="Exterior Color"
                        error={errors?.exterior_color?.message}
                        {...field}
                      />
                    )}
                  />
                </div>

                {/* interior_color */}
                <div className="flex flex-col mb-3">
                  <label
                    htmlFor="interior_color"
                    className="text-sm mb-1 text-[#414651] font-medium"
                  >
                    Interior Color
                  </label>
                  <Controller
                    name="interior_color"
                    control={control}
                    render={({ field, formState: { errors } }) => (
                      <Input
                        type="color"
                        id="exterior_color"
                        className="h-11 p-[6px]"
                        placeholder="Interior Color"
                        error={errors?.interior_color?.message}
                        {...field}
                      />
                    )}
                  />
                </div>

                {/* options */}
                <div className="flex flex-col mb-3">
                  <label
                    htmlFor="exterior_color"
                    className="text-sm mb-1 text-[#414651] font-medium"
                  >
                    Option
                  </label>
                  <Controller
                    name="options"
                    control={control}
                    render={({ field, formState: { errors } }) => (
                      <Input
                        type="options"
                        id="options"
                        className="h-11"
                        placeholder="options"
                        error={errors?.options?.message}
                        {...field}
                      />
                    )}
                  />
                </div>
              </div>

              {/* buttons */}
              <div className="flex justify-end gap-3">
                <Button
                  variant={"destructive"}
                  className="h-11 rounded-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    setModals({ ...modals, addInventory: false });
                  }}
                >
                  Cancel
                </Button>

                <Button
                  variant={"primary"}
                  type={"submit"}
                  className="h-11 rounded-lg"
                  loading={isLoadingEditVehicle}
                >
                  Update
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function TableSkeleton() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto ">
        <tbody>
          {[...Array(5)].map((_, i) => (
            <tr key={i} className="border-t">
              <td className="px-4 py-4">
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
              </td>
              <td className="px-4 py-4">
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
              </td>
              <td className="px-4 py-4">
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
              </td>
              <td className="px-4 py-4">
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
              </td>
              <td className="px-4 py-4">
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
              </td>
              <td className="px-4 py-4">
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
              </td>
              <td className="px-4 py-2 text-r4ght">
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
