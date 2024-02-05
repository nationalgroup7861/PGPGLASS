"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import "./scss/app.scss";
import ls from 'localstorage-slim';
import { useRouter } from "next/navigation";

export default function RootLayout({ children }) {
  const { isAuth } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    const pgp_admin = ls.get("pgp_admin", { decrypt: true });
    if (isAuth && pgp_admin) {
      router.push("/admin/pgp");
    }
  }, [isAuth]);



  return <>{children}</>;
}
