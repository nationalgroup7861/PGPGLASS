import React from "react";
import Link from "next/link";

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center bg-cover bg-no-repeat  bg-bottom items-center text-center py-10 dark:bg-slate-900"
    style={{
      backgroundImage: `url(/pgp_bg.jpg)`,
    }}
    >
      <img src="/nlogo.png" alt="PGPGPT" />
      <div className="max-w-[546px] mx-auto w-full mt-12">
        <h4 className="text-slate-900 mb-4">Page not found</h4>
        <div className="dark:text-white text-base font-normal mb-10">
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.
        </div>
      </div>
      <div className="max-w-[300px] mx-auto w-full">
        <Link
          href="/"
          className="btn bg-[#ff6600] hover:bg-opacity-75 transition-all duration-150 block text-center text-white"
        >
          Go to homepage
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
