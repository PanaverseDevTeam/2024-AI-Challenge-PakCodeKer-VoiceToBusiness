// assets
import Button from "@/components/assets/button";
import ChatInput from "@/components/assets/ChatBot/ChatInput";
import ChatMessage from "@/components/assets/ChatBot/ChatMessage";

// types
import { formDataStage1, messages } from "../type";

// react
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useState, useRef, useEffect } from "react";

interface BusinessDetails {
  businessName: string;
  businessIdea: string;
  businessSlogan: string;
  businessDomain: string;
  businessLocation: string; // Added this field
  targetAudience: TargetAudience;
  brandColors: string[];
  businessBudget: string;
}

interface TargetAudience {
  demographic: string;
  psychographic: string;
}

interface ChatMessage {
  message: string;
  imageUrl?: string;
  role?: "user" | "assistant";
}

export default function ChatBox({ changeValue }: any) {
  // User input for chat handling
  const businessDetailsJSON = localStorage.getItem("businessDetails");
  // Initialize a default object for business details
  const defaultBusinessDetails = {
    businessIdea: "",
    businessLocation: "",
    businessBudget: "" as any,
    businessDomain: "",
    businessName: "",
    businessSlogan: "",
    businessColors: [],
  };
  // Function to determine if a string is JSON
  function isJsonString(str: string): boolean {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
  // const businessDetails: formDataStage1 = businessDetailsJSON
  //   ? JSON.parse(businessDetailsJSON)
  //   : {
  //       businessIdea: "",
  //       businessLocation: "",
  //       businessBudget: "",
  //       logoUrl: "",
  //       businessDomain: "",
  //       businessName: "",
  //       businessSlogan: "",
  //       businessColors: "",
  //     };

  // Conditionally parse the JSON string or use the default object
  const businessDetails: BusinessDetails =
    businessDetailsJSON && isJsonString(businessDetailsJSON)
      ? JSON.parse(businessDetailsJSON)
      : defaultBusinessDetails;

  const [textBox, setTextBox] = useState<string>();
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    return savedMessages
      ? JSON.parse(savedMessages)
      : [
          {
            // message: `Welcome! So you want to start ${businessDetails.businessIdea} in ${businessDetails.businessLocation}? With the budget of ${businessDetails.businessBudget}? Let me see what I can do for you.`,
            message: `So these are your business details. Just tell me to refine the business idea and I will work my magic.`,
          },
        ];
  });

  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<{ [key: string]: string }>(() => {
    const savedHistory = localStorage.getItem("chatHistory");
    return savedHistory ? JSON.parse(savedHistory) : {};
  });
  const [isDataCollected, setIsDataCollected] = useState(false);
  console.log("isDataCollected ----> ", isDataCollected);

  const [userDetails, setUserDetails] = useState<any>({
    budget: "",
    location: "",
    idea: "",
    name: "",
    slogan: "",
    domain: "",
  });

  // openAi response handling
  const [openAiResponse, setOpenAiResponse] = useState<string>();

  // dummy data to be resplaced by this state. This state will
  // update with the data incoming via user input and gpt messages.
  // Update local storage when messages change
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
    localStorage.setItem("chatHistory", JSON.stringify(history));
  }, [messages, history]);

  // creating ref for latest message view
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleUserInput = (message: string) => {
    setTextBox(""); // Clear the input field after sending the message
    // setMessages((prev) => [...prev, { message }]); // Adds the user's message to the chat display
    setMessages((prev) => [
      ...prev,
      { role: "user", message: message },
      // { role: "assistant", message: content },
    ]);

    // Check if initial data is already collected
    if (!isDataCollected) {
      const parts = [
        businessDetails.businessBudget,
        businessDetails.businessLocation,
        businessDetails.businessIdea,
      ];
      // const parts = message.split(",").map((part) => part.trim());

      // Expecting three parts: budget, location, and idea
      if (parts.length === 3) {
        setUserDetails({
          budget: parts[0],
          location: parts[1],
          idea: parts[2],
        });
        setIsDataCollected(true); // Mark data as collected
        generateBusinessSuggestions(
          parts[0] as any,
          parts[1] as any,
          parts[2] as any,
          message
        ); // Generate business suggestions based on collected data
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

  const generateLogo = async (logoGenerationText: string) => {
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
            prompt: `a logo for a ${logoGenerationText}`,
            n: 1,
            size: "1024x1024",
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        // setMessages((prevMessages) => [
        //   ...prevMessages,
        //   {
        //     message: `Here is a logo for your business idea: ${logoGenerationText}`,
        //     imageUrl: data.data[0].url,
        //   },
        // ]);
        changeValue({
          logoUrl: data.data[0].url,
        });
        const DATA = localStorage.getItem("businessDetails");
        const parseData = JSON.parse(DATA!);
        parseData.logoUrl = data.data[0].url;
        localStorage.setItem("businessDetails", JSON.stringify(parseData));
        console.log("Business Logo ----> ", data.data[0].url);

        setHistory((prevHistory) => ({
          ...prevHistory,
          [`Logo for ${logoGenerationText}`]: data.data[0].url,
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

  const parseBusinessDetails = (content: string) => {
    // Logic to parse and structure the business details
    try {
      const details: formDataStage1 = JSON.parse(content); // Assuming content is JSON formatted
      console.log("Business Name:", details.businessName);
      console.log("Business Idea:", details.businessIdea);
      console.log("Business Slogan:", details.businessSlogan);
      console.log("Business Domain:", details.businessDomain);
      console.log("Business Colors:", details.businessColors);
      console.log("Business Budget:", details.businessBudget);
      console.log("Business Location:", details.businessLocation);
      console.log("Business Logo URL:", details.logoUrl);

      // Further processing can be done here based on extracted data
      return {
        businessName: details.businessName,
        businessIdea: details.businessIdea,
        businessSlogan: details.businessSlogan,
        businessDomain: details.businessDomain,
        businessColors: details.businessColors,
        businessBudget: details.businessBudget,
        businessLocation: details.businessLocation,
        logoUrl: details.logoUrl,
      };
    } catch (error) {
      console.error("Error parsing business details:", error);
      return null;
    }
  };

  const logo_url = { logoUrl: { type: "string", url: "string" } };
  const schema = {
    messageFromModel1: {
      type: "string",
      description:
        "a custome message that be used as means of communicating your activities and insights to the user.",
    },
    businessName: {
      type: "string",
      description:
        "The business name should reflect both the core business idea and its geographical location, ideally capturing the local essence and the service/product offered.",
    },
    businessLocation: {
      type: "string",
      description: "The location of the business.",
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
    logoUrl: {
      type: "string",
      description: `Generate a logo as per prompt and pass the URL of the logo as per schema. ${logo_url}`,
    },
    businessColors: {
      type: "string",
      description:
        "A palette of brand colors that resonates with the business theme and appeals to the target audience, supporting brand identity and recognition. please provide only names of the colors.",
    },
    businessBudget: {
      type: "string",
      description: "The budget for the business , based on the location.",
    },
  };

  const schema2 = {
    messageFromModel1: { type: "string" },
    businessName: { type: "string" },
    businessLocation: { type: "string" },
    businessIdea: { type: "string" },
    businessSlogan: { type: "string" },
    businessDomain: { type: "string" },
    businessColors: {
      type: "array",
      items: {
        type: "string",
      },
    },
    businessBudget: { type: "string" },
  };

  function extractBusinessDetails(data: any): BusinessDetails | null {
    // Validate the basic structure
    // if (!data || typeof data !== "object") {
    //   console.error("Invalid data format");
    //   return null;
    // }

    // Extracting and validating specific fields
    const {
      businessName: businessName,
      businessIdea: businessIdea,
      businessSlogan: businessSlogan,
      businessDomain: businessDomain,
      businessLocation: businessLocation, // Added this line
      businessBudget: businessBudget,
      targetAudienceDescription: targetAudience,
      businessColors: brandColors,
    } = data;

    if (
      !businessName ||
      !businessIdea ||
      !businessSlogan ||
      !businessDomain ||
      !businessLocation || // Added this line
      !businessBudget ||
      !targetAudience ||
      !brandColors
    ) {
      console.error("Missing required business details");
      return null;
    }

    if (
      // !Array.isArray(brandColors) ||
      !targetAudience.demographic ||
      !targetAudience.psychographic
    ) {
      console.error(
        "Invalid types for brand colors or target audience details"
      );
      return null;
    }

    return {
      businessName,
      businessIdea,
      businessSlogan,
      businessDomain,
      businessLocation, // Added this line
      businessBudget,
      targetAudience: {
        demographic: targetAudience.demographic,
        psychographic: targetAudience.psychographic,
      },
      brandColors,
    };
  }

  // // Function to remove JavaScript single-line comments
  // function removeJSONComments(jsonString: any) {
  //   return jsonString.replace(/\/\/.*$/gm, "").trim();
  // }
  // Function to remove JavaScript single-line comments and specific strings
  // function removeJSONCommentsAndStrings(jsonString: string): string {
  //   return jsonString
  //     .replace(/`json`/g, "") // Remove `json` strings globally
  //     .replace(/\/\/.*$/gm, "") // Remove single-line comments
  //     .replace(/^`|`$/g, "") // Remove leading and trailing backticks
  //     .trim();
  // }
  function removeJSONCommentsAndStrings(jsonString: string): string {
    // Step 1: Remove `json` strings globally
    jsonString = jsonString.replace(/`json`/g, "");

    // Step 2: Remove single-line comments
    jsonString = jsonString.replace(/\/\/.*$/gm, "");

    // Step 3: Remove leading and trailing backticks
    jsonString = jsonString.replace(/^`|`$/g, "");

    // Step 4: Remove double quotes from the content of strings
    // This regex targets contents inside the double quotes
    jsonString = jsonString.replace(/"(.*?)"/g, (match, group1) => {
      return `"${group1.replace(/"/g, "")}"`; // Remove internal double quotes, preserve surrounding ones
    });

    return jsonString.trim();
  }

  const generateBusinessSuggestions = async (
    budget: string,
    location: string,
    idea: string,
    message: string
  ) => {
    setIsLoading(true);
    const schema = {
      messageFromModel1: { type: "string" },
      businessName: { type: "string" },
      businessLocation: { type: "string" },
      businessIdea: { type: "string" },
      businessSlogan: { type: "string" },
      businessDomain: { type: "string" },
      businessColors: {
        type: "string",
      },
      businessBudget: { type: "string" },
    };

    try {
      // Determine intent from the message
      const isUpdateRequest =
        message.toLowerCase().includes("update") ||
        message.toLowerCase().includes("change");
      // let prompt;
      // prompt = `
      // You are a business generation assistant. Given a budget, location, and a business idea, provide a detailed business plan that includes:
      // 1. Business Name: Reflecting the idea and location.
      // 2. Refined Business Idea: Tailored to the budget and market environment.
      // 3. Business Slogan: Catchy and relevant to the brand.
      // 4. Business Domain: Suggest a relevant and available domain name.
      // 5. Target Audience: Describe the demographic and psychographic profile.
      // 6. Brand Colors: Suggest a palette that fits the business theme.
      // 7. Budget Allocation: Explain how the budget will be utilized.

      // Details:
      // - Budget: ${budget}
      // - Location: ${location}
      // - Business Idea: ${idea}

      // Please structure your response according to the following schema:
      // ${JSON.stringify(schema, null, 2)}
      // `;

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
7. business budget : total business budget.

Please provide the requested details in JSON format without backticks:
${JSON.stringify(schema, null, 2)}
`;

      // You are a business generation bot. Provide detailed and structured business plans based on the inputs and schema provided.
      // ${JSON.stringify(schema, null, 2)}
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
                content: `You are a business generation bot. Provide detailed and structured business plans based on the inputs and schema provided`,
              },
              {
                role: "user",
                content: prompt,
              },
            ],
            max_tokens: 1000,
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
        // const details: any = parseBusinessDetails(content);
        // const details = JSON.parse(content);
        // console.log("Business Details:", details);
        const cleanJson = removeJSONCommentsAndStrings(content);
        console.log("Clean JSON ----> ", cleanJson);

        const details = JSON.parse(cleanJson);
        console.log("Business Details:", details);
        if (details) {
          localStorage.setItem("businessDetails", JSON.stringify(details));
          // generateLogo(
          //   `${details.businessIdea?.type || details.businessIdea}, ${
          //     details.businessName?.type || details.businessName
          //   }, ${details.businessSlogan?.type || details.businessSlogan}, ${
          //     details.businessColors?.type || details.businessColors
          //   }`
          // );
        }
        // const extractData = extractBusinessDetails(content);
        // console.log("Extract Data -----> ", extractData);
        // i want to start a chai selling business in turkey. i already own a place where i am selling a chai but i want my business to be online chai
        // if (extractData) {
        //   const DATA = localStorage.getItem("businessDetails");
        //   const parseData = JSON.parse(DATA!);
        //   parseData.budget = extractData.businessBudget;
        //   parseData.location = extractData.businessLocation;
        //   parseData.idea = extractData.businessIdea;
        //   parseData.domain = extractData.businessDomain;
        //   parseData.name = extractData.businessName;
        //   parseData.slogan = extractData.businessSlogan;
        //   parseData.colors = extractData.brandColors;
        //   localStorage.setItem("businessDetails", JSON.stringify(parseData));
        //   console.log("Data ---> ", DATA);
        //   console.log("Updated Data -------> ", parseData);
        // }

        // if (details) {
        //   changeValue({
        //     budget: details.businessBudget,
        //     location: details.businessLocation,
        //     idea: details.businessIdea,
        //     // logoUrl: details.logoUrl,
        //     domain: details.businessDomain,
        //     name: details.businessName,
        //     slogan: details.businessSlogan,
        //     colors: details.businessColors,
        //   });

        //   const DATA = localStorage.getItem("businessDetails");
        //   const parseData = JSON.parse(DATA!);
        //   parseData.budget = details.businessBudget;
        //   parseData.location = details.businessLocation;
        //   parseData.idea = details.businessIdea;
        //   parseData.domain = details.businessDomain;
        //   parseData.name = details.businessName;
        //   parseData.slogan = details.businessSlogan;
        //   parseData.colors = details.businessColors;
        //   localStorage.setItem("businessDetails", JSON.stringify(parseData));
        //   console.log("Data ---> ", DATA);
        //   console.log("Updated Data -------> ", parseData);

        //   // generateLogo(
        //   //   `${details.businessIdea}, ${details.businessName}, ${details.businessSlogan}, ${details.businessColors}`
        //   // );
        // }

        // const businessName = extractBusinessName(content);
        // console.log("Business Name ---> ", businessName);

        // if (businessName) {
        //   generateLogo(businessName);
        // }
        // setMessages((prev) => [...prev, { message: content }]);
        // Update the messages state with both the user's message and the assistant's response
        setMessages((prev) => [
          ...prev,
          // { role: "user", message: prompt },
          // { role: "assistant", message: JSON.parse(content).messageFromModel1 },
          { role: "assistant", message: content },
        ]);
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

  const sendMessage = async (message: string) => {
    setIsLoading(true);

    // First, check if the message has been previously responded to and use the cached response
    // if (history[message]) {
    //   const storedResponse = history[message];
    //   setMessages((prevMessages) => [
    //     ...prevMessages,
    //     { message },
    //     { message: storedResponse },
    //   ]);
    //   setIsLoading(false);
    // }
    // First, check if the message has been previously responded to and use the cached response
    if (history[message]) {
      const storedResponse = history[message];
      setMessages((prevMessages) => [
        ...prevMessages,
        // { message, role: "user" }, // User's message
        { message: storedResponse, role: "assistant" }, // Assistant's response
      ]);
      setIsLoading(false);
    }
    // Check if the message is a command to generate an image
    else if (message.startsWith("/generate-image:")) {
      await generateImage(message.replace("/generate-image:", "").trim());
    }
    // Check if the user wants to modify business details or the business name
    // else if (
    //   message.toLowerCase().includes("modify") ||
    //   // message.toLowerCase().includes("change")
    // ) {
    //   // const parts = message.split(",").map((part) => part.trim());/
    //   // const parts = [
    //   //   businessDetails.businessBudget?.type || businessDetails.businessBudget,
    //   //   businessDetails.businessLocation?.type ||
    //   //     businessDetails.businessLocation,
    //   //   businessDetails.businessIdea?.type || businessDetails.businessIdea,
    //   // ];
    //   // console.log("Parts inside SendMessage function ----> ", parts);
    //   // if (parts.length === 3) {
    //   //   setUserDetails({
    //   //     budget: parts[0],
    //   //     location: parts[1],
    //   //     idea: parts[2],
    //   //   });
    //   //   generateBusinessSuggestions(
    //   //     parts[0] as any,
    //   //     parts[1] as any,
    //   //     parts[2] as any,
    //   //     message
    //   //   );
    //   // }
    //   // Re-trigger business suggestion logic or modify specific details
    //   // generateBusinessSuggestions(
    //   //   userDetails.budget,
    //   //   userDetails.location,
    //   //   userDetails.idea
    //   // );
    // }
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
    console.log("Working this function ----> ");

    const schema = {
      messageFromModel1: { type: "string" },
      businessName: { type: "string" },
      businessLocation: { type: "string" },
      businessIdea: { type: "string" },
      businessSlogan: { type: "string" },
      businessDomain: { type: "string" },
      businessColors: {
        type: "string",
      },
      businessBudget: { type: "string" },
    };

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
            content: `you are a business generation bot , and after getting , business idea , budget and location. you will be providing  suitable name, refined business idea , slogan , business domain name . target audience , as per their business location . Please provide the requested details in JSON format without backticks:
            ${JSON.stringify(schema, null, 2)} `,
          },
          ...formattedHistory,
          {
            role: "user",
            content: message,
          },
        ],
        max_tokens: 1000,
        temperature: 0.5,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      const responseText = data.choices[0].message.content.trim();
      console.log("Content of sendTextMessage function ---->", responseText);
      const cleanJson = removeJSONCommentsAndStrings(responseText);
      console.log("Clean JSON --->", cleanJson);

      // const details = JSON?.parse(cleanJson);
      // console.log("Business Details:", details);
      // if (details) {
      //   localStorage.setItem("businessDetails", JSON.stringify(details));
      // }
      // Attempt to determine if the cleanJson can be parsed as JSON
      let details;
      try {
        details = JSON.parse(cleanJson);
        console.log("Parsed JSON data:", details);
      } catch (error) {
        // If it fails, it means cleanJson was just a string, not a JSON string
        console.log("Data is not in JSON format, using as plain string.");
        details = cleanJson; // Use the cleaned string directly if it's not JSON
      }

      // Proceed with using the details, checking if it's an object to stringify
      if (details) {
        if (typeof details === "object") {
          localStorage.setItem("businessDetails", JSON.stringify(details));
        }
        // else {
        //   localStorage.setItem("businessDetails", details);
        // }
      }
      // setMessages((prevMessages) => [
      //   ...prevMessages,
      //   { message },
      //   { message: responseText },
      // ]);
      setMessages((prev) => [
        ...prev,
        // { role: "user", message: message },
        { role: "assistant", message: responseText },
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
      // setMessages((prevMessages) => [
      //   ...prevMessages,
      //   { message: prompt, imageUrl: data.data[0].url },
      // ]);
      // Update the messages state with the user's message and the generated image
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", message: prompt },
        { role: "assistant", message: "", imageUrl: data.data[0].url },
      ]);
      setHistory((prevHistory) => ({
        ...prevHistory,
        [prompt]: data.data[0].url,
      }));
    } else {
      console.error("API Error:", data);
    }
  };

  const promptButtons = [
    "Tell me more about your business idea.",
    "What's the budget for your project?",
    "Can you provide details about your target audience?",
    "I need help with a business slogan.",
  ];

  return (
    <div className="w-full h-full">
      <div className="flex flex-col h-[80%] lg:h-[100%] w-[100%] chat-box overflow-y-scroll">
        {/* Chat messages */}
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.message}
            imageUrl={message.imageUrl}
            // isUser={index % 2 === 0}
            isUser={message.role === "user"}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      {messages.length === 1 && ( // Conditionally render prompt buttons
        <div className="prompt-buttons-grid -mt-48 sm:-mt-36 p-1 grid grid-cols-2 gap-2 max-w-[585px] mx-auto">
          {promptButtons.map((prompt, index) => (
            <Button
              key={index}
              onClick={() => setTextBox(prompt)}
              className="text-sm py-2 px-4 bg-transparent text-[#828282] rounded  transition-colors duration-300"
            >
              {prompt}
            </Button>
          ))}
        </div>
      )}

      <div className="w-full flex justify-center items-center mb-[10px]">
        {/* User input */}
        <div className="flex flex-col w-full justify-center items-center">
          <label htmlFor="businessBudget" className="text-sm p-2">
            Type here
          </label>

          {/* testing OpenAi response. This will be replaced with the incoming messages from openai */}
          <ChatInput
            value={textBox}
            onChange={setTextBox}
            onMessageSubmit={handleUserInput}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
