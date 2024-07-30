"use client";

import { ResearchGptProvider } from "@/app/context/ResearchGptContext";
import ResearchGptRightDashboardSidebar from "@/components/Header/ResearchGptRightDashboardSidebar";

export default function AuthLayout({ children }) {
  return (
    <>
      <ResearchGptProvider>
        <ResearchGptRightDashboardSidebar />
        {children}
      </ResearchGptProvider>

    </>
  );
}
