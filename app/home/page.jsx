"use clinet";
import Image from "next/image";
import React from "react";
const templateReact = () => {
  const Button = ({ icon, label, buttonStyle }) => {
    return (
      <button
        className={`
inline-flex items-center justify-center gap-2 bg-[#20B2AA] text-sm font-semibold text-white shadow-sm transition-all duration-150 rounded-xl px-3 py-2 hover:bg-[#168b86] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${buttonStyle}`}
      >
        {label}
        {icon && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        )}
      </button>
    );
  };
  return (
    <div className="">
      <div className="flex bg-white/80 shadow backdrop-blur-lg inset-x-0 top-0 mx-auto">

      <Image src="/logo.svg" alt="" width="100" height="50"  />

      <div className="fixed z-30 w-full max-w-screen-md bg-white/80 shadow backdrop-blur-lg inset-x-0 top-0 mx-auto border border-gray-100 py-3 md:top-6 md:rounded-3xl lg:max-w-screen-lg">
        <div className="px-4">
          <div className="flex items-center justify-start gap-5">
            <div className="flex shrink-0">
              <a className=" flex items-center gap-1">
                {/* <Logo /> */}

                <div className="text-xl sm:text-2xl text-[#000000] font-bold pt-0.5">
                  InfyGPT
                </div>
              </a>
            </div>
            {/* <div className="hidden md:flex md:items-center md:justify-center md:gap-5"></div> */}
            <div className="flex items-center justify-end sm:gap-3">
              <span className="cursor-pointer hidden sm:inline-block text-sm font-medium text-gray-900 transition-all duration-200 rounded-lg px-2 py-1 hover:bg-gray-100 hover:text-gray-900">
                How it works
              </span>
              <span className="cursor-pointer sm:inline-block text-sm font-medium text-gray-900 transition-all duration-200 rounded-lg px-2 py-1 hidden hover:bg-gray-100 hover:text-gray-900">
                Pricing
              </span>
              <Button icon={false} label={"Sign in"} />
            </div>
          </div>
        </div>
      </div>
      </div>
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-transparent to-transparent pb-12 pt-28 sm:pb-16 sm:pt-32 lg:pb-24 xl:pb-32 xl:pt-40">
        <div className="relative isolate z-10">
          <div className="absolute -z-10 flex -translate-y-1/2 justify-center overflow-hidden inset-x-0 top-1/2 [mask-image:radial-gradient(50%_45%_at_50%_55%,white,transparent)]">
            <svg
              className="h-[60rem] w-[100rem] flex-none stroke-blue-600 opacity-20"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="e9033f3e-f665-41a6-84ef-756f6778e6fe"
                  width="200"
                  height="200"
                  x="50%"
                  y="50%"
                  patternUnits="userSpaceOnUse"
                  patternTransform="translate(-100 0)"
                >
                  <path d="M.5 200V.5H200" fill="none"></path>
                </pattern>
              </defs>
              <svg x="50%" y="50%" className="overflow-visible fill-blue-50">
                <path
                  d="M-300 0h201v201h-201Z M300 200h201v201h-201Z"
                  strokeWidth="0"
                ></path>
              </svg>
              <rect
                width="100%"
                height="100%"
                strokeWidth="0"
                fill="url(#e9033f3e-f665-41a6-84ef-756f6778e6fe)"
              ></rect>
            </svg>
          </div>
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-gray-900 ">
              Infy<span className="text-[#20B2AA]">GPT</span> <br />
              for providing better user experiences
            </h1>
            <h2 className="text-lg leading-8 text-gray-600 mt-6">
              Instantly respond to queries from visitors using a chatbot that
              has been trained on the information on your website.
            </h2>
            <div className="flex items-center justify-center gap-x-6 mt-10">
              <Button icon={true} buttonStyle="px-4 py-3" label={"Try Now"} />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-10 md:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-3">
          <div className="max-w-2xl mx-auto lg:text-center">
            <p className="text-base font-semibold leading-7 text-[#20B2AA]">
              Your Own AI Chatbot
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mt-2 sm:text-4xl">
              The Future of Conversational AI
            </h2>
            <p className="text-lg leading-8 text-gray-600 mt-6">
              Developing a personalized chatbot trained on your content <br />{" "}
              is now as simple as pressing a single button.
            </p>
          </div>
          <div className="max-w-2xl mx-auto mt-10 lg:max-w-none lg:pt-24">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <h3 className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <svg
                    className="h-5 w-5 flex-none text-[#20B2AA]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Enter your website URL
                </h3>
                <dd className="flex flex-auto flex-col text-base leading-7 text-gray-600 mt-4">
                  <h4 className="flex-auto">
                    Our automated system will seamlessly retrieve all pages from
                    your website and present them for your review effortlessly.{" "}
                  </h4>
                </dd>
              </div>
              <div className="flex flex-col">
                <h3 className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <svg
                    className="h-5 w-5 flex-none text-[#20B2AA]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Start Training
                </h3>
                <dd className="flex flex-auto flex-col text-base leading-7 text-gray-600 mt-4">
                  <h4 className="flex-auto">
                    Select the pages you want the chatbot to train on and click
                    on <strong>Start Training.</strong>
                  </h4>
                </dd>
              </div>
              <div className="flex flex-col">
                <h3 className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <svg
                    className="h-5 w-5 flex-none text-[#20B2AA]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Your own chatbot
                </h3>
                <dd className="flex flex-auto flex-col text-base leading-7 text-gray-600 mt-4">
                  <h4 className="flex-auto">
                    You now have your own chatbot that can answer anything
                    related to your website content.
                  </h4>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
      <section className="bg-white">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="relative isolate overflow-hidden bg-white px-6 py-10 md:py-24 text-center sm:shadow-sm sm:rounded-3xl sm:border sm:border-gray-100 sm:px-16">
            <h2 className="max-w-2xl text-2xl font-bold tracking-tight text-gray-900 mx-auto sm:text-4xl">
              Ready to elevate your website&apos;s performance and impact
              <br /> to new heights?
            </h2>
            <h3 className="max-w-xl text-lg leading-8 text-gray-500 mx-auto mt-6">
              Unlock the potential of your website by harnessing the power of an
              AI-driven chatbot. Enhance user experience, engage visitors with
              personalized interactions, and achieve unprecedented levels of
              efficiency and customer satisfaction.
            </h3>
            <div className="flex items-center justify-center gap-x-6 mt-8">
              <Button icon={true} buttonStyle="px-4 py-3" label={"Try Now"} />
            </div>
            <svg
              viewBox="0 0 1024 1024"
              className="absolute -z-10 h-[64rem] w-[64rem] -translate-x-1/2 left-1/2 top-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
              aria-hidden="true"
            >
              <circle
                cx="512"
                cy="512"
                r="512"
                fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
                fillOpacity="0.7"
              ></circle>
              <defs>
                <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                  <stop stopColor="#3b82f6"></stop>
                  <stop offset="1" stopColor="#1d4ed8"></stop>
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </section>
      <footer className="bg-white py-12 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <a className="isomorphic-link flex items-center justify-center gap-1">
            <Logo />
            <div className="text-2xl text-[#000000] font-bold">InfyGPT</div>
            <p className="sr-only">SiteGPT</p>
          </a>
          <nav
            className=" sm:columns-2 -mb-6 mt-8 flex flex-wrap sm:flex-nowrap gap-3 sm:gap-0 justify-center sm:space-x-8"
            aria-label="Footer"
          >
            <div className="pb-6">
              <span className="cursor-pointer text-sm font-medium leading-6 text-gray-600 transition-all duration-150 hover:text-[#20B2AA hover:underline">
                Pricing
              </span>
            </div>
            <div className="pb-6">
              <span className="cursor-pointer text-sm font-medium leading-6 text-gray-600 transition-all duration-150 hover:text-[#20B2AA hover:underline">
                API Docs
              </span>
            </div>
            <div className="pb-6">
              <span className="cursor-pointer text-sm font-medium leading-6 text-gray-600 transition-all duration-150 hover:text-[#20B2AA hover:underline">
                Contact us
              </span>
            </div>
            <div className="pb-6">
              <span className="cursor-pointer text-sm font-medium leading-6 text-gray-600 transition-all duration-150 hover:text-[#20B2AA hover:underline">
                Terms &amp; Conditions
              </span>
            </div>
          </nav>
          <div className="flex justify-center mt-8">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/infynno"
              className="isomorphic-link isomorphic-link--external inline-flex items-center justify-center gap-1.5 bg-white text-sm font-medium text-gray-500 transition-all duration-150 rounded-xl border border-gray-200 px-3 py-2 hover:bg-blue-50 hover:text-[#20B2AA] hover:border-[#20B2AA]"
            >
              <svg
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
              </svg>
              <span className="text-sm font-medium">Follow us on Twitter</span>
            </a>
          </div>
          <p className="text-sm leading-5 text-gray-500 mt-8 text-center">
            tailwindtap@gmail.com
          </p>
        </div>
      </footer>
    </div>
  );
};
export default templateReact;
const Logo = () => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className="cursor-pointer"
    >
      <mask
        id="mask0_566_52282"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="28"
        height="28"
      >
        <rect
          width="28"
          height="28"
          rx="10"
          transform="matrix(-1 0 0 1 28 0)"
          fill="#D9D9D9"
        />
      </mask>
      <g mask="url(#mask0_566_52282)"></g>
      <mask
        id="mask1_566_52282"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="28"
        height="28"
      >
        <rect
          width="28"
          height="28"
          rx="10"
          transform="matrix(-1 0 0 1 28 0)"
          fill="#D9D9D9"
        />
      </mask>
      <g mask="url(#mask1_566_52282)">
        <rect
          width="32.3855"
          height="31.7108"
          rx="10"
          transform="matrix(-1 0 0 1 30.0244 -2.02411)"
          fill="url(#pattern0)"
        />
        <rect
          width="32.3855"
          height="31.7108"
          rx="10"
          transform="matrix(-1 0 0 1 30.0244 -2.02411)"
          fill="url(#paint0_linear_566_52282)"
          fillOpacity="0.8"
        />
      </g>
      <mask
        id="mask2_566_52282"
        maskUnits="userSpaceOnUse"
        x="4"
        y="4"
        width="28"
        height="28"
      >
        <rect
          width="28"
          height="28"
          rx="10"
          transform="matrix(-1 0 0 1 32 4)"
          fill="#D9D9D9"
        />
      </mask>
      <g mask="url(#mask2_566_52282)">
        <rect
          width="32.3855"
          height="31.7108"
          rx="10"
          transform="matrix(-1 0 0 1 34.0244 1.97589)"
          fill="url(#pattern1)"
        />
        <rect
          width="32.3855"
          height="31.7108"
          rx="10"
          transform="matrix(-1 0 0 1 34.0244 1.97589)"
          fill="url(#paint1_linear_566_52282)"
          fillOpacity="0.6"
        />
      </g>
      <path
        d="M27.3149 15.132C26.9362 15.132 26.63 15.4401 26.63 15.8209V21.2811C26.63 21.8078 26.348 22.2578 25.8766 22.4847C25.4052 22.7117 24.8774 22.655 24.4705 22.3225L19.0958 17.9987L24.2368 13.6867C24.4182 13.5611 24.539 13.3545 24.539 13.1153C24.539 12.7344 24.2327 12.4264 23.8541 12.4264C23.713 12.4264 23.5801 12.4709 23.4713 12.5439C23.4552 12.552 23.4431 12.5642 23.4269 12.5764L17.9999 17.1151L12.3835 12.6008C11.5657 11.9402 10.4738 11.8146 9.53109 12.2725C8.58431 12.7264 8 13.6665 8 14.7201V21.2809C8 22.3346 8.58416 23.2707 9.53109 23.7286C10.4739 24.1824 11.5696 24.0569 12.3835 23.4002L17.9999 18.8818L23.6122 23.4002C24.1038 23.7974 24.696 24 25.2964 24C25.6912 24 26.094 23.9108 26.4689 23.7286C27.4157 23.2707 27.9998 22.3346 27.9998 21.2809V15.8209C27.9998 15.4401 27.6936 15.132 27.3149 15.132ZM11.5293 22.3225C11.1184 22.6548 10.5945 22.7117 10.1233 22.4847C9.65185 22.2578 9.36985 21.808 9.36985 21.2811V14.7203C9.36985 14.1935 9.65185 13.7396 10.1233 13.5127C10.3127 13.4235 10.51 13.379 10.7035 13.379C10.9976 13.379 11.2837 13.4763 11.5295 13.6748L16.904 17.9987L11.5293 22.3225ZM28 12.689C28 13.0694 27.6933 13.3779 27.3151 13.3779C26.9369 13.3779 26.6301 13.0694 26.6301 12.689C26.6301 12.3086 26.9369 12.0001 27.3151 12.0001C27.6934 12.0001 28 12.3084 28 12.689Z"
        fill="white"
      />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_566_52282"
            transform="matrix(0.00492505 0 0 0.00505465 -4.83333 -7.94331)"
          />
        </pattern>
        <pattern
          id="pattern1"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_566_52282"
            transform="matrix(0.00492505 0 0 0.00505465 -4.83333 -7.94331)"
          />
        </pattern>
        <linearGradient
          id="paint0_linear_566_52282"
          x1="28.5242"
          y1="16.0241"
          x2="2.02417"
          y2="21.5241"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A5CCE2" />
          <stop offset="1" stopColor="#A5CCE2" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_566_52282"
          x1="6.02417"
          y1="6.02411"
          x2="29.0242"
          y2="27.0241"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9517AF" />
          <stop offset="1" stopColor="#3206D3" />
        </linearGradient>
        <image
          id="image0_566_52282"
          width="1666"
          height="2500"
        />
      </defs>
    </svg>
  );
};