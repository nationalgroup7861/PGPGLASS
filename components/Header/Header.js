"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import { useAppContext } from "@/context/Context";

import logo from "../../public/images/logo/logowhite.svg";
import Nav from "./Nav";
import ls from "localstorage-slim";

const Header = ({ headerTransparent, headerSticky, btnClass }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { activeMobileMenu, setActiveMobileMenu } = useAppContext();
  const [isSticky, setIsSticky] = useState(false);
  const [ isAuth, setIsAuth ] = useState("");

  useEffect(() => {
    const user_data = ls.get("pgp_user", { decrypt: true });
    const flag = ls.get("isAuth");
    setIsAuth(flag)
  }, []);

  useEffect(() => {
    if (pathname === "/") {
      router.push("/home");
    }

    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (scrolled > 200) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [router, pathname]);
  return (
    <>
      <header
        className={`rainbow-header header-default ${headerTransparent} ${headerSticky} ${
          isSticky ? "sticky" : ""
        }`}
      >
        <div className="container position-relative">
          <div className="row align-items-center row--0">
            <div className="col-lg-2 col-md-6 col-6">
              <div className="logo">
                <Link href="/home">
                  <Image
                    className="logo-light"
                    src={logo}
                    width={135}
                    height={135}
                    alt="ChatBot Logo"
                  />
                </Link>
              </div>
            </div>

            <div className="col-lg-8 d-none d-lg-block">
              {/* <nav className="mainmenu-nav d-none d-lg-flex justify-content-center">
                <Nav />
              </nav> */}
            </div>

            <div className="col-lg-2 col-md-6 col-6 position-static">
              <div className="header-right">
                <div className="header-btn">
                  <Link className={`${btnClass}`} href={isAuth ? "/service" : "/signin"}>
                    <span>{isAuth ? "Get Start": "Sign in" }</span>
                  </Link>
                </div>

                <div className="mobile-menu-bar ml--5 d-flex justify-content-end d-lg-none">
                  {/* <div className="hamberger">
                    <button
                      className="hamberger-button"
                      onClick={() => setActiveMobileMenu(!activeMobileMenu)}
                    >
                      <i className="fa-sharp fa-regular fa-bars"></i>
                    </button>
                  </div> */}
                    <Link className={`${btnClass}`} href={isAuth ? "/service" : "/signin"}>
                    <span>{isAuth ? "Get Start": "Sign in" }</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
