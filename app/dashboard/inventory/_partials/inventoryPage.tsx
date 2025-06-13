"use client";

import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { Controller, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

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

import RecentFiles from "./RecentFiles";
import InventoryCarList from "./inventoryCarList";
import InventoryFilesList from "./inventoryFilesList";
import DragAndDropUploader from "./DragAndDropUploader";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcn/accordion";

import {
  useGetInventoryFilesQuery,
  useGetVehicleInventoryQuery,
  useDeleteVehicleInventoryMutation,
  useCreateVehicleInventoryMutation,
  useVehicleInventoryUploadMutation,
} from "@/features/inventory/inventorySlice";

import SomethingWentWrong from "@/components/SomethingWentWrong";

export default function DashboardDealerInventory() {
  const toast = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { control, handleSubmit, reset } = useForm({
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

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [selectedPanel, setSelectedPanel] = useState<"list" | "files">("list");
  const [uploadSummery, setUploadSummery] = useState<any[]>([]);

  const [modals, setModals] = useState({
    addInventory: false,
    addPdf: false,
    selectPlan: false,
    uploadSummeryDetails: false,
  });

  // inventory search params
  const page = searchParams.get("page");
  const page_size = searchParams.get("page_size");
  // const filter = searchParams.get("filter");
  const [debouncedSearchValue, setSearch] = useDebounceValue("", 500);

  // inventory files search params
  const file_page = searchParams.get("file_page");
  const file_filter = searchParams.get("file_filter");
  const [debouncedFSearchValue] = useDebounceValue("", 500);

  // rtk query
  const {
    data: getVehicleList,
    error: errorGetVehicle,
    isFetching: isFetchingGetVehicle,
    refetch: refetchGetVehicle,
  } = useGetVehicleInventoryQuery({
    search: debouncedSearchValue,
    page: Number(page) || 1,
    page_size: Number(page_size) || 10,
  });

  const {
    data: dataGetInventoryFiles,
    error: errorGetInventoryFiles,
    isLoading: isLoadingGetInventoryFiles,
    isFetching: isFetchingGetInventoryFiles,
    refetch: refetchGetInventoryFiles,
  } = useGetInventoryFilesQuery({
    search: debouncedFSearchValue,
    page: Number(file_page) || 1,
    page_size: Number(file_filter) || 10,
  });

  // rtk mutation
  const [createVehicleInventory, { isLoading: isLoadingCreateVehicle }] =
    useCreateVehicleInventoryMutation();

  const [deleteVehicleInventory] = useDeleteVehicleInventoryMutation();

  const [inventoryUpload, { isLoading: isLoadingVehicleInventoryUplaod }] =
    useVehicleInventoryUploadMutation();

  const handleSectionChange = (section: "list" | "files") => {
    setSelectedPanel(section);

    const searchParams = new URLSearchParams(window.location.search);

    // Reset specific query params
    searchParams.delete("search");
    searchParams.delete("filter");
    searchParams.delete("sort");
    searchParams.set("page", "1");

    // Update the URL with the new params
    router.push(`?${searchParams.toString()}`);
  };

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

    const { error } = await deleteVehicleInventory({ id: id });

    if (error) {
      console.log(error);
      toast("error", beautifyErrors(error));
      return;
    }

    await refetchGetVehicle();
  };

  const handleAddInventory = async (formData: any) => {
    const payload = {
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

  const handleUploadInventoryFiles = async () => {
    // reset upload summery
    setUploadSummery([]);

    try {
      const formData = new FormData();

      formData.append("inventory_file", uploadedFiles[0]);

      const { data, error }: any = await inventoryUpload(formData);

      if (error) {
        console.log(error);
        toast("error", beautifyErrors(error));
        return;
      }

      console.log("upload data => ", data);

      toast("uploadInventory", "Uploading inventory...", {
        total: data?.total,
        success: data?.success,
        failed: data?.failed,

        onView: () => {
          setUploadSummery(data?.errors || []);
          setModals((prev) => ({ ...prev, uploadSummeryDetails: true }));
        },
      });

      setModals((prev) => ({ ...prev, addPdf: false }));
      setUploadedFiles([]);

      refetchGetVehicle();
      refetchGetInventoryFiles();
    } catch (error) {
      console.log(error);
      toast("error", beautifyErrors(error));
    }
  };

  if (errorGetVehicle || errorGetInventoryFiles) {
    return <SomethingWentWrong />;
  }

  const plans = [
    {
      name: "Pro Plan",
      price: "150",
      benefits: [
        "500 voice minutes",
        "$0.15 per minute",
        "Small to mid-size independent dealerships",
        "Optional $250 one-time if integrations are needed",
      ],
    },
    { name: "Business Plan", price: "300" },
    { name: "Enterprise Plan", price: "999" },
  ];

  return (
    <>
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
      <div className="mb-3">
        <RecentFiles
          isFetching={isLoadingGetInventoryFiles}
          dataGetInventoryFiles={dataGetInventoryFiles}
        />
      </div>

      {/* table wrapper */}
      <div className="w-full">
        <div className="rounded-md border p-3">
          {/* header */}
          <div className="flex justify-between items-center mb-4">
            {/* section selectors */}
            <div className="flex items-center  gap-3">
              <h2
                onClick={() => handleSectionChange("list")}
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
                onClick={() => handleSectionChange("files")}
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
                onChange={(e) => setSearch(e.target.value)}
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
                  value={"ss"}
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
                  <h2 className="text-gray-100">Filter</h2>
                  {/* <SelectValue placeholder="Filter" defaultValue={""} /> */}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
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
                  <h2 className="text-gray-100">Sory By</h2>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedPanel == "list" ? (
            <InventoryCarList
              isLoading={isFetchingGetVehicle}
              refetchGetVehicle={refetchGetVehicle}
              getVehicleList={getVehicleList}
              handleInventoryEdit={handleInventoryEdit}
              handleInventoryDelete={handleInventoryDelete}
            />
          ) : (
            <InventoryFilesList
              isLoading={isFetchingGetInventoryFiles}
              isError={Boolean(errorGetInventoryFiles)}
              refetchGetInventoryFiles={refetchGetInventoryFiles}
              dataGetInventoryFiles={dataGetInventoryFiles}
            />
          )}

          <hr />
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
                    render={({ field }) => (
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
                  loading={isLoadingCreateVehicle}
                >
                  Create
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      {/* add pdf modal */}
      <Dialog
        open={modals.addPdf}
        onOpenChange={() => {
          setModals((prev) => ({ ...prev, addPdf: !prev.addPdf }));

          setUploadedFiles([]); // Reset uploaded files when modal is closed
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

          <div className="text-gray-400">
            Only support .pdf, .doc, .csv & .numbers
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant={"outline"}
              className="h-11 rounded-lg"
              onClick={(e) => {
                e.preventDefault();
                setModals({ ...modals, addPdf: false });
                setUploadedFiles([]); // Reset uploaded files when modal is closed
              }}
            >
              Cancel
            </Button>

            <Button
              variant={"primary"}
              type={"submit"}
              className="h-11 rounded-lg"
              loading={isLoadingVehicleInventoryUplaod}
              onClick={handleUploadInventoryFiles}
            >
              Next
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* select plan modal */}
      <Dialog
        open={modals.selectPlan}
        onOpenChange={() => {
          setModals((prev) => ({
            ...prev,
            selectPlan: !prev.selectPlan,
          }));
        }}
      >
        <DialogContent className="sm:max-w-[900px] max-h-full overflow-auto">
          <DialogHeader>
            <DialogTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="140"
                height="32"
                viewBox="0 0 140 32"
                fill="none"
                className="-mt-2"
              >
                <g clip-path="url(#clip0_2638_17565)">
                  <path
                    d="M23.5576 1.0611C22.7023 0.190528 21.7033 -0.296991 20.4519 0.192704C19.9317 0.240586 19.4812 0.416876 19.1743 0.86522C17.6813 2.28207 17.6704 4.01451 19.146 5.45748C19.3985 5.8623 19.7968 6.019 20.2364 6.11258C20.6891 6.46299 21.2245 6.34764 21.7011 6.28017C22.9548 6.10605 23.8188 5.36389 24.2214 4.17339C24.6088 3.03076 24.4282 1.94037 23.5598 1.05892L23.5576 1.0611Z"
                    fill="#016D26"
                  />
                  <path
                    d="M7.76731 1.37681C7.00339 0.273362 5.66706 -0.196746 4.36338 0.181952C4.13486 0.218952 3.87369 0.17107 3.73657 0.432241C3.46234 0.493181 3.22729 0.612885 3.07494 0.860997C1.68855 2.26479 1.60803 3.75564 2.83771 5.24432C3.04229 5.57296 3.26864 5.87548 3.70175 5.90378C3.79751 6.0866 3.97598 6.09748 4.14792 6.12795C5.617 6.56541 6.94245 6.13883 7.76731 4.96138C8.47465 3.9537 8.47248 2.40191 7.76731 1.37681Z"
                    fill="#016D26"
                  />
                  <path
                    d="M128.158 16.5245C126.482 16.0522 125.466 14.9749 124.978 13.3034C124.663 12.2173 124.454 11.0791 123.816 9.92773C123.437 11.2075 123.107 12.3262 122.774 13.447C122.303 15.0249 121.276 16.0435 119.7 16.5092C118.586 16.8401 117.472 17.1731 116.033 17.6018C117.444 18.0415 118.556 18.4049 119.677 18.7336C121.3 19.2102 122.336 20.2505 122.8 21.8785C123.096 22.9145 123.413 23.9417 123.783 25.1801C124.513 24.0919 124.689 23.0385 124.954 22.0548C125.435 20.2723 126.502 19.2037 128.254 18.6922C129.333 18.3766 130.454 18.1481 131.586 17.5539C130.343 17.1796 129.255 16.8335 128.16 16.5245H128.158Z"
                    fill="#019935"
                  />
                  <path
                    d="M135.001 22.375C134.922 22.2422 134.844 22.1073 134.766 21.9745C134.711 21.0103 134.27 20.1594 133.91 19.1582C133.567 22.3031 131.923 24.1379 128.683 24.4164C129.59 24.8953 130.402 25.1608 131.253 25.3023C131.253 25.2979 131.251 25.2957 131.249 25.2935C133.294 26.0858 133.223 28.1991 134.095 29.8771C134.265 26.5689 136.135 24.9519 139.297 24.5862C137.726 23.8593 136.011 23.8245 135.001 22.375ZM131.246 25.2892C131.246 25.2892 131.244 25.2892 131.242 25.2892C131.196 25.2348 131.157 25.1847 131.118 25.1347C131.172 25.1717 131.22 25.2195 131.246 25.2892Z"
                    fill="#019935"
                  />
                  <path
                    d="M134 13.2744C134.204 11.7596 135.053 10.9957 136.513 10.7324C135.009 10.4668 134.202 9.62238 133.969 8.125C133.76 9.69856 132.787 10.4146 131.386 10.7759C132.938 10.9435 133.671 11.8619 134.002 13.2744H134Z"
                    fill="#019935"
                  />
                  <path
                    d="M114.667 27.812C114.634 27.7402 114.595 27.6792 114.556 27.627C114.732 27.2657 114.73 26.9066 114.556 26.5453C110.357 26.5322 106.159 26.5214 101.961 26.5083H100.108C104.823 22.9041 109.302 19.485 113.77 16.0549C114.168 15.7502 114.747 15.5217 114.564 14.8361C114.643 14.736 114.675 14.6141 114.671 14.477C114.667 13.4302 114.66 12.3811 114.671 11.3321C114.686 9.76723 114.619 9.66276 113.093 9.66059C105.65 9.64753 98.2085 9.65188 90.7651 9.66059C90.2645 9.66059 89.7443 9.62141 89.3112 9.96529C89.3069 10.0023 89.3047 10.0415 89.3025 10.0785C89.074 10.2025 89.2046 10.4767 89.1197 10.6617C89.1328 11.8871 89.2068 13.1168 89.1371 14.3377C89.0849 15.2562 89.4027 15.4825 90.2885 15.4738C94.1799 15.439 98.0714 15.476 101.963 15.4869C102.18 15.4869 102.396 15.4869 102.614 15.4869C102.844 15.6566 103.097 15.7437 103.371 15.7481C98.8353 19.2282 94.3018 22.7083 89.7661 26.1884C89.7117 26.1927 89.6573 26.1971 89.6007 26.1992C89.4375 26.245 89.3221 26.3277 89.3352 26.5192C89.3352 26.5192 89.3352 26.5192 89.3352 26.5214C89.1807 26.4931 89.0893 26.5497 89.1067 26.7499C89.1067 26.8979 89.1067 27.0481 89.1067 27.1961C89.1175 28.1689 89.0871 29.1461 89.1545 30.1146C89.1981 30.7262 88.8629 31.3966 89.3765 31.9537C97.771 31.9624 106.163 31.9733 114.558 31.982C114.804 30.5978 114.608 29.2027 114.669 27.812H114.667Z"
                    fill="#019935"
                  />
                  <path
                    d="M26.3474 10.159C25.7684 9.6671 24.4865 9.98704 23.5158 9.98704C15.7678 9.99357 8.02186 10.0088 0.273782 10.0219C-0.265972 11.5824 0.180196 13.1907 0.0452571 14.773C0.0256693 15.0059 -0.0243886 15.2932 0.302075 15.4042C2.75491 15.4107 5.20992 15.4651 7.66057 15.3998C8.59644 15.3759 8.77708 15.6827 8.76838 16.5533C8.72485 21.3937 8.75532 26.2341 8.73791 31.0723C8.73573 31.7121 8.8032 32.1583 9.59977 31.9472C12.3442 31.9494 15.0887 31.9537 17.8354 31.9559C18.1553 31.8275 18.0726 31.5402 18.0704 31.303C18.0661 26.3037 18.053 21.3045 18.0443 16.303C18.0748 16.1703 17.9964 16.118 17.8854 16.0897C17.7331 15.4237 18.1488 15.4129 18.6254 15.415C20.9237 15.4237 23.2242 15.4281 25.5225 15.4085C25.8511 15.4063 26.2429 15.6 26.5128 15.2279C26.5345 14.5053 26.5977 13.7805 26.565 13.0601C26.5193 12.0612 27.0242 10.7335 26.3474 10.1568V10.159Z"
                    fill="#019935"
                  />
                  <path
                    d="M56.5194 26.6177C56.465 26.4566 56.404 26.4436 56.3387 26.5785C56.3344 26.5415 56.3322 26.5067 56.33 26.4697C55.8817 26.1563 55.3637 26.2237 54.8653 26.2237C51.05 26.2194 47.2347 26.2303 43.4173 26.215C42.1963 26.2107 40.971 26.3086 39.7522 26.1454C39.0666 25.5012 39.1384 24.7068 39.4061 23.9428C39.7021 23.1027 40.49 23.3813 41.095 23.3791C44.4859 23.3574 47.879 23.3748 51.2698 23.3639C51.7639 23.3639 52.2928 23.4619 52.7085 23.0614C52.7085 23.044 52.7085 23.0266 52.7085 23.007C52.7106 23.007 52.7193 23.007 52.7193 23.007L52.8129 22.9983C52.8216 22.8024 52.8325 22.6065 52.8412 22.4085C52.8238 21.2702 52.8064 20.1297 52.789 18.9915C52.5365 18.5061 52.0838 18.7216 51.7247 18.7194C47.9268 18.702 44.1312 18.6911 40.3333 18.7238C39.5737 18.7303 39.2951 18.4952 39.3517 17.7357C39.4083 16.9783 39.3691 16.2165 39.3713 15.4548C44.4402 15.457 49.5091 15.4591 54.578 15.4613C54.763 15.3438 55.0764 15.5571 55.1787 15.2263C55.1831 15.0391 55.1896 14.8519 55.1939 14.6647C55.2614 14.6125 55.3245 14.5516 55.3811 14.4732C55.7598 13.3785 55.5705 12.2489 55.5617 11.1367C55.553 9.94407 55.331 9.78519 54.1405 9.78737C46.584 9.79172 39.0274 9.79607 31.4687 9.78519C29.8255 9.78301 29.6775 9.88313 29.6753 11.5329C29.6645 17.8314 29.6666 24.1322 29.6753 30.4308C29.6753 30.964 29.5992 31.5299 30.0279 31.9717C38.5769 31.976 47.1259 31.9804 55.6749 31.9804C55.8882 31.9804 56.1037 31.939 56.317 31.9194C56.6478 31.6343 56.4693 31.2556 56.478 30.9226C56.515 29.6821 56.5194 28.4393 56.5346 27.1966C56.5281 27.0029 56.5216 26.8092 56.5128 26.6155L56.5194 26.6177ZM39.1798 17.6116C39.2494 18.6585 39.4932 18.8696 40.5901 18.9153C40.1548 18.9458 39.75 18.9218 39.4758 18.6737C39.1885 18.4125 39.1515 18.0295 39.1798 17.6116Z"
                    fill="#019935"
                  />
                  <path
                    d="M86.5626 26.5874C86.5626 26.5569 86.5604 26.5264 86.5583 26.4981C86.1186 26.1608 85.6006 26.2108 85.1001 26.2087C83.5461 26.1956 81.9921 26.2043 80.4381 26.2043C77.3302 26.2043 74.2223 26.213 71.1143 26.1956C70.666 26.1934 70.1349 26.3197 69.8346 25.8256C69.1468 24.6873 69.8651 23.4163 71.1992 23.4119C74.5248 23.4032 77.8504 23.4141 81.1738 23.4054C81.744 23.4054 82.3382 23.4881 82.8562 23.1334C82.8627 23.0964 82.8649 23.0572 82.8692 23.0202C83.1108 22.8918 83.0259 22.6241 83.076 22.4151C83.076 21.4728 83.076 20.5304 83.076 19.5858C83.0346 19.403 83.0847 19.1832 82.9541 19.0352C82.9541 19.033 82.9541 19.0286 82.9541 19.0264C82.9193 18.9633 82.8757 18.9111 82.8235 18.8697C82.7386 18.4584 82.4666 18.5629 82.1858 18.7H70.2329C70.1393 18.6303 70.0457 18.5846 69.9499 18.5585C69.9304 18.5324 69.9108 18.5063 69.8934 18.4758C69.5647 17.5399 69.5495 16.6063 69.9086 15.6769C69.9238 15.6508 69.9412 15.629 69.9587 15.6073C70.0501 15.5833 70.1415 15.5376 70.2329 15.4702C70.629 15.4549 71.0229 15.4288 71.419 15.4288C75.6021 15.4266 79.783 15.4353 83.9661 15.4223C85.6311 15.4179 85.4048 15.6835 85.4287 13.9097C85.4461 12.6843 85.457 11.4568 85.47 10.2315C85.2459 9.87675 84.9172 9.99863 84.606 10.0291C84.5929 9.99646 84.5821 9.96163 84.5668 9.92899C84.1207 9.7157 83.6418 9.80275 83.1783 9.80275C78.3727 9.79623 73.5672 9.81146 68.7616 9.79405C66.126 9.78317 63.4903 9.86587 60.8525 9.74617C60.3062 9.72005 59.6837 9.80058 60.0407 10.6603C60.1539 10.6864 60.23 10.7408 60.2017 10.8736C59.9471 11.0999 60.0189 11.4068 60.0189 11.6854C60.0167 18.1559 60.0146 24.6264 60.0233 31.0969C60.0233 31.3973 59.884 31.7629 60.2627 31.9697C69.0076 31.9697 77.7524 31.9697 86.4995 31.9697C86.9065 31.7259 86.7324 31.3233 86.7389 30.9903C86.765 29.6561 86.7628 28.322 86.7715 26.9856C86.7389 26.8311 86.728 26.6614 86.5648 26.5917L86.5626 26.5874Z"
                    fill="#019935"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2638_17565">
                    <rect width="139.298" height="32" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </DialogTitle>
          </DialogHeader>

          <hr />

          <div className="grid grid-cols-2 gap-9">
            {/* left */}
            <div className="">
              <h4 className="text-xs text-primary-400">
                Welcome to Teez, Kawsar!
              </h4>

              <h2 className="text-gray-400 font-bold text-2xl mt-2 mb-2">
                Select your Magic plan to Add Inventory!
              </h2>

              <p className="text-gray-200 text-xs mb-6">
                Congratulations on reaching this milestone! You&apos;re one step
                closer to your goal!
              </p>

              <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue="item-1"
              >
                <AccordionItem
                  value="item-1"
                  className="p-0 pb-2 rounded-none mb-3"
                >
                  <AccordionTrigger className="text-xs font-semibold text-gray-400">
                    What&&apos;s included in the monthly voice minutes?
                  </AccordionTrigger>
                  <AccordionContent className="text-xs font-normal text-gray-300">
                    Your plan&apos;s included minutes apply to all voice
                    conversations handled by the AI assistant on behalf of your
                    dealership. This includes inbound buyer inquiries,
                    appointment bookings, trade-in discussions, and more.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-2"
                  className="p-0 pb-2 rounded-none mb-3"
                >
                  <AccordionTrigger className="text-xs font-semibold text-gray-400">
                    What happens if we exceed our included voice minutes?
                  </AccordionTrigger>
                  <AccordionContent className="text-xs font-normal text-gray-300">
                    If you exceed your included voice minutes, you will be
                    charged for additional minutes at the rate specified in your
                    plan. You can monitor your usage through the dashboard to
                    avoid unexpected charges.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-3"
                  className="p-0 pb-2 rounded-none border-none mb-3"
                >
                  <AccordionTrigger className="text-xs font-semibold text-gray-400">
                    Is there a contract or can I cancel anytime?
                  </AccordionTrigger>
                  <AccordionContent className="text-xs font-normal text-gray-300">
                    There is no long-term contract required. You can cancel your
                    subscription at any time through your account settings. Your
                    plan will remain active until the end of the current billing
                    cycle.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* right */}
            <div className="flex flex-col gap-3">
              {plans.map((plan, index) => {
                return (
                  <label
                    key={index}
                    className="has-[:checked]:border-primary-400 has-[:checked]:text-primary-900 has-[:checked]:ring-indigo-200 flex w-full border border-gray-50 rounded-xl pt-4 px-4 cursor-pointer transition-all gap-3 group flex-col"
                  >
                    <div className="flex gap-3">
                      <input
                        defaultChecked={index === 0} // Default to the first plan being selected
                        name="plan"
                        type="radio"
                        className="box-content h-2 w-2 appearance-none rounded-full border-[5px] border-white bg-white bg-clip-padding outline-none ring-1 ring-gray-950/10 checked:border-primary-500 checked:ring-primary-500 mt-1"
                      />
                      <div className="flex justify-between w-full">
                        {/* title, description */}
                        <div className="">
                          <h2 className="text-gray-400 font-semibold text-lg mb-1">
                            {plan.name}
                          </h2>
                          <h4 className="text-xs text-gray-400">
                            Perfect for sell used cars
                          </h4>
                        </div>

                        {/* pricing */}
                        <div className="">
                          <span className="group-has-[:checked]:text-primary-400 text-gray-400">
                            $
                          </span>
                          <span className="group-has-[:checked]:text-primary-400 text-gray-400 font-bold text-3xl">
                            {plan.price}
                          </span>
                          /month
                        </div>
                      </div>
                    </div>

                    {/* benefits  */}
                    <div className="pl-[25px]">
                      {plan?.benefits?.map((benefit, index) => {
                        return (
                          <div
                            key={index}
                            className="text-xs text-gray-300 mb-3 flex gap-2"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <rect
                                x="16"
                                y="16"
                                width="16"
                                height="16"
                                rx="8"
                                transform="rotate(-180 16 16)"
                                fill="#55BB78"
                              />
                              <path
                                d="M6.98228 10.6663C6.77947 10.6663 6.58738 10.589 6.4643 10.4557L4.79846 8.65701C4.74695 8.60146 4.70935 8.53817 4.68781 8.47074C4.66626 8.40331 4.66118 8.33307 4.67287 8.26404C4.68457 8.195 4.71279 8.12853 4.75594 8.06842C4.79909 8.00831 4.85631 7.95573 4.92434 7.9137C4.99234 7.8715 5.06987 7.84068 5.15248 7.823C5.23509 7.80533 5.32115 7.80115 5.40574 7.8107C5.49033 7.82026 5.57178 7.84336 5.64542 7.87869C5.71906 7.91402 5.78345 7.96087 5.83489 8.01657L6.93099 9.19916L9.68688 5.58282C9.77828 5.46342 9.92389 5.37851 10.0918 5.34673C10.2597 5.31495 10.4362 5.33888 10.5825 5.41328C10.887 5.56796 10.9807 5.89561 10.7904 6.14478L7.53429 10.4157C7.47871 10.4889 7.40209 10.5499 7.3111 10.5935C7.2201 10.637 7.11747 10.6618 7.01212 10.6656C7.00186 10.6663 6.99254 10.6663 6.98228 10.6663Z"
                                fill="white"
                              />
                            </svg>
                            {benefit}
                          </div>
                        );
                      })}
                    </div>
                  </label>
                );
              })}

              <span className="underline text-xs font-medium text-primary-400 flex items-end justify-end cursor-pointer">
                Show all plan Detail View
              </span>
            </div>
          </div>

          {/* footer */}
          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="outline"
              className="text-primary-400 border-primary-400"
            >
              Cancel
            </Button>
            <Button variant="primary">
              Choose & Continue{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M7.73271 4.20694C8.03263 3.92125 8.50737 3.93279 8.79306 4.23271L13.7944 9.48318C14.0703 9.77285 14.0703 10.2281 13.7944 10.5178L8.79306 15.7682C8.50737 16.0681 8.03263 16.0797 7.73271 15.794C7.43279 15.5083 7.42125 15.0336 7.70694 14.7336L12.2155 10.0005L7.70694 5.26729C7.42125 4.96737 7.43279 4.49264 7.73271 4.20694Z"
                  fill="white"
                />
              </svg>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* upload summery */}
      <Dialog
        open={modals.uploadSummeryDetails}
        onOpenChange={() => {
          setModals((prev) => ({
            ...prev,
            uploadSummeryDetails: !prev.uploadSummeryDetails,
          }));
        }}
      >
        <DialogContent className="sm:max-w-[900px] max-h-full overflow-auto">
          <DialogHeader>
            <DialogTitle>
              <div className="flex items-center justify-between">
                <h2 className="text-gray-400 font-bold text-2xl">
                  Upload Summary
                </h2>
              </div>
            </DialogTitle>
          </DialogHeader>

          <hr />

          <div className="">
            <table className="table-auto w-full border border-gray-100 rounded-xl">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Stock ID
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Error
                  </th>
                </tr>
              </thead>

              <tbody>
                {uploadSummery.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="border border-gray-100 px-4 py-2">
                        #{index}
                      </td>
                      <td className="border border-gray-100 px-4 py-2">
                        {item.error}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* footer */}
          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="primary"
              onClick={() => {
                setModals((prev) => ({
                  ...prev,
                  uploadSummeryDetails: false,
                }));
              }}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
