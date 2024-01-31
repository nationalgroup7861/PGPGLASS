"use client";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import { ApiContext } from "@/context/ApiContext";
import { INFO_API } from "@/util/constant";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

const UserDetail = ({ params }) => {
  const { getApiData, postApiData, deleteApiData } = useContext(ApiContext);
  const [userinfo, setUserinfo] = useState({});
  const [userSeesion, setUserSession] = useState([]);
  const [userMessage, setUserMessage] = useState([]);
  const [userSessionCount, setUserSessionCount] = useState('');
  const [totalMessage, setTotalMessage] = useState('');



  useEffect(() => {
    if (params?.id) {
      GetUserDetail(params?.id);
    }
  }, [params.id]);

  async function GetUserDetail(id) {
    try {
      const params = { id: id };
      const response = await getApiData(INFO_API.userdetail ,params);
      const data=response.data.result;
      setUserinfo(data?.client_info)
      setUserSession(data?.client_sessions)
      setUserMessage(data?.last_messages)
      setUserSessionCount(data?.total_sessions)
      setTotalMessage(data?.total_messages)
    } catch (error) {
      console.log(error);
    }
  }

  const columns = [
    {
      label: "Title",
      field: "title",
    },
    {
      label: "Session Key",
      field: "session_key",
    },
  
    {
      label: "Type",
      field: "type",
    },
  ];

  const columnsofMessage = [
   
    {
      label: "Session Key",
      field: "session_key",
    },
    {
      label: "Type",
      field: "role",
    },
    {
      label: "Question & Answer",
      field: "content",
    },
  ];

  

  return (
    <div>
      <div className="space-y-5 profile-page">
        <div className="profiel-wrap px-[35px] pb-10 md:pt-[84px] pt-10 rounded-lg bg-white dark:bg-slate-800 lg:flex lg:space-y-0 space-y-6 justify-between items-end relative z-[1]">
          <div className="bg-slate-900 dark:bg-slate-700 absolute left-0 top-0 md:h-1/2 h-[150px] w-full z-[-1] rounded-t-lg"></div>
          <div className="profile-box flex-none md:text-start text-center">
            <div className="md:flex items-end md:space-x-6 rtl:space-x-reverse">
              <div className="flex-none">
                <div className="md:h-[186px] md:w-[186px] h-[140px] w-[140px] md:ml-0 md:mr-0 ml-auto mr-auto md:mb-0 mb-4 rounded-full ring-4 ring-slate-100 relative">
                  <img
                    src="/nlogo.png"
                    alt=""
                    className="w-full h-full object-cover rounded-full"
                  />
                  <Link
                    href="#"
                    className="absolute right-2 h-8 w-8 bg-slate-50 text-slate-600 rounded-full shadow-sm flex flex-col items-center justify-center md:top-[140px] top-[100px]"
                  >
                    {/* <Icon icon="heroicons:pencil-square" /> */}
                  </Link>
                </div>
              </div>
              <div className="flex-1">
                <div className="text-2xl font-medium text-slate-900 dark:text-slate-200 mb-[3px]">
                  {/* Albert Flores */}
                  {userinfo?.name}
                </div>
                {/* <div className="text-sm font-light text-slate-600 dark:text-slate-400">
                  Front End Developer
                </div> */}
              </div>
            </div>
          </div>

          <div className="profile-info-500 md:flex md:text-start text-center flex-1 max-w-[516px] md:space-y-0 space-y-4">
            <div className="flex-1">
              <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">
                  {userSessionCount}
               </div>
              <div className="text-sm text-slate-600 font-light dark:text-slate-300">
                Total Session
              </div>
            </div>

            <div className="flex-1">
              <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">
              {totalMessage}
              </div>
              <div className="text-sm text-slate-600 font-light dark:text-slate-300">
              Total Message
              </div>
            </div>

            {/* <div className="flex-1">
              <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">
                3200
              </div>
              <div className="text-sm text-slate-600 font-light dark:text-slate-300">
                Calender Events
              </div>
            </div> */}
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="lg:col-span-4 col-span-12">
            <Card title="Info">
              <ul className="list space-y-8">
                <li className="flex space-x-3 rtl:space-x-reverse">
                  <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                    <Icon icon="heroicons:envelope" />
                  </div>
                  <div className="flex-1">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      EMAIL
                    </div>
                    <a
                      href="mailto:someone@example.com"
                      className="text-base text-slate-600 dark:text-slate-50"
                    >
                      {userinfo?.email}
                    </a>
                  </div>
                </li>

                <li className="flex space-x-3 rtl:space-x-reverse">
                  <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                    <Icon icon="heroicons:phone-arrow-up-right" />
                  </div>
                  <div className="flex-1">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      PHONE
                    </div>
                    <a
                      href={`tel:${userinfo?.phone}`}
                      className="text-base text-slate-600 dark:text-slate-50"
                    >
                      {userinfo?.phone}
                    </a>
                  </div>
                </li>

                <li className="flex space-x-3 rtl:space-x-reverse">
                  <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                    <Icon icon="heroicons:map" />
                  </div>
                  <div className="flex-1">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      LOCATION
                    </div>
                    <div className="text-base text-slate-600 dark:text-slate-50">
                      {userinfo?.address}
                    </div>
                  </div>
                </li>
              </ul>
            </Card>
          </div>
          <div className="lg:col-span-8 col-span-12"></div>
        </div>

        <div className="grid grid-cols-1 gap-1">

        <Card title="Last 10 Session" noborder>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
                <thead className=" border-t border-slate-100 dark:border-slate-800">
                  <tr>
                    {columns.map((column, i) => (
                      <th key={i} scope="col" className=" table-th ">
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                  {userSeesion.map((row, i) => (
                    <tr key={i}>
                      <td className="table-td">{row?.title}</td>
                      <td className="table-td">{row?.session_key}</td>
                      <td className="table-td ">{row?.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>

      <Card title="Last 10 Message" noborder>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
                <thead className=" border-t border-slate-100 dark:border-slate-800">
                  <tr>
                    {columnsofMessage.map((column, i) => (
                      <th key={i} scope="col" className=" table-th ">
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                  {userMessage.map((row, i) => (
                    <tr key={i}>
                      <td className="table-td">{row?.session_key}</td>
                      <td className="table-td">{row?.role}</td>
                      <td className="table-td ">{row?.content}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>

      </div>

      </div>
    </div>
  );
};

export default UserDetail;
