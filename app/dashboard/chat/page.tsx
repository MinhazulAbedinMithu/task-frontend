"use client";
import React, { useState, useRef, useEffect } from "react";

const currentUserImageUrl = "https://via.placeholder.com/50";
const otherUserImageUrl = "https://via.placeholder.com/50";

const Page: React.FC = () => {
  const [messages, setMessages] = useState<
    { text: string; isCurrentUser: boolean }[]
  >([]);
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (currentMessage.trim() !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: currentMessage.trim(), isCurrentUser: true },
      ]);
      setCurrentMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-gray-100 text-black flex-grow p-4 overflow-y-auto">
        <div className="flex flex-col h-full">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-2 ${
                message.isCurrentUser ? "self-end" : "self-start"
              } flex items-center gap-2`}
            >
              <div
                className={`bg-gray-200 p-2 rounded-lg ${
                  message.isCurrentUser ? "bg-blue-300" : ""
                }`}
              >
                <span>{message.text}</span>
              </div>
              <img
                src={
                  message.isCurrentUser
                    ? currentUserImageUrl
                    : otherUserImageUrl
                }
                alt="User"
                className="w-8 h-8 rounded-full mr-2"
              />
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="bg-slate-500 p-4">
        <div className="flex">
          <input
            type="text"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow bg-slate-100 text-black p-2 rounded-l-md focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-r-md"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
