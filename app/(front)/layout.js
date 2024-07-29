"use client";

import ls from "localstorage-slim";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Context from "@/context/Context";

import BackToTop from "@/app/backToTop";
import Modal from "@/components/Common/Modal";
import HeaderDashboard from "@/components/Header/HeaderDashboard";
import LeftDashboardSidebar from "@/components/Header/LeftDashboardSidebar";
import PopupMobileMenu from "@/components/Header/PopUpMobileMenu";


export default function AuthLayout({ children }) {
  const router = useRouter();
  
  useEffect(() => {
    const user_data = ls.get("pgp_user", { decrypt: true });
    const isAuth = ls.get("isAuth");
    if (!isAuth || !user_data) {
      router.push("/");
    }
  }, []);

  return (
    <>
      <main className="page-wrapper rbt-dashboard-page">
        <div className="rbt-panel-wrapper">
          <Context>
            <LeftDashboardSidebar />
            <HeaderDashboard display="" />
            <Modal />
            <PopupMobileMenu />
            {children}
            <BackToTop />

          </Context>
        </div>
      </main>
    </>
  );
}
