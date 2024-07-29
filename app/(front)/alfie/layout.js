"use client";

import { AlfieGptProvider } from "@/app/context/AlfieGptContext";

export default function AuthLayout({ children }) {
  return (
    <>
      <AlfieGptProvider>
        {children}
      </AlfieGptProvider>

    </>
  );
}
