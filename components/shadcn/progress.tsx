"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    value?: number;
    bgColor?: string;
    progressColor?: string;
  }
>(({ className, value, bgColor, progressColor, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    style={{ backgroundColor: bgColor || "#EEEEEE" }}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full",

      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      // className="h-full w-full flex-1 bg-[#019935] transition-all"
      className={cn("h-full w-full flex-1 transition-all")}
      style={{
        transform: `translateX(-${100 - (value || 0)}%)`,
        backgroundColor: progressColor || "#019935",
      }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
