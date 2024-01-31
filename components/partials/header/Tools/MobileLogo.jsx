import React from "react";
import Link from "next/link";
import useDarkMode from "@/hooks/useDarkMode";

import MainLogo from "@/assets/nlogo.png";
import LogoWhite from "@/assets/nlogo.png";
const MobileLogo = () => {
  const [isDark] = useDarkMode();
  return (
    <Link href="/admin/pgp">
      <img src={isDark ? LogoWhite : MainLogo} alt="PGPGPT" />
    </Link>
  );
};

export default MobileLogo;
