import { Dialog } from '@headlessui/react';
import {
    ArrowLeftOnRectangleIcon,
    BoltIcon,
    ChatBubbleLeftIcon,
    ExclamationTriangleIcon,
    HandThumbDownIcon,
    HandThumbUpIcon,
    LinkIcon,
    MoonIcon,
    PaperAirplaneIcon,
    PencilSquareIcon,
    PlusIcon,
    SunIcon,
    TrashIcon,
    UserIcon
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';

function FullScreenModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [hasAnswered, setHasAnswered] = useState(false)

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="fixed inset-0 z-10 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-white opacity-95" />
        <div className="modal-container fixed w-full h-full z-50 overflow-y-auto flex flex-col">
          {/* Fixed Header */}
          <div className="modal-header bg-gray-800 p-4 flex justify-between items-center">
            <Dialog.Title className="text-2xl font-bold text-white">PGPT!</Dialog.Title>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-300"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          <div className="modal-content flex-1 overflow-y-auto container mx-auto h-auto text-left p-4">
           
           <div className="w-64 flex flex-col border-r-2">
            {/* <div className="relative flex flex-col flex-grow overflow-y-auto bg-black pt-5">
            <button className="flex space-x-1 p-2 hover:bg-gray-700 mx-2 border border-gray-300 rounded text-white">
            <PlusIcon className="h-6 w-6" />
            New Chat
          </button>
          <div className="mt-5 flex flex-col text-white">
            <Link
              href="/home"
              className="flex space-x-2 p-2 hover:bg-black/80 mx-2 bg-gray-700 rounded text-white items-center"
            >
              <ChatBubbleLeftIcon className="h-6 w-6 text-gray-300" />
              <p>Translation Request</p>
            </Link>
          </div>
          <div className="absolute bottom-0 inset-x-0 border-t border-gray-200/50 mx-2 py-6 px-2">
            <Link
              href="/home"
              className="flex space-x-2 p-2 hover:bg-black/80 mx-2 rounded text-white text-sm items-center"
            >
              <TrashIcon className="h-5 w-5 text-gray-300" />
              <p>Clear conversations</p>
            </Link>
            <Link
              href="/home"
              className="flex space-x-2 p-2 hover:bg-black/80 mx-2 rounded text-white text-sm items-center"
            >
              <UserIcon className="h-5 w-5 text-gray-300" />
              <p>Upgrade to plus</p>
            </Link>
            <Link
              href="/home"
              className="flex space-x-2 p-2 hover:bg-black/80 mx-2 rounded text-white text-sm items-center"
            >
              <MoonIcon className="h-5 w-5 text-gray-300" />
              <p>Dark Mode</p>
            </Link>
            <Link
              href="/home"
              className="flex space-x-2 p-2 hover:bg-black/80 mx-2 rounded text-white text-sm items-center"
            >
              <LinkIcon className="h-5 w-5 text-gray-300" />
              <p>Updates</p>
            </Link>
            <Link
              href="/home"
              className="flex space-x-2 p-2 hover:bg-black/80 mx-2 rounded text-white text-sm items-center"
            >
              <ArrowLeftOnRectangleIcon className="h-5 w-5 text-gray-300" />
              <p>Logout</p>
            </Link>
          </div>
        </div> */}
           </div>

      <div className="relative flex flex-1 flex-col h-full">
        {hasAnswered && (
          <div className="flex flex-col bg-white text-black">
            <div className="w-full flex items-center justify-center">
              <div className="flex space-x-4 bg-white items-center justify-between px-6 py-6 w-1/2">
                <div className="flex space-x-4 items-center">
                  <div className="h-8 w-6 bg-indigo-500 text-center p-1 px-2 rounded text-white">
                    B
                  </div>
                  <p>How does this work</p>
                </div>
                <PencilSquareIcon className="h-6 w-6" />
              </div>
            </div>
            <div className="w-full flex items-center justify-center bg-gray-200 border-t border-b border-gray-500/40">
              <div className="flex space-x-4 items-center justify-between px-6 py-6 w-1/2">
                <div className="flex space-x-4 items-center">
                  <div className="h-8 w-16 bg-teal-600 text-center p-2 rounded text-white relative">
                    <Image src="/logo.svg" fill alt="Open AI logo" />
                  </div>
                  <p>
                    I'm assuming you're referring to how I work as a language
                    model. As an AI language model, I was trained using vast
                    amounts of data from the internet, books, and other sources.
                    My training involved analyzing this data to identify
                    patterns and relationships between words and phrases, as
                    well as understanding the structure of language itself. When
                    you ask me a question or provide me with a prompt, I use my
                    knowledge of language to generate a response that is
                    relevant and meaningful. I do this by using a complex
                    algorithm
                  </p>
                </div>
                <div className="flex space-x-1">
                  <HandThumbUpIcon className="h-6 w-6" />
                  <HandThumbDownIcon className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* <div className="absolute bottom-0 inset-x-0 mx-auto px-4 py-6 max-w-3xl">
          <div className="text-black border border-gray-300 flex justify-center items-center space-x-2 shadow-md rounded px-2">
            <input className="flex-1 bg-white p-2 border-0 focus:outline-none" />
            <PaperAirplaneIcon
              className="h-4 w-4 text-right -rotate-45"
              onClick={() => setHasAnswered(true)}
            />
          </div>
        </div> */}
      </div>
          </div>

          {/* Fixed Footer */}
          <div className="modal-footer bg-white p-4">
            {/* <button className="px-4 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2">
              Action
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400"
            >
              Close
            </button> */}
             <div className="text-black border border-gray-300 flex justify-center items-center space-x-2 shadow-md rounded px-2">
            <input className="flex-1 bg-white p-2 border-0 focus:outline-none" />
            <PaperAirplaneIcon
              className="h-4 w-4 text-right -rotate-45"
              onClick={() => setHasAnswered(true)}
            />
          </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default FullScreenModal;
