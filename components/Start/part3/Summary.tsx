// assets
import Button from "@/components/assets/button";

// next
import Image from "next/image";

// types
import { formData, formDataStage1 } from "../type";
import Link from "next/link";
import { sendTextMessage } from "@/components/last-stage-Model";

export default function Summary({
  onClick,
  data,
}: {
  onClick: () => void;
  data: formDataStage1;
}) {
  // Retrieve and parse the stored data
  const rawData = localStorage.getItem("businessDetails");
  // const Data = rawData ? JSON.parse(rawData) : null;
  const Data = JSON.parse(rawData!);

  // Log data for debugging
  console.log("Summary Data ---> ", Data);
  if (Data) {
    console.log(
      "Location ----> ",
      Data.businessLocation?.type || Data.businessLocation
    );
  }

  return (
    <div className=" w-full lg:w-[25vw] text-center bg-[#0E9F6E] lg:bg-[#0E9F6E]/80 shadow-2xl shadow-black border-2 border-[#0E9F6E] absolute top-0 left-0 flex flex-col items-center  h-full lg:h-[90vh] lg:rounded-xl lg:relative">
      {/* this button will finalize all the inputs and will send the 
      data to the backend for final generation of the business idea */}
      <Link
        href={"/finalVerdict"}
        className="text-base flex items-center justify-center shadow-sm hover:shadow-lg w-40 h-[40px] shadow-gray-600 hover:shadow-white border-none font-semibold rounded-[20px] text-gray-50 absolute bottom-[5%] hover:bg-[#3dcdbc] bg-[#3ec1ab]"
        onClick={() => {
          if (Data) {
            sendTextMessage();
            localStorage.setItem('chatMessages', '')
          } else {
            console.log("Function nhi chala Be , Plug shaat hay USTAD ! ");
          }
        }}
      >
        GO!
      </Link>

      <div className=" flex flex-col text-xs w-full items-center justify-center">
        <div className="w-[90%] flex flex-col  mb-[15px] mt-[5%]">
          {/* Business Location. Can be changed as per devised by our model. */}
          <label
            htmlFor="businessLocation"
            className=" lg:text-base text-white font-semibold"
          >
            Business Location
          </label>
          <text
            id="businessLocation"
            name="businessLocation"
            className="w-full text-gray-50 rounded-[10px] p-2"
          >
            {/* {data.businessLocation} */}
            {Data?.businessLocation?.type || Data?.businessLocation}
          </text>
        </div>

        {/* Business Budget. Can be changed as per devised by our model. */}
        <div className="w-[90%] flex flex-col mb-[15px]">
          <label
            htmlFor="businessBudget"
            className=" lg:text-base text-white font-semibold"
          >
            Business Budget
          </label>
          <text
            id="businessBudget"
            name="businessBudget"
            type="text"
            className="w-full  text-gray-50 rounded-[10px] p-2"
          >
            {/* PKR {data.businessBudget} */}
            {Data?.businessBudget?.type || Data?.businessBudget}
          </text>
        </div>

        {/* Logo displayed */}
        <Image
          src={Data?.logoUrl || "/pakverse-logo.png"}
          objectFit="true"
          alt="logo"
          width={150}
          height={150}
          className=" border-2 border-[#ffffff] shadow-lg shadow-[#0E9F6E] size-[70px] self-center rounded-full bg-white mb-4"
        />

        {/* Business Idea. Can be changed as per devised by our model. */}
        <div className="w-[90%] flex flex-col mb-[85px]">
          <label
            htmlFor="businessIdea"
            className=" lg:text-base text-white font-semibold"
          >
            Business Idea
          </label>
          <div
            id="businessIdea"
            className="w-full max-w-[493px] self-center text-gray-50 rounded-[10px] p-2"
          >
            {/* {data.businessIdea} */}
            {Data?.businessIdea?.type || Data?.businessIdea}
          </div>
        </div>
      </div>
    </div>
  );
}
