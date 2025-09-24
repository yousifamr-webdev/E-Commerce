"use client";

import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <main className="flex flex-col min-h-screen bg-[#F8F9FA]">
  
      <div className="flex-1 flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-7xl font-extrabold text-emerald-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Oops! Page not found
        </h2>
        <p className="text-gray-600 max-w-md mb-8">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <Link
          href="/"
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
