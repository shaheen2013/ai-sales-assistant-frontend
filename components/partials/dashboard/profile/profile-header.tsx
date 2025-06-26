"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Mail, MapPin, SquarePen } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogDescription,
} from "@/components/shadcn/dialog";
import {
  useGetDealerProfileQuery,
  useUpdateDealerBusinessProfileMutation,
} from "@/features/dealer/dealerProfileSlice";
import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import { useToast } from "@/hooks/useToast";
import { beautifyErrors } from "@/lib/utils";

const ProfileHeader = () => {
  const toast = useToast();

  const { data } = useGetDealerProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [updateDealerBusinessProfile, { isLoading }] =
    useUpdateDealerBusinessProfileMutation();

  const { control, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      business_name: "",
      business_email: "",
    },
  });

  useEffect(() => {
    // Set default values from dealer profile data
    if (data?.data) {
      const { dealer_details } = data.data;

      setValue("business_name", dealer_details?.business_name || "");
      setValue("business_email", dealer_details?.business_email || "");
    }
  }, [data]);

  const [modals, setModals] = useState({
    editProfile: true,
  });

  const dealerProfileData = data?.data;

  const handleEditDealerProfile = async (formData: any) => {
    const payload = new FormData();
    payload.append("business_name", formData.business_name);
    payload.append("business_email", formData.business_email);

    try {
      const { data, error } = await updateDealerBusinessProfile(payload);

      if (error) {
        console.error("Error updating dealer profile:", error);
        toast("error", beautifyErrors(error));
        return;
      }

      if (data) {
        console.log("Dealer profile updated successfully:", data);

        toast("success", data?.detail || "Profile updated successfully");

        reset(); // Reset the form after successful update
        setModals((prev) => ({ ...prev, editProfile: false }));
      }
    } catch (error) {
      console.error("Error updating dealer profile:", error);
    }
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
            <div className="flex items-center justify-center md:justify-start gap-2">
              <h1 className="text-xl md:text-2xl font-semibold text-[#2b3545] ">
                {dealerProfileData?.dealer_details?.business_name || "N/A"}{" "}
              </h1>

              <SquarePen
                className="cursor-pointer"
                onClick={() => {
                  setModals((prev) => ({ ...prev, editProfile: true }));
                }}
              />
            </div>

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

      {/* modals */}
      <Dialog
        open={modals.editProfile}
        onOpenChange={(e) => {
          setModals((prev) => ({ ...prev, editProfile: !prev.editProfile }));
        }}
      >
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Edit Business Details</DialogTitle>
            <DialogDescription>
              Add your documents here, and you can upload up to 5 files max
            </DialogDescription>
          </DialogHeader>

          {/* body */}
          <div className="">
            <form onSubmit={handleSubmit(handleEditDealerProfile)} className="">
              <div className="grid grid-cols-2 gap-x-4 mb-6 ">
                {/* Business Name */}
                <div className="flex flex-col mb-3">
                  <label
                    htmlFor="business_name"
                    className="text-sm mb-1 text-[#414651] font-medium"
                  >
                    Business Name
                  </label>
                  <Controller
                    name="business_name"
                    control={control}
                    rules={{ required: "Business Name is required" }}
                    render={({ field, formState: { errors } }) => (
                      <Input
                        id="business_name"
                        className="h-11"
                        placeholder="Business Name"
                        error={errors?.business_name?.message}
                        {...field}
                      />
                    )}
                  />
                </div>

                {/* Business Email */}
                <div className="flex flex-col mb-3">
                  <label
                    htmlFor="business_email"
                    className="text-sm mb-1 text-[#414651] font-medium"
                  >
                    Business Email
                  </label>
                  <Controller
                    name="business_email"
                    control={control}
                    rules={{ required: "Business Email is required" }}
                    render={({ field, formState: { errors } }) => (
                      <Input
                        id="business_email"
                        className="h-11"
                        placeholder="Business Email"
                        error={errors?.business_email?.message}
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
                  loading={isLoading}
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
