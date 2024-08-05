"use client";

import ls from "localstorage-slim";
import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useState } from "react";
import { CHATSESSION_API, CLIENT_API, MESSAGE_API } from '../util/constant';
import { ApiContext } from "./ApiContext";
import { generateChatKey } from "../util/extra";

const DesignGptContext = createContext();
DesignGptProvider.propTypes = {
  children: PropTypes.node,
};
function DesignGptProvider({ children }) {

  const [currentChatSession, setCurrentChatSession] = useState("");
  const [chatSessionList, setChatSessionList] = useState([]);
  const [chatHistory, setChatHistory] = useState([]); // To store chat history
  const [chatgptKey, setChatGptKey] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [permissions, setPermissions] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const { getApiData, postApiData } = useContext(ApiContext);
  const [inputValue, setInputValue] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const controller = new AbortController();
  const { signal } = controller;


  async function GetChatsessionList() {
    setIsLoading(true)
    try {
      const params = { client_id: userInfo.id, type: "delly" ,search:searchKeyword };
      const response = await getApiData(CHATSESSION_API.list + userInfo.id,params,signal);
      if (response) {
        const data = response.data.result.chatSessions;
        if (data.length == 0) {
          handleNewSessionClick();
        }
        else {
          localStorage.setItem(
            "chatSessionList",
            JSON.stringify(data)
          );
          const currentSession = JSON.parse(
            localStorage.getItem("currentChatSession")
          );
          if (currentSession) {
            setCurrentChatSession(currentSession);
            localStorage.setItem("currentChatSession", JSON.stringify(currentSession));
          }
          else {
            setCurrentChatSession(data[0]);
            localStorage.setItem("currentChatSession", JSON.stringify(data[0]));
          }
          setChatSessionList(data);

        }

      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error);
    }
  }
  async function GetPermissionandkey() {
    setIsLoading(true)
    try {
      const params = {  };
      const response = await getApiData(CLIENT_API.clientpermissions + userInfo.id,params,signal);
      if (response) {
        const data = response.data.result;
        const parsedPermissions = JSON.parse(data.permissions);
        setChatGptKey(data?.chat_gpt4_key)
        setPermissions(parsedPermissions);
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error);
    }
  }

  const handleNewSessionClick = () => {
    setIsLoading(true)
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
    setCurrentChatSession(data);
    CreateChatsessionList(data);
    setIsLoading(false)

  };


  async function CreateChatsessionList(data) {
    try {
      const response = await postApiData(CHATSESSION_API.create, data);
    } catch (error) {
      console.log(error);
    }
  }
  

  useEffect(() => {
    let user_data;
    if (typeof window !== "undefined") {
      user_data = ls.get("pgp_user", { decrypt: true });
      setUserInfo(user_data);
    }
   
  }, []);


  
  useEffect(() => {
    if (userInfo?.id) {
      localStorage.removeItem("chatSessionList")
      localStorage.removeItem("currentChatSession")
      GetPermissionandkey();
      GetChatsessionList();
      return () => {
        controller.abort();
    };
    }
    
  }, [userInfo,searchKeyword]);

  useEffect(() => {
    if (userInfo?.id) {
      GetCurrentsessionMessageList(currentChatSession?.session_key)
    }
  
  }, [currentChatSession]);



  async function handlePageRefresh(update) {
    if (update) {
      GetChatsessionList();
    }
  }


  async function GetCurrentsessionMessageList(currentChatSession) {
    setIsLoading(true)

    try {
      const params = {
        client_id: userInfo.id,
        session_key: currentChatSession,
      };
      const response = await getApiData(MESSAGE_API.list, params);
      if (response) {
        setChatHistory(response.data.result.message);
        localStorage.setItem(currentChatSession,JSON.stringify(response.data.result.message));
      }
      setIsLoading(false)

    } catch (error) {
      setIsLoading(false)
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

  async function CreateMessage(data) {
    try {
      const response = await postApiData(MESSAGE_API.create, data);
      if (response) {
      }
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <DesignGptContext.Provider
      value={{
        currentChatSession, 
        setCurrentChatSession,
        chatSessionList, 
        setChatSessionList,
        chatHistory,
        setChatHistory,
        chatgptKey, 
        setChatGptKey,
        permissions, 
        setPermissions,
        userInfo,
        setUserInfo,
        GetCurrentsessionMessageList,
        UpdateCurrentChatSessionTitle,
        inputValue,
         setInputValue,
         CreateMessage,
        handlePageRefresh,
        handleNewSessionClick,
        searchKeyword,
        setSearchKeyword,
        isLoading
      }}
    >
      {children}
    </DesignGptContext.Provider>
  );
}
export { DesignGptContext, DesignGptProvider };

