"use client";

import { PgpGptProvider } from "@/app/context/PgpGptContext";
import GptRightDashboardSidebar from "@/components/Header/GptRightDashboardSidebar";

export default function AuthLayout({ children }) {
  return (
    <>
      <PgpGptProvider>
        <GptRightDashboardSidebar />
        {children}
      </PgpGptProvider>

    </>
  );
}
