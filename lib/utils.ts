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
      if (errors?.data.hasOwnProperty(key)) {
        const errorMessage = errors?.data[key][0];
        errorMessages.push(errorMessage);
      }
    }
  }

  return errorMessages.length > 0 ? errorMessages[0] : "Something went wrong!";
}
