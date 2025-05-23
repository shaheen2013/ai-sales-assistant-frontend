import Button from "@/components/button";
import { formatFileSize } from "@/lib/utils";
import { useRef, useState } from "react";

type DragAndDropUploaderProps = {
  value?: File[];
  onChange?: (files: File[]) => void;
};

export default function DragAndDropUploader({
  value = [],
  onChange,
}: DragAndDropUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Hardcoded validation rules for now
  const allowedFileTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    "text/plain", // .txt
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
    "application/vnd.ms-excel", // .xls
  ];
  const allowedFileExtensions = [".docx", ".pdf", ".txt", ".xlsx", ".xls"];
  const maxFileSize = 5 * 1024 * 1024;
  const allowedMultipleFiles = false;

  function validateFile(file: File): boolean {
    const fileType = file.type;
    const ext = file.name
      .slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2)
      .toLowerCase();

    if (
      !allowedFileTypes.includes(fileType) &&
      !allowedFileExtensions.includes(`.${ext}`)
    ) {
      alert(`${file.name} is not an allowed file type.`);
      return false;
    }

    if (file.size > maxFileSize) {
      alert(`${file.name} exceeds the 5MB limit.`);
      return false;
    }

    return true;
  }

  function addValidFiles(newFiles: File[]) {
    const validFiles = newFiles.filter(validateFile);

    if (allowedMultipleFiles) {
      onChange?.([...value, ...validFiles]);
    } else if (validFiles.length > 0) {
      onChange?.([validFiles[0]]);
    }
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      addValidFiles(Array.from(e.target.files));
      e.target.value = "";
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    addValidFiles(Array.from(e.dataTransfer.files));
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
  }

  function openFileDialog() {
    fileInputRef.current?.click();
  }

  function removeFile(index: number) {
    const updated = value.filter((_, i) => i !== index);
    onChange?.(updated);
  }

  return (
    <div>
      {/* Drop zone */}
      <div
        className={`h-[220px] overflow-y-auto rounded-lg p-4 pb-0 cursor-pointer border-2 border-dashed transition-colors duration-150
          ${isDragging ? "border-green-500 bg-green-50" : "border-gray-300"}
        `}
        onClick={openFileDialog}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {value.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="42"
              height="43"
              viewBox="0 0 42 43"
              fill="none"
              className="mt-3 mb-2"
            >
              <g clipPath="url(#clip0_1241_12068)">
                <path
                  d="M33.4422 3.62109H14.1748V11.6111H37.5572V7.73451C37.5572 5.46616 35.7112 3.62109 33.4422 3.62109Z"
                  fill="#34AD5D"
                />
                <path
                  d="M22.5352 12.8403H0V5.42636C0 2.70972 2.21068 0.5 4.92828 0.5H12.1336C12.8497 0.5 13.5396 0.650925 14.1664 0.934509C15.0418 1.32896 15.7939 1.97913 16.3213 2.8286L22.5352 12.8403Z"
                  fill="#55BB78"
                />
                <path
                  d="M42 14.5004V38.3817C42 40.653 40.1511 42.5003 37.8789 42.5003H4.12111C1.84891 42.5003 0 40.653 0 38.3817V10.3809H37.8789C40.1511 10.3809 42 12.2288 42 14.5004Z"
                  fill="#55BB78"
                />
                <path
                  d="M42 14.5004V38.3817C42 40.653 40.1511 42.5003 37.8789 42.5003H21V10.3809H37.8789C40.1511 10.3809 42 12.2288 42 14.5004Z"
                  fill="#8AD0A2"
                />
                <path
                  d="M32.048 26.4405C32.048 32.5329 27.0919 37.4894 21.0001 37.4894C14.9083 37.4894 9.95215 32.5329 9.95215 26.4405C9.95215 20.3491 14.9083 15.3926 21.0001 15.3926C27.0919 15.3926 32.048 20.3491 32.048 26.4405Z"
                  fill="white"
                />
                <path
                  d="M32.0479 26.4405C32.0479 32.5329 27.0918 37.4894 21 37.4894V15.3926C27.0918 15.3926 32.0479 20.3491 32.0479 26.4405Z"
                  fill="#EAEBEC"
                />
                <path
                  d="M24.5612 26.5758C24.3308 26.7709 24.0485 26.8661 23.7688 26.8661C23.4185 26.8661 23.0705 26.7177 22.827 26.4287L22.2307 25.7218V30.3499C22.2307 31.0292 21.6795 31.5803 21.0002 31.5803C20.3209 31.5803 19.7698 31.0292 19.7698 30.3499V25.7218L19.1734 26.4287C18.7344 26.9481 17.9587 27.0145 17.4392 26.5758C16.9201 26.1378 16.8535 25.3617 17.2915 24.8422L19.7271 21.9548C20.0447 21.5793 20.508 21.3633 21.0002 21.3633C21.4924 21.3633 21.9558 21.5793 22.2733 21.9548L24.7089 24.8422C25.147 25.3617 25.0803 26.1378 24.5612 26.5758Z"
                  fill="#EAEBEC"
                />
                <path
                  d="M24.561 26.5758C24.3306 26.7709 24.0483 26.8661 23.7686 26.8661C23.4183 26.8661 23.0703 26.7177 22.8268 26.4287L22.2305 25.7218V30.3499C22.2305 31.0292 21.6793 31.5803 21 31.5803V21.3633C21.4922 21.3633 21.9555 21.5793 22.2731 21.9548L24.7087 24.8422C25.1467 25.3617 25.0801 26.1378 24.561 26.5758Z"
                  fill="#34AD5D"
                />
              </g>
              <defs>
                <clipPath id="clip0_1241_12068">
                  <rect
                    width="42"
                    height="42"
                    fill="white"
                    transform="translate(0 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>

            <h3 className="text-gray-400 text-sm">
              Drag your file(s) to start uploading
            </h3>

            <div className="relative flex items-center justify-center w-[200px] py-2">
              <p className="text-gray-400 text-sm bg-white inline-flex px-2">
                OR
              </p>

              {/* line of 300px */}
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#E7E7E7] -z-10"></div>
            </div>

            <Button variant="outline-gray" className="h-11 rounded-lg">
              Browse files
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {value.map((file, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-50 px-3 py-3 rounded-lg text-sm"
              >
                <span className="truncate">
                  {file.name} ({formatFileSize(file.size)})
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    removeFile(index);
                  }}
                  className="text-red-500 hover:underline"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 5L19 19M5 19L19 5"
                      stroke="#FF0000"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        <input
          type="file"
          multiple={allowedMultipleFiles}
          hidden
          ref={fileInputRef}
          onChange={handleFileSelect}
        />
      </div>
    </div>
  );
}
