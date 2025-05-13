'use client';

import { Button } from '@/components/shadcn/button';
import { Input } from '@/components/shadcn/input';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/shadcn/form';
import { Textarea } from '@/components/shadcn/textarea';
import {
  useGetDealerProfileQuery,
  useUpdateDealerProfileMutation,
} from '@/features/dealer/dealerProfileSlice';
import { useToast } from '@/hooks/useToast';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ChevronRight,
  CircleHelp,
  Pencil,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { CountryDropdown } from './country-list-dropdown';
import { PhoneInput } from './phoneNo-input-with-country-list';

// Form validation schema
const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  phone_number: z.string().min(1, 'Phone number is required'),
  profile_picture: z.instanceof(File).optional(),
  street_address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  zip_code: z.string().optional(),
  about: z.string().optional(),
  // services: z.array(z.string()).min(1, 'At least one service is required'),
});

export type editDealerProfileFormValues = z.infer<typeof formSchema>;

export default function EditProfileSection() {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'Sales',
    'Financing',
  ]);
  const [newService, setNewService] = useState<string>('');
  const toast = useToast();
  const {
    data: dealerProfileData,
    isLoading,
    isError,
  } = useGetDealerProfileQuery();

  console.log('dealerProfileData >>> ', dealerProfileData);

  const [updateDealerProfile, { isLoading: isUpdating }] =
    useUpdateDealerProfileMutation();

  const form = useForm<editDealerProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: dealerProfileData?.name || '',
      email: dealerProfileData?.email || '',
      phone_number: dealerProfileData?.phone_number || '',
      street_address: dealerProfileData?.street_address || '',
      city: dealerProfileData?.city || '',
      state: dealerProfileData?.state || '',
      country: dealerProfileData?.country || '',
      zip_code: dealerProfileData?.zip_code || '',
      about: dealerProfileData?.about || '',
      // services: selectedServices,
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImage(file);
      form.setValue('profile_picture', file);
    }
  };

  const addService = (service: string) => {
    if (service && !selectedServices.includes(service)) {
      const newServices = [...selectedServices, service];
      setSelectedServices(newServices);
      // form.setValue('services', newServices);
      setNewService('');
    }
  };

  const removeService = (service: string) => {
    const newServices = selectedServices.filter((s) => s !== service);
    setSelectedServices(newServices);
    // form.setValue('services', newServices);
  };

  const onSubmit = async (data: editDealerProfileFormValues) => {
    try {
      const formData = new FormData();

      // Append all non-file fields
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('phone_number', data.phone_number);
      formData.append('street_address', data.street_address || '');
      formData.append('city', data.city || '');
      formData.append('state', data.state || '');
      formData.append('country', data.country || '');
      formData.append('zip_code', data.zip_code || '');
      formData.append('about', data.about || '');

      // Append profile picture if exists
      if (profileImage instanceof File) {
        formData.append('profile_picture', profileImage);
      }

      // Call the mutation with FormData
      const response = await updateDealerProfile(formData).unwrap();
      if (response) {
        console.log('successs >>> ', response.detail);
        toast('success', response?.detail);
      } else {
        toast('error', 'Failed to update profile');
      }
    } catch (error) {
      toast('error', 'Failed to update profile');
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" p-6 bg-[#ffffff] rounded-lg border border-[#EAEBEC] shadow-sm"
      >
        <h1 className="text-2xl font-semibold text-[#2b3545] mb-6">
          Update Profile
        </h1>

        <div className="flex flex-col space-y-6">
          {/* Profile Image Upload */}
          <div className="flex items-center space-x-4">
            <div className="size-[130px] bg-[#f5f5f5] rounded-full flex items-center justify-center">
              {profileImage ? (
                <Image
                  src={URL.createObjectURL(profileImage)}
                  alt="Profile"
                  width={130}
                  height={130}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-[100px] text-[#a4a7ae]"
                >
                  <path
                    d="M20 20C24.1421 20 27.5 16.6421 27.5 12.5C27.5 8.35786 24.1421 5 20 5C15.8579 5 12.5 8.35786 12.5 12.5C12.5 16.6421 15.8579 20 20 20Z"
                    stroke="#a4a7ae"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M33.75 35C33.75 28.7868 27.7132 23.75 20 23.75C12.2868 23.75 6.25 28.7868 6.25 35"
                    stroke="#a4a7ae"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>

            <div className="flex-1 border border-[#d5d7da] rounded-lg p-4 flex flex-col items-center justify-center min-h-[120px]">
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
                <p className="text-center">
                  <span className="text-[#019935] font-medium">
                    Click to upload
                  </span>
                  <span className="text-[#555d6a]"> or drag and drop</span>
                </p>
                <p className="text-[#717882] text-sm mt-1">
                  SVG, PNG, JPG or GIF (max. 800×400px)
                </p>
              </label>
            </div>
          </div>

          {/* Form Fields - First Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-[#555d6a] flex items-center"
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

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-[#555d6a] flex items-center"
              >
                Email <span className="text-red-500 ml-0.5">*</span>
              </label>
              <FormField
                control={form.control}
                name="email"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="phone_number"
                className="text-[#555d6a] flex items-center"
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
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="street_address" className="text-[#555d6a]">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="city" className="text-[#555d6a]">
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

            <div className="space-y-2">
              <label htmlFor="state" className="text-[#555d6a]">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="country" className="text-[#555d6a]">
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

            <div className="space-y-2">
              <label htmlFor="zip_code" className="text-[#555d6a]">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="about"
                className="text-[#555d6a] flex items-center"
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
                        className="focus:border-[#019935] min-h-[120px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-[#717882] text-sm">
                Enter your short bio here
              </p>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="services"
                className="text-[#555d6a] flex items-center"
              >
                Services Offered <span className="text-red-500 ml-0.5">*</span>
                <CircleHelp className="h-4 w-4 ml-1 text-[#a4a7ae]" />
              </label>
              <div className="border border-[#d5d7da] rounded-md p-2 min-h-[120px]">
                <div className="flex flex-wrap gap-2 mb-2">
                  {selectedServices.map((service) => (
                    <div
                      key={service}
                      className="flex items-center bg-[#f5f5f5] rounded-md px-2 py-1"
                    >
                      <span className="text-[#555d6a]">{service}</span>
                      <button
                        onClick={() => removeService(service)}
                        className="ml-1 text-[#555d6a] hover:text-[#2b3545]"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <Input
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addService(newService);
                      }
                    }}
                    placeholder="Test Drive"
                    className="border-none focus:ring-0 p-0 h-8 text-[#555d6a]"
                  />
                </div>
              </div>
              <p className="text-[#717882] text-sm">Your service you offered</p>
            </div>
          </div>

          {/* Card Information */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-[#2b3545]">
                Card Information
              </h2>
              <Button
                type="button"
                variant="outline"
                className="border-[#d5d7da] text-[#555d6a]"
              >
                <span className="mr-1">+</span> Add Card
              </Button>
            </div>

            {/* Mastercard */}
            <div className="border-t border-[#d5d7da] py-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#555d6a]" />
                  <div className="w-10 h-6 mx-3 flex items-center justify-center">
                    <div className="w-8 h-5 bg-[#f5f5f5] rounded flex items-center justify-center">
                      <svg
                        width="24"
                        height="16"
                        viewBox="0 0 24 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="24" height="16" rx="2" fill="white" />
                        <circle cx="9" cy="8" r="4" fill="#EB001B" />
                        <circle cx="15" cy="8" r="4" fill="#F79E1B" />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 11.2C13.1046 10.3999 13.8 9.08 13.8 7.6C13.8 6.12 13.1046 4.8001 12 4C10.8954 4.8001 10.2 6.12 10.2 7.6C10.2 9.08 10.8954 10.3999 12 11.2Z"
                          fill="#FF5F00"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-[#2b3545]">Mastercard</p>
                    <p className="text-sm text-[#717882]">Expires Apr 2028</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="text-[#555d6a]">
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button className="text-[#555d6a]">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Visa */}
            <div className="border-t border-[#d5d7da] py-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#555d6a]" />
                  <div className="w-10 h-6 mx-3 flex items-center justify-center">
                    <div className="w-8 h-5 bg-[#f5f5f5] rounded flex items-center justify-center">
                      <svg
                        width="24"
                        height="8"
                        viewBox="0 0 24 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.5 1L7.5 7H5.5L7.5 1H9.5Z" fill="#00579F" />
                        <path
                          d="M16.5 1.1C16 1 15.2 0.9 14.2 0.9C12.2 0.9 10.8 1.9 10.8 3.3C10.8 4.4 11.8 5 12.6 5.3C13.4 5.6 13.6 5.8 13.6 6.1C13.6 6.5 13.1 6.7 12.6 6.7C11.9 6.7 11.5 6.6 10.9 6.4L10.6 6.3L10.3 7.9C10.9 8.1 11.9 8.2 12.9 8.2C15 8.2 16.4 7.2 16.4 5.7C16.4 4.8 15.8 4.1 14.6 3.7C13.9 3.4 13.5 3.2 13.5 2.9C13.5 2.6 13.8 2.3 14.5 2.3C15.1 2.3 15.5 2.4 15.9 2.5L16.1 2.6L16.5 1.1Z"
                          fill="#00579F"
                        />
                        <path
                          d="M19.5 1H18C17.5 1 17.1 1.1 16.9 1.6L14.5 7H16.6C16.6 7 16.9 6.2 17 6C17.2 6 18.8 6 19.1 6C19.2 6.3 19.3 7 19.3 7H21.2L19.5 1ZM17.5 4.5C17.7 4 18.2 2.7 18.2 2.7C18.2 2.7 18.3 2.4 18.4 2.2L18.5 2.6C18.5 2.6 18.8 4.1 18.9 4.5H17.5Z"
                          fill="#00579F"
                        />
                        <path
                          d="M4.5 1L2.6 5.2L2.4 4.3C2 3.2 1.2 2.1 0.3 1.5L2 7H4.1L7.3 1H4.5Z"
                          fill="#00579F"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-[#2b3545]">Visa</p>
                    <p className="text-sm text-[#717882]">512 Water Plant</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="text-[#555d6a]">
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button className="text-[#555d6a]">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-start space-x-4 mt-4">
            <Button
              type="button"
              variant="outline"
              className="border-[#d5d7da] text-[#555d6a]"
              onClick={() => form.reset()}
            >
              Discard
            </Button>
            <Button
              type="submit"
              className="bg-[#019935] hover:bg-[#018a30] text-white"
            >
              {isUpdating ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
