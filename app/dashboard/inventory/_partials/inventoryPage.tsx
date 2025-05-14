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

import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { Suspense, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";

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
import { Button } from "@/components/shadcn/button";

import {
  Select,
  SelectItem,
  SelectLabel,
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
  DialogDescription,
} from "@/components/shadcn/dialog";
import { cn, formatFileSize } from "@/lib/utils";
import { Input, InputCopy } from "@/components/shadcn/input";

export default function DashboardDealerInventory() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      stockId: "021-25-364",
      vin: "#0001",
      brand: "",
      model: "",
      year: "",
      mileage: "",
      numberPlate: "",
      bodyStyle: "",
      engineType: "",
      fuelType: "",
      odometer: "",
      color: "",
      consign: "",
      price: "",
      dateIn: "",
      dateOut: "",
    },
  });

  const [selectedPanel, setSelectedPanel] = useState<"list" | "files">("list");
  const [modals, setModals] = useState({
    addInventory: false,
    addPdf: false,
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  return (
    <Suspense>
      <div className="">
        {/* add inventory / place add pdf  */}
        <div className="flex gap-3 mb-6">
          <Button
            variant="primary"
            className="w-full !py-3 h-11"
            onClick={() => setModals({ ...modals, addInventory: true })}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.88338 1.00673L10 1C10.5128 1 10.9355 1.38604 10.9933 1.88338L11 2V9H18C18.5128 9 18.9355 9.38604 18.9933 9.88338L19 10C19 10.5128 18.614 10.9355 18.1166 10.9933L18 11H11V18C11 18.5128 10.614 18.9355 10.1166 18.9933L10 19C9.48716 19 9.06449 18.614 9.00673 18.1166L9 18V11H2C1.48716 11 1.06449 10.614 1.00673 10.1166L1 10C1 9.48716 1.38604 9.06449 1.88338 9.00673L2 9H9V2C9 1.48716 9.38604 1.06449 9.88338 1.00673L10 1L9.88338 1.00673Z"
                fill="white"
              />
            </svg>
            Add Inventory
          </Button>

          <Button
            className="w-full h-11"
            variant="outline"
            onClick={() => setModals({ ...modals, addPdf: true })}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.50269 11.0021C5.22654 11.0021 5.00269 11.2259 5.00269 11.5021V14.5021C5.00269 14.7782 5.22654 15.0021 5.50269 15.0021C5.77883 15.0021 6.00269 14.7782 6.00269 14.5021V14.0025H6.50004C7.32858 14.0025 8.00024 13.3308 8.00024 12.5023C8.00024 11.6737 7.32858 11.0021 6.50004 11.0021H5.50269ZM6.50004 13.0025H6.00269V12.0021H6.50004C6.77629 12.0021 7.00024 12.226 7.00024 12.5023C7.00024 12.7785 6.7763 13.0025 6.50004 13.0025ZM12.9977 11.5014C12.998 11.2255 13.2218 11.0021 13.4977 11.0021H15.0027C15.2788 11.0021 15.5027 11.2259 15.5027 11.5021C15.5027 11.7782 15.2788 12.0021 15.0027 12.0021H13.997L13.9958 13.0038H15.0027C15.2788 13.0038 15.5027 13.2277 15.5027 13.5038C15.5027 13.7799 15.2788 14.0038 15.0027 14.0038H13.9964L13.9977 14.5008C13.9984 14.7769 13.7751 15.0014 13.4989 15.0021C13.2228 15.0028 12.9984 14.7795 12.9977 14.5033L12.9951 13.5051L12.9951 13.5032L12.9977 11.5014ZM9.5 11.0021C9.22386 11.0021 9 11.2259 9 11.5021V14.5021C9 14.7782 9.22386 15.0021 9.5 15.0021H9.99755C11.1021 15.0021 11.9975 14.1067 11.9976 13.0021C11.9976 11.8975 11.1021 11.0021 9.99755 11.0021H9.5ZM10 14.0021V12.0021C10.5512 12.0034 10.9976 12.4506 10.9976 13.0021C10.9975 13.5535 10.5512 14.0008 10 14.0021ZM18 18V16.8358C18.5912 16.5549 19 15.9523 19 15.2542V10.75C19 10.0519 18.5912 9.44927 18 9.16841V7.828C18 7.298 17.789 6.789 17.414 6.414L11.585 0.586C11.57 0.571048 11.5531 0.55808 11.5363 0.545195C11.5238 0.535674 11.5115 0.526198 11.5 0.516C11.429 0.452 11.359 0.389 11.281 0.336C11.2557 0.318941 11.2281 0.305475 11.2005 0.292071C11.1845 0.284259 11.1685 0.276469 11.153 0.268C11.1363 0.258594 11.1197 0.248967 11.103 0.239326C11.0488 0.20797 10.9944 0.176475 10.937 0.152C10.74 0.0699999 10.528 0.0289999 10.313 0.0139999C10.2933 0.0127423 10.2738 0.0100789 10.2542 0.00740928C10.2271 0.00371057 10.1999 0 10.172 0H4C2.896 0 2 0.896 2 2V9.16841C1.40876 9.44928 1 10.0519 1 10.75V15.2542C1 15.9523 1.40876 16.5549 2 16.8358V18C2 19.104 2.896 20 4 20H16C17.104 20 18 19.104 18 18ZM16 18.5H4C3.724 18.5 3.5 18.275 3.5 18V17.0042H16.5V18C16.5 18.275 16.276 18.5 16 18.5ZM16.5 8V9H3.5V2C3.5 1.725 3.724 1.5 4 1.5H10V6C10 7.104 10.896 8 12 8H16.5ZM15.378 6.5H12C11.724 6.5 11.5 6.275 11.5 6V2.621L15.378 6.5ZM2.75 10.5H17.25C17.3881 10.5 17.5 10.6119 17.5 10.75V15.2542C17.5 15.3923 17.3881 15.5042 17.25 15.5042H2.75C2.61193 15.5042 2.5 15.3923 2.5 15.2542V10.75C2.5 10.6119 2.61193 10.5 2.75 10.5Z"
                fill="#5D6679"
              />
            </svg>
            Place/Add pdf
          </Button>
        </div>

        {/* recent files  */}
        <h2 className="mb-4">Recent files</h2>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="bg-[#F3F4F5] border border-gray-100 rounded-lg p-4 flex justify-between items-center gap-2"
            >
              <div>
                <h3 className="text-base font-semibold flex items-center gap-2 mb-1">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.28082 10.6092L10.5848 5.30516C10.8402 5.0498 11.1435 4.84725 11.4772 4.70908C11.8109 4.57091 12.1685 4.49982 12.5297 4.49986C12.8909 4.49991 13.2485 4.5711 13.5821 4.70935C13.9158 4.84761 14.219 5.05024 14.4743 5.30566C14.7297 5.56108 14.9322 5.86429 15.0704 6.19799C15.2086 6.53169 15.2797 6.88934 15.2796 7.25051C15.2796 7.61168 15.2084 7.96931 15.0701 8.30297C14.9319 8.63664 14.7292 8.9398 14.4738 9.19516L8.10982 15.5592C7.87524 15.7937 7.55708 15.9255 7.22532 15.9255C6.89357 15.9255 6.57541 15.7937 6.34082 15.5592C6.10624 15.3246 5.97445 15.0064 5.97445 14.6747C5.97445 14.3429 6.10624 14.0247 6.34082 13.7902L11.9978 8.13316C12.1303 7.99098 12.2024 7.80294 12.199 7.60863C12.1956 7.41433 12.1169 7.22895 11.9794 7.09153C11.842 6.95412 11.6566 6.87541 11.4623 6.87198C11.268 6.86855 11.08 6.94068 10.9378 7.07316L5.28082 12.7302C4.76498 13.246 4.47518 13.9456 4.47518 14.6752C4.47518 15.4047 4.76498 16.1043 5.28082 16.6202C5.79667 17.136 6.49631 17.4258 7.22582 17.4258C7.95534 17.4258 8.65498 17.136 9.17082 16.6202L15.5338 10.2552C16.3155 9.45503 16.7503 8.37898 16.7438 7.26041C16.7372 6.14183 16.29 5.07092 15.499 4.27995C14.7081 3.48899 13.6371 3.04174 12.5186 3.03523C11.4 3.02871 10.3239 3.46345 9.52382 4.24516L4.22082 9.54816C4.08834 9.69033 4.01622 9.87838 4.01965 10.0727C4.02308 10.267 4.10179 10.4524 4.2392 10.5898C4.37661 10.7272 4.562 10.8059 4.7563 10.8093C4.9506 10.8128 5.13865 10.7406 5.28082 10.6082"
                      fill="#2196F3"
                    />
                  </svg>
                  File{index + 1}.pdf
                </h3>
                <p className="text-gray-600 text-sm">20 MB</p>
              </div>

              <div className="">
                <button className="mt-auto bg-white border-gray-50 p-2 border rounded-lg mr-3">
                  <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.5003 10.4993C12.5003 11.8801 11.381 12.9993 10.0003 12.9993C8.61957 12.9993 7.50029 11.8801 7.50029 10.4993C7.50029 9.11864 8.61957 7.99935 10.0003 7.99935C11.381 7.99935 12.5003 9.11864 12.5003 10.4993Z"
                      stroke="#717882"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2.04883 10.4993C3.11072 7.11841 6.26929 4.66602 10.0007 4.66602C13.732 4.66602 16.8906 7.11844 17.9525 10.4994C16.8906 13.8803 13.732 16.3327 10.0007 16.3327C6.26929 16.3327 3.11071 13.8803 2.04883 10.4993Z"
                      stroke="#717882"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <button className="mt-auto bg-white border-gray-50 p-2 border rounded-lg">
                  <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.33301 13.8327L3.33301 14.666C3.33301 16.0467 4.4523 17.166 5.83301 17.166L14.1663 17.166C15.5471 17.166 16.6663 16.0467 16.6663 14.666L16.6663 13.8327M13.333 10.4993L9.99967 13.8327M9.99967 13.8327L6.66634 10.4993M9.99967 13.8327L9.99967 3.83268"
                      stroke="#717882"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* table wrapper */}

        <div className="w-full">
          <div className="rounded-md border p-3">
            {/* header */}
            <div className="flex justify-between items-center mb-4 dev">
              {/*  */}
              <div className="flex items-center  gap-3">
                <h2
                  onClick={() => setSelectedPanel("list")}
                  className={cn(
                    `text-base text-gray-500 font-medium cursor-pointer`,
                    {
                      "underline underline-offset-[12px]":
                        selectedPanel == "list",
                    }
                  )}
                >
                  Inventory Car List
                </h2>

                {/* <h2 className="text-lg text-gray-500">Inventory Files</h2> */}
                <h2
                  onClick={() => setSelectedPanel("files")}
                  className={cn(
                    `text-base text-gray-500 font-medium cursor-pointer`,
                    {
                      "underline underline-offset-[12px]":
                        selectedPanel == "files",
                    }
                  )}
                >
                  Inventory Files
                </h2>
              </div>

              {/* search */}
              <div>
                <Input
                  placeholder="Search"
                  className="max-w-[300px] h-10"
                  preIcon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="20"
                      viewBox="0 0 21 20"
                      fill="none"
                    >
                      <path
                        d="M10.0837 18.1243C5.37533 18.1243 1.54199 14.291 1.54199 9.58268C1.54199 4.87435 5.37533 1.04102 10.0837 1.04102C14.792 1.04102 18.6253 4.87435 18.6253 9.58268C18.6253 14.291 14.792 18.1243 10.0837 18.1243ZM10.0837 2.29102C6.05866 2.29102 2.79199 5.56602 2.79199 9.58268C2.79199 13.5993 6.05866 16.8743 10.0837 16.8743C14.1087 16.8743 17.3753 13.5993 17.3753 9.58268C17.3753 5.56602 14.1087 2.29102 10.0837 2.29102Z"
                        fill="#A2A1A7"
                      />
                      <path
                        d="M18.8335 18.9576C18.6752 18.9576 18.5169 18.8992 18.3919 18.7742L16.7252 17.1076C16.4835 16.8659 16.4835 16.4659 16.7252 16.2242C16.9669 15.9826 17.3669 15.9826 17.6085 16.2242L19.2752 17.8909C19.5169 18.1326 19.5169 18.5326 19.2752 18.7742C19.1502 18.8992 18.9919 18.9576 18.8335 18.9576Z"
                        fill="#A2A1A7"
                      />
                    </svg>
                  }
                />
              </div>

              {/* filter/sort */}
              <div className="flex gap-3">
                {/* filter */}
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fruits</SelectLabel>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                {/* date sort */}
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fruits</SelectLabel>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {selectedPanel == "list" ? (
              <InventoryCarList />
            ) : (
              <InventoryFilesList />
            )}

            <hr />

            <div className="flex items-end justify-end pt-3">
              <span className="text-primary-500 font-medium">View All</span>
            </div>
          </div>
        </div>

        {/* add inventory modal */}
        <Dialog
          open={modals.addInventory}
          onOpenChange={(e) => {
            console.log(e);
            setModals((prev) => ({
              ...prev,
              addInventory: !prev.addInventory,
            }));
          }}
        >
          <DialogContent className="sm:max-w-[700px] max-h-full overflow-auto">
            <DialogHeader>
              <DialogTitle>Inventory Details</DialogTitle>
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
              <form onSubmit={handleSubmit(onSubmit)} className="">
                <div className="grid grid-cols-2 gap-x-4 mb-6 ">
                  {/* stock id */}
                  <div>
                    <label
                      htmlFor="stockId"
                      className="text-sm mb-1 text-[#414651] font-medium"
                    >
                      Stock id
                    </label>
                    <Controller
                      name="stockId"
                      control={control}
                      render={({ field, formState: { errors } }) => (
                        <InputCopy
                          type="stockId"
                          id="stockId"
                          error={errors.stockId?.message}
                          copyText={field.value}
                          disabled
                          {...field}
                        />
                      )}
                    />
                  </div>

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
                      render={({ field, formState: { errors } }) => (
                        <InputCopy
                          type="vin"
                          id="vin"
                          error={errors.vin?.message}
                          copyText={field.value}
                          disabled
                          {...field}
                        />
                      )}
                    />
                  </div>

                  {/* brand */}
                  <div className="flex flex-col mb-3">
                    <label
                      htmlFor="email"
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
                      htmlFor="email"
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

                  {/* model */}
                  <div className="flex flex-col mb-3">
                    <label
                      htmlFor="email"
                      className="text-sm mb-1 text-[#414651] font-medium"
                    >
                      Year
                    </label>
                    <Controller
                      name="year"
                      control={control}
                      rules={{ required: "Year is required" }}
                      render={({ field, formState: { errors } }) => (
                        <Input
                          type="year"
                          id="year"
                          className="h-11"
                          placeholder="Year"
                          error={errors?.year?.message}
                          {...field}
                        />
                      )}
                    />
                  </div>

                  {/* mileage */}
                  <div className="flex flex-col mb-3">
                    <label
                      htmlFor="email"
                      className="text-sm mb-1 text-[#414651] font-medium"
                    >
                      Mileage
                    </label>
                    <Controller
                      name="mileage"
                      control={control}
                      rules={{ required: "Mileage is required" }}
                      render={({ field, formState: { errors } }) => (
                        <Input
                          type="mileage"
                          id="mileage"
                          className="h-11"
                          placeholder="Mileage"
                          error={errors?.mileage?.message}
                          {...field}
                        />
                      )}
                    />
                  </div>

                  {/* number plate */}
                  <div className="flex flex-col mb-3">
                    <label
                      htmlFor="email"
                      className="text-sm mb-1 text-[#414651] font-medium"
                    >
                      Number Plate
                    </label>
                    <Controller
                      name="numberPlate"
                      control={control}
                      rules={{ required: "Number Plate is required" }}
                      render={({ field, formState: { errors } }) => (
                        <Input
                          type="numberPlate"
                          id="numberPlate"
                          className="h-11"
                          placeholder="Number Plate"
                          error={errors?.numberPlate?.message}
                          {...field}
                        />
                      )}
                    />
                  </div>

                  {/* body style */}
                  <div className="flex flex-col mb-3">
                    <label
                      htmlFor="bodyStyle"
                      className="text-sm mb-1 text-[#414651] font-medium"
                    >
                      Body Style
                    </label>
                    <Controller
                      name="bodyStyle"
                      control={control}
                      rules={{ required: " Body Style is required" }}
                      render={({ field, formState: { errors } }) => (
                        <Input
                          type="bodyStyle"
                          id="bodyStyle"
                          className="h-11"
                          placeholder=" Body Style"
                          error={errors?.bodyStyle?.message}
                          {...field}
                        />
                      )}
                    />
                  </div>

                  {/* engine type */}
                  <div className="flex flex-col mb-3">
                    <label
                      htmlFor="engineType"
                      className="text-sm mb-1 text-[#414651] font-medium"
                    >
                      Engine Type
                    </label>
                    <Controller
                      name="engineType"
                      control={control}
                      rules={{ required: "Engine Type is required" }}
                      render={({ field, formState: { errors } }) => (
                        <Input
                          type="engineType"
                          id="engineType"
                          className="h-11"
                          placeholder="Engine Type"
                          error={errors?.engineType?.message}
                          {...field}
                        />
                      )}
                    />
                  </div>

                  {/* fuel type */}
                  <div className="flex flex-col mb-3">
                    <label
                      htmlFor="fuelType"
                      className="text-sm mb-1 text-[#414651] font-medium"
                    >
                      Fuel Type
                    </label>
                    <Controller
                      name="fuelType"
                      control={control}
                      rules={{ required: "Fuel Type is required" }}
                      render={({ field, formState: { errors } }) => (
                        <Input
                          type="fuelType"
                          id="fuelType"
                          className="h-11"
                          placeholder="Fuel Type"
                          error={errors?.fuelType?.message}
                          {...field}
                        />
                      )}
                    />
                  </div>

                  {/* odometer */}
                  <div className="flex flex-col mb-3">
                    <label
                      htmlFor="engineType"
                      className="text-sm mb-1 text-[#414651] font-medium"
                    >
                      Odometer
                    </label>
                    <Controller
                      name="odometer"
                      control={control}
                      rules={{ required: "Odometer is required" }}
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

                  {/* color */}
                  <div className="flex flex-col mb-3">
                    <label
                      htmlFor="color"
                      className="text-sm mb-1 text-[#414651] font-medium"
                    >
                      Color
                    </label>
                    <Controller
                      name="color"
                      control={control}
                      rules={{ required: "Color is required" }}
                      render={({ field, formState: { errors } }) => (
                        <Input
                          type="text"
                          id="color"
                          className="h-11"
                          placeholder="Color"
                          error={errors?.color?.message}
                          {...field}
                        />
                      )}
                    />
                  </div>

                  {/* consign */}
                  <div className="flex flex-col mb-3">
                    <label
                      htmlFor="engineType"
                      className="text-sm mb-1 text-[#414651] font-medium"
                    >
                      Consign
                    </label>
                    <Controller
                      name="consign"
                      control={control}
                      rules={{ required: "Consign is required" }}
                      render={({ field, formState: { errors } }) => (
                        <Input
                          type="consign"
                          id="consign"
                          className="h-11"
                          placeholder="Consign"
                          error={errors?.consign?.message}
                          {...field}
                        />
                      )}
                    />
                  </div>

                  {/* price */}
                  <div className="flex flex-col mb-3">
                    <label
                      htmlFor="price"
                      className="text-sm mb-1 text-[#414651] font-medium"
                    >
                      Price
                    </label>
                    <Controller
                      name="price"
                      control={control}
                      rules={{ required: "Price is required" }}
                      render={({ field, formState: { errors } }) => (
                        <Input
                          type="text"
                          id="price"
                          className="h-11"
                          placeholder="Price"
                          error={errors?.price?.message}
                          {...field}
                        />
                      )}
                    />
                  </div>

                  {/* date in */}
                  <div className="flex flex-col mb-3">
                    <label
                      htmlFor="dateIn"
                      className="text-sm mb-1 text-[#414651] font-medium"
                    >
                      Date In
                    </label>
                    <Controller
                      name="dateIn"
                      control={control}
                      rules={{ required: "Date In is required" }}
                      render={({ field, formState: { errors } }) => (
                        <Input
                          type="text"
                          id="dateIn"
                          className="h-11"
                          placeholder="Date In"
                          error={errors?.dateIn?.message}
                          {...field}
                        />
                      )}
                    />
                  </div>

                  {/* date out */}
                  <div className="flex flex-col mb-3">
                    <label
                      htmlFor="dateOut"
                      className="text-sm mb-1 text-[#414651] font-medium"
                    >
                      Date Out
                    </label>
                    <Controller
                      name="dateOut"
                      control={control}
                      rules={{ required: "Date Out is required" }}
                      render={({ field, formState: { errors } }) => (
                        <Input
                          type="text"
                          id="dateOut"
                          className="h-11"
                          placeholder="Date Out"
                          error={errors?.dateOut?.message}
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
                    loading={false}
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          </DialogContent>
        </Dialog>

        {/* add pdf */}
        <Dialog
          open={modals.addPdf}
          onOpenChange={(e) => {
            console.log(e);
            setModals((prev) => ({ ...prev, addPdf: !prev.addPdf }));
          }}
        >
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Media Upload</DialogTitle>
              <DialogDescription>
                Add your documents here, and you can upload up to 5 files max
              </DialogDescription>
            </DialogHeader>

            {/* body */}
            <div className="">
              {/* form */}
              <DragAndDropUploader
                value={uploadedFiles}
                onChange={(files) => setUploadedFiles(files)}
              />
            </div>

            <div className="text-gray-400">Only support .pdf, .doc</div>

            <div className="flex justify-end gap-3">
              <Button
                variant={"outline"}
                className="h-11 rounded-lg"
                onClick={(e) => {
                  e.preventDefault();
                  setModals({ ...modals, addPdf: false });
                }}
              >
                Cancel
              </Button>

              <Button
                variant={"primary"}
                type={"submit"}
                className="h-11 rounded-lg"
                loading={false}
              >
                Next
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Suspense>
  );
}

function InventoryCarList() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  type Inventory = {
    stockId: string;
    createdDate: string;
    brand: string;
    vin: string;
    model: string;
    mileage: string;
    year: string;
  };

  const inventoryData: Inventory[] = [
    {
      stockId: "STK-001",
      createdDate: "2023-10-01",
      brand: "Toyota",
      vin: "1HGCM82633A004352",
      model: "Camry",
      mileage: "45000",
      year: "2020",
    },
    {
      stockId: "STK-002",
      createdDate: "2023-10-02",
      brand: "Honda",
      vin: "2HGFB2F59CH512345",
      model: "Civic",
      mileage: "38000",
      year: "2019",
    },
    {
      stockId: "STK-003",
      createdDate: "2023-10-03",
      brand: "Ford",
      vin: "1FAHP3FN8AW123456",
      model: "Focus",
      mileage: "51000",
      year: "2018",
    },
  ];

  const columns: ColumnDef<Inventory>[] = [
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
          <div>{row.original?.stockId}</div>
        </div>
      ),
    },

    {
      accessorKey: "createdDate",
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
        const date = new Date(row.original?.createdDate).toLocaleDateString(
          "en-US",
          {
            day: "2-digit",
            month: "short", // Outputs "Feb"
            year: "numeric",
          }
        );
        const time = new Date(row.original?.createdDate).toLocaleTimeString(
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
          <Image
            src="https://dummyimage.com/40x40"
            alt=""
            height="30"
            width="30"
            className="rounded-full"
          />
          <span className="text-gray-400">{row.original?.brand}</span>
        </div>
      ),
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
        const date = new Date(row.original?.createdDate).toLocaleDateString(
          "en-US",
          {
            day: "2-digit",
            month: "short", // Outputs "Feb"
            year: "numeric",
          }
        );

        const time = new Date(row.original?.createdDate).toLocaleTimeString(
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
            {row.original?.model}
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
            {row.original?.mileage}
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
          <div className=" font-medium text-gray-400">{row.original?.year}</div>
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
      cell: ({}) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
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

              <DropdownMenuItem>
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

  const data: Inventory[] = useMemo(() => inventoryData, []);

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
    <>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
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
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
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
    </>
  );
}

function InventoryFilesList() {
  return <>InventoryFilesList</>;
}

type DragAndDropUploaderProps = {
  value?: File[];
  onChange?: (files: File[]) => void;
};

function DragAndDropUploader({
  value = [],
  onChange,
}: DragAndDropUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Hardcoded validation rules for now
  const allowedFileTypes = ["application/pdf", "application/msword"];
  const allowedFileExtensions = [".pdf", ".doc", ".docx"];
  const maxFileSize = 5 * 1024 * 1024;
  const allowedMultipleFiles = true;

  function validateFile(file: File): boolean {
    const fileType = file.type;
    const ext = file.name
      .slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2)
      .toLowerCase();

    if (
      !allowedFileTypes.includes(fileType) &&
      !allowedFileExtensions.includes(`.${ext}`)
    ) {
      alert(`${file.name} is not an allowed file type.`);
      return false;
    }

    if (file.size > maxFileSize) {
      alert(`${file.name} exceeds the 5MB limit.`);
      return false;
    }

    return true;
  }

  function addValidFiles(newFiles: File[]) {
    const validFiles = newFiles.filter(validateFile);

    if (allowedMultipleFiles) {
      onChange?.([...value, ...validFiles]);
    } else if (validFiles.length > 0) {
      onChange?.([validFiles[0]]);
    }
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      addValidFiles(Array.from(e.target.files));
      e.target.value = "";
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    addValidFiles(Array.from(e.dataTransfer.files));
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
  }

  function openFileDialog() {
    fileInputRef.current?.click();
  }

  function removeFile(index: number) {
    const updated = value.filter((_, i) => i !== index);
    onChange?.(updated);
  }

  return (
    <div>
      {/* Drop zone */}
      <div
        className={`h-[220px] overflow-y-auto rounded-lg p-4 pb-0 cursor-pointer border-2 border-dashed transition-colors duration-150
          ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"}
        `}
        onClick={openFileDialog}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {value.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="42"
              height="43"
              viewBox="0 0 42 43"
              fill="none"
              className="mt-3 mb-2"
            >
              <g clipPath="url(#clip0_1241_12068)">
                <path
                  d="M33.4422 3.62109H14.1748V11.6111H37.5572V7.73451C37.5572 5.46616 35.7112 3.62109 33.4422 3.62109Z"
                  fill="#34AD5D"
                />
                <path
                  d="M22.5352 12.8403H0V5.42636C0 2.70972 2.21068 0.5 4.92828 0.5H12.1336C12.8497 0.5 13.5396 0.650925 14.1664 0.934509C15.0418 1.32896 15.7939 1.97913 16.3213 2.8286L22.5352 12.8403Z"
                  fill="#55BB78"
                />
                <path
                  d="M42 14.5004V38.3817C42 40.653 40.1511 42.5003 37.8789 42.5003H4.12111C1.84891 42.5003 0 40.653 0 38.3817V10.3809H37.8789C40.1511 10.3809 42 12.2288 42 14.5004Z"
                  fill="#55BB78"
                />
                <path
                  d="M42 14.5004V38.3817C42 40.653 40.1511 42.5003 37.8789 42.5003H21V10.3809H37.8789C40.1511 10.3809 42 12.2288 42 14.5004Z"
                  fill="#8AD0A2"
                />
                <path
                  d="M32.048 26.4405C32.048 32.5329 27.0919 37.4894 21.0001 37.4894C14.9083 37.4894 9.95215 32.5329 9.95215 26.4405C9.95215 20.3491 14.9083 15.3926 21.0001 15.3926C27.0919 15.3926 32.048 20.3491 32.048 26.4405Z"
                  fill="white"
                />
                <path
                  d="M32.0479 26.4405C32.0479 32.5329 27.0918 37.4894 21 37.4894V15.3926C27.0918 15.3926 32.0479 20.3491 32.0479 26.4405Z"
                  fill="#EAEBEC"
                />
                <path
                  d="M24.5612 26.5758C24.3308 26.7709 24.0485 26.8661 23.7688 26.8661C23.4185 26.8661 23.0705 26.7177 22.827 26.4287L22.2307 25.7218V30.3499C22.2307 31.0292 21.6795 31.5803 21.0002 31.5803C20.3209 31.5803 19.7698 31.0292 19.7698 30.3499V25.7218L19.1734 26.4287C18.7344 26.9481 17.9587 27.0145 17.4392 26.5758C16.9201 26.1378 16.8535 25.3617 17.2915 24.8422L19.7271 21.9548C20.0447 21.5793 20.508 21.3633 21.0002 21.3633C21.4924 21.3633 21.9558 21.5793 22.2733 21.9548L24.7089 24.8422C25.147 25.3617 25.0803 26.1378 24.5612 26.5758Z"
                  fill="#EAEBEC"
                />
                <path
                  d="M24.561 26.5758C24.3306 26.7709 24.0483 26.8661 23.7686 26.8661C23.4183 26.8661 23.0703 26.7177 22.8268 26.4287L22.2305 25.7218V30.3499C22.2305 31.0292 21.6793 31.5803 21 31.5803V21.3633C21.4922 21.3633 21.9555 21.5793 22.2731 21.9548L24.7087 24.8422C25.1467 25.3617 25.0801 26.1378 24.561 26.5758Z"
                  fill="#34AD5D"
                />
              </g>
              <defs>
                <clipPath id="clip0_1241_12068">
                  <rect
                    width="42"
                    height="42"
                    fill="white"
                    transform="translate(0 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>

            <h3 className="text-gray-400 text-sm">
              Drag your file(s) to start uploading
            </h3>

            <div className="relative flex items-center justify-center w-[200px] py-2">
              <p className="text-gray-400 text-sm bg-white inline-flex px-2">
                OR
              </p>

              {/* line of 300px */}
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#E7E7E7] -z-10"></div>
            </div>

            <Button variant="outline" className="h-11 rounded-lg">
              Browse files
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {value.map((file, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-50 px-3 py-3 rounded-lg text-sm"
              >
                <span className="truncate">
                  {file.name} ({formatFileSize(file.size)})
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    removeFile(index);
                  }}
                  className="text-red-500 hover:underline"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 5L19 19M5 19L19 5"
                      stroke="#FF0000"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        <input
          type="file"
          multiple={allowedMultipleFiles}
          hidden
          ref={fileInputRef}
          onChange={handleFileSelect}
        />
      </div>
    </div>
  );
}
