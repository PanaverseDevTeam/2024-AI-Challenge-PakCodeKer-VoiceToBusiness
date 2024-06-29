import type { NextApiRequest, NextApiResponse } from "next";
import { Ollama } from "@langchain/community/llms/ollama";
import { StreamingTextResponse } from "ai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { prompt } = req.body;

  const ollama = new Ollama({
    baseUrl: "http://localhost:11434/",
    model: "llama3", // Make sure this model name is correct
  });

  try {
    // Streaming response with proper content type
    res.writeHead(200, { "Content-Type": "text/plain" });

    const stream = await ollama.stream(prompt);

    // Handle data chunks efficiently with for...of loop
    for await (const chunk of stream) {
      res.write(chunk.toString());
    }

    res.end();
  } catch (error) {
    console.error("Error while streaming response:", error);
    res.status(500).send("Failed to generate response");
  }
}
