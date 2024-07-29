"use client";

import Image from "next/image";
import { useContext, useEffect, useState } from "react";

// import sal from "sal.js";

import DocImg from "../../public/images/icons/document-file.png";

import { PgpGptContext } from "@/app/context/PgpGptContext";
import Reaction from "@/components/Common/Reaction";
import TopBar from "@/components/Common/TopBar";

const GptGenerator = () => {
  const { chatHistory,currentChatSession } = useContext(PgpGptContext);

  const [editableIndex, setEditableIndex] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [textGeneratorData, setTextGeneratorData] = useState([]);


  useEffect(() => {
    if (chatHistory) {
      setTextGeneratorData(chatHistory);
    }
  }, [chatHistory]);

  const handleEdit = (index) => {
    setEditableIndex(index);
    setEditedText(textGeneratorData[index].content);
  };

  const handleSave = (index) => {
    const newTextGeneratorData = [...textGeneratorData];
    newTextGeneratorData[index].content = editedText;
    setTextGeneratorData(newTextGeneratorData);
    setEditableIndex(null);
  };

  const handleCancel = () => {
    setEditableIndex(null);
    setEditedText("");
  };

  return (
    <>
      <TopBar
        barImg={DocImg}
        title={currentChatSession?.title}
        wdt={14}
        htd={18}
      />
      {textGeneratorData &&
        textGeneratorData.slice()
        .reverse().map((data, index) => (
          <div className="chat-box-list pb-0" id="chatContainer" key={index}>
            {data.role === "user" && (<div className="chat-box author-speech">
              <div className="inner">
                <div className="chat-section">
                  <div className="author">
                    <Image
                      className="w-100"
                      width={40}
                      height={40}
                      src={"/images/team/team-01sm.jpg"} // Placeholder for author image
                      alt="Author"
                    />
                  </div>
                  <div className="chat-content">
                    <h6 className="title">{data.role}</h6>
                    {editableIndex === index ? (
                      <textarea
                        className="editable my-4"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                      />
                    ) : (
                      <p className="editable me-4">{data.content}</p>
                    )}

                    <div
                      className={`edit-actions ms-0 ${editableIndex !== null ? "d-inline-flex ms-0" : ""
                        }`}
                    >
                      <button
                        className="edit-btn btn-default btn-small btn-border"
                        onClick={() => handleEdit(index)}
                      >
                        <span className="text">Edit</span>
                      </button>
                      <button
                        className="save-regenerate-btn btn-default btn-small"
                        onClick={() => handleSave(index)}
                      >
                        <span className="text">Save &amp; Regenerate</span>
                      </button>
                      <button
                        className="cancel-btn btn-default btn-small btn-border"
                        onClick={handleCancel}
                      >
                        <span className="text">Cancel</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            )}
            {data.role === "ai" && (<div
              className={`chat-box ai-speech ${index === textGeneratorData.length - 1 ? "" : "chat-border-bottom"
                }`}
            >

              <div className="inner">
                <div className="chat-section">
                  <div className="author">
                    <Image
                      className="w-100"
                      src={"/images/team/avater.png"} // Placeholder for AI image
                      width={40}
                      height={40}
                      alt="PGPGPT"
                    />
                  </div>    
                  <div className="chat-content">
                    <h6 className="title">
                      GPT 3.5
                      <span className="rainbow-badge-card">
                        <i className="fa-sharp fa-regular fa-check"></i>
                        Bot
                      </span>
                    </h6>
                    <p className="">{data.content}</p>
                    <Reaction />
                  </div>
                </div>
              </div>

            </div>
            )}
          </div>
        ))}
    </>
  );
};

export default GptGenerator;
