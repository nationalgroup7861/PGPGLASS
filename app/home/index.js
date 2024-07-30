"use client";

import Context from "@/context/Context";

import Header from "@/components/Header/Header";
import Home from "@/components/Home/Home";

const HomePage = () => {
  
  return (
    <>
      <main className="page-wrapper">
        <Context>
          <Header
            headerTransparent="header-transparent"
            headerSticky="header-sticky"
            btnClass="rainbow-gradient-btn"
          />
          <Home />
          {/* <Footer /> */}
          {/* <Copyright /> */}
        </Context>
      </main>
    </>
  );
};

export default HomePage;
