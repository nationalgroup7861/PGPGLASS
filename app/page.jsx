"use client";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import {
  Bars3Icon,
  LockClosedIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    // <div className="h-screen w-screen bg-gradient-to-b
    // from-blue-900 to-blue-100">
    <div className="lg:h-screen lg:w-screen bg-cover bg-no-repeat bg-bottom">
      	 {/* bg-[url('/cbimage.png')] */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="text-white">ALFIE</span>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {/* {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                {item.name}
              </a>
            ))} */}

            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              {/* <img className="h-28 w-auto" src="/logo.png" alt="" /> */}
              {/* <Image src="/logo.png" alt="PSP GLASS" width={100} height={100} /> */}
            </a>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <div className="drawer drawer-end justify-end">
              <input
                id="my-drawer-4"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-content flex ">
                <div className="flex gap-3">
                  <span className="text-white mt-1">MENU</span>
                  <label htmlFor="my-drawer-4" className="text-black">
                    <Bars3Icon className="h-8 w-8" aria-hidden="true" />
                  </label>
                </div>
              </div>
              <div className="drawer-side">
                <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                  <li>
                    <a>Sidebar Item 1</a>
                  </li>
                  <li>
                    <a>Sidebar Item 2</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                {/* <img className="h-16 w-auto" src="/logo.png" alt="" /> */}
                {/* <Image src="/logo.png" alt="PSP GLASS" width={70} height={70} /> */}
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg  px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="flex min-h-full flex-1 flex-col justify-center mt-5 px-6 py-12 lg:px-8">
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border rounded-md p-3">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <div className="mt-2">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <UserCircleIcon className="h-7 w-7" aria-hidden="true" />
                    </div>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="Username"
                      required
                      className="block rounded-full border-0 pl-12 py-1.5 text-gray-900 shadow-sm ring-1 input-bordered input-lg w-full  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="mt-2">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <LockClosedIcon className="h-7 w-7" aria-hidden="true" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="Password"
                      required
                      className="block rounded-full border-0 pl-12 py-1.5 text-gray-900 shadow-sm ring-1 input-bordered input-lg w-full  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-full bg-orange-600 px-3 py-5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Login
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-lg text-gray-500">
              <a
                href="#"
                className="font-semibold leading-6 text-black hover:text-black"
              >
                Need Help ?
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
