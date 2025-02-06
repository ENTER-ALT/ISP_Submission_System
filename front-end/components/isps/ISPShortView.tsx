import { CourseShort, ISPShort, ISPStatusToString } from "@/types";
import React from "react";

interface ISPShortViewProps {
  isp: ISPShort;
}

const ISPShortView = React.memo(({ isp }: ISPShortViewProps) => {
  return (
    <article className="flex flex-col gap-2 ml-4">
      <div className="flex flex-row gap-2">
        <p>ISP</p>
        <p>{`${isp.startYear}-${isp.startYear + 1}`},</p>
        <p className="hidden sm:block">{isp.totalCredits} credits</p>
      </div>
      <div className="flex flex-row gap-2">
        <p className="hidden sm:block">Status:</p>
        <p>{ISPStatusToString(isp.status)}</p>
      </div>
    </article>
  );
});

export default ISPShortView;
