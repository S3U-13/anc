import React, { Component } from "react";
import Layout from "./layout";
import { AppProps } from "next/app";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function Myapp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <Component {...pageProps} />
      </NextThemesProvider>
    </Layout>
  );
}
