"use client";
import { Button } from "@/components/shadcn/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/shadcn/form";
import { Input } from "@/components/shadcn/input";
import { Textarea } from "@/components/shadcn/textarea";
import {
  useGetDealerProfileQuery,
  useUpdateDealerProfileMutation,
} from "@/features/dealer/dealerProfileSlice";
import { useToast } from "@/hooks/useToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleHelp, Upload } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import * as z from "zod";
import EditProfileSectionSkeleton from "../skeleton/edit-profile-section-skeleton";
import { AvatarImage } from "../svg-icons";
import CardInformations from "./card-informations";
import { CountryDropdown } from "./country-list-dropdown";
import { PhoneInput } from "./phone-input-with-country-list";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  phone_number: z
    .string()
    .min(1, "Phone number is required")
    .max(20, "Phone number must be less than 20 characters")
    .refine((value) => isValidPhoneNumber(value), {
      message: "Invalid phone number for the selected country",
    }),
  profile_picture: z.instanceof(File).optional(),
  street_address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  zip_code: z.string().optional(),
  about: z.string().optional(),
  // services: z.array(z.string()).min(1, 'At least one service is required'),
});

export type TUpdateDealerProfileValues = z.infer<typeof formSchema>;

export default function EditProfileSection() {
  const toast = useToast();

  const [profileImage, setProfileImage] = useState<File | null>(null);

  const { data, isLoading } = useGetDealerProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const dealerProfileData = data?.data;

  const [updateDealerProfile, { isLoading: isUpdating }] =
    useUpdateDealerProfileMutation();

  const form = useForm<TUpdateDealerProfileValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
      street_address: "",
      city: "",
      state: "",
      country: "",
      zip_code: "",
      about: "",
    },
  });

  useEffect(() => {
    if (dealerProfileData) {
      form.reset({
        name: dealerProfileData.name || "",
        email: dealerProfileData.email || "",
        phone_number: dealerProfileData.phone_number || "",
        street_address: dealerProfileData.street_address || "",
        city: dealerProfileData.city || "",
        state: dealerProfileData.state || "",
        country: dealerProfileData.country || "",
        zip_code: dealerProfileData.zip_code || "",
        about: dealerProfileData.about || "",
      });
    }
  }, [dealerProfileData, form]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImage(file);
      form.setValue("profile_picture", file);
    }
  };

  const onSubmit = async (data: TUpdateDealerProfileValues) => {
    try {
      const formData = new FormData();
      // Append all non-file fields
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone_number", data.phone_number);
      formData.append("street_address", data.street_address || "");
      formData.append("city", data.city || "");
      formData.append("state", data.state || "");
      formData.append("country", data.country || "");
      formData.append("zip_code", data.zip_code || "");
      formData.append("about", data.about || "");

      // Append profile picture if exists
      if (profileImage instanceof File) {
        formData.append("profile_picture", profileImage);
      }

      // Call the mutation with FormData
      const response = await updateDealerProfile(formData).unwrap();
      if (response) {
        toast("success", response.detail || "Profile updated successfully");
      }
    } catch (error: any) {
      toast("error", error.data.detail || "Failed to update profile");
    }
  };

  if (isLoading) return <EditProfileSectionSkeleton />;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="p-3 sm:p-6 bg-[#ffffff] rounded-lg border border-[#EAEBEC] shadow-sm"
      >
        <h1 className="text-xl sm:text-2xl font-semibold text-[#2b3545] mb-4 sm:mb-6">
          Update Profile
        </h1>
        <div className="flex flex-col space-y-4 sm:space-y-6">
          {/* Profile Image Upload */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="size-[100px] sm:size-[130px] bg-[#f5f5f5] rounded-full flex items-center justify-center">
              {profileImage ? (
                <Image
                  src={URL.createObjectURL(profileImage)}
                  alt="Profile"
                  width={130}
                  height={130}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <>
                  {dealerProfileData?.profile_picture ? (
                    <Image
                      src={dealerProfileData.profile_picture}
                      alt="Profile"
                      width={130}
                      height={130}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <AvatarImage />
                  )}
                </>
              )}
            </div>
            <div
              className="flex-1 w-full border border-[#d5d7da] rounded-lg p-3 sm:p-4 flex flex-col items-center justify-center min-h-[100px] sm:min-h-[120px] transition-all duration-200"
              onDragOver={(e) => {
                e.preventDefault();
                e.currentTarget.classList.add(
                  "border-[#019935]",
                  "bg-[#f0f9f2]",
                  "border-dashed",
                  "border-2",
                  "scale-[1.02]"
                );
              }}
              onDragEnter={(e) => {
                e.preventDefault();
                e.currentTarget.classList.add(
                  "border-[#019935]",
                  "bg-[#f0f9f2]",
                  "border-dashed",
                  "border-2",
                  "scale-[1.02]"
                );
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                e.currentTarget.classList.remove(
                  "border-[#019935]",
                  "bg-[#f0f9f2]",
                  "border-dashed",
                  "border-2",
                  "scale-[1.02]"
                );
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.currentTarget.classList.remove(
                  "border-[#019935]",
                  "bg-[#f0f9f2]",
                  "border-dashed",
                  "border-2",
                  "scale-[1.02]"
                );
                const file = e.dataTransfer.files[0];
                if (file && file.type.startsWith("image/")) {
                  setProfileImage(file);
                  form.setValue("profile_picture", file);
                }
              }}
            >
              <input
                type="file"
                id="profile_picture"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <label
                htmlFor="profile_picture"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="h-5 w-5 text-[#019935] mb-2" />
                <p className="text-center text-sm sm:text-base">
                  <span className="text-[#019935] font-medium">
                    Click to upload
                  </span>
                  <span className="text-[#555d6a]"> or drag and drop</span>
                </p>
                <p className="text-[#717882] text-xs sm:text-sm mt-1 text-center">
                  PNG, JPG or GIF (max. 800×400px)
                </p>
              </label>
            </div>
          </div>

          {/* Form Fields - First Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-1 sm:space-y-2">
              <label
                htmlFor="name"
                className="text-[#555d6a] flex items-center text-sm sm:text-base"
              >
                Name <span className="text-red-500 ml-0.5">*</span>
              </label>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your business name"
                        className="border-[#d5d7da] rounded-md focus:border-[#019935] focus:ring-[#019935]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-1 sm:space-y-2">
              <label
                htmlFor="email"
                className="text-[#555d6a] flex items-center text-sm sm:text-base"
              >
                Email <span className="text-red-500 ml-0.5">*</span>
              </label>
              <FormField
                control={form.control}
                name="email"
                disabled
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Email Here"
                        className="border-[#d5d7da] rounded-md focus:border-[#019935] focus:ring-[#019935]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Form Fields - Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-1 sm:space-y-2">
              <label
                htmlFor="phone_number"
                className="text-[#555d6a] flex items-center text-sm sm:text-base"
              >
                Phone Number <span className="text-red-500 ml-0.5">*</span>
              </label>

              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PhoneInput
                        {...field}
                        className="w-full outline-none rounded-md"
                        placeholder="Enter a phone number"
                        // defaultCountry="US"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-1 sm:space-y-2">
              <label
                htmlFor="street_address"
                className="text-[#555d6a] text-sm sm:text-base"
              >
                Street
              </label>
              <FormField
                control={form.control}
                name="street_address"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Your Street Here"
                        className="border-[#d5d7da] rounded-md focus:border-[#019935] focus:ring-[#019935]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Form Fields - Third Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-1 sm:space-y-2">
              <label
                htmlFor="city"
                className="text-[#555d6a] text-sm sm:text-base"
              >
                City
              </label>
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter Your City Here"
                        className="border-[#d5d7da] rounded-md focus:border-[#019935] focus:ring-[#019935]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-1 sm:space-y-2">
              <label
                htmlFor="state"
                className="text-[#555d6a] text-sm sm:text-base"
              >
                State
              </label>
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter Your State Here"
                        className="border-[#d5d7da] rounded-md focus:border-[#019935] focus:ring-[#019935]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Form Fields - Fourth Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-1 sm:space-y-2">
              <label
                htmlFor="country"
                className="text-[#555d6a] text-sm sm:text-base"
              >
                Country
              </label>
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <CountryDropdown
                      placeholder="Choose Country"
                      defaultValue={field.value}
                      onChange={(country) => {
                        field.onChange(country.name);
                      }}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-1 sm:space-y-2">
              <label
                htmlFor="zip_code"
                className="text-[#555d6a] text-sm sm:text-base"
              >
                Zip Code
              </label>
              <FormField
                control={form.control}
                name="zip_code"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Zip Code Here"
                        className="border-[#d5d7da] rounded-md focus:border-[#019935] focus:ring-[#019935]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Form Fields - Fifth Row */}
          <div className="grid grid-cols-1  gap-4 sm:gap-6">
            <div className="space-y-1 sm:space-y-2">
              <label
                htmlFor="about"
                className="text-[#555d6a] flex items-center text-sm sm:text-base"
              >
                Short Bio
                <CircleHelp className="h-4 w-4 ml-1 text-[#a4a7ae]" />
              </label>
              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Enter your self"
                        className="focus:border-[#019935] min-h-[100px] sm:min-h-[120px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-[#717882] text-xs sm:text-sm">
                Enter your short bio here
              </p>
            </div>
          </div>
          {/* Card Information */}
          {/* <CardInformations /> */}

          {/* Action Buttons */}
          <div className="flex justify-start space-x-3 sm:space-x-4 mt-4">
            <Button
              type="button"
              variant="outline"
              className="border-[#d5d7da] text-[#555d6a] text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2"
              onClick={() => {
                form.reset();
                toast("success", "Changes removed!");
              }}
            >
              Discard
            </Button>
            <Button
              type="submit"
              className="bg-[#019935] hover:bg-[#018a30] text-white text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2"
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
