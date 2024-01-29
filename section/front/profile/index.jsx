"use client";
import { selectToCountry, selectToSAS } from "@/constant/data";
import { ApiContext } from "@/context/ApiContext";
import { Header, MobileHeader, MobileSideBar, SideBar } from "@/section/header";
import { CHATSESSION_API } from "@/util/constant";
import ls from "localstorage-slim";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProfileForm from "./ProfileForm";
import useRtl from "@/hooks/useRtl";

export default function PROFILE() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isRtl] = useRtl();

  const [selectedSasValue, setSelectedSasValue] = useState(selectToSAS[0].name);
  const [selectedCountryValue, setSelectedCOuntryValue] = useState(
    selectToCountry[0].name
  );

  const { getApiData, postApiData } = useContext(ApiContext);

  const router = useRouter();
  const { isAuth } = useSelector((state) => state.auth);
  const [userInfo, setUserInfo] = useState({});

  const [chatHistory, setChatHistory] = useState([]); // To store chat history
  const [chatgptKey, setChatGptKey] = useState("");
  const [chatSessionList, setChatSessionList] = useState([]);
  const [currentChatSession, setCurrentChatSession] = useState("");


// Header Menu Option HNadle
  const handleSasValue = (event) => {
    setSelectedSasValue(event.target.value);
  };

  const handleCountryValue = (event) => {
    setSelectedCOuntryValue(event.target.value);
  };

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
    let user_type;
    let user_data;
    if (typeof window !== "undefined") {
      user_type = window?.localStorage.getItem("user_type");
      user_data = ls.get("pgp_user", { decrypt: true });
      // user_data = JSON.parse(window?.localStorage.getItem("pgp_user"));
      setUserInfo(user_data);
    }
    setChatGptKey(user_data?.chat_gpt4_key);
    if (!isAuth || !user_type) {
      router.push("/");
    }
  }, [isAuth]);




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

  useEffect(() => {
    if (userInfo?.id) {
      GetChatsessionList();
    }
  }, [userInfo]);

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

  const handleCurrentChat = (chatKey) => {
    setCurrentChatSession(chatKey);
  };

  const handleMobileMenu = (value) => {
    setSidebarOpen(value.status);
  };

  return (
    <>
      <div
        className="min-h-full bg-cover bg-no-repeat  bg-bottom "
        style={{
          backgroundImage: `url(/pgp_bg.jpg)`,
        }}
        dir={isRtl ? "rtl" : "ltr"}
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
          <MobileHeader handleMobileMenu={handleMobileMenu}/>

          <main className="flex-1">
            {/* Page title & actions */}
            <Header
              selectedSasValue={selectedSasValue}
              selectedCountryValue={selectedCountryValue}
              handleCountryValue={handleCountryValue}
              handleSasValue={handleSasValue}
            />

            <ProfileForm userInfo={userInfo}/>
           
          </main>
        </div>
      </div>
    </>
  );
}
