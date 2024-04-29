"use client";
import React, { useState, useRef, useEffect } from "react";
import Cookies from "js-cookie";
import { CHAT_API } from "@/apiConfig";

const currentUserImageUrl = "https://via.placeholder.com/50";
const otherUserImageUrl = "https://via.placeholder.com/50";

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<any>([]);
  const cookieToken = Cookies.get("token") || "{}";
  const cookieUser = Cookies.get("user") || "{}";
  const authUser = JSON.parse(cookieUser);
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  // console.log(cookieUser);

  useEffect(() => {
    const fetchChat = async () => {
      const res = await fetch(`${CHAT_API}`, {
        headers: {
          Authorization: `${cookieToken}`,
        },
      });
      const chatMgs = await res.json();
      // console.log(chatMgs);
      setMessages(chatMgs);
    };
    fetchChat();
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (currentMessage.trim() !== "") {
      const res = await fetch(CHAT_API, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `${cookieToken}`,
        },
        body: JSON.stringify({
          message: currentMessage,
          userName: authUser.name || "",
        }),
      });
      const data = await res.json();
      console.log({ data });

      setCurrentMessage("");
    }
  };

  return (
    <div className="flex flex-col h-[90vh]">
      <div className="bg-gray-100 text-black flex-grow p-4 overflow-y-auto">
        <div className="flex flex-col h-full">
          {messages?.map((message: any, index: any) => (
            <div
              key={index}
              className={`mb-2 ${
                message.userName === authUser.name
                  ? "self-end"
                  : "self-start flex-row-reverse"
              } flex items-center gap-2`}
            >
              <div
                className={`bg-gray-200 p-2 rounded-lg ${
                  message.userName === authUser.name ? "bg-blue-300" : ""
                }`}
              >
                <span>{message.message}</span>
              </div>
              {/* <img
                src={
                  //@ts-ignore
                  message.isCurrentUser
                    ? currentUserImageUrl
                    : otherUserImageUrl
                }
                alt="User"
                className="w-8 h-8 rounded-full mr-2"
              /> */}
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold uppercase text-white">
                {message.userName.slice(0, 1)}
              </div>
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

export default ChatPage;
