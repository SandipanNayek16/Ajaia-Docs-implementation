import Link from 'next/link';
import { FileX2 } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center max-w-md p-8 bg-white rounded-xl shadow-lg">
        <FileX2 className="mx-auto mb-4 h-12 w-12 text-red-500" />
        <h1 className="mb-2 text-3xl font-bold text-gray-800">Page not found</h1>
        <p className="mb-6 text-gray-600">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
