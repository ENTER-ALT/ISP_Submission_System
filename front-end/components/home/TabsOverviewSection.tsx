import React from "react";
import { Tab } from "../../types/tab";
import TabItem from "./TabItem";
interface TabsOverviewSectionProps {
  tabs: Tab[];
}

const TabsOverviewSection = React.memo(({ tabs }: TabsOverviewSectionProps) => {
  return (
    <>
      <section className="ml-4 mr-4 mt-4 flex flex-row flex-wrap">
        {tabs.map((tab: Tab, index: number) => (
          <div key={index}>
            <TabItem tab={tab}/>
          </div>
        ))}
      </section>
    </>
  );
});

export default TabsOverviewSection;
