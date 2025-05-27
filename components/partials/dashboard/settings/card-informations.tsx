import { Button } from '@/components/shadcn/button';
import { ChevronRight, Pencil, Trash2 } from 'lucide-react';

const CardInformations = () => {
  return (
    <>
      <div className="mt-4 sm:mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base sm:text-lg font-medium text-[#2b3545]">
            Card Information
          </h2>
          <Button
            type="button"
            variant="outline"
            disabled
            className="border-[#d5d7da] text-[#555d6a] text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2"
          >
            <span className="mr-1">+</span> Add Card
          </Button>
        </div>

        {/* Mastercard */}
        <div className="border-t border-[#d5d7da] py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-[#555d6a]" />
              <div className="w-8 h-5 sm:w-10 sm:h-6 mx-2 sm:mx-3 flex items-center justify-center">
                <div className="w-6 h-4 sm:w-8 sm:h-5 bg-[#f5f5f5] rounded flex items-center justify-center">
                  <svg
                    width="24"
                    height="16"
                    viewBox="0 0 24 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-3 sm:w-6 sm:h-4"
                  >
                    <rect width="24" height="16" rx="2" fill="white" />
                    <circle cx="9" cy="8" r="4" fill="#EB001B" />
                    <circle cx="15" cy="8" r="4" fill="#F79E1B" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 11.2C13.1046 10.3999 13.8 9.08 13.8 7.6C13.8 6.12 13.1046 4.8001 12 4C10.8954 4.8001 10.2 6.12 10.2 7.6C10.2 9.08 10.8954 10.3999 12 11.2Z"
                      fill="#FF5F00"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <p className="font-medium text-[#2b3545] text-xs sm:text-base">
                  Mastercard
                </p>
                <p className="text-xs sm:text-sm text-[#717882]">
                  Expires Apr 2028
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="text-[#555d6a]">
                <Pencil className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="text-[#555d6a]">
                <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Visa */}
        <div className="border-t border-[#d5d7da] py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-[#555d6a]" />
              <div className="w-8 h-5 sm:w-10 sm:h-6 mx-2 sm:mx-3 flex items-center justify-center">
                <div className="w-6 h-4 sm:w-8 sm:h-5 bg-[#f5f5f5] rounded flex items-center justify-center">
                  <svg
                    width="24"
                    height="8"
                    viewBox="0 0 24 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-2 sm:w-6 sm:h-3"
                  >
                    <path d="M9.5 1L7.5 7H5.5L7.5 1H9.5Z" fill="#00579F" />
                    <path
                      d="M16.5 1.1C16 1 15.2 0.9 14.2 0.9C12.2 0.9 10.8 1.9 10.8 3.3C10.8 4.4 11.8 5 12.6 5.3C13.4 5.6 13.6 5.8 13.6 6.1C13.6 6.5 13.1 6.7 12.6 6.7C11.9 6.7 11.5 6.6 10.9 6.4L10.6 6.3L10.3 7.9C10.9 8.1 11.9 8.2 12.9 8.2C15 8.2 16.4 7.2 16.4 5.7C16.4 4.8 15.8 4.1 14.6 3.7C13.9 3.4 13.5 3.2 13.5 2.9C13.5 2.6 13.8 2.3 14.5 2.3C15.1 2.3 15.5 2.4 15.9 2.5L16.1 2.6L16.5 1.1ZM17.5 4.5C17.7 4 18.2 2.7 18.2 2.7C18.2 2.7 18.3 2.4 18.4 2.2L18.5 2.6C18.5 2.6 18.8 4.1 18.9 4.5H17.5Z"
                      fill="#00579F"
                    />
                    <path
                      d="M4.5 1L2.6 5.2L2.4 4.3C2 3.2 1.2 2.1 0.3 1.5L2 7H4.1L7.3 1H4.5Z"
                      fill="#00579F"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <p className="font-medium text-[#2b3545] text-xs sm:text-base">
                  Visa
                </p>
                <p className="text-xs sm:text-sm text-[#717882]">
                  512 Water Plant
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="text-[#555d6a]">
                <Pencil className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="text-[#555d6a]">
                <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardInformations;
