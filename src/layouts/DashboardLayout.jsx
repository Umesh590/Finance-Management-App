import React from "react";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const displayName = user?.name || user?.email || "User";

  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1e293b",
            color: "#fff",
            borderRadius: "12px",
            padding: "12px 16px",
          },
          success: {
            iconTheme: {
              primary: "#34d399",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#fb7185",
              secondary: "#fff",
            },
          },
        }}
      />

      {/* Attractive Header */}
      <header className="relative overflow-hidden border-b border-indigo-100 bg-white shadow-sm">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-16 -top-28 h-64 w-80 rounded-full bg-purple-200/40 blur-3xl" />

        <div className="pointer-events-none absolute left-1/3 top-0 h-full w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-indigo-50/80 to-purple-50/70" />

        <div className="relative mx-auto flex max-w-7xl flex-col gap-5 px-4 py-5 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          {/* Logo and title */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-blue-500 text-white shadow-lg shadow-indigo-200 sm:h-14 sm:w-14">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-7 w-7 sm:h-8 sm:w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 19V13M10 19V8M16 19V4M22 19H2"
                />
              </svg>
            </div>

            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl lg:text-3xl">
                Finance{" "}
                <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
                  Management App
                </span>
              </h1>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Track your expenses with ease
              </p>
            </div>
          </div>

          {/* User profile and logout */}
          <div className="flex items-center justify-between gap-3 sm:justify-end sm:gap-5">
            <div className="text-right">
              <p className="text-xs text-slate-500 sm:text-sm">Welcome back,</p>

              <p className="max-w-40 truncate font-bold text-slate-900 sm:max-w-52">
                {displayName}
              </p>
            </div>

            {/* User avatar */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-blue-500 text-sm font-bold text-white shadow-md sm:h-12 sm:w-12">
              {initial}
            </div>

            <div className="hidden h-10 w-px bg-slate-200 sm:block" />

            {/* Logout button */}
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 px-3 py-2.5 text-sm font-semibold text-white shadow-md shadow-rose-200 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-rose-200 sm:px-4 sm:py-3"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 17l5-5-5-5m5 5H3m9-9h6a2 2 0 012 2v14a2 2 0 01-2 2h-6"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="mx-auto min-h-[70vh] max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-slate-700">
            Finance Management App
          </p>

          <p className="text-center text-xs text-slate-500 sm:text-sm">
            © {new Date().getFullYear()} All rights reserved.
          </p>

          <p className="text-xs text-slate-400">Manage your money smarter.</p>
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;
