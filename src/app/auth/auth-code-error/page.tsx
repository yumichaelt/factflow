import React from 'react';
import Link from 'next/link';

export default function AuthErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="p-8 bg-gray-800 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-red-400 mb-4">Authentication Error</h1>
        <p className="mb-6">There was a problem confirming your email. The link may have expired or already been used.</p>
        <Link href="/login" className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700">
          Return to Login
        </Link>
      </div>
    </div>
  );
}
