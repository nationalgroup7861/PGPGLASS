import { handleLogout } from "@/components/partials/auth/store";
import { navigation } from "@/constant/data";
import { Menu, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { useDispatch } from "react-redux";



function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SideBar({userInfo,chatSessionList,currentChatSession,handleCurrentChat}) {
  const location = usePathname();
  const locationName = location.replace("/", "");
  const dispatch = useDispatch();

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-[#ff6600] lg:bg-transparent lg:pb-4 lg:pt-5">
      <div className="flex flex-shrink-0 items-center justify-center px-6">
        <img className="h-20 w-auto" src="/nlogo.png" alt="PGP GPT" />
      </div>
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="mt-5 flex h-0 flex-1 flex-col overflow-y-auto pt-1 hidescrollbar">
        {/* User account dropdown */}
        <Menu as="div" className="relative inline-block px-3 text-left">
          <div>
            <Menu.Button className="group w-full rounded-md bg-gray-100 px-3.5 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff6600] focus:ring-offset-2 focus:ring-offset-gray-100">
              <span className="flex w-full items-center justify-between">
                <span className="flex min-w-0 items-center justify-between space-x-3">
                  <img
                    className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
                    src="/nlogo.png"
                    alt=""
                  />
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-sm font-medium text-gray-900">
                      {userInfo?.name}
                    </span>
                    <span className="truncate text-sm text-gray-500">
                      {userInfo?.email}
                    </span>
                  </span>
                </span>
                <ChevronUpDownIcon
                  className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              </span>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute left-0 right-0 z-10 mx-3 mt-1 origin-top divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href="/profile"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      View profile
                    </Link>
                  )}
                </Menu.Item>
              </div>

              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      onClick={() => dispatch(handleLogout({ type: "user" }))}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Logout
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        {/* Sidebar Search */}
        {/* <div className="mt-5 px-3">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
              aria-hidden="true"
            >
              <MagnifyingGlassIcon
                className="h-4 w-4 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              type="text"
              name="search"
              id="search"
              className="block w-full rounded-md border-0 py-1.5 pl-9 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Search"
            />
          </div>
        </div> */}
        {/* Navigation */}
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                className={classNames(
                  item.link == locationName
                    ? "bg-[#ff6600] text-white"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                  "group flex items-center rounded-md px-2 py-2 text-sm font-medium"
                )}
                href={item.link}
              >
                <img className="h-8 w-auto" src={item.icon} alt={item.name} />

                {item.name}
              </Link>
            ))}
          </div>
          <div className="mt-8">
            {/* Secondary navigation */}
            <h3
              className="px-3 text-sm font-medium text-gray-700"
              id="desktop-teams-headline"
            >
              Chat History
            </h3>
            <div
              className="mt-1 space-y-1"
              role="group"
              aria-labelledby="desktop-teams-headline"
            >
              {chatSessionList.map((chat, index) => (
                <a
                  key={index}
                  onClick={() =>handleCurrentChat(chat.session_key) }
                  className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700  hover:bg-gray-50 hover:text-gray-900"
                >
                  {currentChatSession == chat.session_key && (
                    <span
                      className={classNames(
                        "bg-green-500",
                        "mr-4 h-3 w-10 rounded-full"
                      )}
                      aria-hidden="true"
                    />
                  )}
                  <span className="truncate">{chat.title}</span>
                  
                </a>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
