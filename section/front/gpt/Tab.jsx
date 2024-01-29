import Button from "@/components/ui/Button";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tab({ tabs, isCollapsed,toggleCollapse,selectedTab,selectedCard,filteredCardData,handleTabSelect,handleCardClick }) {
  return (
    <>
          <div className="mt-6 px-4 sm:px-6 lg:px-8">
              <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                  Select a tab
                </label>
                {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                <select
                  id="tabs"
                  name="tabs"
                  className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  defaultValue={tabs.find((tab) => tab.current).name}
                >
                  {tabs.map((tab) => (
                    <option key={tab.name}>{tab.name}</option>
                  ))}
                </select>
              </div>
              <div className="hidden sm:block">
                <nav className="flex space-x-4" aria-label="Tabs">
                  {tabs.map((tab) => (
                    <a
                      key={tab.name}
                      // href={tab.href}
                      onClick={() => handleTabSelect(tab.name)}
                    //   setSelectedTab(tab.name)
                      className={classNames(
                        tab.name == selectedTab
                          ? "bg-[#ff6600] text-white"
                          : "bg-white text-gray-500 hover:text-gray-700",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                      aria-current={tab.current ? "page" : undefined}
                    >
                      {tab.name}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
            <div className="mt-6 px-4 sm:px-6 lg:px-8">
              <div
                className="flex justify-end items-center cursor-pointer"
                onClick={toggleCollapse}
              >
                <Button
                  type="button"
                  className="order-0 inline-flex items-center rounded-md bg-[#ff6600] px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#d95c00] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d95c00] sm:order-1 sm:ml-3"
                  text={isCollapsed ? "Expand" : "Collapse"}
                ></Button>
              </div>

              <div
                className={`mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 ${
                  isCollapsed ? "hidden" : ""
                }`}
              >
                {filteredCardData.map((card, index) => (
                  <div
                    key={index}
                    className={`flex flex-col overflow-hidden rounded-lg bg-base-100 shadow-xl ${
                      selectedCard === index
                        ? "border-[#ff6600] border-4"
                        : "border-gray-400  border-4"
                    }`}
                  >
                    <div
                      className="p-5 bg-gray-50 flex-1"
                      onClick={() => handleCardClick(index)}
                    >
                      <div className="flex items-center">
                        <div className="ml-5 w-0 flex-1">
                          <div className="text-sm font-medium text-gray-900">
                            {card.statement}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center bg-gray-300 px-5 py-3 gap-2">
                      <div className="flex-shrink-0">
                        <card.icon
                          className="h-6 w-6 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-1 text-sm">
                        <a
                          href={""}
                          className="font-medium text-cyan-700 hover:text-cyan-900"
                        >
                          PGP GLASS
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
    </>
  );
}
