"use client";

// react
import React, { useState } from "react";

// sub-components
import Part1 from "./part1";
import Part2 from "./part2";
import { Part3 } from "./part3";

// libraries
import { useFormik } from "formik";

// types
import { formData, formDataStage1 } from "./type";
import { IStageComponents } from "./type";

// icons
import { CaretLeftIcon } from "@radix-ui/react-icons";

// stages can only be one the following
const stageComponents: IStageComponents = {
  0: Part1,
  1: Part2,
  2: Part3,
};

// main page of our application
const Start = () => {
  // handling stages of the page
  const [stage, setStage] = useState(0);
  const CurrentStageComponent = stageComponents[stage];

  // formData and data from GPT should align
  const formik = useFormik<formDataStage1>({
    enableReinitialize: true,
    initialValues: {
      businessLocation: "",
      businessBudget: "" as any,
      businessIdea: "",
      businessDomain: "",
      logoUrl: "",
      businessName: "",
      businessSlogan: "",
      businessColors: [""],
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  const handleChatInput = (details: {
    budget: number;
    location: string;
    idea: string;
    logoUrl: string;
    domain: string;
    name: string;
    slogan: string;
    colors: string[];
  }) => {
    formik.setValues({
      businessBudget: details.budget,
      businessLocation: details.location,
      businessIdea: details.idea,
      logoUrl: details.logoUrl,
      businessDomain: details.domain,
      businessName: details.name,
      businessSlogan: details.slogan,
      businessColors: details.colors,
    });
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="h-screen w-full flex flex-col items-center text-[#828282] bg-gradient-to-br from-white via-white to-[#828282] justify-start lg:justify-center"
    >
      {/* setting stages */}
      {CurrentStageComponent ? (
        <CurrentStageComponent
          stage={stage}
          setStage={setStage}
          onChange={formik.handleChange}
          data={formik.values}
          handleChangeValues={handleChatInput}
        />
      ) : (
        "Form Completed"
      )}

      {/* Temporary button to console.log formdata at any stage */}
      {/* <button
        onClick={() => console.log(formik)}
        type="submit"
        className="absolute top-4 right-4 inset-x-auto px-4 py-2 rounded-full border-2"
      >
        Data forged
      </button> */}

      {/* A back button to go back to previous stage */}
      <button
        onClick={() => setStage(stage - 1)}
        className={`${
          stage >= 1
            ? "absolute top-4 left-4 inset-x-auto px-4 py-2 rounded-full border-2"
            : "hidden"
        } `}
      >
        <CaretLeftIcon />
      </button>
    </form>
  );
};

export default Start;
