"use client";

import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogDescription,
} from "@/components/shadcn/dialog";
import { useGetDealerProfileQuery } from "@/features/dealer/dealerProfileSlice";
import { Button } from "@/components/shadcn/button";
import { Controller, useForm } from "react-hook-form";
import { Input, InputFile } from "@/components/shadcn/input";

const ProfileHeader = () => {
  const { data } = useGetDealerProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const { control, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      // vin: "",
      // brand: "",
      // model: "",

      // year: "",
      // series: "",
      // trim: "",
      // odometer: "",
      // odometer_unit: "km",
      // exterior_color: "",
      // interior_color: "",
      // options: "",

      profile_cover: "",
      profile_picture: "",
      business_name: "",
      business_email: "",
    },
  });

  const [modals, setModals] = useState({
    editProfile: true,
  });

  const dealerProfileData = data?.data;

  const handleEditDealerProfile = (formData: any) => {
    console.log("Form Data:", formData);
  };

  return (
    <div className="relative border rounded-2xl min-h-[252px] md:h-[252px]">
      <div className="w-full bg-[#2b3545] overflow-hidden rounded-t-2xl h-[100px]">
        <Image
          src={"/images/dashboard/profile/cover-img.png"}
          alt="BMW Car House Cover"
          width={1000}
          height={300}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute bottom-2.5 left-4 md:bottom-9 md:left-9 right-4 md:right-auto">
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="rounded-lg overflow-hidden border-2 border-white bg-white shadow w-[120px] h-[120px] md:w-[160px] md:h-[160px] mx-auto md:mx-0">
            <Image
              src={
                dealerProfileData?.profile_picture ||
                "https://dummyimage.com/160x160/000/fff"
              }
              alt="BMW Logo"
              width={160}
              height={160}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-xl md:text-2xl font-semibold text-[#2b3545]">
              {dealerProfileData?.dealer_details?.business_name || "N/A"}
            </h1>
            <div className="mt-2 space-y-1">
              <div className="flex items-center text-[#555d6a] justify-center md:justify-start">
                <Mail className="w-4 h-4 text-[#018b30] mr-2" />
                <span className="text-sm md:text-base">
                  {dealerProfileData?.dealer_details?.business_email || "N/A"}
                </span>
              </div>
              <div className="flex items-center text-[#555d6a] justify-center md:justify-start">
                <MapPin className="w-4 h-4 text-[#018b30] mr-2" />
                <span className="text-sm md:text-base">
                  {dealerProfileData?.country || "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* edit button */}
      <div className="absolute bottom-4 right-4 md:top-6 md:right-6">
        <button
          className="px-4 py-2 bg-[#018b30] text-white rounded-lg shadow hover:bg-[#016f24] transition-colors"
          onClick={() => setModals((prev) => ({ ...prev, editProfile: true }))}
        >
          Edit Profile
        </button>
      </div>

      {/* modals */}
      <Dialog
        open={modals.editProfile}
        onOpenChange={(e) => {
          setModals((prev) => ({ ...prev, editProfile: !prev.editProfile }));
        }}
      >
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Edit Details</DialogTitle>
            <DialogDescription>
              Add your documents here, and you can upload up to 5 files max
            </DialogDescription>
          </DialogHeader>

          {/* body */}
          <div className="">
            <form onSubmit={handleSubmit(handleEditDealerProfile)} className="">
              <div className="grid grid-cols-2 gap-x-4 mb-6 ">
                {/* Cover Profile */}
                <div className="flex flex-col mb-3">
                  <label
                    htmlFor="profile_cover"
                    className="text-sm mb-1 text-[#414651] font-medium"
                  >
                    Profile Cover
                  </label>
                  <Controller
                    name="profile_cover"
                    control={control}
                    rules={{ required: "Profile Cover is required" }}
                    render={({ field, formState: { errors } }) => (
                      <InputFile
                        id="profile_cover"
                        className="h-11"
                        placeholder="profile_cover"
                        error={errors?.profile_cover?.message}
                        {...field}
                        onChange={(e: any) => {
                          setValue("profile_cover", e.target.files);
                        }}
                      />
                    )}
                  />
                </div>

                {/* Cover Profile */}
                <div className="flex flex-col mb-3">
                  <label
                    htmlFor="profile_cover"
                    className="text-sm mb-1 text-[#414651] font-medium"
                  >
                    Profile Cover
                  </label>
                  <Controller
                    name="profile_cover"
                    control={control}
                    rules={{ required: "Profile Cover is required" }}
                    render={({ field, formState: { errors } }) => (
                      <InputFile
                        id="profile_cover"
                        className="h-11"
                        placeholder="profile_cover"
                        error={errors?.profile_cover?.message}
                        {...field}
                        onChange={(e: any) => {
                          setValue("profile_cover", e.target);
                        }}
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
                  onClick={(e: any) => {
                    e.preventDefault();
                    setModals({ ...modals, editProfile: false });
                  }}
                >
                  Cancel
                </Button>

                <Button
                  variant={"primary"}
                  type={"submit"}
                  className="h-11 rounded-lg"
                  // loading={isLoadingEditVehicle}
                >
                  Update
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileHeader;
