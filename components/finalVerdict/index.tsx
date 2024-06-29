"use client";

// react
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

// sub-components
import Tabs, { tabs, tabss } from "./tabs";
import Brand from "./Brand";
import Data from "./Data";

// types
import { formData, formDataStage1, formDataStage2 } from "../Start/type";

// data will bring all the data from the backend, which will be forwarded to sub components Brand and data
export const FinalVerdict = ({
  data,
  dataForBrand,
}: {
  data: formDataStage2;
  dataForBrand: formDataStage1;
}) => {
  // handling tab selection
  const [selectedTab, setSelectedTab] = useState<string>(tabss[0].key);
  const handleTab = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <div className="flex items-center justify-center w-full h-full lg:gap-8">
      {/* Tabs component */}
      <div className="lg:w-[20%] h-[96%] ">
        {/* <Tabs indexTab={tabs.indexOf(selectedTab)} onClick={handleTab}  /> */}
        <Tabs
          indexTab={tabss.findIndex((t) => t.key === selectedTab)}
          onClick={handleTab}
        />
      </div>

      {/* Devising the content of the tab. */}
      <div className="w-full lg:w-[70%] h-[96%] flex items-center justify-center">
        {selectedTab == "Brand" ? (
          <Brand data={dataForBrand} />
        ) : (
          <Data data={data} tab={selectedTab} />
        )}
      </div>
    </div>
  );
};
