import { AuthProvider } from "@/context/authentication/Authentication";
import "@/styles/globals.css";
import { AppProps } from "next/app";
import React from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </React.StrictMode>
  );
}
