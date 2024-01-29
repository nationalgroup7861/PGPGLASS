import Button from "@/components/ui/Button";
import ReactMarkdown from "react-markdown";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ChatDetail({ chatgptKey, chatHistory,inputValue }) {
  return (
    <>
       {/* {chatgptKey && (
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
            )} */}

      {chatgptKey && chatHistory.length > 0 && (
        <div className="mt-6 px-4 sm:px-6 lg:px-8 ">
          <div className="h-80 overflow-y-auto p-4  bg-black-50 border-gray-400  border-4 rounded-lg bg-transparent hidescrollbar">
            {/* {conversation.map((message, index) => (
      <div className="bg-green-200 text-black px-4 py-2 rounded-lg inline-block" key={index}>
                            <ReactMarkdown >

        {message}
        </ReactMarkdown>
        </div>
    ))} */}

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
                        <strong>
                          {" "}
                          <ReactMarkdown>{message.content}</ReactMarkdown>
                        </strong>
                      ) : (
                        // Display the answer
                        <span>
                          {" "}
                          <ReactMarkdown>{message.content}</ReactMarkdown>
                        </span>
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
          Glass Gpt Is Not Activate for You
        </h2>
      )}
    </>
  );
}
