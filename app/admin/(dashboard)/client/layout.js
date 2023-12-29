"use client";

import { ClientProvider } from "@/context/ClientContext";

export default function RootLayout({ children }) {
  return (
    <>
      <ClientProvider>{children}</ClientProvider>
    </>
  );
}
