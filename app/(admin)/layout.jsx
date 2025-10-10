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
        <div className="grid grid-cols-12 gap-[10px] min-h-screen p-[10px] bg-default-100">
          {/* Sidebar (col-span-2) */}
          <aside className="col-span-2 rounded-md border overflow-hidden bg-white border-divider dark:border-[#3d3d3d] ">
            <SideBar />
          </aside>

          {/* Right side (col-span-10) */}
          <div className="col-span-10 flex flex-col gap-[10px]">
            {/* Navbar top */}
            <header className="h-[70px] rounded-md border bg-white border-divider dark:border-[#3d3d3d] dark:bg-[#27272a] flex justify-end gap-[10px] items-center px-6">
              <DropdownUser />
              <ThemeSwitch />
            </header>

            {/* Main content */}
            <main className="flex-1 rounded-md border bg-white border-divider dark:border-[#3d3d3d] dark:bg-[#27272a] p-2 overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
      </ProtectedRoute>
    </AuthProvider>
  );
}
