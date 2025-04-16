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
      {children}
    </button>
  );
}
