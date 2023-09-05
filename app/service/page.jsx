"use client";
import { Fragment, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";

const products = [
  {
    name: "Analytics",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    description: "Your customers’ data will be safe and secure",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools",
    href: "#",
    icon: SquaresPlusIcon,
  },
  {
    name: "Automations",
    description: "Build strategic funnels that will convert",
    href: "#",
    icon: ArrowPathIcon,
  },
];
const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="lg:h-screen lg:w-screen bg-cover bg-no-repeat bg-bottom		bg-[url('/cbimage.png')]">
      {/* bg-[url('/cbimage.png')] */}
      <header>
        <nav
          className="mx-auto flex max-w-full items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex w-20 ">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              {/* <img className="h-20 w-auto" src="/logo.png" alt="" /> */}
              <Image src="/logo.png" alt="PSP GLASS" width={100} height={100} />
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
          <div className="flex rounded-full ring-2  lg:flex-1 lg:gap-x-12 p-4 bg-gradient-to-r from-blue-800 to-blue-950 ">
            <div className="flex w-full items-center justify-start lg:w-auto lg:flex-grow">
              <a
                href="#"
                className="w-full items-center justify-center rounded px-3 py-2 text-white  hover:text-white  lg:w-auto"
              >
                <span className="">SUDIP</span>
                <br></br>
                <span className="">MAZUMDER</span>
              </a>
            </div>
            <Popover.Group className="hidden  w-full flex-row items-center  lg:w-auto lg:flex-grow justify-center  lg:flex lg:gap-x-12">
              <Popover className="relative">
                <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-white">
                  ChatGPT 4.0
                  <ChevronDownIcon
                    className="h-5 w-5 flex-none text-white"
                    aria-hidden="true"
                  />
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                    <div className="p-4">
                      {products.map((item) => (
                        <div
                          key={item.name}
                          className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                        >
                          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                            <item.icon
                              className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="flex-auto">
                            <a
                              href={item.href}
                              className="block font-semibold text-gray-900"
                            >
                              {item.name}
                              <span className="absolute inset-0" />
                            </a>
                            <p className="mt-1 text-gray-600">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                      {callsToAction.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                        >
                          <item.icon
                            className="h-5 w-5 flex-none text-gray-400"
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>
              <Popover className="relative">
                <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-white">
                  Marketing
                  <ChevronDownIcon
                    className="h-5 w-5 flex-none text-white"
                    aria-hidden="true"
                  />
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                    <div className="p-4">
                      {products.map((item) => (
                        <div
                          key={item.name}
                          className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                        >
                          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                            <item.icon
                              className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="flex-auto">
                            <a
                              href={item.href}
                              className="block font-semibold text-gray-900"
                            >
                              {item.name}
                              <span className="absolute inset-0" />
                            </a>
                            <p className="mt-1 text-gray-600">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                      {callsToAction.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                        >
                          <item.icon
                            className="h-5 w-5 flex-none text-gray-400"
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>

              <a
                href="#"
                className="text-sm font-semibold leading-6 text-white"
              >
                Features
              </a>
            </Popover.Group>

            <div className="flex w-full items-center justify-end lg:w-auto lg:flex-grow">
              <a
                href="#"
                className="w-full items-center justify-center rounded px-3 py-2 text-white  hover:text-white lg:inline-flex lg:w-auto"
              >
                <span>ALFIE</span>
              </a>
            </div>
          </div>

          {/* <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div> */}
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                {/* <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                /> */}
                <Image src="/logo.png" alt="PSP GLASS" width={70} height={70} />
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
                  <Disclosure as="div" className="-mx-3">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                          Product
                          <ChevronDownIcon
                            className={classNames(
                              open ? "rotate-180" : "",
                              "h-5 w-5 flex-none"
                            )}
                            aria-hidden="true"
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-2 space-y-2">
                          {[...products, ...callsToAction].map((item) => (
                            <Disclosure.Button
                              key={item.name}
                              as="a"
                              href={item.href}
                              className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                              {item.name}
                            </Disclosure.Button>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Features
                  </a>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Marketplace
                  </a>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Company
                  </a>
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
      <div className="mx-10">
        <div className="flex justify-between flex-wrap items-center mb-6 mr-20">
          <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4"></h4>
          <div className="flex sm:space-x-4 space-x-2 sm:justify-end items-center rtl:space-x-reverse">
            <select className="select rounded-full select-bordered  bg-transparent ring-0 ring-gray-400 w-full max-w-xs">
              <option disabled selected>
                SAS
              </option>
              <option>SAS</option>
              <option>Lost</option>
            </select>

            <select className="select rounded-full select-bordered  bg-transparent ring-0 ring-gray-400 w-full max-w-xs">
              <option disabled selected>
                MEXICO
              </option>
              <option>MEXICO</option>
              <option>MEXICO</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between flex-wrap items-center mb-6 ml-10 gap-3">
          <h4 className="font-medium  text-lg capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
            Query Here:{" "}
          </h4>
          <span className="flex-1 text-xl">
            What is the total market growth for Specialty Alcoholic Spirits
            (SAS) in Mexico for the last 5 years, and what is the projection for
            the next 3 years?"
          </span>
          <div className="flex flex-col space-y-1 sm:justify-end items-center ">
            <button className="btn  bg-slate-400 px-8 py-0 text-blue-700 rounded-full normal-case hover:bg-gray-500">
              Query
            </button>
            <button className="btn bg-slate-400 px-5 py-0 rounded-full normal-case hover:bg-gray-500">
              Save Chat
            </button>
          </div>
        </div>

        <div className="tabs gap-2">
          <a className="tab rounded-full  bg-white text-black ">All</a>
          <a className="tab tab-active rounded-full  text-black bg-white">
            Market Research
          </a>
          <a className="tab rounded-full bg-white  text-black">
            Competitor Information
          </a>
          <a className="tab rounded-full  bg-white  text-black">New Trend </a>
          <a className="tab rounded-full  bg-white  text-black">
            Import Export
          </a>
        </div>
        <div className="flex flex-row gap-6 mt-5">
          <div className="card w-96 bg-base-100 shadow-xl ring-8 ring-yellow-300 ">
            <div className="card-body  bg-blue-900 flex-col w-full rounded-xl">
              <div className="divider  w-full  right-0  top-0 left-0 bottom-0 m-0 p-0"></div>
              <h2 className="card-title"></h2>
              <p>
                What is total Market Growth For [Category] in [Region] for last
                5 years and projection for next 3 years?
              </p>
              <div className="card-actions justify-start">
                <div className="flex text-center">
                  <UserIcon className="h-5 w-5 mt-0" aria-hidden="true" />
                  <span className="text-base">PGP Glass</span>
                </div>
              </div>
            </div>
          </div>
          <div className="card w-96 bg-base-100 shadow-xl ring-1 ring-blue-100">
            <div className="card-body bg-blue-900 flex-col w-full rounded-xl">
              <div className="divider  w-full  right-0  top-0 left-0 bottom-0 m-0 p-0"></div>
              <h2 className="card-title"></h2>
              <p>
                {" "}
                What is total Market Growth For [Category] in [Region] for last
                5 years and projection for next 3 years?
              </p>
              <div className="card-actions justify-start">
                <div className="flex text-center">
                  <UserIcon className="h-5 w-5 mt-0" aria-hidden="true" />
                  <span className="text-base">PGP Glass</span>
                </div>
              </div>
            </div>
          </div>
          <div className="card w-96 bg-base-100 shadow-xl ring-1 ring-blue-100">
            <div className="card-body bg-blue-900 flex-col w-full rounded-xl">
              <div className="divider  w-full  right-0  top-0 left-0 bottom-0 m-0 p-0"></div>
              <h2 className="card-title"></h2>
              <p>
                {" "}
                What is total Market Growth For [Category] in [Region] for last
                5 years and projection for next 3 years?{" "}
              </p>
              <div className="card-actions justify-start">
                <div className="flex text-center">
                  <UserIcon className="h-5 w-5 mt-0" aria-hidden="true" />
                  <span className="text-base">PGP Glass</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
