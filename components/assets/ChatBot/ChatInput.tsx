" use client";
import { PaperPlaneIcon, SymbolIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import Button from "../button";

interface ChatInputProps {
  onMessageSubmit: (message: string) => void;
  isLoading: boolean;
  value?: string; // Corrected from `Value`
  onChange?: (message: string) => void; // Corrected type from `string` to a function
}

const ChatInput: React.FC<ChatInputProps> = ({
  onMessageSubmit,
  isLoading,
  value,
  onChange,
}) => {
  const [message, setMessage] = useState(value || "");
  const minRows = 1;
  const maxRows = 8;
  console.log("Value ---->", value);

  useEffect(() => {
    setMessage(value || "");
  }, [value]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() !== "") {
      onMessageSubmit(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent default to avoid a new line in textarea
      if (message.trim() !== "") {
        onMessageSubmit(message);
        setMessage("");
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.currentTarget.value);
    onChange && onChange(e.currentTarget.value); // Propagate changes if onChange is provided
  };

  const calculateRows = (message: string) => {
    const newlines = message.split("\n").length;
    return Math.min(Math.max(newlines, minRows), maxRows);
  };

  return (
    <form
      className="flex w-[300px] md:w-[450px] lg:w-[600px] items-center justify-center gap-2"
      onSubmit={handleSubmit}
    >
      <textarea
        className="flex-grow text-gray-800 bg-[#BFBFBF] shadow-inner shadow-gray-600 rounded-[10px] px-2 border-2 hover:border-gray-800 transition-all duration-700 min-h-[30px] p-2"
        id="businessBudget"
        name="businessBudget"
        value={message}
        // onChange={(e) => setMessage(e.currentTarget.value)}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        rows={calculateRows(message)}
      />
      <Button type="submit" className="w-6 h-6 bg-transparent border-none">
        {isLoading ? (
          <SymbolIcon className="text-[#0E9F6E] w-6 h-6 animate-spin" />
        ) : (
          <PaperPlaneIcon className="text-[#0E9F6E] w-6 h-6" />
        )}
      </Button>
    </form>
  );
};

export default ChatInput;
