"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"
import Spinner from "../spinner/Spinner"

type Option = {
  value: string
  label: string
}

interface ComboboxProps {
  options: Option[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  width?: string
  isLoading?: boolean;
}

export function Combobox({
  options,
  value,
  onChange,
  placeholder = "Select...",
  className,
  width = "w-[200px]",
  isLoading = false,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("justify-between", className)}
        >
          {value && <span className="font-normal">{options.find((item) => item.value === value)?.label}</span>}
          {!value && <span className="text-gray-100 font-normal">{placeholder}</span>}
          <ChevronsUpDown className="opacity-50 ml-2 h-4 w-4 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("p-0", width)}>
        <Command>
          <CommandInput placeholder="Search..." className="h-9" disabled={isLoading} />
          <CommandList>
            {
              isLoading ?
                <div className="flex justify-center items-center my-2"><Spinner className="size-6" /></div>
                : <CommandEmpty>No option found.</CommandEmpty>
            }
            <CommandGroup>
              {options.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={() => {
                    onChange(item.value === value ? "" : item.value)
                    setOpen(false)
                  }}
                >
                  <div className="flex">
                    <span>{item.label}</span>
                    <span className="text-xs text-muted-foreground opacity-0">{item.value}</span>
                  </div>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
