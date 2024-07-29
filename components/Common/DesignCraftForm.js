"use client";

import { DesignGptContext } from "@/app/context/DesignGptContext";
import { exportToExcel } from "@/extra/ChatReport";
import OpenAI from "openai";
import { useContext, useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Tooltip } from "react-tooltip";

const DesignCraftForm = () => {
  const { CreateMessage, userInfo, chatHistory, currentChatSession, setChatHistory, setChatSessionList, chatgptKey, UpdateCurrentChatSessionTitle, inputValue, setInputValue } = useContext(DesignGptContext);
  const [isQuery, setIsQuery] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const handelQueryChange = async (name, row) => {

    setIsQuery(true);
    const answer = await GetImge(row);

    if (chatHistory.length === 0) {
      const chatSessionList =
        JSON.parse(localStorage.getItem("chatSessionList")) || [];
      const matchingChatSession = chatSessionList.find(
        (session) => session.session_key === currentChatSession?.session_key
      );

      matchingChatSession.title = row; // Assuming 'row' contains the question title
      localStorage.setItem("chatSessionList", JSON.stringify(chatSessionList));
      setChatSessionList(chatSessionList)
      const data = {
        session_key: currentChatSession?.session_key,
        title: row,
        type: "delly",
      }
      UpdateCurrentChatSessionTitle(data)
    }
    saveChatLocally(answer);
    setChatHistory((prevChatHistory) => [
      { role: "ai", content: answer },
      { role: "user", content: inputValue },

      ...prevChatHistory,
    ]);
    setInputValue("");
    setIsQuery(false);
  };

  

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



  const exportChatData = async () => {
    exportToExcel(chatHistory, userInfo);
  };



  //verify now
  const saveChatLocally = async (answer) => {
    const servernewChat = {
      role: "user",
      session_key: currentChatSession?.session_key,
      content: inputValue,
    };
    const servernewAiResponse = {
      role: "ai",
      session_key: currentChatSession?.session_key,
      content: answer,
    };
    // for save local chat in new version 
    // const savedChats =
    //   JSON.parse(localStorage.getItem(currentChatSession)) || [];
    // savedChats.unshift(servernewChat, servernewAiResponse); // Use unshift to add the new chat at the beginning
    // localStorage.setItem(currentChatSession, JSON.stringify(savedChats));

    await CreateMessage(servernewChat);
    await CreateMessage(servernewAiResponse);
  };

  const startListening = () => SpeechRecognition.startListening({ continuous: false });



  useEffect(() => {
    // if (transcript) {
    //   onSearch(transcript);
    // }
    setInputValue(transcript)
  }, [transcript,]);

  return (
    <>
      <Tooltip id="my-tooltip" className="custom-tooltip tooltip-inner" />
      <form className="new-chat-form border-gradient">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          rows="1"
          placeholder="Query Here..."></textarea>
        <div className="left-icons">
          <div title="PGPGPT" className="form-icon icon-gpt">
            <i className="fa-sharp fa-regular fa-aperture"></i>
          </div>
        </div>
        <div className="right-icons">
          <div
            className="form-icon icon-plus"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Choose File"
          >
            <input type="file" className="input-file" name="myfile" multiple />
            <i className="fa-sharp fa-regular fa-plus"></i>
          </div>
          {chatHistory.length > 0 && <div
            className="form-icon icon-arrow-down-to-line"
            onClick={exportChatData}
          >
            <i className="fa-sharp fa-regular fa-arrow-down-to-line"></i>
          </div>
          }

          <a
            className="form-icon icon-mic"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Voice Search"
            onClick={startListening}
            disabled={listening}
          >
            <i className="fa-regular fa-waveform-lines"></i>
          </a>
          <a
            className="form-icon icon-send"
            data-tooltip-id="my-tooltip"
            onClick={() => !isQuery && chatgptKey && inputValue && handelQueryChange("ChatGpt", inputValue)}
            data-tooltip-content="Send message"
          >
            {isQuery ? <i className="fa-sharp fa-solid fa-stop"></i> : <i className="fa-sharp fa-solid fa-paper-plane-top"></i>}
          </a>
        </div>
      </form>
    </>
  );
};

export default DesignCraftForm;
