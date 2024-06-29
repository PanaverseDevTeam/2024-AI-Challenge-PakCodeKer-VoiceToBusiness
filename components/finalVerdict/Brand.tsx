// nextjs
import Image from "next/image";

// types
import { formData, formDataStage1 } from "../Start/type";

// data will bring all the data from the backend through the main component, which will be displayed on the screen later
export default function Brand({ data }: { data: formDataStage1 }) {
  console.log("Brand Data ---->", data);
  return (
    <div className="flex flex-col relative h-full w-full items-center lg:rounded-[20px] lg:shadow-md lg:shadow-gray-500 lg:overflow-hidden ">
      <div className="flex flex-col items-center justify-center pt-[5%] pb-[40px]">
        <div className="text-xl text-center sm:text-[40px]">
          Here is what we think!
        </div>
      </div>
      <div className="w-auto flex flex-col mb-[85px] gap-5">
        <div className="w-full flex flex-col justify-center items-center">
          {/* Logo, the src of the Image will be replaced by data.image as per schema */}
          <Image
            src={data?.logoUrl || "/pakverse-logo.png"}
            objectFit="true"
            alt="logo"
            width={80}
            height={80}
            className="w-28 border-2 border-[#0E9F6E] shadow-lg shadow-[#0E9F6E] h-28 animate-pulse self-center rounded-full"
          />
          <label htmlFor="category" className="text-lg mb-[14px]">
            Logo
          </label>
        </div>
        <div className="flex flex-col w-full items-center justify-center">
          <label htmlFor="name" className="text-sm">
            Name
          </label>
          {/* Name, the value of the input will be replaced by data.name as per schema */}
          <div className="text-lg sm:text-2xl">
            {data.businessName.type || data.businessName}
          </div>
        </div>

        <div className="flex flex-col w-full items-center justify-center">
          <label htmlFor="name" className="text-sm">
            Slogan
          </label>
          {/* Slogan, the value of the input will be replaced by data.slogan as per schema */}
          <div className="text-lg sm:text-2xl">
            {data.businessSlogan.type || data.businessSlogan}
          </div>
        </div>
        <div className="flex flex-col w-full items-center justify-center">
          <label htmlFor="name" className="text-sm">
            Colors
          </label>
          {/* Colors, the value of the input will be replaced by data.colors as per schema */}
          <div className="text-lg sm:text-2xl flex flex-row text-center max-w-md">
            {data.businessColors.type || data.businessColors}
            {/* {data.businessColors.type && (
              <>
                {data.businessColors?.type?.map((color, index) => {
                  return (
                    <div key={index} className=" flex flex-row items-center">
                      {color} ,
                    </div>
                  );
                })}
              </>
            )} */}
            {/* {data?.businessColors && (
              <>
                {data.businessColors?.map((color, index) => {
                  return <div key={index}>{color}</div>;
                })}
              </>
            )} */}
          </div>
        </div>
        <div className="flex flex-col w-full items-center justify-center">
          <label htmlFor="name" className="text-sm">
            Domain Name
          </label>
          {/* Domain Name, the value of the input will be replaced by data.domainName as per schema */}
          <div className="text-lg sm:text-2xl">
            {data.businessDomain.type || data.businessDomain}
          </div>
        </div>
      </div>
    </div>
  );
}
