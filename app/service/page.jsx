"use client";
import { exportToExcel } from "@/extra/ChatReport";
import { ServiceHaedernew } from "@/section/service";
import { PhoneIcon, PlayCircleIcon } from "@heroicons/react/20/solid";
import {
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { BardAPI } from "bardapi";
import { useRouter } from "next/navigation";
import OpenAI from "openai";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
  const router = useRouter();
  const { isAuth } = useSelector((state) => state.auth);
  const [chatgptKey, setChatGptKey] = useState("");

  useEffect(() => {
    let user_type;
    let user_data;
    if (typeof window !== "undefined") {
      user_type = window?.localStorage.getItem("user_type");
      user_data = JSON.parse(window?.localStorage.getItem("pgp_user"));
    }
    setChatGptKey(user_data?.chat_gpt_key);
    if (!isAuth || !user_type) {
      router.push("/");
    }
  }, [isAuth]);

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
      apiKey: chatgptKey,
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

  // const handelQueryChange = async (name, row) => {
  //   setIsQuery(true);
  //   const answer = await GetOpenAi(row);
  //   setOutputValue(answer);
  //   setChatHistory((prevChatHistory) => [
  //     ...prevChatHistory,
  //     { role: "user", content: inputValue },
  //     { role: "ai", content: answer },
  //   ]);
  //   setIsQuery(false);
  // };


  const handelQueryChange = async (name, row) => {
    setIsQuery(true);
    const answer = await GetOpenAi(row);
      setOutputValue(answer);

    // Add the new question and answer at the beginning of the array
    setChatHistory((prevChatHistory) => [
      { role: "user", content: inputValue },
      { role: "ai", content: answer },
      ...prevChatHistory,
    ]);
  
    setInputValue(""); // Clear the input after submitting
    setIsQuery(false);
  };
  

  useEffect(() => {
    const computedValue = cardData[selectedCard].statement
      .replace("[Category]", selectedSasValue)
      .replace("[Region]", selectedCountryValue);

    setInputValue(computedValue);
  }, [selectedCard, selectedSasValue, selectedCountryValue]);

  const exportChatData = async () => {
    exportToExcel(chatHistory);
    // exportToWord(chatHistory)
  };

  return (
    // <div className="lg:h-screen lg:w-screen bg-cover bg-repeat bg-gradient-to-r from-stone-500 to-stone-700">
    // <div className="lg:h-screen lg:w-screen bg-cover bg-no-repeat bg-bottom bg-[url('/pgp_bg.jpg')]">
    // <div className="min-h-screen bg-[url('/pgp_bg.jpg')] w-full overflow-hidden ">
    <div className="min-h-screen bg-cover bg-no-repeat  bg-[url('/pgp_bg.jpg')]">
      <ServiceHaedernew />
      {/* <FullscreenDialog/> */}
      <div className="mx-10 pb-10">
        <div className="flex justify-between flex-wrap items-center mb-6 mr-20 sm:mr-0">
          <h4 className="font-medium lg:text-2xl text-xl capitalize text-gray-50 inline-block ltr:pr-4 rtl:pl-4"></h4>
          <div className="flex sm:space-x-4 space-x-2 sm:justify-end items-center rtl:space-x-reverse">
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
              className="select rounded-lg select-bordered  bg-white ring-0 ring-gray-400 w-full max-w-xs"
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
          <h4 className="font-medium  text-lg capitalize text-gray-50 inline-block ltr:pr-4 rtl:pl-4">
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
              className="btn  bg-slate-50 px-8 py-0 text-blue-700 rounded-full normal-case hover:bg-gray-100"
              onClick={() => handelQueryChange("ChatGpt", inputValue)}
              disabled={isQuery}
            >
              {isQuery && <span className="loading loading-spinner"></span>}
              Query
            </button>

            <button
              className="btn bg-slate-50 px-5 py-0 rounded-full normal-case hover:bg-gray-100"
              onClick={exportChatData}
            >
              Save Chat
            </button>
          </div>
        </div>

        {chatHistory.length > 0 && (
          <div className="h-80 overflow-y-auto p-4 border rounded-lg bg-transparent hidescrollbar">
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
                        message.role === "user" ? "bg-blue-200" : "bg-green-200"
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
        )}

        <div className="tabs gap-2 mt-5">
          <a className="tab rounded-lg  bg-white text-black-500 px-10">All</a>
          <a className="tab tab-active rounded-lg  text-white bg-[#ff6600]  px-10">
            Market Research
          </a>
          <a className="tab rounded-lg bg-white  text-black-500  px-10">
            Competitor Information
          </a>
          <a className="tab rounded-lg  bg-white  text-black-500  px-10">
            New Trend{" "}
          </a>
          <a className="tab rounded-lg  bg-white  text-black-500  px-10">
            Import Export
          </a>
        </div>

        <div className="flex flex-row gap-6 mt-5">
          {cardData.map((card, index) => (
            <div
              key={index}
              className={`card w-auto bg-base-100 shadow-xl ${
                selectedCard === index
                  ? " border-[#ff6600] border-4"
                  : "border-gray-400  border-4"
              }`}
            >
              <div
                className="card-body bg-green-50 flex-col w-full rounded-xl"
                onClick={() => handleCardClick(index)}
              >
                {/* <div className="divider w-full right-0 top-0 left-0 bottom-0 m-0 p-0"></div> */}
                {/* <h2 className="card-title"></h2> */}
                <p className="text-black">{card.statement}</p>
                <div className="card-actions justify-start">
                  <div className="flex text-center gap-2">
                    <card.icon
                      className="h-5 w-5 mt-0 text-[#ff6600] "
                      aria-hidden="true"
                    />
                    <span className="text-base">PGP GLASS</span>
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
