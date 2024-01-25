"use client";

import UserLoginForm from "@/components/partials/auth/userLogin-form";
import useDarkMode from "@/hooks/useDarkMode";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [isDark] = useDarkMode();
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuth) {
      router.push("/service");
    }
  }, [isAuth]);

  return (
    <>
      <div
        className="loginwrapper bg-cover bg-no-repeat  bg-bottom"
        style={{
          backgroundImage: `url(/pgp_bg.jpg)`,
        }}
      >
        <div className="lg-inner-column">
          <div className="left-columns lg:w-1/2 lg:block hidden">
            <div className="logo-box-3">
              <Link href="/" className="">
                <img src="/pgplogo.svg" alt="" />
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 w-full flex flex-col items-center justify-center">
            <div className="auth-box-3">
              <div className="mobile-logo text-center mb-6 lg:hidden block">
                <Link href="/">
                  <img
                    src={isDark ? "/pgplogo.svg" : "/pgplogo.svg"}
                    alt=""
                    className="mx-auto"
                  />
                </Link>
              </div>
              <div className="text-center 2xl:mb-10 mb-5">
                <h4 className="font-medium">Sign In</h4>
                <div className="text-slate-500 dark:text-slate-400 text-base">
                  Sign in to your account to start using PGPGPT
                </div>
              </div>
              <UserLoginForm />
              <div className=" relative border-b-[#9AA2AF] border-opacity-[16%] border-b pt-6"></div>
              <div className="mx-auto font-normal text-slate-500 dark:text-slate-400 2xl:mt-12 mt-6 uppercase text-sm text-center">
                Need Help ?
              </div>
            </div>
          </div>
          <div className="auth-footer3 text-[#ff6600] py-5 px-5 text-xl w-full">
            Unlock your Project performance
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
