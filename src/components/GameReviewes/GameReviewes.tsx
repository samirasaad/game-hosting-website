"use client";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export default function GameReviewCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-2/3 container mt-12 border rounded-2xl overflow-hidden bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 shadow-lg transition-shadow duration-300 hover:shadow-2xl">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 cursor-pointer bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors group"
      >
        <span className="font-semibold text-lg text-blue-900 dark:text-blue-200 group-hover:underline transition">
          {title}
        </span>
        <ChevronDownIcon
          className={`w-6 h-6 text-blue-700 dark:text-blue-300 transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Content */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-y-auto bg-white/80 dark:bg-gray-900/80 ${
          open ? "max-h-[500px] opacity-100 py-4 px-6" : "max-h-0 opacity-0 py-0 px-6"
        }`}
      >
        <div className="text-gray-700 dark:text-gray-200">{children}</div>
      </div>
    </div>
  );
}
