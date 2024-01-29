"use client";
import { selectToCountry, selectToSAS } from "@/constant/data";
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

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function RESEARCHGPT() {
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
    setChatGptKey(user_data?.chat_gpt4_key);
    if (!isAuth || !user_type) {
      router.push("/");
    }
  }, [isAuth]);


  useEffect(() => {
    if (userInfo?.id) {
      localStorage.removeItem("chatSessionList")
      localStorage.removeItem("currentChatSession")
      GetChatsessionList();
    }
  }, [userInfo]);

  async function GetChatsessionList() {
    try {
      const params = { client_id: userInfo.id,type:"delly" };
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



  async function GetImge(query) {

    const openai = new OpenAI({
      apiKey: chatgptKey,
      dangerouslyAllowBrowser: true,
    });

    const chatCompletion = await openai.images.generate({
      model: "dall-e-3",
      prompt: query,
      n: 1,
      size: "1024x1024",
    });
    return chatCompletion.data[0].url;
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
    const answer = await GetImge(row);

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
        type:"delly",
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
      type: "delly",
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

<section className=" py-20">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto text-center">
                  <h1 className="text-4xl font-bold mb-6">
                  To be Integrated
                  </h1>
                </div>
              </div>
            </section>
         
            
          </main>
        </div>
      </div>
    </>
  );
}
