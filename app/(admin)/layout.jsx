"use client";
import React from "react";
import SideBar from "@/components/sidebar";
import { ThemeSwitch } from "@/components/theme-switch";
import DropdownUser from "@/components/dropdown_user";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AuthProvider } from "@/context/AuthContext";

export default function Layout({ children }) {
  return (
    <AuthProvider>
      <ProtectedRoute role={2}>
        <div className="grid grid-cols-12 gap-2 min-h-screen p-2 bg-default-100">
          {/* Sidebar */}
          <aside className="col-span-12 sm:col-span-3 md:col-span-2 rounded-md border overflow-hidden bg-white border-divider dark:border-[#3d3d3d] dark:bg-[#1f1f1f] h-full">
            <SideBar />
          </aside>

          {/* Right side */}
          <div className="col-span-12 sm:col-span-9 md:col-span-10 flex flex-col gap-2">
            {/* Navbar top */}
            <header className="h-[70px] rounded-md border bg-white border-divider dark:border-[#3d3d3d] dark:bg-[#27272a] flex justify-end gap-2 items-center px-4 sm:px-6">
              <DropdownUser />
              <ThemeSwitch />
            </header>

            {/* Main content */}
            <main className="flex-1 rounded-md border bg-white border-divider dark:border-[#3d3d3d] dark:bg-[#27272a] p-2 overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </ProtectedRoute>
    </AuthProvider>
  );
}
