"use client";

import ChatInput from "@/components/assets/ChatBot/ChatInput";
import ChatMessage from "@/components/assets/ChatBot/ChatMessage";
import React, { useEffect, useRef, useState } from "react";

interface ChatMessage {
  message: string;
  imageUrl?: string;
}

const Stage3Chatbot = () => {
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

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
    localStorage.setItem("chatHistory", JSON.stringify(history));
  }, [messages, history]);

  const addMessage = (msg: any) => {
    setMessages((prev) => [...prev, msg]);
    setHistory((prevHistory) => ({
      ...prevHistory,
      [msg.message]: msg.message,
    }));
    // processMessage(msg);
  };

  const sendTextMessage = async (text: string) => {
    setIsLoading(true);
    console.log("Text =---> ", text);

    try {
      // Step 1: Create a Thread
      let threadId = localStorage.getItem("threadId"); // Check if we already have a thread ID stored
      if (!threadId) {
        const threadResponse = await fetch(
          "https://api.openai.com/v1/threads",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`,
              "Content-Type": "application/json",
              "OpenAI-Beta": "assistants=v1",
            },
          }
        );

        if (!threadResponse.ok) throw new Error("Failed to create thread");

        const threadData = await threadResponse.json();
        console.log("🚀 ~ sendTextMessage ~ threadData:", threadData);
        threadId = threadData.id;
        localStorage.setItem("threadId", threadId!); // Save the new thread ID to local storage
      }

      const DATA = localStorage.getItem("businessDetails");
      const businessDetails = DATA ? JSON.parse(DATA) : {}; // Assuming DATA is a JSON string of business details
      console.log("Details ----> ", DATA);

      const detailedRequest = `
      Create detailed documents for our business with the following sections:
      1. About Us: Provide a brief history and mission statement of our business.
      2. Marketing Strategy: Outline our primary marketing strategies and goals.
      3. Business Policy: Describe our core business policies.
      4. Business Risks: Identify potential risks in our business model.
      5. Legal Issues: Discuss any potential legal concerns we should be aware of.
      Business Details: ${JSON.stringify(DATA)} 
      `;
      // Step 2: Add Message to Thread
      const messageResponse = await fetch(
        `https://api.openai.com/v1/threads/${threadId}/messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`,
            "Content-Type": "application/json",
            "OpenAI-Beta": "assistants=v1",
          },
          body: JSON.stringify({
            role: "user",
            // content: text,
            content: detailedRequest,
          }),
        }
      );
      console.log("messageResponse ---?", await messageResponse.json());

      if (!messageResponse.ok)
        throw new Error("Failed to add message to thread");

      // Add user's message to state
      addMessage({ role: "user", content: text });
      // Step 3: Create a Run
      const runResponse = await fetch(
        `https://api.openai.com/v1/threads/${threadId}/runs`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`,
            "Content-Type": "application/json",
            "OpenAI-Beta": "assistants=v1",
          },
          body: JSON.stringify({
            assistant_id: "asst_SeWvyH9rNr0lQVvuXz7U0G68",
            instructions: "Please respond to the user's question.",
          }),
        }
      );

      if (!runResponse.ok) throw new Error("Failed to create run");

      const runData = await runResponse.json();
      console.log("🚀 ~ sendTextMessage ~ runData:", runData);
      console.log("Run created with ID:", runData.id);

      // Polling to check the status of the run
      let runStatus = runData.status;
      while (runStatus === "queued" || runStatus === "in_progress") {
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds before checking again
        const statusResponse = await fetch(
          `https://api.openai.com/v1/threads/${threadId}/runs/${runData.id}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`,
              "Content-Type": "application/json",
              "OpenAI-Beta": "assistants=v1",
            },
          }
        );

        const statusData = await statusResponse.json();
        console.log("🚀 ~ sendTextMessage ~ statusData:", statusData);
        runStatus = statusData.status;
        if (runStatus === "completed") {
          const messagesResponse = await fetch(
            `https://api.openai.com/v1/threads/${threadId}/messages`,
            {
              headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`,
                "Content-Type": "application/json",
                "OpenAI-Beta": "assistants=v1",
              },
            }
          );
          const messagesData = await messagesResponse.json();
          console.log("🚀 ~ sendTextMessage ~ messagesData:", messagesData);
          // messagesData.data.forEach((msg: any) => {
          //   if (msg.content && msg.content.length > 0) {
          //     msg.content.forEach((content: any) => {
          //       if (content.type === "text") {
          //         addMessage({ message: content.text.value });
          //       }
          //     });
          //   }
          // });
          messagesData.data.forEach((msg: any) => {
            if (
              msg.role === "assistant" &&
              msg.content &&
              msg.content.length > 0
            ) {
              msg.content.forEach((content: any) => {
                if (content.type === "text") {
                  addMessage({
                    role: "assistant",
                    content: content.text.value,
                  });
                }
              });
            }
          });

          break;
        }
      }
    } catch (error) {
      console.error("Error:", error);
      addMessage({ role: "assistant", content: "Failed to get response." });
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

export default Stage3Chatbot;
