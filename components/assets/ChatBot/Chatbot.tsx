"use client";

import React, { useState, useEffect } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Replace with your API key

interface ChatMessage {
  message: string;
  imageUrl?: string;
}

const Chatbot: React.FC = () => {

  const businessDetails = localStorage.getItem("businessDetails")

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    return savedMessages
      ? JSON.parse(savedMessages)
      : [
          {
            message:
              "Welcome! Please enter your business budget, location, and idea in a single message, separated by commas.",
          },
        ];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<{ [key: string]: string }>(() => {
    const savedHistory = localStorage.getItem("chatHistory");
    return savedHistory ? JSON.parse(savedHistory) : {};
  });
  const [userDetails, setUserDetails] = useState({
    budget: "",
    location: "",
    idea: "",
  });
  const [isDataCollected, setIsDataCollected] = useState(false);
  console.log("🚀 ~ isDataCollected:", isDataCollected);

  // Update local storage when messages change
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
    localStorage.setItem("chatHistory", JSON.stringify(history));
  }, [messages, history]);

  // const handleUserInput = (message: string) => {
  //   setMessages((prev) => [...prev, { message }]);
  //   if (!isDataCollected) {
  //     const parts = message.split(",").map((part) => part.trim());
  //     if (parts.length === 3) {
  //       setUserDetails({
  //         budget: parts[0],
  //         location: parts[1],
  //         idea: parts[2],
  //       });
  //       setIsDataCollected(true);
  //       generateBusinessSuggestions(parts[0], parts[1], parts[2]);
  //       // generateLogo(parts[2]);
  //     } else {
  //       setMessages((prev) => [
  //         ...prev,
  //         {
  //           message:
  //             "Please make sure to provide budget, location, and idea correctly separated by commas.",
  //         },
  //       ]);
  //     }
  //   } else {
  //     // Normal chat functionality or modify previous suggestions
  //     sendMessage(message);
  //   }
  // };

  const handleUserInput = (message: string) => {
    setMessages((prev) => [...prev, { message }]); // Adds the user's message to the chat display

    // Check if initial data is already collected
    if (!isDataCollected) {
      const parts = message.split(",").map((part) => part.trim());

      // Expecting three parts: budget, location, and idea
      if (parts.length === 3) {
        setUserDetails({
          budget: parts[0],
          location: parts[1],
          idea: parts[2],
        });
        setIsDataCollected(true); // Mark data as collected
        generateBusinessSuggestions(parts[0], parts[1], parts[2]); // Generate business suggestions based on collected data
      } else {
        // If data is not formatted correctly, request it again
        setMessages((prev) => [
          ...prev,
          {
            message:
              "Please make sure to provide budget, location, and idea correctly separated by commas.",
          },
        ]);
      }
    } else {
      // Normal chat functionality or modify previous suggestions
      sendMessage(message); // Handles regular chatting once the initial data is collected
    }
  };

  const generateLogo = async (description: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`,
          },
          body: JSON.stringify({
            model: "dall-e-3",
            prompt: `a logo for a ${description}`,
            n: 1,
            size: "1024x1024",
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message: `Here is a logo for your business idea: ${description}`,
            imageUrl: data.data[0].url,
          },
        ]);
        setHistory((prevHistory) => ({
          ...prevHistory,
          [`Logo for ${description}`]: data.data[0].url,
        }));
      } else {
        console.error("API Error:", data);
        setMessages((prevMessages) => [
          ...prevMessages,
          { message: "Failed to generate logo." },
        ]);
      }
    } catch (error) {
      console.error("Network or other error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: "Network error, please try again later." },
      ]);
    }
    setIsLoading(false);
  };

  const extractBusinessName = (content: string) => {
    // Improved regex to capture business names in various formats, including those surrounded by quotes
    const regex =
      /(?:\*\*|###)?\s*Business Name\s*(?:\*\*|###)?\s*[:]\s*(?:"?)([^"\n]+)(?:"?)[^\S\r\n]?/i;
    // Optional: Narrow down the search area if a large content string is provided
    // This example assumes "Given your startup details" starts a relevant section
    const startIndex = content.indexOf("Given your startup details");
    const relevantContent =
      startIndex !== -1 ? content.substring(startIndex) : content;

    // Apply the original regex to the potentially narrowed down content
    const match = relevantContent.match(regex);
    return match && match[1] ? match[1].trim() : null;
    // const match = content.match(regex);
    // return match && match[1] ? match[1].trim() : null;
  };

  const parseBusinessDetails = (content: any) => {
    // Logic to parse and structure the business details
    try {
      const details = JSON.parse(content); // Assuming content is JSON formatted
      console.log("Business Name:", details.businessName);
      console.log("Business Idea:", details.businessIdea);
      console.log("Business Slogan:", details.businessSlogan);
      console.log("Business Domain:", details.businessDomain);
      console.log("Business Description:", details.businessDescription);
      console.log("Business Colors:", details.businessColors);

      // Further processing can be done here based on extracted data
      return {
        businessName: details.businessName,
        businessIdea: details.businessIdea,
        businessSlogan: details.businessSlogan,
        businessDomain: details.businessDomain,
        businessDescription: details.businessDescription,
        businessColors: details.businessColors,
      };
    } catch (error) {
      console.error("Error parsing business details:", error);
      return null;
    }
  };

  const schema = {
    businessName: {
      type: "string",
      description:
        "The business name should reflect both the core business idea and its geographical location, ideally capturing the local essence and the service/product offered.",
    },
    businessIdea: {
      type: "string",
      description:
        "A clearly refined version of the original business idea, tailored to fit within the specified budget constraints, highlighting how it optimally utilizes financial resources. please be in detailed and provide a market level flow of the business and with budget spliting, and total cost calculations as per budget and if user provide a budget in other currency so please show them the currency according to the location.",
    },
    businessSlogan: {
      type: "string",
      description:
        "A memorable and catchy slogan that effectively communicates the unique value proposition of the business to its customers.",
    },
    businessDomain: {
      type: "string",
      description:
        "A proposed domain name that is not only available but also aligns closely with the business name and the core concept, facilitating easy recall and relevance.",
    },
    businessDescription: {
      type: "string",
      description:
        "A detailed description of the target audience, considering factors like demographics, interests, and the local cultural, economic, and social environment.",
    },
    businessColors: {
      type: "string",
      description:
        "A palette of brand colors that resonates with the business theme and appeals to the target audience, supporting brand identity and recognition. please provide only names of the colors.",
    },
  };

  const generateBusinessSuggestions = async (
    budget: string,
    location: string,
    idea: string
  ) => {
    setIsLoading(true);
    try {


      const prompt = `To assist in the creation of your startup, please fill out the following details based on the provided schema. Your startup's initial parameters are:
- Budget: ${budget}
- Location: ${location}
- Business Idea: ${idea}

Required Information:
1. Business Name: Choose a name that reflects both the business idea and its location, encapsulating local characteristics and the service or product offered.
2. Business Idea: Provide a refined version of your business idea, considering your budget and how it can be efficiently utilized.
3. Business Slogan: Create a catchy slogan that conveys the unique selling proposition of your business.
4. Business Domain: Suggest a domain name that is available and aligns with your business name and core concept.
5. Target Audience Description: Detail the demographic and psychographic profile of your target audience, considering the location and type of your business.
6. Brand Colors: Select a palette that matches your business theme and appeals to your target audience.

Please provide the requested details in JSON format without backticks:
${JSON.stringify(schema, null, 2)}
`;

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
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
                  `You are a business generation bot, provide detailed business suggestions as per ${schema}.`,
              },
              {
                role: "user",
                content: prompt,
              },
            ],
            max_tokens: 700,
            temperature: 0.5,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        const content = data.choices[0].message.content.trim();
        console.log("Content ----> ", content);
        // console.log("Inside JSON ___> ", content?.businessName?.description);
        // Further parsing to extract structured data
        const details = parseBusinessDetails(content);
        console.log("Details ---> ", details);
        if (details) {
          generateLogo(details?.businessName);
        }

        // const businessName = extractBusinessName(content);
        // console.log("Business Name ---> ", businessName);

        // if (businessName) {
        //   generateLogo(businessName);
        // }
        setMessages((prev) => [...prev, { message: content }]);
        setHistory((prevHistory) => ({
          ...prevHistory,
          [prompt]: content,
        }));
      } else {
        console.error("API Error:", data);
        setMessages((prev) => [
          ...prev,
          { message: "Failed to generate business suggestions." },
        ]);
      }
    } catch (error) {
      console.error("Network or other error:", error);
      setMessages((prev) => [
        ...prev,
        { message: "Network error, please try again later." },
      ]);
    }
    setIsLoading(false);
  };

  // const sendMessage = async (message: string) => {
  //   setIsLoading(true);

  //   // Check if the user wants to modify previous suggestions or just chat
  //   if (
  //     message.toLowerCase().includes("change business name") ||
  //     message.toLowerCase().includes("modify")
  //   ) {
  //     // Example: User wants to modify a business name
  //     // Call a function that might re-trigger business suggestion logic or modify specific details
  //     generateBusinessSuggestions(
  //       userDetails.budget,
  //       userDetails.location,
  //       userDetails.idea
  //     );
  //   } else {
  //     // For general queries, use OpenAI's API to generate a response
  //     const formattedHistory = messages.map((msg, idx) => ({
  //       role: idx % 2 === 0 ? "user" : "assistant",
  //       content: msg.message,
  //     }));

  //     try {
  //       const response = await fetch(
  //         "https://api.openai.com/v1/chat/completions",
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`,
  //           },
  //           body: JSON.stringify({
  //             model: "gpt-4-turbo-preview", // Adjust the model as necessary
  //             messages: [
  //               ...formattedHistory,
  //               {
  //                 role: "user",
  //                 content: message,
  //               },
  //             ],
  //             max_tokens: 1000,
  //             temperature: 0.5,
  //             top_p: 1,
  //           }),
  //         }
  //       );

  //       const data = await response.json();
  //       if (response.ok) {
  //         const responseText = data.choices[0].message.content.trim();
  //         setMessages((prevMessages) => [
  //           ...prevMessages,
  //           { message },
  //           { message: responseText },
  //         ]);
  //       } else {
  //         console.error("API Error:", data);
  //         setMessages((prevMessages) => [
  //           ...prevMessages,
  //           { message: "Sorry, I couldn't process your request." },
  //         ]);
  //       }
  //     } catch (error) {
  //       console.error("Network or other error:", error);
  //       setMessages((prevMessages) => [
  //         ...prevMessages,
  //         { message: "Network error, please try again later." },
  //       ]);
  //     }
  //   }

  //   setIsLoading(false);
  // };

  const sendMessage = async (message: string) => {
    setIsLoading(true);

    // First, check if the message has been previously responded to and use the cached response
    if (history[message]) {
      const storedResponse = history[message];
      setMessages((prevMessages) => [
        ...prevMessages,
        { message },
        { message: storedResponse },
      ]);
      setIsLoading(false);
    }
    // Check if the message is a command to generate an image
    else if (message.startsWith("/generate-image:")) {
      await generateImage(message.replace("/generate-image:", "").trim());
    }
    // Check if the user wants to modify business details or the business name
    else if (
      message.toLowerCase().includes("change business name") ||
      message.toLowerCase().includes("modify")
    ) {
      const parts = message.split(",").map((part) => part.trim());

      if (parts.length === 3) {
        setUserDetails({
          budget: parts[0],
          location: parts[1],
          idea: parts[2],
        });
        generateBusinessSuggestions(parts[0], parts[1], parts[2]);
      }
      // Re-trigger business suggestion logic or modify specific details
      // generateBusinessSuggestions(
      //   userDetails.budget,
      //   userDetails.location,
      //   userDetails.idea
      // );
    }
    // If none of the special conditions apply, handle it as a general text message
    else {
      await sendTextMessage(message);
    }
  };

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
              `you are a business generation bot , and after getting , business idea , budget and location. you will be providing detailed rescription as per ${schema}`,
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

  const generateImage = async (prompt: string) => {
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`,
        },
        body: JSON.stringify({
          model: "dall-e-3",
          prompt: prompt,
          n: 1, // Number of images to generate
          size: "1024x1024", // Image size
        }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: prompt, imageUrl: data.data[0].url },
      ]);
      setHistory((prevHistory) => ({
        ...prevHistory,
        [prompt]: data.data[0].url,
      }));
    } else {
      console.error("API Error:", data);
    }
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
      <ChatInput onMessageSubmit={handleUserInput} isLoading={isLoading}/>
    </div>
  );
};

export default Chatbot;
