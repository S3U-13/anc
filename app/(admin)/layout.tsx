import React from "react";
import SideBar from "@/components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-[10px]">
      <SideBar />
      {/* max-h-[calc(100vh-20px)] overflow-y-scroll bg-[#f0ebf8] */}
      <main className="mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
