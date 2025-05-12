import React, { useState } from "react";

import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";

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
            <div className="absolute left-[10px] top-1/2 -translate-y-1/2">
              {preIcon}
            </div>
          )}

          <input
            type={type}
            className={cn(
              "flex h-9 w-full rounded-md border border-[#D5D7DA] bg-transparent px-3 text-base  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-gray-100 outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
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
            <div className="absolute right-[10px] top-1/2 -translate-y-1/2">
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

const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, preIcon, postIcon, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    const inputType = showPassword ? "text" : "password";

    return (
      <div>
        <div className="relative flex items-center justify-center">
          {preIcon && (
            <div className="absolute left-[10px] top-1/2 -translate-y-1/2">
              {preIcon}
            </div>
          )}

          <input
            type={inputType}
            className={cn(
              "flex h-9 w-full rounded-md border border-[#D5D7DA] bg-transparent px-3 text-base  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-gray-100 outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              {
                "pl-10": preIcon,
                "pr-10": postIcon,
              },
              className
            )}
            ref={ref}
            {...props}
          />

          {true && (
            <div
              className="absolute right-[14px] top-1/2 -translate-y-1/2 cursor-pointer select-none"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.85355 2.64645C2.65829 2.45118 2.34171 2.45118 2.14645 2.64645C1.95118 2.84171 1.95118 3.15829 2.14645 3.35355L5.6453 6.85239C3.97044 7.99179 2.7234 9.77384 2.28017 11.8979C2.22377 12.1682 2.39718 12.4331 2.6675 12.4895C2.93782 12.5459 3.20268 12.3725 3.25909 12.1021C3.6629 10.167 4.82367 8.56291 6.36714 7.57422L7.95336 9.16045C7.07297 9.79611 6.5 10.8311 6.5 12C6.5 13.933 8.067 15.5 10 15.5C11.1689 15.5 12.2039 14.927 12.8396 14.0466L17.1464 18.3536C17.3417 18.5488 17.6583 18.5488 17.8536 18.3536C18.0488 18.1583 18.0488 17.8417 17.8536 17.6464L2.85355 2.64645ZM12.1194 13.3265C11.6773 14.0314 10.8934 14.5 10 14.5C8.61929 14.5 7.5 13.3807 7.5 12C7.5 11.1066 7.96863 10.3227 8.67348 9.88057L12.1194 13.3265ZM10.1235 8.50214L13.4979 11.8765C13.4342 10.0417 11.9583 8.56576 10.1235 8.50214ZM10 6.5C9.43016 6.5 8.87149 6.57353 8.33419 6.71285L7.53113 5.90979C8.31349 5.64331 9.14485 5.5 10 5.5C13.6934 5.5 16.9425 8.17312 17.7199 11.8979C17.7763 12.1682 17.6029 12.433 17.3325 12.4895C17.0622 12.5459 16.7974 12.3725 16.7409 12.1021C16.0574 8.82688 13.2057 6.5 10 6.5Z"
                    fill="#5D6679"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={0.5}
                  stroke="#000"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              )}
            </div>
          )}
        </div>

        {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
      </div>
    );
  }
);

InputPassword.displayName = "InputPassword";

const InputPhoneNumber = React.forwardRef<
  HTMLInputElement,
  InputProps & { countries?: any[] }
>(
  (
    { className, type, error, preIcon, postIcon, countries = [], ...props },
    ref
  ) => {
    console.log(countries);

    return (
      <div>
        <div className="relative flex items-center justify-center">
          {preIcon && (
            <div className="absolute left-[10px] top-1/2 -translate-y-1/2">
              {preIcon}
            </div>
          )}

          {/* <select name="" id="" className="absolute max-w-[80px] left-2 dev">
            {countries.map((country: any) => {
              return (
                <option value={country.code} key={country.code}>
                  ({country.dial_code}) {country.name}
                </option>
              );
            })}
          </select> */}

          <Select>
            <SelectTrigger
              className="w-[90px] bg-white absolute left-2 dev"
              postIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="#A4A7AE"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            >
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country: any) => {
                return (
                  <SelectItem value={country.code} key={country.code}>
                    {country.dial_code}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          <input
            type={type || "number"}
            className={cn(
              "flex h-9 w-full rounded-md border border-[#D5D7DA] bg-transparent px-3 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-gray-100 outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dev2",
              {
                "pl-16": countries,
                "pl-10": preIcon,
                "pr-10": postIcon,
              },
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
      </div>
    );
  }
);
InputPhoneNumber.displayName = "InputPhoneNumber";

export { Input, InputPassword, InputPhoneNumber };
