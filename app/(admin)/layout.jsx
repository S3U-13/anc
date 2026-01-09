"use client";

import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { DrawerProvider, useDrawer } from "@/context/drawerProvider";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AuthProvider } from "@/context/AuthContext";

export default function Layout({ children }) {
  return (
    <AuthProvider>
      <ProtectedRoute role={[2]}>
        <DrawerProvider>
          <Content>{children}</Content>
        </DrawerProvider>
      </ProtectedRoute>
    </AuthProvider>
  );
}

function Content({ children }) {
  const { openDrawer, setOpenDrawer, drawerRef } = useDrawer();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0e0e11] p-4">
      {/* ---- Navbar ---- */}
      <div
        className={`sticky top-0 z-30 bg-inherit transition-all duration-300 
          ${openDrawer ? "md:ml-78" : "md:ml-0"}
        `}
      >
        <Navbar />
      </div>

      <div className="flex flex-1 transition-all duration-300">
        {/* ---- Desktop Sidebar ---- */}
        <div
          className={`hidden md:block h-full transition-all duration-300 overflow-hidden
            ${openDrawer ? "w-60" : "w-0"}
          `}
        >
          <Sidebar
            isOpen={openDrawer}
            onClose={() => setOpenDrawer(false)}
            drawerRef={drawerRef}
          />
        </div>

        {/* ---- Main ---- */}
        <main
          className={`flex-1 transition-all duration-300
            ${openDrawer ? "md:ml-18" : ""}
          `}
        >
          {children}
        </main>
      </div>

      {/* ---- Mobile Drawer ---- */}
      {openDrawer && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300"
          onClick={() => setOpenDrawer(false)}
        >
          <div
            className="absolute left-0 top-0 w-60 h-full bg-white shadow-xl z-50 transition-all duration-300"
            ref={drawerRef}
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar
              isOpen={openDrawer}
              onClose={() => setOpenDrawer(false)}
              drawerRef={drawerRef}
            />
          </div>
        </div>
      )}
    </div>
  );
}
