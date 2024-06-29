// react
import { ChangeEvent } from "react";

// our main data type
export type formData = {
  businessLocation: string;
  businessBudget: number;
  businessIdea: string;
  category: string;
  startup: {
    name: string;
    category: string;
    idea: string;
  };
};
// our main data type
export type formDataStage1 = {
  businessLocation: string;
  businessBudget: number;
  businessIdea: string;
  businessDomain: string;
  logoUrl?: string;
  businessName: string;
  businessSlogan: string;
  businessColors: string[];
};

export type formDataStage2 = {
  aboutUs: string;
  marketingStrategy: string;
  businessRisks: string;
  policies: string;
  legalIssues: string;
};

// type for all the stages
export interface IStageComponents {
  [key: number]: React.FC<{
    stage: number;
    setStage: React.Dispatch<React.SetStateAction<number>>;
    onChange: (e: ChangeEvent<any>) => void;
    data: formDataStage1;
    handleChangeValues: (details: any) => void;
  }>;
}

// type for the messages that will be taken from API and disbersed in chat during first stage
export type messages = {
  role: "system" | "user" | "assistant";
  content: string;
  url?: string;
};

// type for the countries for the API
export interface country {
  name: string;
  flag: string;
  region: string;
  cca2: string;
}
