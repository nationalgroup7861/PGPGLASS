"use client";

import HomeBredCurbs from "@/components/partials/HomeBredCurbs";
import SelectMonth from "@/components/partials/SelectMonth";
import Calculation from "@/components/partials/widget/chart/Calculation";
import GroupChart3 from "@/components/partials/widget/chart/group-chart-3";
import Card from "@/components/ui/Card";
import { ApiContext } from "@/context/ApiContext";
import { INFO_API } from "@/util/constant";
import { useContext, useEffect, useState } from "react";
const campaigns = [
  {
    name: "Channel",
    value: "roi",
  },
  {
    name: "Email",
    value: "40%",
  },
  {
    name: "Website",
    value: "28%",
  },
  {
    name: "Facebook",
    value: "34%",
  },
  {
    name: "Offline",
    value: "17%",
  },
];
const CrmPage = () => {
  const { getApiData, postApiData } = useContext(ApiContext);
  const [generalInfo, setGeneralInfo] = useState({});

  async function GetInfoList() {
    try {
      const response = await getApiData(INFO_API.info);
      if (response) {
        console.log(response.data.result.count);
        setGeneralInfo(response.data.result.count);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    GetInfoList();
  }, []);

  return (
    <div>
      <HomeBredCurbs title="PGP DASH BOARD" />
      <div className="space-y-5">
        <div className="grid grid-cols-12 gap-5">
          <div className="lg:col-span-8 col-span-12 space-y-5">
            <Card>
              <div className="grid xl:grid-cols-4 lg:grid-cols-2 col-span-1 gap-3">
                {/* <GroupChart3 generalInfo={generalInfo} /> */}

                <div
                  className={`bg-primary-500 rounded-md p-4 bg-opacity-[0.15] dark:bg-opacity-25 relative z-[1]`}
                >
                  <div className="overlay absolute left-0 top-0 w-full h-full z-[-1]">
                    <img
                      src={"/assets/images/all-img/shade-1.png"}
                      alt=""
                      draggable="false"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="block mb-6 text-sm text-slate-900 dark:text-white font-medium">
                    USER
                  </span>
                  <span className="block mb- text-2xl text-slate-900 dark:text-white font-medium mb-6">
                    {generalInfo?.total_clients}
                  </span>
                </div>

                <div
                  className={`bg-info-500 rounded-md p-4 bg-opacity-[0.15] dark:bg-opacity-25 relative z-[1]`}
                >
                  <div className="overlay absolute left-0 top-0 w-full h-full z-[-1]">
                    <img
                      src={"/assets/images/all-img/shade-2.png"}
                      alt=""
                      draggable="false"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="block mb-6 text-sm text-slate-900 dark:text-white font-medium">
                    MESSAGE RATE
                  </span>
                  <span className="block mb- text-2xl text-slate-900 dark:text-white font-medium mb-6">
                    {generalInfo?.total_messages}
                  </span>
                </div>

                <div
                  className={`bg-warning-500  rounded-md p-4 bg-opacity-[0.15] dark:bg-opacity-25 relative z-[1]`}
                >
                  <div className="overlay absolute left-0 top-0 w-full h-full z-[-1]">
                    <img
                      src={"/assets/images/all-img/shade-3.png"}
                      alt=""
                      draggable="false"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="block mb-6 text-sm text-slate-900 dark:text-white font-medium">
                    INACTIVE
                  </span>
                  <span className="block mb- text-2xl text-slate-900 dark:text-white font-medium mb-6">
                    {generalInfo?.inactive_clients}
                  </span>
                </div>

                <div
                  className={`bg-success-500 rounded-md p-4 bg-opacity-[0.15] dark:bg-opacity-25 relative z-[1]`}
                >
                  <div className="overlay absolute left-0 top-0 w-full h-full z-[-1]">
                    <img
                      src={"/assets/images/all-img/shade-4.png"}
                      alt=""
                      draggable="false"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="block mb-6 text-sm text-slate-900 dark:text-white font-medium">
                    ACTIVE
                  </span>
                  <span className="block mb- text-2xl text-slate-900 dark:text-white font-medium mb-6">
                    {generalInfo?.active_clients}
                  </span>
                </div>
              </div>
            </Card>
            <Card>
              <header className="md:flex md:space-y-0 space-y-4">
                <h6 className="flex-1 text-slate-900 dark:text-white capitalize">
                  Deal distribution by stage
                </h6>
                <div className="flex-none">{/* <SelectMonth /> */}</div>
              </header>
              <div className="legend-ring">{/* <StackBarChart /> */}</div>
            </Card>
          </div>
          <div className="lg:col-span-4 col-span-12 space-y-5">
            <div className="lg:col-span-4 col-span-12 space-y-5">
              <Card title="Campaigns" headerslot={<SelectMonth />}>
                <ul className="divide-y divide-slate-100 dark:divide-slate-700">
                  {campaigns.map((item, i) => (
                    <li
                      key={i}
                      className="first:text-xs text-sm first:text-slate-600 text-slate-600 dark:text-slate-300 py-2 first:uppercase"
                    >
                      <div className="flex justify-between">
                        <span>{item.name}</span>
                        <span>{item.value}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
              <Card title="trends calcultation" headerslot={<SelectMonth />}>
                <div className="legend-ring3">
                  <Calculation />
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* <ExampleTwo title="Latest User" /> */}
      </div>
    </div>
  );
};

export default CrmPage;
