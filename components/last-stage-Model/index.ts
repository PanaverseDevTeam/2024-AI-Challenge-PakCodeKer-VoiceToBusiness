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

export const sendTextMessage = async (message?: string) => {
  // const formattedHistory = messages.map((msg, idx) => ({
  //   role: idx % 2 === 0 ? "user" : "assistant",
  //   content: msg.message,
  // }));
  console.log("Policy generator Start ----> ");

  const schema = {
    marketingStrategy: {
      type: "string",
    },
    businessRisks: {
      type: "string",
    },
    policies: {
      type: "string",
    },
    legalIssues: {
      type: "string",
    },
    aboutUs: {
      type: "string",
      description: "About us as per defined in the document {B}",
    },
  };

  const DATA = localStorage.getItem("businessDetails");
  const businessDetails = DATA ? JSON.parse(DATA) : {}; // Assuming DATA is a JSON string of business details

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
          content: `Create detailed documents for our business with the following sections:
          1. About Us: Provide a brief history and mission statement of our business.
          2. Marketing Strategy: Outline our primary marketing strategies and goals.
          3. Business Policy: Describe our core business policies.
          4. Business Risks: Identify potential risks in our business model.
          5. Legal Issues: Discuss any potential legal concerns we should be aware of.
          Business Details: ${JSON.stringify(businessDetails, null, 2)} 
          Please provide the requested details in JSON format without backticks: ${JSON.stringify(
            schema,
            null,
            2
          )}`,
        },
        {
          role: "user",
          content: `Generate detailed business-related content based on the previous data (business about us , marketing strategy , business risk, policy, legal issues)  create  this data with Comprehensive overview and strategic insights for the above schema ${JSON.stringify(
            schema,
            null,
            2
          )} :`,
        },
      ],
      max_tokens: 1500,
      temperature: 0.5,
    }),
  });

  const data = await response.json();
  if (response.ok) {
    const responseText = data.choices[0].message.content.trim();
    console.log("Content of Policy Generator function ---->", responseText);
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
        localStorage.setItem("policy_data", JSON.stringify(details));
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
    //   setMessages((prev) => [
    //     ...prev,
    //     // { role: "user", message: message },
    //     { role: "assistant", message: responseText },
    //   ]);
    //   setHistory((prevHistory) => ({
    //     ...prevHistory,
    //     [message]: responseText,
    //   }));
  } else {
    console.error("API Error:", data);
  }
  // setIsLoading(false);
};
