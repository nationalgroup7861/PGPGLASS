"use client";

import { DesignGptProvider } from "@/app/context/DesignGptContext";
import DesignCraftRightDashboardSidebar from "@/components/Header/DesignCraftRightDashboardSidebar";

export default function AuthLayout({ children }) {
  return (
    <>
      <DesignGptProvider>
        <DesignCraftRightDashboardSidebar />
        {children}
      </DesignGptProvider>

    </>
  );
}
