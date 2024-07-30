"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import MenuData from "../../data/header.json";

import NavProps from "./NavProps";
import menuImg from "../../public/images/menu-img/menu-img-2.png";
import { selectToCountry, selectToSAS } from "@/app/util/extra";

const Nav = () => {
  const pathname = usePathname();

  const [sectionStates, setSectionStates] = useState({
    Tools: true,
    Pages: true,
  });

  const toggleSection = (subTitle) => {
    setSectionStates((prevState) => ({
      ...prevState,
      [subTitle]: !prevState[subTitle],
    }));
  };

  const isActive = (href) => pathname.startsWith(href);

  const [selectedSAS, setSelectedSAS] = useState(selectToSAS[0]);
  const [selectedCountry, setSelectedCountry] = useState(selectToCountry[0]);

  const handleSelectSAS = (id) => {
    const selected = selectToSAS.find(item => item.id === id);
    setSelectedSAS(selected);
  };

  const handleSelectCountry = (id) => {
    const selected = selectToCountry.find(item => item.id === id);
    setSelectedCountry(selected);
  };



  return (
    <>
      {/* <ul className="mainmenu">
        {MenuData &&
          MenuData.nav.map((data, index) => (
            <li
              className={`${
                data.dropdown
                  ? "has-dropdown has-menu-child-item position-relative"
                  : ""
              } ${data.megamenu ? "with-megamenu has-menu-child-item" : ""}`}
              key={index}
            >
              {data.link === "#" ? (
                <a
                  href="#"
                  className={` ${!sectionStates[data.text] ? "open" : ""}`}
                  onClick={() => toggleSection(data.text)}
                >
                  {data.text}
                  {data.isIcon ? (
                    <i className="fa-regular fa-chevron-down"></i>
                  ) : (
                    ""
                  )}
                </a>
              ) : (
                <Link
                  href={data.link}
                  className={isActive(data.link) ? "active" : ""}
                >
                  {data.text}
                  {data.isIcon ? (
                    <i className="fa-regular fa-chevron-down"></i>
                  ) : (
                    ""
                  )}
                </Link>
              )}

              {data.isMenu &&
              !data.inner &&
              !data.dashboard &&
              !data.upcoming ? (
                <ul
                  className={`submenu ${
                    !sectionStates[data.text] ? "d-block" : ""
                  }`}
                >
                  {data.subItem &&
                    data.subItem.map((innerData, innerIndex) => (
                      <li key={innerIndex}>
                        <Link
                          className={`${
                            isActive(innerData.link) ? "active" : ""
                          } ${innerData.isDisable ? "disabled" : ""}`}
                          href={!innerData.isDisable ? innerData.link : "#"}
                        >
                          <span>{innerData.title}</span>
                          {innerData.badge ? (
                            <div className="rainbow-badge-card badge-sm ml--5">
                              {innerData.badge}
                            </div>
                          ) : (
                            ""
                          )}
                        </Link>
                      </li>
                    ))}
                </ul>
              ) : data.isMenu ? (
                <div
                  className={`rainbow-megamenu ${
                    !sectionStates[data.text] ? "d-block active" : ""
                  }`}
                >
                  <div className="wrapper">
                    <div className="row row--0">
                      <NavProps list={data.inner} />
                      <NavProps list={data.dashboard} />
                      <NavProps list={data.upcoming} />
                      <div className="col-lg-3 single-mega-item">
                        <div className="header-menu-img">
                          <Image
                            src={menuImg}
                            width={326}
                            height={458}
                            alt="Menu Split Image"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </li>
          ))}
      </ul> */}
{/* 
<div className="mt-4 d-flex sm:ml-4 sm:mt-0">
      <select
        value={selectedSasValue}
        onChange={handleSasValue}
        className=""
      >
        {selectToSAS.map((option, index) => (
          <option key={index} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>

      <select
        value={selectedCountryValue}
        onChange={handleCountryValue}
        className="ml-2 form-select rounded-sm bg-white border-0 w-100 max-w-xs"
      >
        {selectToCountry.map((option, index) => (
          <option key={index} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </div> */}

{/* <div className="dropdown history-box-dropdown">
      <button
        type="button"
        className="btn btn-outline-primary btn-lg dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {selectedValue.name}
      </button>
      <ul className="dropdown-menu style-one">
        {selectToSAS.map((item) => (
          <li key={item.id}>
            <a
              className={`dropdown-item ${selectedValue.id === item.id ? 'active' : ''}`}
              href="#"
              onClick={() => handleSelect(item.id)}
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>    */}
     
     <div className="d-flex flex-column flex-md-row ">
        {/* SAS Dropdown */}
        <div className="dropdown history-box-dropdown me-md-2 mb-2 mb-md-0">
          <button
            type="button"
            className="btn btn-outline-primary btn-lg dropdown-toggle btn-outline-custom"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {selectedSAS.name}
          </button>
          <ul className="dropdown-menu style-one">
            {selectToSAS.map((item) => (
              <li key={item.id}>
                <a
                  className={`dropdown-item ${selectedSAS.id === item.id ? 'active' : ''}`}
                  href="#"
                  onClick={() => handleSelectSAS(item.id)}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Country Dropdown */}
        <div className="dropdown history-box-dropdown ms-md-2">
          <button
            type="button"
            className="btn btn-outline-primary btn-lg dropdown-toggle btn-outline-custom"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {selectedCountry.name}
          </button>
          <ul className="dropdown-menu style-one">
            {selectToCountry.map((item) => (
              <li key={item.id}>
                <a
                  className={`dropdown-item ${selectedCountry.id === item.id ? 'active' : ''}`}
                  href="#"
                  onClick={() => handleSelectCountry(item.id)}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    
    </>
  );
};

export default Nav;
