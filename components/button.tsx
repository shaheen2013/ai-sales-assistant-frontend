import classNames from "classnames";
import React from "react";

interface ButtonInterface {
  children: React.ReactNode;
  variant: "primary" | "secondary" | "outline-primary";
  className?: string;

  [key: string]: any;
}

export default function Button({
  children,
  variant,
  className,
  ...props
}: ButtonInterface) {
  const clx = classNames(
    "rounded-lg cursor-pointer py-[10px] px-6 hover:opacity-75 transition-opacity active:scale-95 transform duration-75 flex gap-2 items-center justify-center text-base font-semibold",
    { "bg-primary-500 text-white": variant === "primary" },
    {
      "border-2 border-primary-500": variant === "outline-primary",
    },
    className
  );

  return (
    <button className={clx} {...props}>
      {children}
    </button>
  );
}
