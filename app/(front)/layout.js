"use client";

import { setSession } from "@/util/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ls from "localstorage-slim";

export default function AuthLayout({ children }) {
  const router = useRouter();
  const { isAuth } = useSelector((state) => state.auth);
  useEffect(() => {
    const user_data = ls.get("pgp_user", { decrypt: true });
    setSession(user_data);
    if (!isAuth && !user_data) {
      router.push("/");
    }
  
  }, [isAuth]);

  return <>{children}</>;
}
