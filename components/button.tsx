import React from "react";
import Link from "next/link";
import classNames from "classnames";

interface ButtonInterface {
  children: React.ReactNode;
  variant:
    | "primary"
    | "secondary"
    | "outline-primary"
    | "outline-black"
    | "outline-gray";
  className?: string;
  disabled?: boolean;

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  [key: string]: any;
}

export default function Button({
  children,
  variant,
  className,
  disabled,
  href,
  loading,
  ...props
}: ButtonInterface) {
  const clx = classNames(
    "rounded-lg cursor-pointer py-[10px] px-6 hover:opacity-75 transition-opacity active:scale-95 transform duration-75 flex gap-2 items-center justify-center text-base font-semibold",
    { "bg-primary-500 text-white": variant === "primary" },

    { "border-2 border-primary-500": variant === "outline-primary" },
    { "border-2 border-gray-500 text-gray-500": variant === "outline-black" },
    { "border-2 border-[#D5D7DA] text-gray-500": variant === "outline-gray" },

    { "opacity-50 cursor-not-allowed active:scale-100": disabled },
    className
  );

  if (href) {
    return (
      <Link className={clx} href={href} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={clx} {...props}>
      {/* {children} */}

      {loading ? (
        <svg
          className="mr-3 -ml-1 size-6 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        children
      )}
    </button>
  );
}
