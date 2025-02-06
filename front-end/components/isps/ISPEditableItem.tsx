import { ISPShort } from "@/types";
import React from "react";
import EditButton from "../buttons/EditButton";
import ISPItemLayout from "./ISPItemLayout";
import ISPShortView from "./ISPShortView";

interface ISPEditableItemProps {
  isp: ISPShort;
  redactorISP: (ispId: number) => Promise<void>;
  isActive: boolean;
}

const ISPEditableItem = React.memo(
  ({ isp, redactorISP, isActive }: ISPEditableItemProps) => {
    const handleRedactorISP = async () => {
      if (isActive) {
        await redactorISP(isp.id);
      }
    };

    return (
      <ISPItemLayout ispStatus={isp.status}>
        <ISPShortView isp={isp} />
        <article className="ml-8">
          <EditButton handleEdit={handleRedactorISP} isActive={isActive} />
        </article>
      </ISPItemLayout>
    );
  }
);

export default ISPEditableItem;
