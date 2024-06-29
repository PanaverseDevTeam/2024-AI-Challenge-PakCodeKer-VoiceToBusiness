import React from "react";

export const Heading = () => {
  return (
    <div className="max-w-xl mx-auto text-center">
      {/* <div className="inline-flex px-4 py-1.5 mx-auto rounded-full bg-gradient-to-r from-green-600 to-lime-600">
        <p className="text-xs font-semibold tracking-widest text-white uppercase">
          Our Key Features
        </p>
      </div> */}
      <h2 className="mt-6 text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-gray-200 h-[110px]">
        This is how briX works using GenAI
      </h2>
      {/* <p className="mt-4 text-base leading-relaxed text-gray-600">
        Explore the cutting-edge tools and services we offer to revolutionize
        your business operations.
      </p> */}
    </div>
  );
};
