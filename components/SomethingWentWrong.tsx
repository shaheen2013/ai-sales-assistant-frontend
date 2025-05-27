import { AlertCircle } from "lucide-react";

export default function SomethingWentWrong() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
      <div className="bg-white border border-green-300 rounded-2xl shadow-md p-8 max-w-md w-full text-center">
        <div className="text-green-600 text-6xl mb-4">
          <AlertCircle className="h-12 w-12 text-green-500 mb-4 mx-auto" />
        </div>
        <h1 className="text-2xl font-bold text-green-500 mb-2">
          Something Went Wrong
        </h1>
        <p className="text-green-800 mb-6">
          We encountered an unexpected error. Please try again later or contact
          support if the problem persists.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
