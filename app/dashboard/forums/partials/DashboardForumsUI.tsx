"use client";

import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { useForm, Controller } from "react-hook-form";

import { useToast } from "@/hooks/useToast";
import { Input, InputPassword } from "@/components/shadcn/input";
import { Checkbox } from "@/components/shadcn/checkbox";
import { Button } from "@/components/shadcn/button";

export default function DashboardForumsUI() {
  const toast = useToast();
  const router = useRouter();
  const { data: session, status } = useSession();

  type FormValues = {
    subject: string;
    newsletter: string;
  };

  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      subject: "",
      newsletter: "",
    },
  });
  const onSubmit = async (formData: FormValues) => {
    try {
      const payload = {};
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2 className="text-gray-400 text-2xl font-semibold mb-6">Newsletters</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="border rounded-xl">
        <div className="p-6">
          {/* subject */}
          <div className="flex flex-col mb-6">
            <label
              htmlFor="subject"
              className="text-sm mb-1 text-[#414651] font-medium"
            >
              Subject
            </label>
            <Controller
              name="subject"
              control={control}
              rules={{ required: "Subject is required" }}
              render={({ field, formState: { errors } }) => (
                <Input
                  type="text"
                  id="email"
                  className="h-10"
                  placeholder="Your subject Here..."
                  error={errors?.subject?.message}
                  {...field}
                />
              )}
            />
          </div>

          {/* newsletter summary */}
          <div className="flex flex-col mb-6">
            <label
              htmlFor="subject"
              className="text-sm mb-1 text-[#414651] font-medium flex gap-1 items-center"
            >
              Newsletter Summary <span className="text-primary-400">*</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_2379_3758)">
                  <path
                    d="M6.05992 6.00065C6.21665 5.5551 6.52602 5.17939 6.93322 4.94007C7.34042 4.70076 7.81918 4.61328 8.2847 4.69313C8.75022 4.77297 9.17246 5.015 9.47664 5.37634C9.78081 5.73767 9.94729 6.195 9.94659 6.66732C9.94659 8.00065 7.94659 8.66732 7.94659 8.66732M7.99992 11.334H8.00659M14.6666 8.00065C14.6666 11.6826 11.6818 14.6673 7.99992 14.6673C4.31802 14.6673 1.33325 11.6826 1.33325 8.00065C1.33325 4.31875 4.31802 1.33398 7.99992 1.33398C11.6818 1.33398 14.6666 4.31875 14.6666 8.00065Z"
                    stroke="#A4A7AE"
                    stroke-width="1.33333"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2379_3758">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </label>

            <Controller
              name="newsletter"
              control={control}
              rules={{ required: "Newsletter is required" }}
              render={({ field, formState: { errors } }) => (
                <div className="">
                  <textarea
                    className="border rounded-lg border-[#D5D7DA] h-[300px] p-3 text-sm w-full"
                    placeholder="Newsletter description here..."
                  ></textarea>

                  {errors?.newsletter?.message && (
                    <span className="text-red-500 text-sm">
                      {errors?.newsletter?.message}
                    </span>
                  )}
                </div>
              )}
            />

            <div className="text-sm">This is body of the newsletter.</div>
          </div>
        </div>

        {/* sign up button */}
        <div className="bg-gray-50 p-5 rounded-b-xl flex items-end justify-end">
          <Button variant="primary" className="!font-medium">
            Send Newsletter{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M3.17683 3.1185C3.32953 2.98915 3.54464 2.9633 3.72363 3.05279L16.7236 9.55279C16.893 9.63748 17 9.81061 17 10C17 10.1894 16.893 10.3625 16.7236 10.4472L3.72363 16.9472C3.54464 17.0367 3.32953 17.0109 3.17683 16.8815C3.02414 16.7522 2.96328 16.5442 3.02213 16.353L4.97688 10L3.02213 3.64705C2.96328 3.45578 3.02414 3.24785 3.17683 3.1185ZM5.8693 10.5L4.32155 15.5302L15.382 10L4.32155 4.46979L5.8693 9.5H11.5C11.7761 9.5 12 9.72386 12 10C12 10.2761 11.7761 10.5 11.5 10.5H5.8693Z"
                fill="white"
              />
            </svg>
          </Button>
        </div>
      </form>
    </div>
  );
}
