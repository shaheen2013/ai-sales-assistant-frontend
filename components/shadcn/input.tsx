import * as React from "react";

import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  error?: string;
  preIcon?: React.ReactNode;
  postIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, preIcon, postIcon, ...props }, ref) => {
    return (
      <div>
        <div className="relative flex items-center justify-center">
          {preIcon && (
            <div className="absolute left-2 top-1/2 -translate-y-1/2">
              {preIcon}
            </div>
          )}

          <input
            type={type}
            className={cn(
              "flex h-9 w-full rounded-md border border-[#D5D7DA] bg-transparent px-3 text-base  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              {
                "pl-10": preIcon,
                "pr-10": postIcon,
              },
              className
            )}
            ref={ref}
            {...props}
          />

          {postIcon && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-white">
              {postIcon}
            </div>
          )}
        </div>

        {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
