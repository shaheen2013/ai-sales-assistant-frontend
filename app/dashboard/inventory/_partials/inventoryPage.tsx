"use client";

import moment from "moment";
import { Suspense, useState } from "react";
import { Controller, useForm } from "react-hook-form";

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

import { beautifyErrors, cn } from "@/lib/utils";

import { useToast } from "@/hooks/useToast";
import { Button } from "@/components/shadcn/button";
import { Input, InputCopy } from "@/components/shadcn/input";

import InventoryCarList from "./inventoryCarList";
import InventoryFilesList from "./inventoryFilesList";
import DragAndDropUploader from "./DragAndDropUploader";

import {
  useGetInventoryFilesQuery,
  useGetVehicleInventoryQuery,
  useDeleteVehicleInventoryMutation,
  useCreateVehicleInventoryMutation,
} from "@/features/inventory/inventorySlice";
import Spinner from "@/components/spinner/Spinner";

export default function DashboardDealerInventory() {
  const toast = useToast();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      stockId: "",
      vin: "",
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

  // const search = searchParams.get("search");
  // const filter = searchParams.get("filter");
  // const sort = searchParams.get("sort");

  // const files_search = searchParams.get("file_search");
  // const files_filter = searchParams.get("file_filter");
  // const files_sort = searchParams.get("file_sort");

  const {
    data: getVehicleList,
    error: errorGetVehicle,
    isFetching: isFetchingGetVehicle,
    refetch: refetchGetVehicle,
  } = useGetVehicleInventoryQuery({});

  const {
    data: dataGetInventoryFiles,
    error: errorGetInventoryFiles,
    // isFetching: isFetchingGetInventoryFiles,
    // refetch: refetchGetInventoryFiles,
  } = useGetInventoryFilesQuery({});

  const [createVehicleInventory, { isLoading: isLoadingCreateVehicle }] =
    useCreateVehicleInventoryMutation();
  const [deleteVehicleInventory] = useDeleteVehicleInventoryMutation();

  const handleInventoryEdit = async (formData: any, id: any) => {
    console.log("edit id => ", id);
    console.log("edit formData => ", formData);
  };

  const handleInventoryDelete = async (id: string) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this vehicle inventory? This action cannot be undone."
    );

    if (!confirm) {
      return;
    }

    const { data, error } = await deleteVehicleInventory({ id: id });

    if (error) {
      console.log(error);
      toast("error", beautifyErrors(error));
      return;
    }

    await refetchGetVehicle();
  };

  const handleAddInventory = async (formData: any) => {
    const payload = {
      price: formData.price,
      mileage: formData.mileage,
      brand: formData.brand,
      model: formData.model,
      year: formData.year,
      vin: formData.vin,
      stock_id: formData.stockId,
      plate_no: formData.numberPlate,
      body_style: formData.bodyStyle,
      engine_type: formData.engineType,
      fuel_type: formData.fuelType,
      odometer: formData.odometer,
      color: formData.color,
      consign: formData.consign,
      date_in: moment(formData.dateIn).format("YYYY-MM-DD"),
      date_out: moment(formData.dateOut).format("YYYY-MM-DD"),
    };

    const { data, error } = await createVehicleInventory(payload);

    if (error) {
      console.log(error);
      toast("error", beautifyErrors(error));
      return;
    }

    setModals({ ...modals, addInventory: false });
    reset();
    await refetchGetVehicle();

    console.log("data => ", data);
  };

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  if (isFetchingGetVehicle) {
    return (
      <div className="h-full flex justify-center items-center">
        <Spinner className="size-12" />
      </div>
    );
  }

  if (errorGetVehicle) {
    return JSON.stringify(errorGetVehicle);
  }

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
                <Button
                  className=" bg-white border-gray-50 !p-1 border rounded-lg mr-3 h-10 w-10"
                  variant="icon"
                >
                  <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="!h-5 !w-5"
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
                </Button>

                <Button
                  className="mt-auto bg-white border-gray-50 !p-1 border rounded-lg h-10 w-10"
                  variant="icon"
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="!h-5 !w-5"
                  >
                    <path
                      d="M3.33301 13.8327L3.33301 14.666C3.33301 16.0467 4.4523 17.166 5.83301 17.166L14.1663 17.166C15.5471 17.166 16.6663 16.0467 16.6663 14.666L16.6663 13.8327M13.333 10.4993L9.99967 13.8327M9.99967 13.8327L6.66634 10.4993M9.99967 13.8327L9.99967 3.83268"
                      stroke="#717882"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* table wrapper */}
        <div className="w-full">
          <div className="rounded-md border p-3">
            {/* header */}
            <div className="flex justify-between items-center mb-4">
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
                  <SelectTrigger
                    className="w-[80px]"
                    postIcon={<div></div>}
                    preIcon={
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.11634 18.875C8.71634 18.875 8.32467 18.775 7.95801 18.575C7.22467 18.1667 6.78301 17.425 6.78301 16.5917V12.175C6.78301 11.7583 6.50801 11.1333 6.24967 10.8167L3.13301 7.51667C2.60801 6.99167 2.20801 6.09167 2.20801 5.41667V3.5C2.20801 2.16667 3.21634 1.125 4.49967 1.125H15.4997C16.7663 1.125 17.7913 2.15 17.7913 3.41667V5.25C17.7913 6.125 17.2663 7.11667 16.7747 7.60833L13.1663 10.8C12.8163 11.0917 12.5413 11.7333 12.5413 12.25V15.8333C12.5413 16.575 12.0747 17.4333 11.4913 17.7833L10.3413 18.525C9.96634 18.7583 9.54134 18.875 9.11634 18.875ZM4.49967 2.375C3.91634 2.375 3.45801 2.86667 3.45801 3.5V5.41667C3.45801 5.725 3.70801 6.325 4.02467 6.64167L7.19967 9.98333C7.62467 10.5083 8.04134 11.3833 8.04134 12.1667V16.5833C8.04134 17.125 8.41634 17.3917 8.57467 17.475C8.92467 17.6667 9.34967 17.6667 9.67467 17.4667L10.833 16.725C11.0663 16.5833 11.2997 16.1333 11.2997 15.8333V12.25C11.2997 11.3583 11.733 10.375 12.358 9.85L15.9247 6.69167C16.208 6.40833 16.5497 5.73333 16.5497 5.24167V3.41667C16.5497 2.84167 16.083 2.375 15.508 2.375H4.49967Z"
                          fill="#A2A1A7"
                        />
                        <path
                          d="M5.00006 8.95741C4.88339 8.95741 4.77506 8.92408 4.66672 8.86575C4.37506 8.68241 4.28339 8.29075 4.46672 7.99908L8.57506 1.41575C8.75839 1.12408 9.14172 1.03241 9.43339 1.21575C9.72506 1.39908 9.81672 1.78241 9.63339 2.07408L5.52506 8.65741C5.40839 8.84908 5.20839 8.95741 5.00006 8.95741Z"
                          fill="#A2A1A7"
                        />
                      </svg>
                    }
                  >
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Filter</SelectLabel>
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
                  <SelectTrigger
                    className="w-[120px]"
                    preIcon={
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.70868 6.22498C8.55035 6.22498 8.39199 6.16667 8.26699 6.04167L5.60866 3.38333L2.95032 6.04167C2.70866 6.28333 2.30866 6.28333 2.06699 6.04167C1.82533 5.8 1.82533 5.4 2.06699 5.15834L5.16702 2.05831C5.28369 1.94164 5.44199 1.875 5.60866 1.875C5.77533 1.875 5.93368 1.94164 6.05035 2.05831L9.15033 5.15834C9.39199 5.4 9.39199 5.8 9.15033 6.04167C9.02533 6.16667 8.86702 6.22498 8.70868 6.22498Z"
                          fill="#A2A1A7"
                        />
                        <path
                          d="M5.6084 18.125C5.26673 18.125 4.9834 17.8417 4.9834 17.5V2.5C4.9834 2.15833 5.26673 1.875 5.6084 1.875C5.95007 1.875 6.2334 2.15833 6.2334 2.5V17.5C6.2334 17.8417 5.95007 18.125 5.6084 18.125Z"
                          fill="#A2A1A7"
                        />
                        <path
                          d="M14.3997 18.1253C14.233 18.1253 14.0747 18.0586 13.958 17.942L10.858 14.8419C10.6163 14.6003 10.6163 14.2003 10.858 13.9586C11.0997 13.7169 11.4997 13.7169 11.7413 13.9586L14.3997 16.6169L17.058 13.9586C17.2996 13.7169 17.6997 13.7169 17.9413 13.9586C18.183 14.2003 18.183 14.6003 17.9413 14.8419L14.8413 17.942C14.7246 18.0586 14.558 18.1253 14.3997 18.1253Z"
                          fill="#A2A1A7"
                        />
                        <path
                          d="M14.3916 18.125C14.0499 18.125 13.7666 17.8417 13.7666 17.5V2.5C13.7666 2.15833 14.0499 1.875 14.3916 1.875C14.7333 1.875 15.0166 2.15833 15.0166 2.5V17.5C15.0166 17.8417 14.7416 18.125 14.3916 18.125Z"
                          fill="#A2A1A7"
                        />
                      </svg>
                    }
                  >
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Filter</SelectLabel>
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
              <InventoryCarList
                isLoading={false}
                refetchGetVehicle={refetchGetVehicle}
                getVehicleList={getVehicleList}
                handleInventoryEdit={handleInventoryEdit}
                handleInventoryDelete={handleInventoryDelete}
              />
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
              <form onSubmit={handleSubmit(handleAddInventory)} className="">
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
                      rules={{ required: "VIN Number is required" }}
                      render={({ field, formState: { errors } }) => (
                        <InputCopy
                          type="vin"
                          id="vin"
                          error={errors.vin?.message}
                          copyText={field.value}
                          // disabled
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

                  {/* year */}
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
                      // rules={{ required: "Year is required" }}
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
                      // rules={{ required: "Mileage is required" }}
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
                      // rules={{ required: "Number Plate is required" }}
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
                      // rules={{ required: " Body Style is required" }}
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
                      // rules={{ required: "Engine Type is required" }}
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
                      // rules={{ required: "Fuel Type is required" }}
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
                      // rules={{ required: "Odometer is required" }}
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
                      // rules={{ required: "Color is required" }}
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
                      // rules={{ required: "Consign is required" }}
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
                      // rules={{ required: "Price is required" }}
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
                      // rules={{ required: "Date In is required" }}
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
                      // rules={{ required: "Date Out is required" }}
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
                    loading={isLoadingCreateVehicle}
                  >
                    Create
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
