"use client";

import LoginForm from "@/components/partials/auth//login-form";
import useDarkMode from "@/hooks/useDarkMode";
import Image from "next/image";
import Link from "next/link";
// bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-600 to-indigo-200

const Login3 = () => {
  const [isDark] = useDarkMode();
  return (
    <>
      <div
        className="loginwrapper bg-cover bg-no-repeat bg-center bg-gradient-to-r from-[#6dd4f2] to-[#99ddf0]">
        <div className="lg-inner-column">
          <div className="left-columns lg:w-1/2 lg:block hidden">
            <div className="logo-box-3">
              <Link href="/" className="">
                <Image src="/pgplogo.svg" alt="PGPGLASS" width={200}  height={200}/>
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 w-full flex flex-col items-center justify-center">
            <div className="auth-box-3">
              <div className="mobile-logo text-center mb-6 lg:hidden block">
                <Link href="/">
                  <Image
                    src={
                      isDark
                        ? "/logo-white.svg"
                        : "/pgplogo.svg"
                    }
                    alt="PGPGLASS"
                    className="mx-auto"
                    width={50}  height={50}
                  />
                </Link>
              </div>
              <div className="text-center 2xl:mb-10 mb-5">
                <h4 className="font-medium">Sign In</h4>
                <div className="text-slate-500 dark:text-slate-400 text-base">
                  Sign in to your account to start using PGP ADMIN
                </div>
              </div>
              <LoginForm />
             
              <div className="mx-auto font-normal text-slate-500 dark:text-slate-400 2xl:mt-12 mt-6 uppercase text-sm text-center">
                Already registered?
                <Link
                  href="/"
                  className="text-slate-900 dark:text-white font-medium hover:underline"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
          <div className="auth-footer3 text-white py-5 px-5 text-xl w-full">
            Unlock your  performance
          </div>
        </div>
      </div>
    </>
  );
};

export default Login3;
