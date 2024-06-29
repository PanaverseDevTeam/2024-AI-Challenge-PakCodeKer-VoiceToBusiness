// assets
import { Button } from "@/components/ui/button";

// react
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

// types
import { formData, formDataStage1 } from "../type";

// components
import ChatBox from "./ChatBox";
import Summary from "./Summary";
import { SunIcon } from "@radix-ui/react-icons";

export const Part3 = ({
  stage,
  setStage,
  data,
  handleChangeValues,
}: {
  stage: number;
  setStage: Dispatch<SetStateAction<number>>;
  data: formDataStage1;
  handleChangeValues: (details: any) => void;
}) => {
  // handling stages
  const onClick = () => {
    setStage((stage) => stage + 1);
    console.log(stage);
  };

  // mobile screen controls
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className=" flex flex-row justify-center px-2 sm:space-x-5">
      {/* Mobile Screen Controls */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className=" w-[50px] h-[50px] rounded-full lg:hidden text-white fixed z-50 bottom-32 right-8 bg-[#0E9F6E]/20"
      >
        <SunIcon />
      </Button>
      {/* Left Side */}
      <div className={`${isOpen ? "block" : "hidden lg:block"}`}>
        <Summary data={data} onClick={onClick} />
      </div>
      {/* Middle Border Line */}
      <div className="  h-full border-l-2 border-[#929292] hidden lg:block"></div>

      {/* Right Side */}
      <div className=" w-[95vw] lg:w-[60vw] h-[96vh] lg:h-[70vh] py-5">
        {/* Heading */}
        <div className=" w-full text-lg lg:text-xl sm:text-2xl font-semibold pb-4 flex flex-row items-center justify-center">
          <h1>Let us refine this idea!</h1>
        </div>
        {/* Chat Box */}
        <ChatBox changeValue={handleChangeValues} />
      </div>
    </div>
  );
};
