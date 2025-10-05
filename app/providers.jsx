"use client";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { addToast, ToastProvider } from "@heroui/toast";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({ children, themeProps }) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <ToastProvider toastProps={{ timeout: 2500, shouldShowTimeoutProgress: true,}}/>
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </HeroUIProvider>
  );
}
