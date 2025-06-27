import React, { useState } from "react";

import { cn } from "@/lib/utils";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/tooltip";

interface InputProps extends React.ComponentProps<"input"> {
  error?: string;
  label?: string;
  wrapperClassName?: string;
  preIcon?: React.ReactNode;
  postIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      wrapperClassName,
      label,
      type,
      error,
      preIcon,
      postIcon,
      ...props
    },
    ref
  ) => {
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
              error && "border-red-500",
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
  InputProps & {
    countries?: any[];

    onCountryChange?: (countryCode: string) => void;
  }
>(
  (
    {
      className,
      type,
      error,
      preIcon,
      postIcon,
      countries = [],
      onCountryChange,
      ...props
    },
    ref
  ) => {
    return (
      <div>
        <div className="relative flex items-center justify-center">
          {preIcon && (
            <div className="absolute left-[10px] top-1/2 -translate-y-1/2">
              {preIcon}
            </div>
          )}

          <select
            className="w-[70px] bg-white absolute left-2 text-sm outline-none"
            defaultValue="US"
            onChange={(e) => {
              if (onCountryChange) {
                onCountryChange(e.target.value);
              }
            }}
          >
            {countries.map((country: any, index: number) => {
              return (
                <option key={index} value={country.code}>
                  {country.dial_code}
                </option>
              );
            })}
          </select>

          <input
            type={type || "number"}
            className={cn(
              "flex h-9 w-full rounded-md border border-[#D5D7DA] bg-transparent px-3 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-gray-100 outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              {
                "pl-[90px]": countries.length,
                "pl-10": preIcon,
                "pr-10": postIcon,
                "border-red-500": error,
              },
              className
            )}
            ref={ref}
            {...props}
          />
        </div>

        {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
      </div>
    );
  }
);
InputPhoneNumber.displayName = "InputPhoneNumber";

const InputCopy = React.forwardRef<
  HTMLInputElement,
  InputProps & {
    copyText?: string;
    label?: string;
    wrapperClassName?: string;
  }
>(
  (
    {
      className,
      wrapperClassName,
      type,
      error,
      preIcon,
      postIcon,
      copyText,
      label,
      disabled,
      onChange,
      ...props
    },
    ref
  ) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(copyText as string);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    };

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
        <div className="relative flex items-center justify-center">
          <input
            type={type}
            className={cn(
              "flex h-11 w-full rounded-lg border border-[#D5D7DA] px-3 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-gray-100 outline-none md:text-sm",
              {
                "pl-10": preIcon,
                "pr-10": postIcon,
                "bg-[#FAFAFA]": disabled,
              },
              className
            )}
            ref={ref}
            onChange={(e) => {
              if (disabled) {
                return;
              }

              if (onChange) {
                onChange(e);
              }
            }}
            {...props}
          />

          {/* copy */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  onClick={handleCopy}
                  className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer select-none flex gap-2 h-11 justify-center items-center bg-white border border-[#D5D7DA] rounded-r-lg px-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                  >
                    <path
                      d="M4.16699 13.2493C3.39042 13.2493 3.00214 13.2493 2.69585 13.1225C2.28747 12.9533 1.96302 12.6289 1.79386 12.2205C1.66699 11.9142 1.66699 11.5259 1.66699 10.7493V5.08268C1.66699 4.14926 1.66699 3.68255 1.84865 3.32603C2.00844 3.01243 2.2634 2.75746 2.57701 2.59767C2.93353 2.41602 3.40024 2.41602 4.33366 2.41602H10.0003C10.7769 2.41602 11.1652 2.41602 11.4715 2.54288C11.8798 2.71204 12.2043 3.0365 12.3735 3.44488C12.5003 3.75116 12.5003 4.13945 12.5003 4.91602M10.167 19.0827H15.667C16.6004 19.0827 17.0671 19.0827 17.4236 18.901C17.7372 18.7412 17.9922 18.4863 18.152 18.1727C18.3337 17.8161 18.3337 17.3494 18.3337 16.416V10.916C18.3337 9.98259 18.3337 9.51588 18.152 9.15937C17.9922 8.84576 17.7372 8.59079 17.4236 8.43101C17.0671 8.24935 16.6004 8.24935 15.667 8.24935H10.167C9.23357 8.24935 8.76686 8.24935 8.41034 8.43101C8.09674 8.59079 7.84177 8.84576 7.68198 9.15937C7.50033 9.51588 7.50033 9.9826 7.50033 10.916V16.416C7.50033 17.3494 7.50033 17.8161 7.68198 18.1727C7.84177 18.4863 8.09674 18.7412 8.41034 18.901C8.76686 19.0827 9.23357 19.0827 10.167 19.0827Z"
                      stroke="#414651"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span>{isCopied ? "Copied!" : "Copy"}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{"Click to copy"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
      </div>
    );
  }
);
InputCopy.displayName = "InputCopy";

export { Input, InputPassword, InputPhoneNumber, InputCopy };
