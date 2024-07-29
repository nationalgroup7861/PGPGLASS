"use client";

import ls from "localstorage-slim";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import avatar from "../../public/images/team/team-01sm.jpg";
import { useAppContext } from "@/context/Context";
import { useEffect, useState } from "react";
import SmallNavItem from "../../data/header.json";

const LeftSidebar = () => {
  const pathname = usePathname();
  const router=useRouter();
  const [userInfo,setUserInfo]=useState("")

  const { shouldCollapseLeftbar } = useAppContext();

  const isActive = (href) => pathname.startsWith(href);

  const handleLogout = () => {
    localStorage.removeItem('isAuth');
    localStorage.removeItem('pgp_user');
    router.replace("/");
  };

  useEffect(() => {
    const user_data = ls.get("pgp_user", { decrypt: true });
    setUserInfo(user_data)
  }, []);


  return (
    <>
      <div
        className={`rbt-left-panel popup-dashboardleft-section ${shouldCollapseLeftbar ? "collapsed" : ""
          }`}
      >
        <div className="rbt-default-sidebar">
          <div className="inner">
            <div className="content-item-content">
              <div className="rbt-default-sidebar-wrapper">
                <nav className="mainmenu-nav">
                  <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                    {SmallNavItem &&
                      SmallNavItem.smallNavItem
                        .slice(0, 6)
                        .map((data, index) => (
                          <li key={index}>
                            <Link
                              className={
                                isActive(data.link)
                                  ? "active"
                                  : "" || data.isDisable
                                    ? "disabled"
                                    : ""
                              }
                              href={data.link}
                            >
                              <Image
                                src={data.img}
                                width={35}
                                height={35}
                                alt="AI Generator"
                              />
                              <span>{data.text}</span>
                              {data.badge !== "" ? (
                                <div className="rainbow-badge-card badge-sm ml--10">
                                  {data.badge}
                                </div>
                              ) : (
                                ""
                              )}
                            </Link>
                          </li>
                        ))}
                  </ul>
                  {/* <div className="rbt-sm-separator"></div>
                  <div className="mainmenu-nav">
                    <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                      <li className="has-submenu">
                        <a
                          className="collapse-btn collapsed"
                          data-bs-toggle="collapse"
                          href="#collapseExampleMenu"
                          role="button"
                          aria-expanded="false"
                          aria-controls="collapseExampleMenu"
                        >
                          <i className="feather-plus-circle"></i>
                          <span>Setting</span>
                        </a>
                        <div className="collapse" id="collapseExampleMenu">
                          <ul className="submenu rbt-default-sidebar-list">
                            {SmallNavItem &&
                              SmallNavItem.smallNavItem
                                .slice(7, 14)
                                .map((data, index) => (
                                  <li key={index}>
                                    <Link
                                      href={data.link}
                                      className={
                                        isActive(data.link) ? "active" : ""
                                      }
                                    >
                                      <i className={`feather-${data.icon}`}></i>
                                      <span>{data.text}</span>
                                    </Link>
                                  </li>
                                ))}
                          </ul>
                        </div>
                      </li>
                      <li>
                        <Link
                          href="/help"
                          className={isActive("/help") ? "active" : ""}
                        >
                          <i className="feather-award"></i>
                          <span>Help & FAQ</span>
                        </Link>
                      </li>
                    </ul>

                    <div className="rbt-sm-separator"></div>
                    <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                      <li>
                        <Link
                          href="/release-notes"
                          className={isActive("/release-notes") ? "active" : ""}
                        >
                          <i className="feather-bell"></i>
                          <span>Release notes</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/"
                          className={isActive("/terms-policy") ? "active" : ""}
                        >
                          <i className="feather-briefcase"></i>
                          <span>Terms & Policy</span>
                        </Link>
                      </li>
                    </ul>
                  </div> */}
                </nav>
              </div>
            </div>
          </div>

          <div className="subscription-box">
            <div className="inner">
              <Link href="/" className="autor-info">
                <div className="author-img active">
                  <Image
                    className="w-100"
                    width={49}
                    height={48}
                    src={avatar}
                    alt="Author"
                  />
                </div>
                <div className="author-desc">
                  <h6>{userInfo?.name}</h6>
                  <p>{userInfo?.email}</p>
                </div>
                <div className="author-badge">{userInfo?.designation}</div>
              </Link>
              <div className="btn-part">
                {/* <Link href="#" className="btn-default btn-border" onClick={() => handleLogout()}>
                  
                </Link> */}
                <button
                className="btn-default btn-border"
                onClick={() => handleLogout()}
              >
                Logout
              </button>
              </div>
            </div>
          </div>
          <p className="subscription-copyright copyright-text text-center b3  small-text">
            © 2024
            <Link
              className="ps-2"
              href="#"
            >
              PGP GLASS
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default LeftSidebar;
