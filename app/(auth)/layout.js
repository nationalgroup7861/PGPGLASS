"use client";

import ls from "localstorage-slim";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({ children }) {
  const router = useRouter();
  useEffect(() => {
    const user_data = ls.get("pgp_user", { decrypt: true });
    const isAuth = ls.get("isAuth");

    if (isAuth && user_data) {
      router.push("/service");
    }
  
  }, []);

  return <>{children}</>;
}
