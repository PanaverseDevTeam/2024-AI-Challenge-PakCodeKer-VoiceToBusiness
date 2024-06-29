"use client";

import ChatInput from "@/components/assets/ChatBot/ChatInput";
import ChatMessage from "@/components/assets/ChatBot/ChatMessage";
import React, { useEffect, useState } from "react";

interface ChatMessage {
  message: string;
  imageUrl?: string;
}
export const State2ChatBot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    return savedMessages
      ? JSON.parse(savedMessages)
      : [
          {
            message: "About Us !",
          },
        ];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<{ [key: string]: string }>(() => {
    const savedHistory = localStorage.getItem("chatHistory");
    return savedHistory ? JSON.parse(savedHistory) : {};
  });

  const businessDetails = localStorage.getItem("businessDetails")

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
    localStorage.setItem("chatHistory", JSON.stringify(history));
  }, [messages, history]);

  const handleUserInput = async (message: string) => {};

  const sendTextMessage = async (message: string) => {
    const formattedHistory = messages.map((msg, idx) => ({
      role: idx % 2 === 0 ? "user" : "assistant",
      content: msg.message,
    }));

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4-turbo-preview",
        messages: [
          {
            role: "system",
            content:
              "you are a business generation bot , and after getting the business idea , domain , business name , slogans, target audience , you will create a about us for that business/company with that data.",
          },
          ...formattedHistory,
          {
            role: "user",
            content: message,
          },
        ],
        max_tokens: 1000,
        temperature: 0.3,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      const responseText = data.choices[0].message.content.trim();
      setMessages((prevMessages) => [
        ...prevMessages,
        { message },
        { message: responseText },
      ]);
      setHistory((prevHistory) => ({
        ...prevHistory,
        [message]: responseText,
      }));
    } else {
      console.error("API Error:", data);
    }
    setIsLoading(false);
  };
  return (
    <div className="flex flex-col h-screen px-4 py-8 text-black">
      <div className="flex-grow overflow-y-auto">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.message}
            imageUrl={message.imageUrl}
            isUser={index % 2 === 0}
          />
        ))}
        {isLoading && (
          <p className="text-center text-black text-2xl">Thinking...</p>
        )}
      </div>
      {/* <ChatInput onMessageSubmit={sendMessage} /> */}
      <ChatInput onMessageSubmit={sendTextMessage} isLoading={isLoading} />
    </div>
  );
};
