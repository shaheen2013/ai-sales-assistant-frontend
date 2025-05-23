import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
      if (typeof errors?.data?.[key] === 'string') {
        errorMessages.push(errors?.data?.[key]);
      }

      if (Array.isArray(errors?.data?.[key])) {
        errorMessages.push(...errors?.data?.[key]);
      }
    }
  }

  if (errors?.detail) {
    if (typeof errors?.detail === 'string') {
      errorMessages.push(errors?.detail);
    }

    if (Array.isArray(errors?.detail)) {
      errorMessages.push(...errors?.detail);
    }
  }

  if (errors?.non_field_errors) {
    if (typeof errors?.non_field_errors === 'string') {
      errorMessages.push(errors?.non_field_errors);
    }

    if (Array.isArray(errors?.non_field_errors)) {
      errorMessages.push(...errors?.non_field_errors);
    }
  }

  return errorMessages.length > 0 ? errorMessages[0] : 'Something went wrong!';
}

/**
 * Comprehensive error handler for API responses
 * Handles nested error structures and formats them into a readable message
 */
export function handleApiError(error: any): string {
  let errorMessage = '';

  // Handle server errors (500)
  if (error?.data?.status === 500) {
    return 'Unexpected Server Error';
  }

  // Handle top-level message if it's a string
  if (error?.data?.message && typeof error.data.message === 'string') {
    errorMessage = error.data.message;
  }
  // Handle nested employee errors
  else if (
    error?.data?.message?.employees &&
    Array.isArray(error.data.message.employees)
  ) {
    error.data.message.employees.forEach((employeeError: any) => {
      if (typeof employeeError === 'object') {
        Object.entries(employeeError).forEach(([field, fieldErrors]) => {
          if (Array.isArray(fieldErrors)) {
            fieldErrors.forEach((fieldError: string) => {
              errorMessage += `${field}: ${fieldError}\n`;
            });
          }
        });
      }
    });
  }
  // Handle other field errors in data
  else if (error?.data) {
    Object.entries(error.data).forEach(([key, value]) => {
      if (key !== 'status') {
        if (Array.isArray(value)) {
          value.forEach((msg: string) => {
            errorMessage += `${key}: ${msg}\n`;
          });
        } else if (typeof value === 'string') {
          errorMessage += `${key}: ${value}\n`;
        }
      }
    });
  }

  // Handle error.detail
  if (error?.detail) {
    if (typeof error.detail === 'string') {
      errorMessage += error.detail + '\n';
    } else if (Array.isArray(error.detail)) {
      error.detail.forEach((detail: string) => {
        errorMessage += detail + '\n';
      });
    }
  }

  // Handle non_field_errors
  if (error?.non_field_errors) {
    if (typeof error.non_field_errors === 'string') {
      errorMessage += error.non_field_errors + '\n';
    } else if (Array.isArray(error.non_field_errors)) {
      error.non_field_errors.forEach((nfe: string) => {
        errorMessage += nfe + '\n';
      });
    }
  }

  // Fallback if no specific error message was constructed
  if (!errorMessage) {
    errorMessage =
      error?.data?.status === 'error'
        ? beautifyErrors(error) || 'Unknown error occurred.'
        : 'Unknown error occurred.';
  }

  // Ensure errorMessage is a string and trim it
  return typeof errorMessage === 'string'
    ? errorMessage.trim()
    : String(errorMessage);
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const entries = Object.entries(params).filter(([_, value]) => {
    if (!excludeFaulty) return true;

    // Faulty values: null, undefined, '', false, 0, NaN
    return (
      value !== null &&
      value !== undefined &&
      value !== '' &&
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
