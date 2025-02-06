import { ISPStatus } from "@/types";
import React from "react";

interface ISPItemLayoutProps {
  ispStatus: ISPStatus;
  children: React.ReactNode;
}

const ISPItemLayout = React.memo(
  ({ ispStatus, children }: ISPItemLayoutProps) => {
    const sectionClass =
      ispStatus === ISPStatus.SUBMITTED
        ? "bg-slate-500 shadow-activated mb-3 w-full"
        : "bg-primary shadow-regular mb-3 w-full";

    return (
      <section className={sectionClass}>
        <div className="flex flex-row justify-between p-4">{children}</div>
      </section>
    );
  }
);

export default ISPItemLayout;
