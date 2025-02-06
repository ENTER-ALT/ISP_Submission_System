import { ISPShort, ISPStatus } from "@/types";
import Link from "next/link";
import React from "react";
import ISPItemLayout from "./ISPItemLayout";
import ISPShortView from "./ISPShortView";

interface ISPLinkItemProps {
  isp: ISPShort;
  editHref: string;
  viewHref: string;
  isActive: boolean;
}

const ISPLinkItem = React.memo(
  ({ isp, editHref, viewHref, isActive }: ISPLinkItemProps) => {

    return (
      <ISPItemLayout ispStatus={isp.status}>
        <ISPShortView isp={isp} />
        <article className="flex flex-col gap-4 m-2">
          <Link
            className={`p-1 rounded shadow-regular bg-danger ${
              isActive
                ? "hover:shadow-success"
                : "hover:cursor-none"
            } `}
            href={`${editHref}/${isp.id}`}
          >
            Edit
          </Link>
          <Link
            className={`p-1 rounded shadow-regular bg-indigo-950 ${
              isActive
                ? "hover:shadow-success"
                : "hover:cursor-none"
            } `}
            href={`${viewHref}/${isp.id}`}
          >
            View
          </Link>
        </article>
      </ISPItemLayout>
    );
  }
);

export default ISPLinkItem;
