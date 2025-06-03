import { toast as sonnerToast } from "sonner";

type ToastType =
  | "default"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "uploadInventory";

type ToastOptions = {
  title?: string;
  description?: string;
  duration?: number;
};

export const useToast = () => {
  const toast = (type: ToastType, message: string, options?: ToastOptions) => {
    if (type == "error") {
      sonnerToast.error(message, {
        icon: (
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mt-1"
          >
            <path
              d="M8.27649 18.8359C7.98425 18.8359 7.6923 18.7244 7.46912 18.5015C7.02334 18.0557 7.02334 17.3328 7.46912 16.8873L16.887 7.46941C17.3325 7.02363 18.056 7.02363 18.5012 7.46941C18.9472 7.91548 18.9472 8.63808 18.5012 9.08386L9.08329 18.5018C8.86068 18.7244 8.56873 18.8359 8.27649 18.8359Z"
              fill="#EC0000"
            />
            <path
              d="M17.6944 18.8359C17.4024 18.8359 17.1099 18.7244 16.8873 18.5015L7.46941 9.08358C7.02363 8.63751 7.02363 7.9149 7.46941 7.46912C7.91547 7.02334 8.63808 7.02334 9.08386 7.46912L18.5018 16.887C18.9478 17.3328 18.9478 18.0557 18.5018 18.5012C18.2789 18.7244 17.9863 18.8359 17.6944 18.8359Z"
              fill="#EC0000"
            />
            <path
              d="M12.9854 25.828C5.90404 25.828 0.142857 20.0668 0.142857 12.9854C0.142857 5.90404 5.90404 0.14286 12.9854 0.14286C20.0668 0.14286 25.828 5.90404 25.828 12.9854C25.828 20.0668 20.0668 25.828 12.9854 25.828ZM12.9854 2.42599C7.1629 2.42599 2.42598 7.1629 2.42598 12.9854C2.42598 18.808 7.1629 23.5449 12.9854 23.5449C18.808 23.5449 23.5449 18.808 23.5449 12.9854C23.5449 7.1629 18.808 2.42599 12.9854 2.42599Z"
              fill="#EC0000"
            />
          </svg>
        ),
        title: <div className="ml-2">{message}</div>,

        ...options,
      });
    }

    if (type == "success") {
      sonnerToast.success(message, {
        icon: (
          <svg
            width="26"
            height="26"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mt-1"
          >
            <path
              d="M40 20C40 31.045 31.045 40 20 40C8.955 40 0 31.045 0 20C0 8.955 8.955 0 20 0C31.045 0 40 8.955 40 20Z"
              fill="#4CAF50"
            />
            <path
              d="M29.001 11L15.399 24.597L9.797 18.999L7 21.796L15.399 30.199L31.797 13.797L29.001 11Z"
              fill="#CCFF90"
            />
          </svg>
        ),
        title: <div className="ml-2">{message}</div>,
        description: <div>{options?.description}</div>,
        ...options,
      });
    }

    if (type == "uploadInventory") {
      sonnerToast.custom(
        (id) => {
          console.log("custom toast", id);
          return (
            <div className="bg-white rounded-xl shadow-md p-4 border border-gray-50 w-[360px] flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">
                  Upload Summary
                </h2>

                <button
                  onClick={() => sonnerToast.dismiss(id)}
                  className="text-gray-500 hover:text-gray-700 "
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 8.58579L14.1421 4.44361L15.5564 5.85786L11.4142 10L15.5564 14.1421L14.1421 15.5564L10 11.4142L5.85786 15.5564L4.44361 14.1421L8.58579 10L4.44361 5.85786L5.85786 4.44361L10 8.58579Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>
                  <span className="font-medium">Total Rows:</span> 50
                </li>
                <li>
                  <span className="font-medium">Successfully added:</span> 45
                </li>
                <li>
                  <span className="font-medium">Skipped during import:</span> 5
                </li>
              </ul>
              <button
                onClick={() => {
                  // Your handler to show details, e.g. open modal or download CSV
                  console.log("View details clicked");
                }}
                className="self-start px-4 py-1 border border-gray-400 rounded hover:bg-black hover:text-white text-sm font-medium w-full"
              >
                View Details
              </button>
            </div>
          );
        },
        {
          duration: 100000,
        }
      );
    }
  };

  return toast;
};
