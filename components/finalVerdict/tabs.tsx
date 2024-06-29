// react
import { useState } from "react";

// tabs can be one of these:
// Brand, About, Marketing, Policies, Risks, Legal
// export const tabs: string[] = [
//   "Brand",
//   "About",
//   "Marketing",
//   "Policies",
//   "Risks",
//   "Legal",
// ];
export const tabs: string[] = [
  "marketingStrategy",
  "businessRisks",
  "policies",
  "legalIssues",
  "aboutUs",
];

// Define tabs with display names and keys
export const tabss = [
  { key: "Brand", displayName: "Brand" },
  { key: "marketingStrategy", displayName: "Marketing Strategy" },
  { key: "businessRisks", displayName: "Business Risks" },
  { key: "policies", displayName: "Policies" },
  { key: "legalIssues", displayName: "Legal Issues" },
  { key: "aboutUs", displayName: "About Us" },
];

interface TabsProps {
  indexTab?: number;
  onClick: (tab: string) => void;
}

export default function Tabs({ indexTab = 0, onClick }: TabsProps) {
  // handling tab selection
  // const [selectedTab, setSelectedTab] = useState(tabs[indexTab]);
  const [selectedTab, setSelectedTab] = useState(tabss[indexTab].key);
  // updating not only the component but also sending data back to the main component.
  const handleSelectedTab = (tab: string) => {
    setSelectedTab(tab);
    onClick(tab);
  };

  return (
    <div className="w-full h-full">
      {/* Desktop version of tabs */}
      <div className="hidden lg:flex flex-col w-full h-full rounded-[20px] shadow-md shadow-gray-500 overflow-hidden">
        {tabss.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleSelectedTab(tab.key)}
            className={`" ${
              selectedTab == tab.key && "bg-[#0E9F6E] text-white"
            } flex w-full items-center border-b-[0.2px] border-gray-300 justify-start pl-5 h-[80px]`}
          >
            {tab.displayName}
          </button>
        ))}
      </div>

      {/* Mobile version of tabs */}
      <div className="lg:hidden absolute flex w-full bottom-0 z-50 overflow-x-scroll">
        {tabss.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleSelectedTab(tab.key)}
            className={`" ${
              selectedTab == tab.key
                ? "bg-[#0E9F6E]  text-white"
                : "bg-[#e2e2e2] text-gray-600"
            } flex w-full items-center min-w-[100px] justify-center px-2 border-x-[0.2px] border-gray-300 h-[80px]`}
          >
            {tab.displayName}
          </button>
        ))}
      </div>
    </div>
  );
}
