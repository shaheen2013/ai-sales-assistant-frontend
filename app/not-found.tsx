export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-green-600">404</h1>
        <p className="mt-4 text-2xl font-semibold text-gray-800">
          Page not found
        </p>
        <p className="mt-2 text-gray-600">
          The page you're looking for doesn't exist or might have been removed.
        </p>
        <a
          href="/"
          className="mt-6 inline-block rounded-xl bg-green-600 text-white px-6 py-3 text-sm font-medium shadow hover:bg-green-700 transition"
        >
          Take me home
        </a>
      </div>
    </div>
  );
}
