import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea"> & {
    label?: string;
    wrapperClassName?: string;
    message?: string;
    error?: string;
    helperText?: string;
  }
>(
  (
    {
      className,
      label,
      wrapperClassName,
      message,
      error,
      helperText,
      ...props
    },
    ref
  ) => {
    return (
      <div className={wrapperClassName}>
        {label && (
          <label
            htmlFor={label}
            className="text-sm mb-1.5 text-[#414651] font-medium flex gap-1 items-center"
          >
            {label}{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              cursor={"pointer"}
            >
              <title>{helperText}</title>
              <g clipPath="url(#clip0_3531_3720)">
                <path
                  d="M6.06016 6.00065C6.2169 5.5551 6.52626 5.17939 6.93347 4.94007C7.34067 4.70076 7.81943 4.61328 8.28495 4.69313C8.75047 4.77297 9.17271 5.015 9.47688 5.37634C9.78106 5.73767 9.94753 6.195 9.94683 6.66732C9.94683 8.00065 7.94683 8.66732 7.94683 8.66732M8.00016 11.334H8.00683M14.6668 8.00065C14.6668 11.6826 11.6821 14.6673 8.00016 14.6673C4.31826 14.6673 1.3335 11.6826 1.3335 8.00065C1.3335 4.31875 4.31826 1.33398 8.00016 1.33398C11.6821 1.33398 14.6668 4.31875 14.6668 8.00065Z"
                  stroke="#A4A7AE"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_3531_3720">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </label>
        )}
        <textarea
          className={cn(
            "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            error && "border-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {message && (
          <div className="text-[#535862] text-sm font-normal mt-1">
            {message}
          </div>
        )}
        {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
