import { CircleAlert } from "lucide-react";

export default function SomethingWentWrong() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center  px-4">
      <div className="bg-white  rounded-3xl max-w-md w-full p-8 sm:p-10">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* icon */}
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CircleAlert
              className="w-8 h-8 text-green-600"
              aria-label="Error Icon"
            />
          </div>

          {/* Heading */}
          <div>
            <h1 className="text-2xl font-bold text-green-600 mb-1">
              Something Went Wrong
            </h1>

            <p className="text-sm font-normal text-green-600 leading-relaxed">
              An unexpected error occurred. Please try again, or contact support
              if the issue persists.
            </p>
          </div>

          {/* Action */}
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium bg-green-600 hover:bg-green-700 text-white rounded-xl transition-shadow shadow-md hover:shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
