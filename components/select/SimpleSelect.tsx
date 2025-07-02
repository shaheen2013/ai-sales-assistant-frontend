import React, { FC } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shadcn/select";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type OptionType = {
  label: string;
  value: string;
};

type SimpleSelectPropsType = {
  options: OptionType[];
  label?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  value?: string;
  defaultValue?: string;
  triggerClassName?: string;
  contentClassName?: string;
  groupClassName?: string;
  itemClassName?: string;
  disabled?: boolean;
  wrapperClassName?: string;
};

const SimpleSelect: FC<SimpleSelectPropsType> = ({
  options,
  label,
  placeholder,
  onChange,
  value,
  defaultValue,
  triggerClassName,
  contentClassName,
  groupClassName,
  itemClassName,
  disabled,
  wrapperClassName,
}) => {
  return (
    <div className={wrapperClassName}>
      {label && (
        <label
          htmlFor={label}
          className="text-sm mb-1.5 text-[#414651] font-medium"
        >
          {label}
        </label>
      )}
      <Select
        onValueChange={onChange}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
      >
        <SelectTrigger
          className={cn(
            "max-w-fit [&>svg]:hidden [&>span]:pointer-events-auto [&>span]:text-[#2b3545] [&>span]:text-sm [&>span]:font-medium gap-1.5",
            triggerClassName
          )}
        >
          <SelectValue placeholder={placeholder} />
          <div>
            <ChevronDown className="size-5 text-[#5D6679]" />
          </div>
        </SelectTrigger>
        <SelectContent className={contentClassName}>
          <SelectGroup className={groupClassName}>
            {options.map((option, index) => (
              <SelectItem
                key={index}
                value={option?.value}
                className={cn(itemClassName)}
              >
                {option?.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SimpleSelect;
