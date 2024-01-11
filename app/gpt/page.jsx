"use client";
import { handleLogout } from "@/components/partials/auth/store";
import Button from "@/components/ui/Button";
import Icons from "@/components/ui/Icon";
import { ApiContext } from "@/context/ApiContext";
import { exportToExcel } from "@/extra/ChatReport";
import { CHATSESSION_API, MESSAGE_API } from "@/util/constant";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import {
  Bars3CenterLeftIcon,
  ChartPieIcon,
  FingerPrintIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import OpenAI from "openai";
import { Fragment, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const navigation = [
  {
    name: "Glass Bot",
    description: "Explore the power of ChatGPT-4.",
    link: "service",
    icon: ChartPieIcon,
    current: true,
  },

  {
    name: "GPT 3.5",
    description: "Explore the power of ChatGPT-4.",
    link: "gpt",
    icon: ChartPieIcon,
    current: false,
  },

  {
    name: "InternalGPT",
    description:
      "Unlock innovation with InternalGPT, your AI companion for internal tasks",
    link: "internalgpt",
    current: false,
    icon: FingerPrintIcon,
  },

  {
    name: "ALFIE",
    description:
      "Unlock innovation with InternalGPT, your AI companion for internal tasks",
    link: "alfie",
    current: false,
    icon: FingerPrintIcon,
  },
];

const tabs = [
  { name: "All", href: "#", current: false },
  { name: "Market Research", href: "#", current: true },
  { name: "Competitor Information", href: "#", current: false },
  { name: "New Trends", href: "#", current: false },
  { name: "Import Export", href: "#", current: false },
];

const cardData = [
  {
    statement:
      "What is total Market Growth For [Category] in [Region] for the last 5 years and projection for the next 3 years?",
    icon: UserIcon, // Replace with your actual icon component
    category: "Market Research",
  },
  {
    statement:
      "[Category] Producers of the same in the [Region] with their revenue,EBIDTA, PAT for last 5 years and projection for next 3 years",
    icon: UserIcon, // Replace with your actual icon component
    category: "Market Research",
  },
  {
    statement:
      "Are their any major regulatory restriction for importing [Category] bottles into [Region] from India or Srilanka?.",
    icon: UserIcon, // Replace with your actual icon component
    category: "Market Research",
  },

  {
    statement:
      "Can you provide a detailed comparison of market shares held by the top competitors in [Category] within [Region] over the past 5 years, along with a forecast for the next 3 years?",
    icon: UserIcon, // Replace with your actual icon component
    category: "Competitor Information",
  },
  {
    statement:
      "What are the recent trends in customer preferences and demand in the [Category] sector in [Region] for the last 5 years, and how are these expected to evolve in the next 3 years?",
    icon: UserIcon, // Replace with your actual icon component
    category: "Competitor Information",
  },
  {
    statement:
      "Could you analyse the key drivers and challenges that have affected the [Category] market in [Region] in the past 5 years, and predict their impact over the next 3 years?",
    icon: UserIcon, // Replace with your actual icon component
    category: "Competitor Information",
  },
  {
    statement:
      "Please provide an analysis of the entry and exit of major competitors in the [Category] market in [Region] over the last 5 years, and predict any potential market entries or exits in the next 3 years.",
    icon: UserIcon, // Replace with your actual icon component
    category: "Competitor Information",
  },
  {
    statement:
      "I need an overview of the technological advancements and innovations introduced by competitors in the [Category] field in [Region] during the last 5 years, with an outlook for the coming 3 years.",
    icon: UserIcon, // Replace with your actual icon component
    category: "Competitor Information",
  },

  {
    statement:
      "Can you provide an analysis of the latest technological innovations in the glass bottle manufacturing industry, including their impact on market growth in [Region] over the past 5 years and projected influence for the next 3 years?",
    icon: UserIcon, // Replace with your actual icon component
    category: "New Trends",
  },

  {
    statement:
      "What are the emerging sustainable practices in the glass bottle manufacturing industry, and how have these practices influenced market growth in [Region] for the last 5 years, with projections for the next 3 years?",
    icon: UserIcon, // Replace with your actual icon component
    category: "New Trends",
  },

  {
    statement:
      "How has consumer demand for different types of glass bottles (e.g., colored, shaped, recycled) evolved in [Region] over the past 5 years, and what are the growth projections for these categories in the next 3 years?",
    icon: UserIcon, // Replace with your actual icon component
    category: "New Trends",
  },
  {
    statement:
      "What role have regulatory changes played in shaping the market growth of the glass bottle manufacturing industry in [Region] over the last 5 years, and what is the expected impact in the coming 3 years?",
    icon: UserIcon, // Replace with your actual icon component
    category: "New Trends",
  },
  {
    statement:
      "Can you assess the competitive landscape changes in the glass bottle manufacturing industry in [Region] over the past 5 years, including new entrants and market exits, and forecast their impact on market growth for the next 3 years?",
    icon: UserIcon, // Replace with your actual icon component
    category: "New Trends",
  },

  {
    statement:
      "Could you provide a detailed analysis of the export trends and volumes for the glass bottle manufacturing industry in [Region] over the past 5 years, and offer projections for the next 3 years?",
    icon: UserIcon, // Replace with your actual icon component
    category: "Import Export",
  },
  {
    statement:
      "What are the key import sources for glass bottles in [Region], how have these sources changed over the last 5 years, and what are the expected trends for the next 3 years?",
    icon: UserIcon, // Replace with your actual icon component
    category: "Import Export",
  },
  {
    statement:
      "How have international trade policies impacted the import and export dynamics in the glass bottle manufacturing industry in [Region] over the past 5 years, and what are the potential impacts anticipated in the next 3 years?",
    icon: UserIcon, // Replace with your actual icon component
    category: "Import Export",
  },
  {
    statement:
      "Can you identify the major global competitors in the glass bottle manufacturing industry that have influenced the import and export market in [Region] over the last 5 years, and predict their role in the next 3 years?",
    icon: UserIcon, // Replace with your actual icon component
    category: "Import Export",
  },
  {
    statement:
      "What are the emerging technological innovations in the glass bottle manufacturing industry globally, and how have they affected the import and export market in [Region] over the past 5 years with a forecast for the next 3 years?",
    icon: UserIcon, // Replace with your actual icon component
    category: "Import Export",
  },
];

const selectToSAS = [
  { id: 1, name: "Beer Bottle" },
  { id: 2, name: "Cosmetic" },
  { id: 3, name: "Perfumery" },
  { id: 4, name: "Food Jars" },
  { id: 5, name: "Speciality liquor" },
  { id: 6, name: "Wine" },
  { id: 7, name: "Nail polish" },
  { id: 8, name: "Room freshener" },
  { id: 9, name: "Pharma bottle" },
];
const selectToCountry = [
  { id: 1, name: "Mexico" },
  { id: 2, name: "United States" },
  { id: 3, name: "UAE" },
  { id: 4, name: "Canada" },
  { id: 5, name: "Brazil" },
  { id: 6, name: "Europe" },
  { id: 7, name: "France" },
  { id: 8, name: "China" },
  { id: 9, name: "Vietnam" },
  { id: 10, name: "Spain" },
  { id: 11, name: "India" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();

  const location = usePathname();
  const locationName = location.replace("/", "");
  console.log(locationName);

  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed((prevIsCollapsed) => !prevIsCollapsed);
  };

  const [selectedTab, setSelectedTab] = useState("Competitor Information");

  // card  option selected
  const [selectedCard, setSelectedCard] = useState(0);
  const [selectedSasValue, setSelectedSasValue] = useState(selectToSAS[0].name);
  const [selectedCountryValue, setSelectedCOuntryValue] = useState(
    selectToCountry[0].name
  );

  const { getApiData, postApiData, deleteApiData } = useContext(ApiContext);

  const [isQuery, setIsQuery] = useState(false);
  const router = useRouter();
  const { isAuth } = useSelector((state) => state.auth);
  const [userInfo, setUserInfo] = useState({});

  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");

  const [chatHistory, setChatHistory] = useState([]); // To store chat history

  const [chatgptKey, setChatGptKey] = useState("");
  const [chatSessionList, setChatSessionList] = useState([]);
  const [currentChatSession, setCurrentChatSession] = useState("");

  const filteredCardData =
    selectedTab === "All"
      ? cardData
      : cardData.filter((card) => card.category === selectedTab);

  const handleSasValue = (event) => {
    setSelectedSasValue(event.target.value);
  };

  const handleCountryValue = (event) => {
    setSelectedCOuntryValue(event.target.value);
  };

  const handleCardClick = (index) => {
    setSelectedCard(index);
  };

  const handleChatSessionValue = (event) => {
    setCurrentChatSession(event.target.value);
  };

  useEffect(() => {
    let user_type;
    let user_data;
    if (typeof window !== "undefined") {
      user_type = window?.localStorage.getItem("user_type");
      user_data = JSON.parse(window?.localStorage.getItem("pgp_user"));
      setUserInfo(user_data);
    }
    setChatGptKey(user_data?.chat_gpt3_key);
    if (!isAuth || !user_type) {
      router.push("/");
    }
  }, [isAuth]);

  useEffect(() => {
    const computedValue = cardData[selectedCard].statement
      .replace("[Category]", selectedSasValue)
      .replace("[Region]", selectedCountryValue);
    setInputValue(computedValue);
  }, [selectedCard, selectedSasValue, selectedCountryValue]);

  useEffect(() => {
    if (userInfo?.id) {
      const currentsaveChatSeesion =
        JSON.parse(localStorage.getItem("currentChatSession")) || {};
      const chatSessionList =
        JSON.parse(localStorage.getItem("chatSessionList")) || [];
      const isEmptyObject = Object.keys(currentsaveChatSeesion).length === 0;

      if (!isEmptyObject) {
        const savedChats =
          JSON.parse(localStorage.getItem(currentsaveChatSeesion.key)) || [];
        // const reversedChats = savedChats.slice().reverse();
        setChatHistory(savedChats);
      } else {
        const newSessionKey = generateChatKey();
        const newSession = {
          title: "New Chat",
          key: newSessionKey,
        };

        const data = {
          title: "New Chat",
          session_key: newSessionKey,
          client_id: userInfo?.id,
        };

        const chatSessionList =
          JSON.parse(localStorage.getItem("chatSessionList")) || [];
        chatSessionList.unshift(newSession);
        localStorage.setItem(
          "chatSessionList",
          JSON.stringify(chatSessionList)
        );
        localStorage.setItem("currentChatSession", JSON.stringify(newSession));
        CreateChatsessionList(data);
      }

      chatSessionList && setChatSessionList(chatSessionList);
      currentsaveChatSeesion &&
        setCurrentChatSession(currentsaveChatSeesion.key);
    }
  }, [userInfo]);

  async function GetChatsessionList() {
    try {
      const params = {
        client_id: userInfo.id,
      };
      const response = await getApiData(
        CHATSESSION_API.list + userInfo.id,
        params
      );
      if (response) {
        // setClientList(response.data.result.clients)
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function CreateChatsessionList(data) {
    try {
      const response = await postApiData(CHATSESSION_API.create, data);
      if (response) {
        // setClientList(response.data.result.clients)
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function CreateMessage(data) {
    try {
      const response = await postApiData(MESSAGE_API.create, data);
      if (response) {
        // setClientList(response.data.result.clients)
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function DeleteChatsessionList(id = "") {
    try {
      const data = {
        client_id: userInfo.id,
      };
      const response = await deleteApiData(CHATSESSION_API.delete + id, data);
      if (response) {
        // setClientList(response.data.result.clients)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (userInfo?.id) {
      GetChatsessionList();
    }
  }, [userInfo]);

  async function GetOpenAi(query) {
    const openai = new OpenAI({
      apiKey: chatgptKey,
      dangerouslyAllowBrowser: true,
    });

    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: query }],
      model: "gpt-3.5-turbo",
    });
    return chatCompletion.choices[0].message["content"];

    
  }

  const generateChatKey = () => {
    const timestamp = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 100000);
    return `chat_${timestamp}_${randomNumber}`;
  };

  const saveChatLocally = (answer) => {
    const savedChats =
      JSON.parse(localStorage.getItem(currentChatSession)) || [];
    const chatSessionList =
      JSON.parse(localStorage.getItem("chatSessionList")) || [];
    const matchingChatSession = chatSessionList.find(
      (session) => session.key == currentChatSession
    );
    const newChat = {
      role: "user",
      content: inputValue,
    };
    const newAiResponse = {
      role: "ai",
      content: answer,
    };

    const servernewChat = {
      role: "user",
      session_key: currentChatSession,
      content: inputValue,
    };
    const servernewAiResponse = {
      role: "ai",
      session_key: currentChatSession,
      content: answer,
    };

    savedChats.unshift(newChat, newAiResponse); // Use unshift to add the new chat at the beginning
    localStorage.setItem(currentChatSession, JSON.stringify(savedChats));

    CreateMessage(servernewChat);
    CreateMessage(servernewAiResponse);
  };

  const handelQueryChange = async (name, row) => {
    setIsQuery(true);
    const answer = await GetOpenAi(row);

    if (chatHistory.length === 0) {
      const chatSessionList =
        JSON.parse(localStorage.getItem("chatSessionList")) || [];
      const matchingChatSession = chatSessionList.find(
        (session) => session.key === currentChatSession
      );
      matchingChatSession.title = row; // Assuming 'row' contains the question title
      localStorage.setItem("chatSessionList", JSON.stringify(chatSessionList));
    }

    setOutputValue(answer);
    saveChatLocally(answer);
    setChatHistory((prevChatHistory) => [
      { role: "user", content: inputValue },
      { role: "ai", content: answer },
      ...prevChatHistory,
    ]);

    setInputValue(""); // Clear the input after submitting
    setIsQuery(false);
  };

  useEffect(() => {
    if (currentChatSession) {
      const savedChats =
        JSON.parse(localStorage.getItem(currentChatSession)) || [];
      const chatSessionList =
        JSON.parse(localStorage.getItem("chatSessionList")) || [];
      const matchingChatSession = chatSessionList.find(
        (session) => session.key == currentChatSession
      );
      localStorage.setItem(
        "currentChatSession",
        JSON.stringify(matchingChatSession)
      );
      setChatHistory(savedChats);
      setChatSessionList(chatSessionList);
    }
  }, [currentChatSession]);

  const handleNewSessionClick = () => {
    const newSessionKey = generateChatKey();
    const newSession = {
      title: "New Chat",
      key: newSessionKey,
    };
    const data = {
      title: "New Chat",
      session_key: newSessionKey,
      client_id: userInfo?.id,
    };

    const chatSessionList =
      JSON.parse(localStorage.getItem("chatSessionList")) || [];
    chatSessionList.unshift(newSession);
    localStorage.setItem("chatSessionList", JSON.stringify(chatSessionList));
    setCurrentChatSession(newSessionKey);
    CreateChatsessionList(data);
  };

  const exportChatData = async () => {
    exportToExcel(chatHistory, userInfo);
  };

  return (
    <>
      <div
        className="min-h-full bg-cover bg-no-repeat  bg-bottom "
        style={{
          backgroundImage: `url(/pgp_bg.jpg)`,
        }}
      >
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pb-4 pt-5">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute right-0 top-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="relative ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex flex-shrink-0 items-center px-4">
                    <img
                      className="h-8 w-auto"
                      src="/pgplogo.svg"
                      alt="PGP GPT"
                    />
                  </div>
                  <div className="mt-5 h-0 flex-1 overflow-y-auto">
                    <nav className="px-2">
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
                            <item.icon
                              className={classNames(
                                item.link == locationName
                                  ? "text-gray-500"
                                  : "text-gray-400 group-hover:text-gray-500",
                                "mr-3 h-6 w-6 flex-shrink-0"
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </Link>
                        ))}
                      </div>
                      <div className="mt-8">
                        <h3
                          className="px-3 text-sm font-medium text-gray-700"
                          id="mobile-teams-headline"
                        >
                          Chat History
                        </h3>
                        <div
                          className="mt-1 space-y-1"
                          role="group"
                          aria-labelledby="mobile-teams-headline"
                        >
                          {chatSessionList?.map((chat, index) => (
                            <a
                              key={index}
                              onClick={() => setCurrentChatSession(chat.key)}
                              className="group flex items-center rounded-md px-3 py-2 text-base font-medium leading-5 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            >
                              {currentChatSession == chat.key && (
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
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-[#ff6600] lg:bg-transparent lg:pb-4 lg:pt-5">
          <div className="flex flex-shrink-0 items-center px-6">
            <img className="h-20 w-auto" src="/pgplogo.svg" alt="PGP GPT" />
          </div>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="mt-5 flex h-0 flex-1 flex-col overflow-y-auto pt-1">
            {/* User account dropdown */}
            <Menu as="div" className="relative inline-block px-3 text-left">
              <div>
                <Menu.Button className="group w-full rounded-md bg-gray-100 px-3.5 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff6600] focus:ring-offset-2 focus:ring-offset-gray-100">
                  <span className="flex w-full items-center justify-between">
                    <span className="flex min-w-0 items-center justify-between space-x-3">
                      <img
                        className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
                        src="/loader.svg"
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
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          View profile
                        </a>
                      )}
                    </Menu.Item>
                  </div>

                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          onClick={() =>
                            dispatch(handleLogout({ type: "user" }))
                          }
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
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
            <div className="mt-5 px-3">
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
            </div>
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
                    <item.icon
                      className={classNames(
                        item.link == locationName
                          ? "text-gray-50"
                          : "text-gray-400 group-hover:text-gray-500",
                        "mr-3 h-6 w-6 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
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
                      onClick={() => setCurrentChatSession(chat.key)}
                      className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700  hover:bg-gray-50 hover:text-gray-900"
                    >
                      {currentChatSession == chat.key && (
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
        {/* Main column */}
        <div className="flex flex-col lg:pl-64">
          {/* Search header */}
          <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white lg:hidden">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#ff6600] lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3CenterLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex flex-1 justify-between px-4 sm:px-6 lg:px-8">
              <div className="flex flex-1">
                <form className="flex w-full md:ml-0" action="#" method="GET">
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                      <MagnifyingGlassIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="search-field"
                      name="search-field"
                      className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 focus:border-transparent focus:outline-none focus:ring-0 focus:placeholder:text-gray-400 sm:text-sm"
                      placeholder="Search"
                      type="search"
                    />
                  </div>
                </form>
              </div>
              <div className="flex items-center">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#ff6600] focus:ring-offset-2">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="/loader.svg"
                        alt=""
                      />
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              View profile
                            </a>
                          )}
                        </Menu.Item>
                        {/* <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item> */}
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              onClick={() =>
                                dispatch(handleLogout({ type: "user" }))
                              }
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              Notifications
                            </a>
                          )}
                        </Menu.Item>
                      </div>

                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              onClick={() =>
                                dispatch(handleLogout({ type: "admin" }))
                              }
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
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
              </div>
            </div>
          </div>
          <main className="flex-1">
            {/* Page title & actions */}
            <div className="border-b border-[#ff6600] px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
              <div className="min-w-0 flex-1">
                <h1 className="text-lg font-semibold leading-6 text-[#ff6600] sm:truncate">
                  PGPGPT
                </h1>
              </div>
              <div className="mt-4 flex sm:ml-4 sm:mt-0">
                <select
                  value={selectedSasValue}
                  onChange={handleSasValue}
                  className="select rounded-lg select-bordered  bg-white ring-0 ring-gray-200 w-full max-w-xs"
                >
                  {selectToSAS.map((option, index) => (
                    <option key={index} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedCountryValue}
                  onChange={handleCountryValue}
                  className="ml-2 select rounded-lg select-bordered  bg-white ring-0 ring-gray-400 w-full max-w-xs"
                >
                  {selectToCountry.map((option, index) => (
                    <option key={index} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

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
                      onClick={() => setSelectedTab(tab.name)}
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

            {chatgptKey &&  <div className="mt-6  sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
              <div className="min-w-0 flex-1">
                <div className="mt-2 flex rounded-md shadow-sm border-gray-400  border-2">
                  <div className="relative flex flex-grow items-stretch focus-within:z-10">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <h2 className="text-sm font-semibold text-gray-900">
                        Query Here :
                      </h2>
                    </div>
                    <textarea
                      value={inputValue}
                      rows="1"
                      onChange={(e) => setInputValue(e.target.value)}
                      className="block w-full rounded-none rounded-l-md border-0 py-3 pl-24 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                      placeholder=""
                    />
                  </div>

                  <Button
                    type="button"
                    onClick={() => handelQueryChange("ChatGpt", inputValue)}
                    disabled={isQuery || !inputValue}
                    isLoading={isQuery}
                    className="relative -ml-px inline-flex items-center gap-x-2 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-300"
                  >
                    {isQuery && (
                      <span className="loading loading-spinner"></span>
                    )}
                    <Icons
                      icon="bi:send"
                      className="-ml-0.5 h-5 w-5 text-[#ff6600]"
                    />
                  </Button>
                </div>
              </div>
              <div className="mt-4 pt-1 flex sm:ml-4 sm:mt-0">
                <button
                  type="button"
                  onClick={exportChatData}
                  className="sm:order-0 order-1 ml-3 inline-flex items-center rounded-md bg-white px-3 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:ml-0"
                >
                  Save Chat
                </button>
                <button
                  type="button"
                  className="order-0 inline-flex items-center rounded-md bg-[#ff6600] px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#d95c00] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d95c00] sm:order-1 sm:ml-3"
                  onClick={() => handleNewSessionClick()}
                >
                  New Chat
                </button>
              </div>
            </div> }

            {chatgptKey &&  chatHistory.length > 0 && (
              <div className="mt-6 px-4 sm:px-6 lg:px-8 ">
                <div className="h-80 overflow-y-auto p-4  bg-black-50 border-gray-400  border-4 rounded-lg bg-transparent hidescrollbar">
                  {
                    chatHistory
                      .slice()
                      .reverse()
                      .map((message, index, array) => (
                        <div
                          key={index}
                          className={`mb-2 ${
                            message.role === "user" ? "text-left" : "text-left"
                          }`}
                        >
                          <span
                            className={`${
                              message.role === "user"
                                ? "bg-blue-200"
                                : "bg-green-200"
                            } text-black px-4 py-2 rounded-lg inline-block`}
                          >
                            {message.role === "user" ? (
                              // Display the question
                              <strong>{message.content}</strong>
                            ) : (
                              // Display the answer
                              <span>{message.content}</span>
                            )}
                          </span>
                        </div>
                      ))
                      .reverse() // Reverse the order here
                  }
                </div>
              </div>
            )}

{!chatgptKey && (
              <h2 className="mt-6 items-center text-center sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 text-lg font-bold leading-7 text-red-600">
                 GPT 3.5 Is Not Activate for You
              </h2>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
