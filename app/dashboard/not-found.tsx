"use client";

import Link from "next/link";

export default function DashboardNotFound() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center text-green-600 p-6">
      <h1 className="text-5xl font-bold mb-4">404 - Not Found</h1>
      <p className="text-lg mb-6">
        Sorry, the page you are looking for doesn&apos;t exist.
      </p>
      <Link
        href="/dashboard/overview"
        className="inline-block px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Go back dashboard
      </Link>
    </div>
  );
}
