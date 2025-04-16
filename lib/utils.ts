import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isActivePath(path: string, currentPath: string) {
  return path == currentPath;
}

export function beautifyErrors(errors: any): string {
  const errorMessages: string[] = [];

  if (errors?.data) {
    for (const key in errors?.data) {
      if (typeof errors?.data?.[key] === "string") {
        errorMessages.push(errors?.data?.[key]);
      }

      if (Array.isArray(errors?.data?.[key])) {
        errorMessages.push(...errors?.data?.[key]);
      }
    }
  }

  return errorMessages.length > 0 ? errorMessages[0] : "Something went wrong!";
}
