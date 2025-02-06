import { Tab } from "@/types/tab";
import Link from "next/link";
import React from "react";

interface TabItemProps {
  tab: Tab;
};

const TabItem = React.memo(({ tab }: TabItemProps) => {
  const buttonClass = `p-1 rounded shadow-regular bg-primary hover:shadow-success align-top text-left w-80 h-64`;
  const buttonAttributes = {};
  const buttonHref = tab.href;
  const buttonName = tab.name;
  return (
    <>
      {tab && (
        <section className="ml-4 mr-4 mt-4 flex flex-col">
          <Link href={buttonHref} className={buttonClass} {...buttonAttributes}>
            {buttonName}
          </Link>
        </section>
      )}
    </>
  );
});

export default TabItem;
