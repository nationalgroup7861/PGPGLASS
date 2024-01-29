import Button from "@/components/ui/Button";
import ReactMarkdown from "react-markdown";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ChatDetail({ chatgptKey, chatHistory,inputValue }) {
  const isImageLink = (url) => {
    // Check for specific query parameters that indicate it's an image link
    return url.includes('rsct=image/png') || url.includes('rsct=image/jpeg');
  };
  console.log(chatHistory)

  return (
    <>
   
{chatgptKey && chatHistory.length > 0 && (
  <div className="mt-6 px-4 sm:px-6 lg:px-8">
    <div className="h-80 overflow-y-auto p-4 bg-black-50 border-gray-400 border-4 rounded-lg bg-transparent hidescrollbar">
      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
        {/* Loop through the chat history and reverse the order */}
        {chatHistory
          .slice()
          .reverse()
          .reduce((result, message, index, array) => {
            // Combine consecutive user and AI messages into a single pair
            if (index % 2 === 0) {
              const userMessage = array[index];
              const aiMessage = array[index + 1];

              if (userMessage && aiMessage) {
                result.push([userMessage, aiMessage]);
              }
            }
            return result;
          }, [])
          .map((messagePair, index) => (
            <div key={index} className="mb-2">
              {messagePair.map((message, subIndex) => (
                <div
                  key={subIndex}
                  className={`group relative ${
                    message.role === "user" ? "text-left" : "text-left"
                  }`}
                >
                  <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
                    {isImageLink(message.content) && (
                      <img
                        src={message.content}
                        alt={message.content}
                        className="h-full w-full object-cover object-center"
                      />
                    )}
                  </div>
                  {message.role === "user" && (
                    <div className="bg-white p-2 rounded-md">
                      {isImageLink(message.content) ? null : message.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))
        }
      </div>
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
