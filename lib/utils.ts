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

  if (errors?.detail) {
    if (typeof errors?.detail === "string") {
      errorMessages.push(errors?.detail);
    }

    if (Array.isArray(errors?.detail)) {
      errorMessages.push(...errors?.detail);
    }
  }

  if (errors?.non_field_errors) {
    if (typeof errors?.non_field_errors === "string") {
      errorMessages.push(errors?.non_field_errors);
    }

    if (Array.isArray(errors?.non_field_errors)) {
      errorMessages.push(...errors?.non_field_errors);
    }
  }

  return errorMessages.length > 0 ? errorMessages[0] : "Something went wrong!";
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const size = bytes / Math.pow(k, i);

  return `${size.toFixed(1)} ${sizes[i]}`;
}

type QueryParamsInput = Record<string, any>;

interface QueryParamsConfig {
  excludeFaulty?: boolean; // default: true
}

export function createQueryParams(
  params: QueryParamsInput,
  config: QueryParamsConfig = {}
): string {
  const { excludeFaulty = true } = config;

  const entries = Object.entries(params).filter(([_, value]) => {
    if (!excludeFaulty) return true;

    // Faulty values: null, undefined, '', false, 0, NaN
    return (
      value !== null &&
      value !== undefined &&
      value !== "" &&
      value !== false &&
      value !== 0 &&
      !Number.isNaN(value)
    );
  });

  const searchParams = new URLSearchParams();

  for (const [key, value] of entries) {
    searchParams.append(key, String(value));
  }

  return searchParams.toString();
}
