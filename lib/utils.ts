import moment from "moment";
import LinkifyIt from "linkify-it";
import parse from "html-react-parser";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
import { countryGpsLocation } from "@/static/CountryCodes";

const linkify = new LinkifyIt();

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

/**
 * Comprehensive error handler for API responses
 * Handles nested error structures and formats them into a readable message
 */
export function handleApiError(error: any): string {
  let errorMessage = "";

  // Handle server errors (500)
  if (error?.data?.status === 500) {
    return "Unexpected Server Error";
  }

  // Handle top-level message if it's a string
  if (error?.data?.message && typeof error.data.message === "string") {
    errorMessage = error.data.message;
  }
  // Handle nested employee errors
  else if (
    error?.data?.message?.employees &&
    Array.isArray(error.data.message.employees)
  ) {
    error.data.message.employees.forEach((employeeError: any) => {
      if (typeof employeeError === "object") {
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
      if (key !== "status") {
        if (Array.isArray(value)) {
          value.forEach((msg: string) => {
            errorMessage += `${key}: ${msg}\n`;
          });
        } else if (typeof value === "string") {
          errorMessage += `${key}: ${value}\n`;
        }
      }
    });
  }

  // Handle error.detail
  if (error?.detail) {
    if (typeof error.detail === "string") {
      errorMessage += error.detail + "\n";
    } else if (Array.isArray(error.detail)) {
      error.detail.forEach((detail: string) => {
        errorMessage += detail + "\n";
      });
    }
  }

  // Handle non_field_errors
  if (error?.non_field_errors) {
    if (typeof error.non_field_errors === "string") {
      errorMessage += error.non_field_errors + "\n";
    } else if (Array.isArray(error.non_field_errors)) {
      error.non_field_errors.forEach((nfe: string) => {
        errorMessage += nfe + "\n";
      });
    }
  }

  // Fallback if no specific error message was constructed
  if (!errorMessage) {
    errorMessage =
      error?.data?.status === "error"
        ? beautifyErrors(error) || "Unknown error occurred."
        : "Unknown error occurred.";
  }

  // Ensure errorMessage is a string and trim it
  return typeof errorMessage === "string"
    ? errorMessage.trim()
    : String(errorMessage);
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

  const entries = Object.entries(params).filter(([, value]) => {
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

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}

export function formatShortTimeAgo(date: string): string {
  const duration = moment.duration(moment.utc().diff(moment.utc(date)));

  if (duration.asSeconds() < 0) {
    return "0s";
  }

  if (duration.asSeconds() < 60) {
    return `${Math.floor(duration.asSeconds())}s`;
  } else if (duration.asMinutes() < 60) {
    return `${Math.floor(duration.asMinutes())}m`;
  } else if (duration.asHours() < 24) {
    return `${Math.floor(duration.asHours())}h`;
  } else if (duration.asDays() < 30) {
    return `${Math.floor(duration.asDays())}d`;
  } else if (duration.asMonths() < 12) {
    return `${Math.floor(duration.asMonths())}mo`;
  } else {
    return `${Math.floor(duration.asYears())}y`;
  }
}

export function getYears() {
  const currentYear = moment().year();
  const years = [];

  for (let i = currentYear; i >= 2025; i--) {
    years.push(i);
  }

  return years;
}

export function shortenFilename(filename: string, maxLength = 12) {
  const parts = filename.split(".");
  if (parts.length < 2) return filename;

  const ext = parts.pop();
  const name = parts.join(".");

  if (name.length <= maxLength) return `${name}.${ext}`;

  const half = Math.floor((maxLength - 3) / 2); // 3 for "..."
  return `${name.slice(0, half)}...${name.slice(-half)}.${ext}`;
}

export function linkifyHTML(htmlString: string) {
  return parse(htmlString, {
    replace: (domNode) => {
      // If it's a text node
      if (domNode.type === "text") {
        const { data } = domNode;
        const matches = linkify.match(data);
        if (matches) {
          const result = [];
          let lastIndex = 0;

          matches.forEach((match, i) => {
            const { index, lastIndex: endIndex } = match;
            if (index > lastIndex) {
              result.push(data.slice(lastIndex, index));
            }
            result.push(
              `<a
                key={link-${i}}
                href={raw}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {raw}
              </a>`
            );
            lastIndex = endIndex;
          });

          if (lastIndex < data.length) {
            result.push(data.slice(lastIndex));
          }

          return `<>${result}</>`;
        }
      }
    },
  });
}

export function shortenFileName(name: string, maxLength = 30) {
  if (name.length <= maxLength) return name;
  const start = name.slice(0, 20);
  const end = name.slice(-10);
  return `${start}...${end}`;
}

export function formatChatForPdf(messages: any[]): {
  isMe: boolean;
  sender: string;
  message: string;
  timestamp: string;
}[] {
  return messages.map((item) => {
    const time = moment(item.timestamp);
    const displayTime = time.format("hh:mm A");

    return {
      isMe: item.isMe,
      sender: item.isMe ? "You" : "Teez",
      message: item.message,
      timestamp: displayTime,
    };
  });
}

export function formateDate(
  date: string = "",
  format: string = "DD MMM, YYYY"
) {
  return moment(date).format(format);
}

export function isNegativeNumber(value: any): boolean {
  if (typeof value !== "number") return false;
  return value < 0;
}

export function getCountryLocation(countryName: string) {
  const country = countryGpsLocation.find(
    (c) => c.name.toLowerCase() === countryName.toLowerCase()
  );

  if (!country) {
    return { latitude: "", longitude: "" };
  }

  return {
    latitude: country.latitude,
    longitude: country.longitude,
  };
}
