import React from "react";

export const LoadingImage = () => {
  return (
    <div className="flex flex-row gap-2">
      <div className="w-4 h-4 rounded-full bg-[#0E9F6E] animate-bounce [animation-delay:.7s]"></div>
      <div className="w-4 h-4 rounded-full bg-[#0E9F6E] animate-bounce [animation-delay:.3s]"></div>
      <div className="w-4 h-4 rounded-full bg-[#0E9F6E] animate-bounce [animation-delay:.7s]"></div>
    </div>
  );
};
