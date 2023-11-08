"use client";
import { exportToExcel } from "@/extra/ChatReport";
import { ServiceHaeder } from "@/section/service";
import {
    PhoneIcon,
    PlayCircleIcon
} from "@heroicons/react/20/solid";
import {
    ChartPieIcon,
    CursorArrowRaysIcon,
    FingerPrintIcon,
    UserIcon
} from "@heroicons/react/24/outline";
import { BardAPI } from "bardapi";
import OpenAI from "openai";
import { useEffect, useState } from "react";

const selectToSAS = [
  { id: 1, name: "Beer Bottle" },
  { id: 2, name: "Cosmetic" },
  { id: 3, name: "Perfumery" },
  { id: 4, name: "Food Jars" },
  { id: 5, name: "Speciality liquor" },
  { id: 6, name: "Vine" },
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
];

// chatgpt 4, Bard, internalGPT
const chat_menu = [
  {
    name: "Chatgpt 4",
    description: "Explore the power of ChatGPT-4.",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Bard",
    description: "Unleash creativity with Bard, the next-level AI storyteller",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "InternalGPT",
    description:
      "Unlock innovation with InternalGPT, your AI companion for internal tasks",
    href: "#",
    icon: FingerPrintIcon,
  },
];

const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

const cardData = [
  {
    statement:
      "What is total Market Growth For [Category] in [Region] for the last 5 years and projection for the next 3 years?",
    icon: UserIcon, // Replace with your actual icon component
  },
  {
    statement:
      "[Category] Producers of the same in the [Region] with their revenue,EBIDTA, PAT for last 5 years and projection for next 3 years",
    icon: UserIcon, // Replace with your actual icon component
  },
  {
    statement:
      "Are their any major regulatory restriction for importing [Category] bottles into [Region] from India or Srilanka?.",
    icon: UserIcon, // Replace with your actual icon component
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Service() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(0);
  const [selectedSasValue, setSelectedSasValue] = useState(selectToSAS[0].name);
  const [selectedCountryValue, setSelectedCOuntryValue] = useState(
    selectToCountry[0].name
  );
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");
  const [chatHistory, setChatHistory] = useState([]); // To store chat history
  const [isQuery, setIsQuery] = useState(false);

  const handleSasValue = (event) => {
    setSelectedSasValue(event.target.value);
  };

  const handleCountryValue = (event) => {
    setSelectedCOuntryValue(event.target.value);
  };

  const handleCardClick = (index) => {
    setSelectedCard(index);
  };

  const [editableStatement, setEditableStatement] = useState(
    cardData[selectedCard].statement
  );

  // Function to handle changes in the editable statement
  const handleEditableStatementChange = (event) => {
    setEditableStatement(event.target.value);
  };

  async function GetOpenAi(query) {
    const openai = new OpenAI({
      apiKey: "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",
      dangerouslyAllowBrowser: true,
    });

    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: query }],
      model: "gpt-3.5-turbo",
    });
    return chatCompletion.choices[0].message["content"];
  }

  async function GetBardAi(query) {
    const sessionId =
      "bwiljy8gRLlrOygs9OVilTDS6G-BE8XiP4PYy5IZdUclAzq9dNCKIzSgjtajz6pGhBYzvA.";
    const bard = new BardAPI({ sessionId });

    const message = "Your message here";
    bard.ask({ message }).then((response) => {
      console.log("Response:", response.response);
      console.log("Conversation ID:", response.conversationId);
      console.log("Response ID:", response.responseId);
      console.log("Choice ID:", response.choiceId);
      console.log("Other Choices:", response.otherChoices);
    });
  }

  const handelQueryChange = async (name, row) => {
    // console.log(row);
    setIsQuery(true);
    const answer = await GetOpenAi(row);
    setOutputValue(answer);

    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      { role: "user", content: inputValue },
      { role: "ai", content: answer },
    ]);
    setIsQuery(false);
  };

  useEffect(() => {
    const computedValue = cardData[selectedCard].statement
      .replace("[Category]", selectedSasValue)
      .replace("[Region]", selectedCountryValue);

    setInputValue(computedValue);
  }, [selectedCard, selectedSasValue, selectedCountryValue]);

  const exportChatData = async () => {
    exportToExcel(chatHistory)
    // exportToWord(chatHistory)

  };

  return (
    // <div className="lg:h-screen lg:w-screen bg-cover bg-repeat bg-bottom bg-[url('/cbimage.png')]">
    <div className="min-h-screen bg-[url('/cbimage.png')] bg-cover bg-repeat bg-bottom relative ">
      <ServiceHaeder />
      <div className="mx-10 pb-10">
        <div className="flex justify-between flex-wrap items-center mb-6 mr-20">
          <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4"></h4>
          <div className="flex sm:space-x-4 space-x-2 sm:justify-end items-center rtl:space-x-reverse">
            <select
              value={selectedSasValue}
              onChange={handleSasValue}
              className="select rounded-full select-bordered  bg-transparent ring-0 ring-gray-400 w-full max-w-xs"
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
              className="select rounded-full select-bordered  bg-transparent ring-0 ring-gray-400 w-full max-w-xs"
            >
              {selectToCountry.map((option, index) => (
                <option key={index} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-between flex-wrap items-center mb-6 ml-10 gap-3">
          <h4 className="font-medium  text-lg capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
            Query Here:
          </h4>
          <span className="flex-1 text-xl">
            <textarea
              className="border border-gray-300 p-2 rounded-md w-full text-base bg-gray-300"
              value={inputValue}
              rows="1" // Set the number of visible rows here
              onChange={(e) => setInputValue(e.target.value)}
            />
          </span>
          <div className="flex flex-col space-y-1 sm:justify-end items-center ">
            <button
              className="btn  bg-slate-400 px-8 py-0 text-blue-700 rounded-full normal-case hover:bg-gray-500"
              onClick={() => handelQueryChange("ChatGpt", inputValue)}
              disabled={isQuery}
            >
              {isQuery && <span className="loading loading-spinner"></span>}
              Query
            </button>

            <button
              className="btn bg-slate-400 px-5 py-0 rounded-full normal-case hover:bg-gray-500"
              onClick={exportChatData}
            >
              Save Chat
            </button>
          </div>
        </div>

        {chatHistory.length > 0 && (
          <div className="h-80 overflow-y-auto p-4 border rounded-lg bg-transparent hidescrollbar">
            {chatHistory.map((message, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  message.role === "user" ? "text-left" : "text-left"
                }`}
              >
                <span
                  className={`${
                    message.role === "user" ? "bg-blue-200" : "bg-green-200"
                  } text-black px-4 py-2 rounded-lg inline-block`}
                >
                  {message.content}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="tabs gap-2 mt-5">
          <a className="tab rounded-full  bg-white text-black ">All</a>
          <a className="tab tab-active rounded-full  text-black bg-white">
            Market Research
          </a>
          <a className="tab rounded-full bg-white  text-black">
            Competitor Information
          </a>
          <a className="tab rounded-full  bg-white  text-black">New Trend </a>
          <a className="tab rounded-full  bg-white  text-black">
            Import Export
          </a>
        </div>
        <div className="flex flex-row gap-6 mt-5">
          {cardData.map((card, index) => (
            <div
              key={index}
              className={`card w-96 bg-base-100 shadow-xl ${
                selectedCard === index
                  ? "ring-8 ring-yellow-300"
                  : "ring-1 ring-blue-100"
              }`}
            >
              <div
                className="card-body bg-blue-900 flex-col w-full rounded-xl"
                onClick={() => handleCardClick(index)}
              >
                <div className="divider w-full right-0 top-0 left-0 bottom-0 m-0 p-0"></div>
                <h2 className="card-title"></h2>
                <p className="text-white">{card.statement}</p>
                <div className="card-actions justify-start">
                  <div className="flex text-center">
                    <card.icon className="h-5 w-5 mt-0" aria-hidden="true" />
                    <span className="text-base">PGP Glass</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
