"use client";
import Button from "@/components/ui/Button";
import Icons from "@/components/ui/Icon";
import { cardData, selectToCountry, selectToSAS, tabs } from "@/constant/data";
import { ApiContext } from "@/context/ApiContext";
import { exportToExcel } from "@/extra/ChatReport";
import { Header, MobileHeader, MobileSideBar, SideBar } from "@/section/header";
import { CHATSESSION_API, MESSAGE_API } from "@/util/constant";
import { generateChatKey } from "@/util/extra";
import ls from "localstorage-slim";
import { useRouter } from "next/navigation";
import OpenAI from "openai";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ChatDetail from "./ChatDetail";
import Tab from "./Tab";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function GPT3() {
  // USER INFO
  const router = useRouter();
  const { isAuth } = useSelector((state) => state.auth);
  const [userInfo, setUserInfo] = useState({});

  // MOBILE MENU
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMobileMenu = (value) => {
    setSidebarOpen(value.status);
  };

  // COLLPASE TAB

  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleCollapse = () => {
    setIsCollapsed((prevIsCollapsed) => !prevIsCollapsed);
  };

  const [selectedTab, setSelectedTab] = useState("Competitor Information");

  const [selectedCard, setSelectedCard] = useState(0);

  const filteredCardData =
    selectedTab === "All"
      ? cardData
      : cardData.filter((card) => card.category === selectedTab);

  const handleCardClick = (index) => {
    setSelectedCard(index);
  };

  // SELECT HEADER VALUE
  const [selectedSasValue, setSelectedSasValue] = useState(selectToSAS[0].name);
  const [selectedCountryValue, setSelectedCOuntryValue] = useState(
    selectToCountry[0].name
  );

  const handleSasValue = (event) => {
    setSelectedSasValue(event.target.value);
  };

  const handleCountryValue = (event) => {
    setSelectedCOuntryValue(event.target.value);
  };

  const { getApiData, postApiData, deleteApiData } = useContext(ApiContext);

  //CHAT AND QUERY
  const [isQuery, setIsQuery] = useState(false);

  const [inputValue, setInputValue] = useState("");
  // const [outputValue, setOutputValue] = useState("");

  const [chatgptKey, setChatGptKey] = useState("");
  const [currentChatSession, setCurrentChatSession] = useState("");
  const [chatSessionList, setChatSessionList] = useState([]);
  const [chatHistory, setChatHistory] = useState([]); // To store chat history


  // userinfo and auth
  useEffect(() => {
    let user_type;
    let user_data;
    if (typeof window !== "undefined") {
      user_type = window?.localStorage.getItem("user_type");
      user_data = ls.get("pgp_user", { decrypt: true });
      setUserInfo(user_data);
    }
    setChatGptKey(user_data?.chat_gpt3_key);
    if (!isAuth || !user_type) {
      router.push("/");
    }
  }, [isAuth]);

  // select value from select card and country and sasvalue
  useEffect(() => {
    const computedValue = filteredCardData[selectedCard].statement
      .replace("[Category]", selectedSasValue)
      .replace("[Region]", selectedCountryValue);
    setInputValue(computedValue);
  }, [selectedCard, selectedSasValue, selectedCountryValue]);


  useEffect(() => {
    if (userInfo?.id) {
      localStorage.removeItem("chatSessionList")
      localStorage.removeItem("currentChatSession")
      GetChatsessionList();
    }
  }, [userInfo]);

  async function GetChatsessionList() {
    try {
      const params = { client_id: userInfo.id,type:"gpt" };
      const response = await getApiData(
        CHATSESSION_API.list + userInfo.id,
        params
      );
      if (response) {
        const data=response.data.result.chatSessions;
        if(data.length==0)
        {
          handleNewSessionClick();
        }
        else
        {
          localStorage.setItem(
            "chatSessionList",
            JSON.stringify(data)
          );
          const currentSession = JSON.parse(
            localStorage.getItem("currentChatSession")
          );
          if(currentSession)
          {
            setCurrentChatSession(currentSession?.session_key);
          }
          else{
            setCurrentChatSession(data[0]?.session_key);

          }
          setChatSessionList(response.data.result.chatSessions);

        }
       
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function CreateChatsessionList(data) {
    try {
      const response = await postApiData(CHATSESSION_API.create, data);
      if (response) {
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  async function CreateMessage(data) {
    try {
      const response = await postApiData(MESSAGE_API.create, data);
      if (response) {
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function DeleteChatsessionList(session_key) {
    try {
      const data = {
        client_id: userInfo.id,
        session_key:session_key,
      };
      const response = await deleteApiData(CHATSESSION_API.delete + id, data);
      if (response) {

      }
    } catch (error) {
      console.log(error);
    }
  }


  async function GetOpenAi(query) {
    const openai = new OpenAI({
      apiKey: chatgptKey,
      dangerouslyAllowBrowser: true,
    });
    const modifiedQuery = `${query} glass bottle`;

    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: modifiedQuery }],
      model: "gpt-4",
      stream: true,
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    let content = "";

    for await (const chunk of chatCompletion) {
      content += chunk.choices[0]?.delta?.content || "";

      // setConversation((prevConversation) => [
      //   ...prevConversation,
      //   chunk.choices[0]?.delta?.content,
      // ]);
    }

    return content;
  }

  //verify now
  const saveChatLocally = async (answer) => {
    const savedChats =
      JSON.parse(localStorage.getItem(currentChatSession)) || [];
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

    savedChats.unshift(servernewChat, servernewAiResponse); // Use unshift to add the new chat at the beginning
    localStorage.setItem(currentChatSession, JSON.stringify(savedChats));

    await CreateMessage(servernewChat);
    await  CreateMessage(servernewAiResponse);
  };

  const handelQueryChange = async (name, row) => {

    setIsQuery(true);
    const answer = await GetOpenAi(row);

    if (chatHistory.length === 0) {
      const chatSessionList =
        JSON.parse(localStorage.getItem("chatSessionList")) || [];
      const matchingChatSession = chatSessionList.find(
        (session) => session.session_key === currentChatSession
      );

      matchingChatSession.title = row; // Assuming 'row' contains the question title
      localStorage.setItem("chatSessionList", JSON.stringify(chatSessionList));
      setChatSessionList(chatSessionList)
      const data={
        session_key:currentChatSession,
        title:row,
        type:"gpt",
      }
      UpdateCurrentChatSessionTitle(data)
    }
    // setOutputValue(answer);
    saveChatLocally(answer);
    setChatHistory((prevChatHistory) => [
      { role: "user", content: inputValue },
      { role: "ai", content: answer },
      ...prevChatHistory,
    ]);
    setInputValue("");
    setIsQuery(false);
  };

  // verify with api
  useEffect(() => {
    if (currentChatSession) {
      let savedChats =
        JSON.parse(localStorage.getItem(currentChatSession)) || [];
      setChatHistory(savedChats);
      if (savedChats.length == 0) {
        GetCurrentsessionMessageList(currentChatSession);
      }
      const chatSessionList =
        JSON.parse(localStorage.getItem("chatSessionList")) || [];
      const matchingChatSession = chatSessionList.find(
        (session) => session.session_key == currentChatSession
      );
      localStorage.setItem(
        "currentChatSession",
        JSON.stringify(matchingChatSession)
      );
    }

}, [currentChatSession]);




  async function GetCurrentsessionMessageList(currentChatSession) {
    try {
      const params = {
        client_id: userInfo.id,
        session_key: currentChatSession,
      };
      const response = await getApiData(MESSAGE_API.list, params);
      if (response) {
        setChatHistory(response.data.result.message);
        localStorage.setItem(
          currentChatSession,
          JSON.stringify(response.data.result.message)
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function UpdateCurrentChatSessionTitle(data) {
    try {
      const response = await postApiData(CHATSESSION_API.updateTitle, data);
      if (response) {
      }
    } catch (error) {
      console.log(error);
    }
  }




  const handleNewSessionClick = () => {
    const newSessionKey = generateChatKey();
    const data = {
      title: "New Chat",
      session_key: newSessionKey,
      client_id: userInfo?.id,
      type: "gpt",
    };

    const chatSessionList = JSON.parse(localStorage.getItem("chatSessionList")) || [];
    chatSessionList.unshift(data);
    localStorage.setItem("chatSessionList", JSON.stringify(chatSessionList));
    setChatSessionList(chatSessionList)
    setCurrentChatSession(newSessionKey);
    CreateChatsessionList(data);
  };

  // get chat export
  const exportChatData = async () => {
    exportToExcel(chatHistory, userInfo);
  };

  // handle current Chat session Click
  const handleCurrentChat = (currentChatSessionkey) => {
    setCurrentChatSession(currentChatSessionkey);
  };

  return (
    <>
      <div
        className="min-h-full bg-cover bg-no-repeat  bg-bottom "
        style={{
          backgroundImage: `url(/pgp_bg.jpg)`,
        }}
      >
        {sidebarOpen && (
          <MobileSideBar
            open={sidebarOpen}
            closeDialog={handleMobileMenu}
            userInfo={userInfo}
            chatSessionList={chatSessionList}
            currentChatSession={currentChatSession}
            handleCurrentChat={handleCurrentChat}
          />
        )}

        {/* Static sidebar for desktop */}

        <SideBar
          userInfo={userInfo}
          chatSessionList={chatSessionList}
          currentChatSession={currentChatSession}
          handleCurrentChat={handleCurrentChat}
        />

        {/* Main column */}
        <div className="flex flex-col lg:pl-64">
          {/* Search header */}
          <MobileHeader handleMobileMenu={handleMobileMenu} />

          <main className="flex-1">
            {/* Page title & actions */}
            <Header
              selectedSasValue={selectedSasValue}
              selectedCountryValue={selectedCountryValue}
              handleCountryValue={handleCountryValue}
              handleSasValue={handleSasValue}
            />

            <Tab
              tabs={tabs}
              isCollapsed={isCollapsed}
              selectedTab={selectedTab}
              toggleCollapse={toggleCollapse}
              filteredCardData={filteredCardData}
              selectedCard={selectedCard}
              handleTabSelect={(value) => setSelectedTab(value)}
              handleCardClick={(value) => handleCardClick(value)}
            />

            {chatgptKey && (
              <div className="mt-6  sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
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
              </div>
            )}

            <ChatDetail
              chatgptKey={chatgptKey}
              chatHistory={chatHistory}
              inputValue={inputValue}
            />
          </main>
        </div>
      </div>
    </>
  );
}
