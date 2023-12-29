import Image from "next/image";
// bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-sky-400 to-blue-800
// bg-gradient-to-r from-fuchsia-500 to-cyan-500
export default function Login() {
  return (
    <main className="flex w-desktop min-h-screen flex-col items-center justify-between p-9 bg-gradient-to-r from-cyan-500 to-blue-500  ">
      <div className="flex min-h-full flex-col justify-center px-2 py-2 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm pb-1">
          <Image
            className="mx-auto h-28 w-auto"
            src="/pgplogo.svg"
            alt="PGP"
            width="200"
            height="100"
          />
        </div>
        <Image
        src="/aich.svg"
        alt=""
        className="absolute -z-1 hidden lg:block lg:left-[10%] h-[45vh] 3xl:left-[5%] 3xl:h-[70vh]"
        width={600}
        height={200}
        style={{
          bottom: "30%",
          transform: "translateX(0px) translateY(60%) translateZ(0px)",
          opacity: 0.3,
        }}
      />

      <Image
        src="/5162744.svg"
        alt=""
        className="absolute -z-1 hidden lg:block lg:right-[10%] h-[40vh] 3xl:right-[5%] 3xl:h-[50vh]"
        width={600}
        height={200}
        style={{
          bottom: "70%",
          transform: "translateX(0px) translateY(60%) translateZ(0px)",
          opacity: 0.2,
        }}
      />

        <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
          <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">
            Login To Your Account
          </div>

          <div className="mt-10">
            <form action="#">
              <div className="flex flex-col mb-6">
                <label
                  htmlFor="email"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >
                  E-Mail Address:
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="E-Mail Address"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-6">
                <label
                  htmlFor="password"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >
                  Password:
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <span>
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>
                  </div>

                  <input
                    id="password"
                    type="password"
                    name="password"
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div className="flex items-center mb-6 -mt-4">
                <div className="flex ml-auto">
                  <a
                    href="#"
                    className="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700"
                  >
                    Forgot Your Password?
                  </a>
                </div>
              </div>

              <div className="flex w-full">
                <button
                  type="submit"
                  className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-[#ea580c] hover:bg-[#b14208] rounded py-2 w-full transition duration-150 ease-in"
                >
                  <span className="mr-2 uppercase">Login</span>
                  <span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          </div>
          <div className="flex justify-center items-center mt-6">
            <a
              href="#"
              target="_blank"
              className="inline-flex items-center font-bold text-[#ea580c] hover:text-[#ea580c] text-xs text-center"
            >
              <span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </span>
              <span className="ml-2">Need Help?</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
