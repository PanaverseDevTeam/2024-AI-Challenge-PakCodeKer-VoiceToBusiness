"use client";

import Image from "next/image";

interface ChatMessageProps {
  message: string;
  imageUrl?: string;
  isUser: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  imageUrl,
  isUser,
}) => {
  console.log("Bussiness Data inside ----> ", message);
  // Function to render text with markdown-like formatting
  const renderFormattedText = (text: string) => {
    // Split the text into sections based on markdown patterns
    const sections = text.split(/(\*\*|###|\[|\]|\(|\)|\n|\!\[\])/g); // Splits on ** for bold, []() for links, ### for headers, and new lines
    let isBold = false;
    let isLink = false;
    let isNewLine = true;
    let linkText = "";
    let linkHref = "";

    return sections.map((section, index) => {
      if (section === "**") {
        isBold = !isBold; // Toggle bold state
        return null; // Do not render the asterisks
      }
      if (section === "###") {
        isNewLine = true; // Next text after ### should be a header
        return null; // Do not render the ###
      }
      if (section === "\n") {
        isNewLine = true; // Mark that the next text is starting on a new line
        return null; // Do not render new lines explicitly
      }
      if (section === "[") {
        isLink = true; // Start link text
        return null;
      }
      if (section === "]") {
        return null; // End link text
      }
      if (section === "(") {
        return null; // Start link href
      }
      if (section === ")") {
        isLink = false; // End link href
        return (
          <a
            href={linkHref}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
          >
            {linkText}
          </a>
        );
      }
      if (section === "![)") {
        return (
          <Image
            src={linkHref}
            alt={linkText}
            width={200}
            height={100}
            key={index}
          />
        );
      }

      if (isLink) {
        if (linkText === "") {
          linkText = section;
        } else {
          linkHref = section;
        }
        return null;
      }

      if (isNewLine && !isBold) {
        isNewLine = false; // Reset new line flag
        return <h3 key={index}>{section}</h3>; // Render as header if it's a new line after ###
      }
      if (isBold) {
        return (
          <strong key={index} className="text-xl">
            {section}
          </strong>
        ); // Render text in bold
      }
      return <span key={index}>{section}</span>; // Regular text rendering
    });
  };

  // Helper function to detect and parse JSON within the message
  const parseJSONFromMessage = (text: string) => {
    try {
      const jsonData = text.match(/{.*}/);
      return jsonData ? JSON.parse(jsonData[0]) : null;
    } catch (error) {
      console.error("Failed to parse JSON from message", error);
      return null;
    }
  };

  const renderBusinessData = (data: any) => {
    return (
      <div className="text-left space-y-2">
        <h2 className="text-2xl font-bold">
          {data.businessName?.type || data.businessName}
        </h2>
        <p>
          <strong>Location:</strong>{" "}
          {data.businessLocation?.type || data.businessLocation}
        </p>
        <p>
          <strong>Idea:</strong> {data.businessIdea?.type || data.businessIdea}
        </p>
        <p>
          <strong>Slogan:</strong>{" "}
          {data.businessSlogan?.type || data.businessSlogan}
        </p>
        <p>
          <strong>Website:</strong>{" "}
          <a
            href={`https://${data.businessDomain?.type || data.businessDomain}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {data.businessDomain?.type || data.businessDomain}
          </a>
        </p>
        <p>
          <strong>Budget:</strong>{" "}
          {data.businessBudget?.type || data.businessBudget}
        </p>
        <div>
          <strong>Colors:</strong>{" "}
          {data.businessColors?.type || data.businessColors}
        </div>
        {data?.logoUrl && (
          <Image
            src={data.logoUrl}
            alt="Business Logo"
            width={100}
            height={100}
          />
        )}
      </div>
    );
  };
  // let businessData: any = null;
  // if (!isUser) {
  //   businessData = parseJSONFromMessage(message);
  //   // businessData = renderBusinessData(message);
  // }

  // console.log("Render Business Data ----> ", businessData);

  let content;
  if (!isUser) {
    const businessData = parseJSONFromMessage(message);
    console.log("Business Data -----> ", businessData);

    if (businessData) {
      content = renderBusinessData(businessData);
      console.log("Proper Content ----> ", content);
    } else {
      content = <span>{message}</span>;
      console.log("Simple Message ----> ", content);
    }
  }

  const messageClass = `w-auto max-w-[50%] flex justify-${
    isUser ? "end" : "start"
  } text-white bg-[#131419] rounded-[20px] p-2 px-4 m-2 shadow-lg shadow-gray-500`;

  return (
    // <div className=" w-full   ">
    //   <div className={messageClass}>
    //     {/* {imageUrl && (
    //       <>
    //         <p className="text-xl font-semibold">Image Prompt:</p>
    //         <p className="font-medium">{message}</p>
    //         <Image src={imageUrl} alt="Image" width={400} height={300} />
    //       </>
    //     )} */}
    //     {/* {!imageUrl && <div>{renderFormattedText(message)}</div>} */}
    //   </div>
    // </div>
    <>
      <div className=" w-full">
        {!isUser && (
          <div className="w-full flex justify-start">
            <div className="w-auto max-w-[50%] flex justify-start text-white bg-[#0E9F6E] rounded-[20px] p-2 px-4 m-2 shadow-lg shadow-gray-500">
              <div className=" flex flex-col w-full">
                {/* {businessData ? renderBusinessData(content) : message} */}
                {content}
              </div>
            </div>
          </div>
        )}
        {isUser && (
          <>
            <div className="w-full flex justify-end">
              <div className="w-auto max-w-[50%] flex justify-end text-white bg-[#131419] rounded-[20px] p-2 px-4 m-2 shadow-lg shadow-gray-500">
                {message}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ChatMessage;
