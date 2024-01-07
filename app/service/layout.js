"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";


export default function AuthLayout({ children }) {
  const router = useRouter();
  const { isAuth } = useSelector((state) => state.auth);

  useEffect(() => {
  
    if (!isAuth) {
      router.push("/");
    }
  }, [isAuth]);

  return (
    <>
    
        {children}
    </>
  );
}
