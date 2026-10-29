
import { useState } from "react";

function Navbar({ onMenuClick }) {
  

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

        {/* Left: Menu and Heading */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
            aria-label="Open sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div>
            <h1 className="text-lg font-bold text-slate-800 sm:text-2xl">
              Expense Tracker
            </h1>
            <p className="hidden text-sm text-slate-500 sm:block">
              Manage your money smarter
            </p>
          </div>
        </div>

        {/* Right: Search and Profile */}
        <div className="flex items-center gap-3">

         

          {/* Notification */}
          <button
            type="button"
            aria-label="Notifications"
            className="relative rounded-xl p-2.5 text-slate-600 transition hover:bg-slate-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 0 0-4-5.7V5a2 2 0 1 0-4 0v.3A6
                 6 0 0 0 6 11v3.2a2 2 0 0 1-.6 1.4L4 17h5m6 0a3 3 0 0 1-6 0"
              />
            </svg>
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500" />
          </button>

          {/* Profile */}
          <button
            type="button"
            aria-label="User profile"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-emerald-500
             to-teal-700 text-sm font-bold text-white shadow-md transition hover:scale-105"
          >
            U
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
