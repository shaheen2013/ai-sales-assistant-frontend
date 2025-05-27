"use client";

import Link from "next/link";
import moment from "moment";
import { useState } from "react";
import { Send } from "lucide-react";
import { useDebounceValue } from "usehooks-ts";
import { useSearchParams } from "next/navigation";
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

import { beautifyErrors } from "@/lib/utils";
import { useToast } from "@/hooks/useToast";
import { Button } from "@/components/shadcn/button";
import { Input, InputCopy } from "@/components/shadcn/input";

// import RecentFiles from "./RecentFiles";
// import InventoryCarList from "./inventoryCarList";
// import InventoryFilesList from "./inventoryFilesList";
// import DragAndDropUploader from "./DragAndDropUploader";

import {
  useGetInventoryFilesQuery,
  useGetVehicleInventoryQuery,
  useDeleteVehicleInventoryMutation,
  useCreateVehicleInventoryMutation,
  useVehicleInventoryUploadMutation,
} from "@/features/inventory/inventorySlice";
import SomethingWentWrong from "@/components/SomethingWentWrong";
import { useGetNewsLetterQuery } from "@/features/newsLetter/newsLetterSlice";

export default function DashboardForumsTableUI() {
  const toast = useToast();
  const searchParams = useSearchParams();

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

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const [modals, setModals] = useState({
    addInventory: false,
    addPdf: false,
  });

  // const search = searchParams.get("search");
  const filter = searchParams.get("filter");
  const sort = searchParams.get("sort");

  const [debouncedSearchValue, setSearch] = useDebounceValue("", 500);

  // rtk query
  const {
    data: getVehicleList,
    error: errorGetVehicle,
    isFetching: isFetchingGetVehicle,
    refetch: refetchGetVehicle,
  } = useGetVehicleInventoryQuery({
    search: debouncedSearchValue,
    filter: filter,
    sort: sort,
  });

  const {
    data: getGetNewsLetter,
    error: errorNewsLetter,
    isFetching: isFetchingGetNewsLetter,
    refetch: refetchGetNewsLetter,
  } = useGetNewsLetterQuery({});

  console.log("debugging => ", getGetNewsLetter);

  // rtk mutation
  const [createVehicleInventory, { isLoading: isLoadingCreateVehicle }] =
    useCreateVehicleInventoryMutation();

  const [deleteVehicleInventory, { isLoading: isLoadingDeleteVehicle }] =
    useDeleteVehicleInventoryMutation();

  const [inventoryUpload, { isLoading: isLoadingVehicleInventoryUplaod }] =
    useVehicleInventoryUploadMutation();

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

  const handleUploadInventoryFiles = async () => {
    try {
      const formData = new FormData();

      formData.append("inventory_file", uploadedFiles[0]);

      const { data, error } = await inventoryUpload(formData);

      if (error) {
        console.log(error);
        toast("error", beautifyErrors(error));
        return;
      }

      toast("success", `${data?.success}  ${data?.failled}`, {
        duration: 10000,
      });

      setModals({ ...modals, addPdf: false });
      setUploadedFiles([]);

      //   refetchGetInventoryFiles();
    } catch (error) {
      console.log(error);
      toast("error", beautifyErrors(error));
    }
    console.log("files => ", uploadedFiles);
  };

  if (errorGetVehicle) {
    return <SomethingWentWrong />;
  }

  return (
    <div className="">
      {/* add inventory / place add pdf  */}
      <div className="flex justify-between items-center gap-3 mb-6">
        <h2 className="text-gray-400 font-semibold text-2xl">Newsletter</h2>

        <Button variant="primary" className="!py-3 h-11">
          <Link
            href="/dashboard/newsletters/send"
            className="flex items-center gap-2"
          >
            <Send />
            Send Newsletter
          </Link>
        </Button>
      </div>

      {/* table wrapper */}
      <div className="w-full">
        <div className="rounded-md border p-3">
          {/* header */}
          <div className="flex justify-between items-center mb-4">
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
                  value={""}
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

          {/* {selectedPanel == "list" ? (
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
          )} */}

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

      {/* add pdf modal */}
      <Dialog
        open={modals.addPdf}
        onOpenChange={(e) => {
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
            {/* <DragAndDropUploader
              value={uploadedFiles}
              onChange={(files) => setUploadedFiles(files)}
            /> */}
          </div>

          <div className="text-gray-400">Only support .pdf, .doc, .csv</div>

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
              loading={isLoadingVehicleInventoryUplaod}
              onClick={handleUploadInventoryFiles}
            >
              Next
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
