"use client";

import React from "react";
import { Check } from "lucide-react";
import classNames from "classnames";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    value?: boolean;
    onChange?: (value: boolean) => void;
    variant?: "primary" | "secondary";
    error?: boolean;
  }
>(
  (
    { className, value, onChange, variant = "primary", error, ...props },
    ref
  ) => (
    <div
      className={classNames("flex border rounded-md ", {
        "border border-red-500": error,
      })}
    >
      <CheckboxPrimitive.Root
        ref={ref}
        className={classNames(
          "peer h-[20px] w-[20px] shrink-0 rounded-sm border shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ",
          {
            "data-[state=checked]:bg-primary-600 data-[state=checked]:text-white":
              variant == "primary",
          },
          className
        )}
        checked={value}
        onCheckedChange={onChange}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          className={cn("flex items-center justify-center text-current")}
        >
          <Check className="h-4 w-4" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    </div>
  )
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
