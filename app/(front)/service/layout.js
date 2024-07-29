"use client";

import { GlassGptProvider } from "@/app/context/GlassGptContext";
import ServiceRightDashboardSidebar from "@/components/Header/ServiceRightDashboardSidebar";

export default function AuthLayout({ children }) {
  return (
    <>
      <GlassGptProvider>
        <ServiceRightDashboardSidebar />
        {children}
      </GlassGptProvider>

    </>
  );
}
