"use client";
import { createContext, useContext, useRef, useState } from "react";

const DrawerContext = createContext();

export function DrawerProvider({ children }) {
  const drawerRef = useRef(null);
  const [openDrawer, setOpenDrawer] = useState(true);
  const handleOpenDrawer = () => {
    setOpenDrawer((prev) => !prev);
  };

  return (
    <DrawerContext.Provider value={{ openDrawer, setOpenDrawer, drawerRef }}>
      {children}
    </DrawerContext.Provider>
  );
}

export const useDrawer = () => useContext(DrawerContext);
