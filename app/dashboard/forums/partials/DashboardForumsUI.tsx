'use client';
import { Badge } from '@/components/shadcn/badge';
import { Button } from '@/components/shadcn/button';
import { Input } from '@/components/shadcn/input';
import { Textarea } from '@/components/shadcn/textarea';
import { useSendNewsletterMutation } from '@/features/admin/adminDashboardSlice';
import { useToast } from '@/hooks/useToast';
import { cn } from '@/lib/utils';
import { Paperclip, XCircle } from 'lucide-react';
import React, { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';

type FormValues = {
  subject: string;
  summary: string;
};

export default function DashboardForumsUI() {
  const toast = useToast();
  const [sendNewsletter, { isLoading }] = useSendNewsletterMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      subject: '',
      summary: '',
    },
  });

  const [files, setFiles] = React.useState<File[]>([]);
  const [fileError, setFileError] = React.useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const filesArray = Array.from(selectedFiles);
      setFiles((prevFiles) => [...prevFiles, ...filesArray]);
      setFileError(''); // Clear any previous file error
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileRemove = (fileToRemove: File) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
  };

  const onSubmit = async (formData: FormValues) => {
    try {
      // Check if files are attached
      if (files.length === 0) {
        setFileError('At least one file is required');
        return;
      }

      const payload = new FormData();

      // Append text fields
      payload.append('subject', formData.subject);
      if (formData.summary) {
        payload.append('summary', formData.summary);
      }

      // Append files - IMPORTANT: Use the same key name for all files
      for (let i = 0; i < files.length; i++) {
        payload.append(`files`, files[i]);
      }

      // Debug log to see what's being sent
      console.log('Payload contents:');
      for (const [key, value] of payload.entries()) {
        if (value instanceof File) {
          console.log(key, ':', {
            name: value.name,
            type: value.type,
            size: value.size,
          });
        } else {
          console.log(key, ':', value);
        }
      }

      const response = await sendNewsletter(payload).unwrap();
      toast('success', 'Newsletter sent successfully!');
      console.log(response, 'response');
      // Reset form and files after successful submission
      reset();
      setFiles([]);
      setFileError('');
    } catch (error: any) {
      console.error('Error details:', error);

      // More detailed error handling
      if (error.data) {
        const errorMessages = [];
        for (const [key, value] of Object.entries(error.data)) {
          errorMessages.push(`${key}: ${value}`);
        }
        toast('error', errorMessages.join(', '));
      } else {
        toast('error', error?.message || 'Failed to send newsletter');
      }
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
                required: 'Subject is required',
                maxLength: {
                  value: 255,
                  message: 'Subject must be less than 255 characters',
                },
              }}
              render={({ field }) => (
                <div>
                  <Input
                    type="text"
                    id="subject"
                    className={cn(
                      'h-10',
                      errors?.subject
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'focus:border-primary-500 focus:ring-primary-500'
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
              Newsletter Summary <span className="text-red-500">*</span>
            </label>
            <Controller
              name="summary"
              control={control}
              rules={{
                required: 'Summary is required',
              }}
              render={({ field }) => (
                <div>
                  <Textarea
                    className={cn(
                      'border roundedLg h-[300px] p-3 text-sm w-full',
                      errors?.summary
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'focus:border-primary-500 focus:ring-primary-500'
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
                    'text-[#414651]',
                    fileError && 'border-red-500'
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
            disabled={isLoading}
            className="!font-medium"
          >
            {isLoading ? 'Sending...' : 'Send Newsletter'}
          </Button>
        </div>
      </form>
    </div>
  );
}
