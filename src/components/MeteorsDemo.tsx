import React from "react";
import { Meteors } from "./ui/meteors";

export function MeteorsDemo() {
  return (
    <div className="w-full flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl">
        <div
          className="absolute inset-0 h-full w-full scale-[0.80] transform rounded-full bg-red-500 bg-gradient-to-r from-blue-500 to-teal-500 blur-3xl opacity-70" />
        <div
          className="relative flex h-full flex-col items-start justify-end overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/90 backdrop-blur-md px-6 py-8 shadow-2xl">
          <div
            className="mb-4 flex h-6 w-6 items-center justify-center rounded-full border border-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-3 w-3 text-gray-300">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
            </svg>
          </div>

          <h1 className="relative z-20 mb-3 text-2xl font-bold text-white tracking-tight">
            Next-Gen Document Workspace
          </h1>

          <p className="relative z-20 mb-6 text-sm md:text-base font-normal text-slate-400 leading-relaxed">
            Blazing fast editing, granular access controls, and instant team collaboration. Everything you need to capture ideas, craft proposals, and ship docs with confidence.
          </p>

          <div className="relative z-20 flex items-center gap-3">
            <a 
              href="/login"
              className="rounded-lg bg-white/10 hover:bg-white/20 border border-gray-600 px-4 py-1.5 text-sm font-medium text-white transition-all hover:scale-105"
            >
              Explore Docs
            </a>
          </div>

          {/* Meaty part - Meteor effect */}
          <Meteors number={25} />
        </div>
      </div>
    </div>
  );
}
