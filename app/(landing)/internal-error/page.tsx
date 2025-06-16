import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-green-600">500</h1>
        <p className="mt-4 text-2xl font-semibold text-gray-800">
          Internal Server Error
        </p>
        <p className="mt-2 text-gray-600">
          Something went wrong on our end. Please try again later or contact
          support if the issue persists.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-xl bg-green-600 text-white px-6 py-3 text-sm font-medium shadow hover:bg-green-700 transition"
        >
          Take me home
        </Link>
      </div>
    </div>
  );
}
