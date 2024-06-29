"use client";
import { FinalVerdict } from "@/components/finalVerdict";
import React from "react";

import { formDataStage1, formDataStage2 } from "@/components/Start/type";
import Link from "next/link";
interface BusinessDetails {
  businessName: string;
  businessIdea: string;
  businessSlogan: string;
  businessDomain: string;
  businessLocation: string; // Added this field
  targetAudience: TargetAudience;
  businessColors: string[];
  businessBudget: string;
  logoUrl: string;
}

interface TargetAudience {
  demographic: string;
  psychographic: string;
}

const State2Page = () => {
  // User input for chat handling
  const businessDetailsJSON = localStorage.getItem("businessDetails");
  // Initialize a default object for business details
  const defaultBusinessDetails = {
    businessIdea: "",
    businessLocation: "",
    businessBudget: "" as any,
    businessDomain: "",
    businessName: "",
    businessSlogan: "",
    businessColors: [],
  };
  // Function to determine if a string is JSON
  function isJsonString(str: string): boolean {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  const businessDetails: BusinessDetails =
    businessDetailsJSON && isJsonString(businessDetailsJSON)
      ? JSON.parse(businessDetailsJSON)
      : defaultBusinessDetails;

  const data: formDataStage2 = {
    aboutUs: "string",
    marketingStrategy: "string",
    businessRisks: "string",
    policies: "string",
    legalIssues: "string",
  };

  const dataForBrand: formDataStage1 = {
    businessLocation:
      businessDetails.businessLocation?.type ||
      businessDetails.businessLocation,
    businessBudget:
      businessDetails.businessBudget?.type || businessDetails.businessBudget,
    businessIdea:
      businessDetails.businessIdea?.type || businessDetails.businessIdea,
    businessDomain:
      businessDetails.businessDomain?.type || businessDetails.businessDomain,
    logoUrl: businessDetails.logoUrl,
    businessName:
      businessDetails.businessName?.type || businessDetails.businessName,
    businessSlogan:
      businessDetails.businessSlogan?.type || businessDetails.businessSlogan,
    businessColors:
      businessDetails.businessColors?.type || businessDetails.businessColors,
  };

  return (
    <div className="h-screen w-full flex flex-col items-center text-[#828282] bg-gradient-to-br from-white via-white to-[#828282] justify-start lg:justify-center">
      <FinalVerdict data={data} dataForBrand={businessDetails} />
      <Link href={"/"}>Back to start?</Link>
    </div>
  );
};

export default State2Page;
