"use client"; // ✅
import React from 'react'
import NavBar from "@/components/navbar";

export default function Layout({
    children,
}) {
    return (
        <div className='p-[10px] bg-[#f0ebf8] min-h-screen'>
            <NavBar />
            {/* max-h-[calc(100vh-20px)] overflow-y-scroll */}
            <main className="mx-auto w-full">
                {children}
            </main>
        </div>
    )
}
