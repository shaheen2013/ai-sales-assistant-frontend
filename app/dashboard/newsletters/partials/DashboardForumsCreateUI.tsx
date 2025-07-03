"use client";

import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { Paperclip, XCircle } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/useToast";
import { Input } from "@/components/shadcn/input";
import { Badge } from "@/components/shadcn/badge";
import { Button } from "@/components/shadcn/button";
import { Textarea } from "@/components/shadcn/textarea";
import { useSendNewsletterMutation } from "@/features/admin/adminDashboardSlice";

type FormValues = {
  subject: string;
  summary: string;
};

export default function DashboardForumsUI() {
  const toast = useToast();
  const router = useRouter();
  // const [sendNewsletter, { isLoading }] = useSendNewsletterMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      subject: "",
      summary: "",
    },
  });

  const [files, setFiles] = React.useState<File[]>([]);
  const [fileError, setFileError] = React.useState<string>("");

  const [sendNewsletter, { isLoading: isCreateNewletterLoading }] =
    useSendNewsletterMutation();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const filesArray = Array.from(selectedFiles);

      // Check for duplicate files
      const duplicateFiles = filesArray.filter((newFile) =>
        files.some(
          (existingFile) =>
            existingFile.name === newFile.name &&
            existingFile.size === newFile.size
        )
      );

      if (duplicateFiles.length > 0) {
        setFileError(
          `Files already selected: ${duplicateFiles
            .map((f) => f.name)
            .join(", ")}`
        );
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }

      setFiles((prevFiles) => [...prevFiles, ...filesArray]);
      setFileError(""); // Clear any previous file error
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileRemove = (fileToRemove: File) => {
    setFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((file) => file !== fileToRemove);
      return updatedFiles;
    });
  };

  const onSubmit = async (formData: FormValues) => {
    try {
      // Check if files are attached
      if (files.length === 0) {
        setFileError("At least one file is required");
        return;
      }

      const payload = new FormData();
      payload.append("subject", formData.subject);
      payload.append("summary", formData.summary);

      // Append files
      for (let i = 0; i < files.length; i++) {
        payload.append("files", files[i]);
      }

      try {
        await sendNewsletter(payload).unwrap();
        toast("success", "Newsletter sent successfully!");
        reset();
        setFiles([]);
        setFileError("");

        // redirect to newsletters page
        router.push("/dashboard/newsletters");
      } catch (apiError: any) {
        console.log("API Error:", apiError);
        // Detailed error logging
        if (apiError.data) {
          const errorMessages = [];
          for (const [key, value] of Object.entries(apiError.data)) {
            errorMessages.push(`${key}: ${value}`);
          }
          toast("error", errorMessages.join(", "));
        } else {
          console.log("Unknown Error:", apiError);
          toast("error", apiError?.message || "Failed to send newsletter");
        }
      }
    } catch (error) {
      // This catch block handles any other errors (like FormData creation errors)
      console.error("Unexpected Error:", error);
      toast("error", "An unexpected error occurred");
    }
  };

  return (
    <div>
      <h2 className="text-gray-400 text-2xl font-semibold mb-6">Newsletters</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="border rounded-xl">
        <div className="p-6 flex flex-col gap-6">
          {/* subject */}
          <div className="flex flex-col">
            <label
              htmlFor="subject"
              className="text-sm mb-1 text-[#414651] font-medium flex items-center gap-1"
            >
              Subject <span className="text-red-500">*</span>
            </label>
            <Controller
              name="subject"
              control={control}
              rules={{
                required: "Subject is required",
                maxLength: {
                  value: 255,
                  message: "Subject must be less than 255 characters",
                },
              }}
              render={({ field }) => (
                <div>
                  <Input
                    type="text"
                    id="subject"
                    className={cn(
                      "h-10",
                      errors?.subject
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "focus:border-primary-500 focus:ring-primary-500"
                    )}
                    placeholder="Your subject here..."
                    {...field}
                  />
                  {errors?.subject && (
                    <span className="text-red-500 text-sm mt-1 block">
                      {errors.subject.message}
                    </span>
                  )}
                </div>
              )}
            />
          </div>

          {/* newsletter summary */}
          <div className="flex flex-col">
            <label
              htmlFor="summary"
              className="text-sm mb-1 text-[#414651] font-medium flex gap-1 items-center"
            >
              Newsletter Summary <span className="text-red-500">*</span>{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                cursor={"pointer"}
              >
                <title>This will be the summary of your newsletter.</title>
                <g clipPath="url(#clip0_3531_3720)">
                  <path
                    d="M6.06016 6.00065C6.2169 5.5551 6.52626 5.17939 6.93347 4.94007C7.34067 4.70076 7.81943 4.61328 8.28495 4.69313C8.75047 4.77297 9.17271 5.015 9.47688 5.37634C9.78106 5.73767 9.94753 6.195 9.94683 6.66732C9.94683 8.00065 7.94683 8.66732 7.94683 8.66732M8.00016 11.334H8.00683M14.6668 8.00065C14.6668 11.6826 11.6821 14.6673 8.00016 14.6673C4.31826 14.6673 1.3335 11.6826 1.3335 8.00065C1.3335 4.31875 4.31826 1.33398 8.00016 1.33398C11.6821 1.33398 14.6668 4.31875 14.6668 8.00065Z"
                    stroke="#A4A7AE"
                    stroke-width="1.33333"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_3531_3720">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </label>
            <Controller
              name="summary"
              control={control}
              rules={{
                required: "Summary is required",
              }}
              render={({ field }) => (
                <div>
                  <Textarea
                    helperText="This will be the summary of your newsletter."
                    className={cn(
                      "border roundedLg h-[300px] p-3 text-sm w-full placeholder:text-gray-100",
                      errors?.summary
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "focus:border-primary-500 focus:ring-primary-500"
                    )}
                    placeholder="Newsletter description here..."
                    {...field}
                  />
                  {errors?.summary && (
                    <span className="text-red-500 text-sm mt-1 block">
                      {errors.summary.message}
                    </span>
                  )}
                </div>
              )}
            />
          </div>

          {/* attach file button and preview */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-[#414651] font-medium flex items-center gap-1">
              Attachments <span className="text-red-500">*</span>
            </label>

            <div className="flex items-start gap-4 flex-col">
              {files.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {files.map((file, index) => (
                    <Badge key={index} variant="secondary" className="p-1">
                      {file.name}
                      <button
                        type="button"
                        onClick={() => handleFileRemove(file)}
                        className="ml-1 hover:text-red-600 focus:outline-none"
                      >
                        <XCircle className="cursor-pointer text-red-500 size-4" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                multiple
                accept=".pdf,.doc,.docx,.txt"
              />

              <div className="flex items-start  gap-2 w-full">
                <Button
                  variant="outline"
                  type="button"
                  className={cn(
                    "text-[#414651]",
                    fileError && "border-red-500"
                  )}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Paperclip />
                  <span>Attach files</span>
                </Button>
                {fileError && (
                  <span className="text-red-500 text-sm mt-2">{fileError}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* submit button */}
        <div className="bg-gray-50 p-5 rounded-b-xl flex items-end justify-end">
          <Button
            variant="primary"
            type="submit"
            disabled={isCreateNewletterLoading}
            loading={isCreateNewletterLoading}
            className="!font-medium min-w-[145px]"
          >
            Send Newsletter
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
