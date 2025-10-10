"use client"; // ✅
import React from "react";
import NavBar from "@/components/navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AuthProvider } from "@/context/AuthContext";

export default function Layout({ children }) {
  return (
    <AuthProvider>
      <ProtectedRoute role={1}>
        <div className="p-[10px] bg-[#f0ebf8] min-h-screen">
          <NavBar />
          {/* max-h-[calc(100vh-20px)] overflow-y-scroll */}
          <main className="mx-auto w-full">{children}</main>
        </div>
      </ProtectedRoute>
    </AuthProvider>
  );
}
